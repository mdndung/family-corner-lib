/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';

export class Energy extends EnumBaseClass {

  static YIN = new Energy('YIN');
  static YANG = new Energy('YANG');

  constructor(name: string) {
    super(name);
  }

  override getClassName() {return 'Energy';}

  isYang() {
    return this===Energy.YANG;
  }

  isYin() {
    return this===Energy.YIN;
  }

  getOpposite() {
    if ( this.isYang() ) {return Energy.YIN;}
    return Energy.YANG;
  }

  getSign() : number {
    if ( this.isYang() ) return 1;
    return -1;
  }

  getSignName() : string {
    if ( this.isYang() ) return '+';
    return '-';
  }
}
