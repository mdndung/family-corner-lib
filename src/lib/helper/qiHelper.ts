/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Branche } from '../mt-data/bazi/branche';
import { Lunar } from '../mt-data/bazi/lunar';
import { Trigram } from '../mt-data/feng-shui/trigram';
import { QiType } from '../mt-data/qi/qi-type';
import { QiForce } from '../mt-data/qi/qi-force';
import { QiTypeDataRec } from '../mt-data/qi/qi-type-data-rec';
import { YiJing } from '../mt-data/yi-jing/yijing';
import { BrancheHelper } from './brancheHelper';
import { Element } from '../mt-data/feng-shui/element';
import { Energy } from '../mt-data/feng-shui/energy';
import { BaziHelper } from './baziHelper';
import { ElementLifeCycle } from '../mt-data/feng-shui/elementLifeCycle';
import { ElementNEnergyRelation } from '../mt-data/feng-shui/elementNEnergyRelation';
import { LunarBase } from '../mt-data/bazi/lunarBase';
import { Bazi } from '../mt-data/bazi/bazi';
import { CombAttr, CombinationList } from '../mt-data/bazi/combinationList';
import { DataWithLog } from '../mt-data/qi/dataWithLog';
import { MessageHelper } from './messageHelper';
import { TrunkHelper } from './trunkHelper';
import { Trunk } from '../mt-data/bazi/trunk';
import { ObjectHelper } from './objectHelper';
import { HoroscopeHelper } from './horoscopeHelper';
import { BrancheRelation } from '../mt-data/bazi/brancheRelation';
import { HalacTheme } from '../mt-data/yi-jing/halacTheme';
import { NagiaHelper } from './nagiaHelper';


export class QiHelper {
  // YiJing.month in java
  //
  static BranchePeriodMonth: Branche[][] = [
    [
      Branche.PIG,
      Branche.MONKEY,
      Branche.GOAT,
      Branche.DRAGON,
      Branche.COCK,
      Branche.RAT,
      Branche.COCK,
      Branche.TIGER,
    ],
    [
      Branche.MONKEY,
      Branche.PIG,
      Branche.RAT,
      Branche.COCK,
      Branche.TIGER,
      Branche.OX,
      Branche.DOG,
      Branche.COCK,
    ],
    [
      Branche.OX,
      Branche.HORSE,
      Branche.PIG,
      Branche.TIGER,
      Branche.RABBIT,
      Branche.MONKEY,
      Branche.RABBIT,
      Branche.DOG,
    ],
    [
      Branche.DRAGON,
      Branche.COCK,
      Branche.MONKEY,
      Branche.SNAKE,
      Branche.RAT,
      Branche.COCK,
      Branche.TIGER,
      Branche.GOAT,
    ],
    [
      Branche.RABBIT,
      Branche.MONKEY,
      Branche.RABBIT,
      Branche.HORSE,
      Branche.SNAKE,
      Branche.DRAGON,
      Branche.GOAT,
      Branche.TIGER,
    ],
    [
      Branche.HORSE,
      Branche.GOAT,
      Branche.MONKEY,
      Branche.RABBIT,
      Branche.DRAGON,
      Branche.PIG,
      Branche.TIGER,
      Branche.RABBIT,
    ],
    [
      Branche.COCK,
      Branche.DOG,
      Branche.COCK,
      Branche.TIGER,
      Branche.OX,
      Branche.MONKEY,
      Branche.SNAKE,
      Branche.RAT,
    ],
    [
      Branche.MONKEY,
      Branche.RABBIT,
      Branche.DOG,
      Branche.OX,
      Branche.TIGER,
      Branche.RABBIT,
      Branche.HORSE,
      Branche.SNAKE,
    ],
  ];

