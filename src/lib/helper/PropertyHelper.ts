/* eslint-disable @typescript-eslint/naming-convention */
// Must enable resolveJsonModule compiter option to true in tsconfig.jsonimport { ObjectHelper } from 'family-corner-lib';
import baseKeysJson from '../data/baseKeys.json';
import definedKeysJson from '../data/definedKeys.json';

import { ObjectHelper } from '../helper/objectHelper';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { PropertyAttr } from '../mt-data/property/propertyAttr';
import { PropertyType } from '../mt-data/property/propertyType';
import { ObsKeyDistr } from '../observations/obsKeyDistr';
import { ObsPeriod } from '../observations/obsPeriod';

export class PropertyHelper {

  // Cache of all properties attributes handled by the session
  private static gCache: ObsKeyDistr;
   static  save2GCache = true;

  // Cache of current found properties key string
  private static recursiveFindcache: any[];

  // Genre property of the person
  //
  private static currGenre = 'XX.';

  // The current observable period
  private static currObsSession: ObsPeriod;

  constructor() { }

  static initHelper(session: ObsPeriod, sessionDate: MyCalendar) {
    this.currObsSession=session;
    PropertyHelper.initCache(session,sessionDate);
  }


  static disableCache() {
    PropertyHelper.save2GCache = false;
  }

  static enableCache() {
    PropertyHelper.save2GCache = true;
  }

  static initCache(session: ObsPeriod, sessionDate: MyCalendar) {
    if (ObjectHelper.isNaN(PropertyHelper.gCache)) {
      PropertyHelper.gCache = new ObsKeyDistr();
    }
    // Clear all data gathered after this session
    const sessions = ObsPeriod.getValues();
    for (let index = session.ordinal(); index < sessions.length; index++) {
      const currSession = sessions[index];
      PropertyHelper.gCache.clearSession(currSession,sessionDate);
    }
    PropertyHelper.enableCache();
  }

  static setGenre(genre: string) {
    PropertyHelper.currGenre=genre;
  }

  private static getSessionPropertyAttr(session:ObsPeriod, key: string): PropertyAttr {
    return PropertyHelper.gCache.get(session, key) as PropertyAttr;
  }

  private static getSessionCachedPropertyAttr(session:ObsPeriod, key: string): PropertyAttr {
    return PropertyHelper.getSessionPropertyAttr(session, key);
  }

  private static getCurrCachedPropertyAttr(key: string): PropertyAttr {
    return PropertyHelper.getSessionPropertyAttr(PropertyHelper.currObsSession, key);
  }


  static getSessionDate(session: ObsPeriod) {
    const obsDate = PropertyHelper.gCache.getObsDate(session);
    let res = '';
    if (!ObjectHelper.isNaN(obsDate)) {
      res = ''+obsDate;
    }
    return res;
  }

  static getSessionProperties(session: ObsPeriod) : PropertyAttr[]{
    const obsDistr = PropertyHelper.gCache.getObsKeys(session);
    let res = [];
    if (!ObjectHelper.isNaN(obsDistr)) {
      res = obsDistr.dataArr;
    }
    return res;
  }

  static finalizeSession() {
    const attrList = PropertyHelper.getSessionProperties(PropertyHelper.currObsSession);
    PropertyHelper.disableCache();
    for (const key in attrList) {
        const keyAttr = attrList[key];
        if ( keyAttr.isBase() ) {
          keyAttr.setOppositeForce ( PropertyHelper.getSumOppositeCachedForce(keyAttr));
          keyAttr.setSupportForce ( PropertyHelper.getSumCachedKeyForce(keyAttr));
        }
     }
     PropertyHelper.enableCache();
  }


  static getPropertyAttr( key: string): PropertyAttr {
    let attr = PropertyHelper.getCurrCachedPropertyAttr(key);

    if (ObjectHelper.isNaN(attr)) {
      attr = new PropertyAttr(key);
      if ( PropertyHelper.save2GCache && !attr.isUndef() ) {
        PropertyHelper.initOppositeAttr(attr);
        PropertyHelper.gCache.put(PropertyHelper.currObsSession, key, attr);
      }
    }
    return attr;
  }

  private  static isPropertyExist(sKey: string) {
    return PropertyHelper.isBaseProp(sKey) ||  PropertyHelper.isDefinedProp(sKey)
  }

