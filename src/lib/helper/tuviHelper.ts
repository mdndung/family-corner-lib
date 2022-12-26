/* eslint-disable @typescript-eslint/naming-convention */
import { Branche } from '../mt-data/bazi/branche';
import { Trunk } from '../mt-data/bazi/trunk';
import { TuViStar } from '../mt-data/tuvi/tuviStar';
import { Element } from '../mt-data/feng-shui/element';
import { TuViPalace } from '../mt-data/tuvi/tuviPalace';
import { TuViHoroscope } from '../horoscope/tuviHoroscope';
import { TuViRing } from '../mt-data/tuvi/tuviRing';
import { TuviMenhObservation } from '../mt-data/tuvi/tuviMenhObservation';
import { TuViNoBocObservation } from '../mt-data/tuvi/tuviNoBocObservation';
import { TuViHuynhDeObservation } from '../mt-data/tuvi/tuviHuynhDeObservation';
import { TuViPhuTheObservation } from '../mt-data/tuvi/tuviPhuTheObservation';
import { TuViTuTucObservation } from '../mt-data/tuvi/tuviTuTucObservation';
import { TuViTaiBachObservation } from '../mt-data/tuvi/tuviTaiBachObservation';
import { TuViTatAchObservation } from '../mt-data/tuvi/tuviTatAchObservation';
import { TuViQuanLocObservation } from '../mt-data/tuvi/tuviQuanLocObservation';
import { TuViDienTrachObservation } from '../mt-data/tuvi/tuviDienTrachObservation';
import { TuViPhucDucObservation } from '../mt-data/tuvi/tuviPhucDucObservation';
import { TuViThienDiObservation } from '../mt-data/tuvi/tuviThienDiObservation';
import { TuViPhuMauObservation } from '../mt-data/tuvi/tuviPhuMauObservation';

export class TuViHelper {
  static TuViStarHoaXPos = [
    // JIA
    [TuViStar.LIEMTRINH, TuViStar.PHAQUAN, TuViStar.VUKHUC, TuViStar.THAIDUONG],
    // YI
    [TuViStar.THIENCO, TuViStar.THIENLUONG, TuViStar.TUVI, TuViStar.THAIAM],
    // BING
    [
      TuViStar.THIENDONG,
      TuViStar.THIENCO,
      TuViStar.VANXUONG,
      TuViStar.LIEMTRINH,
    ],
    // DING
    [TuViStar.THAIAM, TuViStar.THIENDONG, TuViStar.THIENCO, TuViStar.CUMON],
    // WU
    [TuViStar.THAMLANG, TuViStar.THAIAM, TuViStar.HUUBAT, TuViStar.THIENCO],
    // JI
    [TuViStar.VUKHUC, TuViStar.THAMLANG, TuViStar.THIENLUONG, TuViStar.VANKHUC],
    // GENG
    [TuViStar.THAIDUONG, TuViStar.VUKHUC, TuViStar.THAIAM, TuViStar.THIENDONG],
    // XIN
    [TuViStar.CUMON, TuViStar.THAIDUONG, TuViStar.VANKHUC, TuViStar.VANXUONG],
    // REN
    [TuViStar.THIENLUONG, TuViStar.TUVI, TuViStar.THIENPHUR, TuViStar.VUKHUC],
    // GUI
    [TuViStar.PHAQUAN, TuViStar.CUMON, TuViStar.THAIAM, TuViStar.THAMLANG],
  ];