  // qiStatusArr in java
  // Ref2p344
  static Trigram2TrigramForce: QiForce[][] = [
    [
      QiForce.HOSTILE,
      QiForce.MEDIUM,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
      QiForce.MEDIUM,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
    ],
    [
      QiForce.FAVORABLE,
      QiForce.FAVORABLE,
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
      QiForce.FAVORABLE,
      QiForce.FAVORABLE,
      QiForce.MEDIUM,
      QiForce.HOSTILE,
    ],
    [
      QiForce.FAVORABLE,
      QiForce.FAVORABLE,
      QiForce.FAVORABLE,
      QiForce.MEDIUM,
      QiForce.MEDIUM,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
      QiForce.MEDIUM,
    ],
    [
      QiForce.HOSTILE,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
      QiForce.FAVORABLE,
    ],
    [
      QiForce.HOSTILE,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
      QiForce.MEDIUM,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
    ],
    [
      QiForce.HOSTILE,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
    ],
    [
      QiForce.MEDIUM,
      QiForce.HOSTILE,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
      QiForce.FAVORABLE,
      QiForce.HOSTILE,
      QiForce.MEDIUM,
    ],
    [
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
      QiForce.HOSTILE,
      QiForce.FAVORABLE,
      QiForce.FAVORABLE,
      QiForce.MEDIUM,
      QiForce.FAVORABLE,
      QiForce.FAVORABLE,
    ],
  ];

  static getBirthMonthTrigram(lunar: Lunar) {
    let trigram: Trigram;
    const birthDate = lunar.birthDate;
    const month = birthDate.getChineseMonth();
    const gDay = birthDate.getDay();
    const principle = birthDate.getPrincipleTerm();
    const branche = BrancheHelper.getMonthBranche(month);
    switch (branche) {
      case Branche.TIGER:
      case Branche.OX:
        trigram = Trigram.KAN;
        break;
      case Branche.RABBIT:
        if (gDay < principle) {
          trigram = Trigram.KAN;
        } else {
          trigram = Trigram.ZHEN;
        }
        break;
      case Branche.DRAGON:
      case Branche.SNAKE:
        trigram = Trigram.ZHEN;
        break;
      case Branche.HORSE:
        if (gDay < principle) {
          trigram = Trigram.ZHEN;
        } else {
          trigram = Trigram.LI;
        }
        break;
      case Branche.GOAT:
      case Branche.MONKEY:
        trigram = Trigram.LI;
        break;
      case Branche.COCK:
        if (gDay < principle) {
          trigram = Trigram.LI;
        } else {
          trigram = Trigram.DUI;
        }
        break;
      case Branche.DOG:
      case Branche.PIG:
        trigram = Trigram.DUI;
        break;
      case Branche.RAT:
        if (gDay < principle) {
          trigram = Trigram.DUI;
        } else {
          trigram = Trigram.KAN;
        }
        break;
    }
    return trigram;
  }

  static hasHoaCong(yiJing: YiJing, trigram: Trigram) {
    return (
      trigram.isEqual(yiJing.skyTrigram) || trigram.isEqual(yiJing.earthTrigram)
    );
  }



  // Ref2 p350: BIRTHSEASONENERGY
  // Ref10a p134-p136
  static getBirthSeasonForce(lunar: Lunar) {
    let qiForce = QiForce.HOSTILE;

    const season = lunar.getmBranche().season;
    let detail="Not in season "+ season
    if (season.isYin(lunar.yinCount)) {
      qiForce = QiForce.MEDIUM;
      detail="Is Yin season "+ season
    }
    if (season.isYang(lunar.yangCount)) {
      detail="Is Yang season "+ season
      if (qiForce.isEqual(QiForce.HOSTILE)) {
        qiForce = QiForce.MEDIUM;
      } else {
        qiForce = QiForce.PROSPEROUS;
      }
    }
    return new DataWithLog(qiForce.force,detail);
  }

