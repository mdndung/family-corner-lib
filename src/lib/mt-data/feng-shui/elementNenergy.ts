/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Energy } from './energy';
import { Element } from './element';
import { EnumBaseClass } from '../enumBaseClass';
import { ColorViewHelper } from '../../helper/colorViewHelper';


export class ElementNEnergy extends EnumBaseClass {
  static WOODYANG = new ElementNEnergy('WOODYANG', Element.WOOD, Energy.YANG,ColorViewHelper.WOODYANG);
  static WOODYIN = new ElementNEnergy('WOODYIN', Element.WOOD, Energy.YIN,ColorViewHelper.WOODYIN);
  static WATERYANG = new ElementNEnergy(
    'WATERYANG',
    Element.WATER,
    Energy.YANG,
    ColorViewHelper.WATERYANG
  );
  static WATERYIN = new ElementNEnergy('WATERYIN', Element.WATER, Energy.YIN,ColorViewHelper.WATERYIN);
  static FIREYANG = new ElementNEnergy('FIREYANG', Element.FIRE, Energy.YANG,ColorViewHelper.FIREYANG);
  static FIREYIN = new ElementNEnergy('FIREYIN', Element.FIRE, Energy.YIN,ColorViewHelper.FIREYIN);
  static METALYANG = new ElementNEnergy(
    'METALYANG',
    Element.METAL,
    Energy.YANG,ColorViewHelper.METALYANG
  );
  static METALYIN = new ElementNEnergy('METALYIN', Element.METAL, Energy.YIN,ColorViewHelper.METALYIN);
  static EARTHYANG = new ElementNEnergy(
    'EARTHYANG',
    Element.EARTH,
    Energy.YANG,ColorViewHelper.EARTHYANG
  );
  static EARTHYIN = new ElementNEnergy('EARTHYIN', Element.EARTH, Energy.YIN,ColorViewHelper.EARTHYIN);

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
  colorViewName: string;

  constructor(name: string, element: Element, energy: Energy,colorName: string) {
    super(name);
    this.element = element;
    this.energy = energy;
    this.colorViewName=colorName;
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

  override toString(): string {
    return this.element + this.energy.getSignName();
  }

  override getViewColorName() {
    return this.colorViewName;
  }

  isHostile(otherEnE: ElementNEnergy) {
    if ( this.energy===otherEnE.energy ) return false ;
    return this.element.isDestructive(otherEnE.element) || otherEnE.element.isDestructive(this.element)
  }
}
