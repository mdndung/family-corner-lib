/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';
import { Element } from './element';

export class Omen extends EnumBaseClass {

  static  F1= new Omen('F1',90,Element.WOOD);
  static  F2= new Omen('F2',80,Element.METAL);
  static  F3= new Omen('F3',70,Element.EARTH);
  static  F4= new Omen('F4',60,Element.WOOD);

  static D1 = new Omen('D1',-60,Element.EARTH);
  static D2= new Omen('D2',-70,Element.WATER);
  static D3 = new Omen('D3',-80,Element.FIRE);
  static D4 = new Omen('D4',-90,Element.METAL);

  element: Element;
  force: number;

  constructor(
    name: string,
    force: number,
    element: Element
  ) {
    super(name);
    this.force=force;
    this.element=element;
  }

  static getValues(): Omen[] {
    return Omen.F1.getValues() as Omen[];
  }

  override getClassName() {
    return 'Omen';
  }


  isFavorable() { return this.force>0; }

  getPointBase20() {
		let res = 0 ;
		switch (this) {
		case Omen.D4:
			res = 1 ;
			break;
		case Omen.D3:
			res = 2 ;
			break;
		case Omen.D2:
			res = 3 ;
			break;
		case Omen.D1:
			res = 4 ;
			break;
		case Omen.F4:
			res = 6 ;
			break;
		case Omen.F3:
			res = 7 ;
			break;
		case Omen.F2:
			res = 8 ;
			break;
		case Omen.F1:
			res = 9 ;
			break;
		default:
			break;
		}
		return res*2 ;

	}

  override getViewColorName() {
    return this.element.getViewColorName();
  }
}