  // Ref2 p350
  // Ref2 p356 for 1,2,3
  // Ref2 p357 for -1,-2,-3
  static getYinYangMonthStatus(lunar: Lunar) {
    let res = 0;
    const mBranche = lunar.getmBranche();
    const principle = lunar.birthDate.getPrincipleTerm();
    const date = lunar.birthDate.getDay();
    switch (mBranche) {
      case Branche.RAT:
        if (date >= principle) {
          res = 1;
        }
        break;
      case Branche.OX:
        res = 1;
        break;
      case Branche.TIGER:
        if (date < principle) {
          res = 1;
        } else {
          res = 2;
        }
        break;
      case Branche.RABBIT:
        if (date < principle) {
          res = 2;
        }
        break;
      case Branche.DRAGON:
        if (date >= principle) {
          res = 3;
        }
        break;
      case Branche.SNAKE:
        if (date < principle) {
          res = 3;
        }
        break;
      case Branche.HORSE:
        if (date >= principle) {
          res = -1;
        }
        break;
      case Branche.GOAT:
        res = -1;
        break;
      case Branche.MONKEY:
        if (date < principle) {
          res = -1;
        } else {
          res = -2;
        }
        break;
      case Branche.COCK:
        if (date < principle) {
          res = -2;
        }
        break;
      case Branche.DOG:
        if (date > principle) {
          res = -3;
        }
        break;
      case Branche.PIG:
        if (date < principle) {
          res = -3;
        }
        break;
      default:
        break;
    }
    return res;
  }

  // Ref 2p355: BIRTHMONTHENERGY
  static getBirthWithTimeForce(lunar: Lunar) {
    let qiForce = QiForce.NONE;
    const yinCount = lunar.yinCount;
    const yangCount = lunar.yangCount;
    switch (QiHelper.getYinYangMonthStatus(lunar)) {
      case 1: //Ref2p356
        if (yangCount <= 25) {
          qiForce = QiForce.FAVORABLE;
        } else {
          if (yangCount > 35) {
            qiForce = QiForce.HOSTILE;
          } else {
          }
        }
        break;
      case 2:
        if (Math.abs(yangCount - 25) <= 3) {
          qiForce = QiForce.FAVORABLE;
        } else {
          if (yangCount < 25) {
            qiForce = QiForce.HOSTILE;
          }
        }
        break;
      case 3:
        if (yangCount <= 25) {
          qiForce = QiForce.HOSTILE;
        } else {
          if (yangCount >= 30) {
            qiForce = QiForce.FAVORABLE;
          }
        }
        break;
      case 0:
        if (Math.abs(yinCount - yangCount) <= 3) {
          qiForce = QiForce.FAVORABLE;
        } else {
          qiForce = QiForce.HOSTILE;
        }
        break;
      case -1:
        if (yinCount <= 30 && yangCount >= 25) {
          qiForce = QiForce.FAVORABLE;
        } else {
          if (yinCount >= 35) {
            qiForce = QiForce.HOSTILE;
          }
        }
        break;
      case -2:
        if (Math.abs(yinCount - 30) <= 3) {
          qiForce = QiForce.FAVORABLE;
        } else {
          if (yinCount < 30) {
            qiForce = QiForce.HOSTILE;
          }
        }
        break;
      case -3:
        if (yinCount < 30) {
          qiForce = QiForce.HOSTILE;
        } else {
          qiForce = QiForce.FAVORABLE;
        }
        break;
    }
    if ( qiForce===QiForce.NONE ) { return null ; }
      let detail='';
      if (qiForce.isFavorable()) {
        detail='Birth in compatible time period'
      } else {
          detail='Birth in incompatible time period'
      }
      return new DataWithLog(qiForce.force,detail);

  }

  // REF 7a p7.1: MONTHBRANCHEDAYTRUNKLIFECYCLE
  // REF3 P70
  static getMonthDayTrunkLifeCycleForce(lunar: Lunar) {
    let qiForce = QiForce.NONE;
    let cycle=BaziHelper.elementLifeCycle( lunar.getdTrunk(), lunar.getmBranche());
    let detail="Month Branche cycle "+ cycle + " ";
    if ( cycle.isFavorable() ) {
      qiForce = QiForce.PROSPEROUS;
     detail += "favorable";
    } else {
      detail += "not favorable"
    }
    if ( qiForce===QiForce.NONE ) { return null ; }
    return  new DataWithLog(qiForce.force,detail);
  }

