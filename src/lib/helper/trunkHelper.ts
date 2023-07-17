/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Trunk } from '../mt-data/bazi/trunk';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { BaziHelper } from './baziHelper';
import { DateHelper } from './dateHelper';
import { Element } from '../mt-data/feng-shui/element';
import { Energy } from '../mt-data/feng-shui/energy';
import { ElementNEnergy } from '../mt-data/feng-shui/elementNenergy';
import { ObjectHelper } from './objectHelper';
import { PilarBase } from '../mt-data/bazi/pilarBase';

export class TrunkHelper {

  // annualStartMonthTrunk
  static MONTH_TRUNK =  [
    Trunk.BING, Trunk.WU, Trunk.GENG, Trunk.REN, Trunk.JIA,
					Trunk.BING,Trunk.WU,Trunk.GENG,Trunk.REN,Trunk.JIA
  ];

  static getYearTrunk( cYear: number ): Trunk{
    while (cYear<=0 ) {cYear+=10;}
    return Trunk.BING.getEnum((cYear-1)%10) as Trunk;
  }

  static getAnnualStartMonth(yearTtrunk: Trunk): Trunk {
    const idx = yearTtrunk.ordinal();
    return TrunkHelper.MONTH_TRUNK[idx];
}

  static getMonthTrunk(yearTtrunk: Trunk, monthIndexBase1: number): Trunk{
     return TrunkHelper.getAnnualStartMonth(yearTtrunk).getEnumNextNElement(monthIndexBase1-1);
 }

  static getDayTrunk(mDate: MyCalendar): Trunk {
    const idx = DateHelper.reference19850724JIARATDateDiff(mDate);
    return Trunk.JIA.getEnumNextNElement(idx);
  }

  static getHourTrunk(dayTrunk: Trunk,hour0_23: number): Trunk {
    const idx = dayTrunk.ordinal();
    let hIdx=0;
    if ( hour0_23!==0 &&hour0_23!==23) {
      hIdx = Math.trunc((hour0_23+1)/2);
    }
    const hTrunk = Trunk.HOUR_TRUNK[idx].getEnumNextNElement(hIdx);
    return hTrunk;
  }

  static getPilarTrunkTransformedElement(pilar1: PilarBase, pilar2: PilarBase) {
    if (TrunkHelper.isTransformable(pilar1, pilar2)) {
      return TrunkHelper.getTransformElement(pilar1.trunk);
    }
    return null;
  }

  static isTransformable(pilar1: PilarBase, pilar2: PilarBase) {
    return pilar1.trunk.isCompatibleTrunk(pilar2.trunk)
  }

  static isDestroying(trunk1: Trunk, trunk2: Trunk) {
		if ( trunk1.ordinal()===trunk2.ordinal() ) {
			return false;
		}
		return trunk1.getEnumNextNElement(4)===trunk2 || trunk1.getEnumNextNElement(6)===trunk2;

	}

  static getTransformElement(trunk: Trunk) {
    const startTrunk = TrunkHelper.getAnnualStartMonth(trunk);
    return startTrunk.getElement().getNextProductiveElement();
  }

   static  getTrunkByEnE( eer: ElementNEnergy ) {
		let res = Trunk.BING ;
    const values = Trunk.getValues();
    for (let index = 0; index < values.length; index++) {
      const o = values[index];
			if ( o.elementNEnergy===eer ) {
					res = o ;
					break ;
			}
		}
		return res;
	}

  static getTrunk( element: Element,  energy: Energy) {
		return TrunkHelper.getTrunkByEnE(BaziHelper.getElementNEnergy(element, Energy.YANG));
	}


  static getEERelation(fromTrunk: Trunk, toTrunk: Trunk) {
    return BaziHelper.getEnNRelation(fromTrunk.elementNEnergy,toTrunk.elementNEnergy);
  }


  static isRenJia(trunk: Trunk) {
    return (trunk===Trunk.JIA) ||  (trunk===Trunk.REN);
  }

