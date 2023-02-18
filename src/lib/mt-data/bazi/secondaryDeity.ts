/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { ObjectHelper } from '../../helper/objectHelper';
import { EnumBaseClass } from '../enumBaseClass';
import { ElementNEnergy } from '../feng-shui/elementNenergy';
import { Branche } from './branche';
import { Lunar } from './lunar';
import { LunarBase } from './lunarBase';
import { Season } from './season';
import { Trunk } from './trunk';

export class SecondaryDeity extends EnumBaseClass {
  hasYearComment: boolean;

  // Ref8 p63
  // In relation with birthDay
  //
  static THIENKHOI = new SecondaryDeity('THN', true);
  static THIENVIET = new SecondaryDeity('THV', true); //  use THIENKHOI
  static THAICUC = new SecondaryDeity('THC');

  static LOCTHAN = new SecondaryDeity('LTH');
  static VANTINH = new SecondaryDeity('VTI');
  static HOCSI = new SecondaryDeity('HSI');
  static THIENLOC = new SecondaryDeity('TLO');
  static KIMDU = new SecondaryDeity('KDU');
  static HONGDIEM = new SecondaryDeity('HDI');
  static LUUHA = new SecondaryDeity('LHA');
  static TUONG = new SecondaryDeity('TNG');

  static DICHMA = new SecondaryDeity('DMA', true);
  static THIENY = new SecondaryDeity('TNY');
  static TAMKY = new SecondaryDeity('TKY');
  static KHOICUONG = new SecondaryDeity('KCU');
  static KIMTHAN = new SecondaryDeity('KTH');
  static PHUCTINH = new SecondaryDeity('PTI');
  static THIENDUC = new SecondaryDeity('TDU');
  static NGUYETDUC = new SecondaryDeity('NDU', true); // See Use same code as Thien Duc instead of NDU
  static HOACAI = new SecondaryDeity('HCI');
  static LONGDUC = new SecondaryDeity('LDU');
  static KIMQUY = new SecondaryDeity('KQU');
  static HONGLOAN = new SecondaryDeity('HLO');
  static THIENXICH = new SecondaryDeity('TXI', true); // See Use same code as Thien Duc
  static QUOCAN = new SecondaryDeity('QCA');
  // SAT
  static SAOSAT = new SecondaryDeity('SAOSAT');
  static KINHDUONG = new SecondaryDeity('KHD', true);
  static KIEPSAT = new SecondaryDeity('KSA', true);
  static COTHAN = new SecondaryDeity('CTH');
  static QUATU = new SecondaryDeity('QTU');
  static CACHGOC = new SecondaryDeity('CGO');
  static VONGTHAN = new SecondaryDeity('VTH');
  // static  TANGMON= new SecondaryDeity('TMO'); Same as CACHGOC
  static THIENLA = new SecondaryDeity('TLA', true);
  static THIENCAU = new SecondaryDeity('TCA');
  static CAUGIAO = new SecondaryDeity('CGI', true);
  static NGUQUY = new SecondaryDeity('NQU');
  static TUEPHA = new SecondaryDeity('TPHA'); // Ref8p101. Same as DAIHAO
  static HUYETNHAN = new SecondaryDeity('HNH');
  static DAOHOA = new SecondaryDeity('DHO', true);
  static AMDUONGLECH = new SecondaryDeity('ADL');
  static TUPHE = new SecondaryDeity('TPH');
  static VOID = new SecondaryDeity('VOID');

  constructor(name: string, hasYearComment?: boolean) {
    super(name);
    this.hasYearComment = hasYearComment;
  }

  static thienKhoiArr = [
    Branche.OX,
    Branche.RAT,
    Branche.PIG,
    Branche.PIG,
    Branche.OX,
    Branche.RAT,
    Branche.OX,
    Branche.TIGER,
    Branche.RABBIT,
    Branche.RABBIT,
  ];

  static thienVietArr = [
    Branche.GOAT,
    Branche.MONKEY,
    Branche.COCK,
    Branche.COCK,
    Branche.GOAT,
    Branche.MONKEY,
    Branche.GOAT,
    Branche.HORSE,
    Branche.SNAKE,
    Branche.SNAKE,
  ];