  static isArrayElementPresent(jsondata: any, key: string) {
    const attr = PropertyHelper.getArrayElement(jsondata, key);
    return !ObjectHelper.isNaN(attr);
  }

  static getArrayElement(jsondata: any, key: string) {
    let res = [];
    type keyType = keyof typeof jsondata;
    res = jsondata[key as keyType];
    return res;
  }

  static getJsonElementAttr(jsondata: any, key: string) {
    type keyType = keyof typeof jsondata;
    const attr = jsondata[key as keyType];
    return attr;
  }

  static getPropTypeElementAttr( propType: PropertyType, key: string) {
    if ( propType===PropertyType.BASE ) {
      return PropertyHelper.getJsonElementAttr(baseKeysJson,key)
    } else {
      return PropertyHelper.getJsonElementAttr(definedKeysJson,key);
    }
  }


  static getJsonElementPropertyAtIdx(jsondata: any, key: string, idx: number) {
    let res: any = null;
    const attr = PropertyHelper.getJsonElementAttr(jsondata, key);
    if (!ObjectHelper.isNaN(attr)) {
      res = attr[idx];
    }
    return res;
  }

  static getJsonElementForce(jsondata: any, key: string) {
    return PropertyHelper.getJsonElementPropertyAtIdx(
      jsondata,
      key,
      0
    ) as number;
  }

  static getJsonElementProperty(jsondata: any, key: string) {
    return PropertyHelper.getJsonElementPropertyAtIdx(
      jsondata,
      key,
      1
    ) as string;
  }

  static isBaseProp(key: string) {
    return PropertyHelper.isArrayElementPresent(baseKeysJson, key);
  }

  static getProperty(attr: PropertyAttr) {
    let res = '';
    let key = attr.key;
    switch (attr.keyType) {
      case PropertyType.BASE:
        //console.log('Calling getProperty for base key');
        break;
      case PropertyType.DEFINED:
        res = PropertyHelper.getJsonElementProperty(definedKeysJson, key);
        break;
      case PropertyType.INDIRECT:
        key = attr.getOtherKey();
        if (!ObjectHelper.isNaN(key)) {
          res = PropertyHelper.getJsonElementProperty(definedKeysJson, key);
        }
    }
    return res;
  }

  static isDefinedProp(key: string) {
    return PropertyHelper.isArrayElementPresent(definedKeysJson, key);
  }

  static isFCachePresent(key: string) {
    return PropertyHelper.isArrayElementPresent(this.recursiveFindcache, key);
  }

  static findNAddBaseKeys(
      baseKeyArr: PropertyAttr[],
      originKeyAttr: PropertyAttr,
      keyAttr: PropertyAttr ) {
    if ( keyAttr.isUndef() ) return ;
    const key = keyAttr.key;
    if (!PropertyHelper.isFCachePresent(key)) {
      // use to avoid recursive loop definition
      PropertyHelper.recursiveFindcache.push(keyAttr);
      if (keyAttr.isBase()) {
        ObjectHelper.pushIfNotExist(baseKeyArr,keyAttr);
        if ( PropertyHelper.save2GCache ) {
          keyAttr.addOriginKeysArr(originKeyAttr);
        }
      } else {
        if ( keyAttr.isDefinedOrIndirect() ) {
          const baseKeyList = keyAttr.getBasesKeyList();
          if (baseKeyList.length>0 ) {
            baseKeyList.forEach(baseKeyAttr => {
              ObjectHelper.pushIfNotExist(baseKeyArr,baseKeyAttr);
            });
            return;
          }
        }
        // Base key list not yet initialized init it
        // from property
        let optMsg = PropertyHelper.getProperty(keyAttr);

        let currMessage = '';
        if (!ObjectHelper.isNaN(optMsg)) {
          while (optMsg.length > 0) {
            let starSubMsgPos = 0;
            const isComposedMsg = optMsg.charAt(starSubMsgPos) === '=';
            if (isComposedMsg) {starSubMsgPos++;}
            let endSubMsgPos = optMsg.indexOf('=', starSubMsgPos);

            if (endSubMsgPos === -1) {
              endSubMsgPos = optMsg.length;
              currMessage = optMsg.substring(starSubMsgPos);
            } else {
              currMessage = optMsg.substring(starSubMsgPos, endSubMsgPos);
              endSubMsgPos++;
            }
            optMsg = optMsg.substring(endSubMsgPos);
            if (endSubMsgPos - starSubMsgPos > 1) {
              if (isComposedMsg) {
                const keyAttr1 = PropertyHelper.getPropertyAttr(currMessage);
                this.findNAddBaseKeys( baseKeyArr, originKeyAttr, keyAttr1);
              } else {
                console.log('TBD check currMessage not handle', currMessage);
            }
            }
          }
        }
      }
    }
      if (!key.startsWith(PropertyHelper.currGenre)) {
        const sKey = PropertyHelper.currGenre + key;
        //
        if ( PropertyHelper.isPropertyExist(sKey) ) {
          const genreAttr = PropertyHelper.getPropertyAttr(sKey);
          PropertyHelper.findNAddBaseKeys(baseKeyArr,originKeyAttr,genreAttr);
        }
      }
  }

