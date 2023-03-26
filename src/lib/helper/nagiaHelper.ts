/* eslint-disable @typescript-eslint/naming-convention */

import { Branche } from '../mt-data/bazi/branche';
import { Trunk } from '../mt-data/bazi/trunk';
import { Element } from '../mt-data/feng-shui/element';
import { Trigram } from '../mt-data/feng-shui/trigram';
import { TrigramHelper } from './trigramHelper';

export class NagiaHelper {
  // Bazi.elementCalendarOrderList in java /part
  static NagiaElement: Element[] = [
    Element.METAL,
    Element.METAL,
    Element.FIRE,
    Element.FIRE,
    Element.WOOD,
    Element.WOOD,
    Element.EARTH,
    Element.EARTH,
    Element.METAL,
    Element.METAL,
    Element.FIRE,
    Element.FIRE,
    Element.WATER,
    Element.WATER,
    Element.EARTH,
    Element.EARTH,
    Element.METAL,
    Element.METAL,
    Element.WOOD,
    Element.WOOD,
    Element.WATER,
    Element.WATER,
    Element.EARTH,
    Element.EARTH,
    Element.FIRE,
    Element.FIRE,
    Element.WOOD,
    Element.WOOD,
    Element.WATER,
    Element.WATER,
  ];

  static trigramNagiaOrderList: number[] = [
    2, 3, 0, 4, 5, 6, 7, 0, 1, 2, 4, 5, 6, 7, 0, 1, 2, 3, 7, 4, 1, 2, 3, 6, 4,
    5, 6, 7, 0, 1, 7, 0, 1, 2, 3, 6, 4, 5, 6, 7, 3, 5, 4, 5, 6, 7, 0, 1, 2, 3,
    6, 7, 0, 1, 2, 3, 1, 4, 5, 6,
  ];

  //Ref2p18. By Algorith found by deduction
  static trigram3_4Index: number [] = [0,7,6,6,5,2];
  static trigram3_4PosIndex: number [] =     [2,7,3,5,1,6];
  static trigramDiv10StartIndex: number [] = [2,4,1,7,3,6 ];

  static getNagiaTrigram(nagia0Idx:number) {
    const divIdx = Math.floor(nagia0Idx/10);
    let modIdx = nagia0Idx % 10;
    let resTrigram=null;
    let trigramIdx = 0;
    const pos3_4Idx = this.trigram3_4PosIndex[divIdx];
    if (pos3_4Idx ===modIdx) {
      trigramIdx = this.trigram3_4Index[divIdx];
    } else {
      if ( modIdx>pos3_4Idx  ) {
        trigramIdx=4+modIdx-pos3_4Idx -1;
      } else {
        trigramIdx=this.trigramDiv10StartIndex[divIdx]+modIdx
      }
      trigramIdx = trigramIdx%8;
    }
    resTrigram=TrigramHelper.getTrigramByOrd(trigramIdx)
    return resTrigram
  }

  //Bazi.getCalendarTrigramOrderIdx
  //Ref2p18
  //Ref2p300-302
  //Ref3p264
  static getNagiaIdx(trunk: Trunk, branche: Branche) {
    const trunkOrd = trunk.ordinal();
    const brancheOrd = branche.ordinal();
    let nagiaIdx = 0;
    let truncIter = 0;
    outerloop: for (let j = truncIter; j < 10; j++) {
      for (let i = 0; i < 12; i++) {
        if (i === brancheOrd && truncIter === trunkOrd) {break outerloop;}
        nagiaIdx++;
        truncIter = (truncIter + 1) % 10;
      }
    }
    return nagiaIdx;
  }

  static getNagiaElement(trunk: Trunk, branche: Branche) {
    const index = NagiaHelper.getNagiaIdx(trunk, branche);
    const element = NagiaHelper.NagiaElement[index % 30];
    return element;
  }

  static getTrigramNb(nagiaNb: number) {
    return NagiaHelper.trigramNagiaOrderList[nagiaNb];
  }
}
