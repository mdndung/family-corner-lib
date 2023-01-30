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
import { Lunar } from "./lunar";
import { LunarBase } from "./lunarBase";
import { CombAttr, CombinationList } from "./combinationList";
import { Trunk } from "./trunk";
import { CombListHelper } from "../../helper/combListHelper";
import { QiForce } from "../qi/qi-force";
import { BaziStructureHelper } from "../../helper/bazi-structureHelper";


export class PilarsAttr {
  lunar: Lunar;
  trunkEE?: DataWithLog[] = null;
  brancheEE?: DataWithLog[] = null;
  trunkForceArr?: DataWithLog[] = null;
  brancheForceArr?: DataWithLog[] = null;
  hiddenTrunkForceArr?: DataWithLog[][] = null;
  rootPresent: boolean[] = null;
  brMonthElement?: Element = null;
  eerCount: number[] = null;
  maxEerCount = 0;

  trunkRelation: ElementNEnergyRelation[][] = null;
  brancheRelation: ElementNEnergyRelation[][] = null;
  brancheTrunkRelation: ElementNEnergyRelation[][] = null;
  dayHiddenRelation: ElementNEnergyRelation[][] = null;

  elementNEnergyForce: DataWithLog[] = null;
  elementForce: DataWithLog[] = null;
  majorElement: Element = null;
  sumElementForce: number = null;
  averageElementForce: number = null;
  majorElementForce: number = null;
  weakThreshHold: number = 0;
  favorableThreshHold: number = 0;
  combList: CombinationList;
  specialStructure: DataWithLog;
  structure: DataWithLog;

  constructor(lunar: Lunar) {
    lunar.pilarsAttr = this;
    this.lunar = lunar;


    this.initEE();
    this.evalRootPresent();
    this.evalPilarRelation();
    this.initEERCounters();
    this.initStructure();
  }

  getHiddenTrunkName(branche: Branche, trunk: Trunk, element: Element) {
    return branche + " Hidden trunk " + trunk + " " + element;
  }

  getEEName(element: ElementNEnergy, trElement: ElementNEnergy) {
    if (element === trElement) return element.toString();
    return element + "==>" + trElement;
  }