  static locThanArr = [
    Branche.TIGER,
    Branche.RABBIT,
    Branche.SNAKE,
    Branche.HORSE,
    Branche.SNAKE,
    Branche.HORSE,
    Branche.MONKEY,
    Branche.COCK,
    Branche.PIG,
    Branche.RAT,
  ];

  static vanTinhArr = [
    Branche.SNAKE,
    Branche.HORSE,
    Branche.MONKEY,
    Branche.COCK,
    Branche.MONKEY,
    Branche.COCK,
    Branche.PIG,
    Branche.RAT,
    Branche.TIGER,
    Branche.RABBIT,
  ];

  static hocSiArr = [
    Branche.PIG,
    Branche.HORSE,
    Branche.TIGER,
    Branche.COCK,
    Branche.TIGER,
    Branche.COCK,
    Branche.SNAKE,
    Branche.RAT,
    Branche.MONKEY,
    Branche.RABBIT,
  ];

  static kimDuArr = [
    Branche.DRAGON,
    Branche.SNAKE,
    Branche.GOAT,
    Branche.MONKEY,
    Branche.GOAT,
    Branche.MONKEY,
    Branche.DOG,
    Branche.PIG,
    Branche.OX,
    Branche.TIGER,
  ];

  static hongDiemArr = [
    Branche.HORSE,
    Branche.HORSE,
    Branche.TIGER,
    Branche.GOAT,
    Branche.DRAGON,
    Branche.DRAGON,
    Branche.DOG,
    Branche.COCK,
    Branche.RAT,
    Branche.MONKEY,
  ];

  static luuHaArr = [
    Branche.COCK,
    Branche.DOG,
    Branche.GOAT,
    Branche.MONKEY,
    Branche.SNAKE,
    Branche.HORSE,
    Branche.DRAGON,
    Branche.RABBIT,
    Branche.TIGER,
    Branche.PIG,
  ];

  static kinhDuongArrRef8 = [
    Branche.RABBIT,
    Branche.DRAGON,
    Branche.HORSE,
    Branche.GOAT,
    Branche.HORSE,
    Branche.GOAT,
    Branche.COCK,
    Branche.DOG,
    Branche.RAT,
    Branche.OX,
  ];

  static kinhDuongArr = [
    Branche.RABBIT,
    Branche.TIGER,
    Branche.HORSE,
    Branche.SNAKE,
    Branche.HORSE,
    Branche.SNAKE,
    Branche.COCK,
    Branche.MONKEY,
    Branche.RAT,
    Branche.PIG,
  ];
  static tuongArr = [Branche.RAT, Branche.COCK, Branche.HORSE, Branche.RABBIT];

  static hoaCaiArr = [Branche.DRAGON, Branche.OX, Branche.DOG, Branche.GOAT];

  static daoHoaArr = [Branche.COCK, Branche.HORSE, Branche.RABBIT, Branche.RAT];

  static kiepSatArr = [
    Branche.SNAKE,
    Branche.TIGER,
    Branche.PIG,
    Branche.MONKEY,
  ];

  static vongThanArr = [
    Branche.PIG,
    Branche.MONKEY,
    Branche.SNAKE,
    Branche.TIGER,
  ];

  static dichMaArr = [
    Branche.TIGER,
    Branche.PIG,
    Branche.MONKEY,
    Branche.SNAKE,
  ];

  static kimQuyArr = SecondaryDeity.tuongArr;

  static cothanArr = [
    Branche.TIGER,
    Branche.TIGER,
    Branche.SNAKE,
    Branche.SNAKE,
    Branche.SNAKE,
    Branche.MONKEY,
    Branche.MONKEY,
    Branche.MONKEY,
    Branche.PIG,
    Branche.PIG,
    Branche.PIG,
    Branche.TIGER,
  ];

   static thaiCucArr = [
    [Branche.HORSE, Branche.RAT],[Branche.RABBIT,Branche.COCK],
    [Branche.DRAGON,Branche.DOG,Branche.OX,Branche.GOAT],
    [Branche.TIGER],[Branche.PIG],
    [Branche.SNAKE,Branche.MONKEY]
   ];

  static quaTuArr = [
    Branche.COCK,
    Branche.COCK,
    Branche.OX,
    Branche.OX,
    Branche.OX,
    Branche.DRAGON,
    Branche.DRAGON,
    Branche.DRAGON,
    Branche.GOAT,
    Branche.GOAT,
    Branche.GOAT,
    Branche.COCK,
  ];

