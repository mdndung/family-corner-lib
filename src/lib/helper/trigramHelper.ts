/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */

import { EnumBaseClass } from '../mt-data/enumBaseClass';
import { Energy } from '../mt-data/feng-shui/energy';
import { Trigram } from '../mt-data/feng-shui/trigram';

export class TrigramHelper {

  static MONOGRAMS:  Energy[][] = [
    [],
		[Energy.YIN, Energy.YANG, Energy.YIN],
		[Energy.YIN, Energy.YIN, Energy.YIN],
		[Energy.YANG, Energy.YIN, Energy.YIN],
		[Energy.YIN, Energy.YANG, Energy.YANG],
    [],
		[Energy.YANG, Energy.YANG, Energy.YANG],
		[Energy.YANG, Energy.YANG, Energy.YIN],
		[Energy.YIN, Energy.YIN, Energy.YANG],
		[Energy.YANG, Energy.YIN, Energy.YANG]
  ];


  static getMonogram(nb: number) {
    return TrigramHelper.MONOGRAMS[nb];
  }

  static getTrigramByOrd(ord: number){
    return Trigram.KAN.getEnum(ord) as Trigram;
  }

  static getTrigramByEnergy(energy: Energy[]): Trigram {
    const tArr =  Trigram.getValues();
    let res = null ;
    for (let index = 0; index < tArr.length; index++) {
      const trigram = tArr[index];
      if ( EnumBaseClass.isSameEnumArray(
        energy, TrigramHelper.getMonogram(trigram.hauthienNb)
      )) {
        res = trigram;
        break;
      }
    }
    return res;
  }

  static getTrigramGua(gua: number): Trigram {
    let trigram = Trigram.LI;
		switch (gua) {
		case 1: trigram = Trigram.KAN; break;
		case 2: trigram = Trigram.KUN; break;
		case 3: trigram = Trigram.ZHEN; break;
		case 4: trigram = Trigram.XUN; break;
		case 6:	trigram = Trigram.QIAN;	break;
		case 7:	trigram = Trigram.DUI;	break;
		case 8:	trigram = Trigram.GEN;	break;
		case 9:	trigram = Trigram.LI;	break;
		}
		return trigram;
  }

  static  getHouseGroupLabel(trigram: Trigram) {
		if ( trigram.directionHauThien === null ) {return '';}
		if (trigram.directionHauThien.eastHouse) {
      return 'EastGroup';
    } else {
      return 'WestGroup';
    }
	}
}
