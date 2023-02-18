/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Branche } from '../mt-data/bazi/branche';
import { BrancheRelation } from '../mt-data/bazi/brancheRelation';
import { Lunar } from '../mt-data/bazi/lunar';
import { Trunk } from '../mt-data/bazi/trunk';
import { ElementRelation } from '../mt-data/feng-shui/element-relation';
import { ElementLifeCycle } from '../mt-data/feng-shui/elementLifeCycle';
import { ElementNEnergy } from '../mt-data/feng-shui/elementNenergy';
import { ElementNEnergyRelation } from '../mt-data/feng-shui/elementNEnergyRelation';
import { Energy } from '../mt-data/feng-shui/energy';
import { Trigram } from '../mt-data/feng-shui/trigram';
import { ObjectHelper } from './objectHelper';
import { Element } from '../mt-data/feng-shui/element';
import { LunarBase } from '../mt-data/bazi/lunarBase';
import { BrancheHelper } from './brancheHelper';
import { Bazi } from '../mt-data/bazi/bazi';
import { Temporal } from 'temporal-polyfill';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { DateHelper } from './dateHelper';
import { DataWithLog } from '../mt-data/qi/dataWithLog';
import { CombAttr } from '../mt-data/bazi/combinationList';
import { SecondaryDeity } from '../mt-data/bazi/secondaryDeity';

export class BaziHelper {

  static YICHINGINDEX = [
    //0 Vide
    [0, -1, -2, -3, -4, -5, -6, -7, -8, -9],
    //1 KHAM
    [0, 29, 8, 3, 48, -5, 5, 60, 39, 63],
    //2 Kh�n
    [0, 7, 2, 24, 46, -5, 11, 19, 15, 36],
    //3 Chan
    [0, 40, 16, 51, 32, -5, 34, 54, 62, 55],
    //4 Ton
    [0, 59, 20, 42, 57, -5, 9, 61, 53, 37],
    //5 Vide
    [0, -1, -2, -3, -4, -5, -6, -7, -8, -9],
    //6 Kien
    [0, 6, 12, 25, 44, -5, 1, 10, 33, 13],
    //7 Doai
    [0, 47, 45, 17, 28, -5, 43, 58, 31, 49],
    //8 C�n
    [0, 4, 23, 27, 18, -5, 26, 41, 52, 22],
    //9 Ly
    [0, 64, 35, 21, 50, -5, 14, 38, 56, 30],
  ];


static existsecDeity( secondaryDeityPilar: SecondaryDeity[][], deity: SecondaryDeity) {
  for (let i = 0; i < LunarBase.PILARS_LEN; i++) {
    const index=ObjectHelper.findIndex(secondaryDeityPilar[i],deity);
    if (index>=0) {return true;}
  }
  return false;
}


