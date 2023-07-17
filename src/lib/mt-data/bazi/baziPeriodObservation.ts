import { BrancheHelper } from "../../helper/brancheHelper";
import { PilarHelper } from "../../helper/pilarHelper";
import { QiHelper } from "../../helper/qiHelper";
import { StringHelper } from "../../helper/stringHelper";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { Element } from "../feng-shui/element";

import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { QiType } from "../qi/qi-type";
import { Bazi } from "./bazi";
import { BaziObservationBase } from "./baziObservationBase";
import { LunarBase } from "./lunarBase";
import { BaziStructureHelper } from "../../helper/bazi-structureHelper";
import { PropertyHelper } from "../../helper/PropertyHelper";
import { DeityHelper } from "../../helper/deityHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { BaziStructure } from "./bazi-structure";
import { PilarBase } from "./pilarBase";


export class BaziPeriodObservation extends BaziObservationBase {
  periodAttr: any = null ;

  constructor(bazi: Bazi) {
    super(bazi);
  }

  evalPeriodPoint(currStudyYear: Bazi, forceMultFactor?: number) {
    if (typeof forceMultFactor === "undefined") {
      forceMultFactor = 1;
    }
    this.resetPoints();
    this.periodAttr = QiHelper.evalPeriodQi(this.lunar, currStudyYear);
    const perQiRec = this.periodAttr.periodQi;

    // Period Status. Ref3p133
    this.incForce(
      forceMultFactor * perQiRec.getForce(QiType.PERIODSTATUSFORCE)
    );
    this.incForce(
      forceMultFactor * perQiRec.getForce(QiType.PERIODDAYELEMENTSTATUS)
    );
  }


  getNextDotPos(key: string, currIdx:number) {
    let dotPos = key.indexOf(".",currIdx)
    if ( dotPos===-1 ) dotPos = key.indexOf("&",currIdx)
    if ( dotPos===-1 ) dotPos = key.length-1;
    return dotPos
  }

  containsSecDeity(params: string[]) : boolean{
    if ( params.length!==2 ) return false
    const pilarIdx = LunarBase.getPilarIdx(params[0])
    const secDeitiesList = params[1]
    const secDeties = this.lunar.pilarsAttr.secondaryDeityPilars[pilarIdx]
    //console.log("containsSecDeity ",params, pilarIdx, secDeitiesList, secDeties)
    for (let index = 0; index < secDeties.length; index++) {
      const name = secDeties[index].getName();
      if ( secDeitiesList.indexOf(name) >= 0 ) return true;
    }
    return false
  }

    // Check if the element is a favorable pivot
    isElementFavorablePivot (elementName: string) : boolean{
      const pilarsAttr = this.lunar.pilarsAttr;
      const pivotElementsName = pilarsAttr.getElligiblePivotElementNames()
      return ObjectHelper.findIndex(pivotElementsName,elementName)!==-1;
    }

    // Check if the deity is a favorable pivot
    isFavorablePivot (params: string[]) : boolean{
      const pilarsAttr = this.lunar.pilarsAttr;
      let countHit=+params[0]
      const checkPivots = params[1].split("/")
      const pivotsElementsName = pilarsAttr.getElligiblePivotElementNames()
      //console.log("isFavorablePivot",params, checkPivots,pivotsElementsName )
      for (let index = 0; index < checkPivots.length; index++) {
        const deityName = checkPivots[index];
        let deityElementName=pilarsAttr.deityAttr.getDeityElementByName(deityName).getName()
        //console.log("isFavorablePivot",deityName,deityElementName )
        if( ObjectHelper.findIndex(pivotsElementsName,deityElementName)!==-1 ) {
          countHit--;
          if ( countHit===0 ) return true;
        }
      }
      return false;
    }