  static thienDucArr = [
    null,
    Trunk.GENG,
    Trunk.DING,
    null,
    Trunk.REN,
    Trunk.XIN,
    null,
    Trunk.JIA,
    Trunk.GUI,
    null,
    Trunk.BING,
    Trunk.YI,
  ];

  static amDuongLechArr = [
    Trunk.BING,
    Trunk.DING,
    Trunk.WU,
    Trunk.XIN,
    Trunk.REN,
    Trunk.GUI,
  ];

  static nguyetDucArr = [Trunk.REN, Trunk.GENG, Trunk.BING, Trunk.JIA];
  static quyNhanArr = [SecondaryDeity.THIENKHOI, SecondaryDeity.THIENVIET,SecondaryDeity.THIENDUC,SecondaryDeity.NGUYETDUC,
    SecondaryDeity.THAICUC,SecondaryDeity.QUOCAN ];

  isQuyNhan() {
    return ObjectHelper.findIndex(SecondaryDeity.quyNhanArr,this)>=0 ;
  }


  static getPhucTinh(trunk: Trunk, branche: Branche) {
    if (Trunk.JIA === trunk && Branche.TIGER === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.YI === trunk && Branche.OX === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.BING === trunk && Branche.RAT === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.YI === trunk && Branche.PIG === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.DING === trunk && Branche.COCK === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.WU === trunk && Branche.MONKEY === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.JI === trunk && Branche.GOAT === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.GENG === trunk && Branche.HORSE === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.XIN === trunk && Branche.SNAKE === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.REN === trunk && Branche.DRAGON === branche)
      {return SecondaryDeity.PHUCTINH;}
    if (Trunk.GUI === trunk && Branche.RABBIT === branche)
      {return SecondaryDeity.PHUCTINH;}
    return null;
  }

  //Ref8p129
  static isKimThan(trunk: Trunk, branche: Branche) {
    if (Trunk.YI === trunk && Branche.OX === branche) {return true;}
    if (Trunk.JI === trunk && Branche.SNAKE === branche) {return true;}
    if (Trunk.GUI === trunk && Branche.COCK === branche) {return true;}
    return false;
  }

  static hasEE(lunar: Lunar, ee: ElementNEnergy) {
    for (let i = 0; i < LunarBase.PILARS_LEN; i++) {
      if (lunar.trunkArr[i].elementNEnergy === ee) {
        return true;
      }
      if (lunar.brancheArr[i].elementNEnergy === ee) {
        return true;
      }
    }
    return false;
  }

  //Ref8p129
  static getKimThan(lunar: Lunar) {
    let found = false;
    if (SecondaryDeity.isKimThan(lunar.getdTrunk(), lunar.getdBranche())) {
      const monthBranche = lunar.getmBranche();
      if (Branche.SNAKE === monthBranche || Branche.HORSE === monthBranche) {
        found = true;
      }
    }
    if (SecondaryDeity.isKimThan(lunar.gethTrunk(), lunar.gethBranche())) {
      const dayTrunk = lunar.getdTrunk();
      if (Trunk.JIA === dayTrunk || Trunk.JI === dayTrunk) {
        found = true;
      }
    }
    if (found) {
      if (SecondaryDeity.hasEE(lunar, ElementNEnergy.FIREYANG))
        {return SecondaryDeity.KIMTHAN;}
      if (SecondaryDeity.hasEE(lunar, ElementNEnergy.FIREYIN))
        {return SecondaryDeity.KIMTHAN;}
    }
    return null;
  }

  isFavorable() {
    return this.ordinal() < SecondaryDeity.SAOSAT.ordinal();
  }

  static isTamky(trunk1: Trunk, trunk2: Trunk, trunk3: Trunk) {
    if (Trunk.JIA === trunk1 && Trunk.WU === trunk2 && Trunk.GENG === trunk3)
      {return true;}
    if (Trunk.YI === trunk1 && Trunk.BING === trunk2 && Trunk.DING === trunk3)
      {return true;}
    if (Trunk.REN === trunk1 && Trunk.GUI === trunk2 && Trunk.XIN === trunk3)
      {return true;}
    return false;
  }

