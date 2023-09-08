/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */


import { BrancheHelper } from '../../helper/brancheHelper';
import { ObjectHelper } from '../../helper/objectHelper';
import { StringHelper } from '../../helper/stringHelper';
import { TrunkHelper } from '../../helper/trunkHelper';
import { TuViHelper } from '../../helper/tuviHelper';
import { TuViStarHelper } from '../../helper/tuviStarHelper';
import { Branche } from '../bazi/branche';
import { Lunar } from '../bazi/lunar';
import { Trunk } from '../bazi/trunk';
import { MyCalendar } from '../date/mycalendar';
import { Element } from '../feng-shui/element';
import { TuViPalace } from './tuviPalace';
import { TuViRing } from './tuviRing';
import { TuViStar } from './tuviStar';
import { Temporal } from "temporal-polyfill";

export class TuViStarMap {
  static SecPerStartBranche = [
    // RAT
    Branche.DOG,
    // OX
    Branche.GOAT,
    // TIGER
    Branche.DRAGON,
    // RABBIT
    Branche.OX,
    // DRAGON
    Branche.DOG,
    // SNAKE
    Branche.GOAT,
    // HORSE
    Branche.DRAGON,
    // GOAT
    Branche.OX,
    // MONKEY
    Branche.DOG,
    // COCK
    Branche.GOAT,
    // DOG
    Branche.DRAGON,
    // PIG
    Branche.OX,
  ];

  lunar: Lunar = null;
  // To be rename as palaceMap
  // Index is Branche ordinal
  branchePalaces: TuViPalace[]= null;
  tuViMenhBranche: Branche= null;
  tuViThanBranche: Branche= null;
  isDuongNamAmNu: boolean= null;
  tuViCucElement: Element= null;
  tuViMenhPalace: TuViPalace= null;
  isThaiDuongFavorable: boolean= null;
  isThaiAmFavorable: boolean= null;

  constructor(lunar: Lunar) {
    this.lunar = lunar;
    this.initBase();
    this.initTuViRing();
    this.initStars();
  }

  getInfo() {
    let res = '' ;
    res += 'Menh: '+ this.tuViMenhBranche.getName() +'- Than: '+ this.tuViThanBranche.getName() + StringHelper.NL;
    res += 'Menh Palace: '+ this.tuViMenhPalace.getName()  + StringHelper.NL;
    res += 'isThaiDuongFavorable: '+ this.isThaiDuongFavorable  +  ' isThaiDuongFavorable: '+
    this.isThaiAmFavorable+ StringHelper.NL;
    res += ' Palaces ' + StringHelper.NL;
    this.branchePalaces.forEach(palace => {
      res += ' Palace: '+ palace.getName()  + StringHelper.NL;
    });
    return res ;
  }

  initAllTuViStar() {
    const tuViStars = TuViStar.getValues();
    tuViStars.forEach((tuviStar) => {
      tuviStar.diaStatus = TuViStar.DIANOTINIT;
      tuviStar.force = 0.0;
    });
  }

  initBase() {
    this.branchePalaces = [];
    this.initAllTuViStar();
    const birthDate = this.lunar.birthDate;
    const cYear = birthDate.getChineseYear();
    const cYearTrunk = TrunkHelper.getYearTrunk(cYear);
    const cYearBranche = BrancheHelper.getYearBranche(cYear);
    const cHBranche = BrancheHelper.getHourBranche(birthDate.getHour());
    const cMonth = birthDate.getChineseMonth();
    this.tuViMenhBranche = TuViHelper.getTuViMenh(cMonth, cHBranche);
    this.tuViThanBranche = TuViHelper.getTuViThan(cMonth, cHBranche);
    this.isDuongNamAmNu =
      this.lunar.isMan === cYearBranche.getEnergy().isYang();
    this.tuViCucElement = TuViHelper.getTuViCucElement(
      this.tuViMenhBranche,
      cYearTrunk
    );
  }

