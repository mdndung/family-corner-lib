import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Element } from '../feng-shui/element';
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";


export class TuViTuTucObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }


  genRef17p225_p226() {
    if (this.hasStar(TuViStar.TUVI)) {
        if (this.palace.chinhTinhCount===1) {
            this.addBaseComment("Ref17p226p1");
        } else {
            if (this.hasStars(TuViStarHelper.BacDauChinhTinhstarList, 3)) {
                this.addBaseComment("Ref17p226p2");
            } else {
                this.addBaseComment("Ref17p226p1");
            }
        }

    } else {
        let count = 0;
        if (this.hasStars(TuViStarHelper.BacDauChinhTinhstarList, 3)) {
            count++;
        }
        if (this.hasStars(TuViStarHelper.NamDauChinhTinhstarList, 3)) {
            if (count===0) {
                this.addBaseComment("Ref17p225p2");
            } else {
                if (this.palace.branche.getEnergy().isYang()) {
                    this.addBaseComment("Ref17p225p3");
                } else {
                    this.addBaseComment("Ref17p225p4");
                }
            }
        } else {
            if (count===1) {
                this.addBaseComment("Ref17p225p1");
            }
        }
    }
    if (this.palace.branche.getEnergy().isYang()) {
        this.addSupportBaseComment(4, "Ref17p226p3");
    } else {
        this.addSupportBaseComment(4, "Ref17p226p4");
    }

    if (BrancheHelper.isDayBorn(this.tuviHoroscope.birthLunar.gethBranche())) {
        if (this.hasStar(TuViStar.THAIDUONG) && (!this.tuviHoroscope.tuviPalaceStarMap.isThaiDuongFavorable) ||
                this.hasSupportStars0([TuViStar.THAIAM])) {
            this.addSupportBaseComment(3, "Ref17p226p5");
        }
    } else {
        if (this.hasStar(TuViStar.THAIAM) && (!this.tuviHoroscope.tuviPalaceStarMap.isThaiAmFavorable) ||
                this.hasSupportStars0([TuViStar.THAIDUONG])) {
                this.addSupportBaseComment(3, "Ref17p226p6");
        }
    }
    const starSet =
            [TuViStar.THIENTUONG, TuViStar.TUYET, TuViStar.THAIAM, TuViStar.THIENPHUC,
            TuViStar.CUMON, TuViStar.THIENCO, TuViStar.PHUCBINH, TuViStar.TUONGQUAN,
            TuViStar.THAIPHU, TuViStar.DEVUONG, TuViStar.NGUYETDUC, TuViStar.THIENDONG,
            TuViStar.THIENLUONG];
    if (this.hasStars(starSet, 5)) {
        if (this.palace.branche.getEnergy().isYang()) {
            this.addBaseComment("Ref17p226p7");
        } else {
            this.addBaseComment("Ref17p226p8");
        }
    }
}

genTuVi() {
    if (this.hasStar(TuViStar.TUVI)) {
        if (this.palace.chinhTinhCount===1) {
            if (this.palace.branche===Branche.HORSE) {
                this.addSupportBaseComment(5, "Ref17p227p1");
            }
            if (this.palace.branche===Branche.RAT) {
                this.addSupportBaseComment(5, "Ref17p227p2");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addBaseComment("Ref17p227p3");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addBaseComment("Ref17p227p4");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(4, "Ref17p227p5");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addBaseComment("Ref17p227p6");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addBaseComment("Ref17p227p7");
        }
    }
}

genLiemTrinh() {
    if (this.hasStar(TuViStar.LIEMTRINH)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p227p8");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(5, "Ref17p227p9");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addBaseComment("Ref17p227p10");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(4, "Ref17p227p11");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(4, "Ref17p227p12");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(4, "Ref17p227p13");
        }
    }
}

genThienDong() {
    if (this.hasStar(TuViStar.THIENDONG)) {
        if (this.palace.chinhTinhCount===1) {
            if (this.palace.branche===Branche.RABBIT) {
                this.addSupportBaseComment(5, "Ref17p227p14");
            }
            if (this.palace.branche===Branche.COCK) {
                this.addBaseComment("Ref17p227p15");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p228p1");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p228p2");
            }
        }
        if (this.hasStars(TuViStarHelper.NGUYETAM,1)) {
            if (this.palace.branche===Branche.RAT) {
                this.addSupportBaseComment(9, "Ref17p228p3");
            }
            if (this.palace.branche===Branche.HORSE) {
                this.addSupportBaseComment(7, "Ref17p228p4");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            if (this.palace.branche===Branche.TIGER) {
                this.addSupportBaseComment(8, "Ref17p228p5");
            }
            if (this.palace.branche===Branche.MONKEY) {
                this.addSupportBaseComment(5, "Ref17p228p6");
            }
        }
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(3, "Ref17p228p7");
        }
    }

}