  static isTamKyCombinaison(
    year: Trunk,
    month: Trunk,
    day: Trunk,
    hour: Trunk,
    currIdx: number
  ) {
    if (
      SecondaryDeity.isTamky(year, month, day) &&
      (currIdx === LunarBase.YINDEX ||
        currIdx === LunarBase.MINDEX ||
        currIdx === LunarBase.DINDEX)
    )
      {return true;}
    if (
      SecondaryDeity.isTamky(day, month, hour) &&
      (currIdx === LunarBase.HINDEX ||
        currIdx === LunarBase.MINDEX ||
        currIdx === LunarBase.DINDEX)
    )
      {return true;}
    return false;
  }

  static getTamKy(trunkArr: Trunk[], currIdx: number) {
    const year = trunkArr[LunarBase.YINDEX];
    const month = trunkArr[LunarBase.MINDEX];
    const day = trunkArr[LunarBase.DINDEX];
    const hour = trunkArr[LunarBase.YINDEX];
    if (SecondaryDeity.isTamKyCombinaison(year, month, day, hour, currIdx))
      {return SecondaryDeity.TAMKY;}
    return null;
  }

  static getKhoiCuong(dayTrunk: Trunk, dayBranche: Branche) {
    if (Trunk.REN === dayTrunk && Branche.DRAGON === dayBranche)
      {return SecondaryDeity.KHOICUONG;}
    if (Trunk.GENG === dayTrunk && Branche.DRAGON === dayBranche)
      {return SecondaryDeity.KHOICUONG;}
    if (Trunk.GENG === dayTrunk && Branche.DOG === dayBranche)
      {return SecondaryDeity.KHOICUONG;}
    if (Trunk.WU === dayTrunk && Branche.DOG === dayBranche)
      {return SecondaryDeity.KHOICUONG;}
    return null;
  }

  static getThienY(monthBranche: Branche, dayBranche: Branche) {
    if (Branche.RAT === monthBranche && Branche.PIG === dayBranche)
      {return SecondaryDeity.THIENY;}
    if (monthBranche.ordinal() - 1 === dayBranche.ordinal())
      {return SecondaryDeity.THIENY;}
    return null;
  }

  static getThienXich(season: Season, trunk: Trunk, branche: Branche) {
    let res = null;

    switch (season) {
      case Season.AUTUMN:
        if (Trunk.WU === trunk && Branche.MONKEY === branche)
          {res = SecondaryDeity.THIENXICH;}
        break;
      case Season.SPRING:
        if (Trunk.WU === trunk && Branche.TIGER === branche)
          {res = SecondaryDeity.THIENXICH;}
        break;
      case Season.SUMMER:
        if (Trunk.JIA === trunk && Branche.HORSE === branche)
          {res = SecondaryDeity.THIENXICH;}
        break;
      case Season.WINTER:
        if (Trunk.JIA === trunk && Branche.RAT === branche)
          {res = SecondaryDeity.THIENXICH;}
        break;
      default:
        break;
    }
    return res;
  }

  // Ref8p101
  static getTuePha(yearBranche: Branche, branche: Branche) {
    if ((yearBranche.ordinal() + 6) % 12 === branche.ordinal())
      {return SecondaryDeity.TUEPHA;}
    return null;
  }


  static getTuPhe(season: Season, trunk: Trunk, branche: Branche) {
    let res = null;

    switch (season) {
      case Season.AUTUMN:
        if (Trunk.JIA === trunk && Branche.TIGER === branche)
          {res = SecondaryDeity.TUPHE;}
        if (Trunk.YI === trunk && Branche.RABBIT === branche)
          {res = SecondaryDeity.TUPHE;}
        break;
      case Season.SPRING:
        if (Trunk.GENG === trunk && Branche.MONKEY === branche)
          {res = SecondaryDeity.TUPHE;}
        if (Trunk.XIN === trunk && Branche.COCK === branche)
          {res = SecondaryDeity.TUPHE;}
        break;
      case Season.SUMMER:
        if (Trunk.REN === trunk && Branche.RAT === branche)
          {res = SecondaryDeity.TUPHE;}
        if (Trunk.GUI === trunk && Branche.PIG === branche)
          {res = SecondaryDeity.TUPHE;}
        break;
      case Season.WINTER:
        if (Trunk.BING === trunk && Branche.RAT === branche)
          {res = SecondaryDeity.TUPHE;}
        if (Trunk.DING === trunk && Branche.SNAKE === branche)
          {res = SecondaryDeity.TUPHE;}
        break;
      default:
        break;
    }
    return res;
  }

