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
}