        // Check if the deity is a hostile pivot
        isHostilePivot (params: string[]) : boolean{
          let countHit=+params[0]
          const pilarsAttr = this.lunar.pilarsAttr;
          const checkPivots = params[1].split("/")
          const pivotsElementsName = pilarsAttr.getPivotHostileElements()
          console.log("isHostilePivot",params, checkPivots,pivotsElementsName )
          for (let index = 0; index < checkPivots.length; index++) {
            const deityName = checkPivots[index];
            let deityElementName=pilarsAttr.deityAttr.getDeityElementByName(deityName).getName()
            console.log("isHostilePivot",deityName,deityElementName )
            if( ObjectHelper.findIndex(pivotsElementsName,deityElementName)!==-1 ) {
              countHit--;
              if ( countHit===0 ) return true;
            }
          }
          return false;
        }


    // Check if the attrVal contains a favorable pivot
    isPilarFavorablePivot (pilarName: string) : boolean{
      const pilarsAttr = this.lunar.pilarsAttr;
      const pivotElements = pilarsAttr.elligiblePivotData.getValue();
      let pilarDeity = this.getPilarDeity(pilarName)
      let deityElement=pilarsAttr.deityAttr.getDeityElement(pilarDeity)
      //console.log("isPilarFavorablePivot",pilarName,deityElement )
      if ( ObjectHelper.findIndex(pivotElements,deityElement)!==-1) return true ;
      if ( pilarName.length===1 ) {
        const pilarIdx = LunarBase.getPilarIdx(pilarName)
        const  hiddenEnERArr = pilarsAttr.getHiddenPilarDeities(pilarIdx);
        for (let index = 0; index < hiddenEnERArr.length; index++) {
          pilarDeity = hiddenEnERArr[index];
          if ( pilarDeity!==null ) {
            deityElement=pilarsAttr.deityAttr.getDeityElement(pilarDeity)
            if ( ObjectHelper.findIndex(pivotElements,deityElement)!==-1 ) return true ;
          }
        }
      }
      return false
    }

  containsDeity(params: string[]) : boolean{
    if ( params.length!==2 ) return false
    const pilarName = params[0]
    const deityList = params[1]
    //console.log("containsDeity ", pilarName, deityList)
    return this.isPilarDeityInDeityList(pilarName,deityList)
  }


  isPilarDeityInDeityList(pilarName: string, deityList: string) : boolean{
    const deityName = this.getPilarDeity(pilarName).getName();
    //console.log("isPilarDeityInDeityList ", deityName, deityList)
    return deityList.indexOf(deityName)>=0;
  }

  // Check if the attrVal is among a nth greatest deity count
  isHeighDeityCount (params: string[],isGroup: boolean) : boolean{
    if ( params.length!==2 ) return false;
    const pilarsAttr = this.lunar.pilarsAttr;
    const nth = +params[0]
    const deityList = params[1]
    let dArr = null
    if ( isGroup ) {
      dArr = pilarsAttr.deityAttr.getOrderedCountDeityGroupName();
    } else {
      dArr = pilarsAttr.deityAttr.getOrderedCountDeityName();
    }
    const len = dArr.length-1

    //console.log("isHeighDeityCount ", params, nth, deityList, dArr)
    for (let index = 0; index <  dArr.length; index++) {
      const deityName =  dArr[len-index]
      //console.log("isHeighDeityCount ", deityName,  deityList.indexOf(deityName))
      if ( deityList.indexOf(deityName)>=0) return true ;
      if ( index===nth) break
    }
    return false;
  }


      // Check if the attrVal is among a lowest deity count
      isLowDeityCount (params: string[],isGroup: boolean) : boolean{
        if ( params.length!==2 ) return false;
        const pilarsAttr = this.lunar.pilarsAttr;
        const nth = +params[0]
        const deityList = params[1]
        let dArr = null
        if ( isGroup ) {
          dArr = pilarsAttr.deityAttr.getOrderedCountDeityGroupName();
        } else {
          dArr = pilarsAttr.deityAttr.getOrderedCountDeityName();
        }
        //console.log("isLowDeityCount ",params, nth, deityList, dArr)
        for (let index = 0; index < dArr.length; index++) {
          const deityName =  dArr[index]
          //console.log("isLowDeityCount ", deityName,  deityList.indexOf(deityName))
          if ( deityList.indexOf(deityName)>=0) return true ;
          if ( index===nth) break
        }
        return false;
      }

