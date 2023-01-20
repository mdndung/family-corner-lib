/* eslint-disable @typescript-eslint/prefer-for-of */

import { BaziHelper } from "../../helper/baziHelper";
import { BrancheHelper } from "../../helper/brancheHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { Element } from "../feng-shui/element";

import { ElementNEnergy } from "../feng-shui/elementNenergy";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { DataWithLog } from "../qi/dataWithLog";
import { Branche } from "./branche";
import { BrancheRelation } from "./brancheRelation";
import { Lunar } from "./lunar";
import { LunarBase } from "./lunarBase";
import { CombAttr, CombinationList } from "./combinationList";
import { Trunk } from "./trunk";
import { CombListHelper } from "../../helper/combListHelper";
import { Console } from "console";

export class PilarsAttr {
  lunar: Lunar;
  trunkEE?: DataWithLog[] = null;
  brancheEE?: DataWithLog[] = null;
  trunkForceArr?: DataWithLog[] = null;
  brancheForceArr?: DataWithLog[] = null;
  hiddenTrunkForceArr?: DataWithLog[][] = null;

  brMonthElement?: Element = null;
  eerCount: number[] = null;
  maxEerCount = 0;

  trunkRelation: ElementNEnergyRelation[][] = null;
  brancheRelation: ElementNEnergyRelation[][] = null;
  brancheTrunkRelation: ElementNEnergyRelation[][] = null;
  dayHiddenRelation: ElementNEnergyRelation[][] = null;

  elementNEnergyForce: DataWithLog[] = null;
  elementForce: number[] = null;
  majorElement: Element = null;
  sumElementForce: number = null;
  averageElementForce: number = null;
  majorElementForce: number = null;

  selectPivotEE: ElementNEnergy;
  combList: CombinationList;

  constructor(lunar: Lunar) {
    lunar.pilarsAttr = this;
    this.lunar = lunar;
    this.initEE(lunar);
    this.evalPilarRelation(lunar);
    this.initEERCounters(lunar);
  }

  getHiddenTrunkName(branche: Branche, trunk: Trunk, element: Element) {
    return branche + " Hidden trunk " + trunk + " " + element;
  }

  getEEName(element: ElementNEnergy, trElement: ElementNEnergy) {
    if (element === trElement) return element.toString();
    return element + "==>" + trElement;
  }

  getBrSrc(pilarIdx: number, withTransformation?: boolean) {
    if ( typeof withTransformation=== 'undefined' ) withTransformation = true ;
    const element = this.lunar.brancheArr[pilarIdx].elementNEnergy;
    let trElement = element;
    if ( withTransformation ) {
      trElement = this.brancheEE[pilarIdx].getValue();
    }
    return (
      DataWithLog.getBrancheHeader(pilarIdx) +
      this.lunar.brancheArr[pilarIdx] +
      " " +
      this.getEEName(element, trElement) +
      " "
    );
  }

  getTrSrc(pilarIdx: number, withTransformation?: boolean) {
    if ( typeof withTransformation=== 'undefined' ) withTransformation = true ;
    const element = this.lunar.trunkArr[pilarIdx].elementNEnergy;
    let trElement = element;
    if ( withTransformation ) {
      trElement = this.trunkEE[pilarIdx].getValue();
    }
    return (
      DataWithLog.getTrunkHeader(pilarIdx) +
      this.lunar.trunkArr[pilarIdx] +
      " " +
      this.getEEName(element, trElement) +
      " "
    );
  }

  logMe(message1: any, message2?: any) {
    if (CombListHelper.logMe) {
      console.log(message1, message2);
    }
  }
  log() {
    //console.log(this.elementNEnergyForce);
    //console.log(this.trunkForceArr);
    //console.log(this.brancheForceArr);
  }

  static getTransformable(trunk1: Trunk, trunk2: Trunk, checkELement: Element) {
    if (TrunkHelper.isTransformable(trunk1, trunk2)) {
      if (TrunkHelper.getTransformElement(trunk1) === checkELement) {
        return checkELement;
      }
    }
    return null;
  }

