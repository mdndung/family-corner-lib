/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Energy } from './energy';
import { Element } from './element';
import { EnumBaseClass } from '../enumBaseClass';


export class ElementNEnergy extends EnumBaseClass {
  static WOODYANG = new ElementNEnergy('WOODYANG', Element.WOOD, Energy.YANG);
  static WOODYIN = new ElementNEnergy('WOODYIN', Element.WOOD, Energy.YIN);
  static WATERYANG = new ElementNEnergy(
    'WATERYANG',
    Element.WATER,
    Energy.YANG
  );
  static WATERYIN = new ElementNEnergy('WATERYIN', Element.WATER, Energy.YIN);
  static FIREYANG = new ElementNEnergy('FIREYANG', Element.FIRE, Energy.YANG);
  static FIREYIN = new ElementNEnergy('FIREYIN', Element.FIRE, Energy.YIN);
  static METALYANG = new ElementNEnergy(
    'METALYANG',
    Element.METAL,
    Energy.YANG
  );
  static METALYIN = new ElementNEnergy('METALYIN', Element.METAL, Energy.YIN);
  static EARTHYANG = new ElementNEnergy(
    'EARTHYANG',
    Element.EARTH,
    Energy.YANG
  );
  static EARTHYIN = new ElementNEnergy('EARTHYIN', Element.EARTH, Energy.YIN);

  private static EnumIterArr = [
    ElementNEnergy.WOODYANG,
    ElementNEnergy.WOODYIN,
    ElementNEnergy.WATERYANG,
    ElementNEnergy.WATERYIN,
    ElementNEnergy.FIREYANG,
    ElementNEnergy.FIREYIN,
    ElementNEnergy.METALYANG,
    ElementNEnergy.METALYIN,
    ElementNEnergy.EARTHYANG,
    ElementNEnergy.EARTHYIN,
  ];

  element: Element;
  energy: Energy;

  constructor(name: string, element: Element, energy: Energy) {
    super(name);
    this.element = element;
    this.energy = energy;
  }

  static getElementNEnergy(element: Element, energy: Energy) {
    for (let index = 0; index < ElementNEnergy.EnumIterArr.length; index++) {
      const eNe = ElementNEnergy.EnumIterArr[index];
      if (
        eNe.getElement().isEqual(element) &&
        eNe.getEnergy().isEqual(energy)
      ) {
        return eNe;
      }
    }
    return ElementNEnergy.WOODYANG;
  }


  static getValues(): ElementNEnergy[] {
    return ElementNEnergy.WOODYANG.getValues() as ElementNEnergy[];
  }

  override getClassName() {
    return 'ElementNEnergy';
  }


  getElement() {
    return this.element;
  }

  getEnergy() {
    return this.energy;
  }

}
