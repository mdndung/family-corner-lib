
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
}
