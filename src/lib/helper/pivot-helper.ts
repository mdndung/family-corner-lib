
import { Lunar } from "../mt-data/bazi/lunar";
import { LunarBase } from "../mt-data/bazi/lunarBase";
import { SecondaryDeity } from "../mt-data/bazi/secondaryDeity";
import { Trunk } from "../mt-data/bazi/trunk";
import { ElementNEnergy } from "../mt-data/feng-shui/elementNenergy";
import { ElementNEnergyRelation } from "../mt-data/feng-shui/elementNEnergyRelation";
import { Element } from "../mt-data/feng-shui/element";
import { DataWithLog } from "../mt-data/qi/dataWithLog";
import { QiType } from "../mt-data/qi/qi-type";
import { BaziHelper } from "./baziHelper";
import { BrancheHelper } from "./brancheHelper";
import { ObjectHelper } from "./objectHelper";
import { QiHelper } from "./qiHelper";
import { Energy } from "../../public-api";

export class PivotHelper {

  static evalPivotForce(
    lunar: Lunar,
    currPilarIdx: number,
    elligiblePivotData: DataWithLog
  ) {
    const elligiblePivotEERSet =
      elligiblePivotData.getValue() as ElementNEnergyRelation[];
    let selectPivotElements: ElementNEnergy[] = [];
    const pilarsAttr = lunar.pilarsAttr;
    // Doing iteratively.
    const trunkRelationArr = pilarsAttr.trunkRelation;
    const dayHiddenRelation= pilarsAttr.dayHiddenRelation;
    const eeForceArr = pilarsAttr.elementNEnergyForce;
    const trunkEEArr = pilarsAttr.trunkEE;
    const brancheArr = lunar.brancheArr;
    const trunkArr = lunar.trunkArr;
    let diffDayPilarForce = 1000;
    const dayPilarForce =
      eeForceArr[trunkEEArr[LunarBase.DINDEX].getValue().ordinal()].getValue();
    let relation = trunkRelationArr[currPilarIdx][LunarBase.DINDEX];
    //
    let matchCount = 0;
    let selectTrunk: Trunk[] = [];
    let currEE = trunkEEArr[currPilarIdx].getValue();
    let currEEForce = eeForceArr[currEE.ordinal()].getValue();

    for (let index = 0; index < elligiblePivotEERSet.length; index++) {
      const checkRelation = elligiblePivotEERSet[index];
      let currdiffDayForce;
      pilarsAttr.logMe(
        "Pilar " + currPilarIdx + " Check trunk relation " + relation,
        "Elligible relation " + checkRelation
      );
      if (relation === checkRelation) {
        currdiffDayForce = Math.abs(currEEForce - dayPilarForce);
        if (currdiffDayForce < diffDayPilarForce) {
          ObjectHelper.pushIfNotExist(selectPivotElements,currEE.element);
          ObjectHelper.pushIfNotExist(selectTrunk,trunkArr[currPilarIdx])
          diffDayPilarForce = currdiffDayForce;
        }
        matchCount++;
      }
      pilarsAttr.logMe(
        "Pilar " + currPilarIdx + " Check branche hidden relation " + dayHiddenRelation[currPilarIdx],
        "Elligible relation " + checkRelation
      );
      const findIdx = ObjectHelper.findIndex(dayHiddenRelation[currPilarIdx],checkRelation);
      if (findIdx>=0) {
        const branche =brancheArr[currPilarIdx];
        const hiddenTrunkArr= BrancheHelper.getHiddenTrunk(branche);
        currEE = hiddenTrunkArr[findIdx].elementNEnergy
        currEEForce = eeForceArr[currEE.ordinal()].getValue();
        currdiffDayForce = Math.abs(currEEForce - dayPilarForce);
        if (currdiffDayForce < diffDayPilarForce) {
          ObjectHelper.pushIfNotExist(selectPivotElements,currEE.element);
          ObjectHelper.pushIfNotExist(selectTrunk,hiddenTrunkArr[currPilarIdx])
          diffDayPilarForce = currdiffDayForce;
        }
        matchCount++;
      }
    };
    return {
      matchCount, index: currPilarIdx,
      selectPivotElements: selectPivotElements, selectTrunk,
      elligiblePivotData: elligiblePivotData,
    };
  }

