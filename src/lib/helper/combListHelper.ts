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
import { Trunk } from "../mt-data/bazi/trunk";
import { Branche } from "../mt-data/bazi/branche";

export class CombListHelper {
  static brancheHiddenStartIdx = 1;
  static logMe = false;

  static getData(combAttr: CombAttr, lunar: Lunar, idx: number) {
    const isInTrunk = ObjectHelper.hasItem(combAttr.trunkAttrs, idx);
    if (combAttr.isTrunkData()) {
      if (isInTrunk) {
        return lunar.trunkArr[idx];
      }
    }
    const isInBranche = ObjectHelper.hasItem(combAttr.branchAttrs, idx);
    if (combAttr.isBrancheData()) {
      if (isInBranche) {
        return lunar.brancheArr[idx];
      }
    }

    if (isInTrunk && isInBranche) {
      // Hidden trunk
      const hiddenTrunk = BrancheHelper.getHiddenTrunk(lunar.brancheArr[idx]);
      return hiddenTrunk[idx];
    }
    return "Label.NA";
  }

  //Ref3p336 cas 1 with month branche
  static isElementInMonthHiddenTrunk(lunar: Lunar, checkElement: Element) {
    if (checkElement === lunar.pilarsAttr.brMonthElement) return true;

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
  static isElementInNonWeakForceHiddenTrunk(
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
        if (!ObjectHelper.isNaN(lunar.pilarsAttr.brancheForceArr)) {
          if (
            lunar.pilarsAttr.brancheForceArr[
              i + CombListHelper.brancheHiddenStartIdx
            ][pilarIdx].getValue() > 3
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }


  // Ref3p336
  static checkComb5ElementsType0(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number
  ) {
    const trunk1 = lunar.trunkArr[pilarIdx1];
    const trunk2 = lunar.trunkArr[pilarIdx2];

    let res = TrunkHelper.isTransformable(trunk1, trunk2);
    if (res) {
      const tranfElement = TrunkHelper.getTransformElement(trunk1);
      if (this.isElementInMonthHiddenTrunk(lunar, tranfElement)) {
        lunar.pilarsAttr.combList.addTrunkComb5(
          CombAttr.TRUNKCOMB5TYPE0,
          pilarIdx1,
          pilarIdx2
        );
      }
    }
  }

  // Ref3p336 ???
  //
  static checkComb5ElementsType1(
    lunar: Lunar,
    pilarIdx1: number,
    pilarIdx2: number
  ) {
    const eTrMonthElement = lunar.pilarsAttr.brMonthElement;
    const trunkArr = lunar.trunkArr;
    const trunk1 = trunkArr[pilarIdx1];
    const trunk2 = trunkArr[pilarIdx2];
    if (TrunkHelper.isTransformable(trunk1, trunk2)) {
      const trElement = TrunkHelper.getTransformElement(trunk1);
      if (eTrMonthElement === trElement) {
        lunar.pilarsAttr.combList.addTrunkComb5(
          CombAttr.TRUNKCOMB5TYPE1,
          pilarIdx1,
          pilarIdx2
        );
      }
      // Not true with example 6 Ref3page350
      // Check the force of the hidden trunks
      // if ( hasNoSecondaryHiddenForce(bazi,Bazi.mIndex,eTrMonthElement) ) return false ;
      // Return true if the transformed element is present with some non weak force in hidden trunk
      // See Ref Ref3p349ex5
      if (
        CombListHelper.isElementInNonWeakForceHiddenTrunk(
          lunar,
          LunarBase.MINDEX,
          trElement
        )
      ) {
        lunar.pilarsAttr.combList.addTrunkComb5(
          CombAttr.TRUNKCOMB5TYPE1,
          pilarIdx1,
          pilarIdx2
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
    const trunk1 = lunar.trunkArr[pilarIdx1];
    const trunk2 = lunar.trunkArr[pilarIdx2];
    let res = TrunkHelper.isTransformable(trunk1, trunk2);
    if (res) {
      const tranformedElement = TrunkHelper.getTransformElement(trunk1);
      const pilar1BrElement = lunar.brancheArr[pilarIdx1].getElement();
      const pilar2BrElement = lunar.brancheArr[pilarIdx2].getElement();
      if (
        pilar1BrElement === tranformedElement &&
        pilar2BrElement === tranformedElement &&
        eTrMonthElement === tranformedElement
      ) {
        lunar.pilarsAttr.combList.addTrunkComb5(
          CombAttr.TRUNKCOMB5TYPE2,
          pilarIdx1,
          pilarIdx2
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
    const trunk1 = lunar.trunkArr[pilarIdx1];
    const trunk2 = lunar.trunkArr[pilarIdx2];
    if (TrunkHelper.isTransformable(trunk1, trunk2)) {
      const tranformedElement = TrunkHelper.getTransformElement(trunk1);
      const pilar1BrElement = lunar.brancheArr[pilarIdx1].getElement();
      const pilar2BrElement = lunar.brancheArr[pilarIdx2].getElement();
      if (
        BaziHelper.getRelation(
          pilar1BrElement,
          tranformedElement
        ).isFavorable() &&
        BaziHelper.getRelation(pilar2BrElement, tranformedElement).isFavorable()
      ) {
        if (tranformedElement === eTrMonthElement) {
          lunar.pilarsAttr.combList.addTrunkComb5(
            CombAttr.TRUNKCOMB5TYPE3,
            pilarIdx1,
            pilarIdx2
          );
        }
      }
    }
  }

  static hasBaseCombOf3(lunar: Lunar, checkPilarIdx: number) {
    let count = 0;
    const checkBranche = lunar.brancheArr[checkPilarIdx];
    let hasTrunkElementCompatibleWithTransformedElement = false;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (pilarIdx !== checkPilarIdx) {
        const branche = lunar.brancheArr[pilarIdx];
        if (
          BrancheHelper.getUniqueRelation(branche, checkBranche) ===
          BrancheRelation.COMBINATION
        ) {
          count++;
          if (
            lunar.trunkArr[pilarIdx].getElement() ===
            BrancheRelation.getCombinaisonResultElement(branche).getValue()
          ) {
            hasTrunkElementCompatibleWithTransformedElement = true;
          }
        }
      }
    }
    return count >= 2 && hasTrunkElementCompatibleWithTransformedElement;
  }

  static isElementPresentIntrunk(lunar:Lunar, checkElement: Element) {
    let res = false;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (
        lunar.trunkArr[pilarIdx].getElement() === checkElement
      ) {
        res = true;
        break;
      }
    }
    return res ;
  }

  static getBaseCombOf3(
    lunar: Lunar,
    checkPilarIdx: number,
    checkTransform: boolean,
    checkMidComb3: boolean
  ) {
    let comb3Branches = [checkPilarIdx];
    const checkBranche = lunar.brancheArr[checkPilarIdx];
    const brancheList: Branche[] = [lunar.brancheArr[checkPilarIdx]];
    let maxHit = 3;
    if (checkMidComb3) maxHit = 2;
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (pilarIdx !== checkPilarIdx) {
        const branche = lunar.brancheArr[pilarIdx];
        if (
          BrancheHelper.getUniqueRelation(branche, checkBranche) ===
          BrancheRelation.COMBINATION
        ) {
          if ( !ObjectHelper.hasItem(brancheList,branche) ) {
             comb3Branches.push(pilarIdx);
             brancheList.push(branche);
          }
        }
      }
    }

    if (comb3Branches.length >= maxHit) {
      let isTransformable = !checkTransform ;
      if (checkTransform) {
        // Ref3p343
        const transformElement = BrancheRelation.getCombinaisonResultElement(checkBranche).getValue();
        isTransformable = CombListHelper.isElementPresentIntrunk(lunar,transformElement);
      }
      if ( isTransformable ) {
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
    const eTrMonthElement = lunar.pilarsAttr.brMonthElement;
    const trunk1 = lunar.trunkArr[pilarIdx1];
    const trunk2 = lunar.trunkArr[pilarIdx2];
    if (TrunkHelper.isTransformable(trunk1, trunk2)) {
      const tranformedElement = TrunkHelper.getTransformElement(trunk1);
      if (CombListHelper.hasCombinationOf3(lunar)) {
        const trBrancheElement = BrancheRelation.getCombinaisonResultElement(
          lunar.brancheArr[pilarIdx1]
        ).getValue();
        if (
          BaziHelper.getRelation(
            trBrancheElement,
            tranformedElement
          ).isFavorable()
        ) {
          if (tranformedElement === eTrMonthElement) {
            lunar.pilarsAttr.combList.addTrunkComb5(
              CombAttr.TRUNKCOMB5TYPE4,
              pilarIdx1,
              pilarIdx2
            );
          }
        }
      }
    }
  }

  // Ref3p337 Cas 5 or 6
  // DeityHelper
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
    const trunk1 = lunar.trunkArr[pilarIdx1];
    const trunk2 = lunar.trunkArr[pilarIdx2];

    let res = TrunkHelper.isTransformable(trunk1, trunk2);
    if (res) {
      const trunk1Element = trunk1.getElement();
      const trunk2Element = trunk2.getElement();
      // Check trunk or trunk2 same element with eTrMonthElement
      if (
        trunk1Element === eTrMonthElement ||
        trunk2Element === eTrMonthElement
      ) {
        const branche1 = lunar.brancheArr[pilarIdx1];
        const branche2 = lunar.brancheArr[pilarIdx2];
        let combType = CombAttr.TRUNKCOMB5TYPE5;
        if (
          trunk1Element === eTrMonthElement &&
          branche1.elementNEnergy.energy.isYang()
        ) {
          combType = CombAttr.TRUNKCOMB5TYPE6;
        }
        if (
          trunk2Element === eTrMonthElement &&
          branche2.elementNEnergy.energy.isYang()
        ) {
          combType = CombAttr.TRUNKCOMB5TYPE6;
        }
        lunar.pilarsAttr.combList.addTrunkComb5(combType, pilarIdx1, pilarIdx2);
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
              BrancheRelation.getCombinaisonResultElement(
                lunar.brancheArr[pilarIdx]
              ).getValue()
            );
          }
        }

        break;
      }
    }
  }

  static getSeasonCombination(lunar: Lunar, checkPilarIdx: number) {
    const checkSeason = lunar.brancheArr[checkPilarIdx].season;
    const branchesIdx: number[] = [checkPilarIdx];
    const brancheList: Branche[] = [lunar.brancheArr[checkPilarIdx]];
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (pilarIdx !== checkPilarIdx) {
        const branche = lunar.brancheArr[pilarIdx];
        if (branche.season === checkSeason) {
          // Must be non duplicated branche
          if ( !ObjectHelper.hasItem(brancheList,branche) ) {
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
        let transformElement= BrancheRelation.getTransformableSeasonCombination(
          lunar.brancheArr[pilarIdx]
        ).getValue();
        let combType = CombAttr.BRANCHESEASONCOMBTYPE;
        if (CombListHelper.isElementPresentIntrunk(lunar,transformElement)) {
          combType = CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE;
        } else {
          transformElement = null;
        }
        lunar.pilarsAttr.combList.addBranchComb(
          combType,
          combSeasonBranches,
          transformElement
        );
        // Seems to have only one case break;
      }
    }
  }

  // Ref3p344
  static getLucHopPilars(lunar: Lunar, checkPilarIdx: number) {
    const bArr = lunar.brancheArr;
    const checkBranche = bArr[checkPilarIdx];
    const branchesIdx: number[] = [checkPilarIdx];
    for (let index = 0; index < LunarBase.LINDEX; index++) {
      if (Math.abs(index - checkPilarIdx) === 1) {
        if (
          BrancheRelation.isRelationPresent(
            bArr[index],
            checkBranche,
            BrancheRelation.TRANSFORMPLUS
          )
        ) {
          branchesIdx.push(index);
        }
      }
    }
    if (branchesIdx.length > 1) {
      return branchesIdx;
    } else {
      return null;
    }
  }

  static evalLucHop(lunar: Lunar) {
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const combLucHop = CombListHelper.getLucHopPilars(lunar, pilarIdx);
      if (combLucHop !== null) {
        lunar.pilarsAttr.combList.addBranchComb(
          CombAttr.BRANCHECOMB6TYPE,
          combLucHop,

        );
        // REF3p344 Check Transform condition.
        const checkBranche = lunar.brancheArr[pilarIdx];
        let trElement =
          BrancheRelation.getTransformResultElement(checkBranche).getValue();
        const trMonthElement = lunar.pilarsAttr.brMonthElement;
        if (BaziHelper.getRelation(trMonthElement, trElement).isFavorable()) {
          lunar.pilarsAttr.combList.addBranchComb(
            CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE,
            combLucHop,
            BrancheRelation.getTransformResultElement(
              checkBranche
            ).getValue()
          );
        } else {
          for (
            let trunkPilarIdx = 0;
            trunkPilarIdx < LunarBase.LINDEX;
            trunkPilarIdx++
          ) {
            if (lunar.trunkArr[trunkPilarIdx].getElement() === trElement) {
              lunar.pilarsAttr.combList.addBranchComb(
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
    const checkBranche = lunar.brancheArr[checkPilarIdx];
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (Math.abs(pilarIdx - checkPilarIdx) === 1) {
        if (
          BrancheRelation.isRelationPresent(
            lunar.brancheArr[pilarIdx],
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

  // Ref3p344
  static evalLucXung(lunar: Lunar) {
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (
        lunar.pilarsAttr.combList.existBrancheRelationType(
          CombAttr.BRANCHESEASONCOMBTYPE,
          pilarIdx
        )
      )
        continue;
      // MIDBRANCHECOMB3TYPE present implies BRANCHECOMB3TYPE and BRANCHECOMB3WITHTRANSFORMTYPE
      if (
        lunar.pilarsAttr.combList.existBrancheRelationType(
          CombAttr.MIDBRANCHECOMB3TYPE,
          pilarIdx
        )
      )
        continue;
      const branchesClash = CombListHelper.getNeighBorRelation(
        lunar,
        BrancheRelation.CLASH,
        pilarIdx
      );
      if (branchesClash !== null) {
        lunar.pilarsAttr.combList.addBranchComb(
          CombAttr.BRANCHECLASHTYPE,
          branchesClash
        );
      }
    }
  }

  static evalBranchePairComb(
    lunar: Lunar,
    relation: BrancheRelation,
    type: number
  ) {
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const branchesInjury = CombListHelper.getNeighBorRelation(
        lunar,
        relation,
        pilarIdx
      );
      if (branchesInjury !== null) {
        lunar.pilarsAttr.combList.addBranchComb(type, branchesInjury);
      }
    }
  }

  static canBoost(sources: Branche[], checkElement: Element, useOnlyMainHiddenTrunk?: boolean) : boolean {
    let count=0;
    if ( typeof useOnlyMainHiddenTrunk === 'undefined' ) useOnlyMainHiddenTrunk=false;
    for (let index = 0; index < sources.length; index++) {
      const source = sources[index];
      if ( source.getElement().isFavorable(checkElement) ) count++;
      const hiddenTrunks = BrancheHelper.getHiddenTrunk(source);
      for (let index = 0; index < hiddenTrunks.length; index++) {
        const element = hiddenTrunks[index].getElement();
        if ( element.isFavorable(checkElement) ) count++;
        if (useOnlyMainHiddenTrunk) break;
      }
    }
    return count>0;
  }

   // Ref3p333Case2
   static evalRootSupportWith3BrancheCombination(lunar: Lunar, combType: number) {
    const tArr = lunar.trunkArr;
    const bArr = lunar.brancheArr;
    const combList = lunar.pilarsAttr.combList;
    const checkBrancheIdxArr = combList.getBrancheNonContributor(combType);
    const checkBranches: Branche[] = [];
    for (let index = 0; index < checkBrancheIdxArr.length; index++) {
      const element = checkBrancheIdxArr[index];
      checkBranches.push(bArr[element]);
    }
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      const pilarElement = tArr[pilarIdx].getElement();
      let boosted = false ;
      const combTypeAttrList = combList.getCombTypeAttrList(combType,pilarIdx);
      if ( combTypeAttrList.length>=1 ) {
        const transformedElement=combTypeAttrList[0].resultData;
        boosted = transformedElement.isFavorable(pilarElement) ;
      }
      if ( !boosted) {
          // Check if boosted be the non contributor branche
          boosted = CombListHelper.canBoost(checkBranches,pilarElement);
      }
      if ( boosted ) {
          combList.addTrunkComb(CombAttr.TRUNKISSUPPORTEDTYPE1,[pilarIdx])
      }
    }
  }

  //Ref3p333
  static evalTrunkSupportType ( lunar: Lunar) {
    const bArr = lunar.brancheArr;
    const tArr = lunar.trunkArr;
    let res = false;
    let checked = false;
    const combList = lunar.pilarsAttr.combList;
    if ( combList.existRelationType (CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE) ){
      //Ref3p333 cas 2 for season
      CombListHelper.evalRootSupportWith3BrancheCombination(lunar,CombAttr.BRANCHESEASONCOMBTRANSFORMABLETYPE);
      checked = true;
    } else if (combList.existRelationType (CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE)) {
       //Ref3p333 cas 2 for comb3
      CombListHelper.evalRootSupportWith3BrancheCombination(lunar,CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE);
      checked = true;
    } else if (combList.existRelationType (CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE)) {
       //Ref3p333 cas 2 for luc nhi hop
      CombListHelper.evalRootSupportWith3BrancheCombination(lunar,CombAttr.BRANCHECOMB6WITHTRANSFORMTYPE);
      checked = true;
    } else {
      // Ref3p335 cas 3 pas de transformation
      for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
        const element = tArr[pilarIdx].getElement();
         if ( CombListHelper.canBoost(bArr,element, true)) {
          combList.addTrunkComb(CombAttr.TRUNKISSUPPORTEDTYPE1,[pilarIdx])
         }
      }
    }
  }

  static setupAllCombinations(lunar: Lunar) {
    lunar.pilarsAttr.combList = new CombinationList();
    CombListHelper.evalComb5(lunar);
    CombListHelper.evalComb3(lunar);
    CombListHelper.evalCombSeason(lunar);
    CombListHelper.evalLucHop(lunar);
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.INJURY,
      CombAttr.BRANCHEINJURYTYPE
    );
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.AGRESSIVE,
      CombAttr.BRANCHEAGRESSIVE
    );
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.DISRESPECFUL,
      CombAttr.BRANCHEDISRESPECFULTYPE
    );
    CombListHelper.evalBranchePairComb(
      lunar,
      BrancheRelation.SCANDALOUS,
      CombAttr.BRANCHESCANDALOUSTYPE
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
