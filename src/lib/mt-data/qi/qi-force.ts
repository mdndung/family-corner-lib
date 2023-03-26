/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';

// Java class QiStatus and QiForce combined
export class QiForce extends EnumBaseClass {

  static FORCESUPERFAVORABLETHESHHOLD = 60/100; // Me
  static FORCEFAVORABLETHESHHOLD = 40/100; // Ref3p352
  static FORCEWEAKTHESHHOLD = 20/100; // Ref3p352

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

  isFavorable () {
    return this.force>=QiForce.FAVORABLEFORCE;
  }

  isStrong() {
    return this.force>=QiForce.STRONGFORCE;
  }

  static getQiForce(force: number, mediumQiForce?:QiForce) {
    if ( typeof mediumQiForce==='undefined' )mediumQiForce=QiForce.MEDIUM;
     if ( force<=QiForce.VERYHOSTILE.force ) return QiForce.VERYHOSTILE;
     if ( force<=QiForce.HOSTILE.force ) return QiForce.HOSTILE;
     if ( force<=QiForce.NONE.force ) return QiForce.NONE;
     if ( force<=QiForce.MEDIUM.force ) return mediumQiForce;
     if ( force<=QiForce.FAVORABLE.force ) return QiForce.FAVORABLE;
     if ( force<=QiForce.PROSPEROUS.force ) return QiForce.PROSPEROUS;
     if ( force<=QiForce.VERYSTRONG.force ) return QiForce.VERYSTRONG;
     return QiForce.TOOSTRONG;
  }
}
