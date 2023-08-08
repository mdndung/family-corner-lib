/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectHelper } from '../../helper/objectHelper';
import { PropertyHelper } from '../../helper/PropertyHelper';
import { PropertyType } from './propertyType';

export class PropertyAttr {
  static FORCE_SEP = '&';
  static DOT = '.';
  key: string = null;
  keyType: PropertyType= null;
  force?: number= null;
  // Base key : array of [opposite, support] force
  // Defined/indirect key : array of baseKey Attr
  private variant2: any ;

  // Variant Indirect for other key
  // Variant defined for OppositeKeyArr
  // Variant base for originKeyAttrArr
  private variant1: any ;

  constructor(key: string,keyType=PropertyType.UNDEF) {
    this.key = key;
    this.keyType  = keyType;
    this.variant1=null;
    this.variant2=null;
    this.initKeyAttr();
  }

  addOriginKeysArr(attr: PropertyAttr) {
    if ( this.isBase() ) {
      if ( ObjectHelper.isNaN(this.variant1) ) {
        this.variant1 = [attr];
      } else {
        ObjectHelper.pushIfNotExist(this.variant1,attr)
      }
    }
  }

  getOriginKeysArr(): PropertyAttr[] {
    if ( this.isBase() ) {
      if ( !ObjectHelper.isNaN(this.variant1) ) {
       return this.variant1 as PropertyAttr[];
      }
    }
    return [];
  }

  addOppositeKey(key: string) {
    if ( this.isDefined() ) {
      if ( ObjectHelper.isNaN(this.variant1) ) {
        this.variant1 = [key];
      } else {
        ObjectHelper.pushIfNotExist(this.variant1,key)
      }
    }
  }

  getOppositeKeyArr(): string[] {
    if ( this.isDefined() ) {
      if ( !ObjectHelper.isNaN(this.variant1) ) {
       return this.variant1 as string[];
      }
    }
    return [];
  }

  setOtherKey(otherKey: string) {
    if ( this.isIndirect() ) {
      this.variant1=otherKey;
    }
  }

  getOtherKey(): string {
    if ( this.isIndirect() ) {
      if ( !ObjectHelper.isNaN(this.variant1) ) {
       return this.variant1 as string;
      }
    }
    return '';
  }

  setSupportForce(force: number) {
    if ( this.isBase() ) {
      if ( ObjectHelper.isNaN(this.variant2) ) {
        this.variant2 = [0,0];
      }
      this.variant2[1]=force;
    }
  }

  getSupportForce() {
    let force = 0;
    if ( this.isBase() ) {
      if ( ObjectHelper.isNaN(this.variant2) ) {
        this.variant2 = [0,0];
      }
      force = this.variant2[1];
    }
    return force;
  }

  setOppositeForce(force: number) {
    if ( this.isBase() ) {
      if ( ObjectHelper.isNaN(this.variant2) ) {
        this.variant2 = [0,0];
      }
      this.variant2[0]=force;
    }
  }

  getOppositeForce() {
    let force = 0;
    if ( this.isBase() ) {
      if ( ObjectHelper.isNaN(this.variant2) ) {
        this.variant2 = [0,0];
      }
      force = this.variant2[0];
    }
    return force;
  }

  addBasekey(baseKeyAttr: PropertyAttr) {
    if ( this.isDefinedOrIndirect() ) {
      if ( ObjectHelper.isNaN(this.variant2) ) {
        this.variant2 = [];
      }
      ObjectHelper.pushIfNotExist(this.variant2,baseKeyAttr)
    }
  }

  setBasesKeyList( baseKeyList : PropertyAttr[]) {
    if ( this.isDefinedOrIndirect() ) {
      if ( ObjectHelper.isNaN(this.variant2) ) {
        this.variant2=baseKeyList;
      } else {
        if ( this.variant2.length===0 ) {
          this.variant2=baseKeyList;
        }
      }

    }
  }

