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
import { ElementRelation } from '../mt-data/feng-shui/element-relation';
import { BaziHelper } from './baziHelper';
import { ElementLifeCycle } from '../mt-data/feng-shui/elementLifeCycle';
import { ElementNEnergyRelation } from '../mt-data/feng-shui/elementNEnergyRelation';
import { PilarsAttr } from '../mt-data/bazi/pilarsAttr';
import { TrunkHelper } from './trunkHelper';
import { BrancheRelation } from '../mt-data/bazi/brancheRelation';
import { LunarBase } from '../mt-data/bazi/lunarBase';
import { CombListHelper } from './combListHelper';
import { Bazi } from '../mt-data/bazi/bazi';
import { CombAttr } from '../mt-data/bazi/combinationList';

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
  static getBirthSeasonForce(lunar: Lunar) {
    let qiForce = QiForce.HOSTILE;
    const season = lunar.getmBranche().season;
    if (season.isYin(lunar.yinCount)) {
      qiForce = QiForce.MEDIUM;
    }
    if (season.isYang(lunar.yangCount)) {
      if (qiForce.isEqual(QiForce.HOSTILE)) {
        qiForce = QiForce.MEDIUM;
      } else {
        qiForce = QiForce.FAVORABLE;
      }
    }
    return qiForce.force;
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
  static getBirthMonthThemeForce(lunar: Lunar) {
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
    return qiForce.force;
  }

  // REF 7a p7.1: MONTHBRANCHEDAYTRUNKLIFECYCLE
  //
  static getMonthDayTrunkLifeCycleForce(lunar: Lunar) {
    let qiForce = QiForce.NONE;
    const elementLC = BaziHelper.elementLifeCycle(
      lunar.getdTrunk(),
      lunar.getmBranche()
    );
    if (elementLC.qiForce.isEqual(QiForce.FAVORABLE)) {
      const eer = BaziHelper.eNeTrunkRelation(
        lunar.getmTrunk(),
        lunar.getdTrunk()
      );
      if (eer.isProductive()) {
        qiForce = QiForce.FAVORABLE;
      } else {
        qiForce = QiForce.HOSTILE;
      }
    }
    return qiForce.force;
  }

  // Ref 9 p150
  // Ref 10a p136: EARTHDAYTRUNKSUPPORT
  static getDayEarthTrunkForce(lunar: Lunar) {
    const favorableForce = QiForce.FAVORABLE.force;
    const dTrunk = lunar.getdTrunk();
    const dBranche = lunar.getdBranche();
    const dTrunkEnE = dTrunk.elementNEnergy;
    const dTrElement = dTrunk.getElement();
    let relation = BaziHelper.getRelation(lunar.getyBranche().getElement(),dTrElement);

    if (
      relation === ElementRelation.GENERATE ||
      relation === ElementRelation.ENFORCE
    ) {
      return favorableForce;
    }

    relation = BaziHelper.getRelation(lunar.getmBranche().getElement(),dTrElement);
    if (
      relation === ElementRelation.GENERATE ||
      relation === ElementRelation.ENFORCE
    ) {
      return favorableForce;
    }

    relation = BaziHelper.getRelation(lunar.gethBranche().getElement(),dTrElement);
    if (
      relation === ElementRelation.GENERATE ||
      relation === ElementRelation.ENFORCE
    ) {
      return favorableForce;
    }
    // Can ngay + gap cac chi con lai TS
    if (dTrunk.getEnergy().isEqual(Energy.YANG)) {
      if (
        BaziHelper.elementLifeCycle(dTrunk, lunar.getyBranche()).isEqual(
          ElementLifeCycle.BIRTH
        )
      ) {
        return favorableForce;
      }
      if (
        BaziHelper.elementLifeCycle(dTrunk, dBranche).isEqual(
          ElementLifeCycle.BIRTH
        )
      ) {
        return favorableForce;
      }
      if (
        BaziHelper.elementLifeCycle(dTrunk, lunar.gethBranche()).isEqual(
          ElementLifeCycle.BIRTH
        )
      ) {
        return favorableForce;
      }
    }
    // Can ngay gap loc
    // Kinh Duong
    //
    const hiddenTrunk = BrancheHelper.getHiddenTrunk(dBranche);
    for (let index = 0; index < hiddenTrunk.length; index++) {
      const htr = hiddenTrunk[index];
      const eNeR = BaziHelper.eNeTrunkRelation(htr, dTrunk);
      if (
        eNeR.isEqual(ElementNEnergyRelation.EE) ||
        eNeR.isEqual(ElementNEnergyRelation.EC)
      ) {
        return favorableForce;
      }
    }

    // Tomb
    // Also see Ref 9 p150
    // Examine only month, hour and day. Year is too far and has no influence
    //
    if (
      BaziHelper.elementLifeCycle(dTrunk, lunar.getyBranche()).isEqual(
        ElementLifeCycle.TOMB
      )
    ) {
      return favorableForce;
    }
    if (
      BaziHelper.elementLifeCycle(dTrunk, dBranche).isEqual(
        ElementLifeCycle.TOMB
      )
    ) {
      return favorableForce;
    }
    if (
      BaziHelper.elementLifeCycle(dTrunk, lunar.gethBranche()).isEqual(
        ElementLifeCycle.TOMB
      )
    ) {
      return favorableForce;
    }

    return QiForce.NONE.force;
  }

  // Ref 7a p7.1,7.2
  // Ref 9  p152
  // Duoc Sinh (Soutien par la croissance). GROWDAYTRUNKSUPPORT
  static getDayGrowSupportForce(lunar: Lunar) {
    let qiForce = QiForce.NONE;
    let force=0;
    const eerCount=lunar.pilarsAttr.eerCount;
    // Case Trunk
    qiForce.getEnumNextNElement(eerCount[ElementNEnergyRelation.GC.ordinal()]);
    qiForce.getEnumNextNElement(eerCount[ElementNEnergyRelation.GE.ordinal()]);
    qiForce.getEnumNextNElement(- eerCount[ElementNEnergyRelation.RE.ordinal()]);
    qiForce.getEnumNextNElement(-eerCount[ElementNEnergyRelation.RC.ordinal()]);
    return qiForce.force;
  }


  // Ref 3 p62
  static getTransformableElement(lunar: Lunar, qiTypeData: QiTypeDataRec) {
    let element = null;
    const dayTrunk = lunar.getdTrunk();
    const dayBranche = lunar.getdBranche();

    if (qiTypeData.isFavorable(QiType.TRUNKCOMBINAISON)) {
      // Case 1: Month or day transformable with month branche'element equals result element
       element = PilarsAttr.getTransformable(
        lunar.getmTrunk(),
        dayTrunk,
        lunar.getmBranche().getElement()
      );
      if (element !== null) {
        return element;
      }
      // Hour and day transformable
      element = PilarsAttr.getTransformable(
        lunar.gethTrunk(),
        dayTrunk,
        lunar.getmBranche().getElement()
      );
      if (element !== null) {
        return element;
      }
      // Case 2: Year trunk
      element = PilarsAttr.getTransformable(
        lunar.getyTrunk(),
        lunar.getmTrunk(),
        lunar.getyBranche().getElement()
      );
      if (element !== null) {
        return element;
      }
      // Case 3
      element = TrunkHelper.getTransformElement(dayTrunk);
      // Case 3a day and month
      if (TrunkHelper.isTransformable(lunar.getyTrunk(), lunar.getmTrunk())) {
        if (
          BrancheHelper.isSameCombination(lunar.gethBranche(),
            dayBranche,
            lunar.getyBranche()
          )
        ) {
          if (
            element === BrancheRelation.getCombinaisonResultElement(dayBranche).getValue()
          ) {
            return element;
          }
        }
        if (
          CombListHelper.hasSameSeasonCombination(
            lunar,
            LunarBase.DINDEX
          )
        ) {
          if (element === dayBranche.season.element) {
            return element;
          }
        }
      }
      // Case 3b day and hour
      if (TrunkHelper.isTransformable(lunar.getyTrunk(), lunar.gethTrunk())) {
        if (
          BrancheHelper.isSameCombination( lunar.getmBranche(),
            dayBranche,
            lunar.getyBranche()
          )
        ) {
          if (
            element === BrancheRelation.getCombinaisonResultElement(dayBranche).getValue()
          ) {
            return element;
          }
        }
        if (
          CombListHelper.hasSameSeasonCombination(
            lunar,
            LunarBase.DINDEX
          )
        ) {
          if (element === dayBranche.season.element) {
            return element;
          }
        }
      }
    }
    return element;
  }

  static getDayForce(lunar: Lunar, qiTypeData: QiTypeDataRec) {
    let fCount = 0;

    fCount += qiTypeData.getQiTypeDirection(QiType.EARTHDAYTRUNKSUPPORT);
    fCount += qiTypeData.getQiTypeDirection(QiType.GROWDAYTRUNKSUPPORT);
    fCount += qiTypeData.getQiTypeDirection(QiType.PILARDAYTRUNKSUPPORT);
    fCount += qiTypeData.getQiTypeDirection(
      QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE
    );
    fCount += qiTypeData.getQiTypeDirection(QiType.SEASONCOMBINAISON);
    fCount += qiTypeData.getQiTypeDirection(QiType.COMBINATIONOF3);

    // Other case of Ref3 p71
    //
    const dayTrunk = lunar.getdTrunk();
    // Find Trunk favorable combinaison with transformation
    if (qiTypeData.isFavorable(QiType.DAYCOMBINETRANSFORM)) {
      const element = this.getTransformableElement(lunar, qiTypeData);
      if (element !== null) {
        const relation = BaziHelper.getRelation(element,dayTrunk.getElement());

        if (
          relation === ElementRelation.GENERATE ||
          relation === ElementRelation.ENFORCE
        ) {
          fCount++;
        }
      }
    }

    if (qiTypeData.isFavorable(QiType.BRANCHCOMBINAISONRESTRICTDAY)) {
      fCount--;
    } else {
      fCount += qiTypeData.getQiTypeDirection(QiType.MIDCOMBINATION);
      fCount += qiTypeData.getQiTypeDirection(QiType.MIDSEASONCOMBINAISON);
    }
    fCount += qiTypeData.getQiTypeDirection(QiType.BRANCHECLASHDAY);

    return fCount;
  }


  static getLunarQiForce(lunar: Lunar) {
    const qiTypeData: QiTypeDataRec = new QiTypeDataRec();
    let force = QiHelper.getBirthSeasonForce(lunar);
    qiTypeData.addQiTypeForce(QiType.BIRTHSEASONENERGY, force);
    force = QiHelper.getBirthMonthThemeForce(lunar);
    qiTypeData.addQiTypeForce(QiType.BIRTHSOLARTERMENERGY, force);
    force = QiHelper.getMonthDayTrunkLifeCycleForce(lunar);
    qiTypeData.addQiTypeForce(QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE, force);
    force = QiHelper.getDayEarthTrunkForce(lunar);
    qiTypeData.addQiTypeForce(QiType.EARTHDAYTRUNKSUPPORT, force);
    force = QiHelper.getDayGrowSupportForce(lunar);
    qiTypeData.addQiTypeForce(QiType.GROWDAYTRUNKSUPPORT, force);
    force = QiHelper.getDayForce(lunar, qiTypeData);
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
    return force.force;
  }


  static getCombinationTypeForce(bazi: Bazi, type: number) {
    let qiForce = QiForce.NONE;
    const combList = bazi.pilarsAttr.combList;

    if ( combList.existRelationType(type)) {
      qiForce = QiForce.FAVORABLE;
    }
    return qiForce.force

  }

  static initBaseQiType(bazi: Bazi) {
    const qiTypeData = QiHelper.getLunarQiForce(bazi);
    let force = this.getMidSeasonForce(bazi);
    qiTypeData.addQiTypeForce(QiType.MIDSEASONCOMBINAISON,force);
    force = this.getCombinationTypeForce(bazi,CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE);
    qiTypeData.addQiTypeForce(QiType.COMBINATIONOF3,force);

  }
}