  getFirstBigPeriod() {
    let res = 0;
    switch (this.tuViCucElement) {
      case Element.EARTH:
        res = 5;
        break;
      case Element.FIRE:
        res = 6;
        break;
      case Element.METAL:
        res = 4;
        break;
      case Element.WATER:
        res = 2;
        break;
      case Element.WOOD:
        res = 3;
        break;
      default:
        break;
    }
    return res;
  }

  getBranchePalace(branche: Branche) : TuViPalace{
    return this.branchePalaces[branche.ordinal()];
  }

  getPalace(palaceNb: number): TuViPalace {
    return this.branchePalaces[palaceNb];
  }

  getRingPalace( ring: TuViRing): TuViPalace {
    let res = null;
    const branches = Branche.getValues();
    for (let index = 0; index < branches.length; index++) {
      const branche = branches[index];
        const palace = this.getBranchePalace(branche);
        if (palace !== null && palace.ringType === ring) {
            res = palace;
            break;
        }
    }
    if (res == null) res = this.getBranchePalace(this.tuViMenhBranche);
    return res;
}

  getStarBranche(star: TuViStar) {
    let branche = null;
    const palace = star.getPalace();
    if (!ObjectHelper.isNaN(palace)) {
      branche = palace.branche;
    }
    return branche;
  }

  initTuViRing() {
    let currBranche = this.tuViMenhBranche;
    let tuviRing = TuViRing.Menh;
    let incBase = 10;
    let bigPeriodFromYear = this.getFirstBigPeriod();
    let starPalace = null;
    this.tuViMenhPalace = null;
    // Init Palace with Big Period
    let prev = null;
    let firstPalace = null;
    for (let i = 0; i < 12; i++) {
      starPalace = new TuViPalace(currBranche, prev);
      if (i === 0) {
        firstPalace = starPalace;
        this.tuViMenhPalace = starPalace;
      }
      prev = starPalace;
      starPalace.ringType = tuviRing;
      starPalace.isThan = this.tuViThanBranche === currBranche;
      this.branchePalaces[currBranche.ordinal()] = starPalace;
      currBranche = currBranche.getEnumNextNElement(1);
      tuviRing = tuviRing.getEnumNextNElement(1);
    }
    firstPalace.prev = prev;

    incBase = this.getRingDirection();
    starPalace = firstPalace;
    for (let i = 0; i < 12; i++) {
      starPalace.bigPeriodFromYear = bigPeriodFromYear;
      starPalace.bigPeriodToYear = bigPeriodFromYear + 9;
      bigPeriodFromYear += 10;
      starPalace = starPalace.getNextPalace(incBase);
    }

    // Init secondary Period branche
    let yBranche = this.lunar.getyBranche();
    currBranche = TuViStarMap.SecPerStartBranche[yBranche.ordinal()];
    if (this.lunar.isMan) {
      incBase = 1;
    } else {
      incBase = -1;
    }
    for (let i = 0; i < 12; i++) {
      starPalace = this.getBranchePalace(currBranche);
      starPalace.secondaryPeriodBranche = yBranche;
      currBranche = currBranche.getEnumNextNElement(incBase);
      yBranche = yBranche.getEnumNextNElement(1);
    }
  }

  addNewStar(branche: Branche, star: TuViStar) {
    if (star == null) {return;}
    const starPalace = this.branchePalaces[branche.ordinal()];
    starPalace.addStar(star);
    star.diaStatus = TuViStarHelper.getXDiaStatus(star, branche);
    star.setPalace(starPalace);
  }

  // Ref14p97 add 6 stars part of TuVi Star ring
  genTuViStarRing(tuViStarBranche: Branche) {
    let currBranche = tuViStarBranche;
    this.addNewStar(currBranche, TuViStar.TUVI);
    currBranche = currBranche.getEnumNextNElement(-1);
    this.addNewStar(currBranche, TuViStar.THIENCO);
    currBranche = currBranche.getEnumNextNElement(-2);
    this.addNewStar(currBranche, TuViStar.THAIDUONG);
    currBranche = currBranche.getEnumNextNElement(-1);
    this.addNewStar(currBranche, TuViStar.VUKHUC);
    currBranche = currBranche.getEnumNextNElement(-1);
    this.addNewStar(currBranche, TuViStar.THIENDONG);
    currBranche = currBranche.getEnumNextNElement(-3);
    this.addNewStar(currBranche, TuViStar.LIEMTRINH);
  }