     // Check if the params deity list has  params[0] checkNonZero presence count
     hasNonZeroDeityCount (params: string[], checkNonZero: boolean) : boolean{
      const pilarsAttr = this.lunar.pilarsAttr;
      let countHit = +params[0] ;
      const checkDeityList = params[1].split("/")
      //console.log("hasDeityCount", params, countHit, checkDeityList)
        for (let index = 1; index < checkDeityList.length; index++) {
          const deityName = checkDeityList[index];
          const deity = DeityHelper.getDeityByName(deityName);
          const deityCount=pilarsAttr.getDeityCount(deity);
          if (checkNonZero===(deityCount!==0)) {
            countHit--;
            if ( countHit===0 ) return true
          }
        }
      return false;
    }
         // Check if the params deity list has zero params[0] secondary deity
         isZeroSecDeityCount (params: string[]) : boolean{
          const pilarsAttr = this.lunar.pilarsAttr;
          let countHit = +params[0] ;
          const checkSecDeitiesList = params[1]
          //console.log("isZeroSecDeityCount", countHit, checkSecDeitiesList)
          for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
            const secDeities = this.lunar.pilarsAttr.secondaryDeityPilars[pilarIdx]
            for (let index = 0; index < secDeities.length; index++) {
              const secDeityName = secDeities[index].getName();
              if ( checkSecDeitiesList.indexOf(secDeityName)>=0 ) {
                countHit--;
                if ( countHit===0 ) return true;
              }
            }
          }
          return false;
        }



    // Check if the pilar branche name is among the branche List
    isPilarBranche (pilarName:string, brancheList: string) : boolean{
      const pilar = this.getPilar(pilarName)
      const brancheName = pilar.branche.getName()
      //console.log("isPilarBranche ",pilarName, pilar, brancheList, brancheName )
      return  brancheList.indexOf(brancheName)>=0
    }

    // Check if the pilar branche name is among the branche List
       isBranche (params: string[]) : boolean{
        if ( params.length!==2 ) return false;
        const pilarName = params[0]
        const brancheList = params[1]
        //console.log("isBranche ",params )
        return this.isPilarBranche(pilarName,brancheList)
      }

    // Period Deity pivot element and birth pilar transformed to a bad
    // Check Val -1 or -2
    isPDeityElemBadTransformed (params: string[]) {

      if ( params.length!==1 ) return false;
      const periodPilar = this.periodAttr.pilar;
      const periodTransformed = PilarHelper.getPeriodPilarTransformStatus(periodPilar, this.lunar);
      //console.log(" isPDeityElemBadTransformed ", params, periodTransformed )
      if ( periodTransformed === null ) return false ;
      const checkVal = +params[0]
      const trVal = periodTransformed.getValue();
      return checkVal===trVal

    }

    protected override getPilar (pilarChar: string) {
      if ( pilarChar==="Period") return this.periodAttr.pilar
      return super.getPilar(pilarChar);
    }

    hasPilarTrunk ( attrVal: string ) {
      //console.log("hasPilarTrunk ", attrVal)
      for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
        if ( attrVal.indexOf(this.lunar.getTrunk(pilarIdx).getName())>=0 ) return true;
      }
      return false
    }


    // Bad params[0] and params[1] xx branche
    isBadBranche (params: string[]){
      if ( params.length!==2 ) return false ;
      const pilar1 = this.getPilar(params[0]);
      const pilar2 = this.getPilar(params[1]);
      //console.log("isBadBranche ", pilar1, pilar2)
    return BrancheHelper.isBadYearAgeNPeriod(pilar1.branche, pilar2.branche)
    }

    // Period non favorable
    isBadPeriod (){
      return !this.periodAttr.perStatus.getValue().isFavorable();
    }

    // attrVal is favotable deity pivot
    isDeityFavorablePivot (deityName: string){
      const pilarsAttr = this.lunar.pilarsAttr;
      const pivotElements = pilarsAttr.elligiblePivotData.getValue();
      let deityElement=pilarsAttr.deityAttr.getDeityElementByName(deityName);
      //console.log("isDeityFavorablePivot",attrVal, deityElement,pivotElements )
      return ObjectHelper.findIndex(pivotElements,deityElement)!== -1
    }

    // attrVal is hostile deity pivot
    isDeityHostilePivot (attrVal: string){
      const pilarsAttr = this.lunar.pilarsAttr;
      const pivotHostileElements = pilarsAttr.pivotHostileElements;
      let deityElement=pilarsAttr.deityAttr.getDeityElementByName(attrVal);
      //console.log("isDeityHostilePivot",attrVal, deityElement,pivotHostileElements)
      return ObjectHelper.findIndex(pivotHostileElements,deityElement)!== -1
    }

    // Period LifeCycle name and Force Check
    isPerLCleStatus (periodAttr: any, attrVal: string){
      const periodNb = periodAttr.periodNb;
      const lifeCycle = this.lunar.getPeriodLifeCycle(periodAttr.periodNb)
      const forceFavorable = this.lunar.isFavorableLifeCycle(periodNb,lifeCycle);
      const lfNameNForce = lifeCycle.getName()+StringHelper.bool2Str(forceFavorable);
      //console.log("isPerLCleStatus",attrVal,lfNameNForce)
      return attrVal.indexOf(lfNameNForce)>=0;
    }

    //BD0.pilar,xx BYD0  Pilar pilar Deity List  without checkHidden
    //BD1.pilar,xx BYD0  Pilar pilar Deity List with checkHidden
    isBrancheDeity (  params: string[], checkHidden: boolean) {
      if ( params.length<2 ) return false
      const deitiesName = params[1];
      const pilarsAttr = this.lunar.pilarsAttr;
      const pilarName = params[0]
      const pilar = this.getPilar(pilarName)
      let pilarDeity = pilar.deity
      //console.log("isBrancheDeity ", params, deitiesName, pilarDeity, pilar)
      if ( deitiesName.indexOf(pilarDeity.getName())>=0) return true;
      if ( checkHidden ) {
        const pilarIdx = LunarBase.getPilarIdx(pilarName)
        const  hiddenEnERArr = pilarsAttr.getHiddenPilarDeities(pilarIdx);
        for (let index = 0; index < hiddenEnERArr.length; index++) {
          pilarDeity = hiddenEnERArr[index];
          if ( pilarDeity!==null && deitiesName.indexOf(pilarDeity.getName())>=0) return true;
        }
      }
      return false ;
    }

   // Same year pilar trunk branche
   isSamePilarTrunkBranche (params: string[]){
    if ( params.length!==2 ) return false ;
    const pilar1= this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isSamePilarTrunkBranche",params,pilar1,pilar2)
    return  ( pilar1.trunk === pilar2.trunk ) && ( pilar1.branche === pilar2.branche )
  }


  // checkPilarName Pivot Hostile
  isPilarDeityHostilePivot (checkPilarName: string){
    const pilar = this.getPilar(checkPilarName)
    const deityName =pilar.deity.getName();
    //console.log("isPilarDeityHostilePivot",checkPilarName, deityName )
    return this.isDeityHostilePivot(deityName)
  }


    // Check Structure
    isStructures (structures:string){
      const pilarsAttr = this.lunar.pilarsAttr;
      const structureNames = pilarsAttr.getStructureNames()
      //console.log("isStructures",structures, structureNames)
      for (let index = 0; index < pilarsAttr.structure.length; index++) {
        const structName = structureNames[index];
        if (  structures.indexOf(structName)>=0 ) return true
      }
      return false
    }

    isPilarBrancheWeakened(params: string[] ) {
      let countHit=+params[0]
      for (let index = 0; index < LunarBase.PILARS_LEN; index++) {
        const pilar = this.lunar.getPilar(index);
        if ( pilar.isBrancheWeakenedByTrunk()) {
          countHit--
          if ( countHit===0 ) return true;
        }
      }
      return false
    }

    //pilar element is in elementList
    isPilarElement ( params: string[] ) {
      if ( params.length!==2 ) return false ;
      const pilar = this.getPilar(params[0]);
      const elementList = params[1];
      const pilarElementName = pilar.nagiaElement.getName()
      //console.log("isPilarElement",params, pilar,elementList, pilarElementName)
      return  elementList.indexOf(pilarElementName)>=0
  }


    //pilar element is in elementList
    isPilarElementClashed ( params: string[] ) {
      if ( params.length!==2 ) return false ;
      const pilar1 = this.getPilar(params[0]);
      const pilar2 = this.getPilar(params[1]);
      const pilar1Element= pilar1.nagiaElement;
      const pilar2Element= pilar2.nagiaElement;
      //console.log("isPilarElementClashed",params, pilar1, pilar2)
      return  pilar1Element.isDestructive(pilar2Element) || pilar2Element.isDestructive(pilar1Element)
   }

  isPilarTrunkClash ( params: string[] ) {
    if ( params.length!==2 ) return false ;
    const pilar1= this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isPilarTrunkClash",params, pilar1, pilar2)
    return pilar1.isTrunkClashed(pilar2)
  }

  isPilarBrancheClash ( params: string[] ) {
    if ( params.length!==2 ) return false ;
    const pilar1= this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isPilarBrancheClash",params, pilar1, pilar2)
    return pilar1.isBrancheClashed(pilar2)
  }

  isPilarCompatible (params: string[]) {
    if ( params.length!==2 ) return false ;
    const pilar1= this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isPilarCompatible",params, pilar1, pilar2)
    return pilar1.isCompatible(pilar2);
  }

  // Deity on Pilar Lifecycle favorable
  isDeityOnPilarLifeCycleFavorable (params:string[]) {
    if ( params.length<3 ) return false ;
    const checkDeityList = params[0]
    const checkLifeCycleNameList = params[1];
    const checkIsFavorable = params[2]==="+";
    //console.log("isDeityOnPilarLifeCycleFavorable",attrVal,checkDeityList, checkLifeCycleNameList, checkIsFavorable)
    const pilars = this.lunar.getPilars();
    const periodNb = this.periodAttr.periodNb;

    for (let pilarIdx = 0; pilarIdx < pilars.length; pilarIdx++) {
      const pilar = pilars[pilarIdx];
      const pilarDeity = pilar.deity
      const forceFavorable = this.lunar.isFavorableLifeCycle(periodNb,pilar.lifeCycle);
      //console.log(" forceFavorable ",forceFavorable,checkIsFavorable)
      if ( checkIsFavorable===forceFavorable ) {
        //console.log(" pilarDeity ",checkDeityList, checkLifeCycleNameList, pilarDeity, pilar)
        if ( checkDeityList.indexOf(pilarDeity.getName())>=0 ) {
          if (  checkLifeCycleNameList.indexOf(pilar.lifeCycle.getName())>=0 ) {
            //console.log("isDeityOnPilarLifeCycleFavorable FOUND",attrVal,checkDeityList, checkLifeCycleNameList, checkIsFavorable)
            return true
          }
        }
      }
    }
    return false;
  }

    // Deity on Pilar Lifecycle
    isPeriodLifeCycle (params:string[]) {
      const checkLifeCycleNameList = params[0];
      console.log("isPeriodLifeCycle", checkLifeCycleNameList)
      const pilar = this.getPilar("Period");
      return checkLifeCycleNameList.indexOf(pilar.lifeCycle.getName())>=0 ;
    }


  // Deity on Pilar Lifecycle
  isDeityOnPilarLifeCycle (params:string[]) {
    if ( params.length!=2 ) return false ;
    const checkDeity = params[0]
    const checkLifeCycleNameList = params[1];
    console.log("isDeityOnPilarLifeCycle",params,checkDeity, checkLifeCycleNameList)
    const pilars = this.lunar.getPilars();

    for (let pilarIdx = 0; pilarIdx < pilars.length; pilarIdx++) {
      const pilar = pilars[pilarIdx];
      console.log("isDeityOnPilarLifeCycle",pilar.lifeCycle)
      if (  checkLifeCycleNameList.indexOf(pilar.lifeCycle.getName())>=0 ) {
        return true
      }
    }
    return false;
  }

  hasAtLeast3SameYearHostileBranche () {
    let branche = this.lunar.get3PlusSameBranche();
    //console.log("hasAtLeast3SameYearHostileBranche",branche)
    if ( branche !== null ) {
      const yearBranche= this.studyYear.getyBranche();
      return  !BrancheHelper.getMainRelation(yearBranche, branche).isFavorable()
    }
    return false ;
  }

  isTrunkCompatible(params: string []) {
    if ( params.length<2 ) return false
    const pilar1 = this.getPilar(params[0]);
    const pilar2 = this.getPilar(params[1]);
    //console.log("isTrunkCompatible", params, pilar1, pilar2)
    return pilar1.isTrunkCompatible(pilar2)
  }

    // Is  params pilar has minCount clashed
    isPilarNClashed( minCount: number, params: string []) {
      let count = 0 ;
      for (let pilar1Idx = 0; pilar1Idx < params.length; pilar1Idx++) {
        const pilar1 = this.getPilar(params[pilar1Idx]);
        for (let index = pilar1Idx; index < params.length; index++) {
          const pilar2 = this.getPilar(params[index]);
          if ( pilar1.isTrunkBrancheClashed(pilar2) ) count ++;
        }

      }
      //console.log("isPilarNClashed", minCount, params, count)
      return count>=minCount
    }

    // Is params[0] minimum count pilar clashed
    isPilarXClashed( params: string []) {
      if ( params.length<3 ) return false
      const minCount=+params[0];
      params.shift()
      //console.log("isPilarXClashed", minCount, params)
      return this.isPilarNClashed(minCount,params)
    }

    // Is params[0] and params[1] pilar is all clashed
    isPilarClashed( params: string []) {
      if ( params.length<2 ) return false
      return this.isPilarNClashed(2,params)
    }


  //  COx.7 CO7 Has no Quy
  isNoQuyNhan (){
    //console.log("isNoQuyNhan ", !this.hasQuyNhan)
    return !this.hasQuyNhan
  }

  // Check Genre  1==isMan
  isGenre (params: string []){
    if ( params.length===0 ) return false
    //console.log("isGenre ", params,this.lunar.isMan && params[0]==="1")
    return this.lunar.isMan && params[0]==="1"
  }