genVuKhuc() {
    if (this.hasStar(TuViStar.VUKHUC)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p228p8");
            }
        }

        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(9, "Ref17p228p9");
        }

        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(3, "Ref17p228p10");
        }

        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(5, "Ref17p228p11");
        }

        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(3, "Ref17p228p12");
        }

        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(4, "Ref17p228p13");
        }
    }
}

genThaiDuong() {
    if (this.hasStar(TuViStar.THAIDUONG)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isDragonSnakeHorse(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p228p14");
            }
            if (BrancheHelper.isRatDogPig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p229p1");
            }
        }
        if (this.hasStar(TuViStar.CUMON)) {
            if (this.palace.branche===Branche.TIGER) {
                this.addSupportBaseComment(8, "Ref17p229p2");
            }
            if (this.palace.branche===Branche.MONKEY) {
                this.addSupportBaseComment(8, "Ref17p229p3");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            if (this.palace.branche===Branche.RABBIT) {
                this.addSupportBaseComment(8, "Ref17p229p4");
            }
            if (this.palace.branche===Branche.COCK) {
                this.addSupportBaseComment(4, "Ref17p229p5");
            }
        }
        if (this.hasStars(TuViStarHelper.NGUYETAM,1)) {
            this.addSupportBaseComment(8, "Ref17p229p6");
        }
    }
}

genThienCo() {
    if (this.hasStar(TuViStar.THIENCO)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isSnakeHorseGoat(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p229p7");
            }
            if (BrancheHelper.isRatOxPig(this.palace.branche)) {
                this.addBaseComment("Ref17p229p8");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(8, "Ref17p229p9");
        }

        if (this.hasStars(TuViStarHelper.NGUYETAM,1)) {
            if (this.palace.branche===Branche.MONKEY) {
                this.addBaseComment("Ref17p229p10");
            }
            if (this.palace.branche===Branche.TIGER) {
                this.addBaseComment("Ref17p229p11");
            }
        }

        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(6, "Ref17p229p12");
        }
    }
}

genThienPhuR() {
    if (this.hasStar(TuViStar.THIENPHUR)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p229p13");
            }
            if (BrancheHelper.isOxRabbitGoatCock(this.palace.branche)) {
                this.addBaseComment("Ref17p229p14");
            }
        }
    }
}


genThaiAm() {
    if (this.hasStar(TuViStar.THAIAM)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isCockDogPig(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p229p15");
            }
        }
    }
}

genThienLuong() {
    if (this.hasStar(TuViStar.THIENLUONG)) {

        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p230p1");
            }
            if (BrancheHelper.isOxGoat(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p230p2");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p228p1");
            }
        }

    }
}

genThatSat() {
    if (this.hasStar(TuViStar.THATSAT)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p230p3");
            }
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addBaseComment("Ref17p230p4");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(2, "Ref17p230p5");
            }
        }
    }
}

genPhaQuan() {
    if (this.hasStar(TuViStar.PHAQUAN)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p230p6");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p230p7");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p230p8");
            }
        }
    }
}

genRef17p230p9_10() {
    if (this.hasAllStars(TuViStarHelper.KINHDAKHONGKIEP)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(3, "Ref17p230p9");
        } else {
            this.addSupportBaseComment(1, "Ref17p230p10");
        }
    }
}

genRef17p231() {
    if (this.hasHoaLinhStar()) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(5, "Ref17p231p1");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(2, "Ref17p231p2");
            }
        }
    }
    if (this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(8, "Ref17p231p3");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(3, "Ref17p231p4");
            }
        }
    }
    if (this.hasStars(TuViStarHelper.KHOIVIET,1)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(7, "Ref17p231p5");
        }
    }
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
        this.addBaseComment("Ref17p231p6");
        if (this.hasFavorableStars()) {
            this.incPoints(9);
        }
    }
    if (this.hasStar(TuViStar.LOCTON)) {
        this.addSupportBaseComment(4, "Ref17p231p7");
        if (this.hasFavorableStars()) {
          this.incPoints(2);
        }
    }
    if (this.hasStar(TuViStar.HOALOC)) {
        this.addSupportBaseComment(8, "Ref17p231p8");
    }
    if (this.hasStar(TuViStar.HOAQUYEN)) {
        this.addSupportBaseComment(8, "Ref17p231p9");
    }
    if (this.hasStar(TuViStar.HOAKHOA)) {
        this.addSupportBaseComment(7, "Ref17p231p10");
    }
    if (this.hasStar(TuViStar.HOAKY)) {
        this.addSupportBaseComment(4, "Ref17p231p11");
    }
    if (this.hasStars(TuViStarHelper.COTHANQUATU,1)) {
        if (this.hasManyGoodStars || this.hasManyGoodSupportStars() || this.isFavorable()) {
            this.addSupportBaseComment(3, "Ref17p231p12");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(2, "Ref17p231p13");
            }
        }
    }
}

