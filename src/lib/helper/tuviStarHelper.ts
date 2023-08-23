/* eslint-disable @typescript-eslint/naming-convention */
import { Branche } from '../mt-data/bazi/branche';
import { Trunk } from '../mt-data/bazi/trunk';
import { TuViStar } from '../mt-data/tuvi/tuviStar';
import { Element } from '../mt-data/feng-shui/element';
import { ObjectHelper } from './objectHelper';
import { TuViRing } from '../mt-data/tuvi/tuviRing';
import { Omen } from '../mt-data/feng-shui/omen';

export class TuViStarHelper {
  static NorthStarGroup = [
    TuViStar.CUMON, TuViStar.LIEMTRINH,TuViStar.THAMLANG,TuViStar.PHAQUAN,TuViStar.THAIAM,
    TuViStar.TUVI,TuViStar.VUKHUC,
    TuViStar.KINHDUONG,TuViStar.DALA,TuViStar.VANXUONG,
    TuViStar.TAPHU,TuViStar.HUUBAT,TuViStar.LOCTON
  ];

  static SouthStarGroup = [
    TuViStar.THAIDUONG,TuViStar.THATSAT, TuViStar.THIENCO,TuViStar.THIENDONG,TuViStar.THIENLUONG,
    TuViStar.THIENPHUR,TuViStar.THIENTUONG,TuViStar.TUVI,TuViStar.HOATINH, TuViStar.LINHTINH,
    TuViStar.VANKHUC,TuViStar.THIENKHOI,TuViStar.THIENVIET

  ];
  // Ref15p23-24
  static MieuDiaStar = [
    // RAT
    [TuViStar.THIENPHUR, TuViStar.THATSAT, TuViStar.PHAQUAN, TuViStar.THIENHU],
    // OX
    [TuViStar.VUKHUC, TuViStar.THAMLANG, TuViStar.ANQUANG, TuViStar.THIENQUY],
    // TIGER
    [
      TuViStar.TUVI,
      TuViStar.THIENPHUR,
      TuViStar.THATSAT,
      TuViStar.THIENTUONG,
      TuViStar.THIENDONG,
      TuViStar.THIENMA,
    ],
    // RABBIT
    [TuViStar.CUMON, TuViStar.THIENCO],
    // DRAGON
    [
      TuViStar.THIENCO,
      TuViStar.THIENLUONG,
      TuViStar.VUKHUC,
      TuViStar.LIEMTRINH,
    ],
    // SNAKE
    [
      TuViStar.THAIDUONG,
      TuViStar.THIENLUONG,
      TuViStar.THIENMA,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.TUVI,
    ],
    // HORSE
    [
      TuViStar.THIENPHUR,
      TuViStar.TUVI,
      TuViStar.THAIDUONG,
      TuViStar.PHAQUAN,
      TuViStar.THATSAT,
      TuViStar.THIENHU,
      TuViStar.TUVI,
    ],
    // GOAT
    [TuViStar.VUKHUC, TuViStar.THAMLANG, TuViStar.ANQUANG, TuViStar.THIENQUY],
    // MONKEY
    [
      TuViStar.TUVI,
      TuViStar.THIENPHUR,
      TuViStar.THATSAT,
      TuViStar.THIENTUONG,
      TuViStar.THIENDONG,
    ],
    // COCK
    [TuViStar.THIENCO, TuViStar.CUMON, TuViStar.THAIAM],
    // DOG
    [
      TuViStar.THIENCO,
      TuViStar.THIENLUONG,
      TuViStar.VUKHUC,
      TuViStar.LIEMTRINH,
      TuViStar.THAIAM,
    ],
    // PIG
    [
      TuViStar.THAIAM,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
    ],
  ];
  // Ref15p23-24
  static VuongStar = [
    // RAT
    [
      TuViStar.THIENTUONG,
      TuViStar.THIENDONG,
      TuViStar.THIENLUONG,
      TuViStar.LIEMTRINH,
      TuViStar.VUKHUC,
      TuViStar.CUMON,
      TuViStar.THAIAM,
    ],
    // OX
    [TuViStar.PHAQUAN],
    // TIGER
    [
      TuViStar.THAIDUONG,
      TuViStar.THIENLUONG,
      TuViStar.VUKHUC,
      TuViStar.CUMON,
      TuViStar.LIEMTRINH,
      TuViStar.THIENMA,
    ],
    // RABBIT
    [TuViStar.THAIDUONG, TuViStar.THIENLUONG],
    // DRAGON
    [
      TuViStar.TUVI,
      TuViStar.THIENPHUR,
      TuViStar.THAIDUONG,
      TuViStar.THIENTUONG,
      TuViStar.THAMLANG,
    ],
    // SNAKE
    [
      TuViStar.THATSAT,
      TuViStar.THIENCO,
      TuViStar.DIAKHONG,
      TuViStar.TUANKHONG,
      TuViStar.THIENMA,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
    ],
    // HORSE
    [TuViStar.THIENTUONG, TuViStar.LIEMTRINH, TuViStar.VUKHUC, TuViStar.CUMON],
    // GOAT
    [TuViStar.PHAQUAN],
    // MONKEY
    [TuViStar.THIENLUONG, TuViStar.VUKHUC, TuViStar.THIENCO, TuViStar.THAIAM],
    // COCK
    [],
    // DOG
    [TuViStar.TUVI, TuViStar.THIENPHUR, TuViStar.THIENTUONG, TuViStar.THAMLANG],
    // PIG
    [
      TuViStar.THATSAT,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
    ],
  ];
  // Ref15p23-24
  static DacDiaStar = [
    // RAT
    [
      TuViStar.THIENCO,
      TuViStar.LOCTON,
      TuViStar.HONGLOAN,
      TuViStar.DAOHOA,
      TuViStar.THIENKHOC,
      TuViStar.THIENHU,
    ],
    // OX
    [
      TuViStar.TUVI,
      TuViStar.THAIDUONG,
      TuViStar.THATSAT,
      TuViStar.THANHLONG,
      TuViStar.THIENTUONG,
      TuViStar.THIENLUONG,
      TuViStar.LIEMTRINH,
      TuViStar.THAIAM,
      TuViStar.THIENXUONG,
      TuViStar.THIENKHOC,
      TuViStar.THIENHU,
      TuViStar.HUUBAT,
      TuViStar.TAMTHAI,
      TuViStar.BATTOA,
      TuViStar.ANQUANG,
      TuViStar.KINHDUONG,
      TuViStar.THIENCO,
      TuViStar.DALA,
      TuViStar.HOAKY,
      TuViStar.VANXUONG,
      TuViStar.VANKHUC,
    ],
    // TIGER
    [
      TuViStar.LOCTON,
      TuViStar.HOATINH,
      TuViStar.LINHTINH,
      TuViStar.KIEPSAT,
      TuViStar.TANGMON,
      TuViStar.BACHHO,
      TuViStar.THIENHINH,
      TuViStar.THIENRIEU,
      TuViStar.HOALOC,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.THIEUDUONG,
      TuViStar.DAIHAO,
      TuViStar.TRANGSINH,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.TANGMON,
    ],
    // RABBIT
    [
      TuViStar.THIENDONG,
      TuViStar.VUKHUC,
      TuViStar.LOCTON,
      TuViStar.HOALOC,
      TuViStar.LINHTINH,
      TuViStar.DAIHAO,
      TuViStar.TIEUHAO,
      TuViStar.THIENHINH,
      TuViStar.THIEUDUONG,
      TuViStar.DAOHOA,
      TuViStar.HOATINH,
      TuViStar.THIENY,
      TuViStar.THIENKHOC,
      TuViStar.THIENRIEU,
      TuViStar.TANGMON,
      TuViStar.BACHHO,
      TuViStar.LONGTRI,
      TuViStar.PHUONGCAC,
      TuViStar.TANGMON,
    ],
    // DRAGON
    [
      TuViStar.PHAQUAN,
      TuViStar.HUUBAT,
      TuViStar.THIEUDUONG,
      TuViStar.HOATINH,
      TuViStar.LINHTINH,
      TuViStar.KINHDUONG,
      TuViStar.DALA,
      TuViStar.HOAKY,
      TuViStar.VANXUONG,
      TuViStar.VANKHUC,
      TuViStar.THANHLONG,
    ],
    // SNAKE
    [
      TuViStar.THIENPHUR,
      TuViStar.THIENTUONG,
      TuViStar.THIENDONG,
      TuViStar.THIEUDUONG,
      TuViStar.VANXUONG,
      TuViStar.TRANGSINH,
      TuViStar.DIAKHONG,
      TuViStar.THIENXUONG,
      TuViStar.VANKHUC,
      TuViStar.HOATINH,
      TuViStar.LINHTINH,
      TuViStar.KIEPSAT,
    ],
    // HORSE
    [
      TuViStar.LOCTON,
      TuViStar.HOATINH,
      TuViStar.THIEUDUONG,
      TuViStar.THIENKHOC,
      TuViStar.THIENHU,
      TuViStar.LOCTON,
      TuViStar.THIENCO,
      TuViStar.HOATINH,
      TuViStar.LINHTINH,
      TuViStar.DAOHOA,
    ],
    // GOAT
    [
      TuViStar.TUVI,
      TuViStar.THIENPHUR,
      TuViStar.THAIDUONG,
      TuViStar.THANHLONG,
      TuViStar.THATSAT,
      TuViStar.THIENTUONG,
      TuViStar.THIENLUONG,
      TuViStar.LIEMTRINH,
      TuViStar.THAIAM,
      TuViStar.THIENXUONG,
      TuViStar.VANKHUC,
      TuViStar.HUUBAT,
      TuViStar.TAMTHAI,
      TuViStar.BATTOA,
      TuViStar.ANQUANG,
      TuViStar.THIENQUY,
      TuViStar.THIENCO,
      TuViStar.THIENKHOC,
      TuViStar.KINHDUONG,
      TuViStar.DALA,
      TuViStar.HOAKY,
      TuViStar.VANXUONG,
    ],
    // MONKEY
    [
      TuViStar.THAIDUONG,
      TuViStar.DAIHAO,
      TuViStar.TRANGSINH,
      TuViStar.CUMON,
      TuViStar.THAMLANG,
      TuViStar.THIENMA,
      TuViStar.KIEPSAT,
      TuViStar.TANGMON,
      TuViStar.BACHHO,
      TuViStar.THIENHINH,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.TANGMON,
    ],
    // COCK
    [
      TuViStar.THATSAT,
      TuViStar.VUKHUC,
      TuViStar.THIENXUONG,
      TuViStar.LONGTRI,
      TuViStar.PHUONGCAC,
      TuViStar.THIENY,
      TuViStar.THIENKHOC,
      TuViStar.DAIHAO,
      TuViStar.TIEUHAO,
      TuViStar.TANGMON,
      TuViStar.DAOHOA,
      TuViStar.BACHHO,
      TuViStar.THIENHINH,
      TuViStar.THIENRIEU,
      TuViStar.TANGMON,
    ],
    // DOG
    [
      TuViStar.PHAQUAN,
      TuViStar.HUUBAT,
      TuViStar.KINHDUONG,
      TuViStar.THANHLONG,
      TuViStar.DALA,
      TuViStar.THIENRIEU,
      TuViStar.HOAKY,
      TuViStar.VANXUONG,
      TuViStar.VANKHUC,
    ],
    // PIG
    [
      TuViStar.THIENPHUR,
      TuViStar.THIENTUONG,
      TuViStar.THIENDONG,
      TuViStar.CUMON,
      TuViStar.KIEPSAT,
      TuViStar.VANXUONG,
      TuViStar.VANKHUC,
      TuViStar.DIAKHONG,
    ],
  ];
  // Ref15p23-24
  static BinhStar = [
    // RAT
    [TuViStar.HOAKHOA, TuViStar.TUVI],
    // OX
    [TuViStar.THIENPHUR],
    // TIGER
    [],
    // RABBIT
    [TuViStar.TUVI, TuViStar.THIENPHUR],
    // DRAGON
    [],
    // SNAKE
    [],
    // HORSE
    [TuViStar.THIENXUONG],
    // GOAT
    [],
    // MONKEY
    [TuViStar.LOCTON],
    // COCK
    [TuViStar.LOCTON, TuViStar.TUVI, TuViStar.THIENPHUR],
    // DOG
    [TuViStar.THIENXUONG],
    // PIG
    [TuViStar.THIENMA, TuViStar.TUVI],
  ];
  // Ref15p23-24
  static HamDiaStar = [
    // RAT
    [
      TuViStar.THAIDUONG,
      TuViStar.THAMLANG,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.DAIHAO,
      TuViStar.THIENHINH,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.HOAKHOA,
      TuViStar.HOAKY,
      TuViStar.TANGMON,
      TuViStar.DALA,
      TuViStar.HOATINH,
      TuViStar.VANXUONG,
      TuViStar.KINHDUONG,
      TuViStar.VANKHUC,
      TuViStar.BACHHO,
      TuViStar.THIENRIEU,
      TuViStar.LINHTINH,
    ],
    // OX
    [
      TuViStar.THIENDONG,
      TuViStar.CUMON,
      TuViStar.DAIHAO,
      TuViStar.THIENHINH,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.TANGMON,
      TuViStar.HOATINH,
      TuViStar.BACHHO,
      TuViStar.THIENRIEU,
      TuViStar.LINHTINH,
    ],
    // TIGER
    [
      TuViStar.THIENCO,
      TuViStar.THAIAM,
      TuViStar.PHAQUAN,
      TuViStar.THIENKHOC,
      TuViStar.HOAKY,
      TuViStar.DALA,
      TuViStar.VANXUONG,
      TuViStar.KINHDUONG,
      TuViStar.VANKHUC,
    ],
    // RABBIT
    [
      TuViStar.THATSAT,
      TuViStar.THIENTUONG,
      TuViStar.LIEMTRINH,
      TuViStar.THAIAM,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.HOAKY,
      TuViStar.DALA,
      TuViStar.KINHDUONG,
      TuViStar.PHAQUAN,
      TuViStar.THAMLANG,
    ],
    // DRAGON
    [
      TuViStar.THATSAT,
      TuViStar.THIENDONG,
      TuViStar.THAIAM,
      TuViStar.DAIHAO,
      TuViStar.THIENHINH,
      TuViStar.CUMON,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.THIENKHOC,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.TANGMON,
      TuViStar.BACHHO,
      TuViStar.THIENRIEU,
    ],
    // SNAKE
    [
      TuViStar.THIENLUONG,
      TuViStar.LIEMTRINH,
      TuViStar.VUKHUC,
      TuViStar.DAIHAO,
      TuViStar.THIENHINH,
      TuViStar.CUMON,
      TuViStar.PHAQUAN,
      TuViStar.THAMLANG,
      TuViStar.THIENKHOC,
      TuViStar.HOAKY,
      TuViStar.TANGMON,
      TuViStar.DALA,
      TuViStar.KINHDUONG,
      TuViStar.BACHHO,
      TuViStar.THIENRIEU,
      TuViStar.THAIAM,
    ],
    // HORSE
    [
      TuViStar.THIENDONG,
      TuViStar.THAIAM,
      TuViStar.THAMLANG,
      TuViStar.DAIHAO,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.HOAKY,
      TuViStar.TANGMON,
      TuViStar.DALA,
      TuViStar.VANXUONG,
      TuViStar.KINHDUONG,
      TuViStar.VANKHUC,
      TuViStar.BACHHO,
      TuViStar.THIENRIEU,
    ],
    // GOAT
    [
      TuViStar.THIENDONG,
      TuViStar.DIAKHONG,
      TuViStar.DAIHAO,
      TuViStar.CUMON,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.THIENHINH,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.TANGMON,
      TuViStar.HOATINH,
      TuViStar.KINHDUONG,
      TuViStar.BACHHO,
      TuViStar.THIENRIEU,
      TuViStar.LINHTINH,
    ],
    // MONKEY
    [
      TuViStar.PHAQUAN,
      TuViStar.HOALOC,
      TuViStar.THAITUE,
      TuViStar.THIENKHOC,
      TuViStar.HOAKY,
      TuViStar.THAIDUONG,
      TuViStar.DALA,
      TuViStar.HOATINH,
      TuViStar.VANXUONG,
      TuViStar.VANKHUC,
      TuViStar.BACHHO,
      TuViStar.THIENRIEU,
      TuViStar.LINHTINH,
    ],
    // COCK
    [
      TuViStar.THAIDUONG,
      TuViStar.THIENTUONG,
      TuViStar.THIENDONG,
      TuViStar.THATSAT,
      TuViStar.THIENLUONG,
      TuViStar.LIEMTRINH,
      TuViStar.PHAQUAN,
      TuViStar.THAMLANG,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.HOALOC,
      TuViStar.HOAQUYEN,
      TuViStar.HOAKHOA,
      TuViStar.HOAKY,
      TuViStar.THAITUE,
      TuViStar.DALA,
      TuViStar.HOATINH,
      TuViStar.LINHTINH,
    ],
    // DOG
    [
      TuViStar.THAIDUONG,
      TuViStar.THATSAT,
      TuViStar.THIENDONG,
      TuViStar.DAIHAO,
      TuViStar.THIENHINH,
      TuViStar.CUMON,
      TuViStar.DIAKHONG,
      TuViStar.THIENKHONG,
      TuViStar.THIENKHOC,
      TuViStar.TUANKHONG,
      TuViStar.TRIETKHONG,
      TuViStar.DIAKIEP,
      TuViStar.TANGMON,
      TuViStar.HOATINH,
      TuViStar.BACHHO,
      TuViStar.LINHTINH,
    ],
    // PIG
    [
      TuViStar.THAIDUONG,
      TuViStar.THIENCO,
      TuViStar.THIENLUONG,
      TuViStar.DAIHAO,
      TuViStar.THIENKHOC,
      TuViStar.LIEMTRINH,
      TuViStar.VUKHUC,
      TuViStar.PHAQUAN,
      TuViStar.THIENHINH,
      TuViStar.THAMLANG,
      TuViStar.HOAQUYEN,
      TuViStar.HOAKY,
      TuViStar.TANGMON,
      TuViStar.DALA,
      TuViStar.HOATINH,
      TuViStar.KINHDUONG,
      TuViStar.BACHHO,
      TuViStar.THIENRIEU,
      TuViStar.THIENMA,
      TuViStar.LINHTINH,
      TuViStar.TRANGSINH,
    ],
  ];

