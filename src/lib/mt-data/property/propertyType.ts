/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';

export class PropertyType extends EnumBaseClass {

  static  UNDEF=new PropertyType('UNDEF');
  static  BASE=new PropertyType('BASE');
  static  DEFINED=new PropertyType('DEFINED');
  static  INDIRECT=new PropertyType('INDIRECT');

  constructor(name: string) {
    super(name);
  }


  override getClassName() {return 'PropertyType';}
}
