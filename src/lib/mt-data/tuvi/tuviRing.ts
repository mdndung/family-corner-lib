/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';
import { TuViStar } from './tuviStar';

export class TuViRing extends EnumBaseClass {

  static  Menh= new TuViRing('Menh');
  static  PhuMau= new TuViRing('PhuMau');
  static  PhucDuc= new TuViRing('PhucDuc');
  static  DienTrach= new TuViRing('DienTrach');
  static  QuanLoc= new TuViRing('QuanLoc');
  static  NoBoc= new TuViRing('NoBoc');
  static  ThienDi= new TuViRing('ThienDi');
  static  TatAch= new TuViRing('TatAch');
  static  TaiBach= new TuViRing('TaiBach');
  static  TuTuc= new TuViRing('TuTuc');
  static  PhuThe= new TuViRing('PhuThe');
  static  HuynhDe= new TuViRing('HuynhDe');

  constructor(
    name: string,
  ) {
    super(name);
  }

  static getValues(): TuViRing[] {
    return TuViRing.Menh.getValues() as TuViRing[];
  }

  override getClassName() {
    return 'TuVi.Ring';
  }



}
