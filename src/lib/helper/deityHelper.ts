import { ElementNEnergyRelation } from "../mt-data/feng-shui/elementNEnergyRelation";

export class DeityHelper {

  static getDeityByName (name: string) : ElementNEnergyRelation {
    return ElementNEnergyRelation.HO.getEnumByName(name) as ElementNEnergyRelation;
  }
}