  // Ref14 p98 An sao Trang sinh
  static TrangSinhStarBranche = [
    // WOOD
    Branche.PIG,
    // FIRE
    Branche.TIGER,
    // EARTH
    Branche.MONKEY,
    // METAL
    Branche.SNAKE,
    // WATER
    Branche.MONKEY,
  ];

  static DeactivateBadStarAbility = [
    TuViStar.THIENGIAI,
    TuViStar.DIAGIAI,
    TuViStar.GIAITHAN,
    TuViStar.THIENQUAN,
    TuViStar.THIENPHUC,
    TuViStar.THIEUAM,
    TuViStar.THIEUDUONG,
    TuViStar.THIENLUONG,
    TuViStar.NGUYETDUC,
    TuViStar.TRANGSINH,
    TuViStar.DEVUONG,
    TuViStar.HUUBAT,
    TuViStar.THIENQUY,
    TuViStar.ANQUANG,
    TuViStar.LONGDUC,
    TuViStar.THIENKHONG,
    TuViStar.VANKHUC,
    TuViStar.THIENY,
    TuViStar.PHUCDUC,
    TuViStar.THIENDUC,
    TuViStar.THIENKHOI,
  ];

  // Star that is influenced by both
  static BothMainStarForceActivatedStar = [
    TuViStar.LAMQUAN,
    TuViStar.LUUHA,
    TuViStar.COTHAN,
    TuViStar.HUUBAT,
    TuViStar.THIENTAI,
    TuViStar.QUANPHUF,
    TuViStar.QUANPHUR,
    TuViStar.THIENLA,
    TuViStar.LUCSI,
    TuViStar.BACHHO,
    TuViStar.THIENY,
    TuViStar.TAPHU,
    TuViStar.DIAVONG,
  ];

  // Star that is activated bad when it is in the second main period
  static OnlyBadTieuHanActivatedStar = [TuViStar.HONGLOAN, TuViStar.THIENHY];

  // Star that is activated by presence of good main star
  static OnlyGoodMainStarForceActivatedStar = [
    TuViStar.QUANPHUF,
    TuViStar.QUANPHUR,
  ];

  //  Star that is activated by presence of bad main star
  static OnlyBadMainStarForceActivatedStar = [TuViStar.KIEPSAT];

  static TUANTRIET = [TuViStar.TUANKHONG, TuViStar.TRIETKHONG];
  static KIEPDIA = [TuViStar.KIEPSAT, TuViStar.DIAKIEP];

