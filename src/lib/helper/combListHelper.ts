import { CombAttr, CombinationList } from "../mt-data/bazi/combinationList";
import { Lunar } from "../mt-data/bazi/lunar";
import { Element } from "../mt-data/feng-shui/element";
import { LunarBase } from "../mt-data/bazi/lunarBase";
import { PilarsAttr } from "../mt-data/bazi/pilarsAttr";
import { BrancheHelper } from "./brancheHelper";
import { ObjectHelper } from "./objectHelper";
import { TrunkHelper } from "./trunkHelper";
import { BaziHelper } from "./baziHelper";
import { BrancheRelation } from "../mt-data/bazi/brancheRelation";
import { Branche } from "../mt-data/bazi/branche";
import { PilarBase } from "../mt-data/bazi/pilarBase";

export class CombListHelper {
  static logMe = false;


  static getData(combAttr: CombAttr, lunar: Lunar, idx: number) {
    const isInTrunk = ObjectHelper.hasItem(combAttr.trunkAttrs, idx);
    if (combAttr.isTrunkData()) {
      if (isInTrunk) {
        return lunar.pilars[idx].trunk;
      }
    }
    const isInBranche = ObjectHelper.hasItem(combAttr.branchAttrs, idx);
    if (combAttr.isBrancheData()) {
      if (isInBranche) {
        return lunar.pilars[idx].branche;
      }
    }

    if (isInTrunk && isInBranche) {
      // Hidden trunk
      const hiddenTrunk = BrancheHelper.getHiddenTrunk(lunar.pilars[idx].branche);
      return hiddenTrunk[idx];
    }
    return "Label.NA";
  }

  //Ref3p336 cas 1 with month branche
  static evalElementInMonthReason(lunar: Lunar, checkElement: Element) {
    if (checkElement === lunar.pilarsAttr.brMonthElement)
      return " Same month " + lunar.pilars[LunarBase.MINDEX].branche + " element ";

    const hiddenTrunkArr = BrancheHelper.getHiddenTrunk(
      lunar.pilars[LunarBase.MINDEX].branche
    );

    for (let i = 0; i < hiddenTrunkArr.length; i++) {
      const eeHtr = hiddenTrunkArr[i].getElement();
      if (eeHtr === checkElement) {
        if (!ObjectHelper.isNaN(lunar.pilarsAttr.hiddenTrunkForceArr)) {
          if (
            lunar.pilarsAttr.hiddenTrunkForceArr[i][
              LunarBase.MINDEX
            ].getValue() > 3
          ) {
            return (
              " Same Month non weaked hidden trunk " +
              hiddenTrunkArr[i] +
              " element "
            );
          }
        } else {
          return " Same Month pilar hidden trunk " + hiddenTrunkArr[i] + " element " + checkElement;
        }
      }
    }
    return null;
  }

  // Ref3p336
  static checkComb5ElementsType0(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number
  ) {
    let res = TrunkHelper.isTransformable(lunar.getPilar(pilarIdx1), lunar.getPilar(pilarIdx2));
    if (res) {
      lunar.pilarsAttr.combList.addTrunkComb5(
        CombAttr.TRUNKCOMB5TYPE,
        pilarIdx1,
        pilarIdx2
      );
    }
  }

  // Ref3p336 ???
  //
  static checkComb5ElementsType1(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number
  ) {
    const pilar1=lunar.getPilar(pilarIdx1);
    if (TrunkHelper.isTransformable(pilar1, lunar.getPilar(pilarIdx2))){
      const trElement = TrunkHelper.getTransformElement(pilar1.trunk);
      const sameKindOfMonthOrHiddenTrunk = this.evalElementInMonthReason(
        lunar,
        trElement
      );
      if (sameKindOfMonthOrHiddenTrunk != null) {
        lunar.pilarsAttr.combList.addTrunkComb5(
          CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
          pilarIdx1,
          pilarIdx2,
          trElement,
          sameKindOfMonthOrHiddenTrunk
        );
      }
    }
  }