  // Ref14p97 add 8 stars part of ThienPhu Star ring
  // Ref20p28
  genThienPhuStarRing(tuViStarBranche: Branche) {
    const idx = tuViStarBranche.ordinal() - Branche.TIGER.ordinal();
    let currBranche = Branche.TIGER.getEnumNextNElement(-idx);
    this.addNewStar(currBranche, TuViStar.THIENPHUR);
    currBranche = currBranche.getEnumNextNElement(+1);
    this.addNewStar(currBranche, TuViStar.THAIAM);
    currBranche = currBranche.getEnumNextNElement(+1);
    this.addNewStar(currBranche, TuViStar.THAMLANG);
    currBranche = currBranche.getEnumNextNElement(+1);
    this.addNewStar(currBranche, TuViStar.CUMON);
    currBranche = currBranche.getEnumNextNElement(+1);
    this.addNewStar(currBranche, TuViStar.THIENTUONG);
    currBranche = currBranche.getEnumNextNElement(+1);
    this.addNewStar(currBranche, TuViStar.THIENLUONG);
    currBranche = currBranche.getEnumNextNElement(+1);
    this.addNewStar(currBranche, TuViStar.THATSAT);
    currBranche = currBranche.getEnumNextNElement(+4);
    this.addNewStar(currBranche, TuViStar.PHAQUAN);
  }

  // Ref14p99 add 12 stars part of TrangSinh Star ring
  genTrangSinhStarRing() {
    let currBranche = TuViStarHelper.getTrangSinhBranche(this.tuViCucElement);
    let currStar = TuViStar.TRANGSINH;
    const inc = this.getRingDirection();
    for (let i = 0; i < 12; i++) {
      this.addNewStar(currBranche, currStar);
      currBranche = currBranche.getEnumNextNElement(inc);
      currStar = currStar.getEnumNextNElement(1);
    }
  }

  // Ref14p100
  // Ref20p30
  genLucSatStar(locTonStarBranche: Branche) {
    this.addNewStar(
      locTonStarBranche.getEnumNextNElement(+1),
      TuViStar.KINHDUONG
    );
    this.addNewStar(locTonStarBranche.getEnumNextNElement(-1), TuViStar.DALA);
    this.addNewStar(locTonStarBranche.getEnumNextNElement(+8), TuViStar.QUOCAN);
    this.addNewStar(
      locTonStarBranche.getEnumNextNElement(-7),
      TuViStar.DUONGPHU
    );
  }

  // Ref14p100
  // Ref20p35
  genLocTonStarRing(locTonStarBranche: Branche) {
    let currBranche = locTonStarBranche;

    this.addNewStar(currBranche, TuViStar.LOCTON);
    const inc = this.getRingDirection();
    let currStar = TuViStar.BACSI;
    for (let i = 0; i < 12; i++) {
      this.addNewStar(currBranche, currStar);
      currBranche = currBranche.getEnumNextNElement(inc);
      currStar = currStar.getEnumNextNElement(1);
    }
  }

