/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseSymbolClass } from '../enumBaseSymbolClass';


export class ElementNEnergyRelation extends EnumBaseSymbolClass {

  static  GC= new ElementNEnergyRelation('GC');
  static  GE= new ElementNEnergyRelation('GE');
  static GDC= new ElementNEnergyRelation('GDC');
  static  GDE= new ElementNEnergyRelation('GDE');
  static  RC= new ElementNEnergyRelation('RC');
  static  RE= new ElementNEnergyRelation('RE');
  static  RDC= new ElementNEnergyRelation('RDC');
  static  RDE= new ElementNEnergyRelation('RDE');
  static EC= new ElementNEnergyRelation('EC');
  static EE= new ElementNEnergyRelation('EE');

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