  static findBaseKeys( keyAttr: PropertyAttr) {
    if ( keyAttr.isUndef() ) return [];
    let baseKeyAttrArr: PropertyAttr[] = [];
    const isDefinedOrIndirect = keyAttr.isDefinedOrIndirect();
    if ( isDefinedOrIndirect ) {
      baseKeyAttrArr = keyAttr.getBasesKeyList();
    }
    if ( baseKeyAttrArr.length===0 ) {
      PropertyHelper.recursiveFindcache = [];
      PropertyHelper.findNAddBaseKeys(baseKeyAttrArr,keyAttr,keyAttr);
      if ( isDefinedOrIndirect ) {
        keyAttr.setBasesKeyList(baseKeyAttrArr);
      }
      PropertyHelper.recursiveFindcache = [];
    }

    return baseKeyAttrArr;
  }

  static initOppositeAttr( origKeyAttr: PropertyAttr) {

    let defKeyAttr=origKeyAttr;
    if ( origKeyAttr.keyType===PropertyType.INDIRECT ) {
      defKeyAttr = PropertyHelper.getPropertyAttr(origKeyAttr.getOtherKey());
    }
    if ( !defKeyAttr.isDefined() ) return ;
    let oppositeKeyList = PropertyHelper.getOppositeKeyPostFix(defKeyAttr.key)
    let keySuffix = defKeyAttr.key;
    const idx1 = keySuffix.indexOf('&');
    if (idx1 >0) {
      keySuffix = keySuffix.substring(0,idx1);
    }
    oppositeKeyList.forEach(postFix => {
      let oppositeKey = keySuffix+'&'+postFix;
      if ( PropertyHelper.isDefinedProp(oppositeKey) ) {
        // Add the found opposite raw key in opposite key list
        // Assume no recursive or duplicate case
        defKeyAttr.addOppositeKey(oppositeKey)
      }
    });
  }

