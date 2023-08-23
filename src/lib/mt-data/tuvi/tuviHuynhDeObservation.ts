import { BrancheHelper } from "../../helper/brancheHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ElementRelation } from "../feng-shui/element-relation";
import { Energy } from "../feng-shui/energy";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Element } from '../feng-shui/element';
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";
import { Trunk } from "../bazi/trunk";
import { BrancheRelation } from "../bazi/brancheRelation";

export class TuViHuynhDeObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "HuynhDe"
  }

  genRef17p246() {
    let count =0;
    if (this.hasStar(TuViStar.TUVI)) {
        if (this.palace.chinhTinhCount===1 || this.hasStars(TuViStarHelper.NamDauChinhTinhstarList, 4)) {
            this.addBaseComment("Ref17p246p5");
        } else {
            if (this.hasStars(TuViStarHelper.BacDauChinhTinhstarList, 3)) {
                this.addBaseComment("Ref17p246p6");
            }
        }
    } else {
        if (this.hasStars(TuViStarHelper.NamDauChinhTinhstarList, 4)) count++;
        if (this.hasStars(TuViStarHelper.BacDauChinhTinhstarList, 3)) {
            if (count===0) {
                this.addBaseComment("Ref17p246p2");
            } else {
                if (this.palace.branche.getEnergy().isYang()) {
                    this.addBaseComment("Ref17p246p3");
                } else {
                    this.addBaseComment("Ref17p246p4");
                }
            }
        } else {
            if (count===1) {
                this.addBaseComment("Ref17p246p1");
            }

        }
    }
    if (this.hasAllStars([TuViStar.THIENTUONG, TuViStar.TUYET]) ||
            this.hasAllStars([TuViStar.THAIAM, TuViStar.THIENPHUC]) ||
            this.hasAllStars(TuViStarHelper.COCU) ||
            this.hasAllStars(TuViStarHelper.CONGUYETDONGLUONG) ||
            this.hasAllStars([TuViStar.PHUCBINH, TuViStar.TUONGQUAN])
            ) {
        if (this.palace.branche.getEnergy().isYang()) {
            this.addBaseComment("Ref17p247p1");
        } else {
            this.addBaseComment("Ref17p247p2");
        }
    }
}

genTuVi() {
    if (this.hasStar(TuViStar.TUVI)) {
        if (this.palace.chinhTinhCount===1) {
            this.addSupportBaseComment(8, "Ref17p247p3");
            if (this.palace.branche===Branche.RAT) {
                this.addSupportBaseComment(5, "Ref17p247p4");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(8, "Ref17p247p5");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(5, "Ref17p247p6");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(9, "Ref17p247p7");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(3, "Ref17p247p8");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(2, "Ref17p247p9");
        }
    }
}

genLiemTrinh() {
    if (this.hasStar(TuViStar.LIEMTRINH)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addBaseComment("Ref17p247p10");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(6, "Ref17p247p11");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(8, "Ref17p247p12");

        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(2, "Ref17p247p13");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(4, "Ref17p247p14");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(3, "Ref17p247p15");
        }
    }
}

genThienDong() {
    if (this.hasStar(TuViStar.THIENDONG)) {
        if (this.palace.chinhTinhCount===1) {
            if (this.palace.branche===Branche.RABBIT) {
                this.addSupportBaseComment(6, "Ref17p248p1");
            }
            if (this.palace.branche===Branche.COCK) {
                this.addSupportBaseComment(5, "Ref17p248p2");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p248p3");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p248p4");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(6, "Ref17p248p5");
        }
        if (this.hasStars(TuViStarHelper.NGUYETAM,1)) {
            if (this.palace.branche===Branche.RAT) {
                this.addSupportBaseComment(7, "Ref17p248p6");
            }
            if (this.palace.branche===Branche.HORSE) {
                this.addSupportBaseComment(4, "Ref17p248p7");
            }
        }

        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(3, "Ref17p248p8");
        }
    }

}