  // Ref3p337 Cas2
  //
  static checkComb5ElementsType2(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number
  ) {
    const eTrMonthElement = lunar.pilarsAttr.brMonthElement;
    const pilar1=lunar.getPilar(pilarIdx1);
    let res = TrunkHelper.isTransformable(pilar1, lunar.getPilar(pilarIdx2));
    if (res) {
      const tranformedElement = TrunkHelper.getTransformElement(pilar1.trunk);
      const pilar1BrElement = lunar.pilars[pilarIdx1].branche.getElement();
      const pilar2BrElement = lunar.pilars[pilarIdx2].branche.getElement();
      if (
        pilar1BrElement === tranformedElement &&
        pilar2BrElement === tranformedElement &&
        eTrMonthElement === tranformedElement
      ) {
        lunar.pilarsAttr.combList.addTrunkComb5(
          CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
          pilarIdx1,
          pilarIdx2,
          tranformedElement,
          "Both Branches and Transformed element is same as Month element " +
            eTrMonthElement
        );
      }
    }
  }

  // Ref3p337Cas 3
  //
  static checkComb5ElementsType3(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number
  ) {
    const eTrMonthElement = lunar.pilarsAttr.brMonthElement;
    const pilar1=lunar.getPilar(pilarIdx1);
    if (TrunkHelper.isTransformable(pilar1, lunar.getPilar(pilarIdx2))) {
      const tranformedElement = TrunkHelper.getTransformElement(pilar1.trunk);
      const pilar1BrElement = lunar.pilars[pilarIdx1].branche.getElement();
      const pilar2BrElement = lunar.pilars[pilarIdx2].branche.getElement();
      if (
        BaziHelper.getRelation(
          pilar1BrElement,
          tranformedElement
        ).isFavorable() &&
        BaziHelper.getRelation(pilar2BrElement, tranformedElement).isFavorable()
      ) {
        if (tranformedElement === eTrMonthElement) {
          lunar.pilarsAttr.combList.addTrunkComb5(
            CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
            pilarIdx1,
            pilarIdx2,
            tranformedElement,
            "Same Transformed, Month element " +
              eTrMonthElement +
              " with Branche element's productive relation to them "
          );
        }
      }
    }
  }