  static addIfNotPresent ( pivotRelationSet: ElementNEnergyRelation[],deity: ElementNEnergyRelation) {
    let res = "";
    if ( !ObjectHelper.hasItem(pivotRelationSet,deity) ) {
      pivotRelationSet.push(deity);
      res = deity.getName();
    };
    return res ;
  }

  static addEligibleDeityElement(pivotRelationSet:ElementNEnergyRelation[], element: Element, trunkDayEER: ElementNEnergy, header:string) {
    let eer = ElementNEnergy.getElementNEnergy(element,trunkDayEER.energy.getOpposite());
    const deity =  BaziHelper.getEnNRelation(eer, trunkDayEER);
    return PivotHelper.addPairedIfNotPresent(pivotRelationSet,deity,header);
  }

  static addPairedIfNotPresent ( pivotRelationSet: ElementNEnergyRelation[],deity: ElementNEnergyRelation, header?: string) {
    let res = "";
    let sep = "" ;
    if (typeof header === "undefined") header = "";
    if ( !ObjectHelper.hasItem(pivotRelationSet,deity) ) {
      pivotRelationSet.push(deity);
      res = "<li>"+header+" ==>Add deities ("+ deity.getName(); sep = ", ";
    };
    const nextDeity = deity.getEnumNextNElement(1);
    if ( !ObjectHelper.hasItem(pivotRelationSet,nextDeity) ) {
      pivotRelationSet.push(nextDeity);
      res += sep + nextDeity.getName() +") in the elligible pivot deities list </li>";
    };
    return res ;
  }


  static addElligiblePivotEER(
    lunar: Lunar,
    ee: ElementNEnergy,
    pivotRelationSet: ElementNEnergyRelation[]
  ) : string {

    const deity =  BaziHelper.getEnNRelation(ee, lunar.getdTrunk().elementNEnergy);
    return PivotHelper.addIfNotPresent(pivotRelationSet,deity)
  }


