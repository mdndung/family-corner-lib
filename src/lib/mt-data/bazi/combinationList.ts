import { MessageHelper } from "../../helper/messageHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { LunarBase } from "./lunarBase";

export class CombAttr {
  static TRUNKCOMB5TYPE = 0;
  static TRUNKCOMB5WITHTRANSFORMTYPE = 1;
  //static TRUNKCOMB5TYPE2 = 2;
  //static TRUNKCOMB5TYPE3 = 3;
  //static TRUNKCOMB5TYPE4 = 4;
  //static TRUNKCOMB5TYPE5 = 5;
  //static TRUNKCOMB5TYPE6 = 6;
  static BRANCHECOMB3TYPE = 7;
  static BRANCHECOMB3WITHTRANSFORMTYPE = 8;
  static MIDBRANCHECOMB3TYPE = 9;
  static BRANCHESEASONCOMBTYPE = 10;
  static BRANCHECOMB6TYPE = 11;
  static BRANCHECOMB6WITHTRANSFORMTYPE = 12;
  static BRANCHECLASHTYPE = 13; // Generic with detail in additional type from 14 to 19
  static BRANCHEINJURYTYPE = 14;
  static BRANCHEUNGRATEFUL = 15;
  static BRANCHEBULLYINGTYPE = 16;
  static BRANCHESUNCIVIZEDTYPE = 17;
  static BRANCHEAUTOPUNITIONTYPE = 18;
  static BRANCHEDESTROYTYPE = 19;
  static TRUNKISSUPPORTEDTYPE1 = 20;
  static BRANCHESEASONCOMBTRANSFORMABLETYPE = 21;
  static MIDBRANCHECOMB3TRANSFORMABLETYPE = 22;
  static TRUNKCLASHTYPE=23;

  static STRUCTURETYPE = 0;

  type: number;
  trunkAttrs: number[];
  branchAttrs: number[];
  resultData: any;
  detail: any;

  constructor(
    type: number,
    trunkAttrs: number[],
    branchAttrs: number[],
    resultData?: any,
    detail?: any
  ) {
    if (typeof resultData === "undefined") resultData = null;
    if (typeof detail === "undefined") {
      detail = null;
    }
    this.type = type;
    this.trunkAttrs = trunkAttrs;
    this.branchAttrs = branchAttrs;
    this.resultData = resultData;
    if ( detail===null ) {
      detail = MessageHelper.getMessage(this.getName());
    }

    this.detail = detail;
  }

  isSame(other: CombAttr) {
    if (this.type !== other.type) {
      return false;
    }
    if (this.trunkAttrs.length !== other.trunkAttrs.length) {
      return false;
    }
    if (this.branchAttrs.length !== other.branchAttrs.length) {
      return false;
    }
    if (this.resultData !== other.resultData) {
      return false;
    }
    if (this.detail !== other.detail) {
      return false;
    }
    for (let index = 0; index < this.trunkAttrs.length; index++) {
      if (this.trunkAttrs[index] !== other.trunkAttrs[index]) {
        return false;
      }
    }
    for (let index = 0; index < this.branchAttrs.length; index++) {
      if (this.branchAttrs[index] !== other.branchAttrs[index]) {
        return false;
      }
    }
    return true;
  }

  isTrunkData() {
    return this.trunkAttrs.length > 0 && this.branchAttrs.length === 0;
  }

  isBrancheData() {
    return this.trunkAttrs.length === 0 && this.branchAttrs.length > 0;
  }

  compareTo(other: CombAttr) {
    return this.type < other.type;
  }

  static getTypeName(type: number) {
    return 'Comb.'+type;
  }

  getName() {
    return 'Comb.'+this.type;
  }
}

export class CombinationList {
  // List of detected combination
  combList: CombAttr[] = null;

  constructor() {
    this.combList = [];
  }

  exist(checkComb: CombAttr) {
    let found = false;
    for (let index = 0; index < this.combList.length; index++) {
      if (checkComb.isSame(this.combList[index])) {
        found = true;
        break;
      }
    }
    return found;
  }

  sortNumberList(list: number[]) {
    ObjectHelper.sortNumber(list, true);
  }

  addBranchComb(
    type: number,
    branches: number[],
    resultData?: any,
    detail?: any
  ) {
    this.sortNumberList(branches);
    const combAttr = new CombAttr(type, [], branches, resultData, detail);
    if (!this.exist(combAttr)) this.combList.push(combAttr);
  }

  addTrunkComb(type: number, trunks: number[], resultData?: any, detail?: any) {
    this.sortNumberList(trunks);
    const combAttr = new CombAttr(type, trunks, [], resultData, detail);
    if (!this.exist(combAttr)) {
      this.combList.push(combAttr);
    }
  }

  addTrunkComb5(
    type: number,
    trunk1Idx: number,
    trunk2Idx: number,
    resultData?: any,
    detail?: any
  ) {
    this.addTrunkComb(type, [trunk1Idx, trunk2Idx], resultData, detail);
  }

