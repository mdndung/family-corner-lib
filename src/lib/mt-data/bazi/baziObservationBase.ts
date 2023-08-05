import { BaziHelper } from "../../helper/baziHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { StringHelper } from "../../helper/stringHelper";
import { ObservationBase } from "../../observations/observationBase";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { QiType } from "../qi/qi-type";
import { QiTypeDataRec } from "../qi/qi-type-data-rec";
import { Bazi } from "./bazi";
import { LunarBase } from "./lunarBase";
import { SecondaryDeity } from "./secondaryDeity";
import { Element } from "../feng-shui/element";
import { BaziStructureHelper } from "../../helper/bazi-structureHelper";
import { CombAttr, CombinationList } from "./combinationList";
import { DataWithLog } from "../qi/dataWithLog";
import { BaziStructure } from "./bazi-structure";
import { Lunar } from "./lunar";
import { PropertyHelper } from "../../helper/PropertyHelper";
import { BrancheHelper } from "../../helper/brancheHelper";
import { DeityHelper } from "../../helper/deityHelper";
import { EnumBaseClass } from "../enumBaseClass";
import { Branche } from "./branche";
import { Trunk } from "./trunk";

export class BaziObservationBase extends ObservationBase {
  // See to update it for each period
  baseQiTypeData: QiTypeDataRec[];
  lunar: Bazi;
  hasQuyNhan: boolean;
  noQuyNhanSuffix = "";
  baseAttr: any;
  studyYear: Bazi;

  constructor(bazi: Bazi) {
    super(bazi.getGenrePrefix());
    this.lunar = bazi;
    this.evalQuyNhan();
  }

  private evalQuyNhan() {
    const pilarsAttr = this.lunar.pilarsAttr;
    this.hasQuyNhan = false;
    this.noQuyNhanSuffix = ".NoQuy";
    for (let index = 0; index < SecondaryDeity.quyNhanArr.length; index++) {
      if (
        BaziHelper.existsecDeity(
          pilarsAttr.secondaryDeityPilars,
          SecondaryDeity.quyNhanArr[index]
        )
      ) {
        this.hasQuyNhan = true;
        this.noQuyNhanSuffix = "";
        break;
      }
    }
  }

  protected getLimitCount(count: number, limit: number) {
    if (count > 2) count = limit;
    return count;
  }

  protected getPilar(pilarName: string) {
    if (pilarName === "Destin") return this.lunar.menhPilar;
    const pilarIdx = LunarBase.getPilarIdx(pilarName);
    return this.lunar.pilars[pilarIdx];
  }

  protected getPilarSecDeity(pilarName: string) {
    return this.getPilar(pilarName).getSecDeityAttr();
  }

  protected getPilarSecDeitiesRec(pilarName: string) {
    return this.getPilar(pilarName).getSecDeityAttr().secDeityRecArr;
  }

  protected getPilarDeity(pilarName: string) {
    return this.getPilar(pilarName).deity;
  }

