/* eslint-disable @typescript-eslint/naming-convention */

import { EnumBaseClass } from "../enumBaseClass";

export class ElementNEnergyRelation extends EnumBaseClass {

  static  GC= new ElementNEnergyRelation('DR');
  static  GE= new ElementNEnergyRelation('IR');
  static GDC= new ElementNEnergyRelation('HO');
  static  GDE= new ElementNEnergyRelation('EG');
  static  RC= new ElementNEnergyRelation('DO');
  static  RE= new ElementNEnergyRelation('7K');
  static  RDC= new ElementNEnergyRelation('DW');
  static  RDE= new ElementNEnergyRelation('IW');
  static EC= new ElementNEnergyRelation('RW');
  static EE= new ElementNEnergyRelation('F');


  constructor(name: string) {
    super(name);
  }

  static getValues(): ElementNEnergyRelation[] {
    return ElementNEnergyRelation.GC.getValues() as ElementNEnergyRelation[];
  }

  override getClassName() {return 'ElementNEnergyRelation';}


  isProductive(): boolean {
    return this.isEqual(ElementNEnergyRelation.GC) || this.isEqual(ElementNEnergyRelation.GE) ||
    this.isEqual(ElementNEnergyRelation.EC) || this.isEqual(ElementNEnergyRelation.EE) ;
  }

  isRestrictive(): boolean {
    return this.isEqual(ElementNEnergyRelation.GC) || this.isEqual(ElementNEnergyRelation.GE) ||
    this.isEqual(ElementNEnergyRelation.RC) || this.isEqual(ElementNEnergyRelation.RE) ||
    this.isEqual(ElementNEnergyRelation.RDC) || this.isEqual(ElementNEnergyRelation.RDE) ;
  }

}