  static addCommentLabel(key: string) {
    // find and insert base key message
    const keyAttr = PropertyHelper.getPropertyAttr( key );
    PropertyHelper.findBaseKeys(keyAttr);
  }

static getMeanPropForceContribution (sessionOrd: number, keyRec: PropertyAttr) {
  let res = 0 ;
  let count = 1 ;
  for(let i=0;i<=sessionOrd;i++){
    const session=ObsPeriod.getObsPeriod(i);
    const attr = PropertyHelper.getSessionPropertyAttr(session, keyRec.key);
    if (!ObjectHelper.isNaN(attr)) {
        if (!attr.isUndef()) {
            res+= attr.force ;
            count ++ ;
        }
    }
  }
  return Math.round(res/count);
}

// Assume keyRec is base key
static getSumOppositeCachedForce(keyAttr: PropertyAttr) {
  let res = 0 ;
  const originKeyArr = keyAttr.getOriginKeysArr();
  const oppositeKeyArr: PropertyAttr[] = [];

  // Init support base list
  originKeyArr.forEach(originKeyAttr => {

    const currOppositeKeyArr = originKeyAttr.getOppositeKeyArr();
    currOppositeKeyArr.forEach(oppositeKey => {
       const oppositeAttr = PropertyHelper.getPropertyAttr(oppositeKey);
       if ( !oppositeAttr.isUndef() ) {
          // Assume that only one is counted
          ObjectHelper.pushIfNotExist(oppositeKeyArr,oppositeAttr);
       }
    });
  });
  const currSessionOrd = PropertyHelper.currObsSession.ordinal()-1;
  oppositeKeyArr.forEach(oppositeAttr => {
    const originOppositeKeyForce = oppositeAttr.force;
    const keyBaseArr = PropertyHelper.findBaseKeys(oppositeAttr);
    keyBaseArr.forEach(baseKey => {
        res +=
        originOppositeKeyForce+ // Force of the source opposite base key
          baseKey.force+      // Base opposite key force
          PropertyHelper.getMeanPropForceContribution(currSessionOrd,baseKey);

    });
  });
  return res;
}


// Assume keyRec is base key
static getSumCachedKeyForce(keyRec: PropertyAttr) {
  let res = 0;
  let keyList = keyRec.getOriginKeysArr();
  const originKeyBaseArr:PropertyAttr[] = [keyRec];
  const currSessionOrd = PropertyHelper.currObsSession.ordinal()-1;
  keyList.forEach(keyAttr => {
    // Current session property attributes
    const originForce = keyAttr.force;
    const keyBaseArr = PropertyHelper.findBaseKeys(keyAttr);
    keyBaseArr.forEach(baseKey => {
      if ( !ObjectHelper.hasItem(originKeyBaseArr,baseKey) ) {
        res += baseKey.force+originForce+ PropertyHelper.getMeanPropForceContribution(currSessionOrd,keyAttr);
        // Only one is counted
        ObjectHelper.pushIfNotExist(originKeyBaseArr,baseKey);
      }
    });
  });

  return res;
}

  //
  static getFinalForce(session: ObsPeriod,keyRec: PropertyAttr) {
    const prevForce =  PropertyHelper.getMeanPropForceContribution(session.ordinal()-1,keyRec)
    const finalForce= keyRec.getSumForce()+prevForce;
    return finalForce;
  }

  // Return true of this key with its supported forces is stronger that its opposite key force
  //
  static isCandidate(session: ObsPeriod,keyRec: PropertyAttr) {
    const finalForce= PropertyHelper.getFinalForce(session,keyRec);
    // Return true if the totalForce is the same sign as sum of key force and support
    return (finalForce<0)===((keyRec.force+keyRec.getSupportForce())<0);
  }

  static isReferencedInPreviousThemeType(keyRec: PropertyAttr) {
    let res = true ;
    const currSession=PropertyHelper.currObsSession;
    for(let i=0;i<PropertyHelper.currObsSession.ordinal();i++){
      PropertyHelper.currObsSession=ObsPeriod.getObsPeriod(i);
      const attr = PropertyHelper.getCurrCachedPropertyAttr(keyRec.key);
      if (ObjectHelper.isNaN(attr)) {
            res = false ;
            break;
        }
    }
    PropertyHelper.currObsSession=currSession;
    return res;
}


static getKeyPostFixForce(key: string) {
  const idx1 = key.indexOf('&');
  if (idx1 <= 0) {return 0;}
  const forceStr = key.substring(idx1 + 1);
  if (forceStr === '-.-') {return -3;}
  if (forceStr === '-') {return -2;}
  if (forceStr === '-.+') {return -1;}
  if (forceStr.length === 0) {return 0;}
  if (forceStr === '+.-') {return 1;}
  if (forceStr === '+') {return 2;}
  if (forceStr === '+.+') {return 3;}
  return 0;
}

static getOppositeKeyPostFix(key: string): string[]{
  const idx1 = key.indexOf('&');
  if (idx1 <= 0) {return [];}
  const forceStr = key.substring(idx1 + 1);
  if (forceStr === '-.-') {return ['+.+','+.-','-.+','+',''];}
  if (forceStr === '-') {return  ['+.+','+.-','+',''];}
  if (forceStr === '-.+') {return  ['+.+','+.-','+',''];}
  if (forceStr.length === 0) {return['-.-','-.+','-','+','+.+','+.-']}
  if (forceStr === '+.-') {return ['-.-','-.+','-','-.+',''];}
  if (forceStr === '+') {return ['-.-','-.+','-',''];}
  if (forceStr === '+.+') {return ['-.-','-.+','-','+.-',''];}
  return [];
}
}
