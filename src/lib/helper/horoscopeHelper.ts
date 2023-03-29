/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { PropertyHelper } from './PropertyHelper';
import { XcelDocInterface } from '../interface/xcelDocInterface';
import { MessageHelper } from './messageHelper';
import { ObjectHelper } from './objectHelper';
import { PropertyAttr } from '../mt-data/property/propertyAttr';
import { ObsPeriod } from '../observations/obsPeriod';
import { AssocArray } from '../data/assoc-array';
import { MyCalendar } from '../mt-data/date/mycalendar';

export class HoroscopeHelper {

  static debug: number = 0 ;

  static genRowTitleLine(xcelDoc: XcelDocInterface, titleLine: string[]) {
    const colLen = titleLine.length;
    if (colLen > 0) {
      xcelDoc.genEmptyRow();
      xcelDoc.addCellTitle3(0, titleLine[0]);
      for (let index = 1; index < titleLine.length; index++) {
        const element = titleLine[index];
        xcelDoc.addCellTitle1(index, element);
      }
    }
  }

  static computeStudyAge(studyDate: MyCalendar, birthDate: MyCalendar) {
   let studyAge = studyDate.getYear() - birthDate.getYear();
    if ( studyDate.getMonth()<birthDate.getMonth() ) {
      studyAge--;
    } else {
      if ( studyDate.getMonth()===birthDate.getMonth() ) {
        if ( studyDate.getDay()<birthDate.getDay() ) {
          studyAge--;
        }
      }
    }
    return studyAge
  }

  static genWorkRowByCategory(
    session: ObsPeriod,
    xcelDoc: XcelDocInterface,
    titleLine: string[],
    categoryArr: string[]
  ) {
    let genTitle=true;
    const displayedKeyArr:PropertyAttr[]=[];
    const attrList = PropertyHelper.getSessionProperties(session);
    const displayCategory =  new AssocArray();
    for (let index = 0; index < categoryArr.length; index++) {
      const category = categoryArr[index];
      const categoryTitle = MessageHelper.getMessage(category);
      const categoryHeadersAttr = new PropertyAttr(category + '.Key.Headers');
      const categoryHeadersProp =
        PropertyHelper.getProperty(categoryHeadersAttr);
      const res = HoroscopeHelper.getMessagesByCategory(
        session, attrList,
        categoryHeadersProp,
        displayedKeyArr,
        displayCategory);
      if ( res.length>0 ) {
        if ( genTitle ) {
          HoroscopeHelper.genRowTitleLine(xcelDoc, titleLine);
          genTitle=false;
        }
        xcelDoc.genEmptyRow();
        xcelDoc.addCellTitle1(0, categoryTitle);
        xcelDoc.addCell(1, categoryHeadersProp);
        xcelDoc.genEmptyRow();
        xcelDoc.addCell(1, res);
      }
    }
    const otherRes = HoroscopeHelper.getMessagesByCategory(session, attrList, null,displayedKeyArr,displayCategory);
    if ( otherRes.length>0 ) {
      if ( genTitle ) {
        HoroscopeHelper.genRowTitleLine(xcelDoc, titleLine);
        genTitle=false;
      }
        xcelDoc.genEmptyRow();
        xcelDoc.addCellTitle1(0,  MessageHelper.getMessage('Label.Other.Categories'));
        xcelDoc.addCell(1, otherRes);
    }
  }

  static addRowLine(
    xcelDoc: XcelDocInterface,
    colVal: string[],
    colFont: number[]
  ) {
    xcelDoc.genEmptyRow();
    let fontIndex = 0;
    for (let index = 0; index < colVal.length; index++) {
      const value = colVal[index];
      if (index < colFont.length) {
        fontIndex = colFont[index];
      }
      xcelDoc.addBaseCell(index, value, fontIndex);
    }
  }

  static prepareCategoryToDisplay(
    session: ObsPeriod,
    categoryBaseKeyArr: AssocArray,
    keyAttr:PropertyAttr,
    displayedKeyArr:PropertyAttr[],
    categoryHeader: string,
    displayedInPreviousCategory: AssocArray) {
    if (keyAttr.isBase()) {
        keyAttr.getOriginKeysArr().forEach(originAttr => {

            const originBaseKeyList = PropertyHelper.findBaseKeys(originAttr);
            let isAllBaseKeyDisplayed = true;
            let currOriginDisplayedKeys : string [] = [];
            const originKey = originAttr.key;
            const originDisplayList: PropertyAttr[] = [];
            if ( displayedInPreviousCategory.exist(originKey) ) {
              currOriginDisplayedKeys = displayedInPreviousCategory.get(originKey)
            }
            originBaseKeyList.forEach(baseKeyAttr => {
              const baseKey = baseKeyAttr.key;
              if ( HoroscopeHelper.debug!==0 || PropertyHelper.isCandidate(session,baseKeyAttr) ) {
                if ( !ObjectHelper.hasItem(currOriginDisplayedKeys,baseKey)) {
                  const keyCategory = baseKeyAttr.getKeyCategory();
                  if (
                      categoryHeader === null ||
                      categoryHeader.indexOf(keyCategory) >= 0
                    ) {
                      ObjectHelper.pushIfNotExist(originDisplayList,baseKeyAttr);
                      currOriginDisplayedKeys.push(baseKeyAttr.key);
                      if ( !ObjectHelper.hasItem(displayedKeyArr,baseKeyAttr) ) {
                        isAllBaseKeyDisplayed= false ;
                        ObjectHelper.pushIfNotExist(displayedKeyArr,baseKeyAttr);
                      }
                    }
                  }
                }
              });
              // Do not display if all base keys are all ready displayed
              if (!isAllBaseKeyDisplayed){
                categoryBaseKeyArr.put(originKey,originDisplayList);
              }
              displayedInPreviousCategory.put(originKey,currOriginDisplayedKeys);
        });
      }
  }


