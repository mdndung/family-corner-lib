/* eslint-disable @typescript-eslint/naming-convention */
import { Branche } from '../mt-data/bazi/branche';
import { Trunk } from '../mt-data/bazi/trunk';
import { Element } from '../mt-data/feng-shui/element';

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

  //Bazi.getCalendarTrigramOrderIdx
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
    return NagiaHelper.NagiaElement[index % 30];
  }

  static getTrigramNb(nagiaNb: number) {
    return NagiaHelper.trigramNagiaOrderList[nagiaNb];
  }
}