  avoidZeroForce(dataForce: DataWithLog, header: string) {
    if (dataForce.getValue() < 0) {
      dataForce.addValue(
        -dataForce.getValue(),
        header + "avoid negative force"
      );
    }
  }

  getCurrLog() {
    return "<ol>" + DataWithLog.currLog.getDetail() + "</ol>";
  }

  evalTrunkEEArr(lunar: Lunar) {
    this.trunkEE = [];
    const trunkArr = lunar.trunkArr;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const currTrunk = trunkArr[pilarIdx];
      const trunkElement = currTrunk.elementNEnergy;
      let resElement = new DataWithLog(trunkElement, "Trunk pilar element");
      const combAttr = this.combList.getCombTypeAttrList(
        CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
        pilarIdx
      );
      if (combAttr.length > 0) {
        //Ref3 p336 cas 1 to 6
        resElement.updateValue(
          ElementNEnergy.getElementNEnergy(
            combAttr[0].resultData,
            trunkElement.getEnergy()
          ),
          "Combination of 5"
        );
      }
      this.trunkEE.push(resElement);
    }
  }

  // Check the presence of element checkElement in trunk, including transformed trunk element
  isBrancheELementInTrunk(lunar: Lunar, checkElement: Element) {
    DataWithLog.resetCurrLog();
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (this.trunkEE[pilarIdx].getValue().getElement() === checkElement) {
        DataWithLog.setCurrLog(
          "",
          this.getTrSrc(pilarIdx) + "same transformed element " + checkElement
        );
        return true;
      }
    }
    // Case Ref3pp370Ex4. Extent to orginal element
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (lunar.trunkArr[pilarIdx].getElement() === checkElement) {
        DataWithLog.setCurrLog(
          "",
          this.getTrSrc(pilarIdx) + "same element " + checkElement
        );
        return true;
      }
    }
    return false;
  }

  evalBrancheEEArr(lunar: Lunar) {
    this.brancheEE = DataWithLog.newDataArray(LunarBase.PILARS_LEN, null);
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      this.brancheEE[pilarIdx] = this.evalBrancheEEIdx(lunar, pilarIdx);
    }
  }


  isRootSupported(lunar: Lunar, pilarIdx: number): boolean {
    if (pilarIdx >= LunarBase.LINDEX) return false;
    return this.combList.existTrunkRelationType(
      CombAttr.TRUNKISSUPPORTEDTYPE1,
      pilarIdx
    );
  }

  evalTrunkForce(lunar: Lunar) {
    const trunkPilarElement = this.trunkEE;
    const branchePilarElement = this.brancheEE;
    const pilarForce: DataWithLog[] = DataWithLog.newDataArray(
      LunarBase.PILARS_LEN
    );
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const trunkElement = trunkPilarElement[pilarIdx].getValue().getElement();
      const brancheElement = branchePilarElement[pilarIdx]
        .getValue()
        .getElement();
      let trunkName = this.getTrSrc(pilarIdx,false);
      const brancheName = this.getBrSrc(pilarIdx);
      pilarForce[pilarIdx].setValue(
        36,
        trunkName + "initial force ( 360 / (10 Trunks) "
      );
      trunkName = this.getTrSrc(pilarIdx);
      const trElement = TrunkHelper.getTransformElement(
        lunar.trunkArr[pilarIdx]
      );
      // Find comb5 with transform
      let combAttr = this.combList.getCombTypeAttrList(
        CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
        pilarIdx,
        trElement
      );
      let count = combAttr.length;
      const isRootSupported = this.combList.existTrunkRelationType(
        CombAttr.TRUNKISSUPPORTEDTYPE1,
        pilarIdx
      );
      if (count > 0) {
        // Comb5 case. Ref3p332 cas 2
        let otherPilarIdx = combAttr[0].trunkAttrs[0];
        if (otherPilarIdx === pilarIdx)
          otherPilarIdx = combAttr[0].trunkAttrs[1];
        if (
          isRootSupported ||
          this.combList.existTrunkRelationType(
            CombAttr.TRUNKISSUPPORTEDTYPE1,
            otherPilarIdx
          )
        ) {
          if (count === 1) {
            // Comb5 with transformation
            // Ref3p332 case 2
            pilarForce[pilarIdx].addValue(
              -6,
              trunkName + "unique combination of 5 with transformation"
            );
          } else {
            // Concurrence comb5
            pilarForce[pilarIdx].addValue(
              -12,
              trunkName + " multiple combination of 5 with transformation"
            );
          }
        } else {
          // Both comb5 pilar is not supported
          // Ref3 p339
          // Not a comb5 case
        }
      } else {
        if (!isRootSupported) {
          pilarForce[pilarIdx].addValue(
            -27,
            trunkName + "No root support (3/4 of 36) "
          );
        }
        // Ref3p340-p341
        if (trunkElement.isProductive(brancheElement)) {
          pilarForce[pilarIdx].addValue(
            -6,
            trunkName + " products  " + brancheName
          );
        }
        if (brancheElement.isDestructive(trunkElement)) {
          pilarForce[pilarIdx].addValue(
            -18,
            trunkName + " is controlled by " + brancheName
          );
        }
        if (trunkElement.isDestructive(brancheElement)) {
          pilarForce[pilarIdx].addValue(
            -12,
            trunkName + " controls  " + brancheName
          );
        }
      }
    }
    // Check clash
    for (let pilarIdx1 = 0; pilarIdx1 < LunarBase.LINDEX; pilarIdx1++) {
      const checkElement = trunkPilarElement[pilarIdx1].getValue().getElement();
      const pilarName = this.getTrSrc(pilarIdx1);
      let lostForce = 0;
      let details = "";
      for (let pilarIdx2 = 0; pilarIdx2 < LunarBase.LINDEX; pilarIdx2++) {
        if (pilarIdx1 !== pilarIdx2) {
          if (Math.abs(pilarIdx2 - pilarIdx1) <= 2) {
            if (pilarForce[pilarIdx2].getValue() !== 0) {
              const otherElement = trunkPilarElement[pilarIdx2]
                .getValue()
                .getElement();
              const isControlled = otherElement.isDestructive(checkElement);
              if (isControlled) {
                // Ref3p340
                let currLostForce = -12;
                if (Math.abs(pilarIdx2 - pilarIdx1) > 1) {
                  currLostForce = -6;
                }
                // Take the greatest lost
                if (currLostForce < lostForce) {
                  lostForce = currLostForce;
                  details = this.getTrSrc(pilarIdx2);
                }
              }
            }
          }
        }
      }
      if (lostForce < 0) {
        pilarForce[pilarIdx1].addValue(
          lostForce,
          pilarName + " is controlled by " + details
        );
      }
      this.avoidZeroForce(pilarForce[pilarIdx1], pilarName);
    }
    this.trunkForceArr = pilarForce;
  }

  // Ref3p342-343
  getPrincipalForce(branche: Branche) {
    const hiddenTrunkNb = BrancheHelper.getHiddenTrunk(branche).length;
    let points = 0;
    // Ref3p342-343
    if (hiddenTrunkNb === 1) {
      points = 30;
    } else if (hiddenTrunkNb === 2) {
      points = 21;
    } else {
      points = 18;
    }
    return points;
  }

  // Ref3p342-343
  getMiddleForce(branche: Branche) {
    const hiddenTrunkNb = BrancheHelper.getHiddenTrunk(branche).length;
    let points = 0;
    // Ref3p342-343
    if (hiddenTrunkNb === 1) {
      points = 0;
    } else {
      points = 9;
    }
    return points;
  }

  setOnlyPrincipalForce(pilarIdx: number, detail?: string) {
    const force = this.getMainHiddenForceData(pilarIdx).getValue();
    if (typeof detail === "undefined") {
      detail = "";
    } else {
      detail = "<ol>" + detail + "</ol>";
    }
    const pilarName = this.getBrSrc(pilarIdx);
    let currIdx = 0;
    this.hiddenTrunkForceArr[currIdx][pilarIdx] = new DataWithLog(
      force,
      pilarName +
        "No Transformation. Use only main hidden element force. " +
        detail
    );
    currIdx++;
    this.hiddenTrunkForceArr[currIdx][pilarIdx] = new DataWithLog(
      0,
      pilarName +
        "No Transformation. Do not use middle hidden element force. " +
        detail
    );
    currIdx++;
    this.hiddenTrunkForceArr[currIdx][pilarIdx] = new DataWithLog(
      0,
      pilarName +
        "No Transformation.  Do not use excess hidden element force. " +
        detail
    );
  }

  getMainHiddenForceData(pilarIdx: number) {
    const dataLog = this.hiddenTrunkForceArr[0][pilarIdx];
    return new DataWithLog(
      dataLog.getValue(),
      this.getBrSrc(pilarIdx) + " main Hidden Force "
    );
  }

  initHiddenTrunkForce(lunar: Lunar) {
    const brancheArr = lunar.brancheArr;
    // Distribution in hidden trunk. See Ref3p342, Ref3p5p9
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const currBranche = brancheArr[pilarIdx];
      const brancheElement = currBranche.getElement();
      const sourceName = this.getBrSrc(pilarIdx);
      const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(brancheArr[pilarIdx]);
      const hLen = hiddenTrunkArr.length;
      for (let i = 0; i < hLen; i++) {
        this.hiddenTrunkForceArr[i][pilarIdx] = new DataWithLog();
        const detail = sourceName + " Hidden Trunk " + hiddenTrunkArr[i];
        if (hiddenTrunkArr[i].getElement() === brancheElement) {
          this.hiddenTrunkForceArr[i][pilarIdx].setValue(
            this.getPrincipalForce(currBranche),
            detail + " main force"
          );
        } else {
          if (i === 1) {
            this.hiddenTrunkForceArr[i][pilarIdx].setValue(
              this.getMiddleForce(currBranche),
              detail + " middle force "
            );
          } else {
            this.hiddenTrunkForceArr[i][pilarIdx].setValue(
              3,
              detail + "  excess force"
            );
          }
        }
      }
    }
  }


  evalBrancheEEIdx(lunar: Lunar, pilarIdx: number) {
    const currBranche = lunar.brancheArr[pilarIdx];
    const brancheElement = currBranche.getElement();
    let resData = new DataWithLog(brancheElement, "Initial Branche element");
    const combAttrs = this.getCombAttrList(lunar, pilarIdx);
    // Ref3p343 check transform possibility
    if (combAttrs.length > 0) {
      let trElement = combAttrs[0].resultData;
      // Ref3p343 notice
      if (!this.isBrancheELementInTrunk(lunar, trElement)) {
        resData.updateValue(
          brancheElement,
          " incompatible kind with any trunk element's kind "
        );
      } else {
        resData.updateValue(trElement, combAttrs[0].detail + " transformed element ");
      }
    }

    return new DataWithLog(
      ElementNEnergy.getElementNEnergy(
        resData.getValue(),
        currBranche.getEnergy()
      ),
      resData.getDetail()
    );
  }


  getCombAttrList(lunar: Lunar, pilarIdx: number) {
    let foundCombAttr = this.combList.getCombTypeAttrList(
      CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE,
      pilarIdx
    );
    if (foundCombAttr.length<= 0) {
      foundCombAttr = this.combList.getCombTypeAttrList(
        CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE,
        pilarIdx
      );
      if (foundCombAttr.length <= 0) {
        foundCombAttr = this.combList.getCombTypeAttrList(
          CombAttr.MIDBRANCHECOMB3TRANSFORMABLETYPE,
          pilarIdx
        );
        if (foundCombAttr.length <= 0) {
          foundCombAttr = this.combList.getCombTypeAttrList(
            CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE,
            pilarIdx
          );
          if (foundCombAttr.length > 0) {
            // Ref3p344
            if (CombListHelper.hasMultipleComb6(lunar, pilarIdx)) {
              foundCombAttr = [];
            }
          }
        }
      }
    }
    return foundCombAttr;
  }

  getRawBranchePoint(lunar: Lunar, pilarIdx:number) {
    let usePrincipalHiddenForce = false;
    let usePrincipaleHiddenForceReason='';
    let sourceName = this.getBrSrc(pilarIdx,false);
    let combAttrList = lunar.pilarsAttr.combList.getCombTypeAttrList(CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE,pilarIdx);
    const maxBranchValue = 30;
    let points = new DataWithLog(
      maxBranchValue,
      sourceName + " Initial Force ( 360/(12 branches) )"
    );
    sourceName = this.getBrSrc(pilarIdx);

    if (combAttrList.length>0) {
      // Ref3p342
      points.addData(-6, "Same season combination: ");
    } else {
       combAttrList = lunar.pilarsAttr.combList.getCombTypeAttrList(CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE,pilarIdx);
       if (combAttrList.length>0) {
          // Ref3p342
          points.addValue(
            -10,
            sourceName + ": Combination of 3 (San He)",
            this.getCurrLog()
          );
       } else {
        combAttrList = lunar.pilarsAttr.combList.getCombTypeAttrList(CombAttr.MIDBRANCHECOMB3TRANSFORMABLETYPE,pilarIdx);
        if (combAttrList.length>0) {
          points.addValue(
            -10,
            sourceName + ": Partial Combination of 3 (San He)"
          );
        } else {
          combAttrList = lunar.pilarsAttr.combList.getCombTypeAttrList(CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE,pilarIdx);
          if (combAttrList.length>0) {
               // Ref3p343, Ref3p344
              if (CombListHelper.hasMultipleComb6(lunar, pilarIdx)) {
                // Ref3p344
                combAttrList = [];
                usePrincipalHiddenForce = true ;
                usePrincipaleHiddenForceReason=" Concurence combinations detected ";
              } else {
                points.updateValue(18, "Unique combination of 2");
              }
          }
        }
      }
    }

    // Ref3p343 check transform possibility
    // Ref3p343 Notice
    if (combAttrList.length>0) {
      // Ref3p343, p344 + Ref3p351
      const trElement=combAttrList[0].resultData;
      if (this.isBrancheELementInTrunk(lunar, trElement)) {
        // Keep current combined element and points
        points.addValue(
          0,
          sourceName + " Transformed element " + trElement +" is present in trunks "
        );
      } else {
        usePrincipalHiddenForce=true;
        usePrincipaleHiddenForceReason= " Transformed element " + trElement +" not found in trunks "
      }
    } else {
      if (lunar.pilarsAttr.combList.existBrancheRelationType(CombAttr.MIDBRANCHECOMB3TYPE,pilarIdx)) {
        usePrincipalHiddenForce=true;
        usePrincipaleHiddenForceReason=" Non transformed mid combination of 3 ";
      }
    }

    if ( usePrincipalHiddenForce ) {
      const hiddenLog = this.getMainHiddenForceData(pilarIdx);
      this.setOnlyPrincipalForce(pilarIdx);
      points.updateValue(
        hiddenLog.getValue(),
        sourceName +usePrincipaleHiddenForceReason,
        hiddenLog.getDetail()
      );
    }
    this.avoidZeroForce(points, sourceName);
    return points;
  }

  setBranchePoints(lunar: Lunar, pilarIdx: number) {
    const brancheArr = lunar.brancheArr;
    const trunkArr = lunar.trunkArr;
    const trunkElements = this.trunkEE;
    const currTrunk = trunkArr[pilarIdx];
    const currBranche = brancheArr[pilarIdx];
    const brancheElement = currBranche.getElement();


    let points = this.getRawBranchePoint(lunar,pilarIdx);
    const sourceName = this.getBrSrc(pilarIdx);

    // Ref3p341, 342
    if (this.trunkForceArr[pilarIdx].getValue() >= 18) {
      const mainHiddenData =  this.hiddenTrunkForceArr[0][pilarIdx];
      const trunkResultElement = trunkElements[pilarIdx].getValue().getElement();
      if (
        BaziHelper.getRelation(trunkResultElement, brancheElement).isFavorable()
      ) {
        mainHiddenData.addData(6, "Has trunk force>18");
      } else if (trunkResultElement.isDestructive(brancheElement)) {
        mainHiddenData.addData(
          -8,
          "Branch " +
            currBranche +
            " element" +
            brancheElement +
            " controlled by trunk " +
            currTrunk +
            " element " +
            trunkResultElement
        );
      }
    }
    // Ref3p344 Clash
    if (CombListHelper.hasClashRelation(lunar, pilarIdx)) {
      const monthElement = brancheArr[LunarBase.MINDEX].getElement();
      if (monthElement != Element.EARTH) {
        // Ref3p345: Update if month element not dragon, ox, dog, goat which are earth
        let force = Math.trunc(points.value / 3);
        points.updateValue(force, " Clash ");
        this.setOnlyPrincipalForce(pilarIdx, " Clash ");
      }
    }

    this.avoidZeroForce(points, sourceName);
    this.brancheForceArr[pilarIdx] = points;
  }

  evalBrancheForce(lunar: Lunar) {
    this.hiddenTrunkForceArr = ObjectHelper.newMatrix(3, 3, null);
    this.brancheForceArr = ObjectHelper.newArray(LunarBase.LINDEX, null);
    this.initHiddenTrunkForce(lunar);
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      this.setBranchePoints(lunar, pilarIdx);
    }
    // Update influence of month branch element on trunk's element
    // Ref3p346

    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      // Trunk part
      let checkElement = this.trunkEE[pilarIdx].getValue().getElement();
      let checkName = this.getTrSrc(pilarIdx);
      let checkForceAttr = this.trunkForceArr[pilarIdx];
      this.propagateMonthBrancheElementForce(
        checkElement,
        checkName,
        checkForceAttr
      );

      checkElement = this.brancheEE[pilarIdx].getValue().getElement();
      checkName = this.getBrSrc(pilarIdx);
      checkForceAttr = this.brancheForceArr[pilarIdx];
      this.propagateMonthBrancheElementForce(
        checkElement,
        checkName,
        checkForceAttr
      );

      const branche = this.lunar.brancheArr[pilarIdx];
      const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(branche);
      for (let i = 0; i < hiddenTrunkArr.length; i++) {
        checkElement = hiddenTrunkArr[i].getElement();
        checkName = this.getHiddenTrunkName(
          branche,
          hiddenTrunkArr[i],
          hiddenTrunkArr[i].getElement()
        );
        checkForceAttr = this.hiddenTrunkForceArr[i][pilarIdx];
        this.propagateMonthBrancheElementForce(
          checkElement,
          checkName,
          checkForceAttr
        );
      }
    }
  }

  propagateMonthBrancheElementForce(
    checkElement: Element,
    checkHeader: string,
    checkForceAttr: DataWithLog
  ) {
    const checkForce = checkForceAttr.getValue();
    if (checkForce !== 0) {
      if (this.brancheForceArr[LunarBase.MINDEX].getValue() === 0) return;
      const mElement = this.brMonthElement;
      if (mElement === checkElement) {
        const addForce = Math.trunc(checkForce / 5);
        const monthName = "Branche Month Element " + mElement;
        checkForceAttr.addData(
          addForce,
          checkHeader + " has same element as " + monthName
        );
      }
      if (mElement.isDestructive(checkElement)) {
        const lostForce = -Math.trunc(checkForce / 5);
        const monthName = this.getBrSrc(LunarBase.MINDEX);
        checkForceAttr.addData(
          lostForce,
          checkHeader + " is controlled by " + monthName
        );
      }
    }
  }

  evalElementNEnergyForce(lunar: Lunar) {
    const len = ElementNEnergy.getValues().length;
    const brancheArr = lunar.brancheArr;
    this.elementNEnergyForce = DataWithLog.newDataArray(len);
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      // Trunc element's force
      let ee = this.trunkEE[pilarIdx].getValue();
      this.elementNEnergyForce[ee.ordinal()].addData(
        this.trunkForceArr[pilarIdx],
        this.getTrSrc(pilarIdx)
      );

      const comb5List = this.getCombAttrList(lunar, pilarIdx);
      if (comb5List.length > 0) {
        // Use branche Force when there is combination with transform
        ee = comb5List[0].resultData;
        this.elementNEnergyForce[ee.ordinal()].addData(
          this.brancheForceArr[pilarIdx],
          this.getBrSrc(pilarIdx)
        );
      } else {
        // Use hidden trunk force
        const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(
          brancheArr[pilarIdx]
        );
        const hLen = hiddenTrunkArr.length;
        // The main hidden trunk is the same as the transformed branche element
        this.elementNEnergyForce[
          hiddenTrunkArr[0].elementNEnergy.ordinal()
        ].addData(
          this.hiddenTrunkForceArr[0][pilarIdx],
          this.getBrSrc(pilarIdx) + " 's Main Hidden Trunk " + hiddenTrunkArr[0]
        );
        for (let i = 1; i < hLen; i++) {
          this.elementNEnergyForce[
            hiddenTrunkArr[i].elementNEnergy.ordinal()
          ].addData(
            this.hiddenTrunkForceArr[i][pilarIdx].getValue(),
            this.getBrSrc(pilarIdx) +
              " 's non Main Hidden Trunk " +
              hiddenTrunkArr[i]
          );
        }
      }
    }
  }

  initMajorElement(lunar: Lunar) {
    this.evalElementNEnergyForce(lunar);
    this.elementForce = [0, 0, 0, 0, 0];
    for (let idx = 0; idx < this.elementNEnergyForce.length; idx++) {
      const ee = ElementNEnergy.WATERYANG.getEnum(idx) as ElementNEnergy;
      this.elementForce[ee.element.ordinal()] +=
        this.elementNEnergyForce[idx].getValue();
    }
    // initMajorElementForce();
    this.sumElementForce = 0;
    this.majorElement = null;
    const elementValues = Element.getValues();
    elementValues.forEach((element) => {
      this.sumElementForce += this.elementForce[element.ordinal()];
    });

    this.majorElementForce = 0;

    elementValues.forEach((element) => {
      if (
        (100 * this.elementForce[element.ordinal()]) / this.sumElementForce >
        this.majorElementForce
      ) {
        this.majorElementForce =
          (100 * this.elementForce[element.ordinal()]) / this.sumElementForce;
        this.majorElement = element as Element;
      }
    });

    this.averageElementForce = this.sumElementForce / 5;
  }

  evalPilarRelation(lunar: Lunar) {
    const MAX_LEN = LunarBase.PILARS_LEN;
    const brancheArr = lunar.brancheArr;

    this.dayHiddenRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.trunkRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.brancheRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.brancheTrunkRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    const brancheBrRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);

    for (let pilarCol = 0; pilarCol < MAX_LEN; pilarCol++) {
      for (let j = 0; j < MAX_LEN; j++) {
        // j-->pilarCol: The transformed result effect is on the source
        this.trunkRelation[j][pilarCol] = BaziHelper.getEnNRelation(
          this.trunkEE[j].getValue(),
          this.trunkEE[pilarCol].getValue()
        );
      }
    }

    const dayTrunk = lunar.getdTrunk();
    for (let pilarCol = 0; pilarCol < MAX_LEN; pilarCol++) {
      const toBranche = brancheArr[pilarCol];
      for (let j = 0; j < MAX_LEN; j++) {
        const fromBranche = brancheArr[j];
        // Use the transformed result if fitted
        this.brancheRelation[j][pilarCol] = BaziHelper.getEnNRelation(
          this.brancheEE[j].getValue(),
          this.brancheEE[pilarCol].getValue()
        );
        this.brancheTrunkRelation[j][pilarCol] = BaziHelper.getEnNRelation(
          this.brancheEE[j].getValue(),
          this.trunkEE[pilarCol].getValue()
        );
        brancheBrRelation[j][pilarCol] = BrancheHelper.getUniqueRelation(
          fromBranche,
          toBranche
        );
      }
      const hiddenTrunk = BrancheHelper.getHiddenTrunk(toBranche);
      // The first hidden trunk has the same element as the branche
      // Use the trannsforned element to calculate the EER

      const ee = ElementNEnergy.getElementNEnergy(
        this.brancheEE[pilarCol].getValue().getElement(),
        hiddenTrunk[0].getEnergy()
      );
      this.dayHiddenRelation[pilarCol][0] = BaziHelper.getEnNRelation(
        ee,
        dayTrunk.elementNEnergy
      );
      for (let i = 1; i < hiddenTrunk.length; i++) {
        this.dayHiddenRelation[pilarCol][i] = TrunkHelper.getEERelation(
          hiddenTrunk[i],
          dayTrunk
        );
      }
    }

    this.initMajorElement(lunar);
  }

  initEERCounters(lunar: Lunar) {
    const eerLen = ElementNEnergyRelation.getValues().length;
    this.eerCount = [].fill(0, eerLen);
    this.maxEerCount = 0;
    // Case Trunk
    const trunkArr = lunar.trunkArr;
    let relation;
    const relationArr = this.trunkRelation;
    let element;
    for (let i = 0; i < LunarBase.LINDEX; i++) {
      // Exclude d index (same relation) and y index (too far)
      if (i !== LunarBase.DINDEX && i !== LunarBase.YINDEX) {
        // Use the new transformable element?
        element = PilarsAttr.getTransformable(
          trunkArr[i],
          trunkArr[LunarBase.DINDEX],
          this.brancheEE[LunarBase.MINDEX].getValue().getElement()
        );
        if (element != null) {
          const ene = ElementNEnergy.getElementNEnergy(
            element,
            trunkArr[i].getEnergy()
          );
          relation = BaziHelper.getEnNRelation(
            ene,
            trunkArr[LunarBase.DINDEX].elementNEnergy
          );
        } else {
          relation = relationArr[i][LunarBase.DINDEX];
        }
        this.eerCount[relation.ordinal()]++;
        this.maxEerCount++;
      }
    }
    const brancheArr = lunar.brancheArr;
    const dayTrunk = lunar.getdTrunk();
    for (let i = 0; i < LunarBase.PILARS_LEN; i++) {
      // Exclude y index (too far)
      if (i !== LunarBase.YINDEX) {
        const hTrunkArr = BrancheHelper.getHiddenTrunk(brancheArr[i]);
        for (let index = 0; index < hTrunkArr.length; index++) {
          element = hTrunkArr[index];
          relation = TrunkHelper.getEERelation(element, dayTrunk);
          this.eerCount[relation.ordinal()]++;
          this.maxEerCount++;
        }
      }
    }
  }

  initEE(lunar: Lunar) {
    // First pass for brMonthElement
    this.brMonthElement = lunar.brancheArr[LunarBase.MINDEX].getElement();
    CombListHelper.setupAllCombinations(lunar);
    this.evalTrunkEEArr(lunar);
    this.evalBrancheEEArr(lunar);

    // Second pass for brMonthElement
    this.brMonthElement = this.brancheEE[LunarBase.MINDEX]
      .getValue()
      .getElement();
    CombListHelper.setupAllCombinations(lunar);
    //Final pass
    this.evalTrunkEEArr(lunar);
    this.evalBrancheEEArr(lunar);
    this.evalTrunkForce(lunar);
    this.evalBrancheForce(lunar);
  }

  getGeneratedDeityCase() {
    return (
      this.eerCount[ElementNEnergyRelation.GE.ordinal()] +
      this.eerCount[ElementNEnergyRelation.GC.ordinal()]
    );
  }
}
