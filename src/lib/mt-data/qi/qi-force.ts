/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';

// Java class QiStatus and QiForce combined
export class QiForce extends EnumBaseClass {

;
  static  VERYHOSTILE = new QiForce('VERYHOSTILE',-8);
  static  HOSTILE = new QiForce('HOSTILE',-2);
  static  NONE = new QiForce('NONE',0);
  static  MEDIUM = new QiForce('MEDIUM',1);
  static FAVORABLEFORCE = 2;
  static  FAVORABLE = new QiForce('FAVORABLE',2);
  static STRONGFORCE = 4;
  static  PROSPEROUS = new QiForce('PROSPEROUS',4);
  static  VERYSTRONG = new QiForce('VERYSTRONG',8);
  static  TOOSTRONG = new QiForce('TOOSTRONG',10);

  force: number;

  constructor(name: string, force: number) {
    super(name);
    this.force = force;
  }

  override getClassName() {return 'Qi.Force';}

  isStrong() {
    return this.force>=QiForce.STRONGFORCE;
  }

}
