import { MessageHelper } from "../helper/messageHelper";
import { EnumBaseClass } from "./enumBaseClass";

export class EnumBaseSymbolClass extends EnumBaseClass {

  constructor(name: string) {
    super(name);
  }

/*
  override getFullName(): string {
    let res= super.getFullName();
    if (MessageHelper.isSymbolMode()) {
      res += '.Symbol';
    }
    return res ;
  }
*/

}
