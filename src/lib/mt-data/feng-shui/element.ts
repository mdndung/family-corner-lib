/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';

export class Element extends EnumBaseClass {

  static WOOD = new Element('WOOD');
  static FIRE = new Element('FIRE');
  static EARTH = new Element('EARTH');
  static METAL = new Element('METAL');
  static WATER = new Element('WATER');

  static PRODUCTIVE_CYCLE = [
    Element.FIRE,
    Element.EARTH,
    Element.METAL,
    Element.WATER,
    Element.WOOD,
  ];

  static CONTROLLING_CYCLE = [
    Element.WATER,
    Element.FIRE,
    Element.METAL,
    Element.WOOD,
    Element.EARTH,
  ];


  constructor(name: string) {
    super(name);
  }


  static getElement(idx: number) {
    return Element.WATER.getEnum(idx);
  }


  static getValues(): Element[] {
    return Element.WATER.getValues() as Element[];
  }

  override getClassName() {
    return 'Element';
  }


  isProductive(element: Element) {
    const nextElement = this.getNextElement(Element.PRODUCTIVE_CYCLE);
    return element.isEqual(nextElement);
  }


  isDestructive(element: Element) {
    const nextElement = this.getNextElement(Element.CONTROLLING_CYCLE);
    return element.isEqual(nextElement);
  }

  getNextDestructiveElement() {
    return this.getNextCycleElement(Element.CONTROLLING_CYCLE);
  }

  getPrevProductiveElement() {
    return this.getPrevCycleElement(Element.PRODUCTIVE_CYCLE);
  }

  getNextProductiveElement() {
    return this.getNextCycleElement(Element.PRODUCTIVE_CYCLE);
  }

  private getPrevCycleElement(fromElementArray: Element[]) {
    let res = Element.WOOD;
    for (let i = 0; i < fromElementArray.length; i++) {
      if (this === fromElementArray[i]) {
        if (i === 0) {
          res = fromElementArray[fromElementArray.length-1];
        } else {
          res = fromElementArray[i - 1];
        }
      }
    }
    return res;
  }

  private getNextCycleElement(fromElementArray: Element[]) {
    let res = Element.WATER;
    for (let i = 0; i < fromElementArray.length; i++) {
      if (this === fromElementArray[i]) {
        if (i === fromElementArray.length - 1) {
          res = fromElementArray[0];
        } else {
          res = fromElementArray[i + 1];
        }
      }
    }
    return res;
  }
}
