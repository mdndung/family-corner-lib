import { Element } from "../mt-data/feng-shui/element";
import { Branche } from "../mt-data/bazi/branche";
import { LunarBase } from "../mt-data/bazi/lunarBase";
import { BaziStructure } from "../mt-data/bazi/bazi-structure";
import { BaziHelper } from "./baziHelper";
import { CombAttr } from "../mt-data/bazi/combinationList";
import { ElementNEnergyRelation } from "../mt-data/feng-shui/elementNEnergyRelation";
import { Trunk } from "../mt-data/bazi/trunk";
import { BrancheHelper } from "./brancheHelper";
import { Lunar } from "../mt-data/bazi/lunar";
import { DataWithLog } from "../mt-data/qi/dataWithLog";
import { EnumBaseClass } from "../mt-data/enumBaseClass";
import { ObjectHelper } from "./objectHelper";

export class BaziStructureHelper {
  static FAVTHRESHHOLD = 3;

  static getDataLog(structure: BaziStructure, reason: string) {
    return new DataWithLog(structure, reason);
  }

  static getPairedENumFullName(ee: EnumBaseClass) {
    return (
      ee.getMsgFullName() + ", " + ee.getEnumNextNElement(1).getMsgFullName()
    );
  }

  static getVerySpecialCach(bazi: Lunar): DataWithLog {
    const pilars = bazi.pilars;
    let dayTrunk = pilars[LunarBase.DINDEX].trunk;
    let sameTrunk =
      dayTrunk == pilars[LunarBase.YINDEX].trunk &&
      dayTrunk == pilars[LunarBase.MINDEX].trunk &&
      dayTrunk == pilars[LunarBase.HINDEX].trunk;
    const dayBranche = pilars[LunarBase.DINDEX].branche;
    const sameBranche =
      dayBranche == pilars[LunarBase.YINDEX].branche &&
      dayBranche == pilars[LunarBase.MINDEX].branche &&
      dayBranche == pilars[LunarBase.HINDEX].branche;
    if (sameTrunk) {
      if (sameBranche) {
        return BaziStructureHelper.getDataLog(
          BaziStructure.THIEN_NGUYEN_NHAT_KHI,
          "Same year, month, hour trunks " +
            dayTrunk +
            " and branches " +
            dayBranche
        );
      }
      return BaziStructureHelper.getDataLog(
        BaziStructure.THIEN_CAN_NHAT_TU,
        "Same year, month, hour trunks " + dayTrunk
      );
    }
    if (sameBranche) {
      return BaziStructureHelper.getDataLog(
        BaziStructure.DIA_CHI_NHAT_TU,
        "Same year, month, hour branches " + dayBranche
      );
    }
    return null;
  }

