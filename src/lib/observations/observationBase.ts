/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectHelper } from '../helper/objectHelper';
import { PropertyHelper } from '../helper/PropertyHelper';

export class ObservationBase {

  supportDetail: string = null;
  maxPoints: number = 0;
  points: number = 0;
  isInit: boolean = false ;
  rawPropCache: string[] = [];

  constructor() {
    // Initialized when generated only
    this.supportDetail = '?';
    this.points = 0.0;
    this.maxPoints = 0.0;
    this.isInit=false;
    this.rawPropCache=[];
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
    }
  }

  // Force String depend on palace type and note
  evalForceString() {
    const note = this.getNote();
    let res = '&+';
    if (note <= 65) {
      res = '&';
    }
    if (note < 45) {
      res = '&-';
    }
    return res;
  }


  isRawKeyExist (key: string) {
    return PropertyHelper.isArrayElementPresent(this.rawPropCache, key) ;
  }

   insertRawKeyifExistProp(rawKey: string,postFix:string ) {
    const propAttr =  PropertyHelper.getPropertyAttr(rawKey+postFix);
    if (!propAttr.isUndef()) {
      console.log('Insert defined Raw key ', rawKey)
      const force = propAttr.force;
      if ( force!==0 )  {
        this.incPoints(this.force2Point(force))
      }
      this.rawPropCache.push(rawKey);
      return true ;
    }
    return false;
  }

  addBaseComment(rawKey: string): boolean {
    //console.log("addBaseComment ", rawKey);
    if ( this.isRawKeyExist(rawKey) ) return true;
    // Insert if exist property
    if ( this.insertRawKeyifExistProp(rawKey,'&') ) return true;;
    if ( this.insertRawKeyifExistProp(rawKey,'&-') ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&+') ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&-.-') ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&-.+') ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&+.-') ) return true;
    if ( this.insertRawKeyifExistProp(rawKey,'&+.+') ) return true;
    return false;
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
    if (force == 1) {
      return 6;
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

  addSupportBaseComment(degree: number, rawKey: string) {
    if ( this.addBaseComment(rawKey) ) {
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
  }

  comment() {
    this.initComment();
  }

  evalForce() {
    // Comment for force evaluation
    this.comment();
    // Empty unused raw cache
    this.rawPropCache=[];
  }

  updateForce() {
    // Nothing. To be defined in subclass if necessary
  }

}
