import { EnumBaseClass } from "../enumBaseClass";

// Ref3p356-p376 Cach cuc
// Ref9p171 chap 19 Structures
export class BaziStructure extends EnumBaseClass {
  // Must have the same order as in ElementNEnergyRelation for the
  // Ten first one
  //
  static  KIEP_TAI= new BaziStructure('RW');
  static  TY_KIEN= new BaziStructure('F');
  static  THUONG_QUAN= new BaziStructure('HO');
  static  THUC_THAN= new BaziStructure('EG');
  static  CHINH_TAI= new BaziStructure('DW');
  static  THIEN_TAI= new BaziStructure('IW');
  static  CHINH_QUAN= new BaziStructure('DO');
  static  THAT_SAT= new BaziStructure('7K');
  static  CHINH_AN= new BaziStructure('DR');
  static  THIEN_AN= new BaziStructure('IR');

  static  KINH_DUONG_KIEN_LOC= new BaziStructure('KDKL');
  static  KHUC_TRUC= new BaziStructure('KT');
  static  NHUAN_HA= new BaziStructure('NH');
  static  TONG_CACH= new BaziStructure('TC');
  static  GIA_TUONG= new BaziStructure('GT');
  static  VIEM_THUONG= new BaziStructure('VT');
  static  TO_FIRE= new BaziStructure('TFI');
  static  TO_WOOD= new BaziStructure('TWO');
  static  TO_WATER= new BaziStructure('TWA');
  static  TO_METAL= new BaziStructure('TME');
  static  TO_EARTH= new BaziStructure('TEA');
  static  TONG_TAI= new BaziStructure('TT');
  static  DUMMY_TONG_TAI= new BaziStructure('DTT');
  static  TONG_SAT= new BaziStructure('TS');
  static  DUMMY_TONG_SAT= new BaziStructure('DTS');
  static  TONG_NHI= new BaziStructure('TN');
  static  DUMMY_TONG_NHI= new BaziStructure('DTN');
  static  TONG_THE= new BaziStructure('TTH');
  static  DUMMY_TONG_THE= new BaziStructure('DTTH');
  static  THIEN_CAN_NHAT_TU= new BaziStructure('TCNT');
  static  DIA_CHI_NHAT_TU= new BaziStructure('DCNT');
  static  THIEN_NGUYEN_NHAT_KHI= new BaziStructure('TNNK');
  static  THIEN_DIA_DUC_KHI= new BaziStructure('TDDK');


  constructor(name:string) {
    super(name);
}

override getClassName() {return 'CachCucElement';}

}