genVuKhuc() {
    if (this.hasStar(TuViStar.VUKHUC)) {
        if (this.palace.chinhTinhCount===1) {
          if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p248p9");
            }
        }

        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(7, "Ref17p248p10");
        }

        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(5, "Ref17p248p11");
        }

        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(6, "Ref17p248p12");
        }

        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(4, "Ref17p248p13");
        }


        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(3, "Ref17p248p14");
        }

    }
}

genThaiDuong() {
    if (this.hasStar(TuViStar.THAIDUONG)) {
        if (this.palace.chinhTinhCount===1) {
          if (BrancheHelper.isDragonSnakeHorse(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p248p15");
            }
            if (BrancheHelper.isRatDogPig(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p248p16");
            }
        }
    }
}

genThamLang() {
    if (this.hasStar(TuViStar.THAMLANG)) {
        if (this.palace.chinhTinhCount===1) {
          if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p249p1");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p249p2");
            }
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p249p3");
            }
        }
    }
}


genCuMon() {
    if (this.hasStar(TuViStar.CUMON)) {
        if (this.palace.chinhTinhCount===1) {
          if (BrancheHelper.isRatHorsePig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p249p4");
            }
            if (BrancheHelper.isDragonSnakeDog(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p249p5");
            }
        }
    }
}

genThienTuong() {
    if (this.hasStar(TuViStar.THIENTUONG)) {
        if (this.palace.chinhTinhCount===1) {
          if (BrancheHelper.isOxSnakeGoatPig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p249p6");
            }
            if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p249p7");
            }
        }
    }
}

genThienLuong() {
    if (this.hasStar(TuViStar.THIENLUONG)) {
        if (this.palace.chinhTinhCount===1) {
          if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p249p8");
            }
            if (BrancheHelper.isOxGoat(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p249p9");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p248p3");
            }
        }
    }
}

genThatSat() {
    if (this.hasStar(TuViStar.THATSAT)) {
        if (this.palace.chinhTinhCount===1) {
          if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p249p10");
            }
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p249p11");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p250p1");
            }
        }
    }
}


genPhaQuan() {
    if (this.hasStar(TuViStar.PHAQUAN)) {
        if (this.palace.chinhTinhCount===1) {
          if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p250p2");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addBaseComment("Ref17p250p3");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p250p4");
            }
        }
    }
}

genRef17p250p5_X() {
    if (this.hasFavorableStars()) {
        this.addSupportBaseComment(4, "Ref17p250p5");
    } else {
        if (this.hasHostileStars()) {
            this.addSupportBaseComment(4, "Ref17p250p6");
        }
    }
    if (this.hasAllStars(TuViStarHelper.XUONGKHUC) || this.hasStar(TuViStar.VANKHUC)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(8, "Ref17p250p7");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p250p8");
            }
        }
    }
    if (this.hasStars(TuViStarHelper.KHOIVIET,1)) {
        this.addSupportBaseComment(8, "Ref17p250p9");
    }
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(8, "Ref17p250p10");
        }
    }

    if (this.hasStar(TuViStar.LOCTON)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(4, "Ref17p250p12");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p250p13");
            }
        }
    }
}