  // REF 7a page 97 p7.1: MONTHBRANCHEDAYTRUNKLIFECYCLE (Dụng thần)
  //
  static findElligiblePivotRelation(lunar: Lunar): DataWithLog {
    const pivotRelationSet: ElementNEnergyRelation[] = [];
    const pilarsAttr = lunar.pilarsAttr;
    const FAVORABLE_LIMIT = 5; // Ref8 p768 give 4 and is not favorable
    const qiTypeData = pilarsAttr.qiTypeData;
    const trunkDayEer = lunar.trunkArr[LunarBase.DINDEX].elementNEnergy;
    const trunkDayElement=trunkDayEer.element;
    let details = "<li>Weak Day Trunk Element And Friends Force</li>";
    let currAddedeer="";
    let tempElement: Element ;
    if (pilarsAttr.isDayElementNFriendForceFavorable()) {
      details = "<li>Favorable Day Trunk Element And Friends Force</li>";
      currAddedeer = PivotHelper.addElligiblePivotEER(
        lunar,
        pilarsAttr.trunkEE[LunarBase.DINDEX].getValue(),
        pivotRelationSet
      );
      if ( currAddedeer.length>0 ) {
        details += "<li>Add "+ currAddedeer+" in the elligible pivot deities list</li>"
      }
    } else {
      //Ref3p398 Enforce a controlled weak day force
      if ( trunkDayElement.isLostForceRelation(pilarsAttr.brMonthElement)) {
        details += "<li> Day trunk element is weakened by month branche element </li>";
        tempElement = trunkDayElement.getPrevProductiveElement();
        details += PivotHelper.addEligibleDeityElement(pivotRelationSet,tempElement,trunkDayEer,'Enforce weak day force');
      }
    }
    //Ref8p129()
    // Assume that KimHthan conditions already fit when KimThan evaluated
    //
    if (
      BaziHelper.existsecDeity(
        pilarsAttr.secondaryDeityPilars,
        SecondaryDeity.KIMTHAN
      )
    ) {
      details =
        "<li>Found deity " +
        SecondaryDeity.KIMTHAN +
        "Pivot element must be Fire if Found</li>";
      // Pivot must be first on Fire Yang pilar
      currAddedeer = PivotHelper.addElligiblePivotEER(
        lunar,
        ElementNEnergy.FIREYANG,
        pivotRelationSet
      );
      if ( currAddedeer.length>0 ) {
        details += "<li>Add "+ currAddedeer+" in the elligible pivot deities list</li>"
      }
      if (pivotRelationSet.length === 0) {
        // Other wise Pivot must be on Fire Yin pilar
        currAddedeer = PivotHelper.addElligiblePivotEER(
          lunar,
          ElementNEnergy.FIREYIN,
          pivotRelationSet
        );
        if ( currAddedeer.length>0 ) {
          details += "<li>Add "+ currAddedeer+" in the elligible pivot deities list</li>"
        }
      }
    }

      // Check if there is an element force null
      const drirCount = pilarsAttr.getPairedRelationCount(
        ElementNEnergyRelation.DR,
        LunarBase.DINDEX
      );

      let favorableDayPilar = false;

      if (!qiTypeData.isHostile(QiType.DAYSTATUS)) {
        details += "<li>Non Hostile Day Trunk status</li>";
        favorableDayPilar = true;
      }

      if (pilarsAttr.isFavorableElement(trunkDayElement)) {
        details += "<li>Favorable Day Element " + trunkDayElement + " </li>";
        favorableDayPilar = true;
        tempElement = trunkDayElement.getPrevControlElement();
        const header = "Use control " + tempElement + " deities element";
        details += PivotHelper.addEligibleDeityElement(pivotRelationSet,tempElement,trunkDayEer,header);
      }
      if (favorableDayPilar) {
        if (drirCount > FAVORABLE_LIMIT) {
          // Ref8 p484 case 1
          details += PivotHelper.addPairedIfNotPresent(
            pivotRelationSet,
            ElementNEnergyRelation.DW,
            "Lot of " + drirCount + " DR, IR deities support. Add DW,IW to reduce force"
            );
        } else {
          const do7kCount = pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.DO,
            LunarBase.DINDEX
          );
          const dwiwCount = pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.DW,
            LunarBase.DINDEX
          );
          const rwfCount =
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.RW,
            LunarBase.DINDEX
          )  ;
          const hoegCount =
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.RW,
            LunarBase.DINDEX
          )  ;
          const isDayStatusStrong = qiTypeData.hasStrongForce(QiType.DAYSTATUS);
          if ( isDayStatusStrong   ) {
            const prefix="Too Strong Day Status";
            if ( drirCount!==0 && dwiwCount===0 ) {
              // Ref8 p484-485 case 2
                details +=PivotHelper.addPairedIfNotPresent(
                  pivotRelationSet,
                  ElementNEnergyRelation.HO,
                  prefix+"Add HO or EG deities to control day pilar force");
            } else {
              if ( rwfCount>2 ) {
                // Ref8 p484-485 case 4
                details +=PivotHelper.addPairedIfNotPresent(
                  pivotRelationSet,
                  ElementNEnergyRelation.HO,
                  prefix+". Lot of RW, F. Try to use HO or EG deities to reduce force"
                  );
              } else {
                if ( do7kCount===0 && hoegCount===0 ) {
                  // Ref8 p484-485 case 6
                  details +=PivotHelper.addPairedIfNotPresent(
                    pivotRelationSet,
                    ElementNEnergyRelation.DW,
                    prefix+"Add DW, IW to reduce force");
                }
              }
            }
          } else {
            if ( qiTypeData.isFavorable(QiType.DAYSTATUS)) {
              const prefix="Strong Day Status";
              if ( drirCount!==0 && dwiwCount===0 ) {
                // Ref8 p484-485 case 3
                details +=PivotHelper.addPairedIfNotPresent(
                  pivotRelationSet,
                  ElementNEnergyRelation.DO,
                  prefix+"Add DO, 7K to reduce force");
              } else {
                if ( rwfCount>2 ) {
                    // Ref8 p484-485 case 5
                    details +=PivotHelper.addPairedIfNotPresent(
                            pivotRelationSet,
                            ElementNEnergyRelation.DO,
                            prefix+".Lot of RW, F. Add DO, 7K to reduce force");
                } else {
                  if ( do7kCount===0 && hoegCount===0 ) {
                    // Ref8 p484-485 case 6
                    details +=PivotHelper.addPairedIfNotPresent(
                      pivotRelationSet,
                      ElementNEnergyRelation.DO,prefix+". Add DO, 7K to reduce force");
                  }
                }
              }
          } else {
            const prefix="Weak Day Status";
            if ( do7kCount>2 ) {
                // Ref8 p482 case 1
                details +=PivotHelper.addPairedIfNotPresent(
                      pivotRelationSet,
                      ElementNEnergyRelation.DR,prefix+". Lot of DO, 7K. Add DR, IR to enforce");
            }
            if ( hoegCount>2 ) {
              // Ref8 p482 case 2
              details +=PivotHelper.addPairedIfNotPresent(
                    pivotRelationSet,
                    ElementNEnergyRelation.DR,prefix+". Lot of HO EG. Add DR, IR to enforce");
            }
            if ( dwiwCount>2 ) {
              // Ref8 p483 case 1
              details +=PivotHelper.addPairedIfNotPresent(
                    pivotRelationSet,
                    ElementNEnergyRelation.RW,prefix+". Lot of DW IW. Add RW, F to enforce");
            }
          }
        }
        }
      } else {
        details += "<li>Weak Day Trunk</li>";
        const restrictCaseCount =
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.DR,
            LunarBase.DINDEX
          ) +
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.DO,
            LunarBase.DINDEX
          ) +
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.DW,
            LunarBase.DINDEX
          );
        const RESTRICT_LIMIT = FAVORABLE_LIMIT;
        if (restrictCaseCount > RESTRICT_LIMIT) {
          details += "<li>Lot of " + restrictCaseCount + " dominate deities </li>";
          if (drirCount > 0) {
            // Ref3 p99 Cas 1 p182
            details += "<li>Try to use DR, IR to reduce lost forces </li>";
            details +=PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.DR);
          } else {
            // Ref3 p99 Cas 2
            details += "<li>Try to use RW, F to reduce lost forces </li>";
            details += PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.RW);
          }
        } else {
          //
          details += "<li>Not too many " + restrictCaseCount + " dominate deities</li>";
          details +=PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.DR);
        }
      }
    return new DataWithLog(pivotRelationSet, details);
  }

  static getElligiblePivotAttr(lunar: Lunar) {
    const elligiblePivotEERData = PivotHelper.findElligiblePivotRelation(lunar);

    let elligiblePivotAttr = PivotHelper.evalPivotForce(
      lunar,
      LunarBase.MINDEX, // Find first for support pilar
      elligiblePivotEERData
    );

    if (elligiblePivotAttr.matchCount === 0) {
      elligiblePivotAttr = PivotHelper.evalPivotForce(
        lunar,
        LunarBase.HINDEX, // Find second for support pilar
        elligiblePivotEERData
      );
    }
    if (elligiblePivotAttr.matchCount === 0) {
      elligiblePivotAttr = PivotHelper.evalPivotForce(
        lunar,
        LunarBase.YINDEX, // Find third for support pilar
        elligiblePivotEERData
      );
    }
    if (elligiblePivotAttr.matchCount === 0) {
      // Add if not exist in the pivot relation to find and search on Month pilar
      //  Add the element found in tab from ref 3 page 389
      const dayTrunk = lunar.getdTrunk();
      const trunks2Search = dayTrunk.getPivot(lunar.getmBranche());
      let details =
        "<li>Try to use pivot from trunk " + trunks2Search + " </li>";
      trunks2Search.forEach((trunkPivot) => {
        const ee = trunkPivot.elementNEnergy;
        details +=PivotHelper.addElligiblePivotEER(
          lunar, ee, elligiblePivotEERData.getValue()
        );
      });
      elligiblePivotEERData.detail +=
        details + "<li>try to use DW as the last chance</>";
      ObjectHelper.pushIfNotExist(
        elligiblePivotEERData.getValue(),
        ElementNEnergyRelation.DW
      );

      elligiblePivotAttr = PivotHelper.evalPivotForce(
        lunar,
        LunarBase.MINDEX,
        elligiblePivotEERData
      );
    }

    return elligiblePivotAttr;
  }
}