  //Ref8p460
  static getChuyenVuongCach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    const pilars = bazi.pilars;
    let details = "";
    const trunkDayElement = pilars[LunarBase.DINDEX].trunk.getElement();
    if (pilarsAttr.isFavorableElement(trunkDayElement)) {
      details +=
        "<li> Favorable trunk day element " + trunkDayElement + "</li>";
      let restrictElement = trunkDayElement.getPrevControlElement();
      if (pilarsAttr.isVeryWeakedElement(restrictElement)) {
        details += "<li> Very weaked element " + restrictElement + "</li>";
        const countFav = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.DR,
          LunarBase.MINDEX
        );
        const countFriendFav = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.RW,
          LunarBase.DINDEX
        );
        //Ref8p539 case 7
        if (countFav + countFriendFav > BaziStructureHelper.FAVTHRESHHOLD) {
          let structure = null;
          switch (trunkDayElement) {
            case Element.WOOD:
              structure = BaziStructure.KHUC_TRUC;
              break;
            case Element.FIRE:
              structure = BaziStructure.VIEM_THUONG;
              break;
            case Element.EARTH:
              structure = BaziStructure.GIA_TUONG;
              break;
            case Element.METAL:
              structure = BaziStructure.TONG_CACH;
              break;
            case Element.WATER:
              structure = BaziStructure.NHUAN_HA;
              break;
          }
          return BaziStructureHelper.getDataLog(
            structure,
            details +
              "<li>Lot (" +
              (countFav + countFriendFav) +
              ") of " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.DR
              ) +
              " and " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.RW
              ) +
              "</li>"
          );
        }
      }
    }
    return null;
  }

  //Ref8p461
  static getHoaKhiCach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    let details = "";

    const combList = pilarsAttr.combList;
    const combAttrList = combList.getCombTypeAttrList(
      CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
      LunarBase.DINDEX
    );
    if (combAttrList.length > 0) {
      // Ngũ hợp can ngay
      const trElement = combAttrList[0].resultData;
      if (
        pilarsAttr.isElementInNonNullForceHiddenTrunk(
          LunarBase.MINDEX,
          trElement
        )
      ) {
        details =
          "<li>Day trunk is transformable by combination to " +
          trElement +
          " part of month Element </li>";
        const restrictElment = trElement.getPrevControlElement();
        if (pilarsAttr.isWeakedElement(restrictElment)) {
          details += "<li>Control element " + restrictElment + " is weak </li>";
          let structure = null;
          switch (trElement) {
            case Element.WOOD:
              structure = BaziStructure.TO_WOOD;
              break;
            case Element.FIRE:
              structure = BaziStructure.TO_FIRE;
              break;
            case Element.EARTH:
              structure = BaziStructure.TO_EARTH;
              break;
            case Element.METAL:
              structure = BaziStructure.TO_METAL;
              break;
            case Element.WATER:
              structure = BaziStructure.TO_WATER;
              break;
          }
          return BaziStructureHelper.getDataLog(structure, details);
        }
      }
    }
    return null;
  }

  // Ref8p495
  static getTongSatCach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;

    let details = "";
    if (!pilarsAttr.isDayElementNFriendForceFavorable()) {
      details = "<li>Weak Day Force </li>";
      // Ref8p495
      if (!pilarsAttr.rootPresent[LunarBase.DINDEX]) {
        // Ref8p495 Cas Tong Sat
        details += "<li> day trunk element not present in day branche </li>";
        const countRC = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.DO,
          LunarBase.DINDEX
        );
        if (countRC >= BaziStructureHelper.FAVTHRESHHOLD) {
          details +=
            "<li> lot of " +
            countRC +
            " " +
            BaziStructureHelper.getPairedENumFullName(
              ElementNEnergyRelation.DO
            ) +
            "</li>";
          // Case Ref8p497 cas 1
          const countGDC = pilarsAttr.getTrunkPairedRelationCount(
            ElementNEnergyRelation.HO,
            LunarBase.DINDEX
          );
          if (countGDC === 0) {
            details +=
              "<li> absence of " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.HO
              ) +
              "</li>";
            const countEC = pilarsAttr.getTrunkPairedRelationCount(
              ElementNEnergyRelation.RW,
              LunarBase.DINDEX
            );
            if (countEC !== 0) {
              // See Ref9p284
              details +=
                "<li> presence of " +
                countEC +
                " " +
                BaziStructureHelper.getPairedENumFullName(
                  ElementNEnergyRelation.RW
                ) +
                "</li>";
              let structure = BaziStructure.TONG_SAT;
              const countGC = pilarsAttr.getPairedRelationCount(
                ElementNEnergyRelation.DR,
                LunarBase.DINDEX
              );
              if (countGC > 0) {
                details +=
                  "<li> presence of " +
                  countGC +
                  " " +
                  BaziStructureHelper.getPairedENumFullName(
                    ElementNEnergyRelation.DR
                  ) +
                  "</li>";
                structure = BaziStructure.DUMMY_TONG_SAT;
              }
              return BaziStructureHelper.getDataLog(structure, details);
            }
          }
        }
      }
    }
    return null;
  }

  //Ref8p500
  //Ref3p374
  static getTongNhiCach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    let details = "";
    if (!pilarsAttr.isDayElementNFriendForceFavorable()) {
      details = "<li> Weak Day Force</li>";
      let structure = BaziStructure.TONG_NHI;
      if (!BaziHelper.isBrancheAppearInTrunks(bazi, LunarBase.MINDEX)) {
        structure = BaziStructure.DUMMY_TONG_NHI;
      } else {
        details += "<li> with Month element appeared in trunk </li>";
      }

      const countGDC = pilarsAttr.getPairedRelationCount(
        ElementNEnergyRelation.HO,
        LunarBase.MINDEX
      );
      if (countGDC > BaziStructureHelper.FAVTHRESHHOLD) {
        details +=
          "<li> with presence " +
          countGDC +
          " of " +
          BaziStructureHelper.getPairedENumFullName(ElementNEnergyRelation.HO) +
          "</li>";
        const countRDC = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.DW,
          LunarBase.DINDEX
        );
        if (countRDC > 0) {
          details +=
            "<li> with presence " +
            countRDC +
            " of " +
            BaziStructureHelper.getPairedENumFullName(
              ElementNEnergyRelation.DW
            ) +
            "</li>";
          const countGCRC =
            pilarsAttr.getPairedRelationCount(
              ElementNEnergyRelation.DR,
              LunarBase.DINDEX
            ) +
            pilarsAttr.getPairedRelationCount(
              ElementNEnergyRelation.DO,
              LunarBase.DINDEX
            );
          if (countGCRC < 2) {
            details +=
              "<li>with no or litte presence " +
              countGCRC +
              " of " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.DR
              ) +
              ", " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.DO
              );
            ("</li>");
            const countEC = pilarsAttr.getPairedRelationCount(
              ElementNEnergyRelation.RW,
              LunarBase.DINDEX
            );
            if (countEC < countGDC) {
              if (
                bazi.pilars[LunarBase.MINDEX].branche.elementNEnergy !==
                pilarsAttr.brancheEE[LunarBase.MINDEX].getValue()
              ) {
                // Ref8p508
                structure = BaziStructure.TONG_THE;
                details +=
                  "<li> month branche element " +
                  bazi.pilars[LunarBase.MINDEX].branche.elementNEnergy +
                  " is transformed to " +
                  pilarsAttr.brancheEE[LunarBase.MINDEX].getValue() +
                  " and </li>";
              }
              return BaziStructureHelper.getDataLog(structure, details);
            }
          }
        }
      }
    }
    return null;
  }

  //Ref8p505
  static getTongTheCach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    let countFav = 0;
    let countNonFav = 0;
    let countAvoid = 0;
    let favThreshHold = 3;
    let details = "";

    if (!pilarsAttr.isDayElementNFriendForceFavorable()) {
      details = "<li>Weak Day Force </li>";
      let structure = BaziStructure.TONG_THE;

      if (
        !BaziHelper.isTrunkInBranche(
          bazi,
          LunarBase.DINDEX,
          LunarBase.DINDEX
        ) &&
        !BaziHelper.isTrunkInBranche(bazi, LunarBase.DINDEX, LunarBase.MINDEX)
      ) {
        details +=
          "<li> Day trunk element not present in day, month pilars</li> ";
        countFav =
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.HO,
            LunarBase.MINDEX
          ) +
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.DO,
            LunarBase.MINDEX
          );
        countNonFav = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.DR,
          LunarBase.DINDEX
        );
        countAvoid = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.RW,
          LunarBase.DINDEX
        );

        if (countFav >= favThreshHold && countAvoid === 0 && countNonFav <= 2) {
          if (countNonFav > 0) {
            // Ref8p506
            structure = BaziStructure.DUMMY_TONG_THE;
          }
          return BaziStructureHelper.getDataLog(
            structure,
            details +
              "<li> with strong presence (" +
              countFav +
              ") of " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.HO
              ) +
              ", " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.DO
              ) +
              "</li>"
          );
        }
      }
    }
    return null;
  }

  //Ref8p505
  static getTongTaiCach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    let countNonFav = 0;
    let countAvoid = 0;
    let details = "";

    if (!pilarsAttr.isDayElementNFriendForceFavorable()) {
      details = "<li>Weak Day Force </li>";
      let structure = BaziStructure.TONG_TAI;
      if (
        !BaziHelper.isTrunkInBranche(bazi, LunarBase.DINDEX, LunarBase.DINDEX)
      ) {
        details += "<li> Day trunk element not present in day branch </li>";
        countAvoid = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.DR,
          LunarBase.DINDEX
        );
        countNonFav = pilarsAttr.getTrunkPairedRelationCount(
          ElementNEnergyRelation.RW,
          LunarBase.DINDEX
        );

        if (countAvoid + countNonFav <= 1) {
          if (countNonFav === 1) {
            structure = BaziStructure.DUMMY_TONG_TAI;
          }
          return BaziStructureHelper.getDataLog(
            structure,
            details +
              "<li> without presence of " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.DR
              ) +
              " and with litte presence (" +
              countNonFav +
              ") of " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.RW
              ) +
              "</li>"
          );
        }
      }
    }
    return null;
  }

  //Ref8p462
  static getTongNhuocCach(bazi: Lunar): DataWithLog {
    let structure = BaziStructureHelper.getTongSatCach(bazi);
    if (structure !== null) return structure;

    structure = BaziStructureHelper.getTongNhiCach(bazi);
    if (structure !== null) return structure;

    structure = BaziStructureHelper.getTongTheCach(bazi);
    if (structure !== null) return structure;

    structure = BaziStructureHelper.getTongTaiCach(bazi);
    if (structure !== null) return structure;

    return null;
  }

  //Ref3p369, Ref8p478-479
  static getKinhDuongKienLoc(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    let details = "";
    let eeRtocheck: ElementNEnergyRelation[] = [];

    if (pilarsAttr.isDayElementNFriendForceFavorable()) {
      details = "<li> Favorable day force </>";
      eeRtocheck = [
        ElementNEnergyRelation.RW,
        ElementNEnergyRelation.DR,
        ElementNEnergyRelation.HO,
        ElementNEnergyRelation.DW,
        ElementNEnergyRelation.DO,
      ];
    } else {
      details = "<li>Weak day force </>";
      eeRtocheck = [
        ElementNEnergyRelation.DW,
        ElementNEnergyRelation.DO,
        ElementNEnergyRelation.HO,
      ];
    }
    for (let index = 0; index < eeRtocheck.length; index++) {
      const eeR = eeRtocheck[index];
      let countEeR = pilarsAttr.getPairedRelationCount(eeR, LunarBase.DINDEX);
      if (eeR === ElementNEnergyRelation.RW) {
        countEeR--;
      }
      if (countEeR > BaziStructureHelper.FAVTHRESHHOLD) {
        details +=
          "<li> lot of (" +
          countEeR +
          ") " +
          BaziStructureHelper.getPairedENumFullName(eeR) +
          "</li>";
        return BaziStructureHelper.getDataLog(
          BaziStructure.KINH_DUONG_KIEN_LOC,
          details
        );
      }
    }

    return null;
  }

  //Ref8p471
  static getThienDiaHopCach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    const combList = pilarsAttr.combList;
    let details = "";
    let combAttrList = combList.getCombTypeAttrList(
      CombAttr.TRUNKCOMB5TYPE,
      LunarBase.DINDEX
    );
    if (combAttrList.length > 0) {
      details = combAttrList[0].detail;
      combAttrList = combList.getCombTypeAttrList(
        CombAttr.BRANCHECOMB6TYPE,
        LunarBase.DINDEX
      );
      if (combAttrList.length > 0) {
        details += ", " + combAttrList[0].detail;
        return BaziStructureHelper.getDataLog(
          BaziStructure.THIEN_DIA_DUC_KHI,
          details
        );
      }
    }
    return null;
  }

  //Ref8p464
  static getRCRECach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    const pilars = bazi.pilars;
    let details = "";
    const trunkDayElement = pilars[LunarBase.DINDEX].trunk.getElement();
    if (pilarsAttr.isFavorableElement(trunkDayElement)) {
      details += "<li> Favorable day Element </li>";
      const countRE = pilarsAttr.getTrunkRelationCount(
        ElementNEnergyRelation.K7,
        LunarBase.DINDEX
      );
      if (countRE > 0) {
        details +=
          "<li> presence (" +
          countRE +
          ") " +
          ElementNEnergyRelation.K7.getMsgFullName() +
          "</li>";
        let structure = BaziStructure.THAT_SAT;
        const countGDC = pilarsAttr.getTrunkRelationCount(
          ElementNEnergyRelation.EG,
          LunarBase.DINDEX
        );
        if (countGDC > 0) {
          structure = BaziStructure.CHINH_QUAN;
          details +=
            "<li> presence (" +
            countRE +
            ") " +
            ElementNEnergyRelation.IR.getMsgFullName() +
            "</li>";
        }
        return BaziStructureHelper.getDataLog(structure, details);
      }
    }
    return null;
  }


  static pushIfNotExist(arr: DataWithLog[],item: DataWithLog) {
    if ( item===null ) return ;
    const checkStructure = item.getValue();
    for (let index = 0; index < arr.length; index++) {
      const structure = arr[index].getValue();
      if ( structure===checkStructure) return ;
    }
     arr.push(item);
  }

  static getCachCucList(bazi: Lunar): DataWithLog[] {

    const res: DataWithLog[] = [];
    this.pushIfNotExist(res,BaziStructureHelper.getVerySpecialCach(bazi));
    this.pushIfNotExist(res,BaziStructureHelper.getChuyenVuongCach(bazi));
    this.pushIfNotExist(res,BaziStructureHelper.getHoaKhiCach(bazi));
    this.pushIfNotExist(res,BaziStructureHelper.getTongNhuocCach(bazi));
    this.pushIfNotExist(res,BaziStructureHelper.getKinhDuongKienLoc(bazi));
    this.pushIfNotExist(res,BaziStructureHelper.getThienDiaHopCach(bazi));
    this.pushIfNotExist(res, BaziStructureHelper.getRCRECach(bazi));
    return res;
  }

  static getMainCachCucList(bazi: Lunar,specialSruct:DataWithLog[]): DataWithLog[] {
    let pilars = bazi.pilars;
    let monthBranche = pilars[LunarBase.MINDEX].branche;

    const res: DataWithLog[] = specialSruct;

    // Other Cases: Ref3P356-p367
    // Case Day Trunk Element
    //   different from month element and
    //   month element same as hidden trunk element
    //
    const pilarsAttr = bazi.pilarsAttr;
    let monthEnE = pilarsAttr.brancheEE[LunarBase.MINDEX].getValue();
    let monthElement = monthEnE.element;
    let dayTrunkEnE = pilars[LunarBase.DINDEX].trunk.elementNEnergy;
    const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(monthBranche);
    let dayTrunkElement = dayTrunkEnE.getElement();

    // hiddenTrunkArr.length == 3 : Presence of Tap khi
    if (hiddenTrunkArr.length < 3 && dayTrunkElement != monthElement) {
      // Try first with the monthEnE
      for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
        if (monthElement === pilars[pilarIdx].trunk.getElement()) {
          const monthDayEERelation = BaziHelper.getEnNRelation(
            monthEnE,
            dayTrunkEnE
          );
          this.pushIfNotExist(res, BaziStructureHelper.getDataLog(
            BaziStructure.THUONG_QUAN.getEnum(monthDayEERelation.ordinal()),
            "<li>Month branche and Day Trunk Element Energy Relation " +
              monthDayEERelation.getMsgFullName()
          ));
        }
      }
    }

    // Other Cases
    //
    //
    for (let i = 0; i < hiddenTrunkArr.length; i++) {
      const hiddenTrunk = hiddenTrunkArr[i];
      //
      if (dayTrunkElement !== hiddenTrunk.getElement()) {
        for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
          if (hiddenTrunk.getElement() === pilars[pilarIdx].trunk.getElement()) {
            const eeR = BaziHelper.getEnNRelation(
              hiddenTrunk.elementNEnergy,
              dayTrunkEnE
            );
            this.pushIfNotExist(res, BaziStructureHelper.getDataLog(
              BaziStructure.THUONG_QUAN.getEnum(eeR.ordinal()),
              "<li>Hidden and Day Trunk Element Energy Relation " +
                eeR.getMsgFullName()
            ));
          }
        }
      }
    }
    // Try using pivot
    if (pilarsAttr.elligiblePivotData !== null) {
      const elligibleElements = pilarsAttr.elligiblePivotData.getValue();
      for (let index = 0; index < elligibleElements.length; index++) {
        const element = elligibleElements[index];
        for (let i = 0; i < hiddenTrunkArr.length; i++) {
          const hiddenTrunk = hiddenTrunkArr[i];
          //
          for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
            if (hiddenTrunk.getElement() === element) {
              const eeR = BaziHelper.getEnNRelation(
                hiddenTrunk.elementNEnergy,
                dayTrunkEnE
              );
              this.pushIfNotExist(res, BaziStructureHelper.getDataLog(
                BaziStructure.THUONG_QUAN.getEnum(eeR.ordinal()),
                "<li>Hidden and Day Trunk Element Energy Relation from pivot element " +
                  eeR.getMsgFullName()
              ));
            }
          }
        }
      }
    }
    return res;
  }

  static getPivot(bazi: Lunar) {}
}