  static getNguyetDuc(monthBranche: Branche, trunk: Trunk) {
    if (SecondaryDeity.nguyetDucArr[monthBranche.ordinal() % 4] === trunk)
      {return SecondaryDeity.NGUYETDUC;}
    return null;
  }

  static getThienDuc(monthBranche: Branche, trunk: Trunk, branche: Branche) {
    if (monthBranche === Branche.RAT && branche === Branche.SNAKE)
      {return SecondaryDeity.THIENDUC;}
    if (monthBranche === Branche.RABBIT && branche === Branche.MONKEY)
      {return SecondaryDeity.THIENDUC;}
    if (monthBranche === Branche.HORSE && branche === Branche.PIG)
      {return SecondaryDeity.THIENDUC;}
    if (monthBranche === Branche.COCK && branche === Branche.TIGER)
      {return SecondaryDeity.THIENDUC;}
    if (SecondaryDeity.thienDucArr[monthBranche.ordinal()] === trunk)
      {return SecondaryDeity.THIENDUC;}
    return null;
  }

  static getHuyetNhan(yearBranche: Branche, branche: Branche) {
    if ((yearBranche.ordinal() + branche.ordinal()) % 12 === 10)
      {return SecondaryDeity.HUYETNHAN;}
    if (yearBranche === Branche.PIG && branche === Branche.PIG)
      {return SecondaryDeity.HUYETNHAN;}
    return null;
  }

  static getNguQuy(yearBranche: Branche, branche: Branche) {
    if ((yearBranche.ordinal() + 4) % 12 === branche.ordinal())
      {return SecondaryDeity.NGUQUY;}
    return null;
  }

  static getCauGiao(yearBranche: Branche, branche: Branche) {
    if ((yearBranche.ordinal() + 3) % 12 === branche.ordinal())
      {return SecondaryDeity.CAUGIAO;}
    return null;
  }

  static getThienCau(yearBranche: Branche, branche: Branche) {
    if ((yearBranche.ordinal() + 10) % 12 === branche.ordinal())
      {return SecondaryDeity.THIENCAU;}
    return null;
  }

  static getThienLa(baseBranche: Branche, branche: Branche) {
    if (baseBranche === Branche.DRAGON && branche === Branche.SNAKE)
      {return SecondaryDeity.THIENLA;}
    if (branche === Branche.DRAGON && baseBranche === Branche.SNAKE)
      {return SecondaryDeity.THIENLA;}
    if (baseBranche === Branche.PIG && branche === Branche.DOG)
      {return SecondaryDeity.THIENLA;}
    if (branche === Branche.PIG && baseBranche === Branche.DOG)
      {return SecondaryDeity.THIENLA;}
    return null;
  }

  static getHongLoan(yearBranche: Branche, branche: Branche) {
    const sum = yearBranche.ordinal() + branche.ordinal();
    if (sum === 3 || sum === 15) {return SecondaryDeity.HONGLOAN;}
    return null;
  }

  static getKimQuy(yearBranche: Branche, branche: Branche) {
    if (SecondaryDeity.kimQuyArr[yearBranche.ordinal() % 4] === branche)
      {return SecondaryDeity.KIMQUY;}
    return null;
  }

  static getLongDuc(yearBranche: Branche, branche: Branche) {
    if ((yearBranche.ordinal() + 7) % 12 === branche.ordinal())
      {return SecondaryDeity.LONGDUC;}
    return null;
  }

  static getVongThan(dayBranche: Branche, branche: Branche) {
    if (SecondaryDeity.vongThanArr[dayBranche.ordinal() % 4] === branche)
      {return SecondaryDeity.VONGTHAN;}
    return null;
  }

  static getDichMa(dayYearBranche: Branche, branche: Branche) {
    if (SecondaryDeity.dichMaArr[dayYearBranche.ordinal() % 4] === branche)
      {return SecondaryDeity.DICHMA;}
    return null;
  }

  static getAmDuongLech(trunk: Trunk, branche: Branche) {
    if (SecondaryDeity.amDuongLechArr[branche.ordinal() % 6] === trunk)
      {return SecondaryDeity.AMDUONGLECH;}
    return null;
  }

