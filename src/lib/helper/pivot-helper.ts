
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
        pilarsAttr.logMe(
          "currdiffDayForce " + currdiffDayForce
        );
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
          pilarsAttr.logMe(
            "currdiffDayForce " + currdiffDayForce
          );
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
    const qiTypeData = QiHelper.getLunarQiForce(lunar);
    const trunkDayEer = lunar.trunkArr[LunarBase.DINDEX].elementNEnergy;
    const trunkDayElement=trunkDayEer.element;
    let dayPilarForce = pilarsAttr.getDayForce();
    let details = "<li>Weak Day Trunk Force</li>";
    let currAddedeer="";
    let tempElement: Element ;
    if (pilarsAttr.isFavorable(dayPilarForce)) {
      details = "<li>Favorable Day Trunk Force</li>";
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
      const generatedCount = pilarsAttr.getPairedRelationCount(
        ElementNEnergyRelation.GC,
        LunarBase.DINDEX
      );

      let favorableDayPilar = false;
      pilarsAttr.logMe("qiTypeData",qiTypeData);

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
        if (generatedCount > FAVORABLE_LIMIT) {
          details += "<li>Lot of " + generatedCount + " DR, IR deities support.</li>";
          // Ref8 p484 case 1
          details += PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.RC);
        } else {
          let relationCount = pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.RC,
            LunarBase.DINDEX
          );
          const isDayStatusStrong = qiTypeData.hasStrongForce(QiType.DAYSTATUS);
          if (isDayStatusStrong && generatedCount > 0 && relationCount !== 0) {
            // Ref8 p484-485 case 3
            details +=
              "<li>Too Strong Trunk. Try to use DW or IW deities to control day pilar force</li>";
              details +=PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.RDC);
          } else {
            relationCount =
              pilarsAttr.getPairedRelationCount(
                ElementNEnergyRelation.EC,
                LunarBase.DINDEX
              ) ;
            if (relationCount > 2) {
              details +=
                "<li>Lot of " + relationCount + " deities RW, F supports.</li>";
              if (isDayStatusStrong) {
                // Ref8 p484-485 case 3, case 5
                details +=
                  "<li>Too Strong Trunk. Try to use deities DW or IW to control this strong force</li>";
                details += PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.RDC);

              } else {
                // Ref8 p484-485 case 4 case 2
                details += "<li>Try to use deities DR or IR to reduce day force</li>";
                details += PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.GC);
              }
            } else {
              details +=
                "<li>Only (" + relationCount + ") support from deities RW, F</li>";
              // Ref8 p484-485 case 6
              details +=PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.RC,"Add DO, 7K to reduce lost force");
            }
          }
        }
      } else {
        details += "<li>Weak Day Trunk</li>";
        const restrictCaseCount =
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.GC,
            LunarBase.DINDEX
          ) +
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.RC,
            LunarBase.DINDEX
          ) +
          pilarsAttr.getPairedRelationCount(
            ElementNEnergyRelation.RDC,
            LunarBase.DINDEX
          );
        const RESTRICT_LIMIT = FAVORABLE_LIMIT;
        if (restrictCaseCount > RESTRICT_LIMIT) {
          details += "<li>Lot of " + restrictCaseCount + " dominate deities </li>";
          if (generatedCount > 0) {
            // Ref3 p99 Cas 1 p182
            details += "<li>Try to use DR, IR to reduce lost forces </li>";
            details +=PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.GC);
          } else {
            // Ref3 p99 Cas 2
            details += "<li>Try to use RW, F to reduce lost forces </li>";
            details += PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.EC);
          }
        } else {
          //
          details += "<li>Not too many " + restrictCaseCount + " dominate deities</li>";
          details +=PivotHelper.addPairedIfNotPresent(pivotRelationSet, ElementNEnergyRelation.GC);
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
        ElementNEnergyRelation.RDC
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
