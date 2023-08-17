/* eslint-disable @typescript-eslint/naming-convention */

import { PropertyHelper } from '../helper/PropertyHelper';
import { ObjectHelper } from '../helper/objectHelper';
import { StringHelper } from '../helper/stringHelper';
import { Bazi } from '../mt-data/bazi/bazi';
import { Branche } from '../mt-data/bazi/branche';
import { Lunar } from '../mt-data/bazi/lunar';
import { LunarBase } from '../mt-data/bazi/lunarBase';
import { Trunk } from '../mt-data/bazi/trunk';
import { EnumBaseClass } from '../mt-data/enumBaseClass';
import { QiForce } from '../mt-data/qi/qi-force';
import { QiType } from '../mt-data/qi/qi-type';
import { QiTypeDataRec } from '../mt-data/qi/qi-type-data-rec';

export class ObservationBase {

  supportDetail: string = null;
  maxPoints: number = 0;
  points: number = 0;
  isInit: boolean = false ;
  rawPropCache: string[] = [];
  prefixGenre: string;

  // Used for log purpose when problem while checking key
  checkKey = "";
  checkMethod = "";

  constructor(genrePrefix: string) {
    // Initialized when generated only
    this.supportDetail = '?';
    this.points = 0.0;
    this.maxPoints = 0.0;
    this.isInit=false;
    this.rawPropCache=[];
    this.prefixGenre=genrePrefix;
  }

  resetPoints( ) {
    this.points = 0.0;
    this.maxPoints = 0.0;
  }

  getNote() {
    if ( this.maxPoints>0 ) {
      return (this.points * 100) / (this.maxPoints);
    }
    return 0.0;
  }

  isFavorable() {
    return this.getNote() > 50;
  }

  incForce ( force: number ) {
    if ( force===0 ) return ;
    const points = this.force2Point(force);
    this.incPoints(points)
  }

  incPoints(inc: number) {
    if (inc > 0) {
      // Point is from 1 to 10.  Avoid out of limit points
      if (inc <= 0) {
        inc = 1;
      }
      if (inc > 10) {
        inc = 10;
      }
      this.points += inc;
      this.maxPoints += 10;
      //console.log("incPoints", inc, this.points,this.maxPoints);
    }
  }

  // Force String depend on palace type and note
  evalForceString() {
    const note = this.getNote();
    let res = '&+';
    if (note <= 60) {
      res = '&';
    }
    if (note < 45) {
      res = '&-';
    }
    //console.log("evalForceString", note, res);
    return res;
  }


  isRawKeyExist (key: string) {
    return PropertyHelper.isArrayElementPresent(this.rawPropCache, key) ;
  }

  insertRawKeyifExistProp(rawKey: string,postFix:string,updPts: boolean) {
    const propAttr =  PropertyHelper.getPropertyAttr(rawKey+postFix);
    if (!propAttr.isUndef()) {
      //console.log("Insert Raw key "+ rawKey, postFix);
      this.rawPropCache.push(rawKey);
      //updPts=false; // No Update?. Point are update in previous QI evaluation
      if ( updPts ) {
          let force = propAttr.force;
            let points  = this.force2Point(force)
            points = this.adjustDegree(points);
            //console.log("force ", force, " points "+ points);
            this.incPoints(points);
      }
      return true ;
    }
    return false;
  }

  getQiForceSuffix(qiRec: QiTypeDataRec, qiType: QiType){
    let qiForce = qiRec.getQiForce(qiType);
    let forceSuffix = StringHelper.qiForce2Str(qiForce,'-');
    return forceSuffix
  }

  addBaseComment0(rawKey: string,updPts?: boolean): boolean {
    //console.log("addBaseComment ", rawKey);
    if ( this.isRawKeyExist(rawKey) ) return true;
    // Insert if exist property
    if (typeof updPts === 'undefined' )  updPts=false;
    if ( rawKey.indexOf("&")<0  )rawKey += "&";
    if ( this.insertRawKeyifExistProp(rawKey,'',updPts) ) return true;;
    if ( this.insertRawKeyifExistProp(rawKey,'-',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'+',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'-.-',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'-.+',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'+.-',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'+.+',updPts) ) return true;

    return false;
  }

  addBaseComment(rawKey: string,updPts?: boolean): boolean {
    let res = this.addBaseComment0(rawKey,updPts);
    res = res || this.addBaseComment0(this.prefixGenre + rawKey,updPts);
    return res ;
  }


  static  VERYHOSTILE = new QiForce('VERYHOSTILE',-8);
  static  HOSTILE = new QiForce('HOSTILE',-2);
  static  NONE = new QiForce('NONE',0);
  static  MEDIUM = new QiForce('MEDIUM',1);
  static FAVORABLEFORCE = 2;
  static  FAVORABLE = new QiForce('FAVORABLE',2);
  static STRONGFORCE = 4;
  static  PROSPEROUS = new QiForce('PROSPEROUS',4);
  static  VERYSTRONG = new QiForce('VERYSTRONG',8);
  static  TOOSTRONG = new QiForce('TOOSTRONG',10);

