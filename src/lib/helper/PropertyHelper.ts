/* eslint-disable @typescript-eslint/naming-convention */
// Must enable resolveJsonModule compiter option to true in tsconfig.jsonimport { ObjectHelper } from 'family-corner-lib';
import baseKeysJson from "../data/baseKeys.json";
import definedKeysJson from "../data/definedKeys.json";
import baziKeysJson from "../data/bazi.json";
import ref17KeysJson from "../data/ref17.json";
import HalacJson from "../data/Halac.json";
import zodiacKeysJson from "../data/zodiac.json";
import { ObjectHelper } from "../helper/objectHelper";
import { MyCalendar } from "../mt-data/date/mycalendar";
import { PropertyAttr } from "../mt-data/property/propertyAttr";
import { PropertyType } from "../mt-data/property/propertyType";
import { ObsKeyDistr } from "../observations/obsKeyDistr";
import { ObsPeriod } from "../observations/obsPeriod";
import { AssocArray } from "../data/assoc-array";

export class PropertyHelper {
  // Cache of all properties attributes handled by the session
  private static gCache: ObsKeyDistr;
  static save2GCache = true;

  // Cache of current found properties key string
  private static recursiveFindcache: any[];

  private static definedJsonPropFiles: any [];

  // Genre property of the person
  //
  private static currGenre = "XX.";

  // The current observable period
  private static currObsSession: ObsPeriod;

  constructor() {}

  private static catKeys: any = []  ;

  static addPropFileIfNotExist(jsonFile:any) {
    ObjectHelper.pushIfNotExist(PropertyHelper.definedJsonPropFiles,jsonFile)
  }

  static resetDefinedPropFile() {
    PropertyHelper.definedJsonPropFiles = [ definedKeysJson];
  }

  static addBaziPropFile() {
    PropertyHelper.addPropFileIfNotExist(baziKeysJson);
    PropertyHelper.setBaziProp()
  }

  static addTuviPropFile() {
    PropertyHelper.addPropFileIfNotExist(ref17KeysJson)
    PropertyHelper.setTuViProp()
  }

  static addZodiacPropFile() {
    PropertyHelper.addPropFileIfNotExist(zodiacKeysJson)
  }

  static addHalacPropFile() {
   // Nothing to add. Halac properties are in base
   PropertyHelper.addPropFileIfNotExist(HalacJson)
   PropertyHelper.setHalacProp()

  }

  static initHelper(session: ObsPeriod, sessionDate: MyCalendar) {
    this.currObsSession = session;
    PropertyHelper.initCache(session, sessionDate);
  }

  static setTuViProp () {

    let keys = Object.keys(ref17KeysJson);

    if ( ObjectHelper.isNaN(PropertyHelper.getHeaderKeys("TuVi.Menh."))) {
      PropertyHelper.catKeys["TuVi.Base"] = keys.filter(value => /^TuVi\.Base\./.test(value));

      PropertyHelper.catKeys["TuVi.Menh"] = keys.filter(value => /^TuVi\.Menh\./.test(value));
      PropertyHelper.catKeys["TuViPeriod.Menh"] = keys.filter(value => /^TuViPeriod\.Menh\./.test(value));
      PropertyHelper.catKeys["TuViYear.Menh"] = keys.filter(value => /^TuViYear\.Menh\./.test(value));
      PropertyHelper.catKeys["TuViYear.X"] = keys.filter(value => /^TuViYear\.X\./.test(value));
      PropertyHelper.catKeys["TuViPeriod.X"] = keys.filter(value => /^TuViPeriod\.X\./.test(value));
      PropertyHelper.catKeys["TuViPY.X"] = keys.filter(value => /^TuViPY\.X\./.test(value));
      PropertyHelper.catKeys["TuVi.Than"] = keys.filter(value => /^TuVi\.Than\./.test(value));

      PropertyHelper.catKeys["TuVi.PhuMau"] = keys.filter(value => /^TuVi\.PhuMau\./.test(value));
      PropertyHelper.catKeys["TuVi.PhucDuc"] = keys.filter(value => /^TuVi\.PhuDuc\./.test(value));
      PropertyHelper.catKeys["TuVi.DienTrach"] = keys.filter(value => /^TuVi\.DienTrach\./.test(value));
      PropertyHelper.catKeys["TuVi.TaiBach"] = keys.filter(value => /^TuVi\.TaiBach\./.test(value));
      PropertyHelper.catKeys["TuVi.QuanLoc"] = keys.filter(value => /^TuVi\.QuanLoc\./.test(value));
      PropertyHelper.catKeys["TuVi.TatAch"] = keys.filter(value => /^TuVi\.TatAch\./.test(value));
      PropertyHelper.catKeys["TuVi.ThienDi"] = keys.filter(value => /^TuVi\.ThienDi\./.test(value));
      PropertyHelper.catKeys["TuVi.NoBoc"] = keys.filter(value => /^TuVi\.NoBoc\./.test(value));
      PropertyHelper.catKeys["TuVi.TuTuc"] = keys.filter(value => /^TuVi\.TuTuc\./.test(value));
      PropertyHelper.catKeys["TuVi.PhuThe"] = keys.filter(value => /^TuVi\.PhuThe\./.test(value));
      PropertyHelper.catKeys["TuVi.HuynhDe"] = keys.filter(value => /^TuVi\.HuynhDe\./.test(value));

   }
  }


