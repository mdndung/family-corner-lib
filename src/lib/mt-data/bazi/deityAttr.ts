import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { Element } from "../feng-shui/element";
import { ObjectHelper } from "../../helper/objectHelper";
import { DeityHelper } from "../../helper/deityHelper";

export class DeityAttr {

  count: number[] = null;
  hiddenCount: number[] = null;
  force: number[] = null;
  elements: Element[] = null;
  countOrderedDeityName : string[] = null;
  countOrderedDeityGroupName : string[] = null;

  getDeityElement(deity:ElementNEnergyRelation) {
    return this.elements[deity.ordinal()]
  }

  getDeityElementByName(deityName:string) {
    const deity = DeityHelper.getDeityByName(deityName)
    const deityElement=this.getDeityElement(deity);
    return deityElement
  }



  getOrderedCountDeityName():string[]{
    if ( this.countOrderedDeityName===null ){
      this.countOrderedDeityName = [];
      let countOrder = ObjectHelper.cloneArray(this.count);
      ObjectHelper.sortNumber(countOrder,true)
      const eNERValues = ElementNEnergyRelation.getValues();
      for (let cindex = 0; cindex <countOrder.length ; cindex++) {
        const count = countOrder[cindex];
        for (let index = 0; index < eNERValues.length; index++) {
          const deity = eNERValues[index];
          if ( count===this.count[index]) {
            const deityName = deity.getName();
            if ( this.countOrderedDeityName.indexOf(deityName)===-1 ) {
              this.countOrderedDeityName[cindex]=deityName; break;
            }
          }
        }
      }
    }
    return this.countOrderedDeityName;
  }


  getOrderedCountDeityGroupName():string[]{
    if ( this.countOrderedDeityGroupName===null ){
      this.countOrderedDeityGroupName = [];
      let countOrder = ObjectHelper.cloneArray(this.count);
      for (let index = 0; index < countOrder.length; index++) {
        const element = countOrder[index];
        let grpIndex = index+1
        if (index%2!==0) {
          grpIndex=index-1
        }
        countOrder[index]+=countOrder[grpIndex]
      }
      ObjectHelper.sortNumber(countOrder,true)
      const eNERValues = ElementNEnergyRelation.getValues();
      for (let cindex = 0; cindex <countOrder.length ; cindex++) {
        const count = countOrder[cindex];
        for (let index = 0; index < eNERValues.length; index++) {
          const deity = eNERValues[index];
          if ( count===this.count[index]) {
            const deityName = deity.getBaseGroup().getName();
            if ( this.countOrderedDeityGroupName.indexOf(deityName)===-1 ) {
              this.countOrderedDeityGroupName[cindex]=deityName; break;
            }
          }
        }
      }
    }
    return this.countOrderedDeityGroupName;
  }



}