  static getCachGoc(dayBranche: Branche, branche: Branche) {
    if ((dayBranche.ordinal() + 2) % 12 === branche.ordinal())
      {return SecondaryDeity.CACHGOC;}
    return null;
  }

  static getQuocAn(baseTrunk: Trunk, branche: Branche) {
    const baseBranche = SecondaryDeity.locThanArr[baseTrunk.ordinal()];
    if ((baseBranche.ordinal() + 8) % 12 === branche.ordinal())
      {return SecondaryDeity.QUOCAN;}
    return null;
  }

  static getQuaTu(dayBranche: Branche, branche: Branche) {
    if (SecondaryDeity.quaTuArr[dayBranche.ordinal()] === branche)
      {return SecondaryDeity.QUATU;}
    return null;
  }

  static getCoThan(dayBranche: Branche, branche: Branche) {
    if (SecondaryDeity.cothanArr[dayBranche.ordinal()] === branche)
      {return SecondaryDeity.COTHAN;}
    return null;
  }

  static getKiepSat(dayBranche: Branche, branche: Branche) {
    if (SecondaryDeity.kiepSatArr[dayBranche.ordinal() % 4] === branche)
      {return SecondaryDeity.KIEPSAT;}
    return null;
  }

  static getTuong(dayYearBranche: Branche, branche: Branche) {
    if (SecondaryDeity.tuongArr[dayYearBranche.ordinal() % 4] === branche)
      {return SecondaryDeity.TUONG;}
    return null;
  }

  static getHoaCai(dayBranche: Branche, branche: Branche) {
    if (SecondaryDeity.hoaCaiArr[dayBranche.ordinal() % 4] === branche)
      {return SecondaryDeity.HOACAI;}
    return null;
  }

  static getDaoHoa(dayYearBranche: Branche, branche: Branche) {
    if (SecondaryDeity.daoHoaArr[dayYearBranche.ordinal() % 4] === branche)
      {return SecondaryDeity.DAOHOA;}
    return null;
  }

  static getKinhDuong(dayTrunk: Trunk, branche: Branche) {
    if (SecondaryDeity.kinhDuongArr[dayTrunk.ordinal()] === branche)
      {return SecondaryDeity.KINHDUONG;}
    if (SecondaryDeity.kinhDuongArrRef8[dayTrunk.ordinal()] === branche)
      {return SecondaryDeity.KINHDUONG;}
    return null;
  }

  static getLuuHa(dayTrunk: Trunk, branche: Branche) {
    if (SecondaryDeity.luuHaArr[dayTrunk.ordinal()] === branche)
      {return SecondaryDeity.LUUHA;}
    return null;
  }

  static getHongDiem(dayTrunk: Trunk, branche: Branche) {
    let res = SecondaryDeity.hongDiemArr[dayTrunk.ordinal()] === branche;
    if (!res && dayTrunk.ordinal() <= 1) {
      res = branche === Branche.MONKEY;
    }
    if (res) {return SecondaryDeity.HONGDIEM;}
    return null;
  }

  static getThienKhoi(yearTrunk: Trunk, dayTrunk: Trunk, branche: Branche) {
    if (
      SecondaryDeity.thienKhoiArr[yearTrunk.ordinal()] === branche ||
      SecondaryDeity.thienKhoiArr[dayTrunk.ordinal()] === branche
    )
      {return SecondaryDeity.THIENKHOI;}
    return null;
  }

  static getThienViet(yearTrunk: Trunk, dayTrunk: Trunk, branche: Branche) {
    if (
      SecondaryDeity.thienVietArr[yearTrunk.ordinal()] === branche ||
      SecondaryDeity.thienVietArr[dayTrunk.ordinal()] === branche
    )
      //{return SecondaryDeity.THIENVIET;}
      {return SecondaryDeity.THIENKHOI;}
    return null;
  }

  static getThaiCuc(dayTrunk: Trunk, branche: Branche) {
    const fitArray = SecondaryDeity.thaiCucArr[Math.trunc(dayTrunk.ordinal() / 2)];
    for (let i = 0; i < fitArray.length; i++) {
      if (fitArray[i] === branche) {return SecondaryDeity.THAICUC;}
    }
    return null;
  }