  existTrunkRelationType(type: number, pilarIdx: number) {
    for (let index = 0; index < this.combList.length; index++) {
      const combAttr = this.combList[index];
      if (combAttr.isTrunkData()) {
        if (combAttr.type === type) {
          if (ObjectHelper.hasItem(combAttr.trunkAttrs, pilarIdx)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getPilarsCombTypeAttrList(
    type: number,
    pilar1Idx: number,
    pilar2Idx: number
  ) {
    let res = [];
    for (let index = 0; index < this.combList.length; index++) {
      const combAttr = this.combList[index];
      if (combAttr.type === type) {
        let foundDataArr = combAttr.branchAttrs;
        if (combAttr.isTrunkData()) {
          foundDataArr = combAttr.trunkAttrs;
        }
        if (ObjectHelper.hasItem(foundDataArr, pilar1Idx) &&
            ObjectHelper.hasItem(foundDataArr, pilar2Idx)) {
            res.push(combAttr);
        }
      }
    }
    return res;
  }


  getCombTypeAttrList(
    type: number,
    pilarIdx: number,
    addInfo1?: any,
    addInfo2?: any
  ) {
    let addInfo1Present = true;
    if (typeof addInfo1 === "undefined") {
      addInfo1 = null;
      addInfo1Present = false;
    }
    let addInfo2Present = true;
    if (typeof addInfo2 === "undefined") {
      addInfo2 = null;
      addInfo2Present = false;
    }
    let res = [];
    for (let index = 0; index < this.combList.length; index++) {
      const combAttr = this.combList[index];
      if (combAttr.type === type) {
        let foundDataArr = combAttr.branchAttrs;
        if (combAttr.isTrunkData()) {
          foundDataArr = combAttr.trunkAttrs;
        }
        if (ObjectHelper.hasItem(foundDataArr, pilarIdx)) {
          let count = 0;
          let goal = 2 ;
          if ( foundDataArr.length===1 ) goal=1;
          if (addInfo1Present) {
            if (addInfo1 === combAttr.resultData) count++;
          } else {
            count++;
          }
          if (addInfo2Present) {
            if (addInfo2 === combAttr.detail) count++;
          } else {
            count++;
          }
          if (count === goal ) {
            res.push(combAttr);
          }
        }
      }
    }
    return res;
  }

  getTrunkRelationContrib(type: number, pilarIdx: number) {
    let combAttrList = this.getCombTypeAttrList(type, pilarIdx);
    const res = [];
    for (let index = 0; index < combAttrList.length; index++) {
      res.push(combAttrList[index].trunkAttrs);
    }
    return res;
  }

  getBrancheRelationContrib(type: number, pilarIdx: number) {
    let combAttrList = this.getCombTypeAttrList(type, pilarIdx);
    const res = [];
    for (let index = 0; index < combAttrList.length; index++) {
      res.push(combAttrList[index].branchAttrs);
    }
    return res;
  }


  existBrancheRelationType(type: number, pilarIdx: number) {
    for (let index = 0; index < this.combList.length; index++) {
      const combAttr = this.combList[index];
      if (combAttr.isBrancheData()) {
        if (combAttr.type === type) {
          if (ObjectHelper.hasItem(combAttr.branchAttrs, pilarIdx)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  existRelationType(type: number) {
    for (let index = 0; index < this.combList.length; index++) {
      const combAttr = this.combList[index];
      if (combAttr.type === type) {
        return true;
      }
    }
    return false;
  }

  // Return true if part of combination with or without transfomatation
  // Reg3p344
  existCombRelation(pilarIdx: number) {
    if ( this.existBrancheRelationType(CombAttr.BRANCHECOMB3TYPE,pilarIdx) ) return true;
    if ( this.existBrancheRelationType(CombAttr.BRANCHESEASONCOMBTYPE,pilarIdx) ) return true;
    if ( this.existBrancheRelationType(CombAttr.MIDBRANCHECOMB3TYPE,pilarIdx) ) return true;
    return false;
  }

   // Return true if comb6 (luc xung)
  // Reg3p344
  existClashRelation(pilarIdx: number) {
    if ( this.existBrancheRelationType(CombAttr.BRANCHECLASHTYPE,pilarIdx) ) return true;
    if ( this.existTrunkRelationType(CombAttr.TRUNKCLASHTYPE,pilarIdx) ) return true;
    if ( this.existBrancheRelationType(CombAttr.BRANCHEINJURYTYPE,pilarIdx) ) return true;
    if ( this.existBrancheRelationType(CombAttr.BRANCHEUNGRATEFUL,pilarIdx) ) return true;
    if ( this.existBrancheRelationType(CombAttr.BRANCHEBULLYINGTYPE,pilarIdx) ) return true;
    if ( this.existBrancheRelationType(CombAttr.BRANCHESUNCIVIZEDTYPE,pilarIdx) ) return true;
    if ( this.existBrancheRelationType(CombAttr.BRANCHEAUTOPUNITIONTYPE,pilarIdx) ) return true;
    return false;
  }

  // Get the branches which do not contribute to the type type
  getBrancheNonContributor(type: number) {
    const res = [];
    for (let pilarIdx = 0; pilarIdx < LunarBase.LINDEX; pilarIdx++) {
      if (!this.existBrancheRelationType(type, pilarIdx)) {
        res.push(pilarIdx);
      }
    }
    return res;
  }

  getCombSortList() {
    ObjectHelper.sortWithCompareTo(this.combList, true);
    return this.combList;
  }
}
