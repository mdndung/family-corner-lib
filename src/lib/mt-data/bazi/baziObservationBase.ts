import { BaziHelper } from "../../helper/baziHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { StringHelper } from "../../helper/stringHelper";
import { ObservationBase } from "../../observations/observationBase";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { QiType } from "../qi/qi-type";
import { QiTypeDataRec } from "../qi/qi-type-data-rec";
import { Bazi } from "./bazi";
import { LunarBase } from "./lunarBase";
import { SecondaryDeity } from "./secondaryDeity";
import { Element } from "../feng-shui/element";
import { BaziStructureHelper } from "../../helper/bazi-structureHelper";
import { CombAttr } from "./combinationList";
import { DataWithLog } from "../qi/dataWithLog";
import { BaziStructure } from "./bazi-structure";
import { Lunar } from "./lunar";

export class BaziObservationBase extends ObservationBase {
  // See to update it for each period
  baseQiTypeData: QiTypeDataRec[];
  lunar: Bazi;
  hasQuyNhan: boolean;
  noQuyNhanSuffix = "";
  baseAttr: any;
  studyYear: Bazi;

  constructor(bazi: Bazi) {
    super(bazi.getGenrePrefix());
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


  protected getLimitCount(count: number, limit: number) {
    if (count > 2) count = limit;
    return count;
  }

  protected getPilar (pilarName: string) {
    if ( pilarName==="Destin" ) return  this.lunar.menhPilar;
    const pilarIdx = LunarBase.getPilarIdx(pilarName);
    return this.lunar.pilars[pilarIdx];
  }

  protected getPilarDeity (pilarName: string) {
    return this.getPilar(pilarName).deity
  }


  protected getStructAttr(structureEneR: ElementNEnergyRelation) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const struct = structureEneR;
    const name = struct.getName();
    const dIndex = LunarBase.DINDEX;
    const structCnt1 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(struct, dIndex),
      1
    );
    const structCnt2 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(struct, dIndex),
      2
    );
    const base = structureEneR.getBaseGroup();
    const baseName = base.getName();

    const baseCnt1 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(base, dIndex),
      1
    );
    const baseCnt2 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(base, dIndex),
      2
    );
    const prodeneR = structureEneR.getNextProductiveElement();
    const prodeneRCnt1 = this.getLimitCount(
      pilarsAttr.getDeityCount(prodeneR),
      1
    );
    const prodeneRCnt2 = this.getLimitCount(
      pilarsAttr.getDeityCount(prodeneR),
      2
    );
    const prdBase = prodeneR.getBaseGroup();
    const prdBaseName = prdBase.getName();

    const prdBseCnt1 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(prdBase, dIndex),
      1
    );
    const prdBseCnt2 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(prdBase, dIndex),
      2
    );
    const ctrleneR = structureEneR.getNextControlElement();
    const ctrleneRName = ctrleneR.getName();
    const ctrleneRCnt1 = this.getLimitCount(
      pilarsAttr.getDeityCount(ctrleneR),
      1
    );
    const crtlBase = ctrleneR.getBaseGroup();
    const crtlBaseName = crtlBase.getName();
    const crtlBseCnt1 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(crtlBase, dIndex),
      1
    );
    const crtlBseCnt2 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(crtlBase, dIndex),
      2
    );
    return {
      struct,
      name,
      structCnt1,
      structCnt2,
      base,
      baseName,
      baseCnt1,
      baseCnt2,
      prodeneR,
      prdBase,
      prodeneRCnt1,
      prodeneRCnt2,
      prdBaseName,
      prdBseCnt1,
      prdBseCnt2,
      ctrleneR,
      ctrleneRName,
      ctrleneRCnt1,
      crtlBaseName,
      crtlBseCnt1,
      crtlBseCnt2,
    };
  }



  protected evalCurrAttr(currLunarYear?: Bazi) {
    if (typeof currLunarYear === "undefined") currLunarYear = this.lunar;
    const pilarsAttr = this.lunar.pilarsAttr;
    const dIndex = LunarBase.DINDEX;
    const dayForce = StringHelper.bool2Str(
      pilarsAttr.qiTypeData.isFavorable(QiType.DAYSTATUS)
    );
    const dTrunkElementNEnergy = pilarsAttr.trunkEE[dIndex].getValue();
    const do7KForce = StringHelper.qiForce2Str(
      pilarsAttr.qiTypeData.getQiForce(QiType.DO7K2RWFLEVERAGE)
    );
    const drIRForce = StringHelper.qiForce2Str(
      pilarsAttr.qiTypeData.getQiForce(QiType.DRIR2RWFLEVERAGE)
    );
    const dwiwForce = StringHelper.qiForce2Str(
      pilarsAttr.qiTypeData.getQiForce(QiType.DWIWCOUNT)
    );
    const hoegForce = StringHelper.qiForce2Str(
      pilarsAttr.qiTypeData.getQiForce(QiType.HOEGCOUNT)
    );
    let yLifeCycle = null;
    let dLifeCycle = null;
    if (currLunarYear != null) {
      yLifeCycle = BaziHelper.elementLifeCycle(
        currLunarYear.getyTrunk(),
        currLunarYear.getyBranche()
      );
      dLifeCycle = BaziHelper.elementLifeCycle(
        currLunarYear.getdTrunk(),
        currLunarYear.getdBranche()
      );
    }
    this.baseAttr = {
      dayForce,
      dTrunkElementNEnergy,
      do7KForce,
      drIRForce,
      dwiwForce,
      hoegForce,
      yLifeCycle,
      dLifeCycle
    };
  }


  private evalInitialPoints() {
    this.baseQiTypeData = [];
    this.baseQiTypeData.push(this.lunar.pilarsAttr.qiTypeData);
  }

  override initPoint() {
    super.initPoint();
    this.evalInitialPoints();
    if (this.hasQuyNhan) {
      this.incPoints(10);
    }
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
      if (force > 0) {
        const temp = "." + StringHelper.bool2Str(forceFavorable);
        this.addUpdatePtsBaseComment(
          "SecDeType1a." + secDeity1.getName() + temp + this.noQuyNhanSuffix
        );
        if (secDeity1 === SecondaryDeity.KIMTHAN) {
          if (pilarsAttr.getElementForce(Element.FIRE) > 0) {
            this.addUpdatePtsBaseComment(
              "SP.KTH.Ref7_2ap21a" + this.noQuyNhanSuffix
            );
          } else {
            if (
              pilarsAttr.isFavorableElement(Element.WATER) ||
              pilarsAttr.isFavorableElement(Element.METAL)
            ) {
              this.addUpdatePtsBaseComment(
                "SP.KTH.Ref7_2ap21b" + this.noQuyNhanSuffix
              );
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
        this.addUpdatePtsBaseComment("TypeTr1.Y.Quy");
        break;
      }
    }
  }

  private commentOnElementNEnergyRelation() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const eNeR =ElementNEnergyRelation.getValues() ;
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
        this.addUpdatePtsBaseComment("EnERType1." + temp2);
        for (let index3 = index2 + 1; index3 < len; index3++) {
          count = pilarsAttr.secDeityForceArr[index3];
          const secDeity3 = ElementNEnergyRelation.DR.getEnum(
            index3
          ) as SecondaryDeity;
          this.addUpdatePtsBaseComment(
            "EnERType1." +
              temp2 +
              DOT +
              secDeity3.getName() +
              DOT +
              StringHelper.number2Str(count, BaziStructureHelper.FAVTHRESHHOLD)
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
        this.addUpdatePtsBaseComment("Vd." + lab);
        pilars += lab;
        count++;
        if (this.hasQuyNhan) {
          const secDeities =
            this.lunar.pilarsAttr.secondaryDeityPilars[pilarIdx];
          for (let index = 0; index < secDeities.length; index++) {
            const secDeity = secDeities[index];
            this.addUpdatePtsBaseComment(
              "DtyHidden2." + secDeity.getName() + ".Vd.Quy"
            );
          }
        }
      }
    }
    if (count > 0) this.addUpdatePtsBaseComment("Vd." + pilars);
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
        this.addUpdatePtsBaseComment(
          "NGHType1c." + baseGroupName + DOT + transfElement
        );
        // NGHType1b.{H,M,D,Y}.eeR.Element.{H,M,D,Y}&
        this.addUpdatePtsBaseComment(
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
              this.addUpdatePtsBaseComment(
                "NGHType2a." +
                  baseGroupName +
                  DOT +
                  transfElement +
                  ".-." +
                  ElementNEnergyRelation.K7.getName()
              );
            }
            const lifeCycle = ElementLifeCycle.getElementLifeCycle(
              this.lunar.pilars[pilarIdx].trunk,
              this.lunar.pilars[LunarBase.DINDEX].branche
            );
            // NGHType2b.eeR.Element.{+,-}.LifeCycle&
            this.addUpdatePtsBaseComment(
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
        this.addUpdatePtsBaseComment(key + DOT + transfElement);
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
    const pilars = this.lunar.pilars;
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
            let relation = pilarsAttr.getPilarDeity(pilarIdx);
            const trElement = compAttrList[index].resultData;
            if (trElement !== null) {
              key =
                "BRType1" + DOT + relationTypeKey + DOT + trElement.getName();
              this.addUpdatePtsBaseComment(key);
            }
            key = "BRType1" + DOT + relationTypeKey;
            this.addUpdatePtsBaseComment(key);

            const lifeCycle = ElementLifeCycle.getElementLifeCycle(
              pilars[pilarIdx].trunk,
              pilars[LunarBase.DINDEX].branche
            );
            key = "BRType1" + DOT + relationTypeKey + DOT + lifeCycle.getName();
            this.addUpdatePtsBaseComment(key);

            key = "BRType1" + DOT + relationTypeKey + DOT + relation.getName();
            this.addUpdatePtsBaseComment(key);

            key = "BRType2" + DOT + relationTypeKey + DOT + pilarsFromTo;
            this.addUpdatePtsBaseComment(key);
            if (relation.isProductive()) {
              key = "BRType5a.-." + toPilar;
              this.addUpdatePtsBaseComment(key);
              key = "BRType5b.-." + pilarsFromTo;
              this.addUpdatePtsBaseComment(key);
            }
          }
        }
      }
    }
  }

  // DtyType1a.EE.DeityCountThresHold{0,-,+}&
  // DtyType1a.DayForce.EE.{0,-,+}&
  // DtyHidden.EE.DeityCountThresHold{0,-,+}&
  // DtyGType1a.DayForce.EE.DeityCountThresHold{0,-,+}&
  // DtyGType1a.DayForce.EE.{0,-,+}&
  private commentOnOneDeityCount() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const len = pilarsAttr.deityAttr.count.length;
    const DOT = ".";
    let suffix = "";
    for (let index = 0; index < len; index++) {
      const count = pilarsAttr.deityAttr.count[index];
      suffix =
        DOT +
        StringHelper.number2Str(count, BaziStructureHelper.FAVTHRESHHOLD - 1);

      const eNER = ElementNEnergyRelation.DR.getEnum(
        index
      ) as ElementNEnergyRelation;
      const key = eNER.getName();
      // DtyType1a.EE.{0,-,+}&
      let temp = "DtyType1a." + key + suffix;
      this.addUpdatePtsBaseComment(temp);
      const eNERBase = eNER.getBaseGroup();
      // DtyType1a.DayForce.EE.{0,-,+}&
      temp = "DtyType1a." + this.baseAttr.dayForce + DOT + key + suffix;
      this.addUpdatePtsBaseComment(temp);
      // DtyGType1a.DayForce.EE.{0,-,+}&
      temp =
        "DtyGType1a." +
        this.baseAttr.dayForce +
        DOT +
        eNERBase.getName() +
        suffix;
      this.addUpdatePtsBaseComment(temp);
      // DtyGType1a.EE.{0,-,+}&
      temp = "DtyGType1a." + eNERBase.getName() + suffix;
      this.addUpdatePtsBaseComment(temp);

      if (count === 0) {
        const hiddenCount = pilarsAttr.deityAttr.hiddenCount[index];
        if (hiddenCount > 0) {
          // DtyHidden.EE.{0,-,+}&
          suffix =
            DOT +
            StringHelper.number2Str(
              count,
              BaziStructureHelper.FAVTHRESHHOLD - 1
            );
          const temp = key + suffix;
          this.addUpdatePtsBaseComment("DtyHidden1." + temp);
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
    const len = pilarsAttr.deityAttr.count.length;
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
      if (count1 === pilarsAttr.deityAttr.count[index1]) {
        for (let index2 = 0; index2 < len; index2++) {
          if (
            index1 != index2 &&
            pilarsAttr.deityAttr.count[index2] === count2
          ) {
            const eNER1 = ElementNEnergyRelation.DR.getEnum(
              index1
            ) as ElementNEnergyRelation;
            const eNER2 = ElementNEnergyRelation.DR.getEnum(
              index2
            ) as ElementNEnergyRelation;
            const temp = eNER1.getName() + DOT + eNER2.getName();
            // DtyType2a.EE.EC&
            if (count2 > 0) {
              this.addUpdatePtsBaseComment("DtyType2a." + temp);
            }
            // DtyType2b.EE.EC.{0,-,+}.{0,-,+}&
            this.addUpdatePtsBaseComment("DtyType2b." + temp + suffix);
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
            this.addUpdatePtsBaseComment(
              "DtyGType2a." +
                eNER1Base.getName() +
                DOT +
                eNER2Base.getName() +
                DOT +
                gSuffix
            );
            // DtyGType2a.EE.ECGroup.{+}.{0,-,+}&
            this.addUpdatePtsBaseComment(
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
  // DtyGType4a.DayForce.EE.PivorStatus.EX.EY& EX>EY
  private commentOnThreeDeitiesCount(
    count1: number,
    count2: number,
    count3: number
  ) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const len = pilarsAttr.deityAttr.count.length;
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
      if (count1 === pilarsAttr.deityAttr.count[index1]) {
        const eNER1 = ElementNEnergyRelation.DR.getEnum(
          index1
        ) as ElementNEnergyRelation;
        for (let index2 = 0; index2 < len; index2++) {
          for (let index3 = 0; index3 < len; index3++) {
            if (
              index1 != index2 &&
              index3 != index2 &&
              pilarsAttr.deityAttr.count[index3] === count3
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
              this.addUpdatePtsBaseComment("DtyType3a." + temp + suffix);
              const eNER1Base = eNER1.getBaseGroup() as ElementNEnergyRelation;
              const eNER1BaseKey = eNER1Base.getName();
              const eNER2Base = eNER2.getBaseGroup() as ElementNEnergyRelation;
              const eNER2BaseKey = eNER2Base.getName();
              const eNER3Base = eNER3.getBaseGroup() as ElementNEnergyRelation;
              const eNER3BaseKey = eNER3Base.getName();
              /// DtyGType3a.EE.EC.EY.{0,-,+}.{0,-getBase,+}.{0,-,+}&
              this.addUpdatePtsBaseComment(
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
              const dayForce = this.baseAttr.dayForce;
              const eNeRElement = pilarsAttr.getDeityElement(eNER1Base);
              const pivotStatus = pilarsAttr.getPivotStatusStr(eNeRElement);
              // DtyGType4a.DayForce.EE.PivorStatus.EX.EY& EX>EY
              // Suffix is not necessary assuming count EE>=EX>=EY

              this.addUpdatePtsBaseComment(
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
    const dayForce = this.baseAttr.dayForce;
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
    this.addUpdatePtsBaseComment(
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
    this.addUpdatePtsBaseComment(
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
      this.addUpdatePtsBaseComment(
        "DayForce1c." + dayForce + DOT + SecondaryDeity.KINHDUONG.getName()
      );
    } else {
      //DayForce1c.DayForce
      this.addUpdatePtsBaseComment("DayForce1c." + dayForce);
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
          this.addUpdatePtsBaseComment(
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
          this.addUpdatePtsBaseComment(
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

  // Pilar.D.ElementLifeCycle
  // Pilar.D.SecDeity
  private commentOnPilar() {
    const dIndex = LunarBase.DINDEX;
    const currAttr = this.baseAttr;
    const pilarsAttr = this.lunar.pilarsAttr;
    //
    const DOT = ".";
    let temp = "";
    if (currAttr.dLifeCycle !== null) {
      temp = "Pilar.D." + currAttr.dLifeCycle.getName();
      this.addUpdatePtsBaseComment(temp);
    }
    const secDeities = this.lunar.pilarsAttr.secondaryDeityPilars[dIndex];
    for (let index = 0; index < secDeities.length; index++) {
      const secDeity = secDeities[index];
      temp = "Pilar.D." + secDeity.getName();
      this.addUpdatePtsBaseComment(temp);
    }
  }

  private commentOnDeitiesCount() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const len = pilarsAttr.deityAttr.count.length;
    const sortedDeityCount = ObjectHelper.cloneArray(
      pilarsAttr.deityAttr.count
    );
    ObjectHelper.sortNumber(sortedDeityCount, true);

    this.commentOnOneDeityCount();

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
  // Type10b.D.D.EX.{0,+}&
  // Type10b.{T.B}.EE.D.{0..3}.EX.{0,+}&
  // Type10b.{T.B}.EE.D.{0..3}.EX.{0,+}&
  // Type11a.TB.EE.{H,M,D,Y}.{+,-}& + ou - ==å
  // Type11b.EE.{H,M,D,Y}.{+,-}.{0..3}& + ou - == pilar force positive or not
  // TypeTB.EE.EX&
  // TypeTB1.EEBaseGroup.EXBaseGroup&
  // Type3a.TB.EE.{Vd,NVd}
  // Type3b.EE.{Vd,NVd}.NoQuy
  //Type3c.EE.{H,M,D,Y}.{Vd,NVd}.NoQuy
  // Type4.TB.EE.{H,M,D,Y}.{NVd,Vd}&{-,+}.{-,+}
  // Type5a.TB.EE.{TKH, TKI, ... }&{-,+}.{-,+}
  // Type5b.TB.EE.SecDeity{TKH, TKI, ... }.{Vd, NVd}&{-,+}.{-,+}
  // Type5c.{T.B}.EE.SecDeity{TKH, TKI, ... }&{-,+}.{-,+}
  // Type5d.TB.EE.{0..3}.SecDeity{TKH, TKI, ... }&{-,+}.{-,+}
  // Type5d.TB.EE.{0..3}.SecDeity{TKH, TKI, ... }&{-,+}.{-,+}
  //Type5e.EE.{H,M,D,Y}.SecDeity{TKH, TKI, ... }&{-,+}.{-,+}
  // Type7a.EE.{H,M,D,Y}.{0..3}.SecDeity{TKH, TKI, ... }&{-,+}.{-,+}
  // Type7b.{T.B}.EE.{H,M,D,Y}.{0..3}.SecDeity{TKH, TKI, ... }&{-,+}.{-,+}
  // Type8a.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
  // Type8b.{T.B}.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
  // Type8c.EE.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
  // Type9a.TB.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }.{Void, NoVoid}&{-,+}.{-,+}
  // Type9a.{T.B}.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }.{Void, NoVoid}&{-,+}.{-,+}
  // Type9b.{T.B}.{EE.{H,M,D,Y}.{0..3}.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
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
    const dayForce = this.baseAttr.dayForce;
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
      this.addUpdatePtsBaseComment(
        "TypeUnique." + pilarType + DOT + eNeRKey + DOT + pilarKey
      );
    }

    // Type1a.TB.EE.pivotStatus&
    this.addUpdatePtsBaseComment(
      "Type1a." + pilarType + DOT + eNeRKey + DOT + pivotStatus
    );
    // Type2a.{T.B}.EE.Y&
    this.addUpdatePtsBaseComment(
      "Type2a." + pilarType + DOT + eNeRKey + DOT + pilarKey
    );
    // Type2a.EE.Y&
    this.addUpdatePtsBaseComment("Type2a." + eNeRKey + DOT + pilarKey);
    // Type2b.{T.B}.EE.{H,M,D,Y}&
    this.addUpdatePtsBaseComment(
      "Type2b." + pilarType + DOT + eNeRKey + DOT + pilarKey
    );

    // Type2b.{T.B}.EE.{H,M,D,Y}.Element&
    this.addUpdatePtsBaseComment(
      "Type2b." + pilarType + DOT + eNeRKey + DOT + pilarKey + DOT + eNeRElement
    );
    const supportElement = eNeRElement.getNextProductiveElement();
    if (pilarsAttr.getElementForce(supportElement) > 0) {
      // Type2b.{T.B}.EE.{H,M,D,Y}.Element.ExistSupportElement&
      this.addUpdatePtsBaseComment(
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
    // Type10a1.TB.EE.{H,M,D,Y}.{pivotStatus}
    this.addUpdatePtsBaseComment(
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
    this.addUpdatePtsBaseComment(
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
    const deityForce = StringHelper.number2Str(
      pilarsAttr.deityAttr.force[eNeR.ordinal()],
      BaziStructureHelper.FAVTHRESHHOLD
    );

    this.addUpdatePtsBaseComment(
      "Type11a.TB." + eNeRKey + DOT + pilarKey + DOT + deityForce
    );
    this.commentOnPilarCombination(eNeR, pilarIdx, dayForce);
    // Type11b.EE.{H,M,D,Y}.{+,-}.{0..3}& + ou - == pilar force positive or not
    this.addUpdatePtsBaseComment(
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
    this.addUpdatePtsBaseComment(
      "Type2c." + pilarType + DOT + eNeRKey + DOT + pilarKey + DOT + pivotStatus
    );

    if (otherENER !== null && eNeR !== otherENER) {
      const otherENERKey = otherENER.getName();
      const otherBaseENERKey = otherENER.getBaseGroup().getName();
      const otherDeityForce = StringHelper.number2Str(
        pilarsAttr.deityAttr.force[otherENER.ordinal()],
        BaziStructureHelper.FAVTHRESHHOLD
      );
      // Type2c.{T.B}.EE.PilarKey.EX&
      this.addUpdatePtsBaseComment(
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
      this.addUpdatePtsBaseComment(
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
      this.addUpdatePtsBaseComment(
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
      this.addUpdatePtsBaseComment(
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
      this.addUpdatePtsBaseComment(
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
      if (pilarsAttr.deityAttr.force[otherENER.ordinal()] !== 0) {
        this.addUpdatePtsBaseComment(
          "Type1d." +
            pilarType +
            DOT +
            eNeRKey +
            DOT +
            otherENERKey +
            this.noQuyNhanSuffix
        );
        this.addUpdatePtsBaseComment(
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
      this.addUpdatePtsBaseComment(
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
      this.addUpdatePtsBaseComment(
        "Type1h.TB." + eNeRKey + DOT + eNeRElement + DOT + dayElement
      );
      // Type1i.EE.DayForce.EX
      this.addUpdatePtsBaseComment(
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
      this.addUpdatePtsBaseComment("TypeTB." + eNeRKey + DOT + otherENERKey);
      // TypeTB1.EE.EX&
      if (otherENER.ordinal() > eNeR.ordinal()) {
        this.addUpdatePtsBaseComment(
          "TypeTB1." + eneBaseKey + DOT + otherBaseENERKey
        );
      } else {
        if (otherENER.ordinal() < eNeR.ordinal()) {
          this.addUpdatePtsBaseComment(
            "TypeTB1." + otherBaseENERKey + DOT + eneBaseKey
          );
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
      this.addUpdatePtsBaseComment("Type3a.TB." + eNeRKey + voidInfo);
    } else {
      //Type3b.TB.EE.{Vd,NVd}.NoQuy
      this.addUpdatePtsBaseComment(
        "Type3b.TB." + eNeRKey + voidInfo + this.noQuyNhanSuffix
      );
      //Type3c.EE.{H,M,D,Y}.{Vd,NVd}.NoQuy
      this.addUpdatePtsBaseComment(
        "Type3c.TB." + eNeRKey + DOT + pilarKey + voidInfo + this.noQuyNhanSuffix
      );
    }
    // Type4.TB.EE.{H,M,D,Y}.{NVd,Vd}&{-,+}.{-,+}
    this.addUpdatePtsBaseComment(
      "Type4.TB." + eNeRKey + DOT + pilarKey + DOT + voidInfo
    );

    // With secondary Deity
    const secDeities = pilarsAttr.secondaryDeityPilars[pilarIdx];
    for (let index = 0; index < secDeities.length; index++) {
      const secDeity = secDeities[index];
      const secDeitykey = secDeity.getName();
      // Type5a.TB.EE.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addUpdatePtsBaseComment("Type5a.TB." + eNeRKey + DOT + secDeitykey);
      //Type5e.EE.{H,M,D,Y}.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addUpdatePtsBaseComment(
        "Type5e.TB." + eNeRKey + DOT + pilarKey + DOT + secDeitykey
      );
      // Type5b.TB.EE.{TKH, TKI, ... }.{Vd, NVd}&{-,+}.{-,+}
      this.addUpdatePtsBaseComment(
        "Type5b.TB." + eNeRKey + DOT + secDeitykey + voidInfo
      );
      // Type5c.{T.B}.EE.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addUpdatePtsBaseComment(
        "Type5c." + pilarType + DOT + eNeRKey + DOT + secDeitykey
      );
      // Type5d.TB.EE.{0..3}.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addUpdatePtsBaseComment(
        "Type5d.TB." + eNeRKey + DOT + pivotStatus + DOT + DOT + secDeitykey
      );
      // Type7a.EE.{H,M,D,Y}.{0..3}.{TKH, TKI, ... }&{-,+}.{-,+}
      this.addUpdatePtsBaseComment(
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
      this.addUpdatePtsBaseComment(
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
      this.lunar.pilars[pilarIdx].trunk,
      this.lunar.pilars[dIndex].branche
    );
    const lfName = lifeCycle.getName();

    // Type8a.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
    this.addUpdatePtsBaseComment(
      "Type8a.TB." + eneBaseKey + DOT + pilarKey + DOT + lfName
    );
    this.addUpdatePtsBaseComment(
      "Type8a.TB" + eNeRKey + DOT + pilarKey + DOT + lfName
    );
    // Type8b.{T.B}.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
    this.addUpdatePtsBaseComment(
      "Type8b." + pilarType + DOT + eNeRKey + DOT + pilarKey + DOT + lfName
    );
    // Type8c.EE.{TOMB, SICKNESS, ... }&{-,+}.{-,+}
    this.addUpdatePtsBaseComment("Type8c.TB." + eNeRKey + DOT + lfName);

    // Type9a.TB.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }.{Void, NoVoid}&{-,+}.{-,+}
    this.addUpdatePtsBaseComment(
      "Type9a.TB." + eNeRKey + DOT + pilarKey + lfName + voidInfo
    );
    // Type9a.{T.B}.EE.{H,M,D,Y}.{TOMB, SICKNESS, ... }.{Void, NoVoid}&{-,+}.{-,+}
    this.addUpdatePtsBaseComment(
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
    this.addUpdatePtsBaseComment(
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

    for (let index = 0; index < pilarsAttr.deityAttr.count.length; index++) {
      const elementENeR = ElementNEnergyRelation.DR.getEnum(
        index
      ) as ElementNEnergyRelation;
      if (elementENeR !== eNeR) {
        let suffix = ".0";
        if (pilarsAttr.deityAttr.count[index] > 0) {
          suffix = ".+";
        }
        // Type10b.D.EE.EX.{0,+}&
        this.addUpdatePtsBaseComment(
          "Type10b." +
            pilarKey +
            DOT +
            eNeRKey +
            DOT +
            elementENeR.getBaseGroup().getName() +
            suffix
        );
        // Type10b.{T.B}.EE.D.{0..3}.EX.{0,+}&
        this.addUpdatePtsBaseComment(
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
    let fromPilarKey = LunarBase.getPilarShortLabel(frompilarIdx);
    let toPilarKey = LunarBase.getPilarShortLabel(toPilarIdx);

    // Assume toENeR.ordinal() >= fromENeR.ordinal()
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
    const dayForce = this.baseAttr.dayForce;
    let temp =
      fromENeRKey + DOT + fromPilarKey + DOT + toENeRKey + DOT + toPilarKey;

    this.addUpdatePtsBaseComment("TypeTB1." + temp);
    this.addUpdatePtsBaseComment("TypeTB2." + dayForce + DOT + temp);

    temp =
      fromENeRKey + DOT + fromPilarKey + DOT + toENeRKey + DOT + toBaseENeRKey;
    this.addUpdatePtsBaseComment("TypeTB1." + temp);
    this.addUpdatePtsBaseComment("TypeTB2." + dayForce + DOT + temp);

    temp =
      fromENeRKey + DOT + fromBaseENeRKey + DOT + toENeRKey + DOT + toPilarKey;
    this.addUpdatePtsBaseComment("TypeTB1." + temp);
    this.addUpdatePtsBaseComment("TypeTB2." + dayForce + DOT + temp);

    this.addUpdatePtsBaseComment(
      "TypeTB1." + fromBaseENeRKey + DOT + toBaseENeRKey
    );
  }

  private commentOnTrunkDeities(
    d1: ElementNEnergyRelation,
    d2: ElementNEnergyRelation,
    d3: ElementNEnergyRelation
  ) {
    if (d1.ordinal() > d2.ordinal()) {
      this.commentOnTrunkDeities(d2, d1, d3);
    } else {
      if (d1.ordinal() > d3.ordinal()) {
        this.commentOnTrunkDeities(d3, d2, d1);
      } else {
        if (d2.ordinal() > d3.ordinal()) {
          this.commentOnTrunkDeities(d1, d3, d2);
        } else {
          const DOT = ".";
          this.addUpdatePtsBaseComment(
            "TypeTB1." + d1.getName() + DOT + d2.getName() + DOT + d3.getName()
          );
        }
      }
    }
  }

  private commentPilarDeities() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const dIndex = LunarBase.DINDEX;
    const pLen = LunarBase.PILARS_LEN;
    this.commentOnTrunkDeities(
      pilarsAttr.getPilarDeity(LunarBase.YINDEX),
      pilarsAttr.getPilarDeity(LunarBase.MINDEX),
      pilarsAttr.getPilarDeity(LunarBase.HINDEX)
    );
    for (let pilarIdx = 0; pilarIdx < pLen; pilarIdx++) {
      const eNeR = pilarsAttr.getPilarDeity(pilarIdx);
      if (pilarIdx !== dIndex) {
        this.commentOnSAMEPilarDeity(pilarIdx, eNeR, null, true);
      }
      let hiddenEnERArr = pilarsAttr.getHiddenPilarDeities(pilarIdx);
      for (let hiddenIdx = 0; hiddenIdx < hiddenEnERArr.length; hiddenIdx++) {
        const hiddenEnER = hiddenEnERArr[hiddenIdx];
        if (hiddenEnER !== null) {
          this.commentOnSAMEPilarDeity(pilarIdx, eNeR, hiddenEnER, true);
          this.commentOnSAMEPilarDeity(pilarIdx, hiddenEnER, eNeR, false);
        }
      }

      if (pilarIdx < pLen - 1) {
        const nearPilarIdx = pilarIdx + 1;
        const nearEneR = pilarsAttr.getPilarDeity(nearPilarIdx);
        this.commentOnNearPilarDeity(eNeR, pilarIdx, nearEneR, nearPilarIdx);
        hiddenEnERArr = pilarsAttr.getHiddenPilarDeities(nearPilarIdx);
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
  }

  //Element.MAXElement.WeakElement.(0,-)
  private commentOnElement() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const DOT = ".";
    const elementsValues = Element.WATER.getValues() as Element[];
    let isBalanced = true;
    for (let wIndex = 0; wIndex < elementsValues.length; wIndex++) {
      const wElement = elementsValues[wIndex];
      if (pilarsAttr.isVeryWeakedElement(wElement)) {
        for (let sIndex = 0; sIndex < elementsValues.length; sIndex++) {
          const sElement = elementsValues[sIndex];
          if (pilarsAttr.isFavorableElement(sElement)) {
            let suffix = ".";
            let wForce = pilarsAttr.getElementForce(wElement);
            if (wForce === 0) {
              suffix += "0";
            } else {
              suffix += "-";
            }
            this.addUpdatePtsBaseComment(
              "Element." +
                sElement.getName() +
                DOT +
                wElement.getName() +
                "suffix"
            );
            isBalanced = false;
          }
        }
      }
    }
    if (isBalanced) {
      this.addUpdatePtsBaseComment("Element.Balanced");
    }
  }

  private getStructureName(structureData: DataWithLog) {
    if (structureData === null) return "null";
    const structure = structureData.getValue() as BaziStructure;
    return structure.getName();
  }

  private getDeityPilarArr(eneR: ElementNEnergyRelation) {
    const pilarIdxArr: number[] = [];
    const pilarsAttr = this.lunar.pilarsAttr;
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      let relation = pilarsAttr.getPilarDeity(pilarIdx);
      if (relation === eneR) {
        ObjectHelper.pushIfNotExist(pilarIdxArr, pilarIdx);
      }
      for (
        let index = 0;
        index < pilarsAttr.getHiddenPilarDeities(pilarIdx).length;
        index++
      ) {
        relation = pilarsAttr.getHiddenPilarDeities(pilarIdx)[index];
        if (relation === eneR) {
          ObjectHelper.pushIfNotExist(pilarIdxArr, pilarIdx);
        }
      }
    }
    return pilarIdxArr;
  }

  private commentOnEnERStructure(structureName: string) {
    const structureEneR = ElementNEnergyRelation.HO.getEnumByName(
      structureName
    ) as ElementNEnergyRelation;
    const pilarIdxArr = this.getDeityPilarArr(structureEneR);
    let pilarCount2 = this.getLimitCount(pilarIdxArr.length, 2);
    const DOT = ".";
    const strAttr = this.getStructAttr(structureEneR);

    // Cach.DRGrp.{DayForce-.+}.{Count0,1,2}.DOFroup{0,1).DWGrp.{0,1,2)=Ref8p464p1
    let temp =
      "Cach." +
      strAttr.baseName +
      DOT +
      this.baseAttr.dayForce +
      DOT +
      pilarCount2 +
      DOT +
      strAttr.prdBaseName +
      DOT +
      strAttr.prdBseCnt1 +
      DOT +
      strAttr.crtlBaseName +
      DOT +
      strAttr.crtlBseCnt2;
    this.addUpdatePtsBaseComment(temp);
    // Cach.HO.DO.{0,1)=Ref8p466p4
    temp =
      "Cach." +
      strAttr.name +
      DOT +
      strAttr.prodeneR.getName() +
      DOT +
      strAttr.prodeneRCnt1;
    this.addUpdatePtsBaseComment(temp);
    //Cach.7K.H.x
    for (let index = 0; index < pilarIdxArr.length; index++) {
      const pilarIdx = pilarIdxArr[index];
      const pilarChar = LunarBase.getPilarShortLabel(pilarIdx);
      // Cach.7k.H.{0,1,2)==Ref8p464p2c
      temp = "Cach." + strAttr.name + DOT + pilarChar + DOT + pilarCount2;
      this.addUpdatePtsBaseComment(temp);
      // Cach.7k.H.{0,1,2).EG.{0,1,2}==Ref8p464p2
      temp =
        "Cach." +
        structureName +
        DOT +
        pilarChar +
        DOT +
        pilarCount2 +
        DOT +
        strAttr.baseName +
        DOT +
        strAttr.crtlBseCnt1;
      this.addUpdatePtsBaseComment(temp);
    }
  }

  private commentOnThisStructure(structureData: DataWithLog) {
    if (structureData === null) return;
    const structure = structureData.getValue() as BaziStructure;
    const structName = structure.getName();
    if (structure.ordinal() <= 9) {
      this.commentOnEnERStructure(structName);
    }
    const DOT = ".";

    // Cach.DR.+.DO7K.+.DW.+=Ref8p464p1
    let temp =
      "Cach." +
      structName +
      DOT +
      this.baseAttr.dayForce +
      ".DO7K." +
      this.baseAttr.do7KForce +
      ".DWIW." +
      this.baseAttr.dwiwForce;
    this.addUpdatePtsBaseComment(temp);
    //Cach.7k.HO.+
    temp =
      "Cach." +
      structName +
      DOT +
      ".HOEG." +
      this.baseAttr.do7KForce +
      ".DWIW." +
      this.baseAttr.dwiwForce;
    this.addUpdatePtsBaseComment(temp);
    this.addUpdatePtsBaseComment("CachType1." + structName);
    const pilarsAttr = this.lunar.pilarsAttr;
    const eleRValues = ElementNEnergyRelation.getValues();
    const dIndex = LunarBase.DINDEX;

    for (let index = 0; index < eleRValues.length; index += 2) {
      const eeR = eleRValues[index];
      if (eeR.getName() != structName) {
        const count = pilarsAttr.getPairedRelationCount(eeR, dIndex);
        const countSuffix = StringHelper.number2Str(
          count,
          BaziStructureHelper.FAVTHRESHHOLD
        );
        // Assume eer.ordinal() < eer2.ordinal()
        for (let index2 = index + 2; index2 < eleRValues.length; index2 += 2) {
          const eeR2 = eleRValues[index2];
          if (eeR2.getName() != structName) {
            const count2 = pilarsAttr.getPairedRelationCount(eeR, dIndex);
            const count2Suffix = StringHelper.number2Str(
              count2,
              BaziStructureHelper.FAVTHRESHHOLD
            );
            this.addUpdatePtsBaseComment(
              "CachType2." +
                structName +
                DOT +
                eeR.getName() +
                DOT +
                countSuffix +
                DOT +
                eeR2.getName() +
                DOT +
                count2Suffix
            );
          }
        }
      }
    }
  }

  //
  private commentOnStructure() {
    const pilarsAttr = this.lunar.pilarsAttr;
    for (let index = 0; index < pilarsAttr.structure.length; index++) {
      const structure = pilarsAttr.structure[index];
      this.commentOnThisStructure(structure);
    }
  }
  // DayMaster.DayElement.DayForce
  // DayMaster.DayTrunk.DayForce
  // DayMaster.DayForce.DO7k.Force.DRIR.Force
  // DayMaster.DayForce.DO7K.Force
  // DayMaster.DayForce.DRIR.Force
  // DayMaster.DayForce.DO7K.Force
  // DayMaster.DayForce.DRIR.Force.HOEG.Force
  private commentOnBaziDayMaster() {
    const dayForce = this.baseAttr.dayForce;
    const dIndex = LunarBase.DINDEX;
    const DOT = ".";
    const dTrunk = this.lunar.pilars[dIndex].trunk;
    const dElement = this.baseAttr.dTrunkElementNEnergy.element;
    this.addUpdatePtsBaseComment(
      "DayMaster." + dElement.getName() + DOT + dayForce
    );
    this.addUpdatePtsBaseComment(
      "DayMaster." + dTrunk.getName() + DOT + dayForce
    );
    // Ref3p182 DayMaster.-.DO7K.+.DRIR.+&"
    const do7KForce = this.baseAttr.do7KForce;
    const drIRForce = this.baseAttr.drIRForce;
    let temp =
      "DayMaster." + dayForce + ".DO7K." + do7KForce + ".DRIR." + drIRForce;
    this.addUpdatePtsBaseComment(temp);
    temp = "DayMaster." + dayForce + ".DO7K." + do7KForce;
    this.addUpdatePtsBaseComment(temp);
    temp = "DayMaster." + dayForce + ".DRIR." + drIRForce;
    this.addUpdatePtsBaseComment(temp);
    temp =
      "DayMaster." +
      dayForce +
      ".DO7K." +
      do7KForce +
      ".HOEG." +
      this.baseAttr.hoegForce;
    this.addUpdatePtsBaseComment(temp);
    temp =
      "DayMaster." +
      dayForce +
      ".DRIR." +
      drIRForce +
      ".HOEG." +
      this.baseAttr.hoegForce;
    this.addUpdatePtsBaseComment(temp);
  }

  override getName() {
    return "bazi Observation";
  }

  // Pivot.Force.AntiPivot.Force Ref3p172p6
  // Pivot.dayForce.DRGrp.Force
  // Pivot.DeityGrp.Force.AntiPivot.AntiPivotGrp.Force
  // Pivot.DeityGrp.pivotstatus.Dayforce
  // AntiPivot.AntiPivotGrp.Status(2 ou 4).DayForce
  //Pivot.DeityGroup.Force.DayForce.SupportDeity.present
  commentOnElligiblePivots() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const DOT = ".";
    const pivotElements = pilarsAttr.elligiblePivotData.getValue();
    const elementsValues = Element.WATER.getValues() as Element[];
    const dayForce = this.baseAttr.dayForce;
    const dIndex = LunarBase.DINDEX;
    for (let pivotIndex = 0; pivotIndex < pivotElements.length; pivotIndex++) {
      const pivotElement = pivotElements[pivotIndex];
      let deitybaseGrp = pilarsAttr.getDeityBaseGrpByElement(pivotElement);
      let deityGrpForce = pilarsAttr.getDeityForceByElement(pivotElement);
      const pivotStatus = pilarsAttr.getPivotStatusStr(pivotElement);
      let temp =
        "Pivot." + deitybaseGrp.getName() + DOT + pivotStatus + DOT + dayForce;
      // Pivot.DeityGrp.Force.Dayforce
      this.addUpdatePtsBaseComment(temp);
      // Pivot.dayForce.DRGrp.Force
      temp = "Pivot." + dayForce + ".DR." + this.baseAttr.drIRForce;
      console.log(temp);
      this.addUpdatePtsBaseComment(temp);
      for (
        let elementIndex = 0;
        elementIndex < elementsValues.length;
        elementIndex++
      ) {
        const element = elementsValues[elementIndex];

        if (
          element.isDestructive(pivotElement) &&
          !ObjectHelper.hasItem(pivotElements, element)
        ) {
          let antiDeitybaseGrp = pilarsAttr.getDeityBaseGrpByElement(element);
          let antiDeityGrpForce = pilarsAttr.getDeityForceByElement(element);
          //Pivot.DeityGrp.Force.AntiPivot.AntiPivotGrp.Force
          temp =
            "Pivot." +
            deitybaseGrp.getName() +
            DOT +
            deityGrpForce +
            DOT +
            "AntiPivot." +
            antiDeitybaseGrp.getName() +
            DOT +
            antiDeityGrpForce;
          this.addUpdatePtsBaseComment(temp);
          // Pivot.Force.AntiPivot.Force Ref3p172p6
          this.addUpdatePtsBaseComment("Pivot.Force.AntiPivot.Force");
          // AntiPivot.AntiPivotGrp.Status(3 ou 4).DayForce
          const antiPivotStatus = pilarsAttr.getPivotStatusStr(element); // Hostile status

          temp =
            "AntiPivot." +
            antiDeitybaseGrp.getName() +
            DOT +
            antiPivotStatus +
            DOT +
            dayForce;
          console.log(temp);
          this.addUpdatePtsBaseComment(temp);
        } else {
          if (element.isProductive(pivotElement)) {
            let supportDeitybaseGrp =
              pilarsAttr.getDeityBaseGrpByElement(element);
            let count = pilarsAttr.getPairedRelationCount(
              supportDeitybaseGrp,
              dIndex
            );
            if (count > 0) {
              //Pivot.DeityGroup.DayForce.SupportDeity.Present
              temp =
                "Pivot." +
                deitybaseGrp.getName() +
                DOT +
                deityGrpForce +
                DOT +
                dayForce +
                DOT +
                supportDeitybaseGrp.getName() +
                ".Present";
              console.log(temp);
              this.addUpdatePtsBaseComment(temp);
            }
          }
        }
        // Pivot.DeityGrp.DeityForce.CabBeGENERATE
      }
    }
  }

  evalBaseDestinyPoint() {
    const pilarsAttr = this.lunar.pilarsAttr;
    // Day Master
    this.incPoints(
      this.force2Point(pilarsAttr.qiTypeData.getForce(QiType.DAYSTATUS))
    );
    const dwiwCount = pilarsAttr.getPairedRelationCount(
      ElementNEnergyRelation.DW,
      LunarBase.DINDEX
    );
    // Ref3p595
    if (dwiwCount === 0) {
      this.incPoints(1);
    }
    // Ref3p596
    const pilars = this.lunar.pilars;
    const pivotElements = pilarsAttr.elligiblePivotData.getValue();
    for (let index = 0; index < pivotElements.length; index++) {
      const element = pivotElements[index];
      let lowestPoint = 10;
      let found = false;
      for (
        let trunkPilarIdx = 0;
        trunkPilarIdx < LunarBase.PILARS_LEN;
        trunkPilarIdx++
      ) {
        if (element === pilars[trunkPilarIdx].trunk.getElement()) {
          const lifeCycle = ElementLifeCycle.getElementLifeCycle(
            pilars[trunkPilarIdx].trunk,
            pilars[trunkPilarIdx].branche
          );
          const point = this.qiforce2Point(lifeCycle.qiForce);
          if (lowestPoint > point) lowestPoint = point;
          found = true;
        }
      }
      if (found) {
        this.incPoints(lowestPoint);
      }
    }
  }

  override comment() {

    super.comment();
    this.evalBaseDestinyPoint();
    this.evalCurrAttr();
    this.commentOnSecDeity();
    if (!this.hasQuyNhan) {
      this.addUpdatePtsBaseComment("QuyNhanNotPresent");
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
    this.commentOnPilar();
    this.commentOnElligiblePivots();
  }
}
