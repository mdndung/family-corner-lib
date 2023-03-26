/* eslint-disable @typescript-eslint/naming-convention */
import { Branche } from '../bazi/branche';
import { Trunk } from '../bazi/trunk';
import { EnumBaseClass } from '../enumBaseClass';
import { QiForce } from '../qi/qi-force';
import { Energy } from './energy';
import { Element } from './element';

export class ElementLifeCycle extends EnumBaseClass {
  static BIRTH = new ElementLifeCycle('BIRTH',Element.WATER, QiForce.FAVORABLE);
  static BATH = new ElementLifeCycle('BATH',Element.WATER, QiForce.FAVORABLE);
  static ATTIRE = new ElementLifeCycle('ATTIRE',Element.METAL, QiForce.FAVORABLE);
  static AGE = new ElementLifeCycle('AGE',Element.METAL, QiForce.FAVORABLE);
  static PROSPERITY = new ElementLifeCycle('PROSPERITY',Element.METAL, QiForce.FAVORABLE);
  static AGING = new ElementLifeCycle('AGING',Element.WATER, QiForce.MEDIUM);
  static SICKNESS = new ElementLifeCycle('SICKNESS',Element.FIRE, QiForce.HOSTILE);
  static DEATH = new ElementLifeCycle('DEATH',Element.WATER, QiForce.HOSTILE);
  static TOMB = new ElementLifeCycle('TOMB',Element.EARTH, QiForce.HOSTILE);
  static REPOSE = new ElementLifeCycle('REPOSE',Element.EARTH, QiForce.HOSTILE);
  static WOMB = new ElementLifeCycle('WOMB',Element.EARTH, QiForce.MEDIUM);
  static GESTATION = new ElementLifeCycle('GESTATION',Element.WOOD, QiForce.MEDIUM);

  qiForce: QiForce;
  // Ref2332
  element: Element;

  constructor(name: string, element: Element, force: QiForce) {
    super(name);
    this.qiForce = force;
    this.element = element;
  }


  static getStartMonthElementLifeCycle(trunk: Trunk) {
    let res = Branche.COCK;
    switch (trunk) {
      case Trunk.JIA:
        res = Branche.PIG;
        break;
      case Trunk.YI:
        res = Branche.HORSE;
        break;
      case Trunk.BING:
      case Trunk.WU:
        res = Branche.TIGER;
        break;
      case Trunk.DING:
      case Trunk.JI:
        res = Branche.COCK;
        break;
      case Trunk.GENG:
        res = Branche.SNAKE;
        break;
      case Trunk.XIN:
        res = Branche.RAT;
        break;
      case Trunk.REN:
        res = Branche.MONKEY;
        break;
      case Trunk.GUI:
        res = Branche.RABBIT;
        break;
    }
    return res;
  }

  static getElementLifeCycle(trunk: Trunk, branche: Branche) {
    const start = ElementLifeCycle.getStartMonthElementLifeCycle(trunk);
    let nextCount = branche.ordinal() - start.ordinal();
    if (trunk.getEnergy() === Energy.YIN) {
      nextCount = -nextCount;
    }
    return ElementLifeCycle.BIRTH.getEnumNextNElement(nextCount);
  }

  isFavorable() {
    return this.qiForce.isFavorable();
  }
  override getClassName() {
    return 'ElementLifeCycle';
  }
}
