import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";


export class TuViPhuTheObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }


  genTuVi() {
    if (this.hasStar(TuViStar.TUVI)) {
        if (this.palace.chinhTinhCount >= 1) {
            if (this.palace.branche==Branche.HORSE) {
                this.addSupportBaseComment(9, "Ref17p235p1");
            }
            if (this.palace.branche==Branche.RAT) {
                this.addSupportBaseComment(6, "Ref17p235p2");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(9, "Ref17p235p1");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(5, "Ref17p235p3");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(6, "Ref17p235p4");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(3, "Ref17p235p5");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(4, "Ref17p235p6");
        }
    }
}

genLiemTrinh() {
    if (this.hasStar(TuViStar.LIEMTRINH)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p236p1");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(6, "Ref17p236p2");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(3, "Ref17p236p3");

        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(2, "Ref17p236p4");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(2, "Ref17p236p5");
        }

        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(2, "Ref17p236p6");
        }
    }
}

genThienDong() {
    if (this.hasStar(TuViStar.THIENDONG)) {
        if (this.palace.chinhTinhCount==1) {
            if (this.palace.branche==Branche.RABBIT) {
                this.addSupportBaseComment(7, "Ref17p236p7");
            }
            if (this.palace.branche==Branche.COCK) {
                this.addSupportBaseComment(4, "Ref17p236p8");
            }
            if (this.palace.branche==Branche.SNAKE) {
                this.addSupportBaseComment(4, "Ref17p236p9");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(2, "Ref17p236p10");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(7, "Ref17p236p11");
        }
        if (this.hasStars(TuViStarHelper.NGUYETAM,1)) {
            if (this.palace.branche==Branche.RAT) {
                this.addSupportBaseComment(7, "Ref17p236p12");
            }
            if (this.palace.branche==Branche.HORSE) {
                this.addSupportBaseComment(5, "Ref17p236p13");
            }
        }

        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(4, "Ref17p236p14");
        }
    }

}

genVuKhuc() {
    if (this.hasStar(TuViStar.VUKHUC)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p237p1");
            }
        }

        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(7, "Ref17p237p2");
        }

        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(8, "Ref17p237p3");
        }

        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addBaseComment("Ref17p237p4");
        }

        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(5, "Ref17p237p5");
        }


        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(2, "Ref17p237p6");
        }

    }
}

genThaiDuong() {
    if (this.hasStar(TuViStar.THAIDUONG)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isRabbitDragonSnakeHorse(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p237p7");
            }
            if (BrancheHelper.isRatDogCockPig(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p237p8");
            }
        }
        if (this.hasStar(TuViStar.CUMON)) {
            if (this.palace.branche==Branche.TIGER) {
                this.addSupportBaseComment(8, "Ref17p237p9");
            }
            if (this.palace.branche==Branche.MONKEY) {
                this.addSupportBaseComment(5, "Ref17p237p10");
            }
        }
        if (this.hasStars(TuViStarHelper.NGUYETAM,1)) {
            this.addSupportBaseComment(8, "Ref17p237p11");
        }
    }
}

genThienCo() {
    if (this.hasStar(TuViStar.THIENCO)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isSnakeHorseGoat(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p238p1");
            }
            if (BrancheHelper.isRatOxPig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p238p2");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(8, "Ref17p238p3");
        }
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(6, "Ref17p238p4");
        }
        if (this.hasStars(TuViStarHelper.NGUYETAM,1)) {
            if (this.palace.branche==Branche.MONKEY) {
                this.addSupportBaseComment(8, "Ref17p238p5");
            }
            if (this.palace.branche==Branche.TIGER) {
                this.addSupportBaseComment(6, "Ref17p238p6");
            }
        }

    }
}

genThienPhuR() {
    if (this.hasStar(TuViStar.THIENPHUR)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p238p7");
            }
            if (BrancheHelper.isOxRabbitGoatCock(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p238p8");
            }
        }
    }
}


genThaiAm() {
    if (this.hasStar(TuViStar.THAIAM)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isCockDogPig(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p238p9");
            }
            if (BrancheHelper.isRabbitDragonSnake(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p238p10");
            }
        }
    }
}


genThamLang() {
    if (this.hasStar(TuViStar.THAMLANG)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p239p1");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p239p2");
            }
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p239p3");
            }


        }
    }
}

genCuMon() {
    if (this.hasStar(TuViStar.CUMON)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isRatHorsePig(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p239p4");
            }
            if (BrancheHelper.isDragonSnakeDog(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p239p5");
            }
        }
    }
}

genThienTuong() {
    if (this.hasStar(TuViStar.THIENTUONG)) {
        this.addBaseComment("Ref17p239p6");
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isOxSnakeGoatPig(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p239p7");
            }
            if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                this.addBaseComment("Ref17p239p8");
            }
        }
    }
}

genThienLuong() {
    if (this.hasStar(TuViStar.THIENLUONG)) {
        this.addSupportBaseComment(7, "Ref17p240p1a");
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p240p2");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p236p9");
            }
        }
        if (this.hasStar(TuViStar.THAIDUONG)) {
            if (this.palace.branche==Branche.RABBIT) {
                this.addSupportBaseComment(9, "Ref17p237p7");
            }
            if (this.palace.branche==Branche.COCK) {
                this.addSupportBaseComment(4, "Ref17p237p8");
            }
        }
    }
}