genRef17p251() {
    if (this.hasAllStars(TuViStarHelper.KHOAQUYENLOC)) {
        this.addSupportBaseComment(9, "Ref17p251p1");
    }
    if (this.hasStar(TuViStar.HOAKY)) {
        this.addSupportBaseComment(5, "Ref17p251p2");
    }
    if (this.hasHaoStar()) {
        this.addSupportBaseComment(5, "Ref17p251p3");
    }
    if (this.hasStar(TuViStar.THIENMA)) {
        this.addSupportBaseComment(4, "Ref17p251p4");
    }
    if (this.hasAllStars(TuViStarHelper.QUANGQUY)) {
        this.addSupportBaseComment(5, "Ref17p251p5");
    }
    if (this.hasStars(TuViStarHelper.COTHANQUATU,1)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(4, "Ref17p251p6");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(2, "Ref17p251p7");
            }
        }
    }
    if (this.hasStar(TuViStar.TRANGSINH)) {
        this.addSupportBaseComment(5, "Ref17p251p8");
    }
    if (this.hasStar(TuViStar.DEVUONG)) {
        this.addSupportBaseComment(5, "Ref17p251p9");
    }
    if (this.hasStar(TuViStar.QUANDOI) || this.hasStar(TuViStar.LAMQUAN)) {
        this.addSupportBaseComment(5, "Ref17p251p10");
    }
    if (this.hasStar(TuViStar.SUY)) {
        this.addSupportBaseComment(5, "Ref17p251p11");
    }
    if (this.hasStar(TuViStar.BENH) || this.hasStar(TuViStar.THAI)) {
        this.addSupportBaseComment(5, "Ref17p251p12");
    }
    if (this.hasStar(TuViStar.DUONG)) {
        this.addSupportBaseComment(5, "Ref17p251p13");
    }
    if (this.hasStar(TuViStar.TU)) {
        this.addSupportBaseComment(4, "Ref17p251p14");
    }
    if (this.hasStar(TuViStar.TUYET)) {
        this.addSupportBaseComment(2, "Ref17p251p15");
    }
    if (this.hasTuanTrietKhong) {
        this.addSupportBaseComment(1, "Ref17p251p16");
    }
}

genRef17p252() {
    if (this.hasAllStars(TuViStarHelper.TUTAHUU)) {
        this.addSupportBaseComment(6, "Ref17p252p1");
        if (this.hasStar(TuViStar.TANGMON)) {
            this.addSupportBaseComment(4, "Ref17p252p2");
        }
    }
    if (this.hasStar(TuViStar.THAI) && this.hasSupportStars0(TuViStarHelper.NHATNGUYET)) {
        this.addSupportBaseComment(5, "Ref17p252p3");
    }
    if (this.hasStars(TuViStarHelper.PHATUONG,1)) {
        this.addSupportBaseComment(4, "Ref17p252p4");
        if (this.hasAllStars(TuViStarHelper.KYHINH)) {
            this.addSupportBaseComment(2, "Ref17p252p5");
        }
    }
    if (this.hasStar(TuViStar.TANGMON)) {
        if (this.hasStar(TuViStar.THIENMA)) {
            this.addSupportBaseComment(3, "Ref17p252p6");
        }
        if (this.hasStar(TuViStar.TUEPHA)) {
            this.addSupportBaseComment(3, "Ref17p252p7");
        }
    }
    if (this.hasAllStars(TuViStarHelper.XUONGKHUCTUE)) {
        this.addSupportBaseComment(9, "Ref17p252p8");
    }
    if (this.hasStars(TuViStarHelper.HONGDAO,1)) {
        if (this.hasStar(TuViStar.THAI) || this.hasStar(TuViStar.BENH)) {
            if (this.hasStar(TuViStar.TUONGQUAN)) {
                this.addSupportBaseComment(4, "Ref17p252p10");
            }
        }
        if (this.hasStar(TuViStar.HOACAI)) {
            this.addSupportBaseComment(4, "Ref17p252p9");
        }
        if (this.hasAllStars(TuViStarHelper.RIEUHY)) {
            this.addSupportBaseComment(4, "Ref17p252p11");
        }
    }
    if (this.hasStar(TuViStar.DUONG)) {
        if (this.hasStars(TuViStarHelper.TAMKHONG,1)) {
            this.addSupportBaseComment(8, "Ref17p252p12");
        }
    }
}


// Update force based on force of Palaces:  PhucDuc
//
override updateForce() {
    super.updateForce();
    this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
}

commentHuynhDe() {
    this.genRef17p246();
    this.genTuVi();
    this.genLiemTrinh();
    this.genThienDong();
    this.genVuKhuc();
    this.genThaiDuong();
    this.genThamLang();
    this.genThienTuong();
    this.genThienLuong();
    this.genCuMon();
    this.genThatSat();
    this.genPhaQuan();
    this.genRef17p250p5_X();
    this.genRef17p251();
    this.genRef17p252();
}


override comment() {
    super.comment();
    this.commentHuynhDe();
}

}
