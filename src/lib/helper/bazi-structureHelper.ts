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
    const trunkArr = bazi.trunkArr;
    const brancheArr = bazi.brancheArr;
    let dayTrunk = trunkArr[LunarBase.DINDEX];
    let sameTrunk =
      dayTrunk == trunkArr[LunarBase.YINDEX] &&
      dayTrunk == trunkArr[LunarBase.MINDEX] &&
      dayTrunk == trunkArr[LunarBase.HINDEX];
    const dayBranche = brancheArr[LunarBase.DINDEX];
    const sameBranche =
      dayBranche == brancheArr[LunarBase.YINDEX] &&
      dayBranche == brancheArr[LunarBase.MINDEX] &&
      dayBranche == brancheArr[LunarBase.HINDEX];
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
    const trunkArr = bazi.trunkArr;
    let details = "";
    const trunkDayElement = trunkArr[LunarBase.DINDEX].getElement();
    pilarsAttr.logMe(
      "Chuyen Vuong favorable day element ",
      pilarsAttr.isFavorableElement(trunkDayElement)
    );
    if (pilarsAttr.isFavorableElement(trunkDayElement)) {
      details +=
        "<li> Favorable trunk day element " + trunkDayElement + "</li>";
      let restrictElement = trunkDayElement.getPrevControlElement();
      if (pilarsAttr.isVeryWeakedElement(restrictElement)) {
        details += "<li> Very weaked element " + restrictElement + "</li>";
        const countFav = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.GC,
          LunarBase.MINDEX
        );
        const countFriendFav =
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.EC,
            LunarBase.DINDEX
          ) - 1; // -1 to exclude Day Relation against himself
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
                ElementNEnergyRelation.GC
              ) +
              " and " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.EC
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
    let dayPilarForce = pilarsAttr.getDayForce();
    let details = "";

    const combList = pilarsAttr.combList;
    const combAttrList = combList.getCombTypeAttrList(
      CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
      LunarBase.DINDEX
    );
    pilarsAttr.logMe("HOA KHI Transformable Combination 5  ", combAttrList);
    if (combAttrList.length > 0) {
      // Ngũ hợp can ngay
      const trElement = combAttrList[0].resultData;
      pilarsAttr.logMe(
        "HOA KHI trElement " + trElement + " in Month Hidden trunk",
        pilarsAttr.isElementInNonNullForceHiddenTrunk(
          LunarBase.MINDEX,
          trElement
        )
      );
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
        pilarsAttr.logMe(
          "HOA KHI is weak controle element " + restrictElment,
          pilarsAttr.isWeakedElement(restrictElment) +
            " value " +
            pilarsAttr.elementForce[restrictElment.ordinal()].getValue() +
            " Weak threshold " +
            pilarsAttr.weakThreshHold
        );
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

    let countFav = 0;
    let countNonFav = 0;
    let details = "";
    let dayPilarForce = pilarsAttr.getDayForce();
    pilarsAttr.logMe(
      "TongSat 1 weak day force ",
      !pilarsAttr.isFavorable(dayPilarForce)
    );
    if (!pilarsAttr.isFavorable(dayPilarForce)) {
      details = "<li>Weak Day Force </li>";
      // Ref8p495
      pilarsAttr.logMe(
        "TongSat 2 Day trunk not present in day branche ",
        !pilarsAttr.rootPresent[LunarBase.DINDEX]
      );
      if (!pilarsAttr.rootPresent[LunarBase.DINDEX]) {
        // Ref8p495 Cas Tong Sat
        details += "<li> day trunk element not present in day branche </li>";
        countFav = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.RC,
          LunarBase.DINDEX
        );
        // Do not count hidden branche
        // Case Ref8p497 cas 1
        countNonFav = pilarsAttr.getTrunkPairedRelationCount(
          ElementNEnergyRelation.GDC,
          LunarBase.DINDEX
        );
        pilarsAttr.logMe("TongSat ", countFav + " " + countNonFav);
        if (
          countFav >= BaziStructureHelper.FAVTHRESHHOLD &&
          countNonFav === 0
        ) {
          let structure = BaziStructure.TONG_SAT;
          if (
            pilarsAttr.getPairedRelationCount(
              ElementNEnergyRelation.GC,
              LunarBase.DINDEX
            ) > 0
          )
            structure = BaziStructure.DUMMY_TONG_SAT;
          // Miss cas 3 and 4
          return BaziStructureHelper.getDataLog(
            BaziStructure.TONG_SAT,
            details +
              "<li>Lot of (" +
              countFav +
              ") " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.RC
              ) +
              "</li>"
          );
        }
      }
    }
    return null;
  }

  //Ref8p500
  static getTongNhiCach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    let dayPilarForce = pilarsAttr.getDayForce();
    let countFav = 0;
    let countNonFav = 0;
    let countFriendFav = 0;
    let countAvoid = 0;
    let details = "";
    pilarsAttr.logMe(
      "TONG NHI 1 weak day force ",
      !pilarsAttr.isFavorable(dayPilarForce)
    );
    if (!pilarsAttr.isFavorable(dayPilarForce)) {
      details = "<li> Weak Day Force</li>";
      let structure = BaziStructure.TONG_NHI;
      if (!BaziHelper.isBrancheAppearInTrunks(bazi, LunarBase.MINDEX)) {
        structure = BaziStructure.DUMMY_TONG_NHI;
      } else {
        details += "<li> with Month element appeared in trunk </li>";
      }

      countFav = pilarsAttr.getPairedRelationCount(
        ElementNEnergyRelation.GDC,
        LunarBase.MINDEX
      );

      countNonFav =
        pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.EC,
          LunarBase.DINDEX
        ) - 1; // -1 to exclude Day Relation against himself
      countFriendFav = pilarsAttr.getPairedRelationCount(
        ElementNEnergyRelation.RDC,
        LunarBase.DINDEX
      );
      countAvoid = pilarsAttr.getPairedRelationCount(
        ElementNEnergyRelation.GE,
        LunarBase.DINDEX
      );
      pilarsAttr.logMe(
        "TONG NHI countFav GT " + BaziStructureHelper.FAVTHRESHHOLD,
        countFav
      );
      pilarsAttr.logMe("TONG NHI countFriendFav GT 0 ", countFriendFav);
      pilarsAttr.logMe("TONG NHI countNonFav GT 0 ", countNonFav);
      pilarsAttr.logMe("TONG NHI countAvoid EQ 0 ", countAvoid);
      if (
        countFav > BaziStructureHelper.FAVTHRESHHOLD &&
        countNonFav !== 0 &&
        countFriendFav > 0 &&
        countFav >= countNonFav &&
        countNonFav === 0
      ) {
        const count = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.RC,
          LunarBase.DINDEX
        );
        pilarsAttr.logMe(
          countFav + " " + countFriendFav,
          countNonFav + " " + count
        );
        //Ref8p505
        if (count >= BaziStructureHelper.FAVTHRESHHOLD) {
          return null;
          /*
          structure = BaziStructure.TONG_THE;
          details +=
            "<li> with strong presence (" +
            count +
            ") of " +
            ElementNEnergyRelation.RC.getMsgFullName() +
            "," +
            ElementNEnergyRelation.RE.getMsgFullName() +
            " and </li>";
          */
        } else {
          if (
            bazi.brancheArr[LunarBase.MINDEX].elementNEnergy !==
            pilarsAttr.brancheEE[LunarBase.MINDEX].getValue()
          ) {
            // Ref8p508
            structure = BaziStructure.TONG_THE;
            details +=
              "<li> month branche element " +
              bazi.brancheArr[LunarBase.MINDEX].elementNEnergy +
              " is transformed to " +
              pilarsAttr.brancheEE[LunarBase.MINDEX].getValue() +
              " and </li>";
          }
        }
        return BaziStructureHelper.getDataLog(
          structure,
          details +
            "<li> with presence (" +
            countFav +
            ") of " +
            BaziStructureHelper.getPairedENumFullName(
              ElementNEnergyRelation.GDC
            ) +
            "</li>"
        );
      }
    }
    return null;
  }

  //Ref8p505
  static getTongTheCach(bazi: Lunar): DataWithLog {
    const pilarsAttr = bazi.pilarsAttr;
    let dayPilarForce = pilarsAttr.getDayForce();
    let countFav = 0;
    let countNonFav = 0;
    let countAvoid = 0;
    let favThreshHold = 3;
    let details = "";

    if (!pilarsAttr.isFavorable(dayPilarForce)) {
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
            ElementNEnergyRelation.GDC,
            LunarBase.MINDEX
          ) +
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.RC,
            LunarBase.MINDEX
          );
        countNonFav = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.GC,
          LunarBase.DINDEX
        );
        countAvoid = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.EC,
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
                ElementNEnergyRelation.GDC
              ) +
              ", " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.RC
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
    let dayPilarForce = pilarsAttr.getDayForce();
    let countNonFav = 0;
    let countAvoid = 0;
    let details = "";

    if (!pilarsAttr.isFavorable(dayPilarForce)) {
      details = "<li>Weak Day Force </li>";
      let structure = BaziStructure.TONG_TAI;
      pilarsAttr.logMe(
        "Tong Tai Day trunk element not present in day branch ",
        !BaziHelper.isTrunkInBranche(bazi, LunarBase.DINDEX, LunarBase.DINDEX)
      );
      if (
        !BaziHelper.isTrunkInBranche(bazi, LunarBase.DINDEX, LunarBase.DINDEX)
      ) {
        details += "<li> Day trunk element not present in day branch </li>";
        countAvoid = pilarsAttr.getPairedRelationCount(
          ElementNEnergyRelation.GC,
          LunarBase.DINDEX
        );
        countNonFav =
          pilarsAttr.getTrunkPairedRelationCount(
            ElementNEnergyRelation.EC,
            LunarBase.DINDEX
          ) - 1; // -1 to exclude Day Relation against himself
        pilarsAttr.logMe(
          "Tong Tai DR, IR, F, RW count<2",
          countAvoid + countNonFav
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
                ElementNEnergyRelation.GC
              ) +
              " and with litte presence (" +
              countNonFav +
              ") of " +
              BaziStructureHelper.getPairedENumFullName(
                ElementNEnergyRelation.EC
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
    const trunkArr = bazi.trunkArr;
    let details = "";
    let dayPilarForce = pilarsAttr.getDayForce();
    const trunkDayElement = trunkArr[LunarBase.DINDEX].getElement();
    let eeRtocheck: ElementNEnergyRelation[] = [];

    if (pilarsAttr.isFavorable(dayPilarForce)) {
      details = "<li> Favorable day element </>";
      eeRtocheck = [
        ElementNEnergyRelation.EC,
        ElementNEnergyRelation.GC,
        ElementNEnergyRelation.GDC,
        ElementNEnergyRelation.RDC,
        ElementNEnergyRelation.RC,
      ];
    } else {
      details = "<li> weak day element </>";
      eeRtocheck = [
        ElementNEnergyRelation.RDC,
        ElementNEnergyRelation.RC,
        ElementNEnergyRelation.GDC,
      ];
    }
    for (let index = 0; index < eeRtocheck.length; index++) {
      const eeR = eeRtocheck[index];
      let countEeR = pilarsAttr.getPairedRelationCount(eeR, LunarBase.DINDEX);
      if (eeR === ElementNEnergyRelation.EC) {
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
    pilarsAttr.logMe("ThienDia hop", combAttrList);
    if (combAttrList.length > 0) {
      details = combAttrList[0].detail;
      pilarsAttr.logMe("ThienDia hop", details);
      combAttrList = combList.getCombTypeAttrList(
        CombAttr.BRANCHECOMB6TYPE,
        LunarBase.DINDEX
      );
      if (combAttrList.length > 0) {
        details += ", " + combAttrList[0].detail;
        pilarsAttr.logMe("ThienDia hop", details);
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
    const combList = pilarsAttr.combList;
    const trunkArr = bazi.trunkArr;
    let details = "";
    const trunkDayElement = trunkArr[LunarBase.DINDEX].getElement();
    pilarsAttr.logMe(
      "RC favorable day element ",
      pilarsAttr.isFavorableElement(trunkDayElement)
    );
    if (pilarsAttr.isFavorableElement(trunkDayElement)) {
      details += "<li> Favorable day Element </li>";
      const countRE = pilarsAttr.getTrunkRelationCount(
        ElementNEnergyRelation.RE,
        LunarBase.DINDEX
      );
      pilarsAttr.logMe("RC countRC ", countRE);
      if (countRE > 0) {
        details +=
          "<li> presence (" +
          countRE +
          ") " +
          ElementNEnergyRelation.RE.getMsgFullName() +
          "</li>";
        let structure = BaziStructure.THAT_SAT;
        const countGDC = pilarsAttr.getTrunkRelationCount(
          ElementNEnergyRelation.GDE,
          LunarBase.DINDEX
        );
        pilarsAttr.logMe("RC countGDC ", countGDC);
        if (countGDC > 0) {
          structure = BaziStructure.CHINH_QUAN;
          details +=
            "<li> presence (" +
            countRE +
            ") " +
            ElementNEnergyRelation.GE.getMsgFullName() +
            "</li>";
        }
        return BaziStructureHelper.getDataLog(structure, details);
      }
    }
    return null;
  }

  static getCachCuc(bazi: Lunar): DataWithLog {
    let trunkArr = bazi.trunkArr;
    let brancheArr = bazi.brancheArr;

    let dayTrunk = trunkArr[LunarBase.DINDEX];
    let monthBranche = brancheArr[LunarBase.MINDEX];

    let res = null;

    res = BaziStructureHelper.getVerySpecialCach(bazi);
    if (null !== res) return res;

    res = BaziStructureHelper.getChuyenVuongCach(bazi);
    if (null != res) return res;

    res = BaziStructureHelper.getHoaKhiCach(bazi);
    if (null != res) return res;

    res = BaziStructureHelper.getTongNhuocCach(bazi);
    if (null != res) return res;

    res = BaziStructureHelper.getKinhDuongKienLoc(bazi);
    if (null != res) return res;

    res = BaziStructureHelper.getThienDiaHopCach(bazi);
    if (null != res) return res;

    res = BaziStructureHelper.getRCRECach(bazi);
    if (null != res) return res;

    // Other Cases: Ref3P356-p367
    // Case Day Trunk Element
    //   different from month element and
    //   month element same as hidden trunk element
    //
    const pilarsAttr = bazi.pilarsAttr;
    let monthEnE = pilarsAttr.brancheEE[LunarBase.MINDEX].getValue();
    let monthElement = monthEnE.element;
    let dayTrunkEnE = trunkArr[LunarBase.DINDEX].elementNEnergy;
    const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(monthBranche);
    let dayTrunkElement = dayTrunkEnE.getElement();

    // hiddenTrunkArr.length == 3 : Presence of Tap khi
    if (hiddenTrunkArr.length < 3 && dayTrunkElement != monthElement) {
      // Try first with the monthEnE
      for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
        if (monthElement === hiddenTrunkArr[pilarIdx].getElement()) {
          const monthDayEERelation = BaziHelper.getEnNRelation(
            monthEnE,
            dayTrunkEnE
          );
          return BaziStructureHelper.getDataLog(
            BaziStructure.THUONG_QUAN.getEnum(monthDayEERelation.ordinal()),
            "<li>Month branche and Day Trunk Element Energy Relation " +
              monthDayEERelation.getMsgFullName()
          );
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
          const eeR = BaziHelper.getEnNRelation(
            hiddenTrunk.elementNEnergy,
            dayTrunkEnE
          );
          return BaziStructureHelper.getDataLog(
            BaziStructure.THUONG_QUAN.getEnum(eeR.ordinal()),
            "<li>Hidden and Day Trunk Element Energy Relation " +
              eeR.getMsgFullName()
          );
        }
      }
    }
    return null;
  }
}