  static setBaziProp () {

    let keys = Object.keys(baziKeysJson);

    if (ObjectHelper.isNaN(PropertyHelper.getHeaderKeys("Destin.0"))) {
      PropertyHelper.catKeys["Destin.-"] = keys.filter(value => /^Destin\.\-/.test(value));
      PropertyHelper.catKeys["Destin.+"] = keys.filter(value => /^Destin\.\+/.test(value));
      PropertyHelper.catKeys["Destin.0"] = keys.filter(value => /^Destin\.0/.test(value));

      PropertyHelper.catKeys["PY.-"] = keys.filter(value => /^PY\.\-/.test(value));
      PropertyHelper.catKeys["PY.+"] = keys.filter(value => /^PY\.\+/.test(value));
      PropertyHelper.catKeys["PY.0"] = keys.filter(value => /^PY\.0/.test(value));

      PropertyHelper.catKeys["Period.-"] = keys.filter(value => /^Period\.\-/.test(value));
      PropertyHelper.catKeys["Period.+"] = keys.filter(value => /^Period\.\+/.test(value));
      PropertyHelper.catKeys["Period.0"] = keys.filter(value => /^Period\.0/.test(value));

      PropertyHelper.catKeys["Year.-"] = keys.filter(value => /^Year\.\-/.test(value));
      PropertyHelper.catKeys["Year.+"] = keys.filter(value => /^Year\.\+/.test(value));
      PropertyHelper.catKeys["Year.0"] = keys.filter(value => /^Year\.0/.test(value));
    }
  }

  static setHalacProp () {

    let keys = Object.keys(HalacJson);

    if ( ObjectHelper.isNaN(PropertyHelper.getHeaderKeys("Halac."))) {
      PropertyHelper.catKeys["Halac"] = keys.filter(value => /^Halac\./.test(value));

   }
  }