  protected getStructAttr(structureEneR: ElementNEnergyRelation) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const struct = structureEneR;
    const name = struct.getName();
    const dIndex = LunarBase.DINDEX;
    const structCnt1 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(struct, dIndex),
      1
    );
    const structCnt2 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(struct, dIndex),
      2
    );
    const base = structureEneR.getBaseGroup();
    const baseName = base.getName();

    const baseCnt1 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(base, dIndex),
      1
    );
    const baseCnt2 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(base, dIndex),
      2
    );
    const prodeneR = structureEneR.getNextProductiveElement();
    const prodeneRCnt1 = this.getLimitCount(
      pilarsAttr.getDeityCount(prodeneR),
      1
    );
    const prodeneRCnt2 = this.getLimitCount(
      pilarsAttr.getDeityCount(prodeneR),
      2
    );
    const prdBase = prodeneR.getBaseGroup();
    const prdBaseName = prdBase.getName();

    const prdBseCnt1 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(prdBase, dIndex),
      1
    );
    const prdBseCnt2 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(prdBase, dIndex),
      2
    );
    const ctrleneR = structureEneR.getNextControlElement();
    const ctrleneRName = ctrleneR.getName();
    const ctrleneRCnt1 = this.getLimitCount(
      pilarsAttr.getDeityCount(ctrleneR),
      1
    );
    const crtlBase = ctrleneR.getBaseGroup();
    const crtlBaseName = crtlBase.getName();
    const crtlBseCnt1 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(crtlBase, dIndex),
      1
    );
    const crtlBseCnt2 = this.getLimitCount(
      pilarsAttr.getPairedRelationCount(crtlBase, dIndex),
      2
    );
    return {
      struct,
      name,
      structCnt1,
      structCnt2,
      base,
      baseName,
      baseCnt1,
      baseCnt2,
      prodeneR,
      prdBase,
      prodeneRCnt1,
      prodeneRCnt2,
      prdBaseName,
      prdBseCnt1,
      prdBseCnt2,
      ctrleneR,
      ctrleneRName,
      ctrleneRCnt1,
      crtlBaseName,
      crtlBseCnt1,
      crtlBseCnt2,
    };
  }

  protected evalCurrAttr(currLunarYear?: Bazi) {
    if (typeof currLunarYear === "undefined") currLunarYear = this.lunar;
    const pilarsAttr = this.lunar.pilarsAttr;
    const dIndex = LunarBase.DINDEX;
    const dayForce = StringHelper.bool2Str(
      pilarsAttr.qiTypeData.isFavorable(QiType.DAYSTATUS)
    );
    const dTrunkElementNEnergy = pilarsAttr.trunkEE[dIndex].getValue();
    const do7KForce = StringHelper.qiForce2Str(
      pilarsAttr.qiTypeData.getQiForce(QiType.DO7K2RWFLEVERAGE)
    );
    const drIRForce = StringHelper.qiForce2Str(
      pilarsAttr.qiTypeData.getQiForce(QiType.DRIR2RWFLEVERAGE)
    );
    const dwiwForce = StringHelper.qiForce2Str(
      pilarsAttr.qiTypeData.getQiForce(QiType.DWIWCOUNT)
    );
    const hoegForce = StringHelper.qiForce2Str(
      pilarsAttr.qiTypeData.getQiForce(QiType.HOEGCOUNT)
    );
    let yLifeCycle = null;
    let dLifeCycle = null;
    if (currLunarYear != null) {
      yLifeCycle = BaziHelper.elementLifeCycle(
        currLunarYear.getyTrunk(),
        currLunarYear.getyBranche()
      );
      dLifeCycle = BaziHelper.elementLifeCycle(
        currLunarYear.getdTrunk(),
        currLunarYear.getdBranche()
      );
    }
    this.baseAttr = {
      dayForce,
      dTrunkElementNEnergy,
      do7KForce,
      drIRForce,
      dwiwForce,
      hoegForce,
      yLifeCycle,
      dLifeCycle,
    };
  }

  private evalInitialPoints() {
    this.baseQiTypeData = [];
    this.baseQiTypeData.push(this.lunar.pilarsAttr.qiTypeData);
  }

  override initPoint() {
    super.initPoint();
    this.evalInitialPoints();
    if (this.hasQuyNhan) {
      this.incPoints(10);
    }
  }

  private isBalancedElement() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const elementsValues = Element.getValues();
    for (let wIndex = 0; wIndex < elementsValues.length; wIndex++) {
      const wElement = elementsValues[wIndex];
      if (pilarsAttr.isVeryWeakedElement(wElement)) {
        return false;
      }
    }
    return true;
  }

  private isElementForce(params: string[]) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const checkElementName=params[0]
    const checkForce=params[1]
    const element = Element.WATER.getEnumByName(checkElementName) as Element
    const elementForce = pilarsAttr.getElementForceChar(element);
    //console.log("isElementForce", params,checkForce, element, elementForce, pilarsAttr.getElementForce(element))
    return checkForce===elementForce
  }

  private isTrunkElementPresent(elementList: string) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const elementsValues = Element.getValues();
    const pilarNames = LunarBase.ymdhCharArr;
    for (let pilarIdx = 0; pilarIdx < pilarNames.length; pilarIdx++) {
      const pilarName = pilarNames[pilarIdx];
      const pilar = this.getPilar(pilarName);
      if ( elementList.indexOf(pilar.trunk.getElement().getName())>=0 ) return true
    }
    return false;
  }

  override getName() {
    return "bazi Observation";
  }

  evalBaseDestinyPoint() {
    const pilarsAttr = this.lunar.pilarsAttr;
    // Day Master
    this.incPoints(
      this.force2Point(pilarsAttr.qiTypeData.getForce(QiType.DAYSTATUS))
    );
    const dwiwCount = pilarsAttr.getPairedRelationCount(
      ElementNEnergyRelation.DW,
      LunarBase.DINDEX
    );
    // Ref3p595
    if (dwiwCount === 0) {
      this.incPoints(1);
    }
    // Ref3p596
    const pilars = this.lunar.pilars;
    const pivotElements = pilarsAttr.elligiblePivotData.getValue();
    for (let index = 0; index < pivotElements.length; index++) {
      const element = pivotElements[index];
      let lowestPoint = 10;
      let found = false;
      for (
        let trunkPilarIdx = 0;
        trunkPilarIdx < LunarBase.PILARS_LEN;
        trunkPilarIdx++
      ) {
        if (element === pilars[trunkPilarIdx].trunk.getElement()) {
          const lifeCycle = ElementLifeCycle.getElementLifeCycle(
            pilars[trunkPilarIdx].trunk,
            pilars[trunkPilarIdx].branche
          );
          const point = this.qiforce2Point(lifeCycle.qiForce);
          if (lowestPoint > point) lowestPoint = point;
          found = true;
        }
      }
      if (found) {
        this.incPoints(lowestPoint);
      }
    }
  }

  getNextDotPos(key: string, currIdx: number) {
    let dotPos = key.indexOf(".", currIdx);
    if (dotPos === -1) dotPos = key.indexOf("&", currIdx);
    if (dotPos === -1) dotPos = key.length - 1;
    return dotPos;
  }

  // Return true if the pilar sec deities is in the secDeityList
  isPilarSecDeityInSecDeityList(pilarNameList: string, secDeityList: string, count=1) {
    const pilarNames = pilarNameList.split("/")
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      const secDeitiesRec = this.getPilarSecDeitiesRec(pilarName);
      let countHit = count ;
      for (let index = 0; index < secDeitiesRec.length; index++) {
        const name = secDeitiesRec[index].secDeity.getName();
        if (secDeityList.indexOf(name) >= 0) {
          countHit--;
          if ( countHit===0 ) return true;
        }
      }
    }

    return false;
  }

  checkKey = "";
  checkMethod = "";

  checkEnumList (param:string, model: EnumBaseClass) {
    if ( ObjectHelper.isNaN(param) ) {
      console.log("Missing param",model )
      console.log(this.checkMethod, this.checkKey)
      return "";
    }
    const params = param.split("/")
    for (let index = 0; index < params.length; index++) {
      const element = params[index];
      if ( null===model.getEnumByName(element) ) {
        console.log("Could not find ", element, "in ", param, "for model ", model.getName())
        console.log(this.checkMethod, this.checkKey)
      }
    }
    return param;
  }

  checkTransformEnumList (param:string, model: EnumBaseClass) {
    return this.checkEnumList(param,model).split("/");
  }


  // Sec Deity on Pilar Lifecycle
  isSecDeityOnPilarLifeCycle(params: string[]) {
    if (params.length != 2) return false;
    const checkSecDeity = this.checkEnumList(params[0],SecondaryDeity.THIENDUC);
    const checkLifeCycleNameList =this.checkEnumList(params[1],ElementLifeCycle.TOMB);

    const pilarNames = LunarBase.ymdhCharArr;
    for (let pilarIdx = 0; pilarIdx < pilarNames.length; pilarIdx++) {
      const pilarName = pilarNames[pilarIdx];
      const pilar = this.getPilar(pilarName);
      if (checkLifeCycleNameList.indexOf(pilar.lifeCycle.getName()) >= 0) {
        if (this.isPilarSecDeityInSecDeityList(pilarName, checkSecDeity)) {
          return true;
        }
      }
    }
    return false;
  }

  // Return true if SecDeities is in a clashed pilar pilarName
  isPilarSecDeityClashed(pilarName: string, secDeityList: string) {
    const pilarHasSecDeity = this.isPilarSecDeityInSecDeityList(
      pilarName,
      secDeityList
    );
    if (pilarHasSecDeity) {
      const params = ["1", pilarName];
      return this.isPilarClashed(params);
    }

    return false;
  }

  // Return true if SecDeities is in a clashed pilar
  isSecDeityClashed(params: string[]) {
    const checkPilars = LunarBase.ymdhCharArr;
    const checSecDeityName = this.checkEnumList(params[0],SecondaryDeity.THIENLOC);
    for (let index = 0; index < checkPilars.length; index++) {
      const checkPilarName = checkPilars[index];
      const pilarHasSecDeity = this.isPilarSecDeityClashed(
        checkPilarName,
        checSecDeityName
      );
      if (pilarHasSecDeity) {
        const currParams = ["1", checkPilarName];
        if (this.isPilarClashed(currParams)) return true;
      }
    }
    return false;
  }

  containsSecDeity(params: string[]): boolean {
    if (params.length !== 2) return false;
    return this.isPilarSecDeityInSecDeityList(params[0], params[1]);
  }

  hasSecDeitiesOnSamePilar(params: string[]): boolean {
    if (params.length !== 2) return false;
    const secDeity1List = params[0];
    const secDeity2List = params[1];
    let count=1
    if ( secDeity2List.indexOf(secDeity1List)>=0 ||  secDeity1List.indexOf(secDeity2List)>=0 ) {
      count = 2 ;
    }
    const pilarNames = LunarBase.ymdhCharArr;
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      if (this.isPilarSecDeityInSecDeityList(pilarName, secDeity1List,count)) {
        if (this.isPilarSecDeityInSecDeityList(pilarName, secDeity2List,count)) {
          return true;
        }
      }
    }
    return false;
  }

  // Check if the element is a favorable pivot
  isElementFavorablePivot(elementName: string): boolean {
    const pilarsAttr = this.lunar.pilarsAttr;
    const pivotElementsName = pilarsAttr.getElligiblePivotElementNames();
    return ObjectHelper.findIndex(pivotElementsName, elementName) !== -1;
  }

  // Check if the favorable pivot is among the checkList
  // Return true if GE than the params[0] count
  isFavorablePivot(params: string[]): boolean {
    const pilarsAttr = this.lunar.pilarsAttr;
    let countHit = +params[0];
    const checkPivots =  this.checkTransformEnumList(params[1],ElementNEnergyRelation.RW);
    const pivotsElementsName = pilarsAttr.getElligiblePivotElementNames();
    //console.log("isFavorablePivot",params, checkPivots,pivotsElementsName )
    for (let index = 0; index < checkPivots.length; index++) {
      const deityName = checkPivots[index];
      let deityElementName = pilarsAttr.deityAttr
        .getDeityElementByName(deityName)
        .getName();
      //console.log("isFavorablePivot",deityName,deityElementName )
      if (ObjectHelper.findIndex(pivotsElementsName, deityElementName) !== -1) {
        countHit--;
        if (countHit === 0) return true;
      }
    }
    return false;
  }

  isDeityElement(params: string[]): boolean {
    const pilarsAttr = this.lunar.pilarsAttr;
    const deityName = params[0]
    const elementNameList = this.checkEnumList(params[1],Element.WATER);
    const deityElementName = pilarsAttr.deityAttr.getDeityElementByName(deityName).getName();
    return elementNameList.indexOf(deityElementName)>=0
  }

  // Check if the hostile pivot is among the checkList
  // Return true if GE than the params[0] count
  isHostilePivot(params: string[]): boolean {
    let countHit = +params[0];
    const pilarsAttr = this.lunar.pilarsAttr;
    const checkPivots = this.checkTransformEnumList(params[1],ElementNEnergyRelation.RW);
    const pivotsElementsName = pilarsAttr.getPivotHostileElements();
    //console.log("isHostilePivot", params, checkPivots, pivotsElementsName);
    for (let index = 0; index < checkPivots.length; index++) {
      const deityName = checkPivots[index];
      let deityElementName = pilarsAttr.deityAttr
        .getDeityElementByName(deityName)
        .getName();
      //console.log("isHostilePivot", deityName, deityElementName);
      if (ObjectHelper.findIndex(pivotsElementsName, deityElementName) !== -1) {
        countHit--;
        if (countHit === 0) return true;
      }
    }
    return false;
  }

  // Check if the params[0] pilar contains a favorable pivot
  isPilarFavorablePivot(params: string[]): boolean {
    const pilarName = params[0];
    const pilarsAttr = this.lunar.pilarsAttr;
    const pivotElements = pilarsAttr.elligiblePivotData.getValue();
    let pilarDeity = this.getPilarDeity(pilarName);
    let deityElement = pilarsAttr.deityAttr.getDeityElement(pilarDeity);
    //console.log("isPilarFavorablePivot",pilarName,deityElement )
    if (ObjectHelper.findIndex(pivotElements, deityElement) !== -1) return true;
    if (pilarName.length === 1) {
      const pilarIdx = LunarBase.getPilarIdx(pilarName);
      const hiddenEnERArr = pilarsAttr.getHiddenPilarDeities(pilarIdx);
      for (let index = 0; index < hiddenEnERArr.length; index++) {
        pilarDeity = hiddenEnERArr[index];
        if (pilarDeity !== null) {
          deityElement = pilarsAttr.deityAttr.getDeityElement(pilarDeity);
          if (ObjectHelper.findIndex(pivotElements, deityElement) !== -1)
            return true;
        }
      }
    }
    return false;
  }


  // Check if the params[0] has a sec deity on a favorable pilar pivot
  isSecDeityOnFavorablePivot(params: string[]): boolean {
    const deityList = this.checkEnumList(params[0],SecondaryDeity.VOID);
    const pilarNames = LunarBase.ymdhCharArr
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      if ( this.isPilarFavorablePivot([pilarName]) ) {
        if ( this.containsSecDeity([pilarName,deityList]) ) {
          return true
        }
      }
    }
    return false;
  }

   // Check if the params[0] has a sec deity on a hostile pilar pivot
   isDeityOnHostilePivot(params: string[]): boolean {
    const secDeityList = this.checkEnumList(params[0],SecondaryDeity.VOID);
    const pilarNames = LunarBase.ymdhCharArr
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      if ( this.isPilarHostilePivot([pilarName]) ) {
        if ( this.containsSecDeity([pilarName,secDeityList]) ){
          return true
        }
      }
    }
    return false;
  }

  // Check if the params[0] pilar contains a hostile pivot
  isPilarHostilePivot(params: string[]): boolean {
    const pilarName = params[0];

    const pilarsAttr = this.lunar.pilarsAttr;
    const pivotElements = pilarsAttr.pivotHostileElements;
    let pilarDeity = this.getPilarDeity(pilarName);
    let deityElement = pilarsAttr.deityAttr.getDeityElement(pilarDeity);
    //console.log("isPilarFavorablePivot",pilarName,deityElement )
    if (ObjectHelper.findIndex(pivotElements, deityElement) !== -1) return true;
    if (pilarName.length === 1) {
      const pilarIdx = LunarBase.getPilarIdx(pilarName);
      const hiddenEnERArr = pilarsAttr.getHiddenPilarDeities(pilarIdx);
      for (let index = 0; index < hiddenEnERArr.length; index++) {
        pilarDeity = hiddenEnERArr[index];
        if (pilarDeity !== null) {
          deityElement = pilarsAttr.deityAttr.getDeityElement(pilarDeity);
          if (ObjectHelper.findIndex(pivotElements, deityElement) !== -1)
            return true;
        }
      }
    }
    return false;
  }

  getPivotForce(pivotElements: Element[]) {
    const pilarsAttr = this.lunar.pilarsAttr;
    let force = 0;
    for (let index = 0; index < pivotElements.length; index++) {
      const element = pivotElements[index];
      force += pilarsAttr.getElementForce(element);
    }
    return force;
  }

  isDayForceStatus(checkStatus: string) {
    const dayForce = this.baseAttr.dayForce;
    //console.log("isDayForceStatus", checkStatus, dayForce)
    return dayForce === checkStatus;
  }

  isBirthSeason(seasonList: string) {
    const seasonName = this.lunar.getmBranche().season.getName()
    //console.log("isBirthSeason", seasonName)
    return seasonList.indexOf(seasonName)>=0 ;
  }



  isPivotSupport() {
    const pilarsAttr = this.lunar.pilarsAttr;
    const pivotFavorableForce = this.getPivotForce(
      pilarsAttr.elligiblePivotData.getValue()
    );
    const pivotHostileForce = this.getPivotForce(
      pilarsAttr.pivotHostileElements
    );
    return pivotFavorableForce >= pivotHostileForce;
  }

  containsDeity(params: string[]): boolean {
    if (params.length !== 2) return false;
    const pilarNames = params[0].split("/");
    const deityList = this.checkEnumList(params[1],ElementNEnergyRelation.RW);
    //console.log("containsDeity ", pilarNames, deityList)
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      if (this.isPilarDeityInDeityList(pilarName, deityList)) return true;
    }
    return false;
  }


  containsTrunkDeity(params: string[]): boolean {
    if (params.length !== 2) return false;
    const pilarNames = params[0].split("/");
    const deityList = this.checkEnumList(params[1],ElementNEnergyRelation.RW);
    //console.log("containsTrunkDeity ", pilarNames, deityList)
    for (let index = 0; index < pilarNames.length; index++) {
      const pilar = this.getPilar(pilarNames[index])
      if (deityList.indexOf(pilar.deity.getName())>=0 ) return true;
    }
    return false;
  }

  containsHiddenDeity(params: string[]): boolean {
    if (params.length !== 2) return false;
    const pilarNames = params[0].split("/");
    const deityList = this.checkEnumList(params[1],ElementNEnergyRelation.RW);
    const pilarsAttr = this.lunar.pilarsAttr
    //console.log("containsHiddenDeity ", pilarNames, deityList)
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      const pilarIdx = LunarBase.getPilarIdx(pilarName);
      const hiddenEnERArr = pilarsAttr.getHiddenPilarDeities(pilarIdx);
      if (null != hiddenEnERArr) {
        for (let index = 0; index < hiddenEnERArr.length; index++) {
          const hiddenDeity = hiddenEnERArr[index];
          if (
            hiddenDeity !== null &&
            deityList.indexOf(hiddenDeity.getName()) >= 0
          ) return true

        }
      }
    }
    return false;
  }


  containsDeityNHidden(params: string[]): boolean {
    if (params.length !== 2) return false;
    const pilarNames = params[0].split("/");
    const deityList =this.checkEnumList(params[1],ElementNEnergyRelation.RW);
    //console.log("containsDeity ", pilarNames, deityList)
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      if (this.isPilarDeityInDeityList(pilarName, deityList,2)) return true;
    }
    return false;
  }


  hasPilarDeityNHidden(params: string[]): boolean {
    params.unshift("Y/M/D/H");
    return this.containsDeityNHidden(params)
  }

  isPilarDeityInDeityList(pilarName: string, deityList: string, count=1): boolean {
    const deityName = this.getPilarDeity(pilarName).getName();
    //console.log("isPilarDeityInDeityList ", deityName, deityList)
    this.checkEnumList(deityList,ElementNEnergyRelation.RW);
    let countHit=count;
    if (deityList.indexOf(deityName) >= 0) {
      countHit--
      if ( countHit<=0 ) return true;
    }
    const pilarsAttr = this.lunar.pilarsAttr;
    const pilarIdx = LunarBase.getPilarIdx(pilarName);
    const hiddenEnERArr = pilarsAttr.getHiddenPilarDeities(pilarIdx);
    if (null != hiddenEnERArr) {
      for (let index = 0; index < hiddenEnERArr.length; index++) {
        const hiddenDeity = hiddenEnERArr[index];
        if (
          hiddenDeity !== null &&
          deityList.indexOf(hiddenDeity.getName()) >= 0
        )
        countHit--
        if ( countHit<=0 ) return true;
      }
    }
    return false;
  }

  // Return true if params[0] brancheName is on the same pilar as params[0] deities
  isBrancheDeities(params: string[]) {
    if (params.length < 2) return false;
    const deitiesName = this.checkEnumList(params[1],ElementNEnergyRelation.RW)
    const brancheName = this.checkEnumList(params[0],Branche.RAT)
    //console.log("isBrancheDeity ", params);
    const pilarNames = LunarBase.ymdhCharArr;
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      const pilar = this.getPilar(pilarName);
      if (brancheName.indexOf(pilar.branche.getName())>=0) {
        if (this.isPilarDeityInDeityList(pilarName, deitiesName)) {
          return true;
        }
      }
    }
    return false;
  }

  // Check if the attrVal is among a nth greatest deity count
  isHeighDeityCount(params: string[], isGroup: boolean): boolean {
    if (params.length !== 2) return false;
    const pilarsAttr = this.lunar.pilarsAttr;
    const nth = +params[0];
    const deityList = this.checkEnumList(params[1],ElementNEnergyRelation.RW)
    let dArr = null;
    if (isGroup) {
      dArr = pilarsAttr.deityAttr.getOrderedCountDeityGroupName();
    } else {
      dArr = pilarsAttr.deityAttr.getOrderedCountDeityName();
    }
    const len = dArr.length - 1;

    //console.log("isHeighDeityCount ", params, nth, deityList, dArr)
    for (let index = 0; index < dArr.length; index++) {
      const deityName = dArr[len - index];
      //console.log("isHeighDeityCount ", deityName,  deityList.indexOf(deityName))
      if (deityList.indexOf(deityName) >= 0) return true;
      if (index === nth) break;
    }
    return false;
  }

  // Check if the attrVal is among a lowest deity count
  isLowDeityCount(params: string[], isGroup: boolean): boolean {
    if (params.length !== 2) return false;
    const pilarsAttr = this.lunar.pilarsAttr;
    const nth = +params[0];
    const deityList = this.checkEnumList(params[1],ElementNEnergyRelation.RW)
    let dArr = null;
    if (isGroup) {
      dArr = pilarsAttr.deityAttr.getOrderedCountDeityGroupName();
    } else {
      dArr = pilarsAttr.deityAttr.getOrderedCountDeityName();
    }
    //console.log("isLowDeityCount ",params, nth, deityList, dArr)
    for (let index = 0; index < dArr.length; index++) {
      const deityName = dArr[index];
      //console.log("isLowDeityCount ", deityName,  deityList.indexOf(deityName))
      if (deityList.indexOf(deityName) >= 0) return true;
      if (index === nth) break;
    }
    return false;
  }

  // Check if the params[1] Qi list has  params[0] favorale count
  hasQiType(params: string[]): boolean {
    const pilarsAttr = this.lunar.pilarsAttr;
    let countHit = +params[0];
    const checkQiTypeList =params[1].split("/")
    for (let index = 0; index < checkQiTypeList.length; index++) {
      const checkQiTypeName = checkQiTypeList[index];
      const checkQiType = QiType.getQiTypeByName(checkQiTypeName);
      if (pilarsAttr.qiTypeData.isFavorable(checkQiType)) {
        countHit--;
        if (countHit === 0) return true;
      }
    }
    return false;
  }


  // Check if the params[1] secondary deity list has No  presence count
  hasZeroSecDeity(params: string[]): boolean {
    const countHit = +params[0];
    const checkDeityList = this.checkTransformEnumList(params[1],SecondaryDeity.THIENVIET)
    //console.log("hasZeroSecDeity", params, checkDeityList);
    let count = checkDeityList.length;
    const pilarNames = LunarBase.ymdhCharArr;
    for (let pilarIdx = 0; pilarIdx < pilarNames.length; pilarIdx++) {
      const pilarName = pilarNames[pilarIdx];
      const secDeitiesRec = this.getPilarSecDeitiesRec(pilarName);
      for (let index = 0; index < secDeitiesRec.length; index++) {
        const secDeityName = secDeitiesRec[index].secDeity.getName();
        if (checkDeityList.indexOf(secDeityName) >= 0) {
          count--;
          if (count<countHit) return false;
        }
      }
    }
    return true;
  }

    // Check if the params[1] secondary deity list has more params[0]  presence count
    hasSecDeity(params: string[]): boolean {
      let countHit = +params[0];
      const checkSecDeityList = this.checkEnumList(params[1],SecondaryDeity.VOID)
      //console.log("hasSecDeity", countHit, checkDeityList)
      const pilarNames = LunarBase.ymdhCharArr;
      for (let pilarIdx = 0; pilarIdx < pilarNames.length; pilarIdx++) {
        const pilarName = pilarNames[pilarIdx];
        const secDeitiesRec = this.getPilarSecDeitiesRec(pilarName);
        for (let index = 0; index < secDeitiesRec.length; index++) {
          const secDeityName = secDeitiesRec[index].secDeity.getName();
          if (checkSecDeityList.indexOf(secDeityName) >= 0) {
            countHit--;
            if (countHit === 0) return true;
          }
        }
      }
      return false;
    }

  // Check if the params deity list has  params[0] checkNonZero presence count
  hasNonZeroDeityCount(params: string[], checkNonZero: boolean): boolean {
    const pilarsAttr = this.lunar.pilarsAttr;
    let countHit = +params[0];
    const checkDeityList = this.checkTransformEnumList(params[1],ElementNEnergyRelation.RW)
    //console.log("hasDeityCount", params, countHit, checkDeityList)
    for (let index = 1; index < checkDeityList.length; index++) {
      const deityName = checkDeityList[index];
      const deity = DeityHelper.getDeityByName(deityName);
      const deityCount = pilarsAttr.getDeityCount(deity);
      if (checkNonZero === (deityCount !== 0)) {
        countHit--;
        if (countHit === 0) return true;
      }
    }
    return false;
  }

  isPilarWithDeityNSecDeity(params: string[]): boolean {
    const pilarName = params[0];
    const deityList =this.checkEnumList(params[1],ElementNEnergyRelation.RW)
    const secDeityList =this.checkEnumList(params[2],SecondaryDeity.VOID)
    const pilarHasDeity = this.isPilarDeityInDeityList(pilarName, deityList);
    const pilarHasSecDeity = this.isPilarSecDeityInSecDeityList(
      pilarName,
      secDeityList
    );
    //console.log("hasBothPilarDeityNSecDeity", params, pilarHasDeity, pilarHasSecDeity)
    return pilarHasDeity && pilarHasSecDeity;
  }

  isPilarWithBothSecNDeity(params: string[]): boolean {
    const pilarName = params[0];
    const deityList =this.checkEnumList(params[1],ElementNEnergyRelation.RW)
    const secDeityList =this.checkEnumList(params[2],SecondaryDeity.VOID)
    const pilarHasDeity = this.isPilarDeityInDeityList(pilarName, deityList);
    const pilarHasSecDeity = this.isPilarSecDeityInSecDeityList(
      pilarName,
      secDeityList
    );
    //console.log("isPilarWithBothSecNDeity", params);
    return pilarHasDeity && pilarHasSecDeity;
  }


  isPilarWithBothDeity(params: string[]): boolean {
    const pilarName = params[0];
    const deityList1 =this.checkEnumList(params[1],ElementNEnergyRelation.RW)
    const deityList2 = this.checkEnumList(params[2],ElementNEnergyRelation.RW)
    const pilarHasDeity1 = this.isPilarDeityInDeityList(pilarName, deityList1);
    const pilarHasDeity2 = this.isPilarDeityInDeityList(pilarName, deityList2);
   //console.log("isPilarWithBothDeity", params);
    return pilarHasDeity1 && pilarHasDeity2;
  }


  hasPilarWithBothDeityNSecDeity(params: string[]): boolean {
    const deityList = this.checkEnumList(params[0],ElementNEnergyRelation.RW)
    const secDeityList = this.checkEnumList(params[1],SecondaryDeity.VOID)
    const pilarNames = LunarBase.ymdhCharArr;
    //console.log("hasPilarWithBothDeityNSecDeity", params);
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      const checkParams = [pilarName, deityList, secDeityList];
      if (this.isPilarWithBothSecNDeity(checkParams)) return true;
    }
    return false;
  }

  hasPilarWithBothDeity(params: string[]): boolean {
    const deityList1 =this.checkEnumList(params[0],ElementNEnergyRelation.RW)
    const deityList2 = this.checkEnumList(params[1],ElementNEnergyRelation.RW)
    const pilarNames = LunarBase.ymdhCharArr;
    //console.log("hasPilarWithBothDeity", params);
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      const checkParams = [pilarName, deityList1, deityList2];
      if (this.isPilarWithBothDeity(checkParams)) return true;
    }
    return false;
  }

  // Check if the pilar branche name is among the branche List
  isPilarBranche(pilarName: string, brancheList: string): boolean {
    this.checkEnumList(brancheList,Branche.RAT)
    const pilar = this.getPilar(pilarName);
    const brancheName = pilar.branche.getName();
    //console.log("isPilarBranche ",pilarName, pilar, brancheList, brancheName )
    return brancheList.indexOf(brancheName) >= 0;
  }

  // Check if the pilar branche name is among the branche List
  isBranche(params: string[]): boolean {
    if (params.length !== 2) return false;
    const pilarName = params[0];
    const brancheList = this.checkEnumList(params[1],Branche.RAT)
    //console.log("isBranche ",params )
    return this.isPilarBranche(pilarName, brancheList);
  }

   // Check if the branche list is define in 4 pilar
   // HasBranche°Count,BrancheList
   hasBranche(params: string[]): boolean {
    let count=+params[0]
    const brancheList = this.checkEnumList(params[1],Branche.RAT)
    this.checkEnumList(brancheList, Branche.RAT)
    //console.log("hasBranche ",params )
    for (let index = 0; index < LunarBase.ymdhCharArr.length; index++) {
      const pilarName = LunarBase.ymdhCharArr[index];
      if ( this.isBranche([pilarName,brancheList])) {
        count--;
        if ( count===0 ) return true
      }
    }
    return false
  }

  // Period Deity pivot element and birth pilar transformed to a bad
  // Check Val -1 or -2
  // To be redifined in period subclass
  isPDeityElemBadTransformed(params: string[]) {
    return false;
  }

  hasTrunk(params: string[]): boolean {
    let countHit = +params[0];
    const checkTrunks = this.checkEnumList(params[1],Trunk.JIA)
    this.checkEnumList(checkTrunks, Trunk.JIA)
    //console.log("hasPilarTrunk ", attrVal)
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      if (checkTrunks.indexOf(this.lunar.getTrunk(pilarIdx).getName()) >= 0) {
        countHit--;
        if (countHit === 0) return true;
      }
    }
    return false;
  }
  // Usage PilarBrancheTamHopHoa°PilarName,PilarBrancheName[,+ for can be transformed ]
  hasPilarBrancheTamHopHoa(params: string[]): boolean {
    const pilarName = params[0];
    const chechBrancheName = this.checkEnumList(params[1],Branche.RAT);
    let combListtype = CombAttr.BRANCHECOMB3TYPE ;
    if ( params.length==3 ) {
      if (params[2]==="+" ) {
        combListtype = CombAttr.BRANCHECOMB3WITHTRANSFORMTYPE ;
      }
    }
    const pilar = this.getPilar(pilarName)
    //console.log("hasPilarBrancheTamHopHoa ", params, pilar)
    if (chechBrancheName.indexOf(pilar.branche.getName())>=0 ) {
      const pilarAttr = this.lunar.pilarsAttr
      const comb5Pilars = pilarAttr.getCombListByType(pilarName,combListtype)
      return comb5Pilars.length>=0
    }
    return false;
  }

    // Usage PilarTamHopHoa°PilarName1,PilarName2,+ for can be transformed ]
    hasPilarBrancheTamHop(params: string[]): boolean {
      const pilarIdx1 = LunarBase.getPilarIdx(params[0])
      const pilarIdx2 = LunarBase.getPilarIdx(params[1])
      const combAttr = this.lunar.pilarsAttr.combList.getPilarsCombTypeAttrList(
        CombAttr.BRANCHECOMB3TYPE,
        pilarIdx1,pilarIdx2
      );
      return combAttr.length>0
    }

    // Usage BrancheTamHopHoa°PilarBrancheName[,+ for can be transformed ]
    hasBrancheTamHopHoa(params: string[]): boolean {
      //console.log("hasBrancheTamHopHoa ", params)
      for (let index = 0; index < LunarBase.ymdhCharArr.length; index++) {
        const pilarName = LunarBase.ymdhCharArr[index];
        if ( this.hasPilarBrancheTamHopHoa([pilarName].concat(params))) return true;
      }
      return false
    }

  // Usage PilarTrunkHopHoa°PilarName,PilarTrunkName[,+ for can be transformed ]
  hasPilarTrunkHopHoa(params: string[]): boolean {
    const pilarName = params[0];
    const checkTrunkName =   this.checkEnumList(params[1],Trunk.JIA)
    let comb5Listtype = CombAttr.TRUNKCOMB5TYPE ;
    if ( params.length==3 ) {
      if (params[2]==="+" ) {
        comb5Listtype = CombAttr.TRUNKCOMB5WITHTRANSFORMTYPE ;
      }
    }
    const pilar = this.getPilar(pilarName)
   // console.log("hasPilarTrunkHopHoa ", params, pilar)
    if (checkTrunkName.indexOf(pilar.trunk.getName())>=0 ) {
      const pilarAttr = this.lunar.pilarsAttr
      const comb5Pilars = pilarAttr.getCombListByType(pilarName,comb5Listtype)
      return comb5Pilars.length>=0
    }
    return false;
  }

  // Usage TrunkHopHoa°PilarTrunkName[,+ for can be transformed ]
  hasTrunkHopHoa(params: string[]): boolean {
   // console.log("hasTrunkHopHoa ", params)
    for (let index = 0; index < LunarBase.ymdhCharArr.length; index++) {
      const pilarName = LunarBase.ymdhCharArr[index];
      const newParams = [pilarName].concat(params);
      if ( this.hasPilarTrunkHopHoa(newParams)) return true;
    }
    return false
  }

  hasPilarTrunk(params: string[]): boolean {
    const pilarNames = params[0].split("/");
    const checkTrunks = this.checkEnumList(params[1],Trunk.JIA)
    //console.log("hasPilarTrunk ", params);
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      const pilar = this.getPilar(pilarName);
      if ( checkTrunks.indexOf(pilar.trunk.getName()) >= 0) return true
    }

    return false;
  }

  // Bad params[0] and params[1] xx branche
  isBadBranche(params: string[]) {
    if (params.length !== 2) return false;
    const pilar1 = this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isBadBranche ", pilar1, pilar2)
    return BrancheHelper.isBadYearAgeNPeriod(pilar1.branche, pilar2.branche);
  }

  // Period non favorable. Overrided in sub class
  isBadPeriod() {
    return false;
  }

  // attrVal is hostile deity pivot
  isDeityHostilePivot(attrVal: string) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const pivotHostileElements = pilarsAttr.pivotHostileElements;
    const deityName = this.checkEnumList(attrVal,ElementNEnergyRelation.RW)
    let deityElement = pilarsAttr.deityAttr.getDeityElementByName(deityName);
    //console.log("isDeityHostilePivot",attrVal, deityElement,pivotHostileElements)
    return ObjectHelper.findIndex(pivotHostileElements, deityElement) !== -1;
  }



  // Period LifeCycle name and Force Check
  isPerLCleStatus(attrVal: string) {
    const periodNb = this.getPeriodNb();
    const lifeCycle = this.lunar.getPeriodLifeCycle(periodNb);
    const forceFavorable = this.lunar.isFavorableLifeCycle(periodNb, lifeCycle);
    const lfNameNForce =
      lifeCycle.getName() + StringHelper.bool2Str(forceFavorable);
    //console.log("isPerLCleStatus",attrVal,lfNameNForce)
    return attrVal.indexOf(lfNameNForce) >= 0;
  }

  // Same year pilar trunk branche
  isSamePilarTrunkBranche(params: string[]) {
    if (params.length !== 2) return false;
    const pilar1 = this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isSamePilarTrunkBranche",params,pilar1,pilar2)
    return pilar1.trunk === pilar2.trunk && pilar1.branche === pilar2.branche;
  }

  // checkPilarName Pivot Hostile
  isPilarDeityHostilePivot(checkPilarName: string) {
    const pilar = this.getPilar(checkPilarName);
    const deityName = pilar.deity.getName();
    //console.log("isPilarDeityHostilePivot",checkPilarName, deityName )
    return this.isDeityHostilePivot(deityName);
  }

  // Check Structure
  isStructures(param: string) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const structureNames = pilarsAttr.getStructureNames();
    const structures = this.checkEnumList(param,BaziStructure.CHINH_AN)
    //console.log("isStructures",structures, structureNames)
    for (let index = 0; index < pilarsAttr.structure.length; index++) {
      const structName = structureNames[index];
      if (structures.indexOf(structName) >= 0) return true;
    }
    return false;
  }

  hasPilarBrancheWeakened(params: string[]) {
    let countHit = +params[0];
    for (let index = 0; index < LunarBase.PILARS_LEN; index++) {
      const pilar = this.lunar.getPilar(index);
      if (pilar.isBrancheWeakenedByTrunk()) {
        countHit--;
        if (countHit === 0) return true;
      }
    }
    return false;
  }

  //pilar element is in elementList
  isPilarElement(pilarName: string, checkElement: string) {
    const pilar = this.getPilar(pilarName);
    const pilarElementName = pilar.getElement().getName();
    //console.log("isPilarElement", pilar,checkElement, pilarElementName)
    return checkElement.indexOf(pilarElementName) >= 0;
  }

  //pilar element is in elementList
  isPilarElementClashed(params: string[]) {
    if (params.length !== 2) return false;
    const pilar1 = this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    const pilar1Element = pilar1.getElement();
    const pilar2Element = pilar2.getElement();
    //console.log("isPilarElementClashed",params, pilar1, pilar2)
    return (
      pilar1Element.isDestructive(pilar2Element) ||
      pilar2Element.isDestructive(pilar1Element)
    );
  }

  isPilarTrunkClash(params: string[]) {
    if (params.length !== 2) return false;
    const pilar1 = this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isPilarTrunkClash",params, pilar1, pilar2)
    return pilar1.isTrunkClashed(pilar2);
  }

  isPilarBrancheClash(params: string[]) {
    const pilar1Name = params[0]
    const pilar1 = this.getPilar(pilar1Name);
    let checkPilarList = LunarBase.ymdhCharArr
    if ( params.length===2 ) {
      checkPilarList = params[1].split("/")
    }
    //console.log("isPilarBrancheClash",params, pilar1, checkPilarList)
    for (let index = 0; index < checkPilarList.length; index++) {
      const checkPilarName = checkPilarList[index];
      if ( checkPilarName!==pilar1Name ) {
        const  checkPilar = this.getPilar(checkPilarName);
        if ( pilar1.isBrancheClashed(checkPilar ) ) return true
      }

    }
    return false;
  }

  hasBrancheClash()  {
    for (let pilar1 = 0; pilar1 < LunarBase.ymdhCharArr.length; pilar1++) {
      const pilar1Name = LunarBase.ymdhCharArr[pilar1];
      for (let pilar2 = pilar1+1; pilar2 < LunarBase.ymdhCharArr.length; pilar2++) {
        const pilar2Name = LunarBase.ymdhCharArr[pilar2];
        if ( this.isPilarBrancheClash([pilar1Name,pilar2Name]) ) {
          return true
        }
      }
    }
    return false
  }
  isPilarCompatible(params: string[]) {
    if (params.length !== 2) return false;
    const pilar1 = this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isPilarCompatible",params, pilar1, pilar2)
    return pilar1.isCompatible(pilar2);
  }

  // Deity on Pilar Lifecycle favorable
  isDeityOnPilarLifeCycleFavorable(params: string[]) {
    if (params.length < 3) return false;
    const checkDeityList = this.checkEnumList(params[0],ElementNEnergyRelation.RW);
    const checkLifeCycleNameList = this.checkEnumList(params[1],ElementLifeCycle.TOMB);
    const checkIsFavorable = params[2] === "+";
    //console.log("isDeityOnPilarLifeCycleFavorable",attrVal,checkDeityList, checkLifeCycleNameList, checkIsFavorable)
    const pilars = this.lunar.getPilars();
    const periodNb = this.getPeriodNb();

    for (let pilarIdx = 0; pilarIdx < pilars.length; pilarIdx++) {
      const pilar = pilars[pilarIdx];
      const pilarDeity = pilar.deity;
      const forceFavorable = this.lunar.isFavorableLifeCycle(
        periodNb,
        pilar.lifeCycle
      );
      //console.log(" forceFavorable ",forceFavorable,checkIsFavorable)
      if (checkIsFavorable === forceFavorable) {
        //console.log(" pilarDeity ",checkDeityList, checkLifeCycleNameList, pilarDeity, pilar)
        if (checkDeityList.indexOf(pilarDeity.getName()) >= 0) {
          if (checkLifeCycleNameList.indexOf(pilar.lifeCycle.getName()) >= 0) {
            //console.log("isDeityOnPilarLifeCycleFavorable FOUND",attrVal,checkDeityList, checkLifeCycleNameList, checkIsFavorable)
            return true;
          }
        }
      }
    }
    return false;
  }

  // Pilar has lifecycle
  isPilarLifeCycle(params: string[]) {
    const pilarName = params[0];
    const checkLifeCycleNameList = this.checkEnumList(params[1],ElementLifeCycle.TOMB);
   //console.log("isPilarLifeCycle", params);
    const pilar = this.getPilar(pilarName);
    return checkLifeCycleNameList.indexOf(pilar.lifeCycle.getName()) >= 0;
  }


  // Pilar with Deity and Lifecycle
  isPilarDeityLifeCycle(params: string[]) {
    if (params.length != 3) return false;
    const checkPilarList = params[0].split("/");
    const checkDeityList = this.checkEnumList(params[1],ElementNEnergyRelation.RW);
    const checkLifeCycleNameList = this.checkEnumList(params[2],ElementLifeCycle.TOMB);
      for (let index = 0; index < checkPilarList.length; index++) {
        const checkPilar = checkPilarList[index];
        const pilar = this.getPilar(checkPilar);
        if ( checkDeityList.indexOf(pilar.deity.getName()) >=0 && checkLifeCycleNameList.indexOf(pilar.lifeCycle.getName()) >= 0) return true
    }
    return false;
  }

    // Pilar with both trunk and Lifecycle
    isPilarTrunkLifeCycle(params: string[]) {
      if (params.length != 3) return false;
      const checkPilarList = params[0].split("/");
      const checkTrunkList = this.checkEnumList(params[1],Trunk.BING);
      const checkLifeCycleNameList = this.checkEnumList(params[2],ElementLifeCycle.TOMB);
      //console.log("isPilarTrunkLifeCycle ",params )
      for (let index = 0; index < checkPilarList.length; index++) {
          const checkPilar = checkPilarList[index];
          const pilar = this.getPilar(checkPilar);
          if ( checkTrunkList.indexOf(pilar.trunk.getName()) >=0 && checkLifeCycleNameList.indexOf(pilar.lifeCycle.getName()) >= 0) return true
      }
      return false;
    }

        // Pilar with both branche and Lifecycle
        isPilarBrancheLifeCycle(params: string[]) {
          if (params.length != 3) return false;
          const checkPilarList = params[0].split("/");
          const checkBrancheList = this.checkEnumList(params[1],Branche.RAT);
          const checkLifeCycleNameList = this.checkEnumList(params[2],ElementLifeCycle.TOMB);
          //console.log("isPilarBrancheLifeCycle ",params, )
          for (let index = 0; index < checkPilarList.length; index++) {
              const checkPilar = checkPilarList[index];
              const pilar = this.getPilar(checkPilar);
              if ( checkBrancheList.indexOf(pilar.branche.getName()) >=0 && checkLifeCycleNameList.indexOf(pilar.lifeCycle.getName()) >= 0) return true
          }
          return false;
        }


    // Any Pilar with Deity and Lifecycle
    isTrunkLifeCycle(params: string[]) {
      if (params.length != 2) return false;
      const myParams = ["Y/M/D/H"].concat(params)
      return this.isPilarTrunkLifeCycle(myParams);
    }

        // Any Pilar with Deity and Lifecycle
    isBrancheLifeCycle(params: string[]) {
      if (params.length != 2) return false;
      const myParams = ["Y/M/D/H"].concat(params)
      return this.isPilarBrancheLifeCycle(myParams);
     }

  hasAtLeast3SameYearHostileBranche() {
    let branche = this.lunar.get3PlusSameBranche();
    //console.log("hasAtLeast3SameYearHostileBranche",branche)
    if (branche !== null) {
      const yearBranche = this.studyYear.getyBranche();
      return !BrancheHelper.getMainRelation(yearBranche, branche).isFavorable();
    }
    return false;
  }

  isTrunkCompatible(params: string[]) {
    if (params.length < 2) return false;
    const pilar1 = this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isTrunkCompatible", params, pilar1, pilar2)
    return pilar1.isTrunkCompatible(pilar2);
  }

  // Is  params pilar has minCount clashed
  isPilarNClashed(minCount: number, params: string[]) {
    let count = minCount;
    for (let pilar1Idx = 0; pilar1Idx < params.length; pilar1Idx++) {
      const pilar1 = this.getPilar(params[pilar1Idx]);
      for (let index = pilar1Idx; index < params.length; index++) {
        const pilar2 = this.getPilar(params[index]);
        if (pilar1.isTrunkBrancheClashed(pilar2)) {
          count--;
          if (count === 0) return true;
        }
      }
    }
    //console.log("isPilarNClashed", minCount, params, count)
    return false;
  }

  // Is params[0] minimum count pilar clashed
  isPilarXClashed(params: string[]) {
    if (params.length < 3) return false;
    const minCount = +params[0];
    params.shift();
    //console.log("isPilarXClashed", minCount, params)
    return this.isPilarNClashed(minCount, params);
  }

  // Is
  isPilarByNameClashed(checkPilarName: string, pilarsCheckList: string[]) {
    const checkPilar = this.getPilar(checkPilarName);
    //console.log("isPilarByNameClashed 1",checkPilar, pilarsCheckList)
    for (let pilarIdx = 0; pilarIdx < pilarsCheckList.length; pilarIdx++) {
      const pilar = this.getPilar(pilarsCheckList[pilarIdx]);
      if (checkPilar.isTrunkBrancheClashed(pilar)) {
        return true;
      }
    }
    return false;
  }

    // Is
    isPilarByNameTrunkClashed(checkPilarName: string, pilarsCheckList: string[]) {
      const checkPilar = this.getPilar(checkPilarName);
     //console.log("isPilarByNameTrunkClashed",checkPilar, pilarsCheckList)
      for (let pilarIdx = 0; pilarIdx < pilarsCheckList.length; pilarIdx++) {
        const pilar = this.getPilar(pilarsCheckList[pilarIdx]);
        if (checkPilar.isTrunkClashed(pilar)) {
          return true;
        }
      }
      return false;
    }

  // Is params[0] and params[1] pilar is all clashed
  isPilarClashed(params: string[]) {
    if (params.length < 3) return false;
    let count = +params[0];
    const checkPilarName = params[1];
    let pilarsCheckList = params[2].split("/");
    if (pilarsCheckList.length == 0) {
      pilarsCheckList = ["Period", "Destin", "Year", "Y", "M", "D", "H"];
      const index = pilarsCheckList.indexOf(checkPilarName);
      if (index !== -1) {
        pilarsCheckList.splice(index, 1);
      }
    }
    //console.log("isPilarClashed",params,checkPilar,checkPilarName, count, pilarsCheckList)
    for (let pilarIdx = 0; pilarIdx < pilarsCheckList.length; pilarIdx++) {
      if (this.isPilarByNameClashed(checkPilarName, pilarsCheckList)) {
        count--;
        if (count === 0) return true;
      }
    }
    return false;
  }

    // Is params[0] and params[1] pilar is all clashed
    isPilarTrunkClashed(params: string[]) {
      if (params.length < 3) return false;
      let count = +params[0];
      const checkPilarName = params[1];
      let pilarsCheckList = params[2].split("/");
      if (pilarsCheckList.length == 0) {
        pilarsCheckList = ["Period", "Destin", "Year", "Y", "M", "D", "H"];
        const index = pilarsCheckList.indexOf(checkPilarName);
        if (index !== -1) {
          pilarsCheckList.splice(index, 1);
        }
      }
      //console.log("isPilarClashed",params,checkPilar,checkPilarName, count, pilarsCheckList)
      for (let pilarIdx = 0; pilarIdx < pilarsCheckList.length; pilarIdx++) {
        if (this.isPilarByNameTrunkClashed(checkPilarName, pilarsCheckList)) {
          count--;
          if (count === 0) return true;
        }
      }
      return false;
    }
  // Check Genre  1==isMan
  isGenre(params: string[]) {
    if (params.length === 0) return false;
    //console.log("isGenre ", params,this.lunar.isMan && params[0]==="1")
    return this.lunar.isMan && params[0] === "m";
  }

  isPilarNotClashed(params: string[]) {
    const len = params.length;
    //console.log("isPilarNotClashed", params)
    for (let pIdx1 = 0; pIdx1 < len; pIdx1++) {
      const currPilar1 = this.getPilar(params[pIdx1]);
      for (let pIdx2 = pIdx1 + 1; pIdx2 < len; pIdx2++) {
        const currPilar2 = this.getPilar(params[pIdx2]);
        //console.log("isPilarNotClashed", currPilar1, currPilar2, currPilar1.isPilarClashed(currPilar2))
        if (currPilar1.isPilarClashed(currPilar2)) return false;
      }
    }
    return true;
  }

  //anyPilar clashed with pilar containing one of the deities name
  isDeityPilarCLashed(params: string[]) {
    if (params.length !== 2) return false;
    const checkPilar = this.getPilar(params[0]);
    const deitiesName = this.checkEnumList(params[1],ElementNEnergyRelation.RW);
    const pilarsAttr = this.lunar.pilarsAttr;
    //console.log("isDeityPilarCLashed", params, checkPilar)
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      const pilar = this.lunar.getPilar(pilarIdx);
      if (checkPilar.isTrunkBrancheClashed(pilar)) {
        let pilarDeityName = pilarsAttr.getPilarDeity(pilarIdx).getName();
        if (deitiesName.indexOf(pilarDeityName) >= 0) return true;
        //Hidden deity
        let hiddenDeities = pilarsAttr.getHiddenPilarDeities(pilarIdx);
        for (let hiddenIdx = 0; hiddenIdx < hiddenDeities.length; hiddenIdx++) {
          const deity = hiddenDeities[hiddenIdx];
          if (deity !== null && deitiesName.indexOf(deity.getName()) >= 0)
            return true;
        }
      }
    }
    return false;
  }


  //anyPilar clashed with any pilar containing one of the deities name
  // DeityOnClashedPilar°count,DeityList,
  isDeityOnCLashedPilar(params: string[]) {
    if (params.length !== 2) return false;
    const checkdeityList=this.checkEnumList(params[1],ElementNEnergyRelation.RW);
    let count = +params[0]
    for (let pilarIdx = 0; pilarIdx < LunarBase.ymdhCharArr.length; pilarIdx++) {
      const checkPilarName = LunarBase.ymdhCharArr[pilarIdx]
      if ( this.isDeityPilarCLashed([checkPilarName,checkdeityList])) {
        count--;
        if ( count===0 ) return true
      }
    }
    return false;
  }

  // To be override in period sub class
  getPeriodNb() {
    return 0;
  }

  // Check van enfant, adolescent, ...
  isPeriodNb(params: string[]) {
    const checkFrom = +params[0];
    const currPeriodNb = this.getPeriodNb();
    let checkTo = 10;
    if (params.length >= 2) checkTo = +params[1];
    //console.log("isPeriodNb", params, currPeriodNb, checkFrom, checkTo)
    return currPeriodNb >= checkFrom && currPeriodNb <= checkTo;
  }

  isDayTMaster(param:string) {
    const trunkName = this.checkEnumList(param,Trunk.BING);
    const dTrunk = this.lunar.pilars[ LunarBase.DINDEX].trunk;
    return trunkName==dTrunk.getName()
  }

  isDayEMaster(param:string) {
    const elementName = this.checkEnumList(param,Element.EARTH);
    const dElement = this.baseAttr.dTrunkElementNEnergy.element;
    return elementName==dElement.getName()
  }


  isAttrPresent(key: string, attrKey: string, attrVal: string): boolean {
    const params = attrVal.split(",");
    this.checkMethod=attrKey + " "+ attrVal
    switch (attrKey) {
      case "HighDeity":
        return this.isHeighDeityCount(params, false);
      case "LowDeity":
        return this.isLowDeityCount(params, false);
      case "HasDeity":
        return this.hasNonZeroDeityCount(params, true);
        case "HighDeityGrp":
          return this.isHeighDeityCount(params, true);
        case "LowDeityGrp":
          return this.isLowDeityCount(params, true);

      case "HasSecDeity":
        return this.hasSecDeity(params);
      case "HasTrunk":
        return this.hasTrunk(params);
      case "TrunkHopHoa":
        return this.hasTrunkHopHoa(params);
        case "PilarTrunkHopHoa":
          return this.hasPilarTrunkHopHoa(params);

      case "HasPilarWithBothDeitySecDeity":
        return this.hasPilarWithBothDeityNSecDeity(params);
       case "PilarWithBothDeitySecDeity":
          return this.isPilarWithBothSecNDeity(params);
      case "PilarWithBothDeity":
            return this.isPilarWithBothDeity(params);
      case "HasPilarWithBothDeity":
          return this.hasPilarWithBothDeity(params);
      case "PilarWithBothDeityNSecDeity":
        return this.isPilarWithDeityNSecDeity(params);
      case "ZeroDeity":
        return this.hasNonZeroDeityCount(params, false);
      case "ZeroSecDeity":
        return this.hasZeroSecDeity(params);

      case "DeityPilarClashed":
        return this.isDeityPilarCLashed(params);
      case "DeityOnCLashedPilar":
        return this.isDeityOnCLashedPilar(params);
      case "PDeityElemBadTransformed":
        return this.isPDeityElemBadTransformed(params);
      case "DeityElement":
        return this.isDeityElement(params)
      case "DeityHostilePivot":
        return this.isDeityHostilePivot(attrVal);
      case "BrancheDeity":
        return this.isBrancheDeities(params);
      case "DeityOnPilarLifeCycleFavorable":
        return this.isDeityOnPilarLifeCycleFavorable(params);
     case "DeityLifeCycle":
          params.unshift("Y/M/D/H")
          return this.isPilarDeityLifeCycle(params);
     case "PilarDeityLifeCycle":
            return this.isPilarDeityLifeCycle(params);
     case "PilarTrunkLifeCycle":
              return this.isPilarTrunkLifeCycle(params);
     case "TrunkLifeCycle":
                return this.isTrunkLifeCycle(params);
      case "PilarTDeity":
            return this.containsTrunkDeity(params);
      case "PilarBDeity":
              return this.containsHiddenDeity(params);
      case "PilarTNBDeity":
                return this.containsTrunkDeity(params) && this.containsHiddenDeity(params);
      case "PilarTOBDeity":
                return this.containsDeity(params);
      case "PilarDeityNHidden":
                  return this.containsDeityNHidden(params);
      case "HasPilarDeityNHidden":
            return this.hasPilarDeityNHidden(params);
      case "PilarSecDeity":
        return this.containsSecDeity(params);
      case "PYDeity":
        return (
          this.isPilarDeityInDeityList("Period", attrVal) ||
          this.isPilarDeityInDeityList("Year", attrVal)
        );
      case "PilarLifeCycle":
        return this.isPilarLifeCycle(params);
      case "PilarTrunk":
        return this.hasPilarTrunk(params);
      case "PilarTClashed":
          return this.isPilarTrunkClashed(params);
      case "PilarClashed":
        return this.isPilarClashed(params);
      case "PilarXClashed":
        return this.isPilarXClashed(params);
      case "PilarNotClashed":
        return this.isPilarNotClashed(params);
      case "PilarDeityPivotHostile":
        return this.isPilarDeityHostilePivot(attrVal);
      case "SamePilarTrunkBranche":
        return this.isSamePilarTrunkBranche(params);
      case "PilarElement":
        return this.isPilarElement(params[0], params[1]);
      case "PYElement":
        return (
          this.isPilarElement("Period", attrVal) ||
          this.isPilarElement("Year", attrVal)
        );
      case "PilarTrunkClash":
        return this.isPilarTrunkClash(params);
      case "PilarBrancheClash":
        return this.isPilarBrancheClash(params);

      case "PilarCompatible":
        return this.isPilarCompatible(params);
      case "PilarElementClash":
        return this.isPilarElementClashed(params);
      case "PilarFavorablePivot":
        return this.isPilarFavorablePivot(params);
      case "PilarHostilePivot":
        return this.isPilarHostilePivot(params);
      case "HasPilarBrancheWeakened":
        return this.hasPilarBrancheWeakened(params);

      case "PivotFavorable":
        return this.isFavorablePivot(params);
      case "PivotFavorableElement":
        return this.isElementFavorablePivot(attrVal);
      case "PivotHostile":
        return this.isHostilePivot(params);
      case "PivotSupport":
        return this.isPivotSupport();

      case "SecDeityOnPivotFavorable":
        return this.isSecDeityOnFavorablePivot(params);
        case "SecDeityOnPivotHostile":
          return this.isDeityOnHostilePivot(params);
      case "SecDeityClashed":
        return this.isSecDeityClashed(params);
      case "SecDeitiesOnSamePilar":
        return this.hasSecDeitiesOnSamePilar(params);
      case "SecDeityOnPilarLifeCycle":
        return this.isSecDeityOnPilarLifeCycle(params);

      case "QiType":
        return this.hasQiType(params);

      case "QuyNhan":
        return this.hasQuyNhan;
      case "NoQuyNhan":
        return !this.hasQuyNhan;
      case "Genre":
        return this.isGenre(params);

      case "PilarBrancheLifeCycle":
          return this.isPilarBrancheLifeCycle(params);
      case "BrancheLifeCycle":
          return this.isBrancheLifeCycle(params);
      case "Branche":
        return this.isBranche(params);
      case "HasBranche":
          return this.hasBranche(params);
      case "BrancheClashed":
          return this.hasBrancheClash();
      case "PYBranche":
        return (
          this.isPilarBranche("Period", attrVal) ||
          this.isPilarBranche("Year", attrVal)
        );
      case "BadBranche":
        return this.isBadBranche(params);
      case "BrancheTamHopHoa":
          return this.hasBrancheTamHopHoa(params);
        case "PilarBrancheTamHopHoa":
            return this.hasPilarBrancheTamHopHoa(params);
        case "PilarTamHop":
            return this.hasPilarBrancheTamHop(params);

      case "BadPeriod":
        return this.isBadPeriod();
      case "PerLCyleStatus":
        return this.isPerLCleStatus(attrVal);
      case "Structures":
        return this.isStructures(attrVal);
      case "AtLeastSameYearHostileBranche":
        return this.hasAtLeast3SameYearHostileBranche();
      case "TrunkCompatible":
        return this.isTrunkCompatible(params);
      case "AgePeriod":
        return this.isPeriodNb(params);
      case "ElementForce":
        return this.isElementForce(params)
      case "ElementBalanced":
        return this.isBalancedElement()
      case "TrunkElementPresent":
          return this.isTrunkElementPresent(attrVal);
      case "DayForce":
        return this.isDayForceStatus(attrVal);
      case "BirthSeason":
        return this.isBirthSeason(attrVal);
      case "DayTMaster":
        return this.isDayTMaster(attrVal);
        case "DayEMaster":
          return this.isDayEMaster(attrVal);
      default:
        console.log("UNKNOW CASE ", attrKey, key);
    }
    return false;
  }

  filterOnHeader(header: string) {
    const selectHeaders = PropertyHelper.getHeaderKeys(header);
    const logMe = false;
    const startKeyIdx = 2;
    if (logMe) console.log(header, selectHeaders);
    for (let index = 0; index < selectHeaders.length; index++) {
      let key = selectHeaders[index];
      this.checkKey=key
      let res = true;
      let CHECKALL = true; // break on first check is false
      const keyArr = key.split(".");
      const len = keyArr.length - 1;
      const idx = keyArr[len].indexOf("&");
      if (idx === -1) {
        console.log("MISSING &", key);
      } else {
        keyArr[len] = keyArr[len].substring(0, idx);
      }
      for (let index = startKeyIdx; index <= len; index++) {
        let currAttrkey = keyArr[index];
        const paramIdx = currAttrkey.indexOf("°");
        let currAttrVal = "NONE";
        // parameter
        if (paramIdx > 0) {
          currAttrVal = currAttrkey.substring(paramIdx + 1);
          currAttrkey = currAttrkey.substring(0, paramIdx);
        }
        let isPositive = true;
        if  (currAttrkey[0] === "-" || currAttrkey[0] === "!") {
          isPositive = false;
          currAttrkey = currAttrkey.substring(1);
        }
        //console.log( "KEY", key, currAttrkey, currAttrVal)
        if (isPositive !== this.isAttrPresent(key, currAttrkey, currAttrVal)) {
          res = false;
          if (!CHECKALL) break;
        }
      }
      if (res) {
        let res = this.addBaseComment0(key, true);
        //console.log("FOUND KEY", res, key);
      }
    }
  }

  filterbyHeader(header: string) {
    const dayForce = this.baseAttr.dayForce;
    this.filterOnHeader(header + "0");
    this.filterOnHeader(header + "+"); // Testing purpose
    this.filterOnHeader(header + "-"); // Testing purpose
    //this.comentOnHeader(header+dayForce);
  }

  //
  filterObservation(header: string, isDestin: boolean) {
    if (!isDestin) this.filterbyHeader("PY.");
    this.filterbyHeader(header);
  }

  override comment() {
    super.comment();
    this.evalBaseDestinyPoint();
    this.evalCurrAttr();
    this.filterObservation("Destin.", true);
  }
}