  // Ref14p100
  // Ref14p103
  // Ref20p35
  genStarFromYear(
    yearBranche: Branche,
    tuViMenhBranche: Branche,
    tuviThanBranche: Branche,
    chineseMonth: number,
    hBranche: Branche
  ) {
    // Ref14p100
    let currBranche = yearBranche;
    this.addNewStar(currBranche.getEnumNextNElement(1), TuViStar.THIENKHONG);

    // Ref20p35
    let currStar = TuViStar.THAITUE;
    // Ref13p80 (instead of Ref14p111)
    // Ref20p36
    this.addNewStar(
      currBranche.getEnumNextNElement(-(chineseMonth - 1) + hBranche.ordinal()),
      TuViStar.DAUQUAN
    );

    for (let i = 0; i < 12; i++) {
      this.addNewStar(currBranche, currStar);
      currBranche = currBranche.getEnumNextNElement(1);
      currStar = currStar.getEnumNextNElement(1);
    }
    // Ref14p103
    let inc = yearBranche.ordinal();
    this.addNewStar(Branche.DRAGON.getEnumNextNElement(inc), TuViStar.LONGTRI);
    this.addNewStar(Branche.DOG.getEnumNextNElement(-inc), TuViStar.PHUONGCAC);
    // Ref14p106
    this.addNewStar(Branche.DOG.getEnumNextNElement(-inc), TuViStar.GIAITHAN);
    this.addNewStar(Branche.COCK.getEnumNextNElement(inc), TuViStar.THIENDUC);
    this.addNewStar(Branche.SNAKE.getEnumNextNElement(inc), TuViStar.NGUYETDUC);
    // Ref14p108
    this.addNewStar(Branche.HORSE.getEnumNextNElement(inc), TuViStar.THIENHU);
    this.addNewStar(
      Branche.HORSE.getEnumNextNElement(-inc),
      TuViStar.THIENKHOC
    );
    // Ref14p108, Ref20p36
    this.addNewStar(
      tuViMenhBranche.getEnumNextNElement(inc),
      TuViStar.THIENTAI
    );
    this.addNewStar(
      tuviThanBranche.getEnumNextNElement(inc),
      TuViStar.THIENTHO
    );
    // Ref13p80, Ref20p36: Palace NoBoc
    this.addNewStar(
      tuViMenhBranche.getEnumNextNElement(5),
      TuViStar.THIENTHUONG
    );
    // Ref13p80, Ref20p36: Palace TatBenh
    this.addNewStar(tuViMenhBranche.getEnumNextNElement(7), TuViStar.THIENSU);
    // Ref13p80
    inc = chineseMonth - 1;
    this.addNewStar(
      Branche.DRAGON.getEnumNextNElement(inc),
      TuViStar.THIENXUONG
    );
    this.addNewStar(Branche.DRAGON.getEnumNextNElement(inc), TuViStar.THIENKHO);
  }

  // Ref14p101, 102...
  // Ref14p109
  // Ref20p29
  genVanKhucVanXuongStar(hourBranche: Branche, birthDay: number) {
    const idx = hourBranche.ordinal();
    let currBranche = Branche.DRAGON.getEnumNextNElement(idx);
    this.addNewStar(currBranche, TuViStar.VANKHUC);
    this.addNewStar(
      currBranche.getEnumNextNElement(-birthDay + 1),
      TuViStar.THIENQUY
    );
    this.addNewStar(Branche.HORSE.getEnumNextNElement(idx), TuViStar.THAIPHU);
    this.addNewStar(Branche.TIGER.getEnumNextNElement(idx), TuViStar.PHONGCAO);
    currBranche = Branche.DOG.getEnumNextNElement(-idx);
    this.addNewStar(currBranche, TuViStar.VANXUONG);
    this.addNewStar(
      currBranche.getEnumNextNElement(birthDay - 1),
      TuViStar.ANQUANG
    );
    this.addNewStar(Branche.PIG.getEnumNextNElement(idx), TuViStar.DIAKIEP);
    this.addNewStar(Branche.PIG.getEnumNextNElement(-idx), TuViStar.DIAKHONG);
  }

  // Ref14p102, 103...
  // Ref20p29
  genOtherStarFromMonthNDay(chineseMonth: number, start1BirthDate: number) {
    const inc = chineseMonth - 1;
    let currBranche = Branche.DRAGON.getEnumNextNElement(inc);
    this.addNewStar(currBranche, TuViStar.TAPHU);
    this.addNewStar(
      currBranche.getEnumNextNElement(start1BirthDate - 1),
      TuViStar.TAMTHAI
    );

    currBranche = Branche.DOG.getEnumNextNElement(-inc);
    this.addNewStar(currBranche, TuViStar.HUUBAT);
    this.addNewStar(
      currBranche.getEnumNextNElement(-(start1BirthDate - 1)),
      TuViStar.BATTOA
    );
    // Ref14p108..108
    this.addNewStar(
      Branche.MONKEY.getEnumNextNElement(inc),
      TuViStar.THIENGIAI
    );
    this.addNewStar(Branche.COCK.getEnumNextNElement(inc), TuViStar.THIENHINH);
    this.addNewStar(Branche.OX.getEnumNextNElement(inc), TuViStar.THIENY);
    this.addNewStar(Branche.OX.getEnumNextNElement(inc), TuViStar.THIENRIEU);
    // Ref16
    this.addNewStar(Branche.GOAT.getEnumNextNElement(inc), TuViStar.DIAGIAI);
  }

