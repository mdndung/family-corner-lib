/* eslint-disable @typescript-eslint/naming-convention */
import { Element } from '../feng-shui/element';
import { EnumBaseClass } from '../enumBaseClass';

export class Season extends EnumBaseClass {

  static  SPRING= new Season('SPRING',30,35, 25, 35, Element.WOOD);
  static  SUMMER= new Season('SUMMER',27,30, 25, 55, Element.FIRE);
  static  AUTUMN= new Season('AUTUMN',30,40, 25, 29, Element.METAL);
  static  WINTER= new Season('WINTER',30,60, 22, 25, Element.WATER);

  minYinCount: number;
  minYangCount: number;
  maxYinCount: number;
  maxYangCount: number;
  element: Element;

  constructor(
    name: string ,   minYinCount: number,maxYinCount: number,
    minYangCount: number,maxYangCount: number,
    element: Element
    ) {
    super(name);
    this.minYinCount = minYinCount;
		this.minYangCount = minYangCount;
		this.maxYinCount = maxYinCount;
		this.maxYangCount = maxYangCount;
		this.element=element;
  }

  override getClassName() {return 'Season';}

  isYin(count: number) {
    return this.minYinCount<=count && count<=this.maxYinCount;
  }

  isYang(count: number) {
    return this.minYangCount<=count && count<=this.maxYangCount;
  }

  override getViewColorName() {
    return this.element.getViewColorName();
  }

}