  qiforce2Point( qiForce: QiForce) {
    if (qiForce === QiForce.VERYHOSTILE) { return 1; }
    if (qiForce === QiForce.HOSTILE) { return 2; }
    if (qiForce === QiForce.NONE) { return 0; }
    if (qiForce === QiForce.MEDIUM) { return 5; }
    if (qiForce === QiForce.FAVORABLE) { return 8; }
    if (qiForce === QiForce.PROSPEROUS) { return 9; }
    return 10;
  }

  force2Point(force: number) {
    if (force <= -3) {
      return 2;
    }
    if (force == -2) {
      return 3;
    }

    if (force == -1) {
      return 4;
    }

    if (force == 0) {
      return 6;
    }

    if (force == 1) {
      return 7 ;
    }
    if (force == 2) {
      return 8;
    }
    return 10;
  }

  point2force(degree1_10: number) {
    if (degree1_10 <= 2) {
      return -3;
    }
    if (degree1_10 <= 3) {
      return -2;
    }
    if (degree1_10 <= 4) {
      return -1;
    }
    if (degree1_10 <= 6) {
      return 1;
    }
    if (degree1_10 <= 8) {
      return 2;
    }
    return 3;
  }

  adjustDegree(degree: number) {
    return degree;
  }


  addUpdatePtsBaseComment(rawKey: string) {
    // adBaseComment with true to update pts
    this.addBaseComment(rawKey, true);
  }


  addSupportBaseComment(degree: number, rawKey: string) {
    if ( this.addBaseComment(rawKey,true) ) {
      if (degree !== 0) {
        degree = this.adjustDegree(degree);
        this.incPoints(degree);
      }
    };
  }

  getName() {
    return "OBSERVATION NAME must be defined in subclass";
  }

 convertRawProp2Prop() {
  const postFix = this.evalForceString();

  const postFixWithoutSep = postFix.substring(1);
  this.rawPropCache.forEach(rawKey => {
    let currKey = rawKey;
    if ( rawKey.indexOf('&')>0 ) {
      currKey += postFixWithoutSep;
    } else {
      currKey +=postFix
    }
    PropertyHelper.addCommentLabel(currKey);
  });
  this.rawPropCache=[];
 }

  initComment() {
    if ( this.isInit ) {
      console.log("INIT ALREADY CALLED: ", this.getName());
    } else {
      this.isInit = true ;
    }
    this.initPoint();
  }

   initPoint() {
    //console.log('initPoint must be defined in subclass');
    this.resetPoints();
  }

  comment() {
    this.initComment();
  }

  resetRawCache() {
     // Empty unused raw cache
    this.rawPropCache=[];
  }
  evalForce() {
    // Comment for force evaluation
    this.comment();
    // Empty unused raw cache
    this.resetRawCache();
  }

  updateForce() {
    // Nothing. To be defined in subclass if necessary
  }


getLunar() : Lunar {
  console.log("GetLunar must be redefined in subClass")
  return null
}


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

  checkEnumListSplit (param:string, model: EnumBaseClass) {
    return this.checkEnumList(param,model).split("/");
  }

  checkGetEnumList (param:string, model: EnumBaseClass) {
    if ( ObjectHelper.isNaN(param) ) {
      console.log("Missing param",model )
      console.log(this.checkMethod, this.checkKey)
      return "";
    }
    let res = []
    const params = param.split("/")
    for (let index = 0; index < params.length; index++) {
      const element = params[index];
      const enumElement = model.getEnumByName(element)
      if ( null===enumElement ) {
        console.log("Could not find ", element, "in ", param, "for model ", model.getName())
        console.log(this.checkMethod, this.checkKey)
      } else {
        res.push(enumElement)
      }
    }
    return res;
  }

  protected getPilar(pilarName: string) {
    return this.getLunar().getPilarByName(pilarName)
  }

  checkTransformEnumList (param:string, model: EnumBaseClass) {
    return this.checkEnumList(param,model).split("/");
  }


  checkGenreOnly(params:string[]) {
    if (params.length === 0) return false;
    return this.getLunar().isMan && params[0] === "m";
  }


  // Check if the pilar branche name is among the branche List
  checkPilarBranche(params:string[]): boolean {
    const pilarName=params[0]
    const brancheList=params[1]
    this.checkEnumList(brancheList,Branche.RAT)
    const pilar = this.getPilar(pilarName);
    const brancheName = pilar.branche.getName();
    //console.log("isPilarBranche ",pilarName, pilar, brancheList, brancheName )
    return brancheList.indexOf(brancheName) >= 0;
  }

