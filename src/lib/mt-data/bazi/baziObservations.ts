import { BaziStructureHelper } from "../../helper/bazi-structureHelper";
import { BaziHelper } from "../../helper/baziHelper";
import { BrancheHelper } from "../../helper/brancheHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { StringHelper } from "../../helper/stringHelper";
import { ObservationBase } from "../../observations/observationBase";
import { Element } from "../feng-shui/element";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { DataWithLog } from "../qi/dataWithLog";
import { QiType } from "../qi/qi-type";
import { QiTypeDataRec } from "../qi/qi-type-data-rec";
import { Bazi } from "./bazi";
import { BaziStructure } from "./bazi-structure";
import { Branche } from "./branche";
import { CombAttr } from "./combinationList";
import { Lunar } from "./lunar";
import { LunarBase } from "./lunarBase";
import { SecondaryDeity } from "./secondaryDeity";
import { Trunk } from "./trunk";

export class BaziObservationBase extends ObservationBase {
  // See to update it for each period
  currPeriodComplementForceFactor = 0.0;
  baseQiTypeData: QiTypeDataRec[];
  lunar: Bazi;
  hasQuyNhan: boolean;
  noQuyNhanSuffix = "";

  constructor(bazi: Bazi) {
    super();
    this.lunar = bazi;
    this.evalQuyNhan();
  }



  private evalQuyNhan() {
    const pilarsAttr = this.lunar.pilarsAttr;
    this.hasQuyNhan = false;
    this.noQuyNhanSuffix = ".NoQuy";

    for (let index = 0; index < SecondaryDeity.quyNhanArr.length; index++) {
      if (
        BaziHelper.existsecDeity(
          pilarsAttr.secondaryDeityPilars,
          SecondaryDeity.quyNhanArr[index]
        )
      ) {
        this.hasQuyNhan = true;
        this.noQuyNhanSuffix = "";
        break;
      }
    }
  }

  private evalInitialPoints() {
    this.baseQiTypeData = [];
    this.baseQiTypeData.push(this.lunar.pilarsAttr.qiTypeData);
  }

  override addBaseComment(rawKey: string) : boolean {
    //console.log("BaziObservationBase addBase comment ", rawKey);
    return super.addBaseComment(rawKey);
  }

