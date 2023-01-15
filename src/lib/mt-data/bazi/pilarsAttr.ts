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

export class PilarsAttr {
  comb5StatusArr?: number[][] = null;
  trunkEE?: DataWithLog[] = null;
  trunkTEE?: ElementNEnergy[][] = null;
  brancheEE?: DataWithLog[] = null;
  brancheTEE?: ElementNEnergy[][] = null;
  trunkForceArr?: DataWithLog[] = null;
  brancheHiddenStartIdx = 1;
  brancheForceArr?: DataWithLog[][] = null;

  brMonthElement?: Element = null;
  rootPresent?: boolean[] = null;
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

  combList: CombinationList ;

  constructor(lunar: Lunar) {
    lunar.pilarsAttr=this;
    this.initEE(lunar);
    this.evalPilarRelation(lunar);
    this.initEERCounters(lunar);
  }

  log() {
    console.log(this.combList);
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

  //Ref3p336 cas 1 with month branche
  isElementInMonthHiddenTrunk(lunar: Lunar, checkElement: Element) {
    if (checkElement === this.brMonthElement) return true;

    const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(
      lunar.brancheArr[LunarBase.MINDEX]
    );

    for (let i = 0; i < hiddenTrunkArr.length; i++) {
      const eeHtr = hiddenTrunkArr[i].getElement();
      if (eeHtr === checkElement) {
        return true;
      }
    }
    return false;
  }

  //Ref3p336 cas 1 with current branche and non weaked hidden branche force
  //
  isElementInNonWeakForceHiddenTrunk(
    lunar: Lunar,
    pilarIdx: number,
    checkElement: Element
  ) {
    const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(
      lunar.brancheArr[pilarIdx]
    );

    for (let i = 0; i < hiddenTrunkArr.length; i++) {
      const eeHtr = hiddenTrunkArr[i].getElement();
      if (eeHtr === checkElement) {
        if (!ObjectHelper.isNaN(this.brancheForceArr)) {
          if (
            this.brancheForceArr[i + this.brancheHiddenStartIdx][
              pilarIdx
            ].getValue() > 3
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  hasBaseCombOf3(
    trunkArr: Trunk[],
    brancheArr: Branche[],
    checkPilarIdx: number
  ) {
    let count = 0;
    const checkBranche = brancheArr[checkPilarIdx];
    let hasTrunkElementCompatibleWithTransformedElement = false;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (pilarIdx !== checkPilarIdx) {
        const branche = brancheArr[pilarIdx];
        if (
          BrancheHelper.getUniqueRelation(branche, checkBranche) ===
          BrancheRelation.COMBINATION
        ) {
          count++;
          if (
            trunkArr[pilarIdx].getElement() ===
            BrancheRelation.getCombinaisonResultElement(branche).getValue()
          ) {
            hasTrunkElementCompatibleWithTransformedElement = true;
          }
        }
      }
    }
    return count >= 2 && hasTrunkElementCompatibleWithTransformedElement;
  }

  hasCombinationOf3(
    trunkArr: Trunk[],
    brancheArr: Branche[]
  ) {
    const res =
    this.combList.existRelationType(CombAttr.BRANCHECOMB3TYPE) ;
    return res ;
  }

    // Ref3p336
  //
  hasComb5ElementsType0(lunar: Lunar, pilarIdx1: number, pilarIdx2: number) {
    const res =
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE0,pilarIdx1)&&
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE0,pilarIdx2);
    return res ;
  }

  // Ref3p336 ???
  //
  hasComb5ElementsType1(lunar: Lunar, pilarIdx1: number, pilarIdx2: number) {
    const res =
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE1,pilarIdx1)&&
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE1,pilarIdx2);
    return res ;
  }

  // Ref3p337 Cas2
  //
  hasComb5ElementsType2(lunar: Lunar, pilarIdx1: number, pilarIdx2: number) {
    const res =
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE2,pilarIdx1)&&
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE2,pilarIdx2);
    return res;
  }

  // Ref3p337Cas 3
  //
  hasComb5ElementsType3(lunar: Lunar, pilarIdx1: number, pilarIdx2: number) {
    const res =
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE3,pilarIdx1)&&
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE3,pilarIdx2);
    return res ;
  }

  // Ref3p337 Cas 4
  hasComb5ElementsType4(lunar: Lunar, pilarIdx1: number, pilarIdx2: number) {
    const res =
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE4,pilarIdx1)&&
    this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE4,pilarIdx2);
    return res ;
  }

  // Ref3p337 Cas5 or 6
  // DeityHelper
  hasComb5ElementsType5Or6(lunar: Lunar, pilarIdx1: number, pilarIdx2: number) {
    const res =
      (this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE5,pilarIdx1) ||
      this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE6,pilarIdx1))
      &&
      (this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE5,pilarIdx2) ||
      this.combList.existTrunkRelationType(CombAttr.TRUNKCOMB5TYPE6,pilarIdx2));
    return res ;
  }

  // Ref3p339
  getTrunkCombOf5Type(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number,
    eTrMonthElement: Element
  ) {
    let res = -1;
    const trunkArr = lunar.trunkArr;
    // To avoid null pointer exception problem if res = 0
    let resElement = trunkArr[pilarIdx1].getElement();

    if (Math.abs(pilarIdx2 - pilarIdx1) === 1) {
      const brancheArr = lunar.brancheArr;
      // Ref3p339 only the clashed pilar has his point decremented
      const trunk = trunkArr[pilarIdx1];
      const otherTrunk = trunkArr[pilarIdx2];
      const checkElement = trunk.getElement();
      const otherElement = otherTrunk.getElement();

      const isClashed = otherElement.isDestructive(checkElement);

      if (this.hasComb5ElementsType0(lunar, pilarIdx1, pilarIdx2)) {
        if (isClashed) {
          res = 7;
        } else {
          res = 8;
        }
        resElement = checkElement;
      }

      if (this.hasComb5ElementsType1(lunar, pilarIdx1, pilarIdx2)) {
        if (isClashed) {
          res = 10;
        } else {
          res = 1;
        }
        resElement = TrunkHelper.getTransformElement(trunk);
      }

      if (this.hasComb5ElementsType2(lunar, pilarIdx1, pilarIdx2)) {
        if (isClashed) {
          res = 20;
        } else {
          res = 2;
        }
        resElement = TrunkHelper.getTransformElement(trunk);
      }

      if (this.hasComb5ElementsType3(lunar, pilarIdx1, pilarIdx2)) {
        if (isClashed) {
          res = 30;
        } else {
          res = 3;
        }
        resElement = TrunkHelper.getTransformElement(trunk);
      }

      if (this.hasComb5ElementsType4(lunar, pilarIdx1, pilarIdx2)) {
        if (isClashed) {
          res = 40;
        } else {
          res = 4;
        }
        resElement = TrunkHelper.getTransformElement(trunk);
      }
      if (this.hasComb5ElementsType5Or6(lunar, pilarIdx1, pilarIdx2)) {
        if (isClashed) {
          res = 50;
        } else {
          res = 5;
        }
        resElement = eTrMonthElement;
      }

      if (this.hasComb5ElementsType5Or6(lunar, pilarIdx1, pilarIdx2)) {
        if (isClashed) {
          res = 60;
        } else {
          res = 6;
        }
        resElement = eTrMonthElement;
      }
    }

    return [res, resElement.ordinal()];
  }

  evalComb5(lunar: Lunar) {
    const lIndex = LunarBase.LINDEX;
    let iStatusArr;
    let iStatus;
    this.comb5StatusArr = ObjectHelper.newMatrix(5, LunarBase.PILARS_LEN, 0);
    for (let pilarIdx = 0; pilarIdx < lIndex; pilarIdx++) {
      let otherPilarIdx = pilarIdx + 1;
      if (otherPilarIdx < lIndex) {
        iStatusArr = this.getTrunkCombOf5Type(
          lunar,
          pilarIdx,
          otherPilarIdx,
          this.brMonthElement
        );
        iStatus = iStatusArr[0];
        this.comb5StatusArr[0][pilarIdx] = iStatus;
        this.comb5StatusArr[2][pilarIdx] = iStatusArr[1];
        if (iStatus > 0) {
          this.comb5StatusArr[2][pilarIdx] = iStatusArr[1];
          this.comb5StatusArr[1][pilarIdx]++;
          this.comb5StatusArr[1][otherPilarIdx]++;
          this.comb5StatusArr[4][pilarIdx] = otherPilarIdx;
        } else {
          this.comb5StatusArr[4][pilarIdx] = -1;
        }
      }
      otherPilarIdx = pilarIdx - 1;
      if (otherPilarIdx >= 0) {
        iStatusArr = this.getTrunkCombOf5Type(
          lunar,
          pilarIdx,
          otherPilarIdx,
          this.brMonthElement
        );
        iStatus = iStatusArr[0];
        if (this.comb5StatusArr[0][pilarIdx] <= 0) {
          this.comb5StatusArr[0][pilarIdx] = iStatus;
          this.comb5StatusArr[2][pilarIdx] = iStatusArr[1];
        }
        if (iStatus > 0) {
          this.comb5StatusArr[1][pilarIdx]++;
          this.comb5StatusArr[1][otherPilarIdx]++;
          this.comb5StatusArr[3][pilarIdx] = otherPilarIdx;
        } else {
          this.comb5StatusArr[3][pilarIdx] = -1;
        }
      }
    }
  }

  // Return true if check pilar is part of combination of 5 but have
  // a concurrence status
  // In this case the element will not be transformed
  //
  is3Comb5ConcureenceStatusPilar(lunar: Lunar, checkPilarIdx: number): boolean {
    if (this.comb5StatusArr[0][checkPilarIdx] === 0) {
      return false;
    }
    const trCheckElementord = this.comb5StatusArr[2][checkPilarIdx];
    let otherPilaridx;
    // Central comb5 pilar have count more than 3
    // Must check if has same transformed element or not before making decision
    if (this.comb5StatusArr[1][checkPilarIdx] > 3) {
      // Central point check left and right pilar trannsformed element
      // Assume comb5StatusArr[1][checkPilarIdx]==2
      // Check if the next or the previous pilar is the central pilar
      otherPilaridx = checkPilarIdx - 1;
      let trCheckElementordM1 = -1;
      if (otherPilaridx >= 0) {
        trCheckElementordM1 = this.comb5StatusArr[2][otherPilaridx];
      }
      otherPilaridx = checkPilarIdx + 1;
      let trCheckElementordP1 = -1;
      if (otherPilaridx < LunarBase.PILARS_LEN) {
        trCheckElementordP1 = this.comb5StatusArr[2][otherPilaridx];
      }
      // Not concurrent comb5 if the transformed elements are the same
      const res = !(
        trCheckElementord === trCheckElementordM1 &&
        trCheckElementord === trCheckElementordP1
      );
      return res;
    } else {
      otherPilaridx = checkPilarIdx + 1;
      if (otherPilaridx < LunarBase.PILARS_LEN) {
        if (this.comb5StatusArr[1][otherPilaridx] > 3) {
          return this.is3Comb5ConcureenceStatusPilar(lunar, otherPilaridx);
        }
      }
      otherPilaridx = checkPilarIdx - 1;
      if (otherPilaridx >= 0) {
        if (this.comb5StatusArr[1][otherPilaridx] > 3) {
          return this.is3Comb5ConcureenceStatusPilar(lunar, otherPilaridx);
        }
      }
    }
    return false;
  }

  evalTrunkEEArr(lunar: Lunar) {
    this.trunkEE = [];
    const trunkArr = lunar.trunkArr;
    let prevNoRootSupporstatus = true;

    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const currTrunk = trunkArr[pilarIdx];
      const trunkElement = currTrunk.elementNEnergy;
      let resElement = new DataWithLog(trunkElement, "Trunk pilar element");
      // Root Support value. Ref3p333
      const noRootSupporstatus = !this.isRootSupported(lunar, pilarIdx);
      const nextNoRootSupporstatus = !this.isRootSupported(lunar, pilarIdx + 1);
      // Ref339:
      let checkComb5 = true;
      if (noRootSupporstatus) {
        if (this.comb5StatusArr[4][pilarIdx] > 0) {
          // ngủ hợp with next pilar
          if (nextNoRootSupporstatus) {
            // Current pilar has no root support and so is  the next
            checkComb5 = false;
          }
        }
        if (this.comb5StatusArr[3][pilarIdx] > 0) {
          // ngủ hợp with prev pilar
          if (prevNoRootSupporstatus) {
            // Current pilar has no root support and so is  the prev
            checkComb5 = false;
          }
        }
      }
      if (checkComb5) {
        // No Root support and comb5 type
        if (this.is3Comb5ConcureenceStatusPilar(lunar, pilarIdx)) {
          //Ref3 p336
          resElement.updateValue(
            ElementNEnergy.getElementNEnergy(
              Element.getElement(this.comb5StatusArr[2][pilarIdx]),
              trunkElement.getEnergy()
            ),
            "No Root Support and combination of 5"
          );
        }
      }
      this.trunkEE.push(resElement);
      prevNoRootSupporstatus = noRootSupporstatus;
    }
  }

  // Check the presence of element checkElement in trunk, including transformed trunk element
  isBrancheELementInTrunk(lunar: Lunar, checkElement: Element) {
    DataWithLog.resetCurrLog();
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (this.trunkEE[pilarIdx].getValue().getElement() === checkElement) {
        DataWithLog.setCurrLog(
          true,
          DataWithLog.getTrunkHeader(pilarIdx) +
            "same transformed element " +
            checkElement
        );
        return true;
      }
    }
    // Case Ref3pp370Ex4. Extent to orginal element
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (lunar.trunkArr[pilarIdx].getElement() === checkElement) {
        DataWithLog.setCurrLog(
          true,
          DataWithLog.getTrunkHeader(pilarIdx) + "same element " + checkElement
        );
        return true;
      }
    }
    return false;
  }

  isConcurenceTransformPlus(brancheArr: Branche[], checkPilarIdx: number) {
    // Assume checkPilarIdx is transnsformable
    if (
      BaziHelper.countTransformPlus(
        brancheArr,
        checkPilarIdx,
        this.brMonthElement,
        true
      ) === 2
    ) {
      return true;
    }
    if (checkPilarIdx > 1) {
      if (
        BaziHelper.countTransformPlus(
          brancheArr,
          checkPilarIdx - 1,
          this.brMonthElement,
          true
        ) === 2
      ) {
        return true;
      }
    }
    if (checkPilarIdx + 1 < LunarBase.PILARS_LEN) {
      if (
        BaziHelper.countTransformPlus(
          brancheArr,
          checkPilarIdx + 1,
          this.brMonthElement,
          true
        ) === 2
      ) {
        return true;
      }
    }
    return false;
  }

  evalBrancheEEArr(lunar: Lunar) {
    const brancheArr = lunar.brancheArr;
    const trunkArr = lunar.trunkArr;
    this.brancheEE = DataWithLog.newDataArray(LunarBase.PILARS_LEN, null);
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      // If transformed then clash will have no effect
      // Ref 3 p344
      const currBranche = brancheArr[pilarIdx];
      const brancheElement = currBranche.getElement();
      let resElement = new DataWithLog(
        brancheElement,
        "Initial Branche element"
      );
      let hasCombinedStatus = false;

      if (BaziHelper.hasSameSeasonCombination(brancheArr, pilarIdx)) {
        resElement = BrancheRelation.getTransformableSeasonCombination(
          brancheArr[pilarIdx]
        );

        hasCombinedStatus = true;
      } else if (BaziHelper.hasCombOf3(lunar, pilarIdx)) {
        resElement = BrancheRelation.getCombinaisonResultElement(
          brancheArr[pilarIdx]
        );
        hasCombinedStatus = true;
      } else {
        if (BaziHelper.hasMidCombination(trunkArr, brancheArr, pilarIdx)) {
          resElement = BrancheRelation.getMidCombinaisonResultElement(
            brancheArr[pilarIdx]
          );
          hasCombinedStatus = true;
        }
        if (BaziHelper.hasTransformPlusWithTransform(lunar, pilarIdx)) {
          // Ref3p344 Check compatibility principal element of month branch
          if (!this.isConcurenceTransformPlus(brancheArr, pilarIdx)) {
            resElement = BrancheRelation.getTransformResultElement(
              brancheArr[pilarIdx]
            );
            hasCombinedStatus = true;
          }
        }
      }
      // Ref3p343 check transform possibility
      if (hasCombinedStatus) {
        // Ref3p343 notice
        if (!this.isBrancheELementInTrunk(lunar, resElement.getValue())) {
          resElement = new DataWithLog(
            brancheElement,
            resElement.getDetail() +
              resElement.getValue() +
              " incompatible kind with any trunk element's kind "
          );
        }
      }

      this.brancheEE[pilarIdx] = new DataWithLog(
        ElementNEnergy.getElementNEnergy(
          resElement.getValue(),
          currBranche.getEnergy()
        ),
        resElement.getDetail()
      );
    }
  }

  evalMonthElement(lunar: Lunar) {
    let element = lunar.brancheArr[LunarBase.MINDEX].getElement();
    // Set temporary brMonthElement if not null
    if (ObjectHelper.isNaN(this.brMonthElement)) {
      this.brMonthElement = element;
    }
    if (BaziHelper.hasSameSeasonComb(lunar.brancheArr, LunarBase.MINDEX)) {
      element = BrancheRelation.getTransformableSeasonCombination(
        lunar.getmBranche()
      ).getValue();
    } else {
      if (BaziHelper.hasCombOf3(lunar, LunarBase.MINDEX)) {
        element = BrancheRelation.getCombinaisonResultElement(
          lunar.getmBranche()
        ).getValue();
      } else {
        if (
          BaziHelper.hasMidCombination(
            lunar.trunkArr,
            lunar.brancheArr,
            LunarBase.MINDEX
          )
        ) {
          element = BrancheRelation.getCombinaisonResultElement(
            lunar.getmBranche()
          ).getValue();
        } else if (
          BaziHelper.hasTransformPlusWithTransform(lunar, LunarBase.MINDEX)
        ) {
          if (
            !this.isConcurenceTransformPlus(lunar.brancheArr, LunarBase.MINDEX)
          ) {
            element = BrancheRelation.getCombinaisonResultElement(
              lunar.getmBranche()
            ).getValue();
          }
        }
      }
    }
    this.brMonthElement = element;
  }

  getComb5TrunkElement(lunar: Lunar, pilarIdx: number) {
    let pilarElement = lunar.trunkArr[pilarIdx].getElement();
    if (!ObjectHelper.isNaN(this.comb5StatusArr)) {
      if (this.comb5StatusArr[0][pilarIdx] > 0) {
        pilarElement = Element.getElement(this.comb5StatusArr[2][pilarIdx]);
      }
    }
    return pilarElement;
  }

  hasClash(brancheArr: Branche[], checkPilarIdx: number) {
    const maxIndex = LunarBase.LINDEX;
    if (checkPilarIdx < 0) {
      return false;
    }
    if (checkPilarIdx >= maxIndex) {
      return false;
    }
    const checkBranche = brancheArr[checkPilarIdx];

    for (let pilarIdx = 0; pilarIdx < maxIndex; pilarIdx++) {
      if (Math.abs(pilarIdx - checkPilarIdx) === 1) {
        if (
          BrancheRelation.isRelationPresent(
            brancheArr[pilarIdx],
            checkBranche,
            BrancheRelation.CLASH
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  hasNoSecondaryHiddenForce(lunar: Lunar, pilarIdx: number) {
    let hasCombinedStatus = false;
    let res = false;
    if (BaziHelper.hasSameSeasonCombination(lunar.brancheArr, pilarIdx)) {
      hasCombinedStatus = true;
    } else if (BaziHelper.hasCombOf3(lunar, pilarIdx)) {
      hasCombinedStatus = true;
    } else if (
      BaziHelper.hasMidCombination(lunar.trunkArr, lunar.brancheArr, pilarIdx)
    ) {
      hasCombinedStatus = true;
    } else if (BaziHelper.hasTransformPlusWithTransform(lunar, pilarIdx)) {
      // Ref3p344 Check compatibility principal element of month branch
      if (!this.isConcurenceTransformPlus(lunar.brancheArr, pilarIdx)) {
        hasCombinedStatus = true;
      } else {
        // Ref3p344
        res = true;
      }
    } else if (
      BaziHelper.hasTransformPlus(
        lunar.brancheArr,
        pilarIdx,
        this.brMonthElement
      )
    ) {
      res = true;
    }
    if (hasCombinedStatus) {
      res = true;
    } else {
      // Ref3p344 Clash
      if (this.hasClash(lunar.brancheArr, pilarIdx)) {
        res = true;
      }
    }
    return res;
  }

  isHiddenTrunkFavorable(
    lunar: Lunar,
    checkPilarIdx: number,
    checkElement: Element
  ) {
    const brancheElementArr = this.brancheEE;
    let eeHtr;

    if (brancheElementArr != null) {
      if ( !ObjectHelper.isNaN(brancheElementArr[checkPilarIdx])) {
          eeHtr = brancheElementArr[checkPilarIdx].getValue().getElement();
          if (eeHtr !== lunar.brancheArr[checkPilarIdx].getElement()) {
            // Use the transformed element
            return BaziHelper.getRelation(eeHtr, checkElement).isFavorable();
          }
      }
    }
    if (this.hasNoSecondaryHiddenForce(lunar, checkPilarIdx)) {
      eeHtr = lunar.brancheArr[checkPilarIdx].getElement();
      return BaziHelper.getRelation(eeHtr, checkElement).isFavorable();
    }

    // Not transformed check with the hidden trunk
    const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(
      lunar.brancheArr[checkPilarIdx]
    );

    for (let pilarIdx = 0; pilarIdx < hiddenTrunkArr.length; pilarIdx++) {
      eeHtr = hiddenTrunkArr[pilarIdx].getElement();
      if (BaziHelper.getRelation(eeHtr, checkElement).isFavorable()) {
        return true;
      }
    }
    return false;
  }

  // Ref3p333Case2Ex1
  isRootSupportWithSameSeasonCombination(
    lunar: Lunar,
    transformedElement: Element,
    pilarIdx: number
  ) {
    const pilarElement = this.getComb5TrunkElement(lunar, pilarIdx);
    if (BaziHelper.hasSameSeasonCombination(lunar.brancheArr, pilarIdx)) {
      if (
        BaziHelper.getRelation(transformedElement, pilarElement).isFavorable()
      ) {
        return true;
      }
    } else {
      if (this.isHiddenTrunkFavorable(lunar, pilarIdx, pilarElement)) {
        return true;
      }
    }

    return false;
  }

  isRootSupportWithCombinationOf3(
    lunar: Lunar,
    transformedElement: Element,
    pilarIdx: number
  ) {
    const pilarElement = lunar.trunkArr[pilarIdx].getElement();
    if (
      BaziHelper.getRelation(transformedElement, pilarElement).isFavorable()
    ) {
      return true;
    }
    for (let i = 0; i < LunarBase.LINDEX; i++) {
      if (this.hasBaseCombOf3(lunar.trunkArr, lunar.brancheArr, i)) {
        if (this.isHiddenTrunkFavorable(lunar, i, pilarElement)) {
          return true;
        }
      }
    }
    return false;
  }


  isRootSupportCombinationOf3WithoutTransform(lunar: Lunar, pilarIdx: number) {
    const bArr = lunar.brancheArr;
    const tArr = lunar.trunkArr;
    const pilarElement = tArr[pilarIdx].getElement();

    if (BaziHelper.hasCombinationOf3WithoutTransform(tArr, bArr, pilarIdx)) {
      if (this.isHiddenTrunkFavorable(lunar, LunarBase.DINDEX, pilarElement)) {
        return true;
      }
      for (let i = 0; i < LunarBase.PILARS_LEN - 1; i++) {
        if (bArr[i].getElement().isProductive(pilarElement)) {
          return true;
        }
      }
    } else {
      if (this.isHiddenTrunkFavorable(lunar, pilarIdx, pilarElement)) {
        return true;
      }
    }
    return false;
  }

  // Ref3p334Case3
  isRootSupportWithTransformPlusRelation(lunar: Lunar, pilarIdx: number) {
    const bArr = lunar.brancheArr;
    const tArr = lunar.trunkArr;
    const pilarElement = tArr[pilarIdx].getElement();

    if (BaziHelper.hasTransformPlusWithTransform(lunar, pilarIdx)) {
      if (this.isHiddenTrunkFavorable(lunar, LunarBase.DINDEX, pilarElement)) {
        return true;
      }
      const pilarTransfElement = BrancheRelation.getTransformResultElement(
        bArr[pilarIdx]
      ).getValue();
      if (
        this.isHiddenTrunkFavorable(lunar, LunarBase.DINDEX, pilarTransfElement)
      ) {
        return true;
      }

      for (let i = 0; i < LunarBase.PILARS_LEN - 1; i++) {
        if (
          BaziHelper.getRelation(
            bArr[i].getElement(),
            pilarElement
          ).isFavorable()
        ) {
          return true;
        }
        if (
          BaziHelper.getRelation(
            bArr[i].getElement(),
            pilarTransfElement
          ).isFavorable()
        ) {
          return true;
        }
        if (BaziHelper.hasTransformPlusWithTransform(lunar, i)) {
          const transfElement = BrancheRelation.getTransformResultElement(
            bArr[i]
          ).getValue();
          if (
            BaziHelper.getRelation(transfElement, pilarElement).isFavorable()
          ) {
            return true;
          }
        }
      }
    } else {
      if (this.isHiddenTrunkFavorable(lunar, LunarBase.DINDEX, pilarElement)) {
        return true;
      }
      for (let i = 0; i < LunarBase.PILARS_LEN - 1; i++) {
        if (
          BaziHelper.getRelation(
            bArr[i].getElement(),
            pilarElement
          ).isFavorable()
        ) {
          return true;
        }
      }
    }
    return false;
  }

  getOtherMidCombinationPilar(lunar: Lunar, checkPilarIdx: number) {
    const res = -1;
    const bArr = lunar.brancheArr;
    const checkBranche = bArr[checkPilarIdx];
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      // Ref343 only when two consecutive pilars
      if (Math.abs(pilarIdx - checkPilarIdx) === 1) {
        const branche = bArr[pilarIdx];
        if (
          BrancheHelper.getUniqueRelation(branche, checkBranche) ===
          BrancheRelation.COMBINATION
        ) {
          return pilarIdx;
        }
      }
    }
    return -1;
  }

  isElementAtTrunkPilar(
    lunar: Lunar,
    checkElement: Element,
    checkPilarIdx: number
  ) {
    if (ObjectHelper.isNaN(this.trunkEE[checkPilarIdx])) {
      return lunar.trunkArr[checkPilarIdx].getElement() === checkElement;
    } else {
      return (
        this.trunkEE[checkPilarIdx].getValue().getElement() === checkElement
      );
    }
  }

  isRootSupportedByHiddenTrunk(lunar: Lunar, pilarIdx: number) {
    const element = lunar.trunkArr[pilarIdx].getElement();

    //Check Nhân nguyên tàng canh
    for (let idx = 0; idx < LunarBase.PILARS_LEN - 1; idx++) {
      if (this.isHiddenTrunkFavorable(lunar, idx, element)) {
        return true;
      }
    }
    return false;
  }

  isRootSupported(lunar: Lunar, pilarIdx: number): boolean {
    if ( pilarIdx>=LunarBase.LINDEX ) return false ;
    const bArr = lunar.brancheArr;
    const tArr = lunar.trunkArr;
    let res = false;
    let checked = false;
    if (
      BaziHelper.hasSameSeasonCombination(lunar.brancheArr, LunarBase.DINDEX)
    ) {
      const transformedElement = BrancheRelation.getTransformableSeasonCombination(
        lunar.brancheArr[LunarBase.DINDEX]
      ).getValue();
      res = this.isRootSupportWithSameSeasonCombination(
        lunar,
        transformedElement,
        pilarIdx
      );
      checked = true;
    } else if (BaziHelper.hasCombOf3(lunar, LunarBase.DINDEX)) {
      const transformedElement = BrancheRelation.getCombinaisonResultElement(
        lunar.brancheArr[LunarBase.DINDEX]
      ).getValue();
      res = this.isRootSupportWithCombinationOf3(
        lunar,
        transformedElement,
        pilarIdx
      );
      checked = true;
    } else if (BaziHelper.hasCombinationOf3WithoutTransform(tArr,bArr, LunarBase.DINDEX)) {
      res = this.isRootSupportCombinationOf3WithoutTransform(lunar, pilarIdx);
      checked = true;
    } else if (BaziHelper.hasTransformPlusWithTransform(lunar, pilarIdx)) {
      if (!this.isConcurenceTransformPlus(bArr, pilarIdx)) {
        res = this.isRootSupportWithTransformPlusRelation(lunar, pilarIdx);
        checked = true;
      }
    } else if (BaziHelper.hasMidCombination(tArr, bArr, pilarIdx)) {
      const transformedElement = BrancheRelation.getCombinaisonResultElement(
        bArr[pilarIdx]
      ).getValue();
      const otherPilarIdx = this.getOtherMidCombinationPilar(lunar, pilarIdx);
      if (
        this.isElementAtTrunkPilar(lunar, transformedElement, pilarIdx) ||
        this.isElementAtTrunkPilar(lunar, transformedElement, otherPilarIdx)
      ) {
        res = true;
        checked = true;
      }
    }
    if (!checked) {
      res =
        this.rootPresent[pilarIdx] &&
        this.isRootSupportedByHiddenTrunk(lunar, pilarIdx);
    }
    return res;
  }

  // Ref3p339
  isTrunkNearClash(lunar: Lunar, pilarIdx: number) {
    return this.isTrunkClashed(lunar, pilarIdx, 1, false);
  }

  //Ref3p340
  isTrunkFarClash(lunar: Lunar, pilarIdx: number) {
    return this.isTrunkClashed(lunar, pilarIdx, 2, false);
  }

  isTrunkClashed(
    lunar: Lunar,
    pilarIdx: number,
    otherIdxInc: number,
    clashedMode: boolean
  ): boolean {
    const trunkElements = this.trunkEE;
    const checkElement = trunkElements[pilarIdx].getValue().getElement();
    let otherIdx = pilarIdx + otherIdxInc;
    let otherElement;
    let count = 0;
    let clashForce = 0;
    let isDestructive;
    DataWithLog.resetCurrLog();
    const trunkName =
      DataWithLog.getTrunkHeader(pilarIdx) + " element " + checkElement;

    if (otherIdx < LunarBase.LINDEX) {
      otherElement = trunkElements[otherIdx].getValue().getElement();
      const otherTrunkName =
        DataWithLog.getTrunkHeader(otherIdx) + " element " + otherElement;
      let verb = " controls ";
      if (clashedMode) {
        isDestructive = checkElement.isDestructive(otherElement);
      } else {
        isDestructive = otherElement.isDestructive(checkElement);
        verb = " is controlled by ";
      }
      if (isDestructive) {
        // Ref3p348 Thiên can hư phù (Ref3p333) nên không khắc được
        if (!this.isRootSupported(lunar, otherIdx)) {
          count++;
          DataWithLog.currLog.setValue(true, trunkName + verb + otherTrunkName);
        }
      }
    }
    otherIdx = pilarIdx - otherIdxInc;
    if (otherIdx >= 0) {
      otherElement = trunkElements[otherIdx].getValue().getElement();
      const otherTrunkName =
        DataWithLog.getTrunkHeader(otherIdx) + " element " + otherElement;
      let verb = " controls ";
      if (clashedMode) {
        isDestructive = checkElement.isDestructive(otherElement);
      } else {
        isDestructive = otherElement.isDestructive(checkElement);
        verb = " is controlled by";
      }
      if (isDestructive) {
        // Ref3p348 Thiên can hư phù  (Ref3p333) nên không khắc được
        if (!this.isRootSupported(lunar, otherIdx)) {
          count++;
          DataWithLog.currLog.updateValue(
            true,
            trunkName + verb + otherTrunkName
          );
        }
      }
    }
    return count > 0;
  }

  getTrunkBranchRelationLostForce(lunar: Lunar, pilarIdx: number): number {
    const trunkElements = this.trunkEE;
    const trunkElement = trunkElements[pilarIdx].getValue().getElement();
    const brancheElement = this.brancheEE[pilarIdx].getValue().getElement();
    let lostForce = 0;
    DataWithLog.resetCurrLog();
    let detail = "";
    const trunkName =
      DataWithLog.getTrunkHeader(pilarIdx) + " element " + trunkElement;
    const brancheName =
      DataWithLog.getBrancheHeader(pilarIdx) + " element " + brancheElement;
    if (trunkElement.isProductive(brancheElement)) {
      lostForce = -6;
      DataWithLog.setCurrLog(lostForce, trunkName + "product " + brancheName);
    } else if (trunkElement.isDestructive(brancheElement)) {
      lostForce = -12;
      DataWithLog.setCurrLog(lostForce, trunkName + "controls " + brancheName);
    } else if (brancheElement.isDestructive(trunkElement)) {
      lostForce = -18;
      DataWithLog.setCurrLog(
        lostForce,
        trunkName + "is controlled by " + brancheName
      );
    }
    return lostForce;
  }

  isTrunkNearClashed(lunar: Lunar, pilarIdx: number) {
    return this.isTrunkClashed(lunar, pilarIdx, 1, true);
  }

  isTrunkFarClashed(lunar: Lunar, pilarIdx: number) {
    return this.isTrunkClashed(lunar, pilarIdx, 2, true);
  }

  evalTrunkForce(lunar: Lunar) {
    const trunkPilarElement = this.trunkEE;
    const comb5StatusArr = this.comb5StatusArr;
    const branchePilarElement = this.brancheEE;

    const pilarForce: DataWithLog[] = DataWithLog.newDataArray(
      LunarBase.PILARS_LEN
    );
    let comb5status;
    let iComb5Status;
    let noRootSupporstatus;
    let nextNoRootSupporstatus;
    let prevNoRootSupporstatus = true;
    const checkClashArr = [];
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      // Initial points: Case 3 comb5 pilars together
      let pilarName = DataWithLog.getTrunkHeader(pilarIdx);
      pilarForce[pilarIdx].setValue(
        36,
        pilarName + "initial force ( 360 / (10 Trunks) "
      );
      // Comb5 Type
      iComb5Status = comb5StatusArr[0][pilarIdx];
      comb5status = iComb5Status > 0;

      // Root Support value
      noRootSupporstatus = !this.isRootSupported(lunar, pilarIdx);
      nextNoRootSupporstatus = !this.isRootSupported(lunar, pilarIdx + 1);
      let checkClashCase = true;
      // Ref339:
      if (noRootSupporstatus) {
        let checkComb5 = true;
        if (comb5StatusArr[4][pilarIdx] > 0) {
          // ngủ hợp with next pilar
          if (nextNoRootSupporstatus) {
            // Current pilar has no root support and so is  the next
            pilarForce[pilarIdx].addValue(-27, pilarName + "No root support");
            checkComb5 = false;
            checkClashCase = true;
            comb5status = false;
          }
        }
        if (comb5StatusArr[3][pilarIdx] > 0) {
          // ngủ hợp with prev pilar
          if (prevNoRootSupporstatus) {
            // Current pilar has no root support and so is  the prev
            pilarForce[pilarIdx].addValue(-27, pilarName + "No root support");
            checkComb5 = false;
            checkClashCase = true;
            comb5status = false;
          }
        }
        if (checkComb5 && !comb5status) {
          // No Root support and no comb5 type
          pilarForce[pilarIdx].addValue(
            -27,
            pilarName + "No root support and no combination of 5"
          );
        }
      }
      if (comb5status) {
        if (this.is3Comb5ConcureenceStatusPilar(lunar, pilarIdx)) {
          // Ref3p339 pilars with concurrence status
          checkClashCase = true;
          pilarForce[pilarIdx].addValue(
            -12,
            pilarName +
              "combination of 5 with no tranformation. status " +
              iComb5Status
          );
        } else {
          if (iComb5Status === 7) {
            checkClashCase = true;
            pilarForce[pilarIdx].addValue(
              -12,
              pilarName + "combination of 5 status " + iComb5Status
            );
          } else if (iComb5Status === 8) {
            checkClashCase = true;
          } else {
            pilarForce[pilarIdx].addValue(
              -12,
              pilarName + "combination of 5 status " + iComb5Status
            );
            checkClashCase = false;
          }
        }
      }
      checkClashArr[pilarIdx] = checkClashCase;

      const tElement = trunkPilarElement[pilarIdx].getValue().getElement();
      const trunkName =
        "Trunk " + lunar.trunkArr[pilarIdx] + " element " + tElement;
      const bElement = branchePilarElement[pilarIdx].getValue().getElement();
      const brancheName =
        "Branche " + lunar.brancheArr[pilarIdx] + " element " + bElement;
      pilarName = DataWithLog.getPilarHeader(pilarIdx);
      //Ref3p341Case3
      if (tElement.isProductive(bElement)) {
        pilarForce[pilarIdx].addValue(
          -6,
          pilarName + trunkName + " creates " + brancheName
        );
      }
      //Ref3p341Cas4
      if (tElement.isDestructive(bElement)) {
        pilarForce[pilarIdx].addValue(
          -12,
          pilarName + trunkName + " controls " + brancheName
        );
      }
      //Ref341Cas6
      if (bElement.isDestructive(tElement)) {
        pilarForce[pilarIdx].addValue(
          -18,
          pilarName + brancheName + " controls " + trunkName
        );
      }
      this.avoidZeroForce(pilarForce[pilarIdx], pilarName);

      prevNoRootSupporstatus = noRootSupporstatus;
    }

    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      const pilarName = DataWithLog.getTrunkHeader(pilarIdx);
      if (checkClashArr[pilarIdx]) {
        //Ref3p339
        if (this.isTrunkNearClashed(lunar, pilarIdx)) {
          pilarForce[pilarIdx].addValue(
            -12,
            pilarName + " weakened due to control relation ",
            this.getCurrLog()
          );
        }
        //Ref3p340
        if (this.isTrunkFarClashed(lunar, pilarIdx)) {
          pilarForce[pilarIdx].addValue(
            -6,
            pilarName + " weakened due to control relation  ",
            this.getCurrLog()
          );
        }
        // Ref3p341
        const trunkBranchRelationLostForce =
          this.getTrunkBranchRelationLostForce(lunar, pilarIdx);
        if (trunkBranchRelationLostForce > 0) {
          pilarForce[pilarIdx].addValue(
            trunkBranchRelationLostForce,
            pilarName,
            this.getCurrLog()
          );
        }
      }
      this.avoidZeroForce(pilarForce[pilarIdx], pilarName);
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

  setOnlyPrincipalForce(
    brancheForce: DataWithLog[][],
    pilarIdx: number,
    points: number,
    detail?: string
  ) {
    if (typeof detail === "undefined") {
      detail = "";
    } else {
      detail = "<ol>" + detail + "</ol>";
    }
    const pilarName = DataWithLog.getBrancheHeader(pilarIdx);
    let currIdx = this.brancheHiddenStartIdx;
    brancheForce[currIdx][pilarIdx] = new DataWithLog(
      points,
      pilarName +
        "No Transformation. Use only main hidden element force. " +
        detail
    );
    currIdx++;
    brancheForce[currIdx][pilarIdx] = new DataWithLog(
      0,
      pilarName +
        "No Transformation. Do not use middle hidden element force. " +
        detail
    );
    currIdx++;
    brancheForce[currIdx][pilarIdx] = new DataWithLog(
      0,
      pilarName +
        "No Transformation.  Do not use excess hidden element force. " +
        detail
    );
  }

  setHiddenBrancheForce(
    brancheForce: number[][],
    pilarIdx: number,
    multFactor: number,
    ddivFactor: number
  ) {
    let currHiddenIdx = this.brancheHiddenStartIdx;
    brancheForce[currHiddenIdx][pilarIdx] += Math.round(
      (brancheForce[currHiddenIdx][pilarIdx] * multFactor) / ddivFactor
    );
    currHiddenIdx++;
    brancheForce[currHiddenIdx][pilarIdx] += Math.floor(
      (brancheForce[currHiddenIdx][pilarIdx] * multFactor) / ddivFactor
    );
    currHiddenIdx++;
    brancheForce[currHiddenIdx][pilarIdx] += Math.floor(
      (brancheForce[currHiddenIdx][pilarIdx] * multFactor) / ddivFactor
    );
    return (
      brancheForce[this.brancheHiddenStartIdx][pilarIdx] +
      brancheForce[this.brancheHiddenStartIdx + 1][pilarIdx] +
      brancheForce[this.brancheHiddenStartIdx + 2][pilarIdx]
    );
  }

  getMainHiddenForceData(pilarIdx: number) {
    const dataLog = this.brancheForceArr[this.brancheHiddenStartIdx][pilarIdx];
    return new DataWithLog(
      dataLog.getValue(),
      DataWithLog.getBrancheHeader(pilarIdx) + " main Hidden Force "
    );
  }

  initHiddenTrunkForce(lunar: Lunar) {
    const brancheArr = lunar.brancheArr;
    // Distribution in hidden trunk. See Ref3p342, Ref3p5p9
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const currBranche = brancheArr[pilarIdx];
      const brancheElement = currBranche.getElement();
      const sourceName = DataWithLog.getBrancheHeader(pilarIdx);
      const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(brancheArr[pilarIdx]);
      const hLen = hiddenTrunkArr.length;
      for (let i = 0; i < hLen; i++) {
        this.brancheForceArr[i + this.brancheHiddenStartIdx][pilarIdx] =
          new DataWithLog();
        const detail = sourceName + " Hidden Trunk " + hiddenTrunkArr[i];
        if (hiddenTrunkArr[i].getElement() === brancheElement) {
          this.brancheForceArr[i + this.brancheHiddenStartIdx][
            pilarIdx
          ].setValue(
            this.getPrincipalForce(currBranche),
            detail + " main force"
          );
        } else {
          if (i === 2) {
            this.brancheForceArr[i + this.brancheHiddenStartIdx][
              pilarIdx
            ].setValue(3, detail + " excess force");
          } else {
            this.brancheForceArr[i + this.brancheHiddenStartIdx][
              pilarIdx
            ].setValue(9, detail + " middle force");
          }
        }
      }
    }
  }

  setBranchePoints(lunar: Lunar, pilarIdx: number) {
    const brancheArr = lunar.brancheArr;
    const trunkArr = lunar.trunkArr;
    const trunkElements = this.trunkEE;
    const currTrunk = trunkArr[pilarIdx];
    const currBranche = brancheArr[pilarIdx];
    const brancheElement = currBranche.getElement();
    let resElement = new DataWithLog(brancheElement, "Initial Branche element");
    const trunkResultElement = trunkElements[pilarIdx].getValue().getElement();

    let hasCombinedStatus = false;
    const brancheForce = this.brancheForceArr;
    const sourceName = DataWithLog.getBrancheHeader(pilarIdx);
    //Ref3p341
    const maxBranchValue = 30;
    let points = new DataWithLog(
      maxBranchValue,
      sourceName + " Initial Force ( 360/( 12 branches ) )"
    );
    if (BaziHelper.hasSameSeasonCombination(brancheArr, pilarIdx)) {
      // Ref3p342
      resElement = BrancheRelation.getTransformableSeasonCombination(
        brancheArr[pilarIdx]
      );
      points.addData(
        -6,
        DataWithLog.currLog.getDetail() + ": Same season combination"
      );
      hasCombinedStatus = true;
    } else if (BaziHelper.hasCombOf3(lunar, pilarIdx)) {
      // Ref3p342
      resElement = BrancheRelation.getCombinaisonResultElement(
        brancheArr[pilarIdx]
      );
      points.addData(
        -10,
        sourceName + this.getCurrLog() + ": Combination of 3 (San He)"
      );
      hasCombinedStatus = true;
    } else {
      if (BaziHelper.hasMidCombination(trunkArr, brancheArr, pilarIdx)) {
        resElement = BrancheRelation.getCombinaisonResultElement(
          brancheArr[pilarIdx]
        );
        points.addValue(
          -10,
          sourceName + ": Partial Combination of 3 (San He)",
          this.getCurrLog()
        );
        hasCombinedStatus = true;
      }
    }

    if (BaziHelper.hasTransformPlusWithTransform(lunar, pilarIdx)) {
      // Ref3p344 Check compatibility principal element of month branch
      if (!hasCombinedStatus) {
        resElement = BrancheRelation.getTransformResultElement(
          brancheArr[pilarIdx]
        );
        hasCombinedStatus = true;
        points.updateValue(18, "Unique combination of 2");
      } else {
        // Ref3p344
        this.setOnlyPrincipalForce(
          brancheForce,
          pilarIdx,
          this.getPrincipalForce(currBranche)
        );
        const hiddenForce = this.getMainHiddenForceData(pilarIdx);
        points.updateValue(
          hiddenForce.getValue(),
          sourceName + "Multiple combination of 2",
          hiddenForce.getDetail()
        );
      }
    } else if (
      BaziHelper.hasTransformPlus(brancheArr, pilarIdx, this.brMonthElement)
    ) {
      if (this.isConcurenceTransformPlus(brancheArr, pilarIdx)) {
        this.setOnlyPrincipalForce(
          brancheForce,
          pilarIdx,
          points.getValue(),
          points.getDetail()
        );
        const hiddenForce = this.getMainHiddenForceData(pilarIdx);
        points.updateValue(
          hiddenForce.getValue(),
          sourceName + "Combination of 2 without transform ",
          hiddenForce.getDetail()
        );
      }
    }

    // Ref3p343 check transform possibility
    // Ref3p343 Notice

    if (hasCombinedStatus) {
      // Ref3p343, p344 + Ref3p351
      if (this.isBrancheELementInTrunk(lunar, resElement.getValue())) {
        points.addValue(0, sourceName, this.getCurrLog()); // Keep current combined element and points
      } else {
        resElement = new DataWithLog(
          brancheElement,
          sourceName + " use branche element "
        );
        const dataLog = this.getMainHiddenForceData(pilarIdx);
        points.updateValue(
          dataLog.getValue(),
          sourceName + " is unique, must take main hidden force value ",
          dataLog.getDetail()
        );
      }
    } else {
      // Ref3p341, 342
      if (this.trunkForceArr[pilarIdx].getValue() >= 18) {
        if (
          BaziHelper.getRelation(
            trunkResultElement,
            brancheElement
          ).isFavorable()
        ) {
          points.addData(6, "Has trunk force>18");
        } else if (trunkResultElement.isDestructive(brancheElement)) {
          points.addData(
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
      if (this.hasClash(brancheArr, pilarIdx)) {
        let principalHiddenForce = this.getPrincipalForce(currBranche);
        if (
          this.hasClash(brancheArr, pilarIdx - 1) &&
          this.hasClash(brancheArr, pilarIdx + 1)
        ) {
          principalHiddenForce = principalHiddenForce / 3;
        } else {
          principalHiddenForce -= principalHiddenForce / 3;
        }
        points.updateValue(principalHiddenForce, " Clash ");
        this.setOnlyPrincipalForce(
          brancheForce,
          pilarIdx,
          principalHiddenForce
        );
      }
    }

    this.avoidZeroForce(points, sourceName);

    brancheForce[0][pilarIdx] = points;
  }

  evalBrancheForce(lunar: Lunar) {
    this.brancheForceArr = ObjectHelper.newMatrix(
      LunarBase.PILARS_LEN,
      LunarBase.PILARS_LEN,
      null
    );
    this.initHiddenTrunkForce(lunar);
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      this.setBranchePoints(lunar, pilarIdx);
    }
  }

  evalRootPresentStatus(lunar: Lunar) {
    const bArr = lunar.brancheArr;
    const tArr = lunar.trunkArr;
    this.rootPresent = [];
    for (let j = 0; j < LunarBase.PILARS_LEN; j++) {
      const hiddenTrunk = BrancheHelper.getHiddenTrunk(bArr[j]);
      let hasSameElement = false;
      for (let i = 0; i < hiddenTrunk.length; i++) {
        if (ObjectHelper.isNaN(this.trunkEE)) {
          hasSameElement =
            tArr[j].elementNEnergy === hiddenTrunk[i].elementNEnergy;
        } else {
          hasSameElement =
            this.trunkEE[j].getValue().getElement() ===
            hiddenTrunk[i].getElement();
        }
        if (hasSameElement) {
          break;
        }
      }
      this.rootPresent.push(hasSameElement);
    }
  }

  evalElementNEnergyForce(lunar: Lunar) {
    const len = ElementNEnergy.getValues().length;
    const brancheArr = lunar.brancheArr;
    this.elementNEnergyForce = DataWithLog.newDataArray(len);
    // exclude lIndex
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      // Trunc element's force
      const ee = this.trunkEE[pilarIdx].getValue();
      this.elementNEnergyForce[ee.ordinal()].addData(
        this.trunkForceArr[pilarIdx],
        DataWithLog.getTrunkHeader(pilarIdx)
      );
      const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(brancheArr[pilarIdx]);
      const hLen = hiddenTrunkArr.length;
      // The main hidden trunk is the same as the transformed branche element
      this.elementNEnergyForce[
        this.brancheEE[pilarIdx].getValue().ordinal()
      ].addData(
        this.brancheForceArr[this.brancheHiddenStartIdx][pilarIdx],
        DataWithLog.getBrancheHeader(pilarIdx) + "'s Main Hidden Trunk "
      );
      for (let i = 1; i < hLen; i++) {
        this.elementNEnergyForce[
          hiddenTrunkArr[i].elementNEnergy.ordinal()
        ].addData(
          this.brancheForceArr[this.brancheHiddenStartIdx + i][
            pilarIdx
          ].getValue(),
          DataWithLog.getBrancheHeader(pilarIdx) + "'s non Main Hidden Trunk "
        );
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
    const trunkArr = lunar.trunkArr;

    this.trunkTEE = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.brancheTEE = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.dayHiddenRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.trunkRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.brancheRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    this.brancheTrunkRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);
    const brancheBrRelation = ObjectHelper.newMatrix(MAX_LEN, MAX_LEN, null);

    for (let pilarCol = 0; pilarCol < MAX_LEN; pilarCol++) {
      for (let i = 0; i < MAX_LEN; i++) {
        this.trunkTEE[pilarCol][i] = this.trunkEE[pilarCol].getValue();
        this.brancheTEE[pilarCol][i] = this.brancheEE[pilarCol].getValue();
      }
    }
    for (let pilarCol = 0; pilarCol < MAX_LEN; pilarCol++) {
      for (let j = 0; j < MAX_LEN; j++) {
        // j-->pilarCol: The transformed result effect is on the source
        this.trunkRelation[j][pilarCol] = BaziHelper.getEnNRelation(
          this.trunkEE[j].getValue(),
          this.trunkEE[pilarCol].getValue()
        );
        // trunkEE already contains the transformed result
        this.trunkTEE[j][pilarCol] = this.trunkEE[pilarCol].getValue();
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
        if (
          brancheBrRelation[j][pilarCol] === BrancheRelation.TRANSFORMPLUS ||
          brancheBrRelation[j][pilarCol] === BrancheRelation.TRANSFORMRESTRICT
        ) {
          this.brancheTEE[j][pilarCol] = ElementNEnergy.getElementNEnergy(
            BrancheRelation.getTransformResultElement(fromBranche).getValue(),
            fromBranche.getEnergy()
          );
        }
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
    this.evalMonthElement(lunar);
    this.evalComb5(lunar);
    this.evalRootPresentStatus(lunar);
    this.evalTrunkEEArr(lunar);
    this.evalBrancheEEArr(lunar);

    // Second pass for brMonthElement
    this.brMonthElement = this.brancheEE[LunarBase.MINDEX]
      .getValue()
      .getElement();
    CombListHelper.setupAllCombinations(lunar);
    this.evalTrunkForce(lunar);
    this.evalBrancheForce(lunar);
    //Final pass
    this.evalMonthElement(lunar);
    this.evalComb5(lunar);
    this.evalTrunkEEArr(lunar);
    this.evalBrancheEEArr(lunar);
    this.evalRootPresentStatus(lunar);

  }

  getGeneratedDeityCase() {
    return (
      this.eerCount[ElementNEnergyRelation.GE.ordinal()] +
      this.eerCount[ElementNEnergyRelation.GC.ordinal()]
    );
  }
}