  getBasesKeyList() : PropertyAttr[]{
    let res = [];
    if ( this.isDefinedOrIndirect() ) {
      if ( ObjectHelper.isNaN(this.variant2) ) {
        this.variant2 = [];
      }
      res = this.variant2;
    }
    return res;
  }


  getSumForce () {
    return this.force+this.getSupportForce()-Math.abs(this.getOppositeForce());
  }

  isBase() {
    return this.keyType === PropertyType.BASE;
  }

  isDefinedOrIndirect() {
    return this.keyType === PropertyType.DEFINED ||
    this.keyType === PropertyType.INDIRECT;
  }

  isDefined() {
    return this.keyType === PropertyType.DEFINED;
  }

  isIndirect() {
    return this.keyType === PropertyType.INDIRECT;
  }

  isBaseOrDefined() {
    return this.isBase() || this.isDefined();
  }

  isUndef() {
    return this.keyType === PropertyType.UNDEF;
  }

  findOtherKey() {
    let res = null;
    const key = this.key;

    const forceStartPos = key.indexOf(PropertyAttr.FORCE_SEP);
    if (forceStartPos > 0) {
      const messagePrefix = key.substring(0, forceStartPos);
      const forceSuffix = key.substring(forceStartPos + 1);
      const forceSuffixLen = forceSuffix.length;
      if (forceSuffixLen===3) {
        if (!forceSuffix.startsWith('-.-')) {
          const dayForce = forceSuffix.substring(0, 1);
          const reducedKey = messagePrefix + PropertyAttr.FORCE_SEP + dayForce;
          if (PropertyHelper.isDefinedProp(reducedKey)) {
            res = reducedKey;
          }
        }
      } else {
        if (forceSuffixLen===1) {
          const reducedKey = messagePrefix + PropertyAttr.FORCE_SEP;
          if (PropertyHelper.isDefinedProp(reducedKey)) {
            res = reducedKey;
          }
        }
      }
      if (!PropertyHelper.isDefinedProp(res)) {
        res = null;
      }
    }
    return res;
  }

  initProp (propType: PropertyType) {
    if ( this.keyType===PropertyType.UNDEF ) {
      const attr = PropertyHelper.getPropTypeElementAttr(propType, this.key);
      if (!ObjectHelper.isNaN(attr)) {
        this.keyType = propType;
        const force = attr[0];
        this.force =  force ;
        if ( force!=0 ) {
          if ( this.key.endsWith("&") ) {
            let suffix = "-";
            if ( force>0 ) {
              suffix = "+";
            }
            attr.key+=suffix;
          }
        }
      }
   }
  }

  initOtherKey () {
    if ( this.keyType===PropertyType.UNDEF ) {
      const key=this.findOtherKey();
      if (!ObjectHelper.isNaN(key)) {
        this.keyType=PropertyType.INDIRECT;
        this.setOtherKey(key);
        const otherKeyAttr = PropertyHelper.getPropertyAttr( key );
        this.force = otherKeyAttr.force + PropertyHelper.getKeyPostFixForce(this.key);
      }
   }
  }

  initKeyAttr() {
    this.initProp(PropertyType.DEFINED);
    this.initProp(PropertyType.BASE);
    this.initOtherKey();
  }

  getKeyWithourGenrePrefix() {
    let currKey = this.key;
    if (currKey.startsWith('F.') || currKey.startsWith('M.'))
      {currKey = currKey.substring(2);}
    return currKey;
  }

  getKeyCategory() {
    let currKey = this.getKeyWithourGenrePrefix();
    const dotPos = currKey.indexOf('.');
    if (dotPos > 0) {
      currKey = currKey.substring(0, dotPos - 1);
    }
    if ( currKey.length<3 ) {
      currKey = this.key;
    }
    return currKey;
  }

  log() {
    if (this.keyType === PropertyType.INDIRECT) {
      console.log(
        'PropAttr key ',
        this.key,
        'type',
        this.keyType.getName(),
        this.getOtherKey()
      );
    } else {
      console.log('PropAttr key ', this.key, 'type', this.keyType.getName());
    }
  }
}