isPilarNotClashed(params: string []) {
  const len=params.length;
 //console.log("isPilarNotClashed", params)
  for (let pIdx1 = 0; pIdx1 < len; pIdx1++) {
    const currPilar1 = this.getPilar(params[pIdx1]);
    for (let pIdx2 = pIdx1+1; pIdx2 < len; pIdx2++) {
      const currPilar2 = this.getPilar(params[pIdx2]);
     //console.log("isPilarNotClashed", currPilar1, currPilar2, currPilar1.isPilarClashed(currPilar2))
      if (currPilar1.isPilarClashed(currPilar2)) return false;
    }
  }
  return true;
}

  //COx.15,anyPilar(s),Deity COx15 anyPilar clashed with pilar containing one of the deities name
  isDeityPilarCLashed (params: string []){
    if ( params.length!==2 ) return false
    const checkPilar = this.getPilar(params[0]);
    const deitiesName = params[1];
    const pilarsAttr = this.lunar.pilarsAttr;
    //console.log("isDeityPilarCLashed", params, checkPilar)
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      const pilar = this.lunar.getPilar(pilarIdx)
      if (checkPilar.isTrunkBrancheClashed(pilar) ) {
        let pilarDeityName = pilarsAttr.getPilarDeity(pilarIdx).getName()
        if (deitiesName.indexOf(pilarDeityName)>=0) return true ;
        //Hidden deity
        let hiddenDeities = pilarsAttr.getHiddenPilarDeities(pilarIdx);
        for (let hiddenIdx = 0; hiddenIdx < hiddenDeities.length; hiddenIdx++) {
          const deity =hiddenDeities[hiddenIdx];
          if (deity!==null && deitiesName.indexOf(deity.getName())>=0 ) return true ;
        }
      }
    }
    return false
  }

  // Check van enfant, adolescent, ...
  isPeriodNb(params: string[]) {
    const checkFrom = +params[0]
    const currPeriodNb = this.periodAttr.periodNb
    let checkTo  = 10
    if ( params.length>=2 ) checkTo =  +params[1]
    //console.log("isPeriodNb", params, currPeriodNb, checkFrom, checkTo)
    return currPeriodNb >= checkFrom && currPeriodNb<= checkTo
  }

  isAttrPresent( key: string, attrKey: string, attrVal: string) : boolean{
    const periodAttr = this.periodAttr;
    const params = attrVal.split(",")
    switch (attrKey) {

      case "HeighDeity": return this.isHeighDeityCount(params,false);
      case "LowDeity": return this.isLowDeityCount(params,false);
      case "HasDeity": return this.hasNonZeroDeityCount(params,true);
      case "ZeroDeity": return this.hasNonZeroDeityCount(params,false);
      case "ZeroSecDeity": return this.isZeroSecDeityCount(params);
      case "HeighDeityGrp": return this.isHeighDeityCount(params,true);
      case "LowDeityGrp": return this.isLowDeityCount(params,true);
      case "DeityPilarClashed": return  this.isDeityPilarCLashed(params);
      case "PDeityElemBadTransformed": return this.isPDeityElemBadTransformed(params);
      case "DeityFavorablePivot": return this.isDeityFavorablePivot(attrVal);
      case "DeityHostilePivot": return this.isDeityHostilePivot(attrVal);
      case "BrancheDeity": return this.isBrancheDeity(params,false);
      case "BrancheDeityWithHidden": return this.isBrancheDeity(params,true);
      case "DeityOnPilarLifeCycleFavorable": return this.isDeityOnPilarLifeCycleFavorable(params);
      case "DeityOnPilarLifeCycle": return this.isDeityOnPilarLifeCycle(params);
      case "PeriodLifeCycle": return this.isPeriodLifeCycle(params);

      case "PilarDeity": return this.containsDeity(params);
      case "PilarSecDeity": return this.containsSecDeity(params);
      case "PYDeity": return this.isPilarDeityInDeityList("Period",attrVal) || this.isPilarDeityInDeityList("Year",attrVal) ;
      case "PilarClashed": return  this.isPilarClashed(params);
      case "PilarXClashed": return  this.isPilarXClashed(params);
      case "PilarNotClashed": return  this.isPilarNotClashed(params);
      case "PilarTrunk": return this.hasPilarTrunk(attrVal);
      case "PilarDeityPivotHostile": return this.isPilarDeityHostilePivot(attrVal);
      case "SamePilarTrunkBranche": return this.isSamePilarTrunkBranche(params);
      case "PilarElement": return this.isPilarElement(params);
      case "PilarTrunkClash": return this.isPilarTrunkClash(params);
      case "PilarBrancheClash": return this.isPilarBrancheClash(params);
      case "PilarCompatible": return this.isPilarCompatible(params);
      case "PilarElementClash": return this.isPilarElementClashed(params);
      case "PilarFavorablePivot": return this.isPilarFavorablePivot(attrVal);
      case "PilarBrancheWeakened": return this.isPilarBrancheWeakened(params);

      case "PivotFavorable": return this.isFavorablePivot(params);
      case "PivotFavorableElement": return this.isElementFavorablePivot(attrVal);
      case "PivotHostile": return this.isHostilePivot(params);

      case "NoQuyNhan": return  this.isNoQuyNhan();
      case "Genre": return  this.isGenre(params);
      case "Branche": return this.isBranche(params);
      case "PYBranche": return this.isPilarBranche("Period",attrVal) || this.isPilarBranche("Year",attrVal);
      case "BadBranche": return this.isBadBranche(params);
      case "BadPeriod": return this.isBadPeriod();
      case "PerLCyleStatus": return this.isPerLCleStatus(periodAttr,attrVal);
      case "Structures": return this.isStructures(attrVal);
      case "AtLeastSameYearHostileBranche": return this.hasAtLeast3SameYearHostileBranche();
      case "TrunkCompatible": return this.isTrunkCompatible(params);
      case "AgePeriod": return this.isPeriodNb(params);

      default: console.log("Unknow case ", attrKey, key)
    }
    return false;
  }

  comentOnHeader(header:string ) {
    const selectHeaders=PropertyHelper.getHeaderKeys(header);
    const logMe = false;
    const startKeyIdx = 2;
    for (let index = 0; index < selectHeaders.length; index++) {
      let key = selectHeaders[index];
      if ( logMe) console.log("KEY ",key);

      let res = true ;
      let CHECKALL = false; // break on first check is false
      const keyArr = key.split(".")
      const len = keyArr.length-1;
      const idx = keyArr[len].indexOf("&")
      if (idx===-1 ) {
        console.log("MISSING &",key);
      } else {
        keyArr[len] = keyArr[len].substring(0,idx)
      }
      for (let index = startKeyIdx; index <= len ; index++) {

        let currAttrkey = keyArr[index]
        const paramIdx = currAttrkey.indexOf("°")
        let currAttrVal ="NONE";
        // parameter
        if (  paramIdx>0 ) {
          currAttrVal = currAttrkey.substring(paramIdx+1)
          currAttrkey = currAttrkey.substring(0,paramIdx)
        }
        let isPositive = true ;
        if ( currAttrkey[0]==="-" ) {
          isPositive = false ;
          currAttrkey = currAttrkey.substring(1)
        }
        //console.log( "KEY", key, currAttrkey, currAttrVal)
        if ( (isPositive!==this.isAttrPresent(key, currAttrkey,currAttrVal)) ){
          res = false ;
          if ( !CHECKALL ) break ;
        }
      }
      if ( res ) {
        let res = this.addBaseComment0(key,true);
        console.log("FOUND KEY", res, key);
      }
    }

  }

  commentbyHeader( header: string,  yearAttr: any ) {
    const dayForce = this.baseAttr.dayForce;
    this.comentOnHeader(header+"0");
    this.comentOnHeader(header+"+");
    this.comentOnHeader(header+"-");
    //this.comentOnHeader(header+dayForce,yearAttr);
  }


  // header = Period or Year
  commentOnPeriodOrYear(header: string, yearAttr: any ) {
    this.commentbyHeader("PY.", yearAttr)
    this.commentbyHeader(header, yearAttr)
  }



  commentOnPeriod(currStudyYear: Bazi) {
    this.studyYear=currStudyYear;
    this.lunar.evalPeriodData();
    this.evalPeriodPoint(currStudyYear)
    this.commentOnPeriodOrYear("Period.", null);

  }
}