  static hasBaseCombOf3(lunar: Lunar, checkPilarIdx: number) {
    let count = 0;
    const checkBranche = lunar.pilars[checkPilarIdx].branche;
    let hasTrunkElementCompatibleWithTransformedElement = false;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (pilarIdx !== checkPilarIdx) {
        const branche = lunar.pilars[pilarIdx].branche;
        if (
          BrancheHelper.getMainRelation(branche, checkBranche) ===
          BrancheRelation.COMBINATION
        ) {
          count++;
          if (
            lunar.pilars[pilarIdx].trunk.getElement() ===
            BrancheRelation.getCombinaisonResultElement(branche).getValue()
          ) {
            hasTrunkElementCompatibleWithTransformedElement = true;
          }
        }
      }
    }
    return count >= 2 && hasTrunkElementCompatibleWithTransformedElement;
  }

  static getBaseCombOf3(
    lunar: Lunar,
    checkPilarIdx: number,
    checkTransform: boolean,
    checkMidComb3: boolean
  ) {
    let comb3Branches = [checkPilarIdx];
    const checkBranche = lunar.pilars[checkPilarIdx].branche;
    const brancheList: Branche[] = [lunar.pilars[checkPilarIdx].branche];
    let maxHit = 3;
    let checkRange = 3;
    if (checkMidComb3) {
      maxHit = 2;
      checkRange = 1;
    }
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (pilarIdx !== checkPilarIdx) {
        if (Math.abs(checkPilarIdx - pilarIdx) <= checkRange) {
          const branche = lunar.pilars[pilarIdx].branche;
          if (
            BrancheHelper.getMainRelation(branche, checkBranche) ===
            BrancheRelation.COMBINATION
          ) {
            if (!ObjectHelper.hasItem(brancheList, branche)) {
              comb3Branches.push(pilarIdx);
              brancheList.push(branche);
            }
          }
        }
      }
    }
    if (comb3Branches.length >= maxHit) {
      let isTransformable = !checkTransform;
      if (checkTransform) {
        // Ref3p343
        const transformElement =
          BrancheRelation.getCombinaisonResultElement(checkBranche).getValue();
        isTransformable = BaziHelper.isBrancheElementAppearInTrunk(
          lunar,
          transformElement
        );
        if (!isTransformable) {
          //Check Ref3p337 Case 4
          const combList = lunar.pilarsAttr.combList;
          const comb5List = combList.getCombTypeAttrList(
            CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
            checkPilarIdx,
            transformElement
          );
          if (comb5List.length > 0) {
            isTransformable = true;
          }
        }
      }
      if (isTransformable) {
        return comb3Branches;
      }
    }
    return null;
  }

  static hasCombinationOf3(lunar: Lunar) {
    let count = 0;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (CombListHelper.hasBaseCombOf3(lunar, pilarIdx)) {
        count++;
      }
    }
    return count >= 3;
  }

  // Ref3p337 Cas 4
  static checkComb5ElementsType4(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number
  ) {
    const pilar1=lunar.getPilar(pilarIdx1);
    if (TrunkHelper.isTransformable(pilar1, lunar.getPilar(pilarIdx2))) {
      const eTrMonthElement = lunar.pilarsAttr.brMonthElement;
      const tranformedElement = TrunkHelper.getTransformElement(pilar1.trunk);
      if (CombListHelper.hasCombinationOf3(lunar)) {
        if (
          CombListHelper.hasBaseCombOf3(lunar, pilarIdx1) &&
          CombListHelper.hasBaseCombOf3(lunar, pilarIdx2)
        ) {
          const trBrancheElement = BrancheRelation.getCombinaisonResultElement(
            lunar.pilars[pilarIdx1].branche
          ).getValue();
          if (
            trBrancheElement === tranformedElement &&
            trBrancheElement === eTrMonthElement
          ) {
            lunar.pilarsAttr.combList.addTrunkComb5(
              CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
              pilarIdx1,
              pilarIdx2,
              tranformedElement,
              "Part of Combination of 3 and 5 with same element with month element " +
                eTrMonthElement
            );
          }
        }
      }
    }
  }

  // Ref3p337 Cas 5 or 6
  static checkComb5ElementsType5Or6(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number
  ) {
    const eTrMonthElement = lunar.pilarsAttr.brMonthElement;
    if (pilarIdx1 !== LunarBase.MINDEX) {
      if (pilarIdx2 !== LunarBase.MINDEX) {
        return;
      }
      pilarIdx2 = pilarIdx1;
      pilarIdx1 = LunarBase.MINDEX;
    }
    // pilarIdx1 is now LunarBase.MINDEX
    const pilar1=lunar.getPilar(pilarIdx1);
    const pilar2=lunar.getPilar(pilarIdx2);
    if (TrunkHelper.isTransformable(pilar1, pilar2)) {
      const trunk1Element = pilar1.trunk.getElement();
      const trunk2Element = pilar2.trunk.getElement();
      // Check trunk or trunk2 same element with eTrMonthElement
      if (
        trunk1Element === eTrMonthElement ||
        trunk2Element === eTrMonthElement
      ) {
        const branche2 = lunar.pilars[pilarIdx2].branche;
        let addInfo = "Label.Dominate.Spouse";
        if (
          trunk2Element === eTrMonthElement &&
          branche2.elementNEnergy.energy.isYang()
        ) {
          addInfo = "Label.Dominate.Husband";
        }
        lunar.pilarsAttr.combList.addTrunkComb5(
          CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE,
          pilarIdx1,
          pilarIdx2,
          eTrMonthElement,
          addInfo
        );
      }
    }
  }
  // Ref3p339
  static evalTrunkCombOf5Type(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number
  ) {
    // Assume that the two pilars are neigbored
    if (Math.abs(pilarIdx2 - pilarIdx1) === 1) {
      CombListHelper.checkComb5ElementsType0(lunar, pilarIdx1, pilarIdx2);
      CombListHelper.checkComb5ElementsType1(lunar, pilarIdx1, pilarIdx2);
      CombListHelper.checkComb5ElementsType2(lunar, pilarIdx1, pilarIdx2);
      CombListHelper.checkComb5ElementsType3(lunar, pilarIdx1, pilarIdx2);
      CombListHelper.checkComb5ElementsType4(lunar, pilarIdx1, pilarIdx2);
      CombListHelper.checkComb5ElementsType5Or6(lunar, pilarIdx1, pilarIdx2);
    }
  }

  static evalComb5(lunar: Lunar) {
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      let otherPilarIdx = pilarIdx + 1;
      if (otherPilarIdx < LunarBase.LINDEX) {
        CombListHelper.evalTrunkCombOf5Type(lunar, pilarIdx, otherPilarIdx);
      }
      otherPilarIdx = pilarIdx - 1;
      if (otherPilarIdx >= 0) {
        CombListHelper.evalTrunkCombOf5Type(lunar, pilarIdx, otherPilarIdx);
      }
    }
  }

  static evalComb3(lunar: Lunar) {
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      let comb3Branches = CombListHelper.getBaseCombOf3(
        lunar,
        pilarIdx,
        false,
        true
      );
      if (comb3Branches !== null) {
        lunar.pilarsAttr.combList.addBranchComb(
          CombAttr.MIDBRANCHECOMB3TYPE,
          comb3Branches
        );
        const transformElement = BrancheRelation.getCombinaisonResultElement(
          lunar.pilars[pilarIdx].branche
        ).getValue();

        comb3Branches = CombListHelper.getBaseCombOf3(
          lunar,
          pilarIdx,
          true,
          true
        );
        if (comb3Branches !== null) {
          lunar.pilarsAttr.combList.addBranchComb(
            CombAttr.MIDBRANCHECOMB3TRANSFORMABLETYPE,
            comb3Branches,
            transformElement
          );
        }
        comb3Branches = CombListHelper.getBaseCombOf3(
          lunar,
          pilarIdx,
          false,
          false
        );

        if (comb3Branches !== null) {
          lunar.pilarsAttr.combList.addBranchComb(
            CombAttr.BRANCHECOMB3TYPE,
            comb3Branches
          );
          comb3Branches = CombListHelper.getBaseCombOf3(
            lunar,
            pilarIdx,
            true,
            false
          );
          if (comb3Branches !== null) {
            lunar.pilarsAttr.combList.addBranchComb(
              CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE,
              comb3Branches,
              transformElement
            );
          }
        }
      }
    }
  }

  //Ref9 p136 San Hui
  static getSeasonCombination(lunar: Lunar, checkPilarIdx: number) {
    const checkSeason = lunar.pilars[checkPilarIdx].branche.season;
    const branchesIdx: number[] = [checkPilarIdx];
    const brancheList: Branche[] = [lunar.pilars[checkPilarIdx].branche];
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (pilarIdx !== checkPilarIdx) {
        const branche = lunar.pilars[pilarIdx].branche;
        if (branche.season === checkSeason) {
          // Must be non duplicated branche
          if (!ObjectHelper.hasItem(brancheList, branche)) {
            branchesIdx.push(pilarIdx);
            brancheList.push(branche);
          }
        }
      }
    }
    if (branchesIdx.length >= 3) {
      return branchesIdx;
    } else {
      return null;
    }
  }

  static evalCombSeason(lunar: Lunar) {
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const combSeasonBranches = CombListHelper.getSeasonCombination(
        lunar,
        pilarIdx
      );
      if (combSeasonBranches !== null) {
        const seasonElement = lunar.pilars[pilarIdx].branche.season.element
        let transformElement =
          BrancheRelation.getTransformableSeasonCombination(
            lunar.pilars[pilarIdx].branche
          ).getValue();
        lunar.pilarsAttr.combList.addBranchComb(
          CombAttr.BRANCHESEASONCOMBTYPE,
          combSeasonBranches,
          seasonElement,
          "Transformable under some conditions"
        );
        if (BaziHelper.isBrancheElementAppearInTrunk(lunar, transformElement)) {
          lunar.pilarsAttr.combList.addBranchComb(
            CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE,
            combSeasonBranches,
            transformElement
          );
        }
      }
    }
  }

  // Ref3p344
  static getLucHopPilars(lunar: Lunar, checkPilarIdx: number) {
    const pilars = lunar.pilars;
    const checkBranche = pilars[checkPilarIdx].branche;
    const branchesIdx: number[] = [checkPilarIdx];
    for (let index = 0; index < LunarBase.LINDEX; index++) {
      if (Math.abs(index - checkPilarIdx) === 1) {
        if (
          BrancheRelation.isRelationPresent(
            pilars[index].branche,
            checkBranche,
            BrancheRelation.TRANSFORMPLUS
          )
        ) {
          branchesIdx.push(index);
          if (branchesIdx.length === 2) break;
        }
      }
    }
    if (branchesIdx.length === 2) {
      return branchesIdx;
    } else {
      return null;
    }
  }

  static evalLucHop(lunar: Lunar) {
    const combList = lunar.pilarsAttr.combList;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (combList.existCombRelation(pilarIdx)) continue;
      // Ref3p344
      const combLucHop = CombListHelper.getLucHopPilars(lunar, pilarIdx);
      if (combLucHop !== null) {
        combList.addBranchComb(CombAttr.BRANCHECOMB6TYPE, combLucHop);
        // REF3p344 Check Transform condition.
        const checkBranche = lunar.pilars[pilarIdx].branche;
        let trElement =
          BrancheRelation.getTransformResultElement(checkBranche).getValue();
        const trMonthElement = lunar.pilarsAttr.brMonthElement;
        if (BaziHelper.getRelation(trMonthElement, trElement).isFavorable()) {
          combList.addBranchComb(
            CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE,
            combLucHop,
            trElement
          );
        } else {
          for (
            let trunkPilarIdx = 0;
            trunkPilarIdx < LunarBase.LINDEX;
            trunkPilarIdx++
          ) {
            if (lunar.pilars[trunkPilarIdx].trunk.getElement() === trElement) {
              combList.addBranchComb(
                CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE,
                combLucHop,
                BrancheRelation.getTransformResultElement(
                  checkBranche
                ).getValue()
              );
              break;
            }
          }
        }
      }
    }
  }

  static getNeighBorRelation(
    lunar: Lunar,
    relation: BrancheRelation,
    checkPilarIdx: number
  ) {
    const checkBranche = lunar.pilars[checkPilarIdx].branche;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (Math.abs(pilarIdx - checkPilarIdx) === 1) {
        if (
          BrancheRelation.isRelationPresent(
            lunar.pilars[pilarIdx].branche,
            checkBranche,
            relation
          )
        ) {
          return [checkPilarIdx, pilarIdx];
        }
      }
    }
    return null;
  }

  static evalBranchePairComb(
    lunar: Lunar,
    relation: BrancheRelation,
    type: number
  ) {
    const combList = lunar.pilarsAttr.combList;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (combList.existCombRelation(pilarIdx)) continue;
      const branchesInjury = CombListHelper.getNeighBorRelation(
        lunar,
        relation,
        pilarIdx
      );
      if (branchesInjury !== null) {
        combList.addBranchComb(
          CombAttr.BRANCHECLASHTYPE,
          branchesInjury
        );
        combList.addBranchComb(type, branchesInjury);
      }
    }
  }

  static canPilarBoost(
    sources: PilarBase[],
    checkElement: Element,
    useOnlyMainHiddenTrunk?: boolean
  ): boolean {
    let count = 0;
    if (typeof useOnlyMainHiddenTrunk === "undefined")
      useOnlyMainHiddenTrunk = false;
    for (let index = 0; index < sources.length; index++) {
      const source = sources[index].branche;
      if (source.getElement() === checkElement) count++;
      const hiddenTrunks = BrancheHelper.getHiddenTrunk(source);
      for (let index = 0; index < hiddenTrunks.length; index++) {
        const element = hiddenTrunks[index].getElement();
        if (element === checkElement) count++;
        if (useOnlyMainHiddenTrunk) break;
      }
    }
    return count > 0;
  }

  static canBoost(
    sources: Branche[],
    checkElement: Element,
    useOnlyMainHiddenTrunk?: boolean
  ): boolean {
    let count = 0;
    if (typeof useOnlyMainHiddenTrunk === "undefined")
      useOnlyMainHiddenTrunk = false;
    for (let index = 0; index < sources.length; index++) {
      const source = sources[index];
      if (source.getElement() === checkElement) count++;
      const hiddenTrunks = BrancheHelper.getHiddenTrunk(source);
      for (let index = 0; index < hiddenTrunks.length; index++) {
        const element = hiddenTrunks[index].getElement();
        if (element === checkElement) count++;
        if (useOnlyMainHiddenTrunk) break;
      }
    }
    return count > 0;
  }

  // Ref3p333Case2
  static evalRootSupportWith3BrancheCombination(
    lunar: Lunar,
    combType: number
  ) {
    const pilars = lunar.pilars;
    const pilarsAttr = lunar.pilarsAttr;
    const combList = pilarsAttr.combList;
    const checkBrancheIdxArr = combList.getPilarsIdxWithNoBrancheRelationType(combType);
    const checkBranches: Branche[] = [];
    for (let index = 0; index < checkBrancheIdxArr.length; index++) {
      const pilarIdx = checkBrancheIdxArr[index];
      checkBranches.push(pilars[pilarIdx].branche);
    }
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const pilarElement = pilars[pilarIdx].trunk.getElement();
      let boosted = false;
      const combTypeAttrList = combList.getCombTypeAttrList(combType, pilarIdx);
      if (combTypeAttrList.length >= 1) {
        const transformedElement = combTypeAttrList[0].resultData;
        boosted = transformedElement.isFavorable(pilarElement);
      }
      if (!boosted) {
        // Check if boosted be the non contributor branche
        boosted = CombListHelper.canBoost(checkBranches, pilarElement);
      }
      if (boosted) {
        combList.addTrunkComb(CombAttr.TRUNKISSUPPORTEDTYPE1, [pilarIdx]);
      }
    }
  }

  //Ref3p333
  static evalTrunkSupportType(lunar: Lunar) {
    const pilars = lunar.pilars;
    const combList = lunar.pilarsAttr.combList;
    if (
      combList.existRelationType(CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE)
    ) {
      //Ref3p333 cas 2 for season
      CombListHelper.evalRootSupportWith3BrancheCombination(
        lunar,
        CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE
      );
    } else if (
      combList.existRelationType(CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE)
    ) {
      //Ref3p333 cas 2 for comb3
      CombListHelper.evalRootSupportWith3BrancheCombination(
        lunar,
        CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE
      );
    } else if (
      combList.existRelationType(CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE)
    ) {
      //Ref3p333 cas 2 for luc nhi hop
      CombListHelper.evalRootSupportWith3BrancheCombination(
        lunar,
        CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE
      );
    } else {
      // Ref3p335 cas 3 pas de transformation
      // Ref3p346 example 1: No clash
      for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
        const element = pilars[pilarIdx].trunk.getElement();
        const hasClash = combList.existClashRelation(pilarIdx);
        if (CombListHelper.canPilarBoost(pilars, element, hasClash)) {
          combList.addTrunkComb(CombAttr.TRUNKISSUPPORTEDTYPE1, [pilarIdx]);
        }
        for (let otherPilarIdx = pilarIdx+1; otherPilarIdx < LunarBase.LINDEX; otherPilarIdx++) {
          if ( pilars[pilarIdx].isTrunkClashed(pilars[otherPilarIdx]) ) {
            combList.addTrunkComb(CombAttr.TRUNKCLASHTYPE, [pilarIdx,otherPilarIdx]);
          }
        }
      }
    }
  }

  static hasMidCombination(lunar: Lunar, idx: number) {
    let res = lunar.pilarsAttr.combList.existBrancheRelationType(
      CombAttr.MIDBRANCHECOMB3TRANSFORMABLETYPE,
      idx
    );
    return res;
  }

  // Combination of 3 (San He)
  // Ref 3 p334
  // Ref 9 p137
  static hasCombOf3(lunar: Lunar, idx: number) {
    let res = lunar.pilarsAttr.combList.existBrancheRelationType(
      CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE,
      idx
    );
    return res;
  }

  static hasSameSeasonCombination(lunar: Lunar, idx: number): boolean {
    let res = lunar.pilarsAttr.combList.existBrancheRelationType(
      CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE,
      idx
    );
    return res;
  }

  static hasTransformPlusWithTransform(lunar: Lunar, idx: number) {
    let res = lunar.pilarsAttr.combList.existBrancheRelationType(
      CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE,
      idx
    );
    return res;
  }

  static hasTransformPlus(lunar: Lunar, idx: number) {
    let res = lunar.pilarsAttr.combList.existBrancheRelationType(
      CombAttr.BRANCHECOMB6TYPE,
      idx
    );
    return res;
  }

  static hasClashRelation(lunar: Lunar, idx: number) {
    let res = lunar.pilarsAttr.combList.existClashRelation(idx);
    return res;
  }

  static hasMultipleComb6(lunar: Lunar, checkPilarIdx: number) {
    let combAttrList = lunar.pilarsAttr.combList.getCombTypeAttrList(
      CombAttr.BRANCHECOMB6TYPE,
      checkPilarIdx
    );
    return combAttrList.length > 1;
  }

  static setupAllCombinations(lunar: Lunar) {
    lunar.pilarsAttr.combList = new CombinationList();
    CombListHelper.evalComb5(lunar);
    CombListHelper.evalComb3(lunar);
    CombListHelper.evalCombSeason(lunar);
    // Must be after combinaison
    CombListHelper.evalLucHop(lunar);
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.INJURY,
      CombAttr.BRANCHEINJURYTYPE
    );
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.AGRESSIVE,
      CombAttr.BRANCHEUNGRATEFUL
    );
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.DISRESPECFUL,
      CombAttr.BRANCHEBULLYINGTYPE
    );
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.SCANDALOUS,
      CombAttr.BRANCHESUNCIVIZEDTYPE
    );
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.AUTOPUNITION,
      CombAttr.BRANCHEAUTOPUNITIONTYPE
    );
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.DESTROY,
      CombAttr.BRANCHEDESTROYTYPE
    );
    // Must be done after combination evaluation
    // Reason: use their result
    CombListHelper.evalTrunkSupportType(lunar);
  }
}
