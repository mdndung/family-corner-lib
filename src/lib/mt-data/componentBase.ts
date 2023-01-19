
import { ColorViewHelper } from "../helper/colorViewHelper";
import { MessageHelper } from "../helper/messageHelper";
import { StringHelper } from "../helper/stringHelper";
import { EnumBaseClass } from "./enumBaseClass";

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

  getItemNameValue(item: any) {
    if ( item===null ) return this.getMessage("Label.NA")
    let key = item;
    if ( this.isEnum(item) ) {
      if ( item.getClassName()==='ElementNEnergy' ) {
        return this.getMessage(item.element) +this.getMessage(item.energy);
      }
      key = item.getFullName();
    }
    return this.getMessage(key);
  }

  getItemNameWithSymbolValue(item: any) {
    if ( item===null ) return this.getMessage("Label.NA")
    let key = item;
    if ( this.isEnum(item) ) {
      key = item.getFullName()+".Symbol";
      if ( item.getClassName()==='ElementNEnergy' ) {
        key = item.element.getFullName()+".Symbol";
        return this.getMessage(item.element) + ' ' + MessageHelper.getMessage(key)+' ' + item.energy.getSignName();
      }
      return this.getMessage(item) + ' ' + MessageHelper.getSymbolMessage(key);
    }
    return this.getMessage(key);
  }
}