genRef17p232() {
    if (this.hasStar(TuViStar.DAUQUAN)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(8, "Ref17p232p1");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p232p2");
            }
        }
    }
    if (this.hasStar(TuViStar.TRANGSINH)) {
        if (this.hasTuanTrietKhong) {
            this.addBaseComment("Ref17p232p3b");
        } else {
            this.addBaseComment("Ref17p232p3a");
        }
    }
    if (this.hasStar(TuViStar.MOCDUC)) {
        this.addSupportBaseComment(4, "Ref17p232p4");
    }
    if (this.hasStars(TuViStarHelper.DOILAM,1)) {
        this.addBaseComment("Ref17p232p5");
    }
    if (this.hasStar(TuViStar.DEVUONG)) {
        this.addBaseComment("Ref17p232p6");
    }
    if (this.hasStar(TuViStar.BENH)) {
        this.addBaseComment("Ref17p232p7");
    }
    if (this.hasStar(TuViStar.TU)) {
        this.addSupportBaseComment(4, "Ref17p232p8");
    }
    if (this.hasStar(TuViStar.MO)) {
        this.addSupportBaseComment(4, "Ref17p232p9");
    }
    if (this.hasStar(TuViStar.TUYET)) {
        this.addSupportBaseComment(2, "Ref17p232p10");
    }
    if (this.hasStar(TuViStar.THAI)) {
        this.addSupportBaseComment(4, "Ref17p232p11");
    }
    if (this.hasStar(TuViStar.DUONG)) {
        this.addSupportBaseComment(4, "Ref17p232p12");
    }
    if (this.hasAllStars(TuViStarHelper.LONGCAC)) {
        this.addSupportBaseComment(8, "Ref17p232p13");
    }
    if (this.hasAllStars(TuViStarHelper.QUANGQUY)) {
        this.addSupportBaseComment(8, "Ref17p232p14");
    }
    if (this.hasAllStars(TuViStarHelper.KHOCHU)) {
        this.addSupportBaseComment(3, "Ref17p232p15");
    }
    if (this.hasStars(TuViStarHelper.DAITIEUHAO,1)) {
        this.addSupportBaseComment(3, "Ref17p232p16");
    }
}

genRef17p233() {
    if (this.hasStar(TuViStar.THIENRIEU)) {
        this.addSupportBaseComment(3, "Ref17p233p1");
    }
    if (this.hasStar(TuViStar.THIENHINH)) {
        this.addSupportBaseComment(3, "Ref17p233p2");
        if (this.hasHostileStars()) {
          this.incPoints(2);
        }
    }
    if (this.hasStar(TuViStar.DAOHOA)) {
        this.addSupportBaseComment(3, "Ref17p233p3");
    }
    if (this.hasStar(TuViStar.HONGLOAN)) {
        this.addSupportBaseComment(6, "Ref17p233p4");
    }
    if (this.hasTuanTrietKhong) {
        this.addSupportBaseComment(3, "Ref17p233p5");
    }
    if (this.hasAllStars(TuViStarHelper.DONGDUC)) {
        this.addSupportBaseComment(6, "Ref17p233p6");
    }
    if (this.tuviHoroscope.tuviPalaceStarMap.isThaiDuongFavorable && this.hasAllStars(TuViStarHelper.QUANGQUY)) {
        this.addSupportBaseComment(9, "Ref17p233p7");
    }

    if (this.hasStars(TuViStarHelper.NGUYETAM,1)) {
        if (this.hasStar(TuViStar.THAIDUONG) && this.hasStar(TuViStar.THAI)) {
            this.addSupportBaseComment(6, "Ref17p233p8");
        }
        if (this.hasStar(TuViStar.THIENDONG) && this.hasStar(TuViStar.THAITUE) && this.palace.branche===Branche.RAT) {
            this.addSupportBaseComment(9, "Ref17p233p9");
        }
        if (this.hasStar(TuViStar.HOATINH) && this.hasStar(TuViStar.THAI)) {
            this.addSupportBaseComment(8, "Ref17p233p10");
        }
    }
    if ((this.hasStar(TuViStar.THIENTUONG) || this.hasStar(TuViStar.THIENLUONG)) && this.hasStar(TuViStar.QUANDOI)) {
        this.addSupportBaseComment(9, "Ref17p233p11");
    }
    if (this.hasStar(TuViStar.THATSAT)) {
        if (this.hasAllStars(TuViStarHelper.HINHHO)) {
            this.addSupportBaseComment(2, "Ref17p233p12");
        }
        if (this.hasStar(TuViStar.THAI)) {
            this.addSupportBaseComment(3, "Ref17p233p13");
        }
    }
}