  // Check if the pilar branche name is among the branche List
  // Usage: Branche°Period/Year/Y/M/D/H,BranceList
  //
  checkBranche(params: string[]): boolean {
    if (params.length !== 2) return false;
    const pilarName = params[0];
    const brancheList = this.checkEnumList(params[1],Branche.RAT)
    //console.log("isBranche ",params )
    return this.checkPilarBranche([pilarName, brancheList]);
  }


  // Usage: BithHour°from,to
  //
  checkBirthHour(params: string[]): boolean {
    if (params.length !== 2) return false;
    const fromHour = +params[0]
    const toHour = +params[1]
    const checkHour = this.getLunar().birthDate.getHour()
    return fromHour<=checkHour&&checkHour<=toHour;
  }

   // Usage: BithNight
  //
  checkBirthNight(): boolean {
    return !this.checkBirthHour(["6", "19"])
  }


  // Usage: Trunk°Period/Year/Y/M/D/H,BranceList
  checkTrunk(params: string[]): boolean {
    const pilarNames = params[0].split("/");
    const checkTrunks = this.checkEnumList(params[1],Trunk.JIA)
    for (let index = 0; index < pilarNames.length; index++) {
      const pilarName = pilarNames[index];
      const pilar = this.getPilar(pilarName);
      if ( checkTrunks.indexOf(pilar.trunk.getName()) >= 0) return true
    }

    return false;
  }


  // Usage: HasTrunk°Count,TrunkList
  hasTrunk(params: string[]): boolean {
    let countHit = +params[0];
    const trunkList = this.checkEnumList(params[1],Trunk.JIA)
    //console.log("hasPilarTrunk ", attrVal)
    for (let index = 0; index < LunarBase.ymdhCharArr.length; index++) {
      const pilarName = LunarBase.ymdhCharArr[index];
      const pilar = this.getPilar(pilarName);
      if ( this.checkTrunk([pilarName,trunkList])) {
        countHit--;
        if (countHit === 0) return true;
      }
    }
    return false;
  }


   // Check if the branche list is define in 4 pilar
   // HasBranche°Count,BrancheList
   // Usage: HasBranche°Count,BrancheList
   hasBranche(params: string[]): boolean {
    let count=+params[0]
    const brancheList = this.checkEnumList(params[1],Branche.RAT)
    //console.log("hasBranche ",params )
    for (let index = 0; index < LunarBase.ymdhCharArr.length; index++) {
      const pilarName = LunarBase.ymdhCharArr[index];
      if ( this.checkBranche([pilarName,brancheList])) {
        count--;
        if ( count===0 ) return true
      }
    }
    return false
  }

  isAttrPresent(attrKey: string, params: string[]): boolean {
    // Put Here common check function
    switch (attrKey) {
      case "Genre":
        return this.checkGenreOnly(params);
      case "Trunk":
        return this.checkTrunk(params);
      case "Branche":
          return this.checkBranche(params);
      case "BirthHour":
        return this.checkBirthHour(params);
      case "BirthNight":
          return this.checkBirthNight();
      case "OR":
        return this.processFuncSuite(params[0],"||","$",true)
    default:
      console.log("UNKNOWN CASE ", attrKey, this.checkKey);
    }
    return false;
  }

  processFuncSuite(funcList:string,funcSep:string,paramSep:string,exitOnTrue:boolean) {
    const keyArr = funcList.split(funcSep);
    const len = keyArr.length - 1;
    const startKeyIdx = 2;
    const idx = keyArr[len].indexOf("&");
    if (idx >=0 -1) {
      keyArr[len] = keyArr[len].substring(0, idx);
    }
    let res =true ;
    const CHECKALL = true; // break on first check is false
    for (let index = startKeyIdx; index <= len; index++) {
      let currAttrkey = keyArr[index];
      const paramIdx = currAttrkey.indexOf(paramSep);
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

      this.checkMethod=currAttrkey + " "+ currAttrVal
      if (isPositive !== this.isAttrPresent(currAttrkey, currAttrVal.split(","))) {
        res = false;
        if (!CHECKALL) break;
      } else {
        if ( exitOnTrue && !CHECKALL ) break
      }
    }
    return res;
  }

  filterOnHeader(header: string) {
    const selectHeaders = PropertyHelper.getHeaderKeys(header);
    if ( ObjectHelper.isNaN(selectHeaders)) {
      console.log("No Header found ", header);
      return
    }
    const logMe = false;
    const startKeyIdx = 2;
    if (logMe) console.log(header, selectHeaders);
    for (let index = 0; index < selectHeaders.length; index++) {
      let key = selectHeaders[index];
      this.checkKey=key
      let res = true;
      const idx = key.indexOf("&");
      if (idx === -1) {
        console.log("MISSING &", key);
      }
      res = this.processFuncSuite(key,".","°",false);
      if (res) {
        res = this.addBaseComment0(key, true);
        if ( res ) {
          console.log("Added KEY", res, key);
        }
      }
    }
  }


  //
  filterObservation(header: string, isDestin: boolean) {
    console.log("filterObservation must be redefined in subclass")
  }

}