  // Ref14p109
  genStarFromYearBrancheNOtherStar(yBranche: Branche, chineseMonth: number) {
    const idx = yBranche.ordinal();
    let branche = Branche.RABBIT.getEnumNextNElement(-idx);
    this.addNewStar(branche, TuViStar.HONGLOAN);
    this.addNewStar(branche.getEnumNextNElement(6), TuViStar.THIENHY);
    const brancheArray = TuViHelper.StarByBranche[idx];
    this.addNewStar(brancheArray[0], TuViStar.THIENMA);
    this.addNewStar(brancheArray[1], TuViStar.DAOHOA);
    branche = brancheArray[2];
    this.addNewStar(branche, TuViStar.HOACAI);
    this.addNewStar(branche.getEnumNextNElement(1), TuViStar.KIEPSAT);
    branche = brancheArray[3];
    this.addNewStar(branche, TuViStar.PHATOAI);

    this.addNewStar(brancheArray[4], TuViStar.COTHAN);
    this.addNewStar(brancheArray[5], TuViStar.QUATU);
  }

  // Ref14p113
  // Ref20p34
  genHoaTinhLinhTinh(yBranche: Branche, hBranche: Branche) {
    let brancheHoaTinh = null;
    let brancheLinhTinh = null;
    let inc = hBranche.ordinal();
    if (!this.isDuongNamAmNu) {
      inc = -inc;
    }
    switch (yBranche) {
      case Branche.TIGER:
      case Branche.HORSE:
      case Branche.DOG:
        brancheHoaTinh = Branche.OX;
        brancheLinhTinh = Branche.RABBIT;

        break;
      case Branche.MONKEY:
      case Branche.RAT:
      case Branche.DRAGON:
        brancheHoaTinh = Branche.TIGER;
        brancheLinhTinh = Branche.DOG;
        break;
      case Branche.SNAKE:
      case Branche.COCK:
      case Branche.OX:
        brancheHoaTinh = Branche.RABBIT;
        brancheLinhTinh = Branche.DOG;
        break;
      case Branche.PIG:
      case Branche.RABBIT:
      case Branche.GOAT:
        brancheHoaTinh = Branche.COCK;
        brancheLinhTinh = Branche.DOG;
        break;
    }
    this.addNewStar(brancheHoaTinh.getEnumNextNElement(inc), TuViStar.HOATINH);
    this.addNewStar(
      brancheLinhTinh.getEnumNextNElement(-inc),
      TuViStar.LINHTINH
    );
  }
  // Ref14p115, 115
  // Ref20p32
  // Ref14p103.104. + Ref13p79
  genOther(yTrunk: Trunk, yBranche: Branche) {
    const inc = Trunk.GUI.ordinal() - yTrunk.ordinal() + 1;
    this.addNewStar(yBranche.getEnumNextNElement(inc), TuViStar.TUANKHONG);
    this.addNewStar(yBranche.getEnumNextNElement(inc + 1), TuViStar.TUANKHONG);
    this.addNewStar(Branche.DRAGON, TuViStar.THIENLA);
    this.addNewStar(Branche.DOG, TuViStar.DIAVONG);

    // Ref14p103.104. + Ref13p79
    const idx = yTrunk.ordinal();

    // Ref14p105..114
    const brancheArray = TuViHelper.StarByTrunk[idx];
    this.addNewStar(brancheArray[0], TuViStar.THIENKHOI);
    this.addNewStar(brancheArray[1], TuViStar.THIENVIET);
    this.addNewStar(brancheArray[2], TuViStar.VANTINH);
    this.addNewStar(brancheArray[3], TuViStar.THIENPHUC);
    this.addNewStar(brancheArray[4], TuViStar.THIENQUAN);
    this.addNewStar(brancheArray[5], TuViStar.TRIETKHONG);
    // Duplicate it for display
    this.addNewStar(
      brancheArray[5].getEnumNextNElement(1),
      TuViStar.TRIETKHONG
    );
    this.addNewStar(brancheArray[6], TuViStar.LUUHA);
    this.addNewStar(brancheArray[7], TuViStar.THIENTRU);

    const trunkCheckStarGroup = TuViHelper.TuViStarHoaXPos[idx];
    let currHoaXStar = TuViStar.HOALOC;
    trunkCheckStarGroup.forEach(tuViStar => {
      const branche = this.getStarBranche(tuViStar);
      if (branche != null) {
        this.addNewStar(branche, currHoaXStar);
      }
      currHoaXStar = currHoaXStar.getEnumNextNElement(1);
    });
  }

