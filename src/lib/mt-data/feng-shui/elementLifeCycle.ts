/* eslint-disable @typescript-eslint/naming-convention */
import { Branche } from '../bazi/branche';
import { Trunk } from '../bazi/trunk';
import { EnumBaseClass } from '../enumBaseClass';
import { QiForce } from '../qi/qi-force';
import { Energy } from './energy';

export class ElementLifeCycle extends EnumBaseClass {
  static BIRTH = new ElementLifeCycle('BIRTH', QiForce.FAVORABLE);
  static BATH = new ElementLifeCycle('BATH', QiForce.FAVORABLE);
  static ATTIRE = new ElementLifeCycle('ATTIRE', QiForce.FAVORABLE);
  static AGE = new ElementLifeCycle('AGE', QiForce.FAVORABLE);
  static PROSPERITY = new ElementLifeCycle('PROSPERITY', QiForce.FAVORABLE);
  static AGING = new ElementLifeCycle('AGING', QiForce.MEDIUM);
  static SICKNESS = new ElementLifeCycle('SICKNESS', QiForce.HOSTILE);
  static DEATH = new ElementLifeCycle('DEATH', QiForce.HOSTILE);
  static TOMB = new ElementLifeCycle('TOMB', QiForce.HOSTILE);
  static REPOSE = new ElementLifeCycle('REPOSE', QiForce.HOSTILE);
  static WOMB = new ElementLifeCycle('WOMB', QiForce.MEDIUM);
  static GESTATION = new ElementLifeCycle('GESTATION', QiForce.MEDIUM);

  qiForce: QiForce;

  constructor(name: string, force: QiForce) {
    super(name);
    this.qiForce = force;
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

  override getClassName() {
    return 'ElementLifeCycle';
  }
}