  getBrSrc(pilarIdx: number, withTransformation?: boolean) {
    if (typeof withTransformation === "undefined") withTransformation = true;
    const element = this.lunar.brancheArr[pilarIdx].elementNEnergy;
    let trElement = element;
    if (withTransformation) {
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
    if (typeof withTransformation === "undefined") withTransformation = true;
    const element = this.lunar.trunkArr[pilarIdx].elementNEnergy;
    let trElement = element;
    if (withTransformation) {
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
      if (typeof message2 === "undefined") message2 = '';
      console.log(message1, message2);
    }
  }

  log() {
    console.log(this.specialStructure);
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
      let trunkName = this.getTrSrc(pilarIdx, false);
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

  isElementInNonNullForceHiddenTrunk(pilarIdx: number, checkElement: Element) {
    const branche = this.lunar.brancheArr[pilarIdx];
    const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(branche);

    for (let i = 0; i < hiddenTrunkArr.length; i++) {
      const eeHtr = hiddenTrunkArr[i].getElement();
      if (eeHtr === checkElement) {
        const hiddenbrancheForce =
          this.hiddenTrunkForceArr[i][pilarIdx].getValue();
        if (hiddenbrancheForce > 0) return true;
      }
    }
    return false;
  }

  setOnlyPrincipalForce(pilarIdx: number, force: number, detail?: string) {
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
        detail
    );
    currIdx++;
    this.hiddenTrunkForceArr[currIdx][pilarIdx] = new DataWithLog(
      0,
      pilarName +
        detail
    );
    currIdx++;
    this.hiddenTrunkForceArr[currIdx][pilarIdx] = new DataWithLog(
      0,
      pilarName +
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
        resData.updateValue(
          trElement,
          combAttrs[0].detail + " transformed element "
        );
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
    if (foundCombAttr.length <= 0) {
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

  getRawBranchePoint(lunar: Lunar, pilarIdx: number) {
    let usePrincipalHiddenForce = false;
    let usePrincipaleHiddenForceReason = "";
    let sourceName = this.getBrSrc(pilarIdx, false);
    let combAttrList = lunar.pilarsAttr.combList.getCombTypeAttrList(
      CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE,
      pilarIdx
    );
    const maxBranchValue = 30;
    let points = new DataWithLog(
      maxBranchValue,
      sourceName + " Initial Force ( 360/(12 branches) )"
    );
    sourceName = this.getBrSrc(pilarIdx);

    if (combAttrList.length > 0) {
      // Ref3p342
      points.addData(-6, "Same season combination: ");
    } else {
      combAttrList = lunar.pilarsAttr.combList.getCombTypeAttrList(
        CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE,
        pilarIdx
      );
      if (combAttrList.length > 0) {
        // Ref3p342
        points.addValue(
          -10,
          sourceName + ": Combination of 3 (San He)",
          this.getCurrLog()
        );
      } else {
        combAttrList = lunar.pilarsAttr.combList.getCombTypeAttrList(
          CombAttr.MIDBRANCHECOMB3TRANSFORMABLETYPE,
          pilarIdx
        );
        if (combAttrList.length > 0) {
          points.addValue(
            -10,
            sourceName + ": Partial Combination of 3 (San He)"
          );
        } else {
          combAttrList = lunar.pilarsAttr.combList.getCombTypeAttrList(
            CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE,
            pilarIdx
          );
          if (combAttrList.length > 0) {
            // Ref3p343, Ref3p344
            if (CombListHelper.hasMultipleComb6(lunar, pilarIdx)) {
              // Ref3p344
              combAttrList = [];
              usePrincipalHiddenForce = true;
              usePrincipaleHiddenForceReason =
                " Concurence combinations detected ";
            } else {
              points.updateValue(18, "Unique combination of 2");
            }
          }
        }
      }
    }

    // Ref3p343 check transform possibility
    // Ref3p343 Notice
    if (combAttrList.length > 0) {
      // Ref3p343, p344 + Ref3p351
      const trElement = combAttrList[0].resultData;
      if (this.isBrancheELementInTrunk(lunar, trElement)) {
        // Keep current combined element and points
        points.addValue(
          0,
          sourceName +
            " Transformed element " +
            trElement +
            " is present in trunks "
        );
      } else {
        usePrincipalHiddenForce = true;
        usePrincipaleHiddenForceReason =
          " Transformed element " + trElement + " not found in trunks ";
      }
    } else {
      if (
        lunar.pilarsAttr.combList.existBrancheRelationType(
          CombAttr.MIDBRANCHECOMB3TYPE,
          pilarIdx
        )
      ) {
        usePrincipalHiddenForce = true;
        usePrincipaleHiddenForceReason =
          " Non transformed mid combination of 3 ";
      }
    }

    if (usePrincipalHiddenForce) {
      const hiddenLog = this.getMainHiddenForceData(pilarIdx);
      this.setOnlyPrincipalForce(pilarIdx,hiddenLog.getValue());
      points.updateValue(
        hiddenLog.getValue(),
        sourceName + usePrincipaleHiddenForceReason,
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

    let points = this.getRawBranchePoint(lunar, pilarIdx);
    const sourceName = this.getBrSrc(pilarIdx);

    // Ref3p341, 342
    if (this.trunkForceArr[pilarIdx].getValue() >= 18) {
      const mainHiddenData = this.hiddenTrunkForceArr[0][pilarIdx];
      const trunkResultElement = trunkElements[pilarIdx]
        .getValue()
        .getElement();
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
    const clashCombList = this.combList.getCombTypeAttrList(CombAttr.BRANCHECLASHTYPE,pilarIdx);
    if (clashCombList.length>0) {
      // Assume no any transformed combination kind  for this pilar
      //Ref3p344. Keep only the principal force
      let fraction= 1/3;
      let force = Math.trunc(points.value*fraction);
      points.updateValue(force, " Clash ");
      const pilarElement = brancheArr[pilarIdx].getElement();
      if (pilarElement != Element.EARTH) {
        // Ref3p345: Update if principal hidden month element not dragon, ox, dog, goat which are earth
        fraction= BaziHelper.getClashHiddenTrunkReduceFactor(lunar,clashCombList[0].branchAttrs);
        force = this.getMainHiddenForceData(pilarIdx).getValue();
        force = Math.trunc(force*fraction);
        this.setOnlyPrincipalForce(pilarIdx, force," Clash ");
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
    // Update influence of month branch  element on trunk's element
    // Also for hidden trunk element on branche (Ref8p543)
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
      let currBrancheForceAttr = this.brancheForceArr[pilarIdx];
      this.propagateMonthBrancheElementForce(
        checkElement,
        checkName,
        currBrancheForceAttr
      );

      const branche = this.lunar.brancheArr[pilarIdx];
      const brancheElement =branche.getElement();
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
        if ( brancheElement.isDestructive(checkElement)) {
          // Cas branche lukewarm branche. See Ref8p543 Sữu ẩm
          currBrancheForceAttr.addData(
            -checkForceAttr.getValue(),
            checkName+ " incompatible ");
        }
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

  addEEForce(ee: ElementNEnergy, force: number, detail: string) {
    this.sumElementForce += force;
    this.elementNEnergyForce[ee.ordinal()].addData(force, detail);
    this.elementForce[ee.getElement().ordinal()].addData(force, detail);
  }

  evalElementForce(lunar: Lunar) {
    const len = ElementNEnergy.getValues().length;
    const brancheArr = lunar.brancheArr;
    this.elementNEnergyForce = DataWithLog.newDataArray(len);
    const elementValues = Element.getValues();
    this.elementForce = DataWithLog.newDataArray(elementValues.length);
    for (let index = 0; index < len; index++) {
      this.elementNEnergyForce[index].addData(0);
    }
    for (let index = 0; index < elementValues.length; index++) {
      this.elementForce[index].addData(0);
    }
    this.sumElementForce = 0;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      // Trunc element's force
      let ee = this.trunkEE[pilarIdx].getValue();
      this.addEEForce(
        ee,
        this.trunkForceArr[pilarIdx].getValue(),
        this.getTrSrc(pilarIdx)
      );

      const comb5List = this.getCombAttrList(lunar, pilarIdx);
      if (comb5List.length > 0) {
        // Use only transformed element force. Example Ref3p347 cas 2.3
        ee = this.brancheEE[pilarIdx].getValue();
        this.addEEForce(
          ee,
          this.brancheForceArr[pilarIdx].getValue(),
          this.getBrSrc(pilarIdx) + '. Transformed. Use transformed element '+ ee+' force'
        );
      } else {
        // Use only hidden trunk force. Example Ref3p347 cas 1.4
        const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(
          brancheArr[pilarIdx]
        );
        const hLen = hiddenTrunkArr.length;
        let addDetail =  " 's Main Hidden Trunk ";
        for (let i = 0; i < hLen; i++) {
          this.addEEForce(
            hiddenTrunkArr[i].elementNEnergy,
            this.hiddenTrunkForceArr[i][pilarIdx].getValue(),
            this.getBrSrc(pilarIdx) +
            'NOT transformed element. Use '+
            addDetail +
              hiddenTrunkArr[i]
          );
          addDetail =  " 's non Main Hidden Trunk "
        }
      }
    }
    this.weakThreshHold = this.sumElementForce * QiForce.FORCEWEAKTHESHHOLD;
    this.favorableThreshHold = this.sumElementForce * QiForce.FORCEFAVORABLETHESHHOLD;
  }

  initMajorElement(lunar: Lunar) {
    this.evalElementForce(lunar);
    const elementValues = Element.getValues();
    this.majorElement = null;
    this.majorElementForce = 0;

    elementValues.forEach((element) => {
      if (
        (100 * this.elementForce[element.ordinal()].getValue()) /
          this.sumElementForce >
        this.majorElementForce
      ) {
        this.majorElementForce =
          (100 * this.elementForce[element.ordinal()].getValue()) /
          this.sumElementForce;
        this.majorElement = element as Element;
      }
    });

    this.averageElementForce = this.sumElementForce / 5;
  }

  evalPilarRelation() {
    const lunar=this.lunar;
    const MAX_LEN = LunarBase.PILARS_LEN;
    const brancheArr = lunar.brancheArr;
    const trunkArr = lunar.trunkArr;
    this.dayHiddenRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.trunkRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.brancheRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.brancheTrunkRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    const brancheBrRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);

    for (let pilarCol = 0; pilarCol < MAX_LEN; pilarCol++) {
      const currTrunkEE = trunkArr[pilarCol].elementNEnergy;
      for (let j = 0; j < MAX_LEN; j++) {
        // j-->pilarCol: The transformed result effect is on the source
        this.trunkRelation[j][pilarCol] = BaziHelper.getEnNRelation(
          // Use original element
          trunkArr[j].elementNEnergy,
          currTrunkEE
        );
      }
    }

    for (let pilarCol = 0; pilarCol < MAX_LEN; pilarCol++) {
      const toBranche = brancheArr[pilarCol];
      const currTrunkEE = trunkArr[pilarCol].elementNEnergy
      for (let pilarBranche = 0; pilarBranche < MAX_LEN; pilarBranche++) {
        const fromBranche = brancheArr[pilarBranche];
        // Use original element
        this.brancheRelation[pilarBranche][pilarCol] = BaziHelper.getEnNRelation(
          fromBranche.elementNEnergy,toBranche.elementNEnergy
        );
        this.brancheTrunkRelation[pilarBranche][pilarCol] = BaziHelper.getEnNRelation(
          fromBranche.elementNEnergy,
          currTrunkEE
        );
        brancheBrRelation[pilarBranche][pilarCol] = BrancheHelper.getUniqueRelation(
          fromBranche,
          toBranche
        );
        const hiddenTrunk = BrancheHelper.getHiddenTrunk(fromBranche);
        for (let i = 0; i < hiddenTrunk.length; i++) {
          this.dayHiddenRelation[pilarBranche][i]=(BaziHelper.eNeTrunkRelation(
           hiddenTrunk[i], trunkArr[LunarBase.DINDEX]
          ));
        }
      }
    }

    this.initMajorElement(lunar);
  }

  // Ref8p5 Thong can
  evalRootPresent() {
    const lunar=this.lunar;
    const MAX_LEN = LunarBase.PILARS_LEN;
    const brancheArr = lunar.brancheArr;
    const trunkArr= lunar.trunkArr;

    this.rootPresent = ObjectHelper.newArray(MAX_LEN, false);
    for (let pilarCol = 0; pilarCol < MAX_LEN; pilarCol++) {
      const branche = brancheArr[pilarCol];
      const currOriginTrunkEE = trunkArr[pilarCol].elementNEnergy
      const currTrfTrunkEE = this.trunkEE[pilarCol].getValue()
      this.rootPresent[pilarCol] =
        currOriginTrunkEE === branche.elementNEnergy &&
        currTrfTrunkEE === branche.elementNEnergy
        ;
      this.rootPresent[pilarCol] =
        this.rootPresent[pilarCol] ||
        currOriginTrunkEE === this.brancheEE[pilarCol].getValue()&&
        currTrfTrunkEE === this.brancheEE[pilarCol].getValue()
        ;

      const hiddenTrunk = BrancheHelper.getHiddenTrunk(branche);
      for (let i = 0; i < hiddenTrunk.length; i++) {
        this.rootPresent[pilarCol] =
          this.rootPresent[pilarCol] ||
          currOriginTrunkEE === hiddenTrunk[i].elementNEnergy&&
          currTrfTrunkEE === hiddenTrunk[i].elementNEnergy;
      }
    }
  }

  initStructure() {
    this.specialStructure=BaziStructureHelper.getCachCuc(this.lunar);
    this.structure=BaziStructureHelper.getMainCachCuc(this.lunar);
    if ( this.specialStructure===null ) this.specialStructure=this.structure;
    if ( this.structure===null ) this.structure=this.specialStructure;
  }


  initEERCounters() {
    const lunar=this.lunar;
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
          lunar.brancheArr[LunarBase.MINDEX].getElement()
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

  initEE() {
    const lunar=this.lunar;
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


  isVeryWeakedElement(element: Element) {
    return (
      this.elementForce[element.ordinal()].getValue() <= this.weakThreshHold/2
    );
  }

  isFavorableElement(element: Element) {
    return (
      this.elementForce[element.ordinal()].getValue() >= this.favorableThreshHold
    );
  }

  isWeakedElement(element: Element) {
    return (
      this.elementForce[element.ordinal()].getValue() <= this.weakThreshHold
    );
  }


  getRelationCount(relation: ElementNEnergyRelation, toIndex: number) {
    let count = this.getTrunkRelationCount(relation, toIndex);
    count += this.getHiddenRelationCount(relation);
    return count;
  }

  getPairedRelationCount(relation: ElementNEnergyRelation, toIndex: number): number {
    let count = this.getRelationCount(relation, toIndex);
    count+=this.getRelationCount(relation.getEnumNextNElement(1), toIndex);
    return count;
  }


  getTrunkPairedRelationCount(relation: ElementNEnergyRelation, toIndex: number) {
    let count = this.getTrunkRelationCount(relation,toIndex)
    count+= this.getTrunkRelationCount(relation.getEnumNextNElement(1),toIndex)
    return count
  }


  getTrunkRelationCount(relation: ElementNEnergyRelation, toIndex: number) {
    let count = 0;
    for (let i = 0; i < LunarBase.LINDEX; i++) {
      if (relation === this.trunkRelation[i][toIndex]) {
        count++;
      }
    }
    return count;
  }


  getHiddenRelationCount(relation: ElementNEnergyRelation) {
    let count = 0;

    for (let branchePilarIdx = 0; branchePilarIdx < LunarBase.LINDEX; branchePilarIdx++) {
      const hTrunkArr = BrancheHelper.getHiddenTrunk(
        this.lunar.brancheArr[branchePilarIdx]
      );
      for (let i = 0; i < hTrunkArr.length; i++) {
        if (relation === this.dayHiddenRelation[branchePilarIdx][i]) {
            count++;
        }
      }
    }
    return count;
  }

  getDayForce(){
    // Must also add friend element force
    return this.trunkForceArr[LunarBase.DINDEX].getValue();
  }

  isFavorable(force:number) {
    return force>this.averageElementForce;
  }

  getDayForceLabel(): string {
    const force=this.getDayForce();
    if ( this.isFavorable(force) ) return "Label.Day.Favorable";
    return "Label.Day.Weak";
  }
}