genRef17p234() {

    if (!this.isMan()) {
        if (this.hasStars(TuViStarHelper.KINHDAKHONGKIEP, 3)) {
            this.addSupportBaseComment(4, "Ref17p234p1");
        }
    }
    if (this.hasStars(TuViStarHelper.KHUCTUELUONG, 3)) {
        this.addSupportBaseComment(8, "Ref17p234p2");
    }
    if (this.hasAllStars(TuViStarHelper.TAHUU) && this.hasStar(TuViStar.THAI)) {
        this.addSupportBaseComment(8, "Ref17p234p3");
    }
    if (this.hasAllStars(TuViStarHelper.KHOCHU) && this.hasStar(TuViStar.DUONG)) {
        this.addSupportBaseComment(3, "Ref17p234p4");
    }
    if (this.hasStar(TuViStar.BACHHO)) {
        if (this.hasStar(TuViStar.TANGMON) && this.hasStars(TuViStarHelper.KIEPDIA,1)) {
            if (this.hasStar(TuViStar.DIAKHONG)) {
                this.addSupportBaseComment(4, "Ref17p234p5");
            }
            if (this.hasStar(TuViStar.MOCDUC)) {
                this.addSupportBaseComment(4, "Ref17p234p6");
            }
        }
        if (this.hasStar(TuViStar.THAI)) {
            if (!this.isMan()) this.addSupportBaseComment(4, "Ref17p234p7");
        }
        if (this.hasAllStars(TuViStarHelper.SATHINH)) {
            this.addSupportBaseComment(4, "Ref17p234p8");
        }
    }
    if (this.hasStar(TuViStar.THIENTUONG) && (this.hasStar(TuViStar.BENH) || this.hasStar(TuViStar.THAI))) {
        this.addSupportBaseComment(4, "Ref17p234p9");
    }
    if (this.hasStar(TuViStar.HYTHAN) && this.hasStar(TuViStar.DUONG)) {
        this.addSupportBaseComment(9, "Ref17p234p10");
    }
    if (this.hasStar(TuViStar.DAOHOA)) {
        if (this.hasStars(TuViStarHelper.TUPHUR,1)) {
            this.addSupportBaseComment(8, "Ref17p234p11");
        }
        if (this.hasStars(TuViStarHelper.XUONGKHUCHONG, 2)) {
            this.addSupportBaseComment(4, "Ref17p234p12");
        }
        if (this.hasStar(TuViStar.THAI)) {
            this.addSupportBaseComment(3, "Ref17p234p13");
        }
    }
    if (this.hasStars(TuViStarHelper.QUANPHUCANTHU, 3)) {
        this.addSupportBaseComment(9, "Ref17p234p14");
    }
}

genRef17p257() {
    if (this.hasFavorableStars()) {
        this.addSupportBaseComment(8, "Ref17p2257p1");
    } else {
        this.addSupportBaseComment(3, "Ref17p2257p1");
    }
}

// Update force based on force of Palaces: Menh, Than, PhucDuc or presence of good stars
//
override updateForce() {
    super.updateForce();
    this.updateForceFromObservation(this.getObservations(TuViRing.Menh));
    this.updateForceFromObservation(this.getThanObservations());
    this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
    if (this.hasManyGoodStars || this.hasManyGoodSupportStars()) {
      this.incPoints(7);
    }
}

commentTuTuc() {
    this.genRef17p225_p226();
    this.genTuVi();
    this.genLiemTrinh();
    this.genThienDong();
    this.genVuKhuc();
    this.genThaiDuong();
    this.genThienCo();
    this.genThienPhuR();
    this.genThaiAm();
    this.genThienLuong();
    this.genThatSat();
    this.genPhaQuan();
    this.genRef17p230p9_10();
    this.genRef17p231();
    this.genRef17p232();
    this.genRef17p233();
    this.genRef17p234();
    this.genRef17p257();
}


override comment() {
    super.comment();
    this.commentTuTuc();
}

}