  static BacDauChinhTinhstarList = [
    TuViStar.THIENPHUR,
    TuViStar.THIENTUONG,
    TuViStar.THATSAT,
    TuViStar.THIENDONG,
    TuViStar.THAIDUONG,
    TuViStar.THIENCO,
  ];
  static NamDauChinhTinhstarList = [
    TuViStar.THAIAM,
    TuViStar.THAMLANG,
    TuViStar.CUMON,
    TuViStar.LIEMTRINH,
    TuViStar.VUKHUC,
    TuViStar.PHAQUAN,
  ];
  static TuSatTinhList = [
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.HOATINH,
    TuViStar.LINHTINH,
  ];
  static LucSatTinhList = [
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.HOATINH,
    TuViStar.LINHTINH,
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
  ];
  static SatTinhList = [
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.HOATINH,
    TuViStar.LINHTINH,
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
    TuViStar.THIENKHONG,
    TuViStar.PHAQUAN,
    TuViStar.KIEPSAT,
    TuViStar.LUUHA, // TO CHECK
  ];
  static NGUYETAM = [TuViStar.THAIAM, TuViStar.NGUYETDUC];
  static DOILAM = [TuViStar.QUANDOI, TuViStar.LAMQUAN];
  static DONGDUC = [TuViStar.THIENDONG, TuViStar.THIENDUC];
  static TUKHUC = [TuViStar.TUVI, TuViStar.VUKHUC];
  static TUPHUR = [TuViStar.TUVI, TuViStar.THIENPHUR];
  static PHUTUONG = [TuViStar.THIENPHUR, TuViStar.TUONGQUAN];
  static BINHTUONG = [TuViStar.PHUCBINH, TuViStar.TUONGQUAN];
  static NHATNGUYET = [TuViStar.THAIDUONG, TuViStar.THAIAM];
  static NHATLOC = [TuViStar.THAIDUONG, TuViStar.LOCTON];
  static VUTUONG = [TuViStar.VUKHUC, TuViStar.TUONGQUAN];
  static SATTUONG = [TuViStar.THATSAT, TuViStar.TUONGQUAN];
  static TUONGTUONG = [TuViStar.THIENTUONG, TuViStar.TUONGQUAN];
  static TUONGKHOI = [TuViStar.THIENTUONG, TuViStar.THIENKHOI];
  static HOATUONG = [TuViStar.HOATINH, TuViStar.TUONGQUAN];
  static VUTHAM = [TuViStar.VUKHUC, TuViStar.THAMLANG];
  static KINHDAU = [TuViStar.KINHDUONG, TuViStar.DAUQUAN];
  static KINHDA = [TuViStar.KINHDUONG, TuViStar.DALA];
  static KINHKY = [TuViStar.KINHDUONG, TuViStar.HOAKY];
  static KINHSAT = [TuViStar.KINHDUONG, TuViStar.THATSAT];
  static KINHBAT = [TuViStar.KINHDUONG, TuViStar.HUUBAT];
  static KINHLINH = [TuViStar.KINHDUONG, TuViStar.LINHTINH];
  static KINHVUONG = [TuViStar.KINHDUONG, TuViStar.DEVUONG];
  static KINHPHUC = [TuViStar.KINHDUONG, TuViStar.PHUCBINH];
  static TAHUU = [TuViStar.TAPHU, TuViStar.HUUBAT];
  static KYHINH = [TuViStar.HOAKY, TuViStar.THIENHINH];
  static SATKYHINH = [TuViStar.KIEPSAT,TuViStar.THATSAT,TuViStar.HOAKY, TuViStar.THIENHINH];
  static KYQUYEN = [TuViStar.HOAKY, TuViStar.HOAQUYEN];
  static KIEPHINH = [TuViStar.KIEPSAT, TuViStar.THIENHINH];
  static KIEPKINH = [TuViStar.KIEPSAT, TuViStar.KINHDUONG];
  static KIEPCAI = [TuViStar.KIEPSAT, TuViStar.HOACAI];
  static KIEPHA = [TuViStar.KIEPSAT, TuViStar.LUUHA];
  static KIEPKY = [TuViStar.KIEPSAT, TuViStar.HOAKY];
  static KIEPKHONG = [TuViStar.THIENKHONG, TuViStar.KIEPSAT];
  static KHOIVIET = [TuViStar.THIENKHOI, TuViStar.THIENVIET];
  static CACQUYEN = [TuViStar.PHUONGCAC, TuViStar.HOAQUYEN];
  static CUNHAT = [TuViStar.CUMON, TuViStar.THAIDUONG];
  static CUKY = [TuViStar.CUMON, TuViStar.HOAKY];
  static CUKHUC = [TuViStar.CUMON, TuViStar.VUKHUC];
  static CUHOA = [TuViStar.CUMON, TuViStar.HOATINH];
  static DAMA = [TuViStar.DALA, TuViStar.THIENMA];
  static DAKY = [TuViStar.DALA, TuViStar.HOAKY];
  static DATANG = [TuViStar.DALA, TuViStar.TANGMON];
  static DACAI = [TuViStar.DALA, TuViStar.HOACAI];
  static DAHO = [TuViStar.DALA, TuViStar.BACHHO];
  static DATHAI = [TuViStar.DALA, TuViStar.THAI];
  static DATHAM = [TuViStar.DALA, TuViStar.THAMLANG];
  static DAKHONG = [TuViStar.DALA, TuViStar.THIENKHONG];
  static MONHO = [TuViStar.TANGMON, TuViStar.BACHHO];
  static COTHAIAM = [TuViStar.THIENCO, TuViStar.THAIAM];
  static KHOAPHUONG = [TuViStar.HOAKHOA, TuViStar.PHUONGCAC];
  static KHOASINH = [TuViStar.HOAKHOA, TuViStar.TRANGSINH];
  static KHOALOC = [TuViStar.HOAKHOA, TuViStar.HOALOC];
  static KHOAQUYEN = [TuViStar.HOAKHOA, TuViStar.HOAQUYEN];
  static KHOATUAN = [TuViStar.HOAKHOA, TuViStar.TUANKHONG];
  static XUONGVU = [TuViStar.VANXUONG, TuViStar.VUKHUC];
  static HOAVIET = [TuViStar.HOATINH, TuViStar.THIENVIET];
  static HOALINH = [TuViStar.HOATINH, TuViStar.LINHTINH];
  static HOAKINH = [TuViStar.HOATINH, TuViStar.KINHDUONG];
  static MATUYET = [TuViStar.THIENMA, TuViStar.TUYET];
  static LIEMTUONG = [TuViStar.LIEMTRINH, TuViStar.THIENTUONG];
  static LIEMDUONG = [TuViStar.LIEMTRINH, TuViStar.DUONG];
  static LIEMSAT = [TuViStar.LIEMTRINH, TuViStar.THATSAT];
  static LIEMTHAM = [TuViStar.LIEMTRINH, TuViStar.THAMLANG];
  static LIEMPHA = [TuViStar.LIEMTRINH, TuViStar.PHAQUAN];
  static LIEMVU = [TuViStar.LIEMTRINH, TuViStar.VUKHUC];
  static LIEMKINH = [TuViStar.LIEMTRINH, TuViStar.KINHDUONG];
  static LIEMHOA = [TuViStar.LIEMTRINH, TuViStar.HOATINH];
  static COTHANQUATU = [TuViStar.COTHAN, TuViStar.QUATU];
  static LOCCO = [TuViStar.LOCTON, TuViStar.COTHAN];
  static LOCHONG = [TuViStar.LOCTON, TuViStar.HONGLOAN];
  static LOCQUYEN = [TuViStar.LOCTON, TuViStar.HOAQUYEN, TuViStar.HOALOC];
  static LOCMA = [TuViStar.LOCTON, TuViStar.THIENMA];
  static LOCVU = [TuViStar.LOCTON, TuViStar.VUKHUC];
  static LOCTUE = [TuViStar.LOCTON, TuViStar.THAITUE, TuViStar.HOALOC];
  static LOCTONHOALOC = [TuViStar.LOCTON, TuViStar.HOALOC];
  static LOCBACSI = [TuViStar.LOCTON, TuViStar.HOALOC, TuViStar.BACSI];
  static THUONGSU = [TuViStar.THIENTHUONG, TuViStar.THIENSU];
  static TANGKHOC = [TuViStar.TANGMON, TuViStar.THIENKHOC];
  static TANGHO = [TuViStar.TANGMON, TuViStar.BACHHO];
  static TANGKHACH = [TuViStar.TANGMON, TuViStar.DIEUKHACH];
  static KHOCHU = [TuViStar.THIENKHOC, TuViStar.THIENHU];
  static KHOCKHACH = [TuViStar.THIENKHOC, TuViStar.DIEUKHACH];
  static KHOCHO = [TuViStar.THIENKHOC, TuViStar.BACHHO];
  static KHOCKHONG = [TuViStar.THIENKHOC, TuViStar.THIENKHONG];
  static KHOCRIEU = [TuViStar.THIENKHOC, TuViStar.THIENRIEU];
  static TRISAT = [TuViStar.LONGTRI, TuViStar.THATSAT];
  static HOKY = [TuViStar.BACHHO, TuViStar.HOAKY];
  static LINHMOC = [TuViStar.LINHTINH, TuViStar.MOCDUC];
  static SATPHA = [TuViStar.THATSAT, TuViStar.PHAQUAN];
  static KHONGKIEP = [TuViStar.DIAKHONG, TuViStar.DIAKIEP];
  static HONGDAO = [TuViStar.HONGLOAN, TuViStar.DAOHOA];
  static HONGRIEU = [TuViStar.HONGLOAN, TuViStar.THIENRIEU];
  static HONGCAI = [TuViStar.HONGLOAN, TuViStar.HOACAI];
  static HONGTHU = [TuViStar.HONGLOAN, TuViStar.TAUTHU];
  static HONGKY = [TuViStar.HONGLOAN, TuViStar.HOAKY];
  static KYLUONG = [TuViStar.HOAKY, TuViStar.THIENLUONG];
  static KYRIEU = [TuViStar.HOAKY, TuViStar.THIENRIEU];
  static RIEUHY = [TuViStar.THIENHY, TuViStar.THIENRIEU];
  static KYMOC = [TuViStar.HOAKY, TuViStar.MOCDUC];
  static CAIMOC = [TuViStar.HOACAI, TuViStar.MOCDUC];
  static PHATUONG = [TuViStar.TUONGQUAN, TuViStar.PHAQUAN];
  static QUYENLOC = [TuViStar.HOAQUYEN,TuViStar.HOALOC ];
  static QUYENLOCSINH = [
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.TRANGSINH,
  ];
  static TUTAHUU = [TuViStar.TUVI, TuViStar.TAPHU, TuViStar.HUUBAT];
  static TANGKHOCHOA = [TuViStar.TANGMON, TuViStar.THIENKHOC, TuViStar.HOATINH];
  static KHOCHOA = [TuViStar.THIENKHOC, TuViStar.HOATINH];
  static KHOIHINH = [TuViStar.THIENKHOI, TuViStar.THIENHINH];
  static PHAHINH = [TuViStar.PHAQUAN, TuViStar.THIENHINH];
  static PHAKINH = [TuViStar.PHAQUAN, TuViStar.KINHDUONG];
  static PHAKY = [TuViStar.PHAQUAN, TuViStar.HOAKY];
  static SATLINH = [TuViStar.THATSAT, TuViStar.LINHTINH];
  static SATDA = [TuViStar.THATSAT, TuViStar.DALA];
  static SATHINH = [TuViStar.THATSAT, TuViStar.THIENHINH];
  static HINHLINH = [TuViStar.THIENHINH, TuViStar.LINHTINH];
  static HINHLOC = [TuViStar.THIENHINH, TuViStar.LOCTON];
  static HINHVIET = [TuViStar.THIENHINH, TuViStar.THIENVIET];
  static HINHMA = [TuViStar.THIENHINH, TuViStar.THIENMA];
  static HINHAN = [TuViStar.THIENHINH, TuViStar.ANQUANG];
  static THAMVU = [TuViStar.VANXUONG, TuViStar.VUKHUC];
  static PHATHAM = [TuViStar.THAMLANG, TuViStar.PHAQUAN];
  static THAMHOA = [TuViStar.THAMLANG, TuViStar.HOATINH];
  static THAMHINH = [TuViStar.THAMLANG, TuViStar.THIENHINH];
  static THAIPHUJ = [TuViStar.THAI, TuViStar.TUPHUF, TuViStar.TRUCPHUF];
  static LONGDIEU = [TuViStar.THANHLONG, TuViStar.DIEUKHACH];
  static LONGPHUONG = [TuViStar.THANHLONG, TuViStar.PHUONGCAC];
  static LONGPHUONGTAU = [TuViStar.THANHLONG, TuViStar.PHUONGCAC,TuViStar.TAUTHU];
  static TUEKY = [TuViStar.THAITUE, TuViStar.HOAKY];
  static TUEVIET = [TuViStar.THAITUE, TuViStar.THIENVIET];
  static TUEDA = [TuViStar.THAITUE, TuViStar.DALA];
  static CUVU = [TuViStar.CUMON, TuViStar.VUKHUC];
  static XUONGKHUC = [TuViStar.VANXUONG, TuViStar.VANKHUC];
  static XUONGRIEU = [TuViStar.VANXUONG, TuViStar.THIENRIEU];
  static LOCXUONG = [TuViStar.VANXUONG, TuViStar.LOCTON, TuViStar.HOALOC];
  static CACCAI = [TuViStar.PHUONGCAC, TuViStar.HOACAI];
  static DAITIEUHAO = [TuViStar.DAIHAO, TuViStar.TIEUHAO];
  static KHOIQUYEN = [TuViStar.THIENKHOI, TuViStar.HOAQUYEN];
  static LINHKY = [TuViStar.LINHTINH, TuViStar.HOAKY];
  static LINHNGUYET = [TuViStar.LINHTINH, TuViStar.THAIAM];
  static LINHTUYET = [TuViStar.LINHTINH, TuViStar.TUYET];
  static QUYENVUONG = [TuViStar.HOAQUYEN, TuViStar.DEVUONG];
  static QUYENPHUONG = [TuViStar.HOAQUYEN, TuViStar.PHUONGCAC];
  static QUYENDAO = [TuViStar.HOAQUYEN, TuViStar.DAOHOA];
  static LAVONG = [TuViStar.THIENLA, TuViStar.DIAVONG];
  static HOATUYET = [TuViStar.HOATINH, TuViStar.TUYET];
  static HOAHAO = [TuViStar.HOATINH, TuViStar.DAIHAO, TuViStar.TIEUHAO];
  static DONGLUONG = [TuViStar.THIENDONG, TuViStar.THIENLUONG];
  static COLUONG = [TuViStar.THIENCO, TuViStar.THIENLUONG];
  static COHINH = [TuViStar.THIENCO, TuViStar.THIENHINH];
  static KHOALUONG = [TuViStar.HOAKHOA, TuViStar.THIENLUONG];
  static THIENDIAKHONG = [TuViStar.THIENKHONG, TuViStar.DIAKHONG];
  static TUANKY = [TuViStar.TUANKHONG, TuViStar.HOAKY];
  static LONGCAC = [TuViStar.LONGTRI, TuViStar.PHUONGCAC];
  static QUANGQUY = [TuViStar.ANQUANG, TuViStar.THIENQUY];
  static QUANPHUC = [TuViStar.THIENQUAN, TuViStar.THIENPHUC];
  static HINHHO = [TuViStar.THIENHINH, TuViStar.BACHHO];
  static QUANPHURF = [TuViStar.QUANPHUF, TuViStar.QUANPHUR];
  static VONGHINHKHOI = [
    TuViStar.THIENHINH,
    TuViStar.THIENKHOI,
    TuViStar.DIAVONG,
  ];
  static TUEKHOIVIET = [
    TuViStar.THAITUE,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
  ];
  static LOCMALONG = [TuViStar.LOCTON, TuViStar.THIENMA, TuViStar.THANHLONG];
  static LONGCACMO = [TuViStar.LONGTRI, TuViStar.PHUONGCAC, TuViStar.MO];
  static KHONGKIEPMOC = [TuViStar.DIAKHONG, TuViStar.DIAKIEP, TuViStar.MOCDUC];
  static HONGDAOHY = [TuViStar.HONGLOAN, TuViStar.DAOHOA, TuViStar.THIENHY];
  static NHATNGUYETKY = [TuViStar.THAIDUONG, TuViStar.THAIAM, TuViStar.HOAKY];
  static KINHHOALINH = [
    TuViStar.KINHDUONG,
    TuViStar.HOATINH,
    TuViStar.LINHTINH,
  ];
  static HUTUEKHACH = [TuViStar.THIENHU, TuViStar.THAITUE, TuViStar.DIEUKHACH];
  static KINHTUEKHACH = [
    TuViStar.KINHDUONG,
    TuViStar.THAITUE,
    TuViStar.DIEUKHACH,
  ];
  static LUUKIEP = [TuViStar.LUUHA, TuViStar.KIEPSAT, TuViStar.DIAKIEP];
  static LUUKIEPHINH = [
    TuViStar.LUUHA,
    TuViStar.KIEPSAT,
    TuViStar.DIAKIEP,
    TuViStar.THIENHINH,
  ];
  static CODONGLUONG = [
    TuViStar.THIENCO,
    TuViStar.THIENDONG,
    TuViStar.THIENLUONG,
  ];
  static XUONGKHUCLOC = [TuViStar.VANXUONG, TuViStar.VANKHUC, TuViStar.LOCTON];
  static XUONGKHUCTHAM = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THAMLANG,
  ];
  static XUONGKHUCLOC2 = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.LOCTON,
    TuViStar.HOALOC,
  ];
  static XUONGKHUCVAN = [TuViStar.VANXUONG, TuViStar.VANKHUC, TuViStar.VANTINH];
  static XUONGPHUDA = [TuViStar.VANXUONG, TuViStar.THIENPHUR, TuViStar.DALA];
  static XUONGKHUCHONG = [
    TuViStar.VANXUONG,
    TuViStar.THIENPHUR,
    TuViStar.HONGLOAN,
  ];
  static XUONGKHUCTUE = [TuViStar.VANXUONG, TuViStar.VANKHUC, TuViStar.THAITUE];
  static TUPHUVU = [TuViStar.TUVI, TuViStar.THIENPHUR, TuViStar.VUKHUC];
  static TUNHATNGUYET = [TuViStar.TUVI, TuViStar.THAIDUONG, TuViStar.THAIAM];
  static TUEDAPHUF = [
    TuViStar.THAITUE,
    TuViStar.DALA,
    TuViStar.QUANPHUF,
    TuViStar.QUANPHUR,
  ];
  static SATHINHLINH = [
    TuViStar.THATSAT,
    TuViStar.THIENHINH,
    TuViStar.LINHTINH,
  ];
  static SATDAKY = [TuViStar.THATSAT, TuViStar.DALA, TuViStar.HOAKY];
  static SATPHATHAM = [TuViStar.THATSAT, TuViStar.PHAQUAN, TuViStar.THAMLANG];
  static CULIEMKY = [TuViStar.CUMON, TuViStar.LIEMTRINH, TuViStar.HOAKY];
  static CUKINHDA = [TuViStar.CUMON, TuViStar.KINHDUONG, TuViStar.DALA];
  static KHOCHOAKINH = [
    TuViStar.THIENKHOC,
    TuViStar.HOATINH,
    TuViStar.KINHDUONG,
  ];
  static VUTHAMHOA = [TuViStar.VUKHUC, TuViStar.THAMLANG, TuViStar.HOATINH];
  static VULOCMA = [TuViStar.VUKHUC, TuViStar.HOALOC, TuViStar.THIENMA];
  static VUPHURLOC = [
    TuViStar.VUKHUC,
    TuViStar.THIENPHUR,
    TuViStar.LOCTON,
    TuViStar.HOALOC,
  ];
  static TUONGBINHAN = [
    TuViStar.TUONGQUAN,
    TuViStar.PHUCBINH,
    TuViStar.ANQUANG,
  ];
  static PHUCKHONGKIEP = [
    TuViStar.PHUCBINH,
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
  ];
  static PHAQUYENLOC = [TuViStar.TUEPHA, TuViStar.HOAQUYEN, TuViStar.HOALOC];
  static TAMKHONG = [
    TuViStar.DIAKHONG,
    TuViStar.TUANKHONG,
    TuViStar.TRIETKHONG,
  ];
  static THAMSATPHA = [TuViStar.THAMLANG, TuViStar.THATSAT, TuViStar.PHAQUAN];
  static THAMVUVIET = [TuViStar.THAMLANG, TuViStar.THIENVIET, TuViStar.VUKHUC];
  static PHUCHINHVIET = [
    TuViStar.PHUCBINH,
    TuViStar.THIENVIET,
    TuViStar.THIENHINH,
  ];
  static TANGKYDA = [TuViStar.TANGMON, TuViStar.HOAKY, TuViStar.DALA];
  static TANGTUELUONG = [
    TuViStar.TANGMON,
    TuViStar.THAITUE,
    TuViStar.THIENLUONG,
  ];
  static TANGDAODUONG = [TuViStar.TANGMON, TuViStar.DAOHOA, TuViStar.DUONG];
  static TANGHOALINH = [TuViStar.TANGMON, TuViStar.HOATINH, TuViStar.LINHTINH];
  static KHUCTUELUONG = [
    TuViStar.VUKHUC,
    TuViStar.VANKHUC,
    TuViStar.THAITUE,
    TuViStar.THIENLUONG,
  ];
  static RIEUKYDA = [TuViStar.THIENRIEU, TuViStar.HOAKY, TuViStar.DALA];
  static KHOAQUYENLOC = [TuViStar.HOAKHOA, TuViStar.HOAQUYEN, TuViStar.HOALOC];
  static DATUEHO = [TuViStar.DALA, TuViStar.THAITUE, TuViStar.BACHHO];
  static HOKHOCHU = [TuViStar.THIENKHOC, TuViStar.THIENHU, TuViStar.BACHHO];
  static DATUEKY = [TuViStar.DALA, TuViStar.THAITUE, TuViStar.HOAKY];
  static LIEMTHAMPHUONG = [
    TuViStar.LIEMTRINH,
    TuViStar.THAMLANG,
    TuViStar.PHUONGCAC,
  ];
  static LIEMKINHDA = [TuViStar.LIEMTRINH, TuViStar.KINHDUONG, TuViStar.DALA];
  static HONGHYRIEU = [TuViStar.HONGLOAN, TuViStar.THIENHY, TuViStar.THIENRIEU];
  static HONGTHAIDAO = [TuViStar.HONGLOAN, TuViStar.THAI, TuViStar.DAOHOA];
  static HONGCAIDAO = [TuViStar.HONGLOAN, TuViStar.HOACAI, TuViStar.DAOHOA];
  static HONGRIEUDAO = [TuViStar.HONGLOAN, TuViStar.THIENRIEU, TuViStar.DAOHOA];
  static HONGDADAO = [TuViStar.HONGLOAN, TuViStar.DALA, TuViStar.DAOHOA];
  static DAKHONGKIEP = [TuViStar.DALA, TuViStar.DIAKHONG, TuViStar.DIAKIEP];
  static DONGTAHUU = [TuViStar.THIENDONG, TuViStar.TAPHU, TuViStar.HUUBAT];
  static MASINHVUONG = [TuViStar.THIENMA, TuViStar.TRANGSINH, TuViStar.DEVUONG];
  static LONGKHONGKIEP = [
    TuViStar.THANHLONG,
    TuViStar.DIAKHONG,
    TuViStar.KIEPSAT,
  ];
  static PHUONGKHONGKIEP = [
    TuViStar.PHUONGCAC,
    TuViStar.DIAKHONG,
    TuViStar.KIEPSAT,
  ];
  static HINHKHONGKIEP = [
    TuViStar.THIENHINH,
    TuViStar.DIAKHONG,
    TuViStar.KIEPSAT,
  ];
  static TUEKHONGKIEP = [TuViStar.THAITUE, TuViStar.DIAKHONG, TuViStar.KIEPSAT];
  static SINHVUONGTHAI = [TuViStar.TRANGSINH, TuViStar.DEVUONG, TuViStar.THAI];
  static KYRIEUHINH = [TuViStar.HOAKY, TuViStar.THIENRIEU, TuViStar.THIENHINH];
  static BENHPHUFHINH = [
    TuViStar.BENH,
    TuViStar.QUANPHUF,
    TuViStar.QUANPHUR,
    TuViStar.THIENHINH,
  ];
  static TUONGMAKHOA = [
    TuViStar.THIENTUONG,
    TuViStar.THIENMA,
    TuViStar.HOAKHOA,
  ];
  static HAOMOCKY = [
    TuViStar.DAIHAO,
    TuViStar.TIEUHAO,
    TuViStar.MOCDUC,
    TuViStar.HOAKY,
  ];
  static PHAHINHDA = [TuViStar.PHAQUAN, TuViStar.THIENHINH, TuViStar.DALA];
  static DONGLUONGPHA = [
    TuViStar.THIENDONG,
    TuViStar.THIENLUONG,
    TuViStar.PHAQUAN,
  ];
  static KIEPRIEUSAT = [TuViStar.DIAKIEP, TuViStar.THIENRIEU, TuViStar.KIEPSAT];
  static KIEPRIEUKHONG = [
    TuViStar.DIAKIEP,
    TuViStar.THIENRIEU,
    TuViStar.DIAKHONG,
  ];
  static KIEPHOAKY = [TuViStar.KIEPSAT, TuViStar.HOATINH, TuViStar.HOAKY];
  static KINHDAQUA = [TuViStar.KINHDUONG, TuViStar.DALA, TuViStar.QUATU];
  static PHURTUEHO = [TuViStar.THIENPHUR, TuViStar.THAITUE, TuViStar.BACHHO];
  static PHURSATLUONG = [
    TuViStar.THIENPHUR,
    TuViStar.KIEPSAT,
    TuViStar.THIENLUONG,
  ];
  static TUONGHONGDAO = [
    TuViStar.TUONGQUAN,
    TuViStar.HONGLOAN,
    TuViStar.DAOHOA,
  ];
  static CACGIAI = [
    TuViStar.PHUONGCAC,
    TuViStar.GIAITHAN
  ];
  static TAMGIAI = [TuViStar.THIENGIAI, TuViStar.DIAGIAI, TuViStar.GIAITHAN];
  static KIEPKHONGTUE = [
    TuViStar.DIAKIEP,
    TuViStar.KIEPSAT,
    TuViStar.DIAKHONG,
    TuViStar.THAITUE,
  ];
  static HAOHOKYHINH = [
    TuViStar.DAIHAO,
    TuViStar.TIEUHAO,
    TuViStar.BACHHO,
    TuViStar.HOAKY,
    TuViStar.THIENHINH,
  ];
  static PHUCTUONGTHAIVUONG = [
    TuViStar.PHUCBINH,
    TuViStar.TUONGQUAN,
    TuViStar.DEVUONG,
    TuViStar.THAI,
  ];
  static PHUCTUONGHONGDAO = [
    TuViStar.PHUCBINH,
    TuViStar.TUONGQUAN,
    TuViStar.HONGLOAN,
    TuViStar.DAOHOA,
  ];
  static PHUCTUONGHONGDAOTHAIVUONG = [
    TuViStar.PHUCBINH,
    TuViStar.TUONGQUAN,
    TuViStar.HONGLOAN,
    TuViStar.DAOHOA,
    TuViStar.DEVUONG,
    TuViStar.THAI,
  ];
  static HUKINHTUEKHACH = [
    TuViStar.THIENHU,
    TuViStar.KINHDUONG,
    TuViStar.THAITUE,
    TuViStar.DIEUKHACH,
  ];
  static THIEUDUONGAMDUCLONG = [
    TuViStar.THIEUDUONG,
    TuViStar.THIEUAM,
    TuViStar.THIENDUC,
    TuViStar.PHUCDUC,
    TuViStar.THANHLONG,
  ];
  static KINHDACOQUALINH = [
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.QUATU,
    TuViStar.COTHAN,
    TuViStar.LINHTINH,
  ];
  static HINHPHUCKHONGKIEP = [
    TuViStar.THIENHINH,
    TuViStar.PHUCBINH,
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
  ];
  static SINHVUONGTAHUU = [
    TuViStar.TRANGSINH,
    TuViStar.DEVUONG,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
  ];
  static KHOAQUYENTAHUU = [
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
  ];
  static KHOAQUYENLOCTAHUU = [
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
  ];
  static KHOAQUYENLOCMA = [
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.THIENMA,
  ];
  static KHOAQUYENLOCCU = [
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.CUMON,
  ];
  static TUPHUTUONGHONG = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.TUONGQUAN,
    TuViStar.HONGLOAN,
  ];
  static PHUCTUONGRIEUTHAI = [
    TuViStar.PHUCBINH,
    TuViStar.TUONGQUAN,
    TuViStar.THIENRIEU,
    TuViStar.THAI,
  ];
  static HINHLINHHOAVIET = [
    TuViStar.THIENHINH,
    TuViStar.LINHTINH,
    TuViStar.HOATINH,
    TuViStar.THIENVIET,
  ];
  static HINHLINHVIET = [
    TuViStar.THIENHINH,
    TuViStar.LINHTINH,
    TuViStar.THIENVIET,
  ];
  static HINHLINHHOAKIEP = [
    TuViStar.THIENHINH,
    TuViStar.LINHTINH,
    TuViStar.HOATINH,
    TuViStar.DIAKIEP,
    TuViStar.KIEPSAT,
  ];
  static DAOHONGSUYTUYET = [
    TuViStar.DAOHOA,
    TuViStar.HONGLOAN,
    TuViStar.SUY,
    TuViStar.TUYET,
  ];
  static DAOHONGDALINH = [
    TuViStar.DAOHOA,
    TuViStar.HONGLOAN,
    TuViStar.DALA,
    TuViStar.LINHTINH,
  ];
  static KINHDAKHONGKIEP = [
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
  ];
  static QUANPHUCANTHU = [
    TuViStar.THIENQUAN,
    TuViStar.THIENPHUC,
    TuViStar.ANQUANG,
    TuViStar.TAUTHU,
  ];
  static RIEUKYDAKYKIEPHINH = [
    TuViStar.THIENRIEU,
    TuViStar.HOAKY,
    TuViStar.DALA,
    TuViStar.DIAKIEP,
    TuViStar.KIEPSAT,
    TuViStar.KINHDUONG,
  ];
  static LOCMASINHTAHUU = [
    TuViStar.LOCTON,
    TuViStar.THIENMA,
    TuViStar.TRANGSINH,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
  ];
  static LOCKHONGKIEP = [TuViStar.LOCTON, TuViStar.DIAKHONG, TuViStar.DIAKIEP];
  static CUSATDALINH = [
    TuViStar.CUMON,
    TuViStar.THATSAT,
    TuViStar.DALA,
    TuViStar.LINHTINH,
  ];
  static KHOAQUYENLOCHINHANXUONGKHOIHONGBAT = [
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.THIENHINH,
    TuViStar.ANQUANG,
    TuViStar.VANXUONG,
    TuViStar.THIENKHOI,
    TuViStar.HONGLOAN,
    TuViStar.HUUBAT,
  ];
  static TUONGQUANGHINHBINH = [
    TuViStar.THIENTUONG,
    TuViStar.ANQUANG,
    TuViStar.THIENHINH,
    TuViStar.PHUCBINH,
  ];
  static HOAKINHKHONGKIEPKYHINH = [
    TuViStar.HOATINH,
    TuViStar.KINHDUONG,
    TuViStar.DIAKHONG,
    TuViStar.KIEPSAT,
    TuViStar.DIAKIEP,
    TuViStar.HOAKY,
    TuViStar.THIENHINH,
  ];
  static KINHKIEPKHONGHUMA = [
    TuViStar.KINHDUONG,
    TuViStar.DIAKIEP,
    TuViStar.DIAKHONG,
    TuViStar.THIENHU,
    TuViStar.THIENMA,
  ];
  static TUDATUYETCUDONG = [
    TuViStar.TUVI,
    TuViStar.DALA,
    TuViStar.TUYET,
    TuViStar.CUMON,
    TuViStar.THIENDONG,
  ];
  static PHUFKHOCKHACH = [
    TuViStar.QUANPHUF,
    TuViStar.QUANPHUR,
    TuViStar.THIENKHOC,
    TuViStar.DIEUKHACH
  ];
  static CUNHATPHUFKHOCKHACH = [
    TuViStar.QUANPHUF,
    TuViStar.QUANPHUR,
    TuViStar.THIENKHOC,
    TuViStar.DIEUKHACH,
    TuViStar.CUMON,
    TuViStar.THAIDUONG,
  ];
  static HONGDAOTHUDUCCAC = [
    TuViStar.HONGLOAN,
    TuViStar.DAOHOA,
    TuViStar.TAUTHU,
    TuViStar.LONGDUC,
    TuViStar.PHUONGCAC,
  ];
  static HONGDAOTHAIVUONG = [
    TuViStar.HONGLOAN,
    TuViStar.DAOHOA,
    TuViStar.THAIPHU,
    TuViStar.DEVUONG,
  ];
  static HONGDAOKINHKYMOC = [
    TuViStar.HONGLOAN,
    TuViStar.DAOHOA,
    TuViStar.KINHDUONG,
    TuViStar.HOAKY,
    TuViStar.MOCDUC,
  ];
  static CONGUYETDONGLUONG = [
    TuViStar.THIENCO,
    TuViStar.THAIAM,
    TuViStar.THIENDONG,
    TuViStar.THIENLUONG,
    TuViStar.THAIAM,
  ];
  static TUPHUVUTUONG = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.VUKHUC,
    TuViStar.TUONGQUAN,
  ];
  static TUPHUKHOIVIET = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
  ];
  static HONGLOCKHOA = [
    TuViStar.HONGLOAN,
    TuViStar.LOCTON,
    TuViStar.HOALOC,
    TuViStar.HOAKHOA,
  ];
  static HONGHINHRIEUKY = [
    TuViStar.HONGLOAN,
    TuViStar.THIENHINH,
    TuViStar.THIENRIEU,
    TuViStar.HOAKY,
  ];
  static HONGRIEUDAOTHU = [
    TuViStar.HONGLOAN,
    TuViStar.THIENRIEU,
    TuViStar.DAOHOA,
    TuViStar.TAUTHU,
  ];
  static HONGXUONGTAUKINH = [
    TuViStar.HONGLOAN,
    TuViStar.VANXUONG,
    TuViStar.TAUTHU,
    TuViStar.KINHDUONG,
  ];
  static XUONGTUELOCQUYENPHUCCAOTAHUU = [
    TuViStar.VANXUONG,
    TuViStar.THAITUE,
    TuViStar.LOCTON,
    TuViStar.HOAQUYEN,
    TuViStar.PHUCBINH,
    TuViStar.PHONGCAO,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
  ];
  static TAHUUKHOIHONG = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.THIENKHOI,
    TuViStar.HONGLOAN,
  ];
  static PHUONGLONGCAIHO = [
    TuViStar.PHUONGCAC,
    TuViStar.LONGDUC,
    TuViStar.HOACAI,
    TuViStar.BACHHO,
  ];
  static PHUONGLONGTUETHU = [
    TuViStar.PHUONGCAC,
    TuViStar.LONGDUC,
    TuViStar.THAITUE,
    TuViStar.TAUTHU,
  ];
  static CONGUYETDONGLUONGTAHUU = [
    TuViStar.THIENCO,
    TuViStar.THIENDONG,
    TuViStar.THIENLUONG,
    TuViStar.THAIAM,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.LONGDUC,
    TuViStar.PHUONGCAC,
  ];
  static HINHTANGHOKHOC = [
    TuViStar.THIENHINH,
    TuViStar.TANGMON,
    TuViStar.BACHHO,
    TuViStar.THIENKHOC,
  ];
  static HINHKIKINHDA = [
    TuViStar.THIENHINH,
    TuViStar.DALA,
    TuViStar.HOAKY,
    TuViStar.KINHDUONG,
  ];
  static SATPHALIEMTHAM = [
    TuViStar.THATSAT,
    TuViStar.PHAQUAN,
    TuViStar.LIEMTRINH,
    TuViStar.THAMLANG,
  ];
  static SATHINHKIEPKY = [
    TuViStar.THATSAT,
    TuViStar.THIENHINH,
    TuViStar.KIEPSAT,
    TuViStar.HOAKY,
  ];
  static XUONGKHUCKHOIVIET = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
  ];
  static XUONGKHUCTAHUU = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
  ];
  static XUONGKHUCTAHUUTUE = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.THAITUE,
  ];
  static XUONGKHUCVUKHOIVIET = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.VUKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
  ];
  static XUONGKHUCQUYENKY = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.HOAQUYEN,
    TuViStar.HOAKY,
  ];
  static XUONGKHUCQUANGQUY = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.ANQUANG,
    TuViStar.THIENQUY,
  ];
  static LIEMHOLINHRIEU = [
    TuViStar.LIEMTRINH,
    TuViStar.BACHHO,
    TuViStar.LINHTINH,
    TuViStar.THIENRIEU,
  ];
  static PHAKIEPHINHDA = [
    TuViStar.PHAQUAN,
    TuViStar.KIEPSAT,
    TuViStar.THIENHINH,
    TuViStar.DALA,
  ];
  static KINHDAHOA = [
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.HOATINH
  ];
  static KINHDAHOALINH = [
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.HOATINH,
    TuViStar.LINHTINH,
  ];
  static KINHDAKIEPKY = [
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.HOATINH,
    TuViStar.LINHTINH,
  ];
  static KIEPKHONGTHUONGSU = [
    TuViStar.KIEPSAT,
    TuViStar.THIENKHONG,
    TuViStar.THIENTHUONG,
    TuViStar.THIENSU,
  ];
  static CAIDAOKHUCMOC = [
    TuViStar.HOACAI,
    TuViStar.DAOHOA,
    TuViStar.VANKHUC,
    TuViStar.MOCDUC,
  ];
  static TAHUUXUONGKHUC = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
  ];
  static TAHUULINHHINH = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.LINHTINH,
    TuViStar.THIENHINH,
  ];
  static TAHUUKIEPKHONG = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
  ];
  static QUANGQUYQUANPHUCRIEUY = [
    TuViStar.ANQUANG,
    TuViStar.THIENQUY,
    TuViStar.THIENQUAN,
    TuViStar.THIENPHUC,
    TuViStar.THIENRIEU,
    TuViStar.THIENY,
  ];
  static KYHINHTHAIMOC = [
    TuViStar.HOAKY,
    TuViStar.THIENHINH,
    TuViStar.THAI,
    TuViStar.MOCDUC,
  ];
  static TAMKHONGKIETKY = [
    TuViStar.DIAKHONG,
    TuViStar.TUANKHONG,
    TuViStar.TRIETKHONG,
    TuViStar.KIEPSAT,
    TuViStar.HOAKY,
  ];
  static HOAKINHTHUONGSU = [
    TuViStar.HOATINH,
    TuViStar.KINHDUONG,
    TuViStar.THIENTHUONG,
    TuViStar.THIENSU,
  ];
  static HOALINHKHONGKIEP = [
    TuViStar.HOATINH,
    TuViStar.LINHTINH,
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
  ];
  static PHAHAOMOCKY = [
    TuViStar.PHAQUAN,
    TuViStar.DAIHAO,
    TuViStar.TIEUHAO,
    TuViStar.MOCDUC,
    TuViStar.HOAKY,
  ];
  static COCUTAHUUTUE = [
    TuViStar.THIENCO,
    TuViStar.CUMON,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.THAITUE,
  ];
  static COCU = [
    TuViStar.THIENCO,
    TuViStar.CUMON
  ];
  static CUPHA = [
    TuViStar.PHAQUAN,
    TuViStar.CUMON
  ];
  static HOKHOCRIEUTANG = [
    TuViStar.BACHHO,
    TuViStar.THIENKHOC,
    TuViStar.THIENRIEU,
    TuViStar.TANGMON,
  ];
  static NHIKHONGKIEP = [
    TuViStar.DIAKHONG,
    TuViStar.THIENKHONG,
    TuViStar.KIEPSAT,
    TuViStar.DIAKIEP,
  ];
  static PHUFTABUUTUONGQUOC = [
    TuViStar.QUANPHUF,
    TuViStar.QUANPHUR,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.TUONGQUAN,
    TuViStar.QUOCAN,
  ];
  static HAOQUYENLOCKIEPHOA = [
    TuViStar.DAIHAO,
    TuViStar.TIEUHAO,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.KIEPSAT,
    TuViStar.DIAKIEP,
    TuViStar.HOATINH,
  ];
  static TUKHONG = [
    TuViStar.DIAKHONG,
    TuViStar.TUANKHONG,
    TuViStar.TRIETKHONG,
    TuViStar.THIENKHONG,
  ];

  static HOKHOCTANGHUPHUF = [
    TuViStar.BACHHO,
    TuViStar.THIENKHOC,
    TuViStar.TANGMON,
    TuViStar.THIENHU,
    TuViStar.QUANPHUR,
    TuViStar.QUANPHUF,
  ];
  static SATPHALIEMTHAMHONG = [
    TuViStar.THATSAT,
    TuViStar.PHAQUAN,
    TuViStar.LIEMTRINH,
    TuViStar.THAMLANG,
    TuViStar.HONGLOAN,
  ];
  static SATDARIEUDUONGHOALINH = [
    TuViStar.THATSAT,
    TuViStar.DALA,
    TuViStar.THIENRIEU,
    TuViStar.DUONG,
    TuViStar.LINHTINH,
    TuViStar.HOATINH,
  ];
  static TAHUUXUONGKHUCTHAICAO = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THAI,
    TuViStar.PHONGCAO,
  ];
  static XUONGKHUCKHOTUETHU = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.HOAKHOA,
    TuViStar.THAITUE,
    TuViStar.TAUTHU,
  ];
  static KINHPHUCKHONGHAOHOA = [
    TuViStar.KINHDUONG,
    TuViStar.PHUCBINH,
    TuViStar.DIAKHONG,
    TuViStar.DAIHAO,
    TuViStar.TIEUHAO,
    TuViStar.HOATINH,
  ];
  static KYHOAKINHTHUONGSU = [
    TuViStar.HOAKY,
    TuViStar.HOATINH,
    TuViStar.KINHDUONG,
    TuViStar.THIENTHUONG,
    TuViStar.THIENSU,
  ];
  static NGUYETDONGLUONGTAHUU = [
    TuViStar.THAIAM,
    TuViStar.THIENDONG,
    TuViStar.THIENLUONG,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
  ];
  static TUPHURXUONGKHUCKHOIVIET = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
  ];
  static LAVONGTHAMLINHDA = [
    TuViStar.THIENLA,
    TuViStar.DIAVONG,
    TuViStar.VANXUONG,
    TuViStar.THAMLANG,
    TuViStar.LINHTINH,
    TuViStar.DALA,
  ];
  static TAHUULONGPHUONGRIEU = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.THANHLONG,
    TuViStar.PHUONGCAC,
    TuViStar.THIENRIEU,
  ];
  static TUPHURXUONGKHUCTAHUUKHOAQUYENLOC = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
  ];
  static TUPHURKHOIVIETTAHUUKHOAQUYENLOC = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
  ];
  static TUPHURCONGUYETDONGLUONG = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.THIENCO,
    TuViStar.THIENDONG,
    TuViStar.THIENLUONG,
    TuViStar.THAIAM,
  ];
  static TUPCONGUYETDONGLUONG = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.THIENCO,
    TuViStar.THIENDONG,
    TuViStar.THIENLUONG,
    TuViStar.THAIAM,
  ];
  static TUPHURTHAMKHOIVIETXUONGKHUCTAHUUKHOAQUYENLOC = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.THAMLANG,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
  ];
  static TUPHURKHOIVIETXUONGKHUCTAHUUKHOAQUYENLOC = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
  ];
  static TUPHURKHOAQUYEN = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN
  ];
  static TUPHURKHOAQUYENHINHANHONGKHOI = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.THIENHINH,
    TuViStar.ANQUANG,
    TuViStar.HONGLOAN,
    TuViStar.THIENKHOI,
  ];
  static TAHUUQUYENLOCNHATNGUYET = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.THAIDUONG,
    TuViStar.THAIAM,
  ];
  static TAHUULOCHINHYQUANGQUY = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOALOC,
    TuViStar.THIENHINH,
    TuViStar.THIENY,
    TuViStar.ANQUANG,
    TuViStar.THIENQUY,
  ];
  static TAHUUQUANGQUYPHUC = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.ANQUANG,
    TuViStar.THIENQUY,
    TuViStar.THIENQUAN,
    TuViStar.THIENPHUC,
  ];
  static XUONGKHUCKHOIVIETKHOATUEHINH = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.HOAKHOA,
    TuViStar.THAITUE,
    TuViStar.THIENHINH,
  ];
  static XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
  ];
  static XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCDUCCACHONGDAOXXX = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.LONGDUC,
    TuViStar.PHUONGCAC,
    TuViStar.HONGLOAN,
    TuViStar.DAOHOA,
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.THIENKHONG,
    TuViStar.THIENHINH,
    TuViStar.BACHHO,
  ];
  static XUONGKHUCTHUONGCACH = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.LONGTRI,
    TuViStar.PHUONGCAC,
    TuViStar.DAOHOA,
    TuViStar.LOCTON,
  ];
  static XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCHAO = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.DAIHAO,
    TuViStar.TIEUHAO,
  ];
  static TUTUONGXUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC = [
    TuViStar.TUVI,
    TuViStar.THIENTUONG,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
  ];
  static TUTUONGXUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCMAKINH = [
    TuViStar.TUVI,
    TuViStar.THIENTUONG,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.THIENMA,
    TuViStar.KINHDUONG,
  ];
  static XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHY = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.DAOHOA,
    TuViStar.HONGLOAN,
    TuViStar.THIENHY,
  ];
  static XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHYHOA = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.DAOHOA,
    TuViStar.HONGLOAN,
    TuViStar.THIENHY,
    TuViStar.HOATINH,
  ];
  static QUYQUANGTHAITOAKHOIHONG = [
    TuViStar.THIENQUY,
    TuViStar.ANQUANG,
    TuViStar.THAI,
    TuViStar.BATTOA,
    TuViStar.THIENKHOI,
    TuViStar.HONGLOAN,
  ];
  static XUONGKHUCTAHUUKHOAQUYENLOCKINHDAKHONGKIEP = [
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
  ];
  static TUPHUXUONGKHOIVIETMA = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.VANXUONG,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET,
    TuViStar.THIENMA,
  ];
  static TUPHUXUONGKHUCKHOIVIET = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.THIENKHOI,
    TuViStar.THIENVIET
  ];
  static PHUVUTUONGTAHUUKHOAQUYENLOC = [
    TuViStar.THIENPHUR,
    TuViStar.VUKHUC,
    TuViStar.THIENTUONG,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
  ];
  static TUPHUVUTUONGTAHUULONGPHUONGKHOAQUYENLOCAN = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.VUKHUC,
    TuViStar.THIENTUONG,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.THANHLONG,
    TuViStar.PHUONGCAC,
    TuViStar.HOAKHOA,
    TuViStar.HOAQUYEN,
    TuViStar.HOALOC,
    TuViStar.ANQUANG,
  ];
  static SINHVUONGHONGDAOTAHUUQUYENXUONG = [
    TuViStar.TRANGSINH,
    TuViStar.DEVUONG,
    TuViStar.HONGLOAN,
    TuViStar.DAOHOA,
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.HOAQUYEN,
    TuViStar.VANXUONG,
  ];
  static SATTUEKHONGPHUCKINHHAO = [
    TuViStar.THATSAT,
    TuViStar.THAITUE,
    TuViStar.THIENKHONG,
    TuViStar.PHUCBINH,
    TuViStar.KINHDUONG,
    TuViStar.DAIHAO,
    TuViStar.TIEUHAO,
  ];
  static HOALINHKYTUEHAOPHUC = [
    TuViStar.HOATINH,
    TuViStar.LINHTINH,
    TuViStar.HOAKY,
    TuViStar.THAITUE,
    TuViStar.PHUCBINH,
    TuViStar.DAIHAO,
    TuViStar.TIEUHAO,
  ];
  static KHONGKIEPSUYPHUTOAITUKY = [
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
    TuViStar.SUY,
    TuViStar.TUPHUF,
    TuViStar.TRUCPHUF,
    TuViStar.TU,
    TuViStar.BENHPHU,
    TuViStar.HOAKY,
  ];
  static KHACHKIEPPHUFCUNHAT = [
    TuViStar.DIEUKHACH,
    TuViStar.DIAKIEP,
    TuViStar.KIEPSAT,
    TuViStar.QUANPHUF,
    TuViStar.QUANPHUR,
    TuViStar.CUMON,
    TuViStar.THAIDUONG,
  ];
  static KHACHKIEPPHUF = [
    TuViStar.DIEUKHACH,
    TuViStar.DIAKIEP,
    TuViStar.KIEPSAT,
    TuViStar.QUANPHUF,
    TuViStar.QUANPHUR
  ];
  static KHONGKIEPDAKINHKYRIEUHINH = [
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
    TuViStar.DALA,
    TuViStar.KINHDUONG,
    TuViStar.KIEPSAT,
    TuViStar.HOAKY,
    TuViStar.THIENRIEU,
    TuViStar.THIENHINH,
  ];
  static KHONGKIEPHAOKYTUE = [
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
    TuViStar.DAIHAO,
    TuViStar.TIEUHAO,
    TuViStar.HOAKY,
    TuViStar.THAITUE,
  ];
  static KHONGKIEPDAKINHLIEMHINH = [
    TuViStar.DIAKHONG,
    TuViStar.DIAKIEP,
    TuViStar.DALA,
    TuViStar.KINHDUONG,
    TuViStar.LIEMTRINH,
    TuViStar.THIENHINH,
  ];
  static HINHPHIPHUBENHMOPHUCHO = [
    TuViStar.THIENHINH,
    TuViStar.PHILIEM,
    TuViStar.THIENPHUR,
    TuViStar.BENH,
    TuViStar.MO,
    TuViStar.PHUCBINH,
    TuViStar.BACHHO,
  ];
  static TAHUULONGPHUONGHONGDAOHYRIEU = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.THANHLONG,
    TuViStar.PHUONGCAC,
    TuViStar.HONGLOAN,
    TuViStar.DAOHOA,
    TuViStar.THIENHY,
    TuViStar.THIENRIEU,
  ];
  static TAHUULONGPHUONGHONGHI = [
    TuViStar.TAPHU,
    TuViStar.HUUBAT,
    TuViStar.THANHLONG,
    TuViStar.PHUONGCAC,
    TuViStar.HONGLOAN,
    TuViStar.THIENHY,
  ];
  static TUPHUCUNHATCONGUYETDONGLUONG = [
    TuViStar.TUVI,
    TuViStar.THIENPHUR,
    TuViStar.CUMON,
    TuViStar.THAIDUONG,
    TuViStar.THIENCO,
    TuViStar.THAIAM,
    TuViStar.THIENDONG,
    TuViStar.THIENLUONG,
  ];
  static TUVISTARRING = [
    TuViStar.TUVI,
    TuViStar.THIENCO,
    TuViStar.THAIDUONG,
    TuViStar.VUKHUC,
    TuViStar.THIENDONG,
    TuViStar.LIEMTRINH,
  ];
  static THIENPHUSTARRING = [
    TuViStar.THIENPHUR,
    TuViStar.THAIAM,
    TuViStar.THAMLANG,
    TuViStar.CUMON,
    TuViStar.THIENTUONG,
    TuViStar.THIENLUONG,
    TuViStar.THATSAT,
    TuViStar.PHAQUAN,
  ];
  static TRANGSINHSTARRING = [
    TuViStar.TRANGSINH,
    TuViStar.MOCDUC,
    TuViStar.QUANDOI,
    TuViStar.LAMQUAN,
    TuViStar.DEVUONG,
    TuViStar.SUY,
    TuViStar.BENH,
    TuViStar.TU,
    TuViStar.MO,
    TuViStar.TUYET,
    TuViStar.THAI,
    TuViStar.DUONG,
  ];
  static BaiTinhList = [
    TuViStar.TIEUHAO,
    TuViStar.DAIHAO,
    TuViStar.TANGMON,
    TuViStar.THIENKHOC,
    TuViStar.THIENHU,
    TuViStar.BACHHO,
  ];
  static TrungTinhList = [
    TuViStar.LOCTON,
    TuViStar.VANXUONG,
    TuViStar.VANKHUC,
    TuViStar.KINHDUONG,
    TuViStar.DALA,
    TuViStar.HUUBAT,
    TuViStar.THIENVIET,
    TuViStar.HOATINH,
    TuViStar.LINHTINH,
    TuViStar.HOALOC,
    TuViStar.HOAQUYEN,
    TuViStar.HOAKHOA,
    TuViStar.HOAKY,
    TuViStar.THAITUE,
    TuViStar.THIENMA,
    TuViStar.DIAKIEP,
    TuViStar.DIAKHONG,
    TuViStar.THIENKHONG,
    //TUANKHONG, TRIETKHONG
  ];

  static starGroupArray =  [
    ["TrungTinhList",TuViStarHelper.TrungTinhList],
    ["TUPHURXUONGKHUCTAHUUKHOAQUYENLOC",TuViStarHelper.TUPHURXUONGKHUCTAHUUKHOAQUYENLOC],
    ["HOALINH",TuViStarHelper.HOALINH],
    ["DAITIEUHAO",TuViStarHelper.DAITIEUHAO],
    ["KINHKY",TuViStarHelper.KINHKY],
    ["LAVONG",TuViStarHelper.LAVONG],
    ["KINHDAHOALINH",TuViStarHelper.KINHDAHOALINH],
    ["KINHDAHOA",TuViStarHelper.KINHDAHOA],
    ["QUYENLOC",TuViStarHelper.QUYENLOC],
    ["TUTUONGXUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC",TuViStarHelper.TUTUONGXUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC],
    ["PHUFTABUUTUONGQUOC",TuViStarHelper.PHUFTABUUTUONGQUOC],
    ["CAIDAOKHUCMOC",TuViStarHelper.CAIDAOKHUCMOC],
    ["KINHDA",TuViStarHelper.KINHDA],
    ["KHOAQUYENLOC",TuViStarHelper.KHOAQUYENLOC],
    ["XUONGKHUCTAHUUTUE",TuViStarHelper.XUONGKHUCTAHUUTUE],
    ["XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC",TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC],
    ["KYHINH",TuViStarHelper.KYHINH],
    ["HOALINH",TuViStarHelper.HOALINH],
    ["KIEPHINH",TuViStarHelper.KIEPHINH],
    ["SATHINH",TuViStarHelper.SATHINH],
    ["SATKYHINH",TuViStarHelper.SATKYHINH],
    ["KHOIQUYEN",TuViStarHelper.KHOIQUYEN],
    ["LOCTONHOALOC",TuViStarHelper.LOCTONHOALOC],
    ["HOKHOCRIEUTANG",TuViStarHelper.HOKHOCRIEUTANG],
    ["XUONGKHUC",TuViStarHelper.XUONGKHUC],
    ["KINHDA",TuViStarHelper.KINHDA],
    ["KINHDAQUA",TuViStarHelper.KINHDAQUA],
    ["LOCMA",TuViStarHelper.LOCMA],
    ["KHOALOC",TuViStarHelper.KHOALOC],
    ["TAHUUKHOIHONG",TuViStarHelper.TAHUUKHOIHONG],
    ["RIEUKYDAKYKIEPHINH",TuViStarHelper.RIEUKYDAKYKIEPHINH],
    ["XUONGKHUCQUANGQUY",TuViStarHelper.XUONGKHUCQUANGQUY],
    ["PHUONGLONGCAIHO",TuViStarHelper.PHUONGLONGCAIHO],
    ["LOCMASINHTAHUU",TuViStarHelper.LOCMASINHTAHUU],
    ["XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCHAO",TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCHAO],
    ["TUONGQUANGHINHBINH",TuViStarHelper.TUONGQUANGHINHBINH],
    ["KHONGKIEPDAKINHKYRIEUHINH",TuViStarHelper.KHONGKIEPDAKINHKYRIEUHINH],
    ["XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHYHOA",TuViStarHelper.XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHYHOA],
    ["TUPHURTHAMKHOIVIETXUONGKHUCTAHUUKHOAQUYENLOC",TuViStarHelper.TUPHURTHAMKHOIVIETXUONGKHUCTAHUUKHOAQUYENLOC],
    ["QUYQUANGTHAITOAKHOIHONG",TuViStarHelper.QUYQUANGTHAITOAKHOIHONG],
    ["XUONGTUELOCQUYENPHUCCAOTAHUU",TuViStarHelper.XUONGTUELOCQUYENPHUCCAOTAHUU],
    ["TAHUULOCHINHYQUANGQUY",TuViStarHelper.TAHUULOCHINHYQUANGQUY],
    ["TAHUULINHHINH",TuViStarHelper.TAHUULINHHINH],
    ["XUONGKHUCVAN",TuViStarHelper.XUONGKHUCVAN],
    ["XUONGRIEU",TuViStarHelper.XUONGRIEU],
    ["COTHAIAM",TuViStarHelper.COTHAIAM],
    ["CONGUYETDONGLUONG",TuViStarHelper.CONGUYETDONGLUONG],
    ["KHONGKIEP",TuViStarHelper.KHONGKIEP],
    ["TAHUU",TuViStarHelper.TAHUU],
    ["LINHTUYET",TuViStarHelper.LINHTUYET],
    ["PHAKY",TuViStarHelper.PHAKY],
    ["LINHKY",TuViStarHelper.LINHKY],
    ["TUPHUR",TuViStarHelper.TUPHUR],
    ["NHIKHONGKIEP",TuViStarHelper.NHIKHONGKIEP],
    ["KINHBAT",TuViStarHelper.KINHBAT],
    ["XUONGKHUCTAHUU",TuViStarHelper.XUONGKHUCTAHUU],
    ["KYRIEUHINH",TuViStarHelper.KYRIEUHINH],
    ["XUONGKHUCLOC",TuViStarHelper.XUONGKHUCLOC],
    ["KIEPKY",TuViStarHelper.KIEPKY],
    ["KINHKIEPKHONGHUMA",TuViStarHelper.KINHKIEPKHONGHUMA],
    ["XUONGKHUCKHOIVIETKHOATUEHINH",TuViStarHelper.XUONGKHUCKHOIVIETKHOATUEHINH],
    ["HOKHOCTANGHUPHUF",TuViStarHelper.HOKHOCTANGHUPHUF],
    ["XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHY",TuViStarHelper.XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHY],
    ["LOCTUE",TuViStarHelper.LOCTUE],
    ["CACQUYEN",TuViStarHelper.CACQUYEN],
    ["CUNHAT",TuViStarHelper.CUNHAT],
    ["LINHNGUYET",TuViStarHelper.LINHNGUYET],
    ["COCU",TuViStarHelper.COCU],
    ["PHATHAM",TuViStarHelper.PHATHAM],
    ["QUYENPHUONG",TuViStarHelper.QUYENPHUONG],
    ["HOATUYET",TuViStarHelper.HOATUYET],
    ["KIEPRIEUSAT",TuViStarHelper.KIEPRIEUSAT],
    ["QUYENVUONG",TuViStarHelper.QUYENVUONG],
    ["LOCXUONG",TuViStarHelper.LOCXUONG],
    ["HINHVIET",TuViStarHelper.HINHVIET],
    ["HOAHAO",TuViStarHelper.HOAHAO],
    ["LONGPHUONGTAU",TuViStarHelper.LONGPHUONGTAU],
    ["CUPHA",TuViStarHelper.CUPHA],
    ["CACGIAI",TuViStarHelper.CACGIAI],
    ["KIEPKHONG",TuViStarHelper.KIEPKHONG],
    ["LIEMDUONG",TuViStarHelper.LIEMDUONG],
    ["HONGDAO",TuViStarHelper.HONGDAO],
    ["THAMHINH",TuViStarHelper.THAMHINH],
    ["KINHHOALINH",TuViStarHelper.KINHHOALINH],
    ["CONGUYETDONGLUONGTAHUU",TuViStarHelper.CONGUYETDONGLUONGTAHUU],
    ["SATPHALIEMTHAM",TuViStarHelper.SATPHALIEMTHAM],
    ["TUPCONGUYETDONGLUONG",TuViStarHelper.TUPCONGUYETDONGLUONG],
    ["HUTUEKHACH",TuViStarHelper.HUTUEKHACH],
    ["KIEPKHONGTUE",TuViStarHelper.KIEPKHONGTUE],
    ["HOAKINHKHONGKIEPKYHINH",TuViStarHelper.HOAKINHKHONGKIEPKYHINH],
    ["TUPHURKHOIVIETXUONGKHUCTAHUUKHOAQUYENLOC",TuViStarHelper.TUPHURKHOIVIETXUONGKHUCTAHUUKHOAQUYENLOC],
    ["TUTUONGXUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCMAKINH",TuViStarHelper.TUTUONGXUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCMAKINH],
    ["QUANGQUYQUANPHUCRIEUY",TuViStarHelper.QUANGQUYQUANPHUCRIEUY],
    ["TUPHUXUONGKHOIVIETMA",TuViStarHelper.TUPHUXUONGKHOIVIETMA],
    ["DONGLUONG",TuViStarHelper.DONGLUONG],
    ["LOCCO",TuViStarHelper.LOCCO],
    ["LOCHONG",TuViStarHelper.LOCHONG],
    ["HINHLOC",TuViStarHelper.HINHLOC],
    ["NHATLOC",TuViStarHelper.NHATLOC],
    ["HOAVIET",TuViStarHelper.HOAVIET],
    ["PHUFKHOCKHACH",TuViStarHelper.PHUFKHOCKHACH],
    ["TUPHURKHOAQUYEN",TuViStarHelper.TUPHURKHOAQUYEN],
    ["KINHTUEKHACH",TuViStarHelper.KINHTUEKHACH],
    ["KHACHKIEPPHUF",TuViStarHelper.KHACHKIEPPHUF],
    ["KHACHKIEPPHUF",TuViStarHelper.KHACHKIEPPHUF],
    ["HINHMA",TuViStarHelper.HINHMA],
    ["XUONGKHUCKHOIVIET",TuViStarHelper.XUONGKHUCKHOIVIET],
    ["COLUONG",TuViStarHelper.COLUONG],
    ["TUEDA",TuViStarHelper.TUEDA],
    ["THIENDIAKHONG",TuViStarHelper.THIENDIAKHONG],
    ["CUVU",TuViStarHelper.CUVU],
    ["TUKHUC",TuViStarHelper.TUKHUC],
    ["COLUONG",TuViStarHelper.COLUONG],
    ["KINHDAKHONGKIEP",TuViStarHelper.KINHDAKHONGKIEP] /*,

HERE

    ["",TuViStarHelper.],
    ["",TuViStarHelper.],
    ["",TuViStarHelper.],
    ["",TuViStarHelper.],
    ["",TuViStarHelper.],
    ["",TuViStarHelper.],
    ["",TuViStarHelper.],
    */
  ];

  static findStarGroupName (name: string) : TuViStar[] {
    const found = TuViStarHelper.starGroupArray.find((element) => element[0]===name) ;
    if ( found ) {
      return found[1] as TuViStar[]
    } else{
      console.log("findStarGroupName not found",name)
    }
    return [];
  }

  static toStarGroupList (name: string) : string {
    const starList = TuViStarHelper.findStarGroupName(name);
    let res =""
    let sep = ""
    for (let index = 0; index < starList.length; index++) {
      const star = starList[index];
      res+=sep+star.getName()
      sep = "/"
    }
    return res;
  }

  static TuViRingOmenStar = [
    // X Menh
    [
            // Omen F1
            [TuViStar.TUVI, TuViStar.THIENCO,
                    TuViStar.THIENPHUR,
                    TuViStar.CUMON, TuViStar.LONGTRI,
                    TuViStar.THIENLUONG,
                    TuViStar.PHAQUAN, TuViStar.DAOHOA,
                    TuViStar.HOALOC,
                    TuViStar.HOAKHOA, TuViStar.HOAQUYEN,
                    TuViStar.LOCTON, TuViStar.PHONGCAO,
                    TuViStar.QUOCAN, TuViStar.HOACAI,
                    TuViStar.THIENKHOI,
                    TuViStar.VANKHUC, TuViStar.VANXUONG,
                    TuViStar.TUONGQUAN,
                    TuViStar.THAIPHU,
                    TuViStar.THIENHINH, TuViStar.DIAGIAI, TuViStar.THIENGIAI, TuViStar.GIAITHAN,
                    TuViStar.DEVUONG, TuViStar.PHUONGCAC, TuViStar.LIEMTRINH, TuViStar.THAMLANG,
                    TuViStar.THIENMA, TuViStar.TAUTHU,],
            // Omen F2
            [TuViStar.THAIAM, TuViStar.THIENTUONG, TuViStar.HUUBAT,
                    TuViStar.THIENTHO, TuViStar.TRANGSINH, TuViStar.THAIDUONG,
                    TuViStar.THIENKHO,],
            // Omen F3
            [TuViStar.HONGLOAN, TuViStar.HYTHAN, TuViStar.THIENPHUC, TuViStar.LUCSI,
                    TuViStar.VANTINH, TuViStar.THIENQUY, TuViStar.THIENHY, TuViStar.THIEUDUONG,
                    TuViStar.BACHHO, TuViStar.THANHLONG,TuViStar.TAPHU,TuViStar.THAITUE,
            ],
            // Omen F4
            [TuViStar. BACSI, TuViStar. QUANPHUF,
                    TuViStar.PHUCDUC,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC,
                    TuViStar.VUKHUC,TuViStar.THATSAT, TuViStar.THIENTAI, TuViStar.LINHTINH,
                    TuViStar.THIENKHOC, TuViStar. THIENHU, TuViStar.NGUYETDUC, TuViStar. DALA,
                   TuViStar.THIENDONG, TuViStar.LONGDUC, TuViStar.BATTOA,TuViStar.KINHDUONG,
                   TuViStar.LUUHA, TuViStar.THIENKHONG, TuViStar. THIENVIET,
                    TuViStar.TAMTHAI,
            ],
            // Omen D1
            [TuViStar.DIEUKHACH, TuViStar.HOAKY, TuViStar.TU, TuViStar. THIENLA,
                    TuViStar.PHILIEM, TuViStar.TUYET, TuViStar.DAIHAO,
                    TuViStar. TIEUHAO,TuViStar.TANGMON,
                    TuViStar. TUPHUF, TuViStar.THAI, TuViStar.QUANDOI,
                    TuViStar. THIENTRU,TuViStar.MO, TuViStar.TUEPHA, TuViStar.THIENRIEU, TuViStar.TRIETKHONG,],
            // Omen D2
            [TuViStar. LAMQUAN,TuViStar.PHUCBINH, TuViStar. HOATINH,
                    TuViStar. COTHAN, TuViStar. DAUQUAN, TuViStar. QUATU, TuViStar. TRUCPHUF,],
            // Omen D3
            [TuViStar. QUANPHUR, TuViStar.PHATOAI,],
            // Omen D4
            [TuViStar.BENH, TuViStar.BENHPHU,
                    TuViStar.DIAKHONG, TuViStar. DIAKIEP,
                    TuViStar. KIEPSAT, TuViStar. THIENSU,
                    TuViStar. DIAVONG]],
    // X PhuMau
    [
            // Omen F1
            [TuViStar.THIENTUONG, TuViStar.HOAKHOA, TuViStar.HUUBAT,
                    TuViStar.VANKHUC, TuViStar.DAOHOA, TuViStar.BATTOA, TuViStar.THIENMA,
                    TuViStar.VANXUONG, TuViStar.DEVUONG, TuViStar.TUONGQUAN, TuViStar.TAMTHAI,],
            // Omen F2
            [TuViStar.THIENLUONG, TuViStar.PHUONGCAC, TuViStar. HOATINH, TuViStar.LOCTON,
                    TuViStar.THIENCO, TuViStar.TRANGSINH, TuViStar.THIENPHUR, TuViStar.THIENKHOI,

            ],
            // Omen F3
            [TuViStar.TUVI, TuViStar.VUKHUC, TuViStar.THIENDONG, TuViStar.HYTHAN, TuViStar.THIENPHUC, TuViStar.THAIDUONG,
                    TuViStar.THIENQUY, TuViStar.ANQUANG,TuViStar.TAPHU, TuViStar.THAIAM,],
            // Omen F4
            [TuViStar.THAMLANG, TuViStar. BACSI,TuViStar.PHUCDUC,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC,
                    TuViStar.THIENGIAI, TuViStar.THIENHY, TuViStar.LONGTRI,
                    TuViStar.DIAGIAI, TuViStar.GIAITHAN, TuViStar.NGUYETDUC, TuViStar.THIENTAI, TuViStar.VANTINH,
                    TuViStar.LONGDUC, TuViStar.LIEMTRINH, TuViStar.CUMON, TuViStar.THIENRIEU,
                    TuViStar.THANHLONG, TuViStar.THIENTHO, TuViStar. QUATU,
            ],
            // Omen D1
            [TuViStar.DIEUKHACH, TuViStar.PHILIEM,
                    TuViStar.DIAKHONG, TuViStar.BENH,TuViStar.THATSAT, TuViStar.TU, TuViStar.LINHTINH,
                    TuViStar.TUYET, TuViStar.DAIHAO, TuViStar. TIEUHAO,
                    TuViStar. COTHAN, TuViStar. DAUQUAN, TuViStar.PHUCBINH,
                    TuViStar. TUPHUF, TuViStar. THIENTRU,TuViStar.MO, TuViStar.THAI, TuViStar.BACHHO, TuViStar.PHATOAI,
                    TuViStar.THIENKHOC,
            ],
            // Omen D2
            [TuViStar. HOAKY, TuViStar. DALA,TuViStar.KINHDUONG, TuViStar.PHAQUAN, TuViStar. TRUCPHUF,
                   TuViStar.THAITUE,
            ],
            // Omen D3
            [
                    TuViStar.THIENHINH,
            ],
            // Omen D4
            [TuViStar.TANGMON, TuViStar. DIAKIEP, TuViStar.TRIETKHONG,]],
    // XTuViStar.PHUCDUC
    [
            // Omen F1
            [TuViStar.HOALOC, TuViStar.DIAGIAI, TuViStar.THIENGIAI, TuViStar.DEVUONG,
              TuViStar.PHUONGCAC, TuViStar.GIAITHAN, TuViStar.THIENPHUC,
                    TuViStar.DAOHOA,TuViStar.MO, TuViStar.THIENQUY, TuViStar.QUOCAN, TuViStar.ANQUANG, TuViStar.THIENKHOI,
            ],
            // Omen F2
            [TuViStar.CUMON,
                    TuViStar.LOCTON, TuViStar.VANXUONG,
                    TuViStar.LUCSI, TuViStar.THIENTHO,
                    TuViStar.TRANGSINH,
                    TuViStar. THIENHU, TuViStar.LONGTRI, TuViStar.VANKHUC,

            ],
            // Omen F3
            [TuViStar.TUONGQUAN, TuViStar.THANHLONG,
                    TuViStar.HYTHAN, TuViStar.THIENTUONG, TuViStar.BATTOA, TuViStar.THAIAM, TuViStar.VUKHUC,
                    TuViStar.TUVI, TuViStar.THIENPHUR, TuViStar.TAMTHAI,],
            // Omen F4
            [TuViStar.THIENDONG, TuViStar.THIENLUONG, TuViStar. BACSI,
              TuViStar.DUONG, TuViStar.HOAQUYEN, TuViStar.HUUBAT,
                    TuViStar.HONGLOAN,
                   TuViStar.PHUCDUC, TuViStar.THIENMA,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC,
                    TuViStar.THIENHY,TuViStar.TAPHU,
                    TuViStar.LONGDUC, TuViStar.THIENCO,
                    TuViStar.NGUYETDUC, TuViStar.THIENTAI, TuViStar.VANTINH, TuViStar.THAIDUONG, ],
            // Omen D1
            [TuViStar. DALA, TuViStar. HOATINH, TuViStar.PHAQUAN, TuViStar.THIENKHOC,
                    TuViStar.DIEUKHACH, TuViStar. HOAKY, TuViStar.THAI, TuViStar.BACHHO,
                    TuViStar. COTHAN, TuViStar. DAUQUAN, TuViStar.BENH,TuViStar.THATSAT, TuViStar.TU,
                    TuViStar.PHUCBINH, TuViStar.KINHDUONG,
                    TuViStar.THIENHINH, TuViStar. TUPHUF, TuViStar. THIENTRU, TuViStar.LIEMTRINH,
                    TuViStar.THIENRIEU, TuViStar.LINHTINH, TuViStar. TRUCPHUF, TuViStar.TRIETKHONG,TuViStar.QUANDOI,],
            // Omen D2
            [TuViStar.TUYET, TuViStar.DAIHAO, TuViStar. QUATU,
                    TuViStar. TIEUHAO, TuViStar.THIENKHONG, TuViStar.PHATOAI,
                   TuViStar.THAITUE,],
            // Omen D3
            [TuViStar.DIAKHONG, TuViStar. DIAKIEP],
            // Omen D4
            [
                   TuViStar.TANGMON

            ]],
    // X DienTrach
    [
            // Omen F1
            [
                    TuViStar.PHONGCAO,
            ],
            // Omen F2
            [TuViStar.VUKHUC, TuViStar.THIENPHUR, TuViStar.LONGTRI, TuViStar.LOCTON,
                    TuViStar.THIENTUONG, TuViStar.THIENLUONG, TuViStar.HUUBAT, TuViStar.TU, TuViStar.DAOHOA, TuViStar.THIENQUY,
                    TuViStar.THIENMA, TuViStar.TAMTHAI, TuViStar.PHUONGCAC, TuViStar.THIENDONG, TuViStar.ANQUANG,
                    TuViStar.THIENCO, TuViStar.VANKHUC, TuViStar.TUVI, TuViStar.VANXUONG,
                    TuViStar.TUONGQUAN, TuViStar.THIENKHO, TuViStar.THAIAM,],
            // Omen F3
            [TuViStar.HOALOC, TuViStar.THIENPHUC, TuViStar.LONGDUC,TuViStar.TAPHU, TuViStar.THIENKHOI,],
            // Omen F4
            [TuViStar. BACSI, TuViStar. COTHAN, TuViStar. DAUQUAN, TuViStar. QUATU,
                    TuViStar. HOAKY,TuViStar.PHUCDUC, TuViStar.LIEMTRINH,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC, TuViStar.THIENTHO,
                    TuViStar.THIENHY, TuViStar.NGUYETDUC, TuViStar.BATTOA, TuViStar.THANHLONG,
                    TuViStar.DEVUONG, TuViStar.THIENTAI, TuViStar.VANTINH, TuViStar.THAIDUONG,
                    TuViStar.TRANGSINH, TuViStar.DIAKHONG,],
            // Omen D1
            [TuViStar.DIEUKHACH, TuViStar.TUYET, TuViStar.BENH, TuViStar.THIENHINH,
                   TuViStar.KINHDUONG, TuViStar.THAI, TuViStar.BACHHO, TuViStar.THIENRIEU, TuViStar.THIENKHOC,
                    TuViStar.DAIHAO, TuViStar. TIEUHAO,TuViStar.TANGMON, TuViStar.DIAGIAI, TuViStar.THIENGIAI, TuViStar.GIAITHAN,
                   TuViStar.THATSAT,TuViStar.PHUCBINH, TuViStar. TUPHUF, TuViStar. THIENTRU,TuViStar.MO,
                    TuViStar. TRUCPHUF,TuViStar.THAITUE,TuViStar.QUANDOI,
            ],
            // Omen D2
            [TuViStar.THIENKHONG, TuViStar. DIAKIEP, TuViStar. DALA, TuViStar.PHATOAI,
                    TuViStar.TRIETKHONG,],
            // Omen D3
            [
                    TuViStar. HOATINH, TuViStar.LINHTINH,
            ],
            // Omen D4
            []],
    // X QuanLoc
    [
            // Omen F1
            [TuViStar.THAIDUONG, TuViStar.THIENDONG, TuViStar.CUMON, TuViStar.LIEMTRINH,
                    TuViStar.THIENLUONG, TuViStar. BACSI, TuViStar.TUVI,
                    TuViStar. COTHAN, TuViStar. DAUQUAN, TuViStar.HOAQUYEN,TuViStar.THATSAT,
                    TuViStar.HUUBAT, TuViStar.PHILIEM, TuViStar.QUOCAN,
                    TuViStar. THIENHU, TuViStar.PHUONGCAC, TuViStar.THIENTUONG, TuViStar.TAPHU,
                    TuViStar.TUONGQUAN,],
            // Omen F2
            [TuViStar.LOCTON, TuViStar.THIENMA, TuViStar.VUKHUC, TuViStar.VANKHUC, TuViStar.THIENKHOI,],
            // Omen F3
            [TuViStar.THIENPHUC, TuViStar.VANTINH, TuViStar.DAOHOA, TuViStar.LONGDUC, TuViStar.HONGLOAN,
                    TuViStar.THIENCO, TuViStar.THANHLONG, TuViStar. QUATU,
                    TuViStar.THIENKHOC,TuViStar.ANQUANG, TuViStar.THIENPHUR,],
            // Omen F4
            [TuViStar.HYTHAN,TuViStar.PHUCDUC, TuViStar.PHONGCAO,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC, TuViStar.NGUYETDUC,
                    TuViStar.THIENGIAI, TuViStar.THIENHY, TuViStar.THIENHINH,
                    TuViStar.THIENQUY, TuViStar.DEVUONG, TuViStar.GIAITHAN, TuViStar.DIAGIAI,
                    TuViStar.THIENTAI, TuViStar. DALA, TuViStar. QUANPHUR, TuViStar.BATTOA,
                    TuViStar.BACHHO, TuViStar.THIENTHO, TuViStar.TRANGSINH, TuViStar.TAMTHAI, TuViStar.THAIAM,
                   TuViStar.THAITUE,],
            // Omen D1
            [TuViStar.DIEUKHACH, TuViStar. HOAKY, TuViStar.BENH, TuViStar. QUANPHUF, TuViStar.TU, TuViStar. TUPHUF,
                    TuViStar.TUYET, TuViStar.DAIHAO, TuViStar. TIEUHAO, TuViStar.SUY, TuViStar. DIAKIEP,
                   TuViStar.PHUCBINH, TuViStar. THIENTRU, TuViStar. HOATINH,TuViStar.MO,TuViStar.KINHDUONG, TuViStar.LINHTINH,
                   TuViStar.THAI, TuViStar.LUCSI, TuViStar.THIENRIEU, TuViStar.PHAQUAN, TuViStar.DIAKHONG,
                    TuViStar.TRIETKHONG,TuViStar.QUANDOI,],
            // Omen D2
            [TuViStar. TRUCPHUF,],
            // Omen D3
            [
                    TuViStar.PHATOAI,
            ],
            // Omen D4
            [

            ]],
    // X NoBoc
    [
            // Omen F1
            [
                    TuViStar.PHUONGCAC, TuViStar.BATTOA, TuViStar.TUVI, TuViStar.ANQUANG,TuViStar.TAPHU, TuViStar.TUONGQUAN,
                    TuViStar.TAMTHAI,
            ],
            // Omen F2
            [
                    TuViStar.THIENCO, TuViStar.THIENMA, TuViStar.THIENKHOI,
            ],
            // Omen F3
            [TuViStar.HOALOC, TuViStar.THIENPHUC, TuViStar.DAOHOA, TuViStar.LONGDUC,
                    TuViStar.HONGLOAN,TuViStar.KINHDUONG, TuViStar.VANXUONG,TuViStar.THAITUE,],
            // Omen F4
            [TuViStar.THAIAM,TuViStar.THATSAT, TuViStar. BACSI, TuViStar.THANHLONG,
                    TuViStar.HUUBAT,TuViStar.PHUCDUC, TuViStar. HOATINH, TuViStar.LINHTINH,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC, TuViStar.VANKHUC,
                    TuViStar.THIENGIAI, TuViStar.THIENHY, TuViStar.NGUYETDUC,
                    TuViStar.THIENQUY, TuViStar.DEVUONG, TuViStar.TRANGSINH, TuViStar.GIAITHAN, TuViStar.DIAGIAI, TuViStar.THIENTUONG,
                    TuViStar.THIENTAI, TuViStar.VANTINH, TuViStar.THAIDUONG, TuViStar. DALA, TuViStar.LIEMTRINH,
                    TuViStar.THIENTHO, TuViStar.THIENPHUR,
            ],
            // Omen D1
            [TuViStar.DIEUKHACH, TuViStar.TUYET, TuViStar.DAIHAO, TuViStar.BENH, TuViStar. QUANPHUR,
                    TuViStar. TIEUHAO, TuViStar. QUANPHUF, TuViStar.THIENHINH, TuViStar.TU,
                    TuViStar. TUPHUF, TuViStar. THIENTRU, TuViStar.LOCTON,
                    TuViStar.THAI, TuViStar.BACHHO, TuViStar.THIENRIEU, TuViStar.PHATOAI, TuViStar.DIAKHONG,
                    TuViStar.TRIETKHONG,TuViStar.QUANDOI,],
            // Omen D2
            [
                    TuViStar. COTHAN, TuViStar. DIAKIEP, TuViStar. DAUQUAN, TuViStar. QUATU, TuViStar.THIENKHOC,
                    TuViStar. TRUCPHUF,
            ],
            // Omen D3
            [
                   TuViStar.PHUCBINH,
            ],
            // Omen D4
            [

            ]],
    // X ThienDi
    [
            // Omen F1
            [TuViStar.PHUCBINH, TuViStar.QUOCAN, TuViStar.DIAGIAI, TuViStar.THIENGIAI, TuViStar.GIAITHAN, TuViStar.THIENTUONG,
                   TuViStar.THATSAT, TuViStar.BATTOA, TuViStar.HONGLOAN, TuViStar.TAPHU,
                    TuViStar.HUUBAT, TuViStar.LOCTON, TuViStar.VANKHUC, TuViStar.TUVI, TuViStar.VANXUONG, TuViStar.ANQUANG,
                    TuViStar.TUONGQUAN, TuViStar.TAMTHAI,],
            // Omen F2
            [ TuViStar.THAIAM, TuViStar.THIEUAM,
                    TuViStar.THIEUDUONG, TuViStar.VUKHUC,
                    TuViStar.THIENLUONG, TuViStar.LONGDUC,
                    TuViStar.DUONG, TuViStar.THIENPHUR, TuViStar.THIENKHOI,],
            // Omen F3
            [TuViStar.HOALOC, TuViStar.DAOHOA,
                    TuViStar. THIENVIET, TuViStar.PHUONGCAC, TuViStar.THIENPHUC,
                    TuViStar.THAIDUONG, TuViStar. BACSI,],
            // Omen F4
            [TuViStar.DEVUONG, TuViStar.TRANGSINH,TuViStar.PHUCDUC,TuViStar.KINHDUONG, TuViStar.THIENMA,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC, TuViStar.THIENTHO,
                    TuViStar.THIENHY, TuViStar.NGUYETDUC, TuViStar.THANHLONG,
                    TuViStar.THIENQUY, TuViStar.THIENTAI, TuViStar.VANTINH, TuViStar.LUUHA, TuViStar.LIEMTRINH],
            // Omen D1
            [TuViStar.PHAQUAN, TuViStar.BACHHO, TuViStar.THIENHINH,
                    TuViStar.DIEUKHACH, TuViStar.PHILIEM, TuViStar.BENH, TuViStar.DAIHAO, TuViStar.TU, TuViStar. TUPHUF,
                    TuViStar.SUY, TuViStar.THIENDONG, TuViStar. TIEUHAO, TuViStar.THIENKHOC,
                    TuViStar. THIENTRU, TuViStar. DALA,TuViStar.MO, TuViStar.TUYET, TuViStar.THAI, TuViStar.THIENRIEU,
                    TuViStar.DIAKHONG, TuViStar. TRUCPHUF, TuViStar.TRIETKHONG,TuViStar.QUANDOI,
            ],
            // Omen D2
            [TuViStar.THIENCO, TuViStar. COTHAN, TuViStar. DAUQUAN, TuViStar. HOATINH, TuViStar.LINHTINH, TuViStar. QUATU,
                   TuViStar.THAITUE,],
            // Omen D3
            [TuViStar.PHATOAI,],
            // Omen D4
            [TuViStar. DIAKIEP,]],
    // X TatAch
    [
            // Omen F1
            [TuViStar.TUVI, TuViStar.DIAGIAI, TuViStar.THIENGIAI, TuViStar.GIAITHAN, TuViStar.THIENPHUC,
                    TuViStar.VANKHUC, TuViStar.LUCSI, TuViStar.THIENY, TuViStar.ANQUANG,
                    TuViStar.THIENKHOI, TuViStar.TRIETKHONG,
            ],
            // Omen F2
            [TuViStar.THAMLANG, TuViStar. COTHAN, TuViStar. DAUQUAN, TuViStar.THIENCO,],
            // Omen F3
            [TuViStar.THANHLONG,TuViStar.KINHDUONG, TuViStar.VANXUONG, TuViStar.TUONGQUAN,],
            // Omen F4
            [TuViStar.THIENDONG, TuViStar. BACSI,TuViStar.PHUCDUC,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC,
                    TuViStar.THIENHY, TuViStar.HUUBAT, TuViStar.NGUYETDUC, TuViStar.LOCTON,
                    TuViStar.THIENQUY, TuViStar.THIENLUONG, TuViStar.THIENTAI, TuViStar.VANTINH,
                    TuViStar.THIENKHONG, TuViStar.THAI, TuViStar.THIENTHO, TuViStar.THIENMA,
                    TuViStar.THIENRIEU, TuViStar.TAPHU, TuViStar.TAMTHAI,],
            // Omen D1
            [TuViStar. HOAKY, TuViStar.TUYET, TuViStar.VUKHUC, TuViStar.TU,
                    TuViStar.DAIHAO, TuViStar. TIEUHAO, TuViStar.HYTHAN, TuViStar.DUONG, TuViStar. QUATU,
                    TuViStar. TUPHUF, TuViStar. THIENTRU,
                    TuViStar.DAOHOA, TuViStar.BACHHO, TuViStar.PHATOAI, TuViStar.LINHTINH,
                   TuViStar.MO, TuViStar.TUEPHA, TuViStar.LONGDUC, TuViStar.BATTOA, TuViStar.LIEMTRINH, TuViStar.PHAQUAN,
                    TuViStar.HOACAI,
            ],
            // Omen D2
            [
                    TuViStar.PHUONGCAC, TuViStar.THAIDUONG, TuViStar.DIEUKHACH,
            ],
            // Omen D3
            [TuViStar.THAITUE, TuViStar.DIAKHONG, TuViStar. TRUCPHUF,],
            // Omen D4
            [TuViStar.BENH, TuViStar.BENHPHU, TuViStar. DALA,TuViStar.THATSAT,
                    TuViStar. HOATINH, TuViStar.THIENKHOC, TuViStar.THIENHINH,
                    TuViStar. THIENHU,TuViStar.TANGMON, TuViStar.THIENTUONG, TuViStar. DIAKIEP,
                    TuViStar.TRANGSINH,TuViStar.QUANDOI,]],
    // X TaiBach
    [
            // Omen F1
            [TuViStar.THIENDONG, TuViStar.THAMLANG, TuViStar.THIENTHO, TuViStar. THIENDUC,TuViStar.PHUCDUC,
                    TuViStar. QUATU, TuViStar.THANHLONG, TuViStar.VUKHUC,
            ],
            // Omen F2
            [TuViStar.THIENPHUR,
                    TuViStar.HOALOC, TuViStar.HOAQUYEN,TuViStar.THATSAT,
                    TuViStar.TU, TuViStar.LONGDUC, TuViStar.THIENCO, TuViStar.ANQUANG,
                    TuViStar.THIENMA, TuViStar.THIENY, TuViStar.PHUONGCAC, TuViStar.THIENTUONG,
                    TuViStar.DAOHOA, TuViStar.THAIDUONG, TuViStar.LIEMTRINH,TuViStar.TAPHU,
                    TuViStar.TUONGQUAN, TuViStar.THIENKHO, TuViStar.TAMTHAI,
            ],
            // Omen F3
            [TuViStar.THIENPHUC, TuViStar.LOCTON, TuViStar.VANXUONG, TuViStar.THIENKHOI, TuViStar.THAIAM,],
            // Omen F4
            [TuViStar. BACSI, TuViStar. COTHAN,
                    TuViStar. HOAKY, TuViStar.HUUBAT, TuViStar.PHAQUAN,
                   TuViStar.THIENQUAN, TuViStar.VANKHUC, TuViStar.TUVI,
                    TuViStar.THIENLUONG, TuViStar.BATTOA,
                    TuViStar. THIENHU, TuViStar.THIENHINH, TuViStar.NGUYETDUC, TuViStar.DUONG,
                    TuViStar.THIENHY, TuViStar.THIENQUY, TuViStar.DEVUONG, TuViStar.THIENTAI, TuViStar.VANTINH,
                    TuViStar.BACHHO,],
            // Omen D1
            [TuViStar.DIEUKHACH, TuViStar.TUYET, TuViStar.BENH, TuViStar.THIENKHOC,
                    TuViStar.DAIHAO, TuViStar. TIEUHAO,TuViStar.TANGMON, TuViStar.DIAGIAI, TuViStar.THIENGIAI,
                    TuViStar.GIAITHAN, TuViStar. TUPHUF, TuViStar. THIENTRU, TuViStar. DALA,TuViStar.MO, TuViStar.TUEPHA,TuViStar.KINHDUONG,
                    TuViStar.THAI, TuViStar.THIENRIEU, TuViStar.PHATOAI, TuViStar. DAUQUAN, TuViStar.DIAKHONG,
                    TuViStar. TRUCPHUF,TuViStar.THAITUE,TuViStar.QUANDOI,
            ],
            // Omen D2
            [TuViStar.PHILIEM, TuViStar. DIAKIEP, TuViStar. HOATINH, TuViStar.LINHTINH, TuViStar.TRIETKHONG,],
            // Omen D3
            [
                    TuViStar. QUANPHUF, TuViStar. QUANPHUR,TuViStar.PHUCBINH, TuViStar.TRANGSINH,
            ],
            // Omen D4
            []],
    // X TuTuc
    [
            // Omen F1
            [TuViStar.HOAKHOA, TuViStar.LONGTRI, TuViStar.DAOHOA, TuViStar.THAIDUONG, TuViStar.THIENQUY,
              TuViStar.LONGDUC, TuViStar.BATTOA, TuViStar.VANKHUC, TuViStar.TUVI, TuViStar.TRANGSINH, TuViStar.ANQUANG,
                    TuViStar.THIENPHUR, TuViStar.TAMTHAI,],
            // Omen F2
            [
                    TuViStar.VUKHUC,TuViStar.TAPHU, TuViStar.THIENKHOI,
            ],
            // Omen F3
            [TuViStar.THIENCO,
                    TuViStar.THAIAM, TuViStar. BACSI, TuViStar.DEVUONG,
                    TuViStar.HOALOC, TuViStar.HONGLOAN, TuViStar.NGUYETDUC,
                    TuViStar. THIENVIET,
                    TuViStar.TUONGQUAN, TuViStar.PHUONGCAC, TuViStar.THIENPHUC, TuViStar.THIENTUONG],
            // Omen F4
            [TuViStar.THIENDONG, TuViStar.HUUBAT,
                   TuViStar.PHUCDUC,TuViStar.THIENQUAN,
                    TuViStar. THIENDUC, TuViStar.THIENGIAI,
                    TuViStar.THANHLONG, TuViStar.THIENHY, TuViStar.THIENTHO,
                    TuViStar.DIAGIAI, TuViStar.GIAITHAN,
                    TuViStar.THIENLUONG, TuViStar.THIENTAI, TuViStar.VANTINH,
                    TuViStar.THIENMA, TuViStar.VANXUONG,
            ],
            // Omen D1
            [TuViStar.PHAQUAN, TuViStar.BACHHO,
                    TuViStar. DAUQUAN, TuViStar.DIEUKHACH, TuViStar.TU,
                    TuViStar. COTHAN, TuViStar.BENH,TuViStar.THATSAT,
                    TuViStar. HOATINH, TuViStar.TUYET, TuViStar.DAIHAO,
                    TuViStar. TIEUHAO, TuViStar.THIENKHOC, TuViStar.PHATOAI,
                    TuViStar. THIENHU, TuViStar.THIENHINH,
                    TuViStar.LOCTON, TuViStar.SUY, TuViStar. DIAKIEP,TuViStar.PHUCBINH,
                    TuViStar. TUPHUF, TuViStar. THIENTRU,TuViStar.MO, TuViStar.LIEMTRINH,
                    TuViStar.THAI, TuViStar.THIENRIEU, TuViStar.DUONG,TuViStar.THAITUE,TuViStar.QUANDOI,],
            // Omen D2
            [TuViStar. DALA, TuViStar.DIAKHONG, TuViStar. TRUCPHUF,],
            // Omen D3
            [
                    TuViStar. QUATU,
            ],
            // Omen D4
            [TuViStar.KINHDUONG,TuViStar.TANGMON, TuViStar.LINHTINH, TuViStar.TRIETKHONG,]],
    // X PhuThe
    [
            // Omen F1
            [
                    TuViStar.HYTHAN, TuViStar.PHUONGCAC, TuViStar.LONGTRI, TuViStar.THIENQUY, TuViStar.LONGDUC,
                    TuViStar.BATTOA,  TuViStar.TUVI, TuViStar.VANXUONG, TuViStar.ANQUANG,
            ],
            // Omen F2
            [TuViStar.VUKHUC, TuViStar.THIENPHUR,TuViStar.TAPHU, TuViStar.THIENKHOI, TuViStar.THAIAM,

            ],
            // Omen F3
            [TuViStar.THIENLUONG, TuViStar.HOALOC,
                    TuViStar.HUUBAT, TuViStar.VANKHUC,
                    TuViStar. THIENVIET, TuViStar.TUONGQUAN, TuViStar.NGUYETDUC,
                    TuViStar.TAMTHAI, TuViStar.THIENPHUC, TuViStar.THAIDUONG],
            // Omen F4
            [TuViStar.THIENDONG, TuViStar. BACSI,TuViStar.PHUCDUC,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC, TuViStar.THIENRIEU,
                    TuViStar.THIENGIAI, TuViStar.THIENHY, TuViStar.DAIHAO,
                    TuViStar.DEVUONG, TuViStar.DIAGIAI, TuViStar.GIAITHAN, TuViStar.THIENCO, TuViStar.THIENTHO,
                    TuViStar.THIENTAI, TuViStar.VANTINH, TuViStar.DAOHOA, TuViStar.THANHLONG,
                    TuViStar.TRANGSINH,],
            // Omen D1
            [TuViStar.BACHHO, TuViStar.DIEUKHACH, TuViStar.HONGLOAN, TuViStar.BENH, TuViStar.TU,
                    TuViStar.TUYET, TuViStar. TIEUHAO, TuViStar.THIENTUONG, TuViStar.THIENHINH,
                    TuViStar. DIAKIEP, TuViStar. TUPHUF, TuViStar. THIENTRU,TuViStar.MO, TuViStar.LIEMTRINH,
                    TuViStar.THAI, TuViStar. COTHAN, TuViStar. DAUQUAN, TuViStar. QUATU, TuViStar.TRIETKHONG,],
            // Omen D2
            [TuViStar.THAMLANG,TuViStar.THATSAT,TuViStar.KINHDUONG, TuViStar.PHAQUAN,
                    TuViStar. HOAKY, TuViStar. HOATINH, TuViStar.LOCTON, TuViStar.LINHTINH,
                    TuViStar. TRUCPHUF,TuViStar.THAITUE,TuViStar.QUANDOI,],
            // Omen D3
            [TuViStar.THIENMA,TuViStar.PHUCBINH, TuViStar. DALA, TuViStar.PHATOAI, TuViStar.THIENKHOC, TuViStar.DIAKHONG,],
            // Omen D4
            [TuViStar.TANGMON

            ]],
    // X HuynhDe
    [
            // Omen F1
            [TuViStar.HOAKHOA, TuViStar.THIENPHUC, TuViStar.LONGDUC, TuViStar.BATTOA, TuViStar.TUVI, TuViStar.ANQUANG,
                    TuViStar.TAMTHAI,],
            // Omen F2
            [TuViStar.THAIAM,

            ],
            // Omen F3
            [TuViStar.HOALOC, TuViStar.NGUYETDUC, TuViStar.VANXUONG,TuViStar.TAPHU, TuViStar.THIENKHOI,],
            // Omen F4
            [TuViStar.LIEMTRINH, TuViStar.CUMON, TuViStar. BACSI, TuViStar.VUKHUC,
              TuViStar.DUONG,TuViStar.PHUCDUC, TuViStar.THIENRIEU,
                   TuViStar.THIENQUAN, TuViStar. THIENDUC, TuViStar.THANHLONG,
                    TuViStar.THIENHY, TuViStar.THIENLUONG, TuViStar.THAIDUONG,
                    TuViStar.DIAGIAI, TuViStar.THIENGIAI, TuViStar.HUUBAT, TuViStar.DAOHOA, TuViStar.THIENCO,
                    TuViStar.THIENQUY, TuViStar.DEVUONG, TuViStar.GIAITHAN, TuViStar.THIENTUONG, TuViStar.THIENTAI, TuViStar.VANTINH,
                    TuViStar.THIENTHO, TuViStar.THIENMA, TuViStar.TRANGSINH, TuViStar.TUONGQUAN,TuViStar.THAITUE,],
            // Omen D1
            [TuViStar.DIEUKHACH, TuViStar.BENH, TuViStar.DAIHAO,TuViStar.THATSAT, TuViStar.TU,
                    TuViStar. HOAKY, TuViStar. HOATINH, TuViStar.TUYET, TuViStar. DIAKIEP,
                    TuViStar.THIENDONG,TuViStar.PHUCBINH, TuViStar. TUPHUF, TuViStar. THIENTRU,TuViStar.MO,
                    TuViStar.THAI, TuViStar.BACHHO, TuViStar. QUATU, TuViStar. COTHAN,
                    TuViStar.LINHTINH, TuViStar. TIEUHAO, TuViStar.THIENKHOC,TuViStar.QUANDOI,],
            // Omen D2
            [TuViStar.PHAQUAN, TuViStar.THIENHINH, TuViStar.HYTHAN, TuViStar. DALA, TuViStar.LOCTON,
                    TuViStar. TRUCPHUF, TuViStar.TRIETKHONG,],
            // Omen D3
            [
                    TuViStar.DIAKHONG,
            ],
            // Omen D4
            [
                   TuViStar.TANGMON,TuViStar.KINHDUONG,
            ]],
    // X Than
    [
            // Omen F1
            [TuViStar.LOCTON, TuViStar.DIAGIAI, TuViStar.THIENGIAI, TuViStar.DEVUONG, TuViStar.GIAITHAN],
            // Omen F2
            [TuViStar.THIENTHO],
            // Omen F3
            [
                    TuViStar.THIENPHUC, TuViStar.VANTINH,
            ],
            // Omen F4
            [TuViStar.PHUCDUC,TuViStar.THIENQUAN, TuViStar. THIENDUC,
                    TuViStar.THIENHY,
                    TuViStar.THIENQUY, TuViStar.DEVUONG],
            // Omen D1
            [TuViStar.DIEUKHACH, TuViStar.TUYET, TuViStar.PHILIEM],
            // Omen D2
            [

            ],
            // Omen D2
            [

            ],
            // Omen D4
            [
                   TuViStar.TANGMON, TuViStar. DIAKIEP
            ]],];

  static isStarPresent(star: TuViStar, starArr: TuViStar[]) {
    return ObjectHelper.hasItem(starArr, star);
  }

  static isMieuDia(tuviStar: TuViStar, branche: Branche) {
    return TuViStarHelper.isStarPresent(
      tuviStar,
      TuViStarHelper.MieuDiaStar[branche.ordinal()]
    );
  }

  static isVuong(tuviStar: TuViStar, branche: Branche) {
    return TuViStarHelper.isStarPresent(
      tuviStar,
      TuViStarHelper.VuongStar[branche.ordinal()]
    );
  }

  static isDacDia(tuviStar: TuViStar, branche: Branche) {
    return TuViStarHelper.isStarPresent(
      tuviStar,
      TuViStarHelper.DacDiaStar[branche.ordinal()]
    );
  }

  static isBinhDia(tuviStar: TuViStar, branche: Branche) {
    return TuViStarHelper.isStarPresent(
      tuviStar,
      TuViStarHelper.BinhStar[branche.ordinal()]
    );
  }

  static isHamDia(tuviStar: TuViStar, branche: Branche) {
    return TuViStarHelper.isStarPresent(
      tuviStar,
      TuViStarHelper.HamDiaStar[branche.ordinal()]
    );
  }

  static getXDiaStatus(tuviStar: TuViStar, branche: Branche) {
    if (TuViStarHelper.isMieuDia(tuviStar, branche)) {
      return TuViStar.MIEUDIA;
    }
    if (TuViStarHelper.isVuong(tuviStar, branche)) {
      return TuViStar.VUONGDIA;
    }
    if (TuViStarHelper.isDacDia(tuviStar, branche)) {
      return TuViStar.DACDIA;
    }
    if (TuViStarHelper.isBinhDia(tuviStar, branche)) {
      return TuViStar.BINHDIA;
    }
    if (TuViStarHelper.isHamDia(tuviStar, branche)) {
      return TuViStar.HAMDIA;
    }
    return TuViStar.DIANOTAVAILABLE;
  }

  // Ref14 p98 An sao Trang sinh
  static getTrangSinhBranche(tuviMenhElement: Element) {
    return TuViStarHelper.TrangSinhStarBranche[tuviMenhElement.ordinal()];
  }

  static isDeactivateBadStarAbility(star: TuViStar) {
    return ObjectHelper.hasItem(TuViStarHelper.DeactivateBadStarAbility, star);
  }

  static isBothStarForceActivatedStar(star: TuViStar) {
    return ObjectHelper.hasItem(
      TuViStarHelper.BothMainStarForceActivatedStar,
      star
    );
  }

  static isOnlyBadTieuHanActivatedStar(star: TuViStar) {
    return ObjectHelper.hasItem(
      TuViStarHelper.OnlyBadTieuHanActivatedStar,
      star
    );
  }

  static isOnlyGoodMainStarForceActivatedStar(star: TuViStar) {
    return ObjectHelper.hasItem(
      TuViStarHelper.OnlyGoodMainStarForceActivatedStar,
      star
    );
  }

  static isOnlyBadMainStarForceActivatedStar(star: TuViStar) {
    return ObjectHelper.hasItem(
      TuViStarHelper.OnlyBadMainStarForceActivatedStar,
      star
    );
  }

  static getStarOmenByTuViRingType(star: TuViStar, tuviRing: TuViRing) {
    let res = null; // Default value null if not found
    const tuviRingOmenArr = TuViStarHelper.TuViRingOmenStar[tuviRing.ordinal()];
    const omens = Omen.getValues();
    for (let index = 0; index < omens.length; index++) {
      const omen = omens[index];
      const tuviRingOmenStarArr = tuviRingOmenArr[omen.ordinal()];
      for (let i = 0; i < tuviRingOmenStarArr.length; i++) {
        const tuViStar = tuviRingOmenStarArr[i];
        if (tuViStar === star) {
          res = omen;
          break;
        }
      }
      if (res !== null) {break;}
    }
    return res;
  }

}