  //Ref8p61-
  //Ref3p136-
  //"SecDeType1a secDeyty. forceFavorale (.noQuy)
  //SP.KTH.Ref7_2ap21a
  //TypeTr1.Y.Quy
  private commentOnSecDeity() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const len = pilarsAttr.secDeityForceArr.length;
    for (let index = 0; index < len; index++) {
      const force = pilarsAttr.secDeityForceArr[index];
      const forceFavorable = force > 3;
      const secDeity1 = SecondaryDeity.AMDUONGLECH.getEnum(
        index
      ) as SecondaryDeity;
      let temp = "." + StringHelper.bool2Str(forceFavorable);
      if (force > 0) {
        const temp = "." + StringHelper.bool2Str(forceFavorable);
        this.addBaseComment(
          "SecDeType1a." + secDeity1.getName() + temp + this.noQuyNhanSuffix
        );
        if (secDeity1 === SecondaryDeity.KIMTHAN) {
          if (pilarsAttr.getElementForce(Element.FIRE) > 0) {
            this.addBaseComment("SP.KTH.Ref7_2ap21a" + this.noQuyNhanSuffix);
          } else {
            if (
              pilarsAttr.isFavorableElement(Element.WATER) ||
              pilarsAttr.isFavorableElement(Element.METAL)
            ) {
              this.addBaseComment("SP.KTH.Ref7_2ap21b" + this.noQuyNhanSuffix);
            }
          }
        }
      }
    }
    // Quy Nhan on year pilar
    for (let index = 0; index < SecondaryDeity.quyNhanArr.length; index++) {
      if (
        pilarsAttr.hasSecDeity(
          LunarBase.YINDEX,
          SecondaryDeity.quyNhanArr[index]
        )
      ) {
        this.addBaseComment("TypeTr1.Y.Quy");
        break;
      }
    }
  }

  private commentOnElementNEnergyRelation() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const eNeR =
      ElementNEnergyRelation.DR.getValues() as ElementNEnergyRelation[];
    const len = eNeR.length;
    const dIndex = LunarBase.DINDEX;
    const DOT = ".";
    for (let index1 = 0; index1 < len; index1 = index1 + 2) {
      let count = pilarsAttr.getPairedRelationCount(eNeR[index1], dIndex);
      const secDeity1 = ElementNEnergyRelation.DR.getEnum(
        index1
      ) as ElementNEnergyRelation;
      let temp = "." + StringHelper.number2Str(count); // 0 or + Never -
      for (let index2 = index1 + 1; index2 < len; index2++) {
        const secDeity2 = ElementNEnergyRelation.DR.getEnum(
          index2
        ) as SecondaryDeity;
        count = pilarsAttr.secDeityForceArr[index2]; // 0 or + Never -
        const temp2 =
          secDeity1.getName() +
          temp +
          "." +
          secDeity2.getName() +
          DOT +
          StringHelper.number2Str(count);
        // EnERType1.EE.{0,-,+}.EC.{0,-,+}&
        this.addBaseComment("EnERType1." + temp2);
        for (let index3 = index2 + 1; index3 < len; index3++) {
          count = pilarsAttr.secDeityForceArr[index3];
          const secDeity3 = ElementNEnergyRelation.DR.getEnum(
            index3
          ) as SecondaryDeity;
          this.addBaseComment(
            "EnERType1." +
              temp2 +
              DOT +
              secDeity3.getName() +
              DOT +
              StringHelper.number2Str(count)
          );
        }
      }
    }
  }

  private commentOnVoid() {
    let count = 0;
    const pilarsAttr = this.lunar.pilarsAttr;
    let pilars = "";
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      if (pilarsAttr.hasSecDeity(pilarIdx, SecondaryDeity.VOID)) {
        const lab = LunarBase.getPilarShortLabel(pilarIdx);
        this.addBaseComment("Vd." + lab);
        pilars += lab;
        count++;
        if (this.hasQuyNhan) {
          const secDeities =
            this.lunar.pilarsAttr.secondaryDeityPilars[pilarIdx];
          for (let index = 0; index < secDeities.length; index++) {
            const secDeity = secDeities[index];
            this.addBaseComment("DtyHidden2." + secDeity.getName() + ".Vd.Quy");
          }
        }
      }
    }
    if (count > 0) this.addBaseComment("Vd." + pilars);
  }

  private commentOnTrunkTransform() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const combList = pilarsAttr.combList;
    const DOT = ".";
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      const compAttrList = combList.getCombTypeAttrList(
        CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
        pilarIdx
      );
      for (let index = 0; index < compAttrList.length; index++) {
        const transfElement = compAttrList[index].resultData;
        const trunkArr = compAttrList[index].trunkAttrs;
        let otherPilar = trunkArr[0];
        if (otherPilar === pilarIdx) otherPilar = trunkArr[1];
        const eer = pilarsAttr.trunkRelation[pilarIdx][otherPilar];
        const baseGroupName = eer.getBaseGroup().getName();
        // NGHType1a.eeR.TrfElement&
        this.addBaseComment("NGHType1c." + baseGroupName + DOT + transfElement);
        // NGHType1b.{H,M,D,Y}.eeR.Element.{H,M,D,Y}&
        this.addBaseComment(
          "NGHType1d." +
            LunarBase.getPilarShortLabel(pilarIdx) +
            DOT +
            baseGroupName +
            DOT +
            transfElement +
            DOT +
            LunarBase.getPilarShortLabel(otherPilar)
        );
        if (transfElement === Element.EARTH) {
          if (pilarsAttr.isWeakedElement(Element.EARTH)) {
            if (
              pilarsAttr.getRelationCount(
                ElementNEnergyRelation.K7,
                LunarBase.DINDEX
              ) > 0
            ) {
              this.addBaseComment(
                "NGHType2a." +
                  baseGroupName +
                  DOT +
                  transfElement +
                  ".-." +
                  ElementNEnergyRelation.K7.getName()
              );
            }
            const lifeCycle = ElementLifeCycle.getElementLifeCycle(
              this.lunar.trunkArr[pilarIdx],
              this.lunar.brancheArr[LunarBase.DINDEX]
            );
            // NGHType2b.eeR.Element.{+,-}.LifeCycle&
            this.addBaseComment(
              "NGHType2b." +
                baseGroupName +
                DOT +
                transfElement +
                ".-." +
                lifeCycle.getName()
            );
          }
        }
      }
    }
  }

  // Ref8 page 38-39
  // Type TAH.FIRE&
  private commentSeasonCombinaison() {
    const DOT = ".";
    const pilarsAttr = this.lunar.pilarsAttr;
    const combList = pilarsAttr.combList;
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      const compAttrList = combList.getCombTypeAttrList(
        CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE,
        pilarIdx
      );
      const key = QiType.SEASONCOMBINAISON.getName();
      for (let index = 0; index < compAttrList.length; index++) {
        const transfElement = compAttrList[index].resultData;
        this.addBaseComment(key + DOT + transfElement);
      }
    }
  }

  // BRType1.BrancheRelation.eeR&
  // BRType2.BrancheRelation.{H,M,D,Y}.{H,M,D,Y}
  // BRType5a.-.{H,M,D,Y}&
  // BRType5b.-.{H,M,D,Y}.{H,M,D,Y}.&
  private commentCombType(relationType: number, relationTypeKey: string) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const combList = pilarsAttr.combList;
    const DOT = ".";
    const brancheArr = this.lunar.brancheArr;
    const trunkArr = this.lunar.trunkArr;
    if (combList.existRelationType(relationType)) {
      for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
        const compAttrList = combList.getCombTypeAttrList(
          relationType,
          pilarIdx
        );
        const fromPilar = LunarBase.getPilarShortLabel(pilarIdx);
        for (let index = 0; index < compAttrList.length; index++) {
          const bArr = compAttrList[index].branchAttrs;
          let otherPilar = bArr[0];
          let key = "";
          if (otherPilar === pilarIdx) otherPilar = bArr[1];
          if (pilarIdx < otherPilar) {
            const toPilar = LunarBase.getPilarShortLabel(otherPilar);
            const pilarsFromTo = fromPilar + DOT + toPilar;
            let relation = pilarsAttr.trunkRelation[pilarIdx][LunarBase.DINDEX];
            const trElement = compAttrList[index].resultData;
            if (trElement !== null) {
              key =
                "BRType1" + DOT + relationTypeKey + DOT + trElement.getName();
              this.addBaseComment(key);
            }
            key = "BRType1" + DOT + relationTypeKey;
            this.addBaseComment(key);

            const lifeCycle = ElementLifeCycle.getElementLifeCycle(
              trunkArr[pilarIdx],
              brancheArr[LunarBase.DINDEX]
            );
            key = "BRType1" + DOT + relationTypeKey + DOT + lifeCycle.getName();
            this.addBaseComment(key);

            key = "BRType1" + DOT + relationTypeKey + DOT + relation.getName();
            this.addBaseComment(key);

            key = "BRType2" + DOT + relationTypeKey + DOT + pilarsFromTo;
            this.addBaseComment(key);
            if (relation.isProductive()) {
              key = "BRType5a.-." + toPilar;
              this.addBaseComment(key);
              key = "BRType5b.-." + pilarsFromTo;
              this.addBaseComment(key);
            }
          }
        }
      }
    }
  }

  // BRType3.BrancheName.BrancheName&
  // BRType4a.OX.DOG.GOAT&
  // BRType4b.OX.DOG.GOAT.{+,-}&
  private commentBrancheName() {
    const brancheArr = this.lunar.brancheArr;
    const trunkArr = this.lunar.trunkArr;
    let brancheSet: Branche[] = [];
    let combStatus = ".+";
    for (let pilarIdx = 0; pilarIdx < brancheArr.length; pilarIdx++) {
      const branche = brancheArr[pilarIdx];
      ObjectHelper.pushIfNotExist(brancheSet, branche);
      if (
        branche == Branche.OX ||
        branche == Branche.DOG ||
        branche == Branche.GOAT
      ) {
        const lifeCycle = ElementLifeCycle.getElementLifeCycle(
          trunkArr[pilarIdx],
          brancheArr[LunarBase.DINDEX]
        );
        const lfOrd = lifeCycle.ordinal();
        if (
          lfOrd != ElementLifeCycle.BATH.ordinal() &&
          lfOrd <= ElementLifeCycle.PROSPERITY.ordinal()
        ) {
          combStatus = ".-";
        }
      }
    }
    if (
      ObjectHelper.hasItem(brancheSet, Branche.RAT) &&
      ObjectHelper.hasItem(brancheSet, Branche.RABBIT)
    ) {
      this.addBaseComment("BRType3.RAT.RABBIT");
    }
    if (
      ObjectHelper.hasItem(brancheSet, Branche.OX) &&
      ObjectHelper.hasItem(brancheSet, Branche.DOG) &&
      ObjectHelper.hasItem(brancheSet, Branche.GOAT)
    ) {
      this.addBaseComment("BRType4b.OX.DOG.GOAT" + combStatus);
    } else {
      if (
        ObjectHelper.hasItem(brancheSet, Branche.TIGER) &&
        ObjectHelper.hasItem(brancheSet, Branche.SNAKE) &&
        ObjectHelper.hasItem(brancheSet, Branche.MONKEY)
      ) {
        this.addBaseComment("BRType4a.TIGER.SNAKE.MONKEY");
      }
    }
  }

  private commentOnOneDeityCount(maxCount: number) {
    const pilarsAttr=this.lunar.pilarsAttr;
    const len = pilarsAttr.deityPilarCount.length;
    const DOT = ".";
    const suffix = ".+";
    for (let index = 0; index < len; index++) {
      const count = pilarsAttr.deityPilarCount[index];
      if (count === maxCount) {
        const eNER = ElementNEnergyRelation.DR.getEnum(
          index
        ) as ElementNEnergyRelation;
        const key = eNER.getName();
        // DtyOnPilar1.EE.{-,+}&
        this.addBaseComment("DtyOnPilar1." + key + suffix);
        // DtyType1a.EE.{0,-,+}&
        this.addBaseComment("DtyType1a." + key + suffix);
        const eNERBase = eNER.getBaseGroup();
        if (eNERBase !== eNER) {
          this.addBaseComment("DtyGType1a." + eNERBase.getName() + suffix);
        }
        const eerElement = pilarsAttr.getDeityElement(eNER);
        const pivotStatus = this.lunar.pilarsAttr.getPivotStatus(eerElement);
        // DtyOnPilar2.EE.{0,1,2,3}.{0,-,+}&
        this.addBaseComment("DtyOnPilar2." + key + DOT + pivotStatus + suffix);
      }
    }
  }

  private commentOnZeroDeityCount() {
    const suffix = ".0";
    const pilarsAttr=this.lunar.pilarsAttr;
    for (let index = 0; index < pilarsAttr.deityPilarCount.length; index++) {
      const count = pilarsAttr.deityPilarCount[index];
      if (count === 0) {
        const eNER = ElementNEnergyRelation.DR.getEnum(
          index
        ) as ElementNEnergyRelation;
        const key = eNER.getName();
        // DtyType1a.EE.{0,-,+}&
        this.addBaseComment("DtyType1a." + key + suffix);
        const eNERBase = eNER.getBaseGroup();
        if (eNERBase !== eNER) {
          this.addBaseComment("DtyGType1a." + eNERBase.getName() + suffix);
        }
        const hiddenCount = pilarsAttr.hiddenDeityPilarCount[index];
        if (hiddenCount > 0) {
          // DtyHidden.EE.{0,-,+}&
          const temp = key + suffix;
          this.addBaseComment("DtyHidden1." + temp);
        }
      }
    }
  }

  // DtyType2a.EE.EC&
  // DtyType2b.EE.EC.{0,-,+}.{0,-,+}&
  // DtyGType2a.EEGroup.ECGroup.{+}.{0,-,+}&
  // DtyGType2a.EE.ECGroup.{+}.{0,-,+}&
  private commentOnTwoDeitiesCount(count1: number, count2: number) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const len = pilarsAttr.deityPilarCount.length;
    const DOT = ".";
    let suffix = ".+.";
    if (count2 === count1) {
      suffix += "+.";
    } else {
      if (count2 > 0) {
        suffix += "-";
      } else {
        suffix += "0";
      }
    }
    for (let index1 = 0; index1 < len; index1++) {
      if (count1 === pilarsAttr.deityPilarCount[index1]) {
        for (let index2 = 0; index2 < len; index2++) {
          if (index1 != index2 && pilarsAttr.deityPilarCount[index2] === count2) {
            const eNER1 = ElementNEnergyRelation.DR.getEnum(
              index1
            ) as ElementNEnergyRelation;
            const eNER2 = ElementNEnergyRelation.DR.getEnum(
              index2
            ) as ElementNEnergyRelation;
            const temp = eNER1.getName() + DOT + eNER2.getName();
            // DtyType2a.EE.EC&
            if (count2 > 0) {
              this.addBaseComment("DtyType2a." + temp);
            }
            // DtyType2b.EE.EC.{0,-,+}.{0,-,+}&
            this.addBaseComment("DtyType2b." + temp + suffix);
            const eNER1Base = eNER1.getBaseGroup() as ElementNEnergyRelation;
            const eNER2Base = eNER2.getBaseGroup() as ElementNEnergyRelation;
            const gCount1 = pilarsAttr.getPairedRelationCount(
              eNER1Base,
              LunarBase.DINDEX
            );
            const gCount2 = pilarsAttr.getPairedRelationCount(
              eNER2Base,
              LunarBase.DINDEX
            );
            let gSuffix = ".+."; // Assume that eNER1 is the strongest count
            if (gCount2 > gCount1) {
              gSuffix += "+";
            } else {
              if (gCount2 > 0) {
                gSuffix += "-";
              } else {
                gSuffix += "0";
              }
            }
            // DtyGType2a.EEGroup.ECGroup.{+}.{0,-,+}&
            this.addBaseComment(
              "DtyGType2a." +
                eNER1Base.getName() +
                DOT +
                eNER2Base.getName() +
                DOT +
                gSuffix
            );
            // DtyGType2a.EE.ECGroup.{+}.{0,-,+}&
            this.addBaseComment(
              "DtyGType2a." +
                eNER1.getName() +
                DOT +
                eNER2Base.getName() +
                DOT +
                gSuffix
            );
          }
        }
      }
    }
  }

  // DtyType3a.EE.EC.EY.{0,-,+}.{0,-,+}.{0,-,+}&
  /// DtyGType3a.EE.EC.EY.{0,-,+}.{0,-,+}.{0,-,+}&
  private commentOnThreeDeitiesCount(
    count1: number,
    count2: number,
    count3: number
  ) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const len = pilarsAttr.deityPilarCount.length;
    const DOT = ".";
    const sameOrder = count2 === count3;
    let suffix = ".+.";
    if (count2 > 0) {
      suffix += "-.";
    } else {
      suffix += "0.";
    }
    if (count3 > 0) {
      suffix += "-.";
    } else {
      suffix += "0.";
    }
    for (let index1 = 0; index1 < len; index1++) {
      if (count1 === pilarsAttr.deityPilarCount[index1]) {
        const eNER1 = ElementNEnergyRelation.DR.getEnum(
          index1
        ) as ElementNEnergyRelation;
        for (let index2 = 0; index2 < len; index2++) {
          for (let index3 = 0; index3 < len; index3++) {
            if (
              index1 != index2 &&
              index3 != index2 &&
              pilarsAttr.deityPilarCount[index3] === count3
            ) {
              const eNER2 = ElementNEnergyRelation.DR.getEnum(
                index2
              ) as ElementNEnergyRelation;
              const eNER3 = ElementNEnergyRelation.DR.getEnum(
                index3
              ) as ElementNEnergyRelation;
              let temp = eNER1.getName() + DOT;
              if (sameOrder && index3 > index2) {
                temp += eNER3.getName() + DOT + eNER2.getName();
              } else {
                temp += eNER2.getName() + DOT + eNER3.getName();
              }
              // DtyType3a.EE.EC.EY.{0,-,+}.{0,-,+}.{0,-,+}&
              this.addBaseComment("DtyType3a." + temp + suffix);
              const eNER1Base = eNER1.getBaseGroup() as ElementNEnergyRelation;
              const eNER1BaseKey = eNER1Base.getName();
              const eNER2Base = eNER2.getBaseGroup() as ElementNEnergyRelation;
              const eNER2BaseKey = eNER2Base.getName();
              const eNER3Base = eNER3.getBaseGroup() as ElementNEnergyRelation;
              const eNER3BaseKey = eNER3Base.getName();
              /// DtyGType3a.EE.EC.EY.{0,-,+}.{0,-getBase,+}.{0,-,+}&
              this.addBaseComment(
                "DtyGType2a." +
                  eNER1BaseKey +
                  DOT +
                  eNER2BaseKey +
                  DOT +
                  eNER3BaseKey +
                  DOT +
                  suffix
              );
              const pilarsAttr = this.lunar.pilarsAttr;
              const dayForce = StringHelper.bool2Str(
                pilarsAttr.qiTypeData.isFavorable(QiType.DAYSTATUS)
              );
              const eNeRElement = pilarsAttr.getDeityElement(eNER1Base);
              const pivotStatus = pilarsAttr.getPivotStatus(eNeRElement);
              // DtyGType4a.DayForce.EE.PivorStatus.EX.EY& EX>EY
              // Suffix is not necessary assuming count EE>=EX>=EY
              this.addBaseComment(
                "DtyGType4a." +
                  dayForce +
                  DOT +
                  eNER1BaseKey +
                  DOT +
                  pivotStatus +
                  DOT +
                  eNER2BaseKey +
                  DOT +
                  eNER3BaseKey
              );
            }
          }
        }
      }
    }
  }

  //DayForce1a.DayForce.DRIRCountForce.HOEGCountForce.DO7KCountForce+
  //DayForce1b.DayForce.RWFCountForce.DRIRCountForce.HOEGCountForce.DO7KCountForce+
  //DayForce1c.DayForce
  //DayForce1c.DayForce.KHD
  private commentOnDayForceCombination() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const dayForce = StringHelper.bool2Str(
      pilarsAttr.qiTypeData.isFavorable(QiType.DAYSTATUS)
    );
    const DOT = ".";
    const dIndex = LunarBase.DINDEX;
    const favThresHold = BaziStructureHelper.FAVTHRESHHOLD;
    const RWBaseGroup = ElementNEnergyRelation.RW;
    const RWGroupCount = pilarsAttr.getPairedRelationCount(RWBaseGroup, dIndex);
    const DRIRProductorBaseGroup = ElementNEnergyRelation.DR;
    const DRIRProductorBaseGroupCount = pilarsAttr.getPairedRelationCount(
      DRIRProductorBaseGroup,
      dIndex
    );
    const DOControlBaseGroup = ElementNEnergyRelation.DO;
    const DO7KControlBaseGroupCount = pilarsAttr.getPairedRelationCount(
      DOControlBaseGroup,
      dIndex
    );
    const HOEGProductBaseGroup = ElementNEnergyRelation.HO;
    const HOEGProductBaseGroupCount = pilarsAttr.getPairedRelationCount(
      HOEGProductBaseGroup,
      dIndex
    );
    const DO7KControlBaseGroupSuffix = StringHelper.number2Str(
      DO7KControlBaseGroupCount,
      favThresHold
    );
    const DRIRProductorBaseGroupCountSuffix = StringHelper.number2Str(
      DRIRProductorBaseGroupCount,
      favThresHold
    );
    const RWFElementInBaseGroupCountSuffix = StringHelper.number2Str(
      RWGroupCount,
      favThresHold
    );
    const HOEGProductBaseGroupCountSuffix = StringHelper.number2Str(
      HOEGProductBaseGroupCount,
      favThresHold
    );
    //DayForce1a.DayForce.DRIRCountForce.HOEGCountForce.DO7KCountForce+
    this.addBaseComment(
      "DayForce1a." +
        dayForce +
        DOT +
        DRIRProductorBaseGroupCountSuffix +
        DOT +
        HOEGProductBaseGroupCountSuffix +
        DOT +
        DO7KControlBaseGroupSuffix
    );
    //DayForce1b.DayForce.RWFCountForce.DRIRCountForce.HOEGCountForce.DO7KCountForce+
    this.addBaseComment(
      "DayForce1b." +
        dayForce +
        DOT +
        RWFElementInBaseGroupCountSuffix +
        DOT +
        DRIRProductorBaseGroupCountSuffix +
        DOT +
        HOEGProductBaseGroupCountSuffix +
        DOT +
        DO7KControlBaseGroupSuffix
    );
    if (
      BaziHelper.existsecDeity(
        pilarsAttr.secondaryDeityPilars,
        SecondaryDeity.KINHDUONG
      )
    ) {
      //DayForce1c.DayForce.+KHD
      this.addBaseComment(
        "DayForce1c." + dayForce + DOT + SecondaryDeity.KINHDUONG.getName()
      );
    } else {
      //DayForce1c.DayForce
      this.addBaseComment("DayForce1c." + dayForce);
    }
  }

  //Type12a.EX.{Y,M,D,H}.{-,+}.EE.0.DR.+
  private commentOnPilarCombination(
    checkeNeR: ElementNEnergyRelation,
    checkPilarIdx: number,
    dayForceSuffix: string
  ) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const trunkRelation = pilarsAttr.trunkRelation;
    const dIndex = LunarBase.DINDEX;
    let isInOneTrunk = true;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (pilarIdx !== checkPilarIdx) {
        if (trunkRelation[pilarIdx][dIndex] === checkeNeR) {
          isInOneTrunk = false;
          break;
        }
      }
    }
    //
    const DOT = ".";
    const checkeNeRKey = checkeNeR.getName();
    const checkPilarKey = LunarBase.getPilarShortLabel(checkPilarIdx);
    let otherBaseCheckENER = checkeNeR.getOtherElementInSameBaseGroup();

    const sameElementInBaseGroupCount = pilarsAttr.getRelationCount(
      otherBaseCheckENER,
      dIndex
    );
    const supportDRCount = pilarsAttr.getPairedRelationCount(
      ElementNEnergyRelation.DR,
      dIndex
    );
    if (sameElementInBaseGroupCount === 0) {
      // absence of other element in the same base group
      if (
        supportDRCount > 0 // Presence of Master day support eneR
      ) {
        if (isInOneTrunk) {
          //Type12a.EX.{Y,M,D,H}.{-,+}.EE.0.DR.+
          this.addBaseComment(
            "Type12a." +
              checkeNeRKey +
              DOT +
              checkPilarKey +
              DOT +
              dayForceSuffix +
              DOT +
              otherBaseCheckENER.getName() +
              ".0.DR.+"
          );
        }
      }
    } else {
      if (
        supportDRCount === 0 // Absence of Master day support eneR
      ) {
        if (isInOneTrunk) {
          //Type12a.EX.{Y,M,D,H}.{-,+}.EE.0.DR.+
          this.addBaseComment(
            "Type12a." +
              checkeNeRKey +
              DOT +
              checkPilarKey +
              DOT +
              dayForceSuffix +
              DOT +
              otherBaseCheckENER.getName() +
              ".+.DR.0"
          );
        } else {
        }
      }
    }
  }

  private commentOnDeitiesCount() {
    this.commentOnZeroDeityCount();
    const pilarsAttr=this.lunar.pilarsAttr;
    const len = pilarsAttr.deityPilarCount.length;
    const sortedDeityCount = ObjectHelper.cloneArray(pilarsAttr.deityPilarCount);
    ObjectHelper.sortNumber(sortedDeityCount, true);
    console.log(sortedDeityCount);
    this.commentOnOneDeityCount(sortedDeityCount[len - 1]);

    for (let index = 0; index < len; index++) {
      this.commentOnTwoDeitiesCount(
        sortedDeityCount[len - 1],
        sortedDeityCount[len - 2 - index]
      );
    }

    for (let index = 0; index < len; index++) {
      this.commentOnThreeDeitiesCount(
        sortedDeityCount[len - 1],
        sortedDeityCount[len - 2 - index],
        sortedDeityCount[len - 3] - index
      );
    }
  }

  // TypeUnique.T.EE.Y.Unique&
  // TypeUnique.B.EE.Y.Unique&
  // Type1a.EE.1&
  // Type1b.EE.(PivotStatus)1.EX(noQuy)&
  // Type1b.EE.(PivotStatus)1.EX.{0,-,+}&
  // Type1c.EE.DEITYFORCE{+,-}.EX.{0,-,+}&
  // Type1d.EE.EX(.N0Quy)&
  // Type1f.EE.DAYFORCE{+,-}.EX.{0,-,+}(.NOQUY)&
  // Type1g.{T.B}.EE.DAyforce.IsPivot&
  // Type1h.EE.Element.DayPilarElement
  // Type1i.EE.DayForce.EX
  // Type2a.EE.Y&
  // Type2b.{T.B}.EE.{H,M,D,Y}&
  // Type2b.{T.B}.EE.{H,M,D,Y}.Element&
  // Type2b.{T.B}.EE.{H,M,D,Y}.Element.ExistSupportElement&
  // Type2c.{T.B}.EE.Y.PivotStatus&
  // Type2c.{T.B}.EE.PilarKey.EX&
  // Type2d.{T.B}.EE.{H,M,D,Y}.{0..3}.EX.{0,-,+}&
  // Type10a1.EE.{H,M,D,Y}.{0..3}&{-,+}.{-,+}
  // Type10a2.{T.B}.EE.{H,M,D,Y}.{0..3}&
  // Type10b.{T.B}.EE.D.{0..3}.EX.{0,+}&
  // Type11a.EE.{H,M,D,Y}.{+,-}& + ou - ==
  // Type11b.EE.{H,M,D,Y}.{+,-}.{0..3}& + ou - == pilar force positive or not

  // TypeTB.EE.EX&
  // TypeTB1.EEBaseGroup.EXBaseGroup&
  private commentOnSAMEPilarDeity(
    pilarIdx: number,
    eNeR: ElementNEnergyRelation,
    otherENER: ElementNEnergyRelation,
    fromTrunk: boolean
  ) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const dIndex = LunarBase.DINDEX;
    let pilarType;
    let isUnique = false;
    const DOT = ".";
    const eNeRElement = pilarsAttr.getDeityElement(eNeR);
    const dayElement = pilarsAttr.getDayElement();
    const pivotStatus = pilarsAttr.getPivotStatus(eNeRElement);
    const eNeRKey = eNeR.getName();
    const pilarKey = LunarBase.getPilarShortLabel(pilarIdx);
    const dayForce = StringHelper.bool2Str(
      pilarsAttr.qiTypeData.isFavorable(QiType.DAYSTATUS)
    );
    const eneBase = eNeR.getBaseGroup();
    const eneBaseKey = eneBase.getName();
    if (fromTrunk) {
      pilarType = "T";
      isUnique = pilarsAttr.getTrunkRelationCount(eNeR, dIndex) === 1;
    } else {
      pilarType = "B";
      isUnique = pilarsAttr.getHiddenRelationCount(eNeR) === 1;
    }
    if (isUnique) {
      // TypeUnique.T.EE.Y.Unique&
      // TypeUnique.B.EE.Y.Unique&
      this.addBaseComment(
        "TypeUnique." + pilarType + DOT + eNeRKey + DOT + pilarKey
      );
    }

    // Type1a.EE.1&
    this.addBaseComment(
      "Type1a." + pilarType + DOT + eNeRKey + DOT + pivotStatus
    );
    // Type2a.EE.Y&
    this.addBaseComment(
      "Type2a." + +pilarType + DOT + eNeRKey + DOT + pilarKey
    );
    // Type2b.{T.B}.EE.{H,M,D,Y}&
    this.addBaseComment("Type2b." + pilarType + DOT + eNeRKey + DOT + pilarKey);

    // Type2b.{T.B}.EE.{H,M,D,Y}.Element&
    this.addBaseComment(
      "Type2b." + pilarType + DOT + eNeRKey + DOT + pilarKey + DOT + eNeRElement
    );
    const supportElement = eNeRElement.getNextProductiveElement();
    if (pilarsAttr.getElementForce(supportElement)>0 ) {
      // Type2b.{T.B}.EE.{H,M,D,Y}.Element.ExistSupportElement&
      this.addBaseComment(
        "Type2b." +
          pilarType +
          DOT +
          eNeRKey +
          DOT +
          pilarKey +
          DOT +
          eNeRElement +
          DOT +
          supportElement
      );
    }
    // Type10a1.EE.{H,M,D,Y}.{0..3}&{-,+}.{-,+}
    this.addBaseComment(
      "Type10a1." +
        pilarType +
        DOT +
        eNeRKey +
        DOT +
        pilarKey +
        DOT +
        pivotStatus
    );
    // Type10a2.{T.B}.EE.{H,M,D,Y}.{0..3}& EE on Trunk or Branche
    this.addBaseComment(
      "Type10a2." +
        pilarType +
        DOT +
        eNeRKey +
        DOT +
        pilarKey +
        DOT +
        pivotStatus
    );
    // Type11a.TB.EE.{H,M,D,Y}.{+,-}& + ou - ==
    const deityForce = StringHelper.bool2Str(
      pilarsAttr.deityForce[eNeR.ordinal()] >= 0
    );
    this.addBaseComment(
      "Type11a.TB." + eNeRKey + DOT + pilarKey + DOT + deityForce
    );
    this.commentOnPilarCombination(eNeR, pilarIdx, dayForce);
    // Type11b.EE.{H,M,D,Y}.{+,-}.{0..3}& + ou - == pilar force positive or not
    this.addBaseComment(
      "Type11b.TB." +
        eNeRKey +
        DOT +
        pilarKey +
        DOT +
        deityForce +
        DOT +
        pivotStatus
    );

    // Type2c.{T.B}.EE.pilarKey.PivotStatus&
    this.addBaseComment(
      "Type2c." + pilarType + DOT + eNeRKey + DOT + pilarKey + DOT + pivotStatus
    );

    if (otherENER !== null && eNeR !== otherENER) {
      const otherENERKey = otherENER.getName();
      const otherBaseENERKey = otherENER.getBaseGroup().getName();
      const otherDeityForce = StringHelper.number2Str(
        pilarsAttr.deityForce[otherENER.ordinal()]
      );
      // Type2c.{T.B}.EE.PilarKey.EX&
      this.addBaseComment(
        "Type2c." +
          pilarType +
          DOT +
          eNeRKey +
          DOT +
          pilarKey +
          DOT +
          otherENERKey
      );
      // Type2d.{T.B}.EE.{H,M,D,Y}.{0..3}.EX.{0,-,+}&
      this.addBaseComment(
        "Type2d." +
          pilarType +
          DOT +
          otherENERKey +
          DOT +
          pilarKey +
          DOT +
          pivotStatus +
          DOT +
          eNeRKey +
          DOT +
          otherDeityForce
      );
      // Type2e.{T.B}.EE.{H,M,D,Y}.EX.{0,-,+}&
      this.addBaseComment(
        "Type2e." +
          pilarType +
          DOT +
          otherENERKey +
          DOT +
          pilarKey +
          DOT +
          eNeRKey +
          DOT +
          otherDeityForce
      );
      // Type1b.EE.1.EX.{0,-,+}&
      this.addBaseComment(
        "Type1b.TB." +
          eNeRKey +
          DOT +
          pivotStatus +
          DOT +
          otherENERKey +
          DOT +
          otherDeityForce
      );
      // Type1c.EE.{±,-}.EX.{0,-,+}&
      this.addBaseComment(
        "Type1c.TB." +
          eNeRKey +
          DOT +
          deityForce +
          DOT +
          otherENERKey +
          DOT +
          otherDeityForce
      );
      // Type1d.EE.EX(.N0Quy)&
      if (pilarsAttr.deityForce[otherENER.ordinal()] !== 0) {
        this.addBaseComment(
          "Type1d." +
            pilarType +
            DOT +
            eNeRKey +
            DOT +
            otherENERKey +
            this.noQuyNhanSuffix
        );
        this.addBaseComment(
          "Type1b.TB." +
            eNeRKey +
            DOT +
            pivotStatus +
            DOT +
            otherENERKey +
            this.noQuyNhanSuffix
        );
      }
      // Type1g.{T.B}.EE.DAyforce.pivotStatus{0,1,2,3,4,5)&
      this.addBaseComment(
        "Type1g." +
          pilarType +
          DOT +
          eNeRKey +
          DOT +
          dayForce +
          DOT +
          pivotStatus
      );
      // Type1h.TB.EE.Element.DayPilarElement
      this.addBaseComment(
        "Type1h.TB." + eNeRKey + DOT + eNeRElement + DOT + dayElement
      );
      // Type1i.EE.DayForce.EX
      this.addBaseComment(
        "Type1i." +
          pilarType +
          DOT +
          eNeRKey +
          DOT +
          dayForce +
          DOT +
          otherENERKey
      );
      // TypeTB.EE.EX.B&
      this.addBaseComment("TypeTB." + eNeRKey + DOT + otherENERKey);
      // TypeTB1.EE.EX&
      if (otherENER.ordinal() > eNeR.ordinal()) {
        this.addBaseComment("TypeTB1." + eneBaseKey + DOT + otherBaseENERKey);
      } else {
        if (otherENER.ordinal() < eNeR.ordinal()) {
          this.addBaseComment("TypeTB1." + otherBaseENERKey + DOT + eneBaseKey);
        }
      }
    }

    let voidInfo = ".NVd";
    if (pilarsAttr.hasSecDeity(pilarIdx, SecondaryDeity.VOID)) {
      voidInfo = ".Vd";
    }
    // Type3a.TB.EE.{Vd,NVd}
    // Type3b.EE.{Vd,NVd}.NoQuy
    if (this.hasQuyNhan) {
      //Type3a.TB.EE.{Vd,NVd}
      this.addBaseComment("Type3a.TB." + eNeRKey + voidInfo);
    } else {
      //Type3b.TB.EE.{Vd,NVd}.NoQuy
      this.addBaseComment("Type3b.TB." + eNeRKey + voidInfo + ".NoQuy");
      //Type3c.EE.{H,M,D,Y}.{Vd,NVd}.NoQuy
      this.addBaseComment(
        "Type3c.TB." + eNeRKey + DOT + pilarKey + voidInfo + ".NoQuy"
      );
    }
    // Type4.TB.EE.{H,M,D,Y}.{NVd,Vd}&{-,+}.{-,+}
    this.addBaseComment(
      "Type4.TB." + eNeRKey + DOT + pilarKey + DOT + voidInfo
    );

    // With secondary Deity
    const secDeities = pilarsAttr.secondaryDeityPilars[pilarIdx];
    for (let index = 0; index < secDeities.length; index++) {
      const secDeity = secDeities[index];
      const secDeitykey = secDeity.getName();
      // Type5a.TB.EE.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addBaseComment("Type5a.TB." + eNeRKey + DOT + secDeitykey);
      //Type5e.EE.{H,M,D,Y}.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addBaseComment(
        "Type5e.TB." + eNeRKey + DOT + pilarKey + DOT + secDeitykey
      );
      // Type5b.TB.EE.{TKH, TKI, ... }.{Vd, NVd}&{-,+}.{-,+}
      this.addBaseComment(
        "Type5b.TB." + eNeRKey + DOT + secDeitykey + voidInfo
      );
      // Type5c.{T.B}.EE.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addBaseComment(
        "Type5c." + pilarType + DOT + eNeRKey + DOT + secDeitykey
      );
      // Type5d.TB.EE.{0..3}.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addBaseComment(
        "Type5d.TB." + eNeRKey + DOT + pivotStatus + DOT + DOT + secDeitykey
      );
      // Type7a.EE.{H,M,D,Y}.{0..3}.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addBaseComment(
        "Type7a.TB." +
          eNeRKey +
          DOT +
          pilarKey +
          DOT +
          pivotStatus +
          DOT +
          secDeitykey
      );
      // Type7b.{T.B}.EE.{H,M,D,Y}.{0..3}.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addBaseComment(
        "Type7b." +
          pilarType +
          DOT +
          eNeRKey +
          DOT +
          pilarKey +
          DOT +
          secDeitykey
      );
    }

    // With Life cycle
    const lifeCycle = ElementLifeCycle.getElementLifeCycle(
      this.lunar.trunkArr[pilarIdx],
      this.lunar.brancheArr[dIndex]
    );
    const lfName = lifeCycle.getName();

    // Type8a.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
    this.addBaseComment(
      "Type8a.TB." + eneBaseKey + DOT + pilarKey + DOT + lfName
    );
    this.addBaseComment("Type8a.TB" + eNeRKey + DOT + pilarKey + DOT + lfName);
    // Type8b.{T.B}.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
    this.addBaseComment(
      "Type8b." + pilarType + DOT + eNeRKey + DOT + pilarKey + DOT + lfName
    );
    // Type8c.EE.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
    this.addBaseComment("Type8c.TB." + eNeRKey + DOT + lfName);

    // Type9a.TB.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }.{Void, NoVoid}&{-,+}.{-,+}
    this.addBaseComment(
      "Type9a.TB." + eNeRKey + DOT + pilarKey + lfName + voidInfo
    );
    // Type9a.{T.B}.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }.{Void, NoVoid}&{-,+}.{-,+}
    this.addBaseComment(
      "Type9a." +
        pilarType +
        DOT +
        eNeRKey +
        DOT +
        pilarKey +
        DOT +
        lfName +
        voidInfo
    );

    // Type9b.{T.B}.{EE.{H,M,D,Y}.{0..3}.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
    this.addBaseComment(
      "Type9b." +
        pilarType +
        DOT +
        eNeRKey +
        DOT +
        pilarKey +
        DOT +
        pivotStatus +
        DOT +
        lifeCycle.toString()
    );

    for (let index = 0; index < pilarsAttr.deityPilarCount.length; index++) {
      const elementENeR = ElementNEnergyRelation.DR.getEnum(index);
      if (elementENeR !== eNeR) {
        let suffix = ".0";
        if (pilarsAttr.deityPilarCount[index] > 0) {
          suffix = ".+";
        }
        // Type10b.{T.B}.EE.D.{0..3}.EX.{0,+}&
        this.addBaseComment(
          "Type10b." +
            pilarType +
            DOT +
            eNeRKey +
            DOT +
            pilarKey +
            DOT +
            pivotStatus +
            DOT +
            elementENeR.getName() +
            suffix
        );
      }
    }
  }

  // TypeTB1.EE.Pilar.EX.Pilar&
  // TypeTB1.EE.EX&
  // TypeTB2.DayForce.EE.Pilar.EX.Pilar&
  private commentOnNearPilarDeity(
    fromENeR: ElementNEnergyRelation,
    frompilarIdx: number,
    toENeR: ElementNEnergyRelation,
    toPilarIdx: number
  ) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const dIndex = LunarBase.DINDEX;
    if (toENeR === fromENeR) {
      return;
    }
    let fromPilarKey = LunarBase.getPilarShortLabel(frompilarIdx);
    let toPilarKey = LunarBase.getPilarShortLabel(toPilarIdx);
    if (toENeR.ordinal() < fromENeR.ordinal()) {
      let temp: any = toENeR;
      toENeR = fromENeR;
      fromENeR = toENeR;
      temp = toPilarKey;
      toPilarKey = fromPilarKey;
      fromPilarKey = temp;
    }
    const DOT = ".";
    const fromENeRKey = fromENeR.getName();
    const toENeRKey = toENeR.getName();
    const fromBaseENeRKey = fromENeR.getBaseGroup().getName();
    const toBaseENeRKey = toENeR.getBaseGroup().getName();
    const dayForce = StringHelper.bool2Str(
      pilarsAttr.qiTypeData.isFavorable(QiType.DAYSTATUS)
    );
    let temp =
      fromENeRKey + DOT + fromPilarKey + DOT + toENeRKey + DOT + toPilarKey;
    this.addBaseComment("TypeTB1." + temp);
    this.addBaseComment("TypeTB1." + fromBaseENeRKey + DOT + toBaseENeRKey);
    this.addBaseComment("TypeTB2." + dayForce + DOT + temp);
  }

  private commentPilarDeities() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const dIndex = LunarBase.DINDEX;
    const pLen = LunarBase.PILARS_LEN;
    for (let pilarIdx = 0; pilarIdx < pLen; pilarIdx++) {
      const eNeR = pilarsAttr.trunkRelation[pilarIdx][dIndex];
      if (pilarIdx !== dIndex) {
        this.commentOnSAMEPilarDeity(pilarIdx, eNeR, null, true);
      }
      let hiddenEnERArr = pilarsAttr.dayHiddenRelation[pilarIdx];
      for (let hiddenIdx = 0; hiddenIdx < hiddenEnERArr.length; hiddenIdx++) {
        const hiddenEnER = hiddenEnERArr[hiddenIdx];
        if (hiddenEnER !== null) {
          this.commentOnSAMEPilarDeity(pilarIdx, eNeR, hiddenEnER, true);
          this.commentOnSAMEPilarDeity(pilarIdx, hiddenEnER, eNeR, false);
        }
      }

      if (pilarIdx < pLen - 1) {
        const nearPilarIdx = pilarIdx + 1;
        const nearEneR = pilarsAttr.trunkRelation[nearPilarIdx][dIndex];
        this.commentOnNearPilarDeity(eNeR, pilarIdx, nearEneR, nearPilarIdx);
        hiddenEnERArr = pilarsAttr.dayHiddenRelation[nearPilarIdx];
        for (let hiddenIdx = 0; hiddenIdx < hiddenEnERArr.length; hiddenIdx++) {
          const hiddenEnER = hiddenEnERArr[hiddenIdx];
          if (hiddenEnER !== null) {
            this.commentOnNearPilarDeity(
              eNeR,
              pilarIdx,
              hiddenEnER,
              nearPilarIdx
            );
          }
        }
      }
    }
  }

  // BRType1.BrancheRelation.eeR&
  // BRType2.BrancheRelation.{H,M,D,Y}.{H,M,D,Y}&
  // BRType3.BrancheName.BrancheName&
  // BRType4a.OX.DOG.GOAT&
  // BRType4b.OX.DOG.GOAT.{+,-}&
  // BRType5a.-.{H,M,D,Y}&
  // BRType5b.-.{H,M,D,Y}.{H,M,D,Y}.&
  // BRType6.DOG.Y.TIGER.D for combination Y D only
  private commentBrancheCombinaison() {
    const DOT = ".";
    this.commentCombType(CombAttr.BRANCHECLASHTYPE, "C");
    this.commentCombType(CombAttr.BRANCHEUNGRATEFUL, "D");
    this.commentCombType(CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE, "B");
    this.commentCombType(CombAttr.MIDBRANCHECOMB3TRANSFORMABLETYPE, "N");
    this.commentCombType(CombAttr.BRANCHEDESTROYTYPE, "K");
    this.commentCombType(CombAttr.MIDBRANCHECOMB3TYPE, "K");
    this.commentBrancheName();
  }

  //Element.MAXElement.Other.(0,-)
  private commentOnElement() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const DOT = ".";
    const len = pilarsAttr.elementForce.length;
    const elementForce=ObjectHelper.newArray(len,0);
    for (let index = 0; index < len; index++) {
      elementForce[index]=pilarsAttr.elementForce[index].getValue();
    }
    const sortedElementForce = ObjectHelper.cloneArray(elementForce);
    ObjectHelper.sortNumber(sortedElementForce, true);
    const max = sortedElementForce[len - 1];
    for (let index = 0; index < len; index++) {
      const currForce = sortedElementForce[index];
      if (currForce === max) break;
      let suffix = ".";
      if (currForce === 0) {
        suffix += "0";
      } else {
        suffix += "-";
      }
      for (let index2 = 0; index2 < len; index2++) {
        const currForce2 = elementForce[index2];
        if (currForce2 === max) {
          for (let index3 = 0; index3 < len; index3++) {
            const currForce3 = elementForce[index3];
            if (currForce3 === currForce) {
              this.addBaseComment(
                "Element." +
                  Element.EARTH.getEnum(index2) +
                  DOT +
                  Element.EARTH.getEnum(index3) +
                  suffix
              );
            }
          }
        }
      }
    }
  }

  private commentOnThisStructure(structureData: DataWithLog) {
    if (structureData === null) return;
    const structure = structureData.getValue() as BaziStructure;
    const structName = structure.getName();
    this.addBaseComment("CachCucType1." + structure.getName());
    const pilarsAttr = this.lunar.pilarsAttr;
    const eleRValues = ElementNEnergyRelation.getValues();
    const dIndex = LunarBase.DINDEX;
    const DOT = ".";
    for (let index = 0; index < eleRValues.length; index += 2) {
      const eeR = eleRValues[index];
      if (eeR.getName() != structName) {
        const count = pilarsAttr.getPairedRelationCount(eeR, dIndex);
        for (let index2 = index + 2; index2 < eleRValues.length; index2 += 2) {
          const eeR2 = eleRValues[index2];
          if (eeR2.getName() != structName) {
            const count2 = pilarsAttr.getPairedRelationCount(eeR, dIndex);
            this.addBaseComment(
              "CachCucType2." +
                structure.getName() +
                DOT +
                eeR.getName() +
                DOT +
                StringHelper.number2Str(count) +
                DOT +
                eeR2.getName() +
                DOT +
                StringHelper.number2Str(count2)
            );
          }
        }
      }
    }
  }

  //Element.MAXElement.Other.(0,-)
  private commentOnStructure() {
    const pilarsAttr = this.lunar.pilarsAttr;
    this.commentOnThisStructure(pilarsAttr.specialStructure);
    if (pilarsAttr.specialStructure !== pilarsAttr.structure) {
      this.commentOnThisStructure(pilarsAttr.structure);
    }
  }

  private commentOnBaziDayMaster() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const dayForce = StringHelper.bool2Str(
      pilarsAttr.qiTypeData.isFavorable(QiType.DAYSTATUS)
    );
    const dIndex = LunarBase.DINDEX;
    const DOT = ".";
    const dTrunk = this.lunar.trunkArr[dIndex];
    const dElement = pilarsAttr.trunkEE[dIndex].getValue().element;
    this.addBaseComment("DayMaster." + dElement.getName()+DOT+dayForce);
    this.addBaseComment("DayMaster." + dTrunk.getName()+DOT+dayForce);
    // Ref3p182 DayMaster.-.DO7K.+.DRIR.+&"
    const do7KForce = StringHelper.bool2Str(
      !pilarsAttr.qiTypeData.isFavorable(QiType.DO7K2RWFLEVERAGE)
    );
    const drIRForce = StringHelper.bool2Str(
      pilarsAttr.qiTypeData.isFavorable(QiType.DRIR2RWFLEVERAGE)
    );
    const temp = "DayMaster." + dayForce+'.DO7K.'+do7KForce+'.DRIR.'+drIRForce;
    this.addBaseComment(temp);
  }


  override getName() {
    return "bazi Observation";
  }

  override initPoint() {
    const pilarsAttr = this.lunar.pilarsAttr;
    super.initPoint();
    this.evalInitialPoints();
    if (this.hasQuyNhan) {
      this.incPoints(10);
    }
  }

  override adjustDegree(degree: number) {
    return (
      degree + Math.round((10 - degree) * this.currPeriodComplementForceFactor)
    );
  }

  override comment() {
    super.comment();
    this.commentOnSecDeity();
    if (!this.hasQuyNhan) {
      this.addBaseComment("QuyNhanNotPresent");
    }
    this.commentOnElementNEnergyRelation();
    this.commentOnVoid();
    this.commentOnTrunkTransform();
    this.commentSeasonCombinaison();
    this.commentBrancheCombinaison();
    this.commentOnDeitiesCount();
    this.commentPilarDeities();
    this.commentOnDayForceCombination();
    this.commentOnElement();
    this.commentOnStructure();
    this.commentOnBaziDayMaster();
  }

  commentOnYearDayMaster(currLunarYear: Bazi) {
    const DOT = ".";
    const pilarsAttr = this.lunar.pilarsAttr;
    const dayForce = StringHelper.bool2Str(
      pilarsAttr.qiTypeData.isFavorable(QiType.DAYSTATUS)
    );
    const do7KForce = StringHelper.bool2Str(
      !pilarsAttr.qiTypeData.isFavorable(QiType.DO7K2RWFLEVERAGE)
    );
    const drIRForce = StringHelper.bool2Str(
      pilarsAttr.qiTypeData.isFavorable(QiType.DRIR2RWFLEVERAGE)
    );
    // Ref3p182.
    const pivotElements=pilarsAttr.elligiblePivotData.getValue();
    const yearElement=currLunarYear.getyBranche().getElement();
    let temp = '';
    const tempFix=dayForce+'.DO7K.'+do7KForce+'.DRIR.'+drIRForce+DOT;
    for (let index = 0; index < pivotElements.length; index++) {
      const pivotElement = pivotElements[index];
      if(yearElement.isDestructive(pivotElement)) {
         // Ref3p182 DayMaster.-.DO7K.+.DRIR.+.Hostile&"
        temp = "Year.DayMaster." +tempFix+'Hostile';
         this.addSupportBaseComment(2,temp)
      }
    }
    const periodNb=this.lunar.getPeriodNb(currLunarYear.birthDate)
    const currYTrunkDeity = this.lunar.getPeriodTrunkDeity(periodNb);
    temp="Period.DayMaster."+tempFix+currYTrunkDeity.getName();
    console.log("periodNb",periodNb);
    console.log("Trunk",this.lunar.periodTrunkArr);
    console.log(temp);
    this.addUpdatePtsBaseComment(temp);
  }

  getTrunkDeity(trunk: Trunk) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const birthBaziDTrunkEE = pilarsAttr.trunkEE[LunarBase.DINDEX].getValue()
    return BaziHelper.getEnNRelation(trunk.elementNEnergy,birthBaziDTrunkEE);
  }

  commentOnThisYearStructure(currLunarYear: Bazi,structureData: DataWithLog) {
    if (structureData===null) return ;
    const pilarsAttr = this.lunar.pilarsAttr;
    const currYTrunkDeity = this.getTrunkDeity(currLunarYear.getyTrunk());

  }

  commentOnYearStructure(currLunarYear: Bazi) {
    const pilarsAttr = this.lunar.pilarsAttr;
    this.commentOnThisYearStructure(currLunarYear,pilarsAttr.specialStructure);
    if (pilarsAttr.specialStructure !== pilarsAttr.structure) {
      this.commentOnThisYearStructure(currLunarYear,pilarsAttr.structure);
    }
  }

  commentOnYear(currLunarYear: Bazi) {
    this.lunar.evalPeriodData();
    this.commentOnYearDayMaster(currLunarYear);
    this.commentOnYearStructure(currLunarYear);
  }
}
