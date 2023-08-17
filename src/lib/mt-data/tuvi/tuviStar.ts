/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectHelper } from '../../helper/objectHelper';
import { EnumBaseClass } from '../enumBaseClass';
import { ElementNEnergy } from '../feng-shui/elementNenergy';
import { Omen } from '../feng-shui/omen';
import { TuViPalace } from './tuviPalace';

export class TuViStar extends EnumBaseClass {
  static CHINHTINHTOT = Omen.F1;
  static TROTINHTOT = Omen.F2;
  static TROTINHTRUNG = Omen.F3;
  static TROTINH = Omen.F4;
  static TROTINHXAU = Omen.D1;
  static BAITINH = Omen.D2;
  static SATTINH = Omen.D4;
  static CHINHTINHXAU = Omen.D4;

  static TUVI = new TuViStar(
    'TUVI',
    ElementNEnergy.EARTHYANG,
    TuViStar.CHINHTINHTOT
  );
  static THIENCO = new TuViStar(
    'THIENCO',
    ElementNEnergy.WOODYIN,
    TuViStar.CHINHTINHTOT
  );
  static THAIDUONG = new TuViStar(
    'THAIDUONG',
    ElementNEnergy.FIREYANG,
    TuViStar.CHINHTINHTOT
  );
  static VUKHUC = new TuViStar(
    'VUKHUC',
    ElementNEnergy.METALYIN,
    TuViStar.CHINHTINHTOT
  );
  static THIENDONG = new TuViStar(
    'THIENDONG',
    ElementNEnergy.WATERYANG,
    TuViStar.CHINHTINHTOT
  );
  static LIEMTRINH = new TuViStar(
    'LIEMTRINH',
    ElementNEnergy.FIREYIN,
    TuViStar.CHINHTINHXAU
  );
  static THIENPHUR = new TuViStar(
    'THIENPHUR',
    ElementNEnergy.EARTHYIN,
    TuViStar.CHINHTINHTOT
  );
  static THAIAM = new TuViStar(
    'THAIAM',
    ElementNEnergy.WATERYIN,
    TuViStar.CHINHTINHTOT
  );
  static THAMLANG = new TuViStar(
    'THAMLANG',
    ElementNEnergy.WATERYIN,
    TuViStar.CHINHTINHTOT
  );
  static CUMON = new TuViStar(
    'CUMON',
    ElementNEnergy.WATERYIN,
    TuViStar.CHINHTINHXAU
  );
  static THIENTUONG = new TuViStar(
    'THIENTUONG',
    ElementNEnergy.WATERYANG,
    TuViStar.CHINHTINHTOT
  );
  static THIENLUONG = new TuViStar(
    'THIENLUONG',
    ElementNEnergy.METALYIN,
    TuViStar.CHINHTINHTOT
  );
  static THATSAT = new TuViStar(
    'THATSAT',
    ElementNEnergy.METALYIN,
    TuViStar.CHINHTINHXAU
  );
  static PHAQUAN = new TuViStar(
    'PHAQUAN',
    ElementNEnergy.WATERYIN,
    TuViStar.CHINHTINHXAU
  );
  static TRANGSINH = new TuViStar(
    'TRANGSINH',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static MOCDUC = new TuViStar(
    'MOCDUC',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static QUANDOI = new TuViStar(
    'QUANDOI',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHTOT
  );
  static LAMQUAN = new TuViStar(
    'LAMQUAN',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHTOT
  );
  static DEVUONG = new TuViStar(
    'DEVUONG',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHTOT
  );
  static SUY = new TuViStar(
    'SUY',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHXAU
  );
  static BENH = new TuViStar(
    'BENH',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static TU = new TuViStar('TU', ElementNEnergy.WATERYANG, TuViStar.TROTINHXAU);
  static MO = new TuViStar('MO', ElementNEnergy.EARTHYANG, TuViStar.TROTINHXAU);
  static TUYET = new TuViStar(
    'TUYET',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHXAU
  );
  static THAI = new TuViStar(
    'THAI',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static DUONG = new TuViStar(
    'DUONG',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static HOALOC = new TuViStar(
    'HOALOC',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static HOAQUYEN = new TuViStar(
    'HOAQUYEN',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static HOAKHOA = new TuViStar(
    'HOAKHOA',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static HOAKY = new TuViStar(
    'HOAKY',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHXAU
  );
  static LOCTON = new TuViStar(
    'LOCTON',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static BACSI = new TuViStar(
    'BACSI',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static LUCSI = new TuViStar(
    'LUCSI',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static THANHLONG = new TuViStar(
    'THANHLONG',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static TIEUHAO = new TuViStar(
    'TIEUHAO',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHXAU
  );
  static TUONGQUAN = new TuViStar(
    'TUONGQUAN',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static TAUTHU = new TuViStar(
    'TAUTHU',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHTOT
  );
  static PHILIEM = new TuViStar(
    'PHILIEM',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static HYTHAN = new TuViStar(
    'HYTHAN',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static BENHPHU = new TuViStar(
    'BENHPHU',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHXAU
  );
  static DAIHAO = new TuViStar(
    'DAIHAO',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHXAU
  );
  static PHUCBINH = new TuViStar(
    'PHUCBINH',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static QUANPHUR = new TuViStar(
    'QUANPHUR',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static QUOCAN = new TuViStar(
    'QUOCAN',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static KINHDUONG = new TuViStar(
    'KINHDUONG',
    ElementNEnergy.METALYANG,
    TuViStar.SATTINH
  );
  static DALA = new TuViStar(
    'DALA',
    ElementNEnergy.EARTHYANG,
    TuViStar.SATTINH
  );
  static DIAKHONG = new TuViStar(
    'DIAKHONG',
    ElementNEnergy.FIREYANG,
    TuViStar.SATTINH
  );
  static DIAKIEP = new TuViStar(
    'DIAKIEP',
    ElementNEnergy.WATERYIN,
    TuViStar.SATTINH
  );
  static HOATINH = new TuViStar(
    'HOATINH',
    ElementNEnergy.FIREYANG,
    TuViStar.SATTINH
  );
  static LINHTINH = new TuViStar(
    'LINHTINH',
    ElementNEnergy.FIREYANG,
    TuViStar.SATTINH
  );

  static THAITUE = new TuViStar(
    'THAITUE',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHXAU
  );
  static THIEUDUONG = new TuViStar(
    'THIEUDUONG',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static TANGMON = new TuViStar(
    'TANGMON',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHXAU
  );
  static THIEUAM = new TuViStar(
    'THIEUAM',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static QUANPHUF = new TuViStar(
    'QUANPHUF',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static TUPHUF = new TuViStar(
    'TUPHUF',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHXAU
  );
  static TUEPHA = new TuViStar(
    'TUEPHA',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static LONGDUC = new TuViStar(
    'LONGDUC',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static BACHHO = new TuViStar(
    'BACHHO',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHXAU
  );
  static PHUCDUC = new TuViStar(
    'PHUCDUC',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static DIEUKHACH = new TuViStar(
    'DIEUKHACH',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static TRUCPHUF = new TuViStar(
    'TRUCPHUF',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static THIENKHOI = new TuViStar(
    'THIENKHOI',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static THIENVIET = new TuViStar(
    'THIENVIET',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static VANXUONG = new TuViStar(
    'VANXUONG',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHTOT
  );
  static VANKHUC = new TuViStar(
    'VANKHUC',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static TAPHU = new TuViStar(
    'TAPHU',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static HUUBAT = new TuViStar(
    'HUUBAT',
    ElementNEnergy.EARTHYIN,
    TuViStar.TROTINHTOT
  );
  static TAMTHAI = new TuViStar(
    'TAMTHAI',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static BATTOA = new TuViStar(
    'BATTOA',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static ANQUANG = new TuViStar(
    'ANQUANG',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static THIENQUY = new TuViStar(
    'THIENQUY',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static LONGTRI = new TuViStar(
    'LONGTRI',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static PHUONGCAC = new TuViStar(
    'PHUONGCAC',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static HONGLOAN = new TuViStar(
    'HONGLOAN',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static DAOHOA = new TuViStar(
    'DAOHOA',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static THIENHY = new TuViStar(
    'THIENHY',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static THIENXUONG = new TuViStar(
    'THIENXUONG',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINH
  );
  static THIENKHO = new TuViStar(
    'THIENKHO',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINH
  );
  static THAIPHU = new TuViStar(
    'THAIPHU',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHTOT
  );
  static PHONGCAO = new TuViStar(
    'PHONGCAO',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static THIENMA = new TuViStar(
    'THIENMA',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static HOACAI = new TuViStar(
    'HOACAI',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHTOT
  );
  static COTHAN = new TuViStar(
    'COTHAN',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHXAU
  );
  static QUATU = new TuViStar(
    'QUATU',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHXAU
  );
  static DAUQUAN = new TuViStar(
    'DAUQUAN',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static THIENQUAN = new TuViStar(
    'THIENQUAN',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static THIENPHUC = new TuViStar(
    'THIENPHUC',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static VANTINH = new TuViStar(
    'VANTINH',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static THIENTRU = new TuViStar(
    'THIENTRU',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static NGUYETDUC = new TuViStar(
    'NGUYETDUC',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static THIENDUC = new TuViStar(
    'THIENDUC',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHTOT
  );
  static THIENY = new TuViStar(
    'THIENY',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static THIENRIEU = new TuViStar(
    'THIENRIEU',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHTOT
  );
  static DUONGPHU = new TuViStar(
    'DUONGPHU',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static THIENTAI = new TuViStar(
    'THIENTAI',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static THIENTHO = new TuViStar(
    'THIENTHO',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static THIENTHUONG = new TuViStar(
    'THIENTHUONG',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHXAU
  );
  static THIENSU = new TuViStar(
    'THIENSU',
    ElementNEnergy.WATERYANG,
    TuViStar.TROTINHXAU
  );
  static THIENKHOC = new TuViStar(
    'THIENKHOC',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHXAU
  );
  static THIENHU = new TuViStar(
    'THIENHU',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHXAU
  );
  static THIENGIAI = new TuViStar(
    'THIENGIAI',
    ElementNEnergy.EARTHYANG,
    TuViStar.TROTINHTOT
  );
  static DIAGIAI = new TuViStar(
    'DIAGIAI',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static GIAITHAN = new TuViStar(
    'GIAITHAN',
    ElementNEnergy.WOODYANG,
    TuViStar.TROTINHTOT
  );
  static THIENHINH = new TuViStar(
    'THIENHINH',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static THIENLA = new TuViStar(
    'THIENLA',
    ElementNEnergy.WATERYIN,
    TuViStar.TROTINHXAU
  );
  static DIAVONG = new TuViStar(
    'DIAVONG',
    ElementNEnergy.WATERYIN,
    TuViStar.TROTINHXAU
  );
  static PHATOAI = new TuViStar(
    'PHATOAI',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static KIEPSAT = new TuViStar(
    'KIEPSAT',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static THIENKHONG = new TuViStar(
    'THIENKHONG',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static LUUHA = new TuViStar(
    'LUUHA',
    ElementNEnergy.WATERYIN,
    TuViStar.TROTINHXAU
  );
  static TUANKHONG = new TuViStar(
    'TUANKHONG',
    ElementNEnergy.FIREYANG,
    TuViStar.TROTINHXAU
  );
  static TRIETKHONG = new TuViStar(
    'TRIETKHONG',
    ElementNEnergy.METALYANG,
    TuViStar.TROTINHXAU
  );

  static MIEUDIA = 4;
  static VUONGDIA = 3;
  static DACDIA = 2;
  static BINHDIA = 1;
  static HAMDIA = 0;
  static DIANOTINIT = -1;
  static DIANOTAVAILABLE = -2;

  elementNEnergy: ElementNEnergy= null;
  omen: Omen= null;
  force: number= null;
  diaStatus: number= null;
  private palace: TuViPalace= null;

  constructor(name: string, eer: ElementNEnergy, omen: Omen) {
    super(name);
    this.elementNEnergy = eer;
    this.omen = omen;
    this.force = 0;
    this.diaStatus = TuViStar.DIANOTINIT;
    this.palace=null;
  }

  static getValues(): TuViStar[] {
    return TuViStar.TUVI.getValues() as TuViStar[];
  }

  static getDiaStatusByName(name:string) {
    if ( name==="MIEUDIA") return TuViStar.MIEUDIA;
    if ( name==="VUONGDIA") return TuViStar.VUONGDIA;
    if ( name==="DACDIA") return TuViStar.DACDIA;
    if ( name==="BINHDIA") return TuViStar.BINHDIA;
    if ( name==="HAMDIA") return TuViStar.HAMDIA;
    console.log("UNKNOW DIA NAME ",name)
    return TuViStar.DIANOTAVAILABLE;
  }

  override getClassName() {
    return 'TuVi.Star';
  }


  setPalace(starPalace:TuViPalace ) {
    this.palace=starPalace;
  }

  getPalace() {
    return this.palace;
  }

  getElement() {return this.elementNEnergy.element;}

  isSatTinh() {
    return this.omen === TuViStar.SATTINH;
  }

  isBaiTinh() {
    return !this.omen.isFavorable();
  }

  isChinhTinh() {
    return this.ordinal() <= TuViStar.PHAQUAN.ordinal();
  }

  isTrungTinh() {
    return this.omen === TuViStar.TROTINHTOT;
  }

  isPhuTinh() {
    return !this.isChinhTinh() && !this.isTrungTinh();
  }

  isTrangSinhRing() {
    return (
      this.ordinal() >= TuViStar.TRANGSINH.ordinal() &&
      this.ordinal() <= TuViStar.DUONG.ordinal()
    );
  }

  addOmen(omen: Omen) {
    if (!ObjectHelper.isNaN(omen)) {
      const newForce = omen.force;
      this.force += newForce;
    }
  }

  isFavorable() {
    return this.force > 0;
  }

  incForce(incforce: number) {
    this.force += incforce;
  }

  override getViewColorName() {
    return this.elementNEnergy.getViewColorName();
  }
}
