import { Element } from "../feng-shui/element";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";

export class DeityRec {

  deity: ElementNEnergyRelation ;
  count: number;
  force: number;
  element: Element;

  constructor(deity: ElementNEnergyRelation) {
    this.deity=deity; this.count=0;
  }

  incCount() {
    this.count++
  }


}