  // Ref8p5 Def1
  static isBrancheElementAppearInTrunk(lunar: Lunar, checkElement: Element) {
    let res = false;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (lunar.trunkArr[pilarIdx].getElement() === checkElement) {
        res = true;
        break;
      }
    }
    return res;
  }

  //Ref8p5 Def1
  static isBrancheAppearInTrunks(lunar: Lunar, pilarIdx: number) : boolean{
    let checkElement=lunar.pilarsAttr.brancheEE[pilarIdx].getValue().getElement();
    if( BaziHelper.isBrancheElementAppearInTrunk(lunar,checkElement) ) {
      return true;
    }
    checkElement = lunar.brancheArr[pilarIdx].getElement();
    return BaziHelper.isBrancheElementAppearInTrunk(lunar,checkElement) ;
  }

  static isElementInBranche(lunar: Lunar, brancheIdx: number, checkElement: Element) {
      const branche = lunar.brancheArr[brancheIdx];
      if (branche.getElement() === checkElement) {
        return true;
      }
      const hiddenTrunkArr=BrancheHelper.getHiddenTrunk(branche);
      for (let i = 0; i < hiddenTrunkArr.length; i++) {
        const eeHtr = hiddenTrunkArr[i].getElement();
        if (eeHtr === checkElement) {
          return true;
        }
      }
    return false;
  }


    //Ref8p505.
    static isTrunkInBranche(lunar: Lunar, trunkPilarIdx: number,branchePilarIdx: number) : boolean{
      let checkElement=lunar.trunkArr[trunkPilarIdx].getElement();
      if( BaziHelper.isElementInBranche(lunar,branchePilarIdx,checkElement) ) {
        return true;
      }
      return false;
    }

    //Ref3p345
    static getClashHiddenTrunkReduceFactor(lunar:Lunar, brancheIdxs:number[]) {
      const branche1 = lunar.brancheArr[brancheIdxs[0]];
      const branche2 = lunar.brancheArr[brancheIdxs[1]];
      const diff=Math.abs(branche1.ordinal()-branche2.ordinal());
      if ( diff===6 || diff===7 ) return 1/2;
      return 1/3
    }


  static getYiChingIndex(sky: Trigram, earth: Trigram) {
    return BaziHelper.YICHINGINDEX[sky.hauthienNb][earth.hauthienNb];
  }

  static energyArrToString(eArr: Energy[]) {
    if (ObjectHelper.isNaN(eArr)) {return ' null ';}
    let res = '';
    for (let i = 0; i < eArr.length; i++) {
      res += eArr[i].getFullName();
    }
    return res;
  }

  static startBrancheLifeCycle(trunk: Trunk) {
    let res = Branche.COCK;
    switch (trunk) {
      case Trunk.JIA:
        res = Branche.PIG;
        break;
      case Trunk.YI:
        res = Branche.HORSE;
        break;
      case Trunk.BING:
      case Trunk.WU:
        res = Branche.TIGER;
        break;
      case Trunk.DING:
      case Trunk.JI:
        res = Branche.COCK;
        break;
      case Trunk.GENG:
        res = Branche.SNAKE;
        break;
      case Trunk.XIN:
        res = Branche.RAT;
        break;
      case Trunk.REN:
        res = Branche.MONKEY;
        break;
      case Trunk.GUI:
        res = Branche.RABBIT;
        break;
    }
    return res;
  }

  // Ref10ap80
  static elementLifeCycle(trunk: Trunk, branche: Branche) {
    const startBranche = BaziHelper.startBrancheLifeCycle(trunk);
    let count = branche.ordinal() - startBranche.ordinal();
    if (Energy.YIN.isEqual(trunk.getEnergy())) {
      count = -count;
    }
    return ElementLifeCycle.BIRTH.getEnumNextNElement(
      count
    ) as ElementLifeCycle;
  }

  static trunkLifeCyclePhase (bazi: Bazi) {
    const trunkELCArr :  ElementLifeCycle[][] = [] ;
    const trunkArr = bazi.trunkArr;
    const brancheArr = bazi.brancheArr;
    for (let trunkIdx = 0; trunkIdx <LunarBase.LINDEX; trunkIdx++) {
      const trunk=trunkArr[trunkIdx];
      const eLCArr:ElementLifeCycle[] = [];
      for (let brancheIdx = 0; brancheIdx <LunarBase.LINDEX; brancheIdx++) {
        const branche = brancheArr[brancheIdx];
        eLCArr.push(BaziHelper.elementLifeCycle(trunk,branche))
      };
      trunkELCArr.push(eLCArr);
    };
    return trunkELCArr;
  }
  static eNeTrunkRelation(fromTrunk: Trunk, toTrunk: Trunk) {
    return BaziHelper.getEnNRelation(
      fromTrunk.elementNEnergy,
      toTrunk.elementNEnergy
    );
  }


  // Get relation of me on toElement
  static getRelation(fromElement: Element, toElement: Element) {
    let res = ElementRelation.NEUTRAL;

    if (toElement != null) {
      if (fromElement.isProductive(toElement)) {
        res = ElementRelation.GENERATE;
      } else {
        if (toElement.isProductive(fromElement)) {
          res = ElementRelation.GENERATED;
        } else {
          if (fromElement.isDestructive(toElement)) {
            res = ElementRelation.RESTRICT;
          } else {
            if (toElement.isDestructive(fromElement)) {
              res = ElementRelation.RESTRICTED;
            } else {
              if (toElement.isEqual(fromElement)) {
                res = ElementRelation.ENFORCE;
              }
            }
          }
        }
      }
    }
    return res;
  }

  static getEnNRelation(fromEnE: ElementNEnergy, toEnE: ElementNEnergy) {
    let res = ElementNEnergyRelation.RW;
    const elRel = BaziHelper.getRelation(fromEnE.element,toEnE.element);
    const sameEnergy = fromEnE.energy.isEqual(toEnE.energy);
    switch (elRel) {
      case ElementRelation.NEUTRAL:
      case ElementRelation.ENFORCE:
        if (sameEnergy) {
          res = ElementNEnergyRelation.F;
        } else {
          res = ElementNEnergyRelation.RW;
        }
        break;
      case ElementRelation.GENERATED:
        if (sameEnergy) {
          res = ElementNEnergyRelation.EG;
        } else {
          res = ElementNEnergyRelation.HO;
        }
        break;
      case ElementRelation.GENERATE:
        if (sameEnergy) {
          res = ElementNEnergyRelation.IR;
        } else {
          res = ElementNEnergyRelation.DR;
        }
        break;
      case ElementRelation.RESTRICTED:
        if (sameEnergy) {
          res = ElementNEnergyRelation.IW;
        } else {
          res = ElementNEnergyRelation.DW;
        }
        break;
      case ElementRelation.RESTRICT:
        if (sameEnergy) {
          res = ElementNEnergyRelation.K7;
        } else {
          res = ElementNEnergyRelation.DO;
        }
        break;
    }
    return res;
  }

  static getHostileForce(lunar:Lunar, element:Element) {
    const controlElement = element.getPrevControlElement();
    return BaziHelper.getFavorableForce(lunar,controlElement) ;
  }

  static getFavorableElements(lunar:Lunar, element:Element) {
    const friendElement = element.getPrevProductiveElement();
    return [element,friendElement] ;
  }

  static getFavorableForce(lunar:Lunar, element:Element) {
    const pilarsAttr = lunar.pilarsAttr;
    const elementForce = pilarsAttr.elementForce;
    const friendElement = element.getPrevProductiveElement();
    const favorablePoints =
      elementForce[element.ordinal()].getValue() +
      elementForce[friendElement.ordinal()].getValue();
    return favorablePoints ;
  }

  static isManYangOrWoManYing(lunar: Lunar) {
    return lunar.isMan===lunar.getyTrunk().getEnergy().isYang();
  }

  static  getElementNEnergy( element: Element,  energy: Energy) {
		let res = ElementNEnergy.WOODYANG;
    const eNeValues = ElementNEnergy.getValues();
    for (let index = 0; index < eNeValues.length; index++) {
      const val = eNeValues[index];
			if ( val.getElement()===element && val.energy===energy ) {
				res = val ;
				break ;
			}
		}
		return res ;
	}

  static getProgressSign(bazi: Bazi): number {
    let res = bazi.getyBranche().getEnergy().getSign() ;
		// Return -1 if
		//   male and year branch 'sign negatif
		//   female and year branch 'sign positif
		if ( (!bazi.isMan) && (res===-1) ) {
			res = -res;
		}
		return res ;
  }

  // Reference https://www.fengshuienfrance.fr/bazi-calculer-piliers-de-chance
  //Ref3p274   destiny start period
  //Ref10ap97  pilier de la chance
  static getStartPeriodDate(bazi: Bazi): MyCalendar {
    let count = 0 ;
    const birthDate=bazi.birthDate;
    const isMan = bazi.isMan;
    const mBranche = bazi.getmBranche();
    const progressSign=BaziHelper.getProgressSign(bazi);
    // Count to the next month branche
    let someDate = birthDate.getCopy();
    let someBazi = new Bazi(someDate,isMan);
    while (someBazi.getmBranche()===mBranche) {
      someDate.add(Temporal.Duration.from({ days: progressSign }));
      someBazi = new Bazi(someDate,isMan);
      count++;
    }

    //Ref10ap100  pilier de la chance
    const startDate = birthDate.getCopy();
    const year = Math.floor(count / 3) + 1 ;
    startDate.add(Temporal.Duration.from({years:year}));
    const month = Math.floor((count % 3) * 4) ;
    startDate.add(Temporal.Duration.from({months:month}));

    return startDate;
  }


}
