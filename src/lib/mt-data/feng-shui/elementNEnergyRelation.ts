/* eslint-disable @typescript-eslint/naming-convention */

import { EnumBaseClass } from "../enumBaseClass";

export class ElementNEnergyRelation extends EnumBaseClass {


  static RW= new ElementNEnergyRelation('RW');
  static F= new ElementNEnergyRelation('F');

  static HO= new ElementNEnergyRelation('HO');
  static  EG= new ElementNEnergyRelation('EG');


  static  DW= new ElementNEnergyRelation('DW');
  static  IW= new ElementNEnergyRelation('IW');


  static  DO= new ElementNEnergyRelation('DO');
  static  K7= new ElementNEnergyRelation('7K');


  static  DR= new ElementNEnergyRelation('DR');
  static  IR= new ElementNEnergyRelation('IR');


  static PRODUCTIVE_CYCLE = [
    ElementNEnergyRelation.RW,
    ElementNEnergyRelation.HO,
    ElementNEnergyRelation.DW,
    ElementNEnergyRelation.DO,
    ElementNEnergyRelation.DR,
  ];

  static CONTROLLING_CYCLE = [
    ElementNEnergyRelation.RW,
    ElementNEnergyRelation.DO,
    ElementNEnergyRelation.HO,
    ElementNEnergyRelation.DR,
    ElementNEnergyRelation.DW ];


  constructor(name: string) {
    super(name);
  }

  static getValues(): ElementNEnergyRelation[] {
    return ElementNEnergyRelation.DR.getValues() as ElementNEnergyRelation[];
  }

  override getClassName() {return 'ElementNEnergyRelation';}


  isProductive(eeR?: ElementNEnergyRelation): boolean {
    const thisBaseElement=this.getBaseGroup();
    if (typeof eeR === 'undefined' ) {
      return thisBaseElement===ElementNEnergyRelation.DR ||
      thisBaseElement===ElementNEnergyRelation.RW ;
    } else {
      const eerBaseElement=eeR.getBaseGroup();
      const nextEER = eerBaseElement.getNextElement(ElementNEnergyRelation.PRODUCTIVE_CYCLE);
      return eeR===nextEER;
    }
  }

  isRestrictive(eeR?: ElementNEnergyRelation): boolean {
    const thisBaseElement=this.getBaseGroup();
    if (typeof eeR === 'undefined' ) {
      return thisBaseElement===ElementNEnergyRelation.DR ||
      thisBaseElement===ElementNEnergyRelation.DO ||
      thisBaseElement===ElementNEnergyRelation.DW  ;
    }else {
      const nextEER = this.getNextElement(ElementNEnergyRelation.CONTROLLING_CYCLE);
      return eeR===nextEER;
    }
  }

  getBaseGroup() : ElementNEnergyRelation{
		if ( 1===(this.ordinal()%2) ) return this.getEnum(this.ordinal()-1) as ElementNEnergyRelation;
		return this;
	}

  getOtherElementInSameBaseGroup() : ElementNEnergyRelation{
		const baseElement=this.getBaseGroup();
    if ( baseElement===this ) return this.getEnum(this.ordinal()+1) as ElementNEnergyRelation
		return baseElement;
	}

  isFavorable(eeR: ElementNEnergyRelation) {
    return this===eeR || this.isProductive(eeR);
  }

  private getPrevCycleElement(fromElementArray: ElementNEnergyRelation[]) {
    const thisBaseElement=this.getBaseGroup();
    let res = ElementNEnergyRelation.DR;
    for (let i = 0; i < fromElementArray.length; i++) {
      if (thisBaseElement === fromElementArray[i]) {
        if (i === 0) {
          res = fromElementArray[fromElementArray.length-1];
        } else {
          res = fromElementArray[i - 1];
        }
      }
    }
    if ( thisBaseElement!==this ) {
      res = res.getEnumNextNElement(1);
    }
    return res;
  }

  private getNextCycleElement(fromElementArray: ElementNEnergyRelation[]) {
    let res = ElementNEnergyRelation.DR;
    const thisBaseElement=this.getBaseGroup();
    for (let i = 0; i < fromElementArray.length; i++) {
      if (thisBaseElement === fromElementArray[i]) {
        if (i === fromElementArray.length - 1) {
          res = fromElementArray[0];
        } else {
          res = fromElementArray[i + 1];
        }
      }
    }
    if ( thisBaseElement!==this ) {
      res = res.getEnumNextNElement(1);
    }
    return res;
  }


  getNextControlElement() {
    return this.getNextCycleElement(ElementNEnergyRelation.CONTROLLING_CYCLE);
  }

  getPrevControlElement() {
    return this.getPrevCycleElement(ElementNEnergyRelation.CONTROLLING_CYCLE);
	}

  getPrevProductiveElement() {
    return this.getPrevCycleElement(ElementNEnergyRelation.PRODUCTIVE_CYCLE);
  }

  getNextProductiveElement() {
    return this.getNextCycleElement(ElementNEnergyRelation.PRODUCTIVE_CYCLE);
  }


}
