
import { ColorViewHelper } from "../helper/colorViewHelper";
import { MessageHelper } from "../helper/messageHelper";
import { ObjectHelper } from "../helper/objectHelper";
import { EnumBaseClass } from "./enumBaseClass";
import { ElementNEnergy } from "./feng-shui/elementNenergy";
import { Element } from "./feng-shui/element";
import { DataWithLog } from "./qi/dataWithLog";
import { QiType } from "./qi/qi-type";

// Base class for component
export class ComponentBase {

  constructor() {
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }

  isEnum(obj: any) {
    return obj instanceof EnumBaseClass;
  }

  getMessage(key:string): string {
    let res = "";
    if (  typeof key === 'string' ) {
      res = MessageHelper.getSymbolMessage(key);
    } else {
      res=key;
    }
    return res;
  }

  setSymbolMode(mode: boolean) {
    MessageHelper.setSymbolMode(mode);
  }


  getItemColor(item: any) {
    if ( this.isEnum(item) ) {
      return item.getViewColorName();
    } else {
      return ColorViewHelper.NONE ;
    }
  }

  getItemNameValue(item: any): string {
    if ( ObjectHelper.isNaN(item) ) return this.getMessage("Label.NA")
    if (this.isArray(item)) {
      let res = "";
      let sep = "";
      for (let index = 0; index < item.length; index++) {
        const element = item[index];
        res += sep+this.getItemNameValue(element);
        sep = ", "
      }
      return res;
    } else {
      let key = item;
      if ( this.isEnum(item) ) {
        return key;
      } else {
        if (  item instanceof DataWithLog) {
          return this.getItemNameValue(item.getValue())
        }
      }
      let msg = this.getMessage(key);
      if ( msg.length===0) msg = key;
      return msg;
    }
  }

  getItemNameWithSymbolValue(item: any) {
    if ( item===null ) return this.getMessage("Label.NA")
    let key = item;
    if ( this.isEnum(item) ) {
      key = item.getFullName()+".Symbol";
      if ( item instanceof ElementNEnergy ) {
        key = item.element.getFullName()+".Symbol";
        return  MessageHelper.getMessage(key)+' ' + item.energy.getSignName();
      }
      return this.getMessage(item) + ' ' + MessageHelper.getSymbolMessage(key);
    }
    return this.getMessage(key);
  }


  getBasePilarForce(idx: number) {
    return DataWithLog.PILARS_NAME[idx];
  }

  getBaseQiType(idx: number) {
    return QiType.NONE.getEnum(idx);
  }


  getBaseEnumElement(idx: number) {
    return Element.EARTH.getEnum(idx);
  }

  getBaseEnumEE(idx: number) {
    return ElementNEnergy.EARTHYANG.getEnum(idx);
  }
}
