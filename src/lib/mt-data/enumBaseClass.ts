/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */

import { ObjectHelper } from '../helper/objectHelper';

export class EnumBaseClass {

  name: string;

  static ENUM_CLASS_NAME_ARR: string [] = [] ;
  static ENUM_ELEMENT_ARR: EnumBaseClass[][] = []   ;


  constructor(name: string) {
    this.name = name;
    this.addNewEnum();
  }

  static isSameEnumArray(eArr1: EnumBaseClass[], eArr2: EnumBaseClass[]) {
    let res = false;
    if ( eArr1.length===eArr2.length ) {
      res = true ;
      for (let index = 0; index < eArr1.length; index++) {
        const el1 = eArr1[index];
        if ( el1!==eArr2[index] ) {
          res = false ; break ;
        }
      }
    }
    return res ;
  }

  private getClassIndex() {
    const className = this.getClassName();
    let cIdx = EnumBaseClass.ENUM_CLASS_NAME_ARR.indexOf(className);
    if ( cIdx===-1 ) {
      cIdx = EnumBaseClass.ENUM_CLASS_NAME_ARR.length;
      EnumBaseClass.ENUM_CLASS_NAME_ARR.push(className);
      EnumBaseClass.ENUM_ELEMENT_ARR[cIdx]=[];
    }
    return cIdx;
  }

  ordinal() {
    const cIdx = this.getClassIndex();
    const eIdx = this.getIndex(EnumBaseClass.ENUM_ELEMENT_ARR[cIdx]);
    return eIdx;
  }

  getEnum(ord: number) {
    const res =  this.getValues()[ord];
    if (ObjectHelper.isNaN(res)) {
      console.log('getEnum null problem class ', this.getClassName(),
      ' ord ', ord);
    }
    return res;
  }

  private addNewEnum() {
    const eIdx = this.ordinal();
    if ( eIdx===-1 ) {
      const cIdx = this.getClassIndex();
      EnumBaseClass.ENUM_ELEMENT_ARR[cIdx].push(this);
    }
  }

  getValues() {
    const cIdx = this.getClassIndex();
    return [...EnumBaseClass.ENUM_ELEMENT_ARR[cIdx]];
  }

  isEqual(element: EnumBaseClass) {
    //if ( ObjectHelper.isUndefinedOrNull(element) ) return false ;
    //return this.name === element.name;
    // use object compare
    return this===element;
  }

  getClassName() {return 'getClassName to be defined';}

  getName() { return this.name; }

  getIndex(elementArr: EnumBaseClass[]) {
    const idx = elementArr.findIndex((element) => element.isEqual(this));
    return idx;
  }

  getNextElement( elementArr: EnumBaseClass[]) {
    const idx = this.getIndex(elementArr);
    let nextFromIdx = idx + 1;
    if (nextFromIdx === elementArr.length) {
      nextFromIdx = 0;
    }
    return elementArr[nextFromIdx];
  }


  getNextNElement( elementArr: EnumBaseClass[], n: number) {
    const len =elementArr.length;
    let index = (this.getIndex(elementArr) + n) % len;
    while (index<0) {index = (index + len ) % len;}
    return elementArr[index];
  }

  getEnumNextNElement( n: number ) {
    return this.getNextNElement(this.getValues(),n) as typeof this;
  }

  getFullName() {
    return this.getClassName()+'.'+this.getName();
  }

  toString() {
    return this.getName();
  }
}
