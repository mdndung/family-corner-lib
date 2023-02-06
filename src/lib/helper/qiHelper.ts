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
import { Energy } from '../mt-data/feng-shui/energy';
import { BaziHelper } from './baziHelper';
import { ElementLifeCycle } from '../mt-data/feng-shui/elementLifeCycle';
import { ElementNEnergyRelation } from '../mt-data/feng-shui/elementNEnergyRelation';
import { LunarBase } from '../mt-data/bazi/lunarBase';
import { Bazi } from '../mt-data/bazi/bazi';
import { CombAttr } from '../mt-data/bazi/combinationList';
import { DataWithLog } from '../mt-data/qi/dataWithLog';
import { MessageHelper } from './messageHelper';



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
        detail='Birth in compatible time'
      } else {
          detail='Birth in incompatible time'
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
            detail ="Branche "+MessageHelper.getMessage(LunarBase.getLabel(index)) + " cycle is "+ cycle;
            break;
          }
        }
      }
    }
    if (! qiForce.isFavorable ) {
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
            if (temp===ElementNEnergyRelation.EE || temp===ElementNEnergyRelation.EC) {
              qiForce= QiForce.FAVORABLE;
              detail ="Branche "+MessageHelper.getMessage(LunarBase.getLabel(pilarIdx)) + " deity is "+ temp;
              break;
            }
          }
          // Tomb
          // Also see Ref 9 p150
         //
          temp=BaziHelper.elementLifeCycle(dTrunk, branche)
          if ( temp===ElementLifeCycle.TOMB ) {
            qiForce= QiForce.FAVORABLE;
            detail ="Branche "+MessageHelper.getMessage(LunarBase.getLabel(pilarIdx)) + " cycle is "+ temp;
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
    let step = pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.GC,LunarBase.DINDEX)-
    pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.RC,LunarBase.DINDEX);
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
      const countECEE = pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.EC,LunarBase.DINDEX);
      const countRCRE =pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.RC,LunarBase.DINDEX);
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
    const count = pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.EC,dPilar ) +
    pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.GC,dPilar ) ;
    return count;
  }

  static countNonFavorableDeities (lunar: Lunar) {
    let pilarsAttr = lunar.pilarsAttr;
    const dPilar = LunarBase.DINDEX;
    const count = pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.GDC,dPilar ) +
    pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.RDC,dPilar ) +
    pilarsAttr.getPairedRelationCount(ElementNEnergyRelation.RC,dPilar );
    return count;
  }


  //Ref3 p70
  static getDayTrunkForce(lunar: Lunar, qiTypeData: QiTypeDataRec) {

    let dayForceData = new DataWithLog(0,"");

    // Factor 1
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.EARTHDAYTRUNKSUPPORT));
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.GROWDAYTRUNKSUPPORT));
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.PILARDAYTRUNKSUPPORT));
    dayForceData.addData(qiTypeData.getQiTypeDirection(
      QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE
    ));
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.SEASONCOMBINAISON));
    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.COMBINATIONOF3));

    // Other case of Ref3 p71
    //

    let pilarsAttr = lunar.pilarsAttr;
    const dayTrunkElement = pilarsAttr.trunkEE[LunarBase.DINDEX].getValue().element;
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

    dayForceData.addData(qiTypeData.getQiTypeDirection(QiType.BRANCHECLASHDAY,-1));

    return dayForceData;
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
    qiTypeData.addQiTypeForce(QiType.BRANCHECLASHDAY, force);

    force = QiHelper.getDayTrunkForce(lunar, qiTypeData);
    qiTypeData.addQiTypeForce(QiType.DAYSTATUS, force);
    return qiTypeData;
  }


   // Eval Mid Sesson against day element
    // See Ref3 p 71
    static getMidSeasonForce(bazi: Bazi) {
      let force = QiForce.NONE;

      let qiType = QiType.MIDSEASONCOMBINAISON;
      let  dayTrunk = bazi.getdTrunk();

      let brancheArr = bazi.brancheArr;
      let dayElement = dayTrunk.getElement();
      const combList = bazi.pilarsAttr.combList;
      let combTypeAttrList =
            combList.getCombTypeAttrList(CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE,LunarBase.DINDEX);
      if ( combTypeAttrList.length>0 ) {
        // Day pilar has season combination with transformation
        const trElement = combTypeAttrList[0].detail;
        for (let pilarIdx = 0; pilarIdx < brancheArr.length; pilarIdx++) {
            if (pilarIdx != LunarBase.DINDEX) {
                combTypeAttrList =
                  combList.getCombTypeAttrList(CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE,pilarIdx);
                if ( combTypeAttrList.length>0 ) {
                  // Theorically should has then same season combination with day pilar
                  const trElement = combTypeAttrList[0].resultData;
                  const elementRelation = trElement.getRelation(dayElement);
                    if (elementRelation.isFavorable()) {
                        force = force.getEnumNextNElement(1);
                    } else {
                        force = force.getEnumNextNElement(-1);
                    }
                }
            }

        }
    }
    let detail = 'Mid Season force ';
    if (force.isFavorable() ) {
      detail += 'favorable '
    } else {
      detail += 'non favorable '
    }
    return new DataWithLog(force.force,detail);
  }


  static getCombinationTypeForce(bazi: Bazi, type: number) {
    let qiForce = QiForce.NONE;
    const combList = bazi.pilarsAttr.combList;

    if ( combList.existRelationType(type)) {
      qiForce = QiForce.FAVORABLE;
    }
    let detail = 'Combination ';
    if (qiForce.isFavorable() ) {
      detail += 'favorable '
    } else {
      detail += 'non favorable '
    }
    return new DataWithLog(qiForce.force,detail);

  }

  static initBaseQiType(bazi: Bazi) {
    const qiTypeData = QiHelper.getLunarQiForce(bazi);
    let force = this.getMidSeasonForce(bazi);
    qiTypeData.addQiTypeForce(QiType.MIDSEASONCOMBINAISON,force);
    force = this.getCombinationTypeForce(bazi,CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE);
    qiTypeData.addQiTypeForce(QiType.COMBINATIONOF3,force);

  }
}