  static getHeaderKeys(header:string) : string []{
    return PropertyHelper.catKeys[header]
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
      PropertyHelper.gCache.clearSession(currSession, sessionDate);
    }
    PropertyHelper.enableCache();
  }

  static setGenre(genre: string) {
    PropertyHelper.currGenre = genre;
  }

  private static getSessionPropertyAttr(
    session: ObsPeriod,
    key: string
  ): PropertyAttr {
    return PropertyHelper.gCache.get(session, key) as PropertyAttr;
  }

  private static getSessionCachedPropertyAttr(
    session: ObsPeriod,
    key: string
  ): PropertyAttr {
    return PropertyHelper.getSessionPropertyAttr(session, key);
  }

  private static getCurrCachedPropertyAttr(key: string): PropertyAttr {
    return PropertyHelper.getSessionPropertyAttr(
      PropertyHelper.currObsSession,
      key
    );
  }

  static getSessionDate(session: ObsPeriod) {
    const obsDate = PropertyHelper.gCache.getObsDate(session);
    let res = "";
    if (!ObjectHelper.isNaN(obsDate)) {
      res = "" + obsDate;
    }
    return res;
  }

  static getSessionProperties(session: ObsPeriod): AssocArray {
    return PropertyHelper.gCache.getObsKeys(session);
  }

  static finalizeSession() {
    const sessionAssocArray = PropertyHelper.getSessionProperties(
      PropertyHelper.currObsSession
    );
    PropertyHelper.disableCache();
    for (var key in sessionAssocArray.getDataArr() ) {
      const keyAttr = sessionAssocArray.get(key);
      if (!ObjectHelper.isNaN(keyAttr) && keyAttr.isBase()) {
        keyAttr.setOppositeForce(
          PropertyHelper.getSumOppositeCachedForce(keyAttr)
        );
        keyAttr.setSupportForce(PropertyHelper.getSumCachedKeyForce(keyAttr));
      }
    }
    PropertyHelper.enableCache();
  }

  static addPropertyAttr(attr: PropertyAttr) {
    if (!ObjectHelper.isNaN(attr)) {
      if (PropertyHelper.save2GCache && !attr.isUndef()) {
        PropertyHelper.initOppositeAttr(attr);
        //console.log("addPropertyAttr",PropertyHelper.currObsSession,attr)
        PropertyHelper.gCache.put(PropertyHelper.currObsSession, attr.key, attr);
        //console.log("gCache after put ",PropertyHelper.gCache.getObsKeys(PropertyHelper.currObsSession))

      }
    }
  }

  static getPropertyAttr(key: string): PropertyAttr {
    let attr = PropertyHelper.getCurrCachedPropertyAttr(key);
    if (ObjectHelper.isNaN(attr)) {
      attr = new PropertyAttr(key);
      this.addPropertyAttr(attr);
    }
    return attr;
  }

  private static isPropertyExist(sKey: string) {
    return (
      PropertyHelper.isBaseProp(sKey) || PropertyHelper.isDefinedProp(sKey)
    );
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

  static getBaseJsonElementAttr(key: string) {
    type keyType = keyof typeof baseKeysJson;
    const attr = baseKeysJson [key as keyType];
    return attr;
  }

 static getDefinedElementAttr(key: string) {
  let attr = null ;
  for (let index = 0; index < PropertyHelper.definedJsonPropFiles.length; index++) {
    const jsondata = PropertyHelper.definedJsonPropFiles[index];
    type keyType = keyof typeof jsondata;
    attr = jsondata[key as keyType];
    if (! ObjectHelper.isNaN(attr) ) break
  }
   return attr;
  }

  static getPropTypeElementAttr(propType: PropertyType, key: string) {
    if (propType === PropertyType.BASE) {
      return PropertyHelper.getBaseJsonElementAttr(key);
    } else {
      const attr = PropertyHelper.getDefinedElementAttr(key);
      if ( !ObjectHelper.isNaN(attr)  && key.length>3) {
        const xIndex = key.indexOf("&");
        if (xIndex < 0 ) {
          if (!key.startsWith("Ref")) {
            if (!key.startsWith("Label")) {
              if (!key.startsWith("Mariage")) {
                if (!key.startsWith("Business")) {
                  if (!key.startsWith("Career")) {
                    if (!key.startsWith("All")) {
                      if (!key.startsWith("Wife")) {
                        if (!key.startsWith("Person")) {
                          if (!key.startsWith("Origin")) {
                            if (!key.startsWith("M.Ref")) {
                              if (!key.startsWith("F.Ref")) {
                                if (!key.startsWith("Fortune")) {
                                  if (!key.startsWith("Life")) {
                                    if (!key.startsWith("Relation")) {
                                      if (!key.startsWith("ch.")) {
                                        if (!key.startsWith("Child")) {
                                          if (!key.startsWith("Bro")) {
                                            if (!key.startsWith("Parent")) {
                                              if (!key.startsWith("Health")) {
                                                if (
                                                  !key.startsWith("M.Person")
                                                ) {
                                                  if (
                                                    !key.startsWith("Halac")
                                                  ) {
                                                    if (
                                                      !key.startsWith("Study")
                                                    ) {
                                                      if (
                                                        !key.startsWith("Date")
                                                      ) {
                                                        if (
                                                          !key.startsWith(
                                                            "Mother"
                                                          )
                                                        ) {
                                                          if (
                                                            !key.startsWith(
                                                              "Father"
                                                            )
                                                          ) {
                                                            if (
                                                              !key.startsWith(
                                                                "Husband"
                                                              )
                                                            ) {
                                                              if (
                                                                !key.startsWith(
                                                                  "F."
                                                                )
                                                              ) {
                                                              console.log(
                                                                "CHECK key ",
                                                                key
                                                              );
                                                            } }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return attr;
    }
  }

  static getJsonElementPropertyAtIdx( key: string, idx: number) {
    let res: any = null;
    const attr = PropertyHelper.getDefinedElementAttr(key);
    if (!ObjectHelper.isNaN(attr)) {
      res = attr[idx];
    }
    return res;
  }

  static getJsonElementProperty(key: string) {
    return PropertyHelper.getJsonElementPropertyAtIdx(
      key,
      1
    ) as string;
  }

  static isBaseProp(key: string) {
    return PropertyHelper.isArrayElementPresent(baseKeysJson, key);
  }

  static getProperty(attr: PropertyAttr) {
    let res = "";
    let key = attr.key;
    switch (attr.keyType) {
      case PropertyType.BASE:
        //console.log('Calling getProperty for base key');
        break;
      case PropertyType.DEFINED:
        res = PropertyHelper.getJsonElementProperty( key);
        break;
      case PropertyType.INDIRECT:
        key = attr.getOtherKey();
        if (!ObjectHelper.isNaN(key)) {
          res = PropertyHelper.getJsonElementProperty(key);
        }
    }
    return res;
  }

  static isDefinedProp(key: string) {
    for (let index = 0; index < PropertyHelper.definedJsonPropFiles.length; index++) {
      const jsondata = PropertyHelper.definedJsonPropFiles[index];
      if ( PropertyHelper.isArrayElementPresent(jsondata, key) ) return true
    }
    return false;
  }

  static isFCachePresent(key: string) {
    return this.recursiveFindcache.indexOf(key)>=0;
  }

  static findNAddBaseKeys(
    baseKeyArr: PropertyAttr[],
    originKeyAttr: PropertyAttr,
    keyAttr: PropertyAttr,count=0
  ) {
    if (keyAttr.isUndef()) return;
    const key = keyAttr.key;
    if (!PropertyHelper.isFCachePresent(key)) {
      // use to avoid recursive loop definition
      PropertyHelper.recursiveFindcache.push(key);
      if (keyAttr.isBase()) {
        ObjectHelper.pushIfNotExist(baseKeyArr, keyAttr);
        if (PropertyHelper.save2GCache) {
          keyAttr.addOriginKeysArr(originKeyAttr);
        }
      } else {
        if (keyAttr.isDefinedOrIndirect()) {
          const baseKeyList = keyAttr.getBasesKeyList();
          if (baseKeyList.length > 0) {
            baseKeyList.forEach((baseKeyAttr) => {
              ObjectHelper.pushIfNotExist(baseKeyArr, baseKeyAttr);
            });
            return;
          }
        }
        // Base key list not yet initialized init it
        // from property
        let optMsg = PropertyHelper.getProperty(keyAttr);

        let currMessage = "";
        if (!ObjectHelper.isNaN(optMsg)) {
          while (optMsg.length > 0) {
            let starSubMsgPos = 0;
            const isComposedMsg = optMsg.charAt(starSubMsgPos) === "=";
            if (isComposedMsg) {
              starSubMsgPos++;
            }
            let endSubMsgPos = optMsg.indexOf("=", starSubMsgPos);

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
                this.findNAddBaseKeys(baseKeyArr, originKeyAttr, keyAttr1,count++);
              } else {
                console.log("TBD check currMessage not handle", keyAttr, currMessage);
              }
            }
          }
        }
      }
    }
    if (!key.startsWith(PropertyHelper.currGenre)) {
      const sKey = PropertyHelper.currGenre + key;
      //
      if (PropertyHelper.isPropertyExist(sKey)) {
        const genreAttr = PropertyHelper.getPropertyAttr(sKey);
        PropertyHelper.findNAddBaseKeys(baseKeyArr, originKeyAttr, genreAttr,count++);
      }
    }
  }

  static prepareBaseKeys(keyAttr: PropertyAttr) {
    if (keyAttr.isUndef()) return [];
    let baseKeyAttrArr: PropertyAttr[] = [];
    const isDefinedOrIndirect = keyAttr.isDefinedOrIndirect();
    if (isDefinedOrIndirect) {
      baseKeyAttrArr = keyAttr.getBasesKeyList();
    }
    if (baseKeyAttrArr.length === 0) {
      PropertyHelper.recursiveFindcache = [];
      PropertyHelper.findNAddBaseKeys(baseKeyAttrArr, keyAttr, keyAttr);
      if (isDefinedOrIndirect) {
        keyAttr.setBasesKeyList(baseKeyAttrArr);
      }
      PropertyHelper.recursiveFindcache = [];
    }

    return baseKeyAttrArr;
  }

  static initOppositeAttr(origKeyAttr: PropertyAttr) {
    let defKeyAttr = origKeyAttr;
    if (origKeyAttr.keyType === PropertyType.INDIRECT) {
      defKeyAttr = PropertyHelper.getPropertyAttr(origKeyAttr.getOtherKey());
    }
    if (!defKeyAttr.isDefined()) return;
    let oppositeKeyList = PropertyHelper.getOppositeKeyPostFix(defKeyAttr.key);
    let keySuffix = defKeyAttr.key;
    const idx1 = keySuffix.indexOf("&");
    if (idx1 > 0) {
      keySuffix = keySuffix.substring(0, idx1);
    }
    oppositeKeyList.forEach((postFix) => {
      let oppositeKey = keySuffix + "&" + postFix;
      if (PropertyHelper.isDefinedProp(oppositeKey)) {
        // Add the found opposite raw key in opposite key list
        // Assume no recursive or duplicate case
        defKeyAttr.addOppositeKey(oppositeKey);
      }
    });
  }

  static addCommentLabel(key: string) {
    // find and insert base key message
    const keyAttr = PropertyHelper.getPropertyAttr(key);
    return PropertyHelper.prepareBaseKeys(keyAttr);
  }

  static getMeanPropForceContribution(
    sessionOrd: number,
    keyRec: PropertyAttr
  ) {
    let res = 0;
    let count = 1;
    for (let i = 0; i <= sessionOrd; i++) {
      const session = ObsPeriod.getObsPeriod(i);
      const attr = PropertyHelper.getSessionPropertyAttr(session, keyRec.key);
      if (!ObjectHelper.isNaN(attr)) {
        if (!attr.isUndef()) {
          res += attr.force;
          count++;
        }
      }
    }
    return Math.round(res / count);
  }

  // Assume keyRec is base key
  static getSumOppositeCachedForce(keyAttr: PropertyAttr) {
    let res = 0;
    const originKeyArr = keyAttr.getOriginKeysArr();
    const oppositeKeyArr: PropertyAttr[] = [];

    // Init support base list
    originKeyArr.forEach((originKeyAttr) => {
      const currOppositeKeyArr = originKeyAttr.getOppositeKeyArr();
      currOppositeKeyArr.forEach((oppositeKey) => {
        const oppositeAttr = PropertyHelper.getPropertyAttr(oppositeKey);
        if (!oppositeAttr.isUndef()) {
          // Assume that only one is counted
          ObjectHelper.pushIfNotExist(oppositeKeyArr, oppositeAttr);
        }
      });
    });
    const currSessionOrd = PropertyHelper.currObsSession.ordinal() - 1;
    oppositeKeyArr.forEach((oppositeAttr) => {
      const originOppositeKeyForce = oppositeAttr.force;
      const keyBaseArr = PropertyHelper.prepareBaseKeys(oppositeAttr);
      keyBaseArr.forEach((baseKey) => {
        res +=
          originOppositeKeyForce + // Force of the source opposite base key
          baseKey.force + // Base opposite key force
          PropertyHelper.getMeanPropForceContribution(currSessionOrd, baseKey);
      });
    });
    return res;
  }

  // Assume keyRec is base key
  static getSumCachedKeyForce(keyRec: PropertyAttr) {
    let res = 0;
    let keyList = keyRec.getOriginKeysArr();
    const originKeyBaseArr: PropertyAttr[] = [keyRec];
    const currSessionOrd = PropertyHelper.currObsSession.ordinal() - 1;
    keyList.forEach((keyAttr) => {
      // Current session property attributes
      const originForce = keyAttr.force;
      const keyBaseArr = PropertyHelper.prepareBaseKeys(keyAttr);
      keyBaseArr.forEach((baseKey) => {
        if (!ObjectHelper.hasItem(originKeyBaseArr, baseKey)) {
          res +=
            baseKey.force +
            originForce +
            PropertyHelper.getMeanPropForceContribution(
              currSessionOrd,
              keyAttr
            );
          // Only one is counted
          ObjectHelper.pushIfNotExist(originKeyBaseArr, baseKey);
        }
      });
    });

    return res;
  }

  //
  static getFinalForce(session: ObsPeriod, keyRec: PropertyAttr) {
    const prevForce = PropertyHelper.getMeanPropForceContribution(
      session.ordinal() - 1,
      keyRec
    );
    const finalForce = keyRec.getSumForce() + prevForce;
    return finalForce;
  }

  // Return true of this key with its supported forces is stronger that its opposite key force
  //
  static isCandidate(session: ObsPeriod, keyRec: PropertyAttr) {
    const finalForce = PropertyHelper.getFinalForce(session, keyRec);
    // Return true if the totalForce is the same sign as sum of key force and support
    return finalForce < 0 === keyRec.force + keyRec.getSupportForce() < 0;
  }

  static isReferencedInPreviousThemeType(keyRec: PropertyAttr) {
    let res = true;
    const currSession = PropertyHelper.currObsSession;
    for (let i = 0; i < PropertyHelper.currObsSession.ordinal(); i++) {
      PropertyHelper.currObsSession = ObsPeriod.getObsPeriod(i);
      const attr = PropertyHelper.getCurrCachedPropertyAttr(keyRec.key);
      if (ObjectHelper.isNaN(attr)) {
        res = false;
        break;
      }
    }
    PropertyHelper.currObsSession = currSession;
    return res;
  }

  static getKeyPostFixForce(key: string) {
    const idx1 = key.indexOf("&");
    if (idx1 <= 0) {
      return 0;
    }
    const forceStr = key.substring(idx1 + 1);
    if (forceStr === "-.-") {
      return -3;
    }
    if (forceStr === "-") {
      return -2;
    }
    if (forceStr === "-.+") {
      return -1;
    }
    if (forceStr.length === 0) {
      return 0;
    }
    if (forceStr === "+.-") {
      return 1;
    }
    if (forceStr === "+") {
      return 2;
    }
    if (forceStr === "+.+") {
      return 3;
    }
    return 0;
  }

  static getOppositeKeyPostFix(key: string): string[] {
    const idx1 = key.indexOf("&");
    if (idx1 <= 0) {
      return [];
    }
    const forceStr = key.substring(idx1 + 1);
    if (forceStr === "-.-") {
      return ["+.+", "+.-", "-.+", "+", ""];
    }
    if (forceStr === "-") {
      return ["+.+", "+.-", "+", ""];
    }
    if (forceStr === "-.+") {
      return ["+.+", "+.-", "+", ""];
    }
    if (forceStr.length === 0) {
      return ["-.-", "-.+", "-", "+", "+.+", "+.-"];
    }
    if (forceStr === "+.-") {
      return ["-.-", "-.+", "-", "-.+", ""];
    }
    if (forceStr === "+") {
      return ["-.-", "-.+", "-", ""];
    }
    if (forceStr === "+.+") {
      return ["-.-", "-.+", "-", "+.-", ""];
    }
    return [];
  }
}