  static getLocThan(dayTrunk: Trunk, branche: Branche) {
    if (SecondaryDeity.locThanArr[dayTrunk.ordinal()] === branche)
      {return SecondaryDeity.LOCTHAN;}
    return null;
  }

  static getVanTinh(yearTrunk: Trunk, dayTrunk: Trunk, branche: Branche) {
    if (
      //??SecondaryDeity.vanTinhArr[yearTrunk.ordinal()] === branche ||
      SecondaryDeity.vanTinhArr[dayTrunk.ordinal()] === branche
    )
      {return SecondaryDeity.VANTINH;}
    return null;
  }

  static getHocSi(yearTrunk: Trunk, dayTrunk: Trunk, branche: Branche) {
    if (
      SecondaryDeity.hocSiArr[yearTrunk.ordinal()] === branche ||
      SecondaryDeity.hocSiArr[dayTrunk.ordinal()] === branche
    )
      {return SecondaryDeity.HOCSI;}
    return null;
  }

  static getThienLoc(dayBranche: Branche, branche: Branche) {
    if ((dayBranche.ordinal() + 4) % 12 === branche.ordinal())
      {return SecondaryDeity.THIENLOC;}
    return null;
  }

  static getKimDu(dayTrunk: Trunk, branche: Branche) {
    if (SecondaryDeity.kimDuArr[dayTrunk.ordinal()] === branche)
      {return SecondaryDeity.KIMDU;}
    return null;
  }

  static voidJiaBranche = [
    Branche.RAT
  ];

  // See tableau at Ref9p322
  static getFirstVoidBranche(trunk: Trunk, branche: Branche) : Branche {
    let firstVoidBranche = null ;
    let currResBranche = Branche.DOG;
    let currBranche = Branche.RAT;
    const trunkArr = Trunk.getValues();

    for (let index = 0; index < 6; index++) {
      for (let trunkIdx = 0; trunkIdx < trunkArr.length; trunkIdx++) {
        let currTrunk = trunkArr[trunkIdx];
        if ( currTrunk===trunk && currBranche==branche ) {
          // Found a void trunk/branch combinaison. return the first void branche to be found
          //
          firstVoidBranche = currResBranche;
          break ;
        }
        currBranche = currBranche.getEnumNextNElement(1);
      }
      if ( firstVoidBranche!==null ) {
        break ;
      }
      currResBranche = currResBranche.getEnumNextNElement(10);
    }
    return firstVoidBranche;
  }