  // Ref14p105..106..114
  // Suivre Ref20 p30 (Ref17p20+REF13p80 différent en Ren (Ref14p105 semble être faux)
  // THIENKHOI.THIENVIET,VANTINH,THIENPHUC,THIENQUAN, TRIETKHONG, LUUHA, THIENTRU (Ref13p79)
  static StarByTrunk = [
    // JIA
    [
      Branche.OX,
      Branche.GOAT,
      Branche.SNAKE,
      Branche.COCK,
      Branche.GOAT,
      Branche.MONKEY,
      Branche.COCK,
      Branche.SNAKE,
    ],
    // YI
    [
      Branche.RAT,
      Branche.MONKEY,
      Branche.HORSE,
      Branche.MONKEY,
      Branche.DRAGON,
      Branche.HORSE,
      Branche.DOG,
      Branche.HORSE,
    ],
    // BING
    [
      Branche.PIG,
      Branche.COCK,
      Branche.MONKEY,
      Branche.RAT,
      Branche.SNAKE,
      Branche.DRAGON,
      Branche.GOAT,
      Branche.RAT,
    ],
    // DING
    [
      Branche.PIG,
      Branche.COCK,
      Branche.COCK,
      Branche.PIG,
      Branche.TIGER,
      Branche.TIGER,
      Branche.MONKEY,
      Branche.SNAKE,
    ],
    // WU
    [
      Branche.OX,
      Branche.GOAT,
      Branche.MONKEY,
      Branche.RABBIT,
      Branche.RABBIT,
      Branche.RAT,
      Branche.SNAKE,
      Branche.HORSE,
    ],
    // JI
    [
      Branche.RAT,
      Branche.MONKEY,
      Branche.COCK,
      Branche.TIGER,
      Branche.COCK,
      Branche.MONKEY,
      Branche.HORSE,
      Branche.MONKEY,
    ],
    // GENG
    [
      Branche.HORSE,
      Branche.TIGER,
      Branche.PIG,
      Branche.HORSE,
      Branche.PIG,
      Branche.HORSE,
      Branche.RABBIT,
      Branche.TIGER,
    ],
    // XIN
    [
      Branche.HORSE,
      Branche.TIGER,
      Branche.RABBIT,
      Branche.SNAKE,
      Branche.COCK,
      Branche.DRAGON,
      Branche.DRAGON,
      Branche.HORSE,
    ],
    // REN
    [
      Branche.RABBIT,
      Branche.SNAKE,
      Branche.COCK,
      Branche.HORSE,
      Branche.DOG,
      Branche.TIGER,
      Branche.PIG,
      Branche.COCK,
    ],
    // GUI
    [
      Branche.RABBIT,
      Branche.SNAKE,
      Branche.RABBIT,
      Branche.SNAKE,
      Branche.HORSE,
      Branche.RAT,
      Branche.TIGER,
      Branche.DOG,
    ],
  ];
  // Ref14p109,110,111
  static StarByBranche = [
    // THIENMA,DAOHOA,HOACAI,PHATOAI,COTHAN,QUATU
    // RAT
    [
      Branche.TIGER,
      Branche.COCK,
      Branche.DRAGON,
      Branche.SNAKE,
      Branche.TIGER,
      Branche.DOG,
    ],
    // OX
    [
      Branche.PIG,
      Branche.HORSE,
      Branche.OX,
      Branche.OX,
      Branche.TIGER,
      Branche.DOG,
    ],
    // TIGER
    [
      Branche.MONKEY,
      Branche.RABBIT,
      Branche.DOG,
      Branche.COCK,
      Branche.SNAKE,
      Branche.OX,
    ],
    // RABBIT
    [
      Branche.SNAKE,
      Branche.RAT,
      Branche.GOAT,
      Branche.SNAKE,
      Branche.SNAKE,
      Branche.OX,
    ],
    // DRAGON
    [
      Branche.TIGER,
      Branche.COCK,
      Branche.DRAGON,
      Branche.OX,
      Branche.SNAKE,
      Branche.OX,
    ],
    // SNAKE
    [
      Branche.PIG,
      Branche.HORSE,
      Branche.OX,
      Branche.COCK,
      Branche.MONKEY,
      Branche.DRAGON,
    ],
    // HORSE
    [
      Branche.MONKEY,
      Branche.RABBIT,
      Branche.DOG,
      Branche.SNAKE,
      Branche.MONKEY,
      Branche.DRAGON,
    ],
    // GOAT
    [
      Branche.SNAKE,
      Branche.RAT,
      Branche.GOAT,
      Branche.OX,
      Branche.MONKEY,
      Branche.DRAGON,
    ],
    // MONKEY
    [
      Branche.TIGER,
      Branche.COCK,
      Branche.DRAGON,
      Branche.COCK,
      Branche.PIG,
      Branche.GOAT,
    ],
    // COCK
    [
      Branche.PIG,
      Branche.HORSE,
      Branche.OX,
      Branche.SNAKE,
      Branche.PIG,
      Branche.GOAT,
    ],
    // DOG
    [
      Branche.MONKEY,
      Branche.RABBIT,
      Branche.DOG,
      Branche.OX,
      Branche.PIG,
      Branche.GOAT,
    ],
    // PIG
    [
      Branche.SNAKE,
      Branche.RAT,
      Branche.GOAT,
      Branche.COCK,
      Branche.TIGER,
      Branche.DOG,
    ],
  ];
  // Ref14p116
  // Ref17p27
  static SecondaryPeriodStartBranche = [
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

  static TUVI_CUC_RAT_OX_CYCLE = [
    Element.WATER,
    Element.FIRE,
    Element.EARTH,
    Element.WOOD,
    Element.METAL,
  ];

  static TuViPosSeq = [
    // WOOD element
    [
      Branche.DRAGON,
      Branche.OX,
      Branche.TIGER,
      Branche.SNAKE,
      Branche.TIGER,
      Branche.RABBIT,
      Branche.HORSE,
      Branche.RABBIT,
      Branche.DRAGON,
      Branche.GOAT,
      Branche.DRAGON,
      Branche.SNAKE,
      Branche.MONKEY,
      Branche.SNAKE,
      Branche.HORSE,
      Branche.COCK,
      Branche.HORSE,
      Branche.GOAT,
      Branche.DOG,
      Branche.GOAT,
      Branche.MONKEY,
      Branche.PIG,
      Branche.MONKEY,
      Branche.COCK,
      Branche.RAT,
      Branche.COCK,
      Branche.DOG,
      Branche.OX,
      Branche.DOG,
      Branche.PIG,
    ],
    // FIRE
    [
      Branche.COCK,
      Branche.HORSE,
      Branche.PIG,
      Branche.DRAGON,
      Branche.OX,
      Branche.TIGER,
      Branche.DOG,
      Branche.GOAT,
      Branche.RAT,
      Branche.SNAKE,
      Branche.TIGER,
      Branche.RABBIT,
      Branche.PIG,
      Branche.MONKEY,
      Branche.OX,
      Branche.HORSE,
      Branche.RABBIT,
      Branche.DRAGON,
      Branche.RAT,
      Branche.COCK,
      Branche.TIGER,
      Branche.GOAT,
      Branche.DRAGON,
      Branche.SNAKE,
      Branche.OX,
      Branche.DOG,
      Branche.RABBIT,
      Branche.MONKEY,
      Branche.SNAKE,
      Branche.HORSE,
    ],
    // EARTH
    [
      Branche.HORSE,
      Branche.PIG,
      Branche.DRAGON,
      Branche.OX,
      Branche.TIGER,
      Branche.GOAT,
      Branche.RAT,
      Branche.SNAKE,
      Branche.TIGER,
      Branche.RABBIT,
      Branche.MONKEY,
      Branche.OX,
      Branche.HORSE,
      Branche.RABBIT,
      Branche.DRAGON,
      Branche.COCK,
      Branche.TIGER,
      Branche.GOAT,
      Branche.DRAGON,
      Branche.SNAKE,
      Branche.DOG,
      Branche.RABBIT,
      Branche.MONKEY,
      Branche.SNAKE,
      Branche.HORSE,
      Branche.PIG,
      Branche.DRAGON,
      Branche.COCK,
      Branche.HORSE,
      Branche.GOAT,
    ],
    // METAL
    [
      Branche.PIG,
      Branche.DRAGON,
      Branche.OX,
      Branche.TIGER,
      Branche.RAT,
      Branche.SNAKE,
      Branche.TIGER,
      Branche.RABBIT,
      Branche.OX,
      Branche.HORSE,
      Branche.RABBIT,
      Branche.DRAGON,
      Branche.TIGER,
      Branche.GOAT,
      Branche.DRAGON,
      Branche.SNAKE,
      Branche.RABBIT,
      Branche.MONKEY,
      Branche.SNAKE,
      Branche.HORSE,
      Branche.DRAGON,
      Branche.COCK,
      Branche.HORSE,
      Branche.GOAT,
      Branche.SNAKE,
      Branche.DOG,
      Branche.GOAT,
      Branche.MONKEY,
      Branche.HORSE,
      Branche.PIG,
    ],
    // WATER
    [
      Branche.OX,
      Branche.TIGER,
      Branche.TIGER,
      Branche.RABBIT,
      Branche.RABBIT,
      Branche.DRAGON,
      Branche.DRAGON,
      Branche.SNAKE,
      Branche.SNAKE,
      Branche.HORSE,
      Branche.HORSE,
      Branche.GOAT,
      Branche.GOAT,
      Branche.MONKEY,
      Branche.MONKEY,
      Branche.COCK,
      Branche.COCK,
      Branche.DOG,
      Branche.DOG,
      Branche.PIG,
      Branche.PIG,
      Branche.RAT,
      Branche.RAT,
      Branche.OX,
      Branche.OX,
      Branche.TIGER,
      Branche.TIGER,
      Branche.RABBIT,
      Branche.RABBIT,
      Branche.DRAGON,
    ],
  ];


  static TUVI_ELEMENT_RAT_OX_CYCLE = [
    Element.METAL,
    Element.METAL,
    Element.WATER,
    Element.WATER,
    Element.FIRE,
    Element.FIRE,
    Element.EARTH,
    Element.EARTH,
    Element.WOOD,
    Element.WOOD,
  ];

  // Ref13 p74/ Ref20p25
  static getTuViMenh(birthMonth: number, birthHour: Branche): Branche {
    // Assume january is 1
    // TIGER start for january
    const res = Branche.TIGER.getEnumNextNElement(
      birthMonth - 1 - birthHour.ordinal()
    );
    return res;
  }

  // Ref13 p74
  static getTuViThan(birthMonth: number, birthHour: Branche): Branche {
    // Assume january is 1
    const res = Branche.TIGER.getEnumNextNElement(
      birthMonth + birthHour.ordinal() - 1
    );
    return res;
  }


  // Ref13 p76 Ref20 p26
  static getTuViCucElement(tuviMenhBranche: Branche, yearTrunk: Trunk) {
    let res = null;
    switch (tuviMenhBranche) {
      case Branche.RAT:
      case Branche.OX:
        res = TuViHelper.TUVI_CUC_RAT_OX_CYCLE[yearTrunk.ordinal() % 5];
        break;
      case Branche.DOG:
      case Branche.PIG:
      case Branche.TIGER:
      case Branche.RABBIT:
        res = TuViHelper.TUVI_CUC_RAT_OX_CYCLE[(yearTrunk.ordinal() + 1) % 5];
        break;
      case Branche.SNAKE:
      case Branche.DRAGON:
        res = TuViHelper.TUVI_CUC_RAT_OX_CYCLE[(yearTrunk.ordinal() + 3) % 5];
        break;
      case Branche.GOAT:
      case Branche.HORSE:
        res = TuViHelper.TUVI_CUC_RAT_OX_CYCLE[(yearTrunk.ordinal() + 2) % 5];
        break;
      case Branche.COCK:
      case Branche.MONKEY:
        res = TuViHelper.TUVI_CUC_RAT_OX_CYCLE[(yearTrunk.ordinal() + 4) % 5];
        break;
    }

    return res;
  }

  // Ref14 p95/ Ref20 p27 get the Tu Vi Star Branche for tuviMenhElement at date start1BirthDateIdx
  static getTuViBranche(tuviMenhElement: Element, start1BirthDateIdx: number) {
    return TuViHelper.TuViPosSeq[tuviMenhElement.ordinal()][
      start1BirthDateIdx - 1
    ];
  }

  // Ref14 p99 An sao Loc Ton
  // Ref20 p30
  static getLocTonBranche(yearTrunk: Trunk) {
    let res = null;
    switch (yearTrunk) {
      case Trunk.JIA:
        res = Branche.TIGER;
        break;
      case Trunk.YI:
        res = Branche.RABBIT;
        break;
      case Trunk.BING:
      case Trunk.WU:
        res = Branche.SNAKE;
        break;
      case Trunk.DING:
      case Trunk.JI:
        res = Branche.HORSE;
        break;
      case Trunk.GENG:
        res = Branche.MONKEY;
        break;
      case Trunk.XIN:
        res = Branche.COCK;
        break;
      case Trunk.REN:
        res = Branche.PIG;
        break;
      case Trunk.GUI:
        res = Branche.RAT;
        break;
    }
    return res;
  }

  // Ref20 p24
      // Ref13 p76 Ref20 p26
  static getTuViElement(yearBranche: Branche, yearTrunk: Trunk) {
    let res = null;

    switch (yearBranche) {
      case Branche.RAT:
      case Branche.OX:
        res = TuViHelper.TUVI_ELEMENT_RAT_OX_CYCLE[yearTrunk.ordinal()];
        break;
      case Branche.TIGER:
      case Branche.RABBIT:
        res =
          TuViHelper.TUVI_ELEMENT_RAT_OX_CYCLE[(yearTrunk.ordinal() + 2) % 10];
        break;
      case Branche.SNAKE:
      case Branche.DRAGON:
        res =
          TuViHelper.TUVI_ELEMENT_RAT_OX_CYCLE[(yearTrunk.ordinal() + 4) % 10];
        break;
      case Branche.GOAT:
      case Branche.HORSE:
        res = TuViHelper.TUVI_ELEMENT_RAT_OX_CYCLE[yearTrunk.ordinal()];
        break;
      case Branche.COCK:
      case Branche.MONKEY:
        res =
          TuViHelper.TUVI_ELEMENT_RAT_OX_CYCLE[(yearTrunk.ordinal() + 2) % 10];
        break;
      case Branche.DOG:
      case Branche.PIG:
        res =
          TuViHelper.TUVI_ELEMENT_RAT_OX_CYCLE[(yearTrunk.ordinal() + 4) % 10];
        break;
    }

    return res;
  }


  static getTuViObservation( tuViSummary: TuViHoroscope,  palace: TuViPalace) {
    let observation;
    switch (palace.ringType) {
        case TuViRing.Menh:
            observation = new TuviMenhObservation(palace, tuViSummary);
            break;
        case TuViRing.PhuMau:
            observation = new TuViPhuMauObservation(palace, tuViSummary);
            break;
        case TuViRing.ThienDi:
            observation = new TuViThienDiObservation(palace, tuViSummary);
            break;
        case TuViRing.PhucDuc:
            observation = new TuViPhucDucObservation(palace, tuViSummary);
            break;
        case TuViRing.DienTrach:
            observation = new TuViDienTrachObservation(palace, tuViSummary);
            break;
        case TuViRing.QuanLoc:
            observation = new TuViQuanLocObservation(palace, tuViSummary);
            break;
        case TuViRing.TatAch:
            observation = new TuViTatAchObservation(palace, tuViSummary);
            break;
        case TuViRing.TaiBach:
            observation = new TuViTaiBachObservation(palace, tuViSummary);
            break;
        case TuViRing.TuTuc:
            observation = new TuViTuTucObservation(palace, tuViSummary);
            break;
        case TuViRing.PhuThe:
            observation = new TuViPhuTheObservation(palace, tuViSummary);
            break;
        case TuViRing.HuynhDe:
            observation = new TuViHuynhDeObservation(palace, tuViSummary);
            break;
        case TuViRing.NoBoc:
            observation = new TuViNoBocObservation(palace, tuViSummary);
            break;
    }
    return observation;
}
}
