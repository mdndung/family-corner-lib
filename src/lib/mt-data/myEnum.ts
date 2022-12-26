/* eslint-disable @typescript-eslint/naming-convention */

//import { EnumBaseClass } from './enumBaseClass';


//export class MyEnum extends EnumBaseClass {
  export class MyEnum {


  //someField1: Energy;
  //someField1: Element;
  //someField1: ElementNEnergy;
  //someField1: Trigram;
  // someField1: Trunk;
  //someField1: Branche;
  //someField1: Season;
  //someField1: SecondaryDeity;
  //someField1: ElementRelation;
  //someField1: ElementNEnergyRelation;
  //someField1: Omen;
  //someField1: PropertyType;
  //someField1: QiType;
  //someField1: Planet;

  name =' ';
  constructor(name: string) {
    this.name=name;
    //super(name);
    //this.someField1=Energy.YANG;
  }
  getName() { return this.name ;}

  static ONE= new MyEnum('ONE');
  //override getName() { return this.name + " Test passed " + this.someField1.getClassName() }
}