  static evalBrancheSecDeity (trunkArr: Trunk[], brancheArr: Branche[], branche:Branche, currIdx: number) {
    const deitySet: SecondaryDeity[]=[];
    const yearTrunk = trunkArr[LunarBase.YINDEX];
    const dayTrunk = trunkArr[LunarBase.DINDEX];
    const yearBranche = brancheArr[LunarBase.YINDEX];
    const dayBranche = brancheArr[LunarBase.DINDEX];
    const monthBranche = brancheArr[LunarBase.MINDEX];
    const season = monthBranche.season;

    const addIfNonNull = ObjectHelper.pushIfNotExist;
    addIfNonNull(deitySet,SecondaryDeity.getThienKhoi(yearTrunk, dayTrunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getThienViet(yearTrunk, dayTrunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getThaiCuc(dayTrunk, branche));


    addIfNonNull(deitySet,SecondaryDeity.getQuocAn(yearTrunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getQuocAn(dayTrunk, branche));
    const secDeity = SecondaryDeity.getLocThan(dayTrunk, branche);
    if ( secDeity!== null ) {
      addIfNonNull(deitySet,secDeity);
    }
    addIfNonNull(deitySet,SecondaryDeity.getVanTinh(yearTrunk, dayTrunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getHocSi(yearTrunk, dayTrunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getThienLoc(dayBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getKimDu(dayTrunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getHongDiem(dayTrunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getLuuHa(dayTrunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getKinhDuong( dayTrunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getTuong(dayBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getTuong(yearBranche, branche));

    addIfNonNull(deitySet,SecondaryDeity.getHoaCai(dayBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getHoaCai(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getDaoHoa(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getKiepSat(dayBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getCoThan(dayBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getQuaTu(dayBranche, branche));

    addIfNonNull(deitySet,SecondaryDeity.getCachGoc(dayBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getVongThan(dayBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getDichMa(dayBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getDichMa(yearBranche, branche));

    addIfNonNull(deitySet,SecondaryDeity.getLongDuc(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getKimQuy(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getHongLoan(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getThienCau(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getCauGiao(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getNguQuy(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getTuePha(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getThienLa(yearBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getThienLa(dayBranche, branche));

    addIfNonNull(deitySet,SecondaryDeity.getHuyetNhan(yearBranche, branche));
    const trunk = trunkArr[currIdx];
    addIfNonNull(deitySet,SecondaryDeity.getThienDuc(monthBranche, trunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getNguyetDuc(monthBranche, trunk));
    addIfNonNull(deitySet,SecondaryDeity.getThienXich( season,trunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getTuPhe( season,trunk, branche));
    addIfNonNull(deitySet,SecondaryDeity.getAmDuongLech(trunk,branche));
    addIfNonNull(deitySet,SecondaryDeity.getThienY(monthBranche, branche));
    addIfNonNull(deitySet,SecondaryDeity.getTamKy(trunkArr, currIdx));

    return deitySet;
  }

  static evalSecondaryDeity(lunar: Lunar, currLunar: Lunar):SecondaryDeity[][] {
    let secDeityPilars=[];
    const brancheArr = currLunar.brancheArr;
    const trunkArr = currLunar.trunkArr;
    const yearTrunk = lunar.getyTrunk();
    const yearBranche = lunar.getyBranche();
    const dayTrunk = lunar.getdTrunk();
    const dayBranche = lunar.getdBranche();
    const addIfNonNull = ObjectHelper.pushIfNotExist;

    for (let i = 0; i < LunarBase.PILARS_LEN; i++) {
        const branche = brancheArr[i];

       const deitySet = SecondaryDeity.evalBrancheSecDeity(trunkArr,brancheArr,branche,i);

       if ( i===LunarBase.DINDEX ) {
        addIfNonNull(deitySet,SecondaryDeity.getPhucTinh(dayTrunk, dayBranche));
        addIfNonNull(deitySet,SecondaryDeity.getKimThan(currLunar));
      }
      secDeityPilars[i]=deitySet;
    }
    SecondaryDeity.addVoidSecDeity(lunar,secDeityPilars,LunarBase.DINDEX,trunkArr,brancheArr,SecondaryDeity.getFirstVoidBranche(dayTrunk,dayBranche));
    SecondaryDeity.addVoidSecDeity(lunar,secDeityPilars,LunarBase.YINDEX,trunkArr,brancheArr,SecondaryDeity.getFirstVoidBranche(yearTrunk,yearBranche));

    return secDeityPilars;
}

static addVoidSecDeity(lunar: Lunar, secDeityPilars: any[], fromPilarIdx: number,tArr: Trunk[], bArr: Branche[],  fstVoidBranche: Branche) {
  if(fstVoidBranche!==null) {
    const oVoidBranche=fstVoidBranche.getEnumNextNElement(1);
    for (let i = 0; i < LunarBase.PILARS_LEN; i++) {
      if ( lunar.pilarsAttr.combList.existCombRelation(i) || lunar.pilarsAttr.combList.existClashRelation(i) ) {
        //No void if clash or combined
        //Ref7a_p35
        continue;
      }
      if ( i!== fromPilarIdx ) {
          const iBr = bArr[i];
          if ( iBr===fstVoidBranche || iBr===oVoidBranche ) {
            ObjectHelper.pushIfNotExist(secDeityPilars[i],SecondaryDeity.VOID);
          }
      }
    }
  }
}

static evalLocThanTrunk(lunar: Lunar, currLunar: Lunar): Trunk[] {

  const brancheArr = currLunar.brancheArr;
  const trunkArr = currLunar.trunkArr;
  let secDeity ;
  const dayTrunk = lunar.getdTrunk();
  let locThanTrunk : Trunk[] = [];
  const addIfNonNull = ObjectHelper.pushIfNotExist;

  for (let i = 0; i < LunarBase.PILARS_LEN; i++) {
      const branche = brancheArr[i];
      secDeity = SecondaryDeity.getLocThan(dayTrunk, branche);
      if ( secDeity!== null ) {
        addIfNonNull(locThanTrunk,trunkArr[i]) ;
      }
  }
  return locThanTrunk;
}


override getClassName() {return 'SecDe';}
}
