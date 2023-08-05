/* eslint-disable @typescript-eslint/naming-convention */

import { ObjectHelper } from '../helper/objectHelper';
import { PropertyHelper } from '../helper/PropertyHelper';
import { StringHelper } from '../helper/stringHelper';
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
    console.log("evalForceString", note, res);
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
    if ( this.insertRawKeyifExistProp(rawKey,'&',updPts) ) return true;;
    if ( this.insertRawKeyifExistProp(rawKey,'&-',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&+',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&-.-',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&-.+',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&+.-',updPts) ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&+.+',updPts) ) return true;

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

}