  static isDingGeng(trunk: Trunk) {
    return (trunk===Trunk.DING) ||  (trunk===Trunk.GENG);
  }

  static isWuJi(trunk: Trunk) {
    return (trunk===Trunk.WU) ||  (trunk===Trunk.JI);
  }


  static isRenGeng(trunk: Trunk) {
    return (trunk===Trunk.REN) ||  (trunk===Trunk.GENG);
  }

  static isGuiXin(trunk: Trunk) {
    return (trunk===Trunk.GUI) ||  (trunk===Trunk.XIN);
  }

  static isYiXin(trunk: Trunk) {
    return (trunk===Trunk.YI) ||  (trunk===Trunk.XIN);
  }

  static isBingXin(trunk: Trunk) {
    return (trunk===Trunk.BING) ||  (trunk===Trunk.XIN);
  }


  static isJiaDingJi(trunk: Trunk) {
    return (trunk===Trunk.JIA) ||  (trunk===Trunk.DING) ||  (trunk===Trunk.JI);
  }

  static isYiXinGui(trunk: Trunk) {
    return (trunk===Trunk.YI) ||  (trunk===Trunk.XIN) ||  (trunk===Trunk.GUI);
  }


  static isYiXinJiBing(trunk: Trunk) {
    return (trunk===Trunk.YI) ||  (trunk===Trunk.XIN)||  (trunk===Trunk.JI)||  (trunk===Trunk.BING);
  }

  static isDingJi(trunk: Trunk) {
    return (trunk===Trunk.JI) ||  (trunk===Trunk.DING);
  }

  static isJiYi(trunk: Trunk) {
    return (trunk===Trunk.JI) ||  (trunk===Trunk.YI);
  }
  static isDingXin(trunk: Trunk) {
    return (trunk===Trunk.DING) ||  (trunk===Trunk.XIN);
  }

  static isBingWu(trunk: Trunk) {
    return (trunk===Trunk.BING) ||  (trunk===Trunk.WU);
  }

  static isJiXin(trunk: Trunk) {
    return (trunk===Trunk.JI) ||  (trunk===Trunk.XIN);
  }

  static isBinhDing(trunk: Trunk) {
    return (trunk===Trunk.DING) ||  (trunk===Trunk.BING);
  }

  static isDingJiGui(trunk: Trunk) {
    return (trunk===Trunk.DING) ||  (trunk===Trunk.JI)||  (trunk===Trunk.GUI);
  }

  static isBinhDingYi(trunk: Trunk) {
    return (trunk===Trunk.DING) ||  (trunk===Trunk.BING)||  (trunk===Trunk.YI);
  }

  static isJiaDingRen(trunk: Trunk) {
    return (trunk===Trunk.JIA) ||(trunk===Trunk.DING) ||  (trunk===Trunk.GENG);
  }

  static isJiaJi(trunk: Trunk) {
    return (trunk===Trunk.JIA) ||  (trunk===Trunk.JI);
  }

  static isGengXinJi(trunk: Trunk) {
    return (trunk===Trunk.GENG) ||(trunk===Trunk.XIN) ||  (trunk===Trunk.JI);
  }
  static isYiXinBing(trunk: Trunk) {
    return (trunk===Trunk.YI) ||(trunk===Trunk.XIN) ||  (trunk===Trunk.BING);
  }
  static isJiaGengJiDing(trunk: Trunk) {
    return (trunk===Trunk.JIA) ||(trunk===Trunk.GENG) ||  (trunk===Trunk.JI)||  (trunk===Trunk.DING);
  }

  static isWuGeng(trunk: Trunk) {
    return (trunk===Trunk.WU) ||  (trunk===Trunk.GENG);
  }

  static isBingRen(trunk: Trunk) {
    return (trunk===Trunk.BING) ||  (trunk===Trunk.REN);
  }

}