  initStars() {
    // Get star flying
    const birthDate = this.lunar.birthDate;
    const cdate = birthDate.getChineseDay();
    const cMonth = birthDate.getChineseMonth();
    let branche = TuViHelper.getTuViBranche(this.tuViCucElement, cdate);
    this.genTuViStarRing(branche);
    this.genThienPhuStarRing(branche);
    this.genTrangSinhStarRing();
    const cYear = birthDate.getChineseYear();
    const cYearTrunk = TrunkHelper.getYearTrunk(cYear);
    const cYearBranche = this.getBirthChineseYearBranche();
    const cHBranche = BrancheHelper.getHourBranche(birthDate.getHour());
    branche = TuViHelper.getLocTonBranche(cYearTrunk);
    this.genLucSatStar(branche);
    this.genLocTonStarRing(branche);
    this.genStarFromYear(
      cYearBranche,
      this.tuViMenhBranche,
      this.tuViThanBranche,
      cMonth,
      cHBranche
    );
    this.genVanKhucVanXuongStar(cHBranche, cdate);
    this.genOtherStarFromMonthNDay(cMonth, cdate);
    this.genStarFromYearBrancheNOtherStar(cYearBranche, cMonth);
    this.genHoaTinhLinhTinh(cYearBranche, cHBranche);
    this.genOther(cYearTrunk, cYearBranche);
  }

  getBirthChineseYearBranche() {
    const cYear = this.lunar.birthDate.getChineseYear();
    return BrancheHelper.getYearBranche(cYear);
  }
  getcElement() {
    return this.getBirthChineseYearBranche().trigram.getElement();
  }

  getTuViEnergy() {
    return this.getBirthChineseYearBranche().getEnergy();
  }

  getRingDirection() {
    let res = -1;
    if (this.isDuongNamAmNu) {
      res = 1;
    }
    return res;
  }

  initThaiDuongThaiAm() {
    let starBranche: Branche;
    // Ref17p141
    let starPalace = TuViStar.THAIDUONG.getPalace();
    starBranche = starPalace.branche;
    let observation = starPalace.palaceObservation;
    this.isThaiDuongFavorable =
      BrancheHelper.isNhatFavorableBranche(starBranche) ===
        !observation.hasTuanTrietKhong && TuViStar.THAIDUONG.force >= 0;

    starPalace = TuViStar.THAIAM.getPalace();
    starBranche = starPalace.branche;
    observation = starPalace.palaceObservation;
    this.isThaiAmFavorable =
      BrancheHelper.isNguyetBranche(starBranche) ===
        !observation.hasTuanTrietKhong && TuViStar.THAIAM.force >= 0;
  }

