/* eslint-disable @typescript-eslint/naming-convention */
import { ColorViewHelper } from '../../helper/colorViewHelper';
import { ObjectHelper } from '../../helper/objectHelper';
import { EnumBaseClass } from '../enumBaseClass';

export class Element extends EnumBaseClass {

  static WOOD = new Element('WOOD',ColorViewHelper.WOODYANG);
  static FIRE = new Element('FIRE',ColorViewHelper.FIREYANG);
  static EARTH = new Element('EARTH',ColorViewHelper.EARTHYANG);
  static METAL = new Element('METAL',ColorViewHelper.METALYANG);
  static WATER = new Element('WATER',ColorViewHelper.WATERYANG);

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

  colorViewName: string;

  constructor(name: string,colorName: string) {
    super(name);
    this.colorViewName=colorName;
  }


  static getElement(idx: number) : Element {
    return Element.WATER.getEnum(idx) as Element;
  }


  static getValues(): Element[] {
    return Element.WATER.getValues() as Element[];
  }

  override getClassName() {
    return 'Element';
  }

  isFavorable(element: Element) {
    return this===element || this.isProductive(element);
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

  getPrevControlElement() {
    return this.getPrevCycleElement(Element.CONTROLLING_CYCLE);
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

  override getViewColorName() {
    return this.colorViewName;
  }

  isLostForceRelation(otherElement: Element) {
    return this.isProductive(otherElement) || otherElement.isDestructive(this);
  }
}
