/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';
import { QiForce } from '../qi/qi-force';
import { Omen } from './omen';

export class ElementRelation extends EnumBaseClass {

    static NEUTRAL = new ElementRelation('NEUTRAL');
    static GENERATE = new ElementRelation('GENERATE');
    static GENERATED= new ElementRelation('GENERATED');
    static RESTRICT= new ElementRelation('RESTRICT');
    static  RESTRICTED= new ElementRelation('RESTRICTED');
    static ENFORCE = new ElementRelation('ENFORCE');

  constructor(name: string) {
    super(name);
  }

  static getValues(): ElementRelation[] {
    return ElementRelation.NEUTRAL.getValues() as ElementRelation[];
  }


  override getClassName() {return 'ElementRelation';}


  isFavorable() {
		return this===ElementRelation.GENERATE ||
           this===ElementRelation.ENFORCE;
	}

	isWeakened() {
		return this===ElementRelation.GENERATE ||
           this===ElementRelation.RESTRICT ||
           this===ElementRelation.RESTRICTED ;
	}

	isRestrictive() {
		return this===ElementRelation.RESTRICT || this===ElementRelation.RESTRICTED ;
	}

	getQiForce() {
		if (this.isFavorable()) {return QiForce.FAVORABLE;}
		if (this.isRestrictive()) {return QiForce.HOSTILE;}
		return QiForce.NONE;
	}

  getForce() { return this.getQiForce().force; }

  // Ref 6 p262
  getReceiverOmen(): Omen {
		let res = Omen.F4;
		switch(this) {
		case ElementRelation.ENFORCE:
			res = Omen.F1;
			break;
		case ElementRelation.GENERATED :
			res = Omen.F3;
			break;
		case ElementRelation.RESTRICT :
			res = Omen.F2;
			break;
		case ElementRelation.RESTRICTED :
			res = Omen.D1;
			break;
		case ElementRelation.GENERATE :
			res = Omen.D2;
			break;
		case ElementRelation.NEUTRAL:
			res = Omen.F4;
			break;
		default:
			res = Omen.D4;
			break;
		}
		return res ;
	}
}