  static filterDuplicateCategories( categoryBaseAttrList: AssocArray ) {
    const messageAttrList = categoryBaseAttrList.dataArr;
    // Loop on all messages
    for (const key1 in messageAttrList) {
      const key1AttrList = messageAttrList[key1] as PropertyAttr[];
      const key1AttrListLen = key1AttrList.length;
      let isIncludedInOther = false ;
      // Check if this key1AttrList is included in the other

      for (const key2 in messageAttrList) {
          const key2AttrList = messageAttrList[key2] as PropertyAttr[];
          let isIncludedInKey2 = false ;
          if ( key2!==key1 ) {
            isIncludedInKey2=true;
            // Check if this key1AttrList's base key is included in this key2AttrList
            if ( key2AttrList.length>key1AttrListLen) {
              let foundKey1Element=false;
              for (let indexKey1 = 0; indexKey1 < key1AttrListLen; indexKey1++) {
                const key1Element = key1AttrList[indexKey1];
                foundKey1Element=false
                for (let indexKey2 = 0; indexKey2 < key2AttrList.length; indexKey2++) {
                  if ( key1Element===key2AttrList[indexKey2]) {
                    foundKey1Element=true;
                    break;
                  }
                }
                if ( !foundKey1Element ) {
                  // key1Element is not found in this key2AttrList
                  isIncludedInKey2=false;
                  break;
                }
              }
            } else {
              isIncludedInKey2=false;
            }
          }
          if ( isIncludedInKey2 ) {
            isIncludedInOther = true;
            break;
          }
      }
       if ( isIncludedInOther ) {
        categoryBaseAttrList.pop(key1);
      }
    }
  }

  static genMessages(session: ObsPeriod,baseKey2Gen: AssocArray) {
    let res = '';
    const messageAttrArr = baseKey2Gen.dataArr;
    // Loop on all message
    for (const key1 in messageAttrArr) {
      const key1AttrList = messageAttrArr[key1] as PropertyAttr[];
        let currMessage='';
        let sep='';
        key1AttrList.forEach(keyAttr => {
          const temp = HoroscopeHelper.getBaseKeyMessage(session,keyAttr);
          if ( temp.length>0 ) {
            currMessage+=sep+HoroscopeHelper.getBaseKeyMessage(session,keyAttr) ;
            sep='. ';
          }
        });
        if ( currMessage.length>0 ) {
          res+=currMessage+'\n';
        }
    }
    return res;
  }

  static getBaseKeyMessage(session: ObsPeriod,keyAttr:PropertyAttr) {
    let res = '';
    if ( !keyAttr.isBase() ) return res ;
    const key = keyAttr.key;

    const supportForce = keyAttr.getSupportForce();
    const oppositeForce = keyAttr.getOppositeForce();
    if ( HoroscopeHelper.debug===0 ) {
      if ( PropertyHelper.isCandidate(session,keyAttr) ) {
       res += MessageHelper.getMessage(key) ;
      }
    } else {
      let originKey = '';
      keyAttr.getOriginKeysArr().forEach(attr => {
        originKey+=' '+attr.key;
      });
      let baseKeys = ' ';
      keyAttr.getBasesKeyList().forEach(element => {
        res +=' '+element.key;
      });
      res += key + ' ( force ' + keyAttr.force ;

        if ( supportForce !== 0 ) {
          res += ', support ' + supportForce
        }

        if (oppositeForce!== 0 ) {
          res += ', opposite ' + oppositeForce ;
        }

        const prev = PropertyHelper.getMeanPropForceContribution(session.ordinal()-1,keyAttr);
        if ( prev!==0 ) {
          res += ', prev ' + prev ;
        }
        res +=  ', final '+PropertyHelper.getFinalForce(session,keyAttr);
        res +=  ', supported '+keyAttr.getSupportForce();
      if ( keyAttr.isBase() ) {
        res += ', source '+originKey;
      }
      if ( keyAttr.isDefinedOrIndirect() ) {
        res += ', baseKey '+baseKeys;
      }
      res +=', displayable '+ PropertyHelper.isCandidate(session,keyAttr) +
         ') = ' + '\n';
      res += MessageHelper.getMessage(key);
      if ( HoroscopeHelper.debug!==0) res += '\n' ;
    }
    return res;

  }

  static getMessagesByCategory(
    session: ObsPeriod,
    attrList: PropertyAttr[],
    categoryHeaders: string,
    displayedKeyArr:PropertyAttr[],
    displayedCategory: AssocArray) {

    let res = '';
    const categoryBaseKeyArr = new AssocArray();
    for (const key in attrList) {
      const keyAttr = attrList[key] ;
      HoroscopeHelper.prepareCategoryToDisplay(
        session,categoryBaseKeyArr, keyAttr,displayedKeyArr,categoryHeaders,displayedCategory
      )
    }
    HoroscopeHelper.filterDuplicateCategories(categoryBaseKeyArr);
    res = HoroscopeHelper.genMessages(session,categoryBaseKeyArr);

    return res;
  }

}