  getDaiVanPalaceForAge(age: number, ageDate:MyCalendar): TuViPalace {
    let res = null;
    const bValues = Branche.getValues();
    let hanAge = age
    for (let index = 0; index < bValues.length; index++) {
      const branche = bValues[index];
      const palace = this.getBranchePalace(branche);
      palace.han=TuViPalace.NOHAN;
      palace.hanLunar=null;
      palace.cuoiHan=false;
    }
    for (let index = 0; index < bValues.length; index++) {
      const branche = bValues[index];
      const palace = this.getBranchePalace(branche);
      if (
        palace != null &&
        palace.bigPeriodFromYear <= age &&
        age <= palace.bigPeriodToYear
      ) {
        hanAge =  palace.bigPeriodFromYear
        res = palace;
        break;
      }
    }
    if (res === null) {
      res = this.getBranchePalace(this.tuViMenhBranche);
    }

    res.han=TuViPalace.DAIHAN;
    const hanDate = ageDate.getCopy();
    hanDate.add(Temporal.Duration.from({ years: hanAge-age }));
    console.log("HanAge ",hanAge, age , hanDate)
    res.hanLunar=new Lunar(hanDate,true);
    res.cuoiHan=res.bigPeriodFromYear+5>=age
    return res;

  }

  getChildPalace( age: number) {
    let ring = TuViRing.Menh;
    switch (age) {
        case 1:
            ring = TuViRing.Menh;
            break;
        case 2:
            ring = TuViRing.TaiBach;
            break;
        case 3:
            ring = TuViRing.TatAch;
            break;
        case 4:
            ring = TuViRing.PhuThe;
            break;
        case 5:
            ring = TuViRing.PhucDuc;
            break;
        case 6:
            ring = TuViRing.QuanLoc;
            break;
        case 7:
            ring = TuViRing.NoBoc;
            break;
        case 8:
            ring = TuViRing.ThienDi;
            break;
        case 9:
            ring = TuViRing.TuTuc;
            break;
        case 10:
            ring = TuViRing.HuynhDe;
            break;
        case 11:
            ring = TuViRing.PhuMau;
            break;
        case 12:
            ring = TuViRing.DienTrach;
            break;
    }
    const res = this.getRingPalace(ring);
    return res;
}

    // Ref17 p26
    getTuViStudyYearBrancheDaiHan( age: number,  daihan: TuViPalace, currDate: MyCalendar) {

      let res;
      let diffAge = -1 ;
      let inc = 0 ;
      // Reset Han Info
      res = daihan;
      const bValues = Branche.getValues();
      for (let index = 0; index < bValues.length-1; index++) {
        res = res.getNextPalace(1)
        res.han=TuViPalace.NOHAN;
        res.hanLunar=null;
      }
      if (age >= 13) {
          // The start palace
          res = daihan;
          diffAge = age - res.bigPeriodFromYear;
          if (diffAge > 0) {
              res = res.getOppositePalace();
              if (diffAge != 1) {
                  inc = this.getRingDirection();
                  res = res.getNextPalace((diffAge - 1) * inc);
              }
          }
      } else {
          res = this.getChildPalace(age);
      }
      res.han=TuViPalace.DAIHANNAM;
      res.hanLunar=new Lunar(currDate,true);
      return res ;
  }

     // Ref17 p26
    // The ring to be used is already evaluated as secondary period
    getTuViStudyYearBrancheTieuHan( yBranche: Branche,  age: number) {
      let res = null;

      if (age >= 13) {
          // The start palace. Any palace
          // Find the secondary ring palace with the same name
          res = this.getBranchePalace(Branche.PIG);
          while (res.secondaryPeriodBranche !== yBranche) {
              res = res.prev;
          }
      } else {
          res= this.getChildPalace(age);
      }
      res.han=TuViPalace.TIEUHAN;
      return res;
  }

    // Ref17 p28
  getTuViStudyMonthPalace( secondaryPalace: TuViPalace, monthS0: number,  hTrunk: Trunk) {
      // monthS0 start with 0 as first month
      return secondaryPalace.getNextPalace(
              // Go backward to Rat hour
              -monthS0 +
                      // Go forward to birth hour which is the 1st Month
                      hTrunk.ordinal() +
                      // Finally Go forward to get the month Palace
                      monthS0
      );
  }

      // Ref17 p28
  getTuViStudyDayPalace( monthPalace: TuViPalace,  dayS1: number) {
        // dayS0 start with 1 as first day
        const res =  monthPalace.getNextPalace(dayS1 - 1);
        res.han=TuViPalace.NHATHAN;
        return res;
    }

}