genThatSat() {
    if (this.hasStar(TuViStar.THATSAT)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p240p3");
            }
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p240p4");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p240p5");
            }
        }
    }
}


genPhaQuan() {
    if (this.hasStar(TuViStar.PHAQUAN)) {
        this.addSupportBaseComment(4, "Ref17p240p6");
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p240p7");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(2, "Ref17p240p8");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p240p9");
            }
        }
    }
}

genRef17p241() {
    if (this.hasFavorableStars()) {
        this.addSupportBaseComment(4, "Ref17p241p1");
    } else {
        if (this.hasHostileStars()) {
            this.addSupportBaseComment(2, "Ref17p241p2");
        }
    }
    if (this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
        this.addSupportBaseComment(7, "Ref17p241p3");
    }
    if (this.hasStars(TuViStarHelper.KHOIVIET,1)) {
        this.addSupportBaseComment(7, "Ref17p241p4");
    }
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(8, "Ref17p241p5");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p241p6");
            }
        }
    }
    if (this.hasStar(TuViStar.HOALOC)) {
        this.addSupportBaseComment(7, "Ref17p241p7");
    }
    if (this.hasStar(TuViStar.HOAQUYEN)) {
        this.addSupportBaseComment(8, "Ref17p241p8");
    }
    if (this.hasStar(TuViStar.HOAKHOA)) {
        this.addSupportBaseComment(6, "Ref17p241p9");
    }
    if (this.hasStar(TuViStar.HOAKY)) {
        this.addSupportBaseComment(4, "Ref17p241p10");
    }
    if (this.hasStar(TuViStar.LOCTON)) {
        this.addSupportBaseComment(5, "Ref17p241p11");
    }
    if (this.hasStar(TuViStar.THIENMA)) {
        this.addSupportBaseComment(5, "Ref17p241p12");
    }
}

genRef17p242() {
    if (this.hasStar(TuViStar.THAITUE)) {
        this.addSupportBaseComment(4, "Ref17p242p1");
    }
    if (this.hasStar(TuViStar.PHUCBINH)) {
        this.addSupportBaseComment(5, "Ref17p242p2");
    }
    if (this.hasStar(TuViStar.TUONGQUAN)) {
        this.addSupportBaseComment(5, "Ref17p242p3");
    }
    if (this.hasAllStars(TuViStarHelper.QUANGQUY)) {
        this.addSupportBaseComment(5, "Ref17p242p4");
    }
    if (this.hasHaoStar()) {
        this.addSupportBaseComment(4, "Ref17p242p5");
        if (this.hasManyBadStars || this.hasHostileStars()) {
            this.incPoints(3);
        }
    }
    if (this.hasStars(TuViStarHelper.COTHANQUATU,1)) {
        this.addSupportBaseComment(4, "Ref17p242p6");
    }
    if (this.hasAllStars(TuViStarHelper.HONGDAO)) {
        this.addSupportBaseComment(4, "Ref17p242p7");
        if (this.hasManyBadStars || this.hasHostileStars()) {
            this.addSupportBaseComment(3, "Ref17p242p8");
        }
    }
    if (this.hasStar(TuViStar.DAUQUAN)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(8, "Ref17p242p9");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(3, "Ref17p242p10");
            }
        }
    }
    if (this.hasStar(TuViStar.THIENRIEU)) {
        this.addSupportBaseComment(2, "Ref17p242p11");
    }
    if (this.hasTuanTrietKhong) {
        this.addSupportBaseComment(4, "Ref17p242p12");
    }
}

genRef17p243() {
    if (this.hasStar(TuViStar.PHAQUAN) || this.hasTuanTrietKhong) {
        this.addSupportBaseComment(4, "Ref17p243p1");
    }
    if (this.hasStar(TuViStar.CUMON) || this.hasHoaLinhStar()) {
        this.addSupportBaseComment(4, "Ref17p243p2");
    }
    if (!this.isMan()) {
        if (this.hasStar(TuViStar.TRANGSINH) && (this.hasStars(TuViStarHelper.KINHDACOQUALINH, 2))) {
            this.addSupportBaseComment(4, "Ref17p243p3");
        }
    }
    if (this.hasStarWithForceStatus(TuViStar.THAMLANG, false)) {
        this.addSupportBaseComment(4, "Ref17p243p4");
    }
    if (this.hasAllStars(TuViStarHelper.TUONGHONGDAO)) {
        this.addSupportBaseComment(7, "Ref17p243p5");
    }
    if (this.hasAllStars(TuViStarHelper.DATHAM)) {
        this.addSupportBaseComment(4, "Ref17p243p6");
    }
    if (this.hasStars(TuViStarHelper.SATDARIEUDUONGHOALINH, 3)) {
        this.addSupportBaseComment(2, "Ref17p243p7");
    }
    if (this.hasStar(TuViStar.HOAKY)) {
        if (this.hasStars(TuViStarHelper.KIEPDIA,1)) this.addSupportBaseComment(2, "Ref17p243p8");
        if (this.hasStars(TuViStarHelper.HONGDADAO, 2)) {
            this.addSupportBaseComment(3, "Ref17p243p9");
        }
        if (this.hasStar(TuViStar.THIENRIEU)) {
            this.addSupportBaseComment(4, "Ref17p243p10");
        }
        if (this.hasOppositePalaceStar(TuViStar.PHUCBINH)) {
            this.addSupportBaseComment(4, "Ref17p243p11");
        }
    }
    if (this.hasStar(TuViStar.PHUCBINH)) {
        if (this.hasOppositePalaceStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(4, "Ref17p243p11");
        }
    }
    if (this.isMan()) {
        if (this.hasStar(TuViStar.LOCTON)) {
            if (this.hasStar(TuViStar.HONGLOAN)) {
                this.addSupportBaseComment(7, "Ref17p243p12");
            }
            if (this.hasStars(TuViStarHelper.LONGCAC,1)) {
                this.addSupportBaseComment(9, "Ref17p243p13");
            }
        }
    }
}

