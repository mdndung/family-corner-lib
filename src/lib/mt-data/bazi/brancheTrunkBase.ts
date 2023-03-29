import { EnumBaseClass } from "../enumBaseClass";
import { ElementNEnergy } from "../feng-shui/elementNenergy";

export class BrancheTrunkBase extends EnumBaseClass {

  elementNEnergy: ElementNEnergy;

  constructor(name: string, eNe: ElementNEnergy) {
    super(name);
    this.elementNEnergy=eNe;
  }


  getEnergy() { return this.elementNEnergy.energy; }

  getElement(){
    return this.elementNEnergy.element;
  }

  getStr() {
    return ' ('+this.toString()+', '+this.elementNEnergy+') ' ;
  }

  getRelationForce(other: BrancheTrunkBase,strict?: boolean) {
    if ( this.isHostile(other,strict) ) return -1;
    if ( this.isFavorable(other,strict) ) return 1;
    return 0;
  }

  isHostile(other: BrancheTrunkBase,strict?: boolean) {
    return this.elementNEnergy.isHostile(other.elementNEnergy,strict)
  }

  isFavorable(other: BrancheTrunkBase,strict?: boolean) {
    return this.elementNEnergy.isFavorable(other.elementNEnergy,strict)
  }

  override getViewColorName() {
    return this.elementNEnergy.getViewColorName();
  }

}