   // Ref 3 p70			Dac dia
  // Ref 9 p150
  // Ref 10a p136: EARTHDAYTRUNKSUPPORT
  static getDayEarthTrunkForce(lunar: Lunar) {
    const dTrunk = lunar.getdTrunk();
    const brancheArr = lunar.brancheArr;
    // Can ngay + gap cac chi con lai TS
    let qiForce=QiForce.NONE;
    let detail='';
    if (dTrunk.getEnergy().isEqual(Energy.YANG)) {
      for (let index = 0; index < LunarBase.PILARS_LEN; index++) {
        if ( index!==LunarBase.MINDEX ) {
          const branche = brancheArr[index];
          const cycle=BaziHelper.elementLifeCycle(dTrunk, branche);
          if ( cycle===ElementLifeCycle.BIRTH ) {
            qiForce= QiForce.FAVORABLE;
            detail ="Branche "+MessageHelper.getMessage(LunarBase.getPilarLabel(index)) + " cycle is "+ cycle;
            break;
          }
        }
      }
    }
    if (! qiForce.isFavorable() ) {
      for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
        // Examine only month, hour and day. Year is too far and has no influence
        if ( pilarIdx!==LunarBase.YINDEX ) {
           // Can ngay gap loc, Kinh Duong
          //
          const branche=brancheArr[pilarIdx];
          const hiddenTrunk = BrancheHelper.getHiddenTrunk(branche);
          let temp: any;
          for (let index = 0; index < hiddenTrunk.length; index++) {
            const htr = hiddenTrunk[index];
            temp = BaziHelper.eNeTrunkRelation(htr, dTrunk);
            if (temp===ElementNEnergyRelation.F || temp===ElementNEnergyRelation.RW) {
              qiForce= QiForce.FAVORABLE;
              detail ="Branche "+MessageHelper.getMessage(LunarBase.getPilarLabel(pilarIdx)) + " deity is "+ temp;
              break;
            }
          }
          // Tomb
          // Also see Ref 9 p150
         //
          temp=BaziHelper.elementLifeCycle(dTrunk, branche)
          if ( temp===ElementLifeCycle.TOMB ) {
            qiForce= QiForce.FAVORABLE;
            detail ="Branche "+MessageHelper.getMessage(LunarBase.getPilarLabel(pilarIdx)) + " cycle is "+ temp;
            break;
          }
        }
      }
    }
    if ( qiForce===QiForce.NONE ) { return null ; }
    return  new DataWithLog(qiForce.force,detail);
   }


  // Ref 7a p7.1,7.2
  // Ref 9  p152
  // Ref 3 p70
  // Duoc Sinh (Soutien par la croissance). GROWDAYTRUNKSUPPORT
  static getDayGrowSupportForce(lunar: Lunar) {
    let qiForce = QiForce.NONE;
    const pilarsAttr = lunar.pilarsAttr;
    let step = pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.DR,LunarBase.DINDEX)-
    pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.DO,LunarBase.DINDEX);
    // Case Trunk
    qiForce= qiForce.getEnumNextNElement(step);
    if ( qiForce===QiForce.NONE ) { return null ; }
    let detail='';
    if ( qiForce.isFavorable() ) {
      detail =' Day Pilar is supported in growth'
    } else {
      detail =' Day Pilar is not supported in growth'
    }

    return  new DataWithLog(qiForce.force,detail);
  }

   // Ref 7a p7.1,7.2
    // Ref 10a p 137
    // Duoc tro giup (Soutien par les troncs enracinés)
    static getDayPilarsConfigurationSupporStatus(lunar: Lunar) {
      const pilarsAttr = lunar.pilarsAttr;
      const countECEE = pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.RW,LunarBase.DINDEX);
      const countRCRE =pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.DO,LunarBase.DINDEX);
      let qiForce: QiForce = QiForce.NONE;
      const count = countECEE  - countRCRE ;
      if ( count>0 ) {
        if ( count>2 ) {
          qiForce=QiForce.VERYSTRONG
        } else {
          qiForce=QiForce.FAVORABLE
        }
      } else {
        if ( count<0 ) qiForce=QiForce.HOSTILE
      }
      if ( qiForce===QiForce.NONE ) { return null ; }
      let detail='';
      if ( qiForce.isFavorable() ) {
        detail =' Day Pilar is supported by other pilars'
      } else {
        detail =' Day Pilar is not supported by other pilars'
      }
      return  new DataWithLog(qiForce.force,detail);
  }

  static getCombinationForce(lunar: Lunar, type:number) {
    let qiForce = QiForce.NONE;
    const pilarsAttr = lunar.pilarsAttr;
    const combList = pilarsAttr.combList;
    const countComb = combList.getCombTypeAttrList(type,LunarBase.DINDEX);

    let detail='';
    let comTypeName=MessageHelper.getMessage(CombAttr.getTypeName(type));
    if ( countComb.length>0 ) {
      const trElement=countComb[0].resultData;
      if ( trElement===null ) {
        qiForce=QiForce.MEDIUM;
      } else {
        if ( trElement.isLostForceRelation(lunar.getdBranche().getElement()) ) {
          qiForce=QiForce.HOSTILE;
        } else {
          qiForce=QiForce.FAVORABLE;
        }
      }
      if ( qiForce===QiForce.NONE ) { return null ; }
      if ( qiForce.isFavorable() ) {
        detail =' Day Pilar has no lost force combination type '
      } else {
        detail =' Day Pilar has lost force combination type '
      }
      detail += comTypeName;
      return  new DataWithLog(qiForce,detail);
    }
    return null;
  }

  static countFavorableDeities(lunar: Lunar) {
    let pilarsAttr = lunar.pilarsAttr;
    const dPilar = LunarBase.DINDEX;
    const count = pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.RW,dPilar ) +
    pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.DR,dPilar ) ;
    return count;
  }

  static countNonFavorableDeities (lunar: Lunar) {
    let pilarsAttr = lunar.pilarsAttr;
    const dPilar = LunarBase.DINDEX;
    const count = pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.HO,dPilar ) +
    pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.DW,dPilar ) +
    pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.DO,dPilar );
    return count;
  }


  //Ref3 p70
  static getDayTrunkForce(lunar: Lunar, qiTypeData: QiTypeDataRec) {

    let dayForceData = new DataWithLog(0,"");

    // Factor 1
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.EARTHDAYTRUNKSUPPORT));
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.GROWDAYTRUNKSUPPORT));
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.PILARDAYTRUNKSUPPORT));
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE));
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.SEASONCOMBINAISON));
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.COMBINATIONOF3));

    // Other case of Ref3 p71
    //

    let pilarsAttr = lunar.pilarsAttr;
    const dayTrunkElement = pilarsAttr.getDayElement();
    let favorableForce=BaziHelper.getFavorableForce(lunar,dayTrunkElement );
    let hostileForce=BaziHelper.getHostileForce(lunar,dayTrunkElement );

    if (favorableForce<hostileForce) {
      dayForceData.addData(-1,'Weak day trunk element '+ dayTrunkElement+ ' '+ favorableForce + ' < '+hostileForce );
    } else {
      dayForceData.addData(1,'Supported day trunk element '+ dayTrunkElement+ ' ' +favorableForce + ' > '+hostileForce);
    }

    favorableForce = QiHelper.countFavorableDeities(lunar);
    hostileForce = QiHelper.countNonFavorableDeities(lunar);
    if (favorableForce<hostileForce) {
      dayForceData.addData(-1,'Non favorable deities count '+ favorableForce + ' < '+hostileForce );
    } else {
      dayForceData.addData(1,'Favorable deities count '+ favorableForce + ' > '+hostileForce );
    }

    // Support by day branche
    const dayBrancheElement = pilarsAttr.brancheEE[LunarBase.DINDEX].getValue().element;
    if ( dayBrancheElement.isFavorable(dayTrunkElement) ) {
      dayForceData.addData(1,'Favorable day branche Element '+ dayBrancheElement  );
    } else {
      dayForceData.addData(-1,'Non Favorable day branche Element '+ dayBrancheElement  );
    }

    // Support by Month Element
    if ( pilarsAttr.brMonthElement.isFavorable(dayTrunkElement) ) {
      dayForceData.addData(1,'Favorable month branche element '+ pilarsAttr.brMonthElement  );
    } else {
      dayForceData.addData(-1,'Non Favorable month branche element '+ pilarsAttr.brMonthElement  );
    }

    // Clash
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.BRANCHECLASH,-1));

    return dayForceData;
  }


  static getPeriodCategory(periodNb: Number) {
    if (periodNb < 3) return "ATTIRE";
    if (periodNb < 6) return "AGE";
    return "AGING";
  }

  // Ref3p284
  static getMenhPilar(bazi: Bazi, studyDate: Lunar) {
    const currAge = HoroscopeHelper.computeStudyAge(studyDate.birthDate,bazi.birthDate);
    if ( currAge<=15 ) return LunarBase.YINDEX;
    if ( currAge<=31 ) return LunarBase.MINDEX;
    if ( currAge<=47 ) return LunarBase.DINDEX;
    return LunarBase.HINDEX;
  }

  static menhFusion(bazi: Bazi, studyDate: Lunar, destQi:QiTypeDataRec) {
    const menhPilar = QiHelper.getMenhPilar(bazi,studyDate);

  }

  static getYearQi(bazi: Bazi, studyDate: Lunar) {
    let yearQi: QiTypeDataRec = new QiTypeDataRec();
    const yTrunk=studyDate.getyTrunk();
    const yTrunkElement=yTrunk.elementNEnergy.element;
    const yBranche=studyDate.getyBranche();
    const yBrancheElement=yBranche.elementNEnergy.element;
    const bTrunkArr=bazi.trunkArr;
    const bBrancheArr=bazi.brancheArr;
    const DOT='.';
    let pilarControlYearCount = 0 ;
    let yearControlPilarCount= 0 ;
    let trunkClashCount= 0 ;
    let brancheClashCount= 0 ;
    let pilarControlYear: Element [] =  [];
    let yearControlPilar: Element []  =  [];
    let trunkClash: Trunk[] =  [];
    let brancheClash: Branche[] =  [];
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      const bTrunk = bTrunkArr[pilarIdx];
      const bTrunkElement = bTrunk.elementNEnergy.element ;
      const bBranche = bBrancheArr[pilarIdx];
      const bBrancheElement = bBranche.elementNEnergy.element;
      if ( yTrunkElement.isDestructive(bTrunkElement) ) {
        ObjectHelper.pushIfNotExist(pilarControlYear,bTrunkElement)
        pilarControlYearCount++;
      }
      if ( yBrancheElement.isDestructive(bBrancheElement) ) {
        ObjectHelper.pushIfNotExist(pilarControlYear,bBrancheElement);
        pilarControlYearCount++;
      }
      if ( bTrunkElement.isDestructive(yTrunkElement) ) {
        yearControlPilar.push(yTrunkElement);
        yearControlPilarCount++;
      }
      if ( bBrancheElement.isDestructive(yBrancheElement) ) {
        yearControlPilar.push(yBrancheElement);
        yearControlPilarCount++;
      }
      for (let otherPilarIdx = 0; otherPilarIdx < LunarBase.LINDEX; otherPilarIdx++) {
        if ( TrunkHelper.isTrunkClashed(yTrunk,bTrunkArr[otherPilarIdx])){
          ObjectHelper.pushIfNotExist(trunkClash,bTrunkArr[otherPilarIdx]);
          trunkClashCount++;
        }
        if ( BrancheHelper.isBrancheClashed(yBranche,bBrancheArr[otherPilarIdx])){
          ObjectHelper.pushIfNotExist(brancheClash,bBrancheArr[otherPilarIdx]);
          brancheClashCount++;
        }
      }
    }
    const yearDeity = bazi.getTrunkDeity(yTrunk);
    const pilarsAttr = bazi.pilarsAttr;
    const deityElement = pilarsAttr.getDeityElement(yearDeity);
    // Ref3p281
    let force = pilarsAttr.getPivotElementStatus(deityElement);
    let dataLog=new DataWithLog(force,'Year Deity Element ('+deityElement+') Force');

    let currDataLog = new DataWithLog(trunkClashCount,"Year "+ yTrunk+" and birth trunks "+ trunkClash+" clash ")
    yearQi.addQiTypeForce(QiType.YEARBIRTHTRUNKCLASH, currDataLog);
    currDataLog = new DataWithLog(brancheClashCount,"Year "+ yBranche+" and birth trunks "+ brancheClash+" clash ")
    yearQi.addQiTypeForce(QiType.YEARBIRTHBRANCHECLASH, currDataLog);

    currDataLog = new DataWithLog(yearControlPilarCount,"Year elements controlling birth elements "+yearControlPilar)
    yearQi.addQiTypeForce(QiType.YEARCONTROLBIRTHELEMENT, currDataLog);

    currDataLog = new DataWithLog(pilarControlYearCount,"Birth elements "+pilarControlYear+" controlling year elements")
    yearQi.addQiTypeForce(QiType.BIRTHCONTROLYEARELEMENT, currDataLog);

    let present=BrancheRelation.isRelationPresent(
      bBrancheArr[LunarBase.YINDEX],yBranche,BrancheRelation.TAMTAI);
      /*
        let nagiaIndex = NagiaHelper.getNagiaIdx(bTrunkArr[LunarBase.YINDEX], bBrancheArr[LunarBase.YINDEX]);
        const birthNagiaTrigram = NagiaHelper.getNagiaTrigram(nagiaIndex);
        nagiaIndex = NagiaHelper.getNagiaIdx(yTrunk,yBranche);
        const yearNagiaTrigram = NagiaHelper.getNagiaTrigram(nagiaIndex);
        let theme = YiJing.getInstanceFromSkyEarth(
          birthNagiaTrigram,
          yearNagiaTrigram,
          HalacTheme.getNDPos(bazi,birthNagiaTrigram, yearNagiaTrigram));
        const yaoPos = theme.getMyYaoPos() + 1;
        let temp = "Part of possible 3 hostile years. Complement Info:";
        const key = 'Halac.' + theme.getHexaOrdinal()+DOT+yaoPos+'.yao&';
        console.log(key);

    */
    let temp = "Part of possible 3 hostile years";
    currDataLog = new DataWithLog(present,temp);
    yearQi.addQiTypeForce(QiType.YEARTAMTAI, currDataLog);

    let qiForce = QiForce.getQiForce(dataLog.getValue(),QiForce.FAVORABLE)
    const perStatus = new DataWithLog(qiForce,dataLog.detail);
    yearQi.addQiTypeForce(QiType.YEARSTATUS, perStatus);
    return yearQi;
  }

  static getPeriodQi(bazi: Bazi, studyDate: Lunar) {
    let periodQi: QiTypeDataRec = new QiTypeDataRec();
    const pilarsAttr = bazi.pilarsAttr;
    const periodNb = bazi.getPeriodNb(studyDate.birthDate);
    const deity = bazi.getPeriodTrunkDeity(periodNb);
    const lifeCycle=bazi.getPeriodLifeCyle(periodNb);
    let currDataLog: DataWithLog;
    let currDetail: string;
    let qiForce: QiForce;
    let force = 0 ;
    const deityElement = pilarsAttr.getDeityElement(deity);
    // Ref3p281
    force = pilarsAttr.getPivotElementStatus(deityElement);
    let dataLog=new DataWithLog(force,'Period Deity Element ('+deityElement+') Force');

    //Ref3p280
    if ( bazi.isFavorableLifeCycle(periodNb,lifeCycle) ) {
      force=1;
      qiForce=QiForce.FAVORABLE;
    } else {
      force=-1;
      qiForce=QiForce.HOSTILE;
    }
    currDetail='Period Element Life Cycle ('+lifeCycle+') Force';
    dataLog.addValue(force,currDetail)
    currDataLog = new DataWithLog(qiForce,currDetail);
    periodQi.addQiTypeForce(QiType.PERIODLIFECYCLESTATUS, currDataLog);
    //Ref3p280
    const periodElement = bazi.getPeriodElement(periodNb);
    const yElement = bazi.getyElement();
    let isFavorable=!yElement.isLostForceRelation(periodElement);
    if ( isFavorable ) {
      force=1;
      qiForce=QiForce.FAVORABLE;

    } else {
      force=-1;qiForce=QiForce.HOSTILE;
    }
    currDetail='Period/Birth year Nagia element ('+periodElement+'/'+yElement+') Support Status ';
    dataLog.addValue(force,currDetail);
    currDataLog = new DataWithLog(qiForce,currDetail);
    periodQi.addQiTypeForce(QiType.PERIODELEMENTSTATUS, currDataLog);


    // Ref3p284
    const pTrunkEnE = bazi.getPeriodTrunkEnE(periodNb);
    const pBrancheEnE = bazi.getPeriodBrancheEnE(periodNb);
    const sTrunkEnE = studyDate.getyTrunk().elementNEnergy;
    const sBrancheEnE = studyDate.getyBranche().elementNEnergy;
    currDetail='Trunk Study year: '+sTrunkEnE+' / Period '+ pTrunkEnE+' hostile full relation status';
    if ( sTrunkEnE.isHostile(pTrunkEnE) ) {
      force=-1;qiForce=QiForce.HOSTILE;
    } else {
      force=1; qiForce=QiForce.FAVORABLE;
    }
    currDataLog = new DataWithLog(qiForce,currDetail);
    periodQi.addQiTypeForce(QiType.PERIODTRUNKSTATUS, currDataLog);


  if ( sBrancheEnE.isHostile(pBrancheEnE) ) {
      force=1; qiForce=QiForce.HOSTILE;
    } else {
      force=-1;
      qiForce=QiForce.FAVORABLE;
    }
    currDetail='Branche Study year: '+sBrancheEnE+' / Period '+ pBrancheEnE+' hostile full relation status';
    currDataLog = new DataWithLog(qiForce,currDetail);
    periodQi.addQiTypeForce(QiType.PERIODBRANCHESTATUS, currDataLog);
    dataLog.addValue(force,currDetail);


    qiForce = QiForce.getQiForce(dataLog.getValue(),QiForce.FAVORABLE)
    const category= QiHelper.getPeriodCategory(periodNb);
    const perStatus = new DataWithLog(qiForce,dataLog.detail);
    periodQi.addQiTypeForce(QiType.PERIODSTATUS, perStatus);

    return {periodQi,category, perStatus, periodNb,periodElement,lifeCycle, deity,deityElement};
  }

  static getLunarQiForce(lunar: Lunar) {
    let qiTypeData: QiTypeDataRec = new QiTypeDataRec();
    let force = QiHelper.getBirthSeasonForce(lunar);
    qiTypeData.addQiTypeForce(QiType.BIRTHSEASONENERGY, force);
    force = QiHelper.getBirthWithTimeForce(lunar);
    qiTypeData.addQiTypeForce(QiType.BIRTHWITHTIME, force);
    force = QiHelper.getMonthDayTrunkLifeCycleForce(lunar);
    qiTypeData.addQiTypeForce(QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE, force);
    force = QiHelper.getDayEarthTrunkForce(lunar);
    qiTypeData.addQiTypeForce(QiType.EARTHDAYTRUNKSUPPORT, force);
    force = QiHelper.getDayGrowSupportForce(lunar);
    qiTypeData.addQiTypeForce(QiType.GROWDAYTRUNKSUPPORT, force);
    force=QiHelper.getDayPilarsConfigurationSupporStatus(lunar);
    qiTypeData.addQiTypeForce(QiType.PILARDAYTRUNKSUPPORT, force);

    force=QiHelper.getCombinationForce(lunar,CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE);
    qiTypeData.addQiTypeForce(QiType.SEASONCOMBINAISON, force);
    force=QiHelper.getCombinationForce(lunar,CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE);
    qiTypeData.addQiTypeForce(QiType.COMBINATIONOF3, force);
    force=QiHelper.getCombinationForce(lunar,CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE);
    qiTypeData.addQiTypeForce(QiType.DAYCOMBINETRANSFORM, force);
    force=QiHelper.getCombinationForce(lunar,CombAttr.MIDBRANCHECOMB3TRANSFORMABLETYPE);
    qiTypeData.addQiTypeForce(QiType.MIDCOMBINATION, force);
    force=QiHelper.getCombinationForce(lunar,CombAttr.BRANCHESEASONCOMBTYPE);
    qiTypeData.addQiTypeForce(QiType.MIDSEASONCOMBINAISON, force);
    force=QiHelper.getCombinationForce(lunar,CombAttr.BRANCHECLASHTYPE);
    qiTypeData.addQiTypeForce(QiType.BRANCHECLASH, force);


    force = QiHelper.getDayTrunkForce(lunar, qiTypeData);
    qiTypeData.addQiTypeForce(QiType.DAYSTATUS, force);

    return qiTypeData;
  }

}