genRef17p244() {
    if (this.hasAllStars(TuViStarHelper.LOCMALONG)) {
        this.addSupportBaseComment(8, "Ref17p244p1");
    }
    if (this.hasStar(TuViStar.DAOHOA)) {
        if (this.hasStar(TuViStar.THAI) || this.hasOppositePalaceStar(TuViStar.THAI)) {
            this.addSupportBaseComment(5, "Ref17p244p2");
        }
        if (this.hasStars(TuViStarHelper.HONGCAI,1)) {
            this.addSupportBaseComment(3, "Ref17p244p3");
        }
        if (this.hasStar(TuViStar.HONGLOAN)) {
            if (this.hasStar(TuViStar.HOAKY)) {
                this.addSupportBaseComment(5, "Ref17p244p4");
            }
            if (this.hasStars(TuViStarHelper.TAHUU,1)) {
                if (this.isMan()) {
                    this.addSupportBaseComment(8, "Ref17p244p7");
                } else {
                    this.addSupportBaseComment(3, "Ref17p244p7");
                }
            }
        }
        if (this.hasStars(TuViStarHelper.CACCAI,1)) {
            this.addSupportBaseComment(4, "Ref17p244p8");
        }
        if (this.hasStar(TuViStar.NGUYETDUC)) {
            this.addSupportBaseComment(8, "Ref17p244p10");
        }
        if (this.hasStar(TuViStar.THIENRIEU)) {
            this.addSupportBaseComment(3, "Ref17p244p5");
        }
        if (this.hasStars(TuViStarHelper.CAIMOC,1)) {
            this.addSupportBaseComment(3, "Ref17p244p6");
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(3, "Ref17p244p9");
        }
    }
    if (this.hasStar(TuViStar.THAI)) {
        if (this.hasStar(TuViStar.DAOHOA) || this.hasOppositePalaceStar(TuViStar.DAOHOA)) {
            this.addBaseComment("Ref17p244p2");
        }
    }
    if (this.hasStar(TuViStar.HONGLOAN)) {
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(3, "Ref17p244p9");
        }
    }
    if (this.hasStars(TuViStarHelper.PHUCTUONGTHAIVUONG, 2)) {
        this.addSupportBaseComment(4, "Ref17p244p11");
    }
    if (this.hasStar(TuViStar.THIENMA) && this.hasStars(TuViStarHelper.TUKHONG,1)) {
        this.addSupportBaseComment(3, "Ref17p244p12");
    }
}

genRef17p245() {
    if (this.hasAllStars(TuViStarHelper.TUEDA)) {
        this.addSupportBaseComment(4, "Ref17p245p1");
    }
    if (this.hasStars(TuViStarHelper.TANGKHOCHOA, 2)) {
        this.addSupportBaseComment(3, "Ref17p245p2");
    }
    if (this.hasAllStars(TuViStarHelper.TANGHO)) {
        this.addSupportBaseComment(4, "Ref17p245p3");
    }
}


// Update force based on force of Palaces: Menh, Than, PhucDuc or presence of good stars
//
override updateForce() {
    // Assume final pass
    super.updateForce();
    this.updateForceFromObservation(this.getObservations(TuViRing.Menh));
    this.updateForceFromObservation(this.getThanObservations());
    this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
}

commentPhuThe() {
    this.genTuVi();
    this.genLiemTrinh();
    this.genThienDong();
    this.genVuKhuc();
    this.genThaiDuong();
    this.genThienCo();
    this.genThienPhuR();
    this.genThaiAm();
    this.genThamLang();
    this.genThienTuong();
    this.genThienLuong();
    this.genCuMon();
    this.genThatSat();
    this.genPhaQuan();
    this.genRef17p241();
    this.genRef17p242();
    this.genRef17p243();
    this.genRef17p244();
    this.genRef17p245();
    this.genThienDiaInfluence();
}


override comment() {
    super.comment();
    this.commentPhuThe();
}

}
