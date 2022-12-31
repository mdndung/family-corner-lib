
import { MessageHelper } from "../helper/messageHelper";
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
    return MessageHelper.getSymbolMessage(key);
  }

  setSymbolMode(mode: boolean) {
    MessageHelper.setSymbolMode(mode);
  }
}
