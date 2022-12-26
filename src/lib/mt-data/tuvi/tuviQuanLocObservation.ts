import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";

export class TuViQuanLocObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }


  genTuViStar() {
    if (this.hasStar(TuViStar.TUVI)) {
        if (this.palace.chinhTinhCount==1) {
            if (this.palace.branche==Branche.HORSE) {
                this.addSupportBaseComment(8, "Ref17p181p1");
            }
            if (this.palace.branche==Branche.RAT) {
                this.addSupportBaseComment(5, "Ref17p181p2");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(7, "Ref17p181p1");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(6, "Ref17p181p3");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(7, "Ref17p181p4");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(6, "Ref17p181p5");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(5, "Ref17p181p6");
        }
    }
}

genLiemTrinhStar() {
    if (this.hasStar(TuViStar.LIEMTRINH)) {

        if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
            if (this.palace.chinhTinhCount==1) {
                this.addSupportBaseComment(8, "Ref17p181p7");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(9, "Ref17p181p8");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(8, "Ref17p181p9");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(5, "Ref17p181p10");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(4, "Ref17p182p1");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(4, "Ref17p182p2");
        }

    }
}

genThienDongStar() {
    if (this.hasStar(TuViStar.THIENDONG)) {
        if (this.palace.chinhTinhCount==1) {
            if (this.palace.branche==Branche.RABBIT) {
                this.addSupportBaseComment(6, "Ref17p182p3");
            }
            if (this.palace.branche==Branche.COCK) {
                this.addSupportBaseComment(5, "Ref17p182p4");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p182p5");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p182p6");
            }
        }
        if (this.hasStar(TuViStar.THAIAM)) {
            if (this.palace.branche==Branche.RAT) {
                this.addSupportBaseComment(6, "Ref17p182p7");
            }
            if (this.palace.branche==Branche.HORSE) {
                this.addSupportBaseComment(7, "Ref17p182p8");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(9, "Ref17p182p9");
        }
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(4, "Ref17p182p10");
        }

    }
}

genVuKhucStar() {
    if (this.hasStar(TuViStar.VUKHUC)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p183p1");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(7, "Ref17p183p2");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(7, "Ref17p183p3");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(7, "Ref17p183p4");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(6, "Ref17p183p5");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(7, "Ref17p183p6");
        }


    }
}

genThaiDuongStar() {
    if (this.hasStar(TuViStar.THAIDUONG)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isRabbitHorse(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p183p7");
            }
            if (this.palace.branche==Branche.DRAGON) {
                this.addSupportBaseComment(6, "Ref17p183p8");
            }
            if (this.palace.branche==Branche.RAT) {
                this.addSupportBaseComment(6, "Ref17p183p9");
            }
            if (BrancheHelper.isRatDogPig(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p183p10");
            }
        }
        if (this.hasStar(TuViStar.CUMON)) {
            if (this.palace.branche==Branche.TIGER) {
                this.addSupportBaseComment(8, "Ref17p183p11");
            }
            if (this.palace.branche==Branche.MONKEY) {
                this.addSupportBaseComment(5, "Ref17p184p1");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            if (this.palace.branche==Branche.RABBIT) {
                this.addSupportBaseComment(8, "Ref17p184p2");
            }
            if (this.palace.branche==Branche.COCK) {
                this.addSupportBaseComment(7, "Ref17p184p3");
            }
        }

        if (this.hasStar(TuViStar.THAIAM)) {
            if (this.hasTuanTrietKhong) {
                this.addSupportBaseComment(4, "Ref17p184p5");
            } else {
                this.addSupportBaseComment(6, "Ref17p184p4");
            }
        }
    }
}

genThienCo() {
    if (this.hasStar(TuViStar.THIENCO)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isSnakeHorseGoat(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p184p6");
            }
            if (BrancheHelper.isRatOxPig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p184p7");
            }
        }

        if (this.hasStar(TuViStar.THAIAM)) {
            if (this.palace.branche==Branche.MONKEY) {
                this.addSupportBaseComment(6, "Ref17p184p8");
            }
            if (this.palace.branche==Branche.TIGER) {
                this.addSupportBaseComment(5, "Ref17p184p9");
            }
        }
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(8, "Ref17p184p10");
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(8, "Ref17p184p11");
        }
    }
}

genThienPhuRStar() {
    if (this.hasStar(TuViStar.THIENPHUR)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p185p1");
            }
            if (BrancheHelper.isOxRabbitGoatCock(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p185p2");
            }
        }
    }
}

genThaiAmStar() {
    if (this.hasStar(TuViStar.THAIAM)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isCockPig(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p185p3");
            }
            if (this.palace.branche==Branche.DOG) {
                this.addSupportBaseComment(6, "Ref17p185p4");
            }
            if (this.palace.branche==Branche.RABBIT) {
                this.addSupportBaseComment(6, "Ref17p185p5");
            }
            if (BrancheHelper.isDragonSnake(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p185p6");
            }
        }
    }
}

genThamLangStar() {
    if (this.hasStar(TuViStar.THAMLANG)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p185p7");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p185p8");
            }
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p185p9");
            }
        }
    }
}

genCumonStar() {
    if (this.hasStar(TuViStar.CUMON)) {
        this.addBaseComment("Ref17p175p1");
        if (this.palace.chinhTinhCount==1) {
            if (this.palace.branche==Branche.RAT || this.palace.branche==Branche.HORSE) {
                this.addSupportBaseComment(9, "Ref17p185p10");
            }
            if (this.palace.branche==Branche.PIG) {
                this.addSupportBaseComment(5, "Ref17p186p1");
            }
            if (this.palace.branche==Branche.SNAKE) {
                this.addSupportBaseComment(4, "Ref17p186p2");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p186p3");
            }
        }
    }
}

genThienTuongStar() {
    if (this.hasStar(TuViStar.THIENTUONG)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isOxGoat(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p186p4");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p186p5");
            }
            if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p186p6");
            }
        }
    }
}

genThienLuongStar() {
    if (this.hasStar(TuViStar.THIENLUONG)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p186p7");
            }
            if (BrancheHelper.isOxGoat(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p186p8");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p186p9");
            }
        }
    }
}

genRef17p188() {
    if (this.hasSupportStars0(TuViStarHelper.TUPHURCONGUYETDONGLUONG)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(7, "Ref17p188p1");
        } else {
            this.addSupportBaseComment(3, "Ref17p188p1");
        }
        if (this.hasHostileStars()) {
            this.addSupportBaseComment(3, "Ref17p188p6");
        }
    }
    if (this.hasSupportStars0(TuViStarHelper.SATPHALIEMTHAM)) {
        if (this.hasFavorableStars()) this.addSupportBaseComment(7, "Ref17p188p2");
        if (this.hasHostileStars()) this.addSupportBaseComment(5, "Ref17p188p3");
    }
    if (this.hasSupportStars0(TuViStarHelper.VUTUONG)) {
        if (this.hasFavorableStars()) this.addSupportBaseComment(7, "Ref17p188p4");
        if (this.hasHostileStars()) this.addSupportBaseComment(5, "Ref17p188p5");
    }


}

genThatSatStar() {
    if (this.hasStar(TuViStar.THATSAT)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p187p1");
            }
            if (BrancheHelper.isSnakeHorse(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p187p2");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p187p3");
            }
        }
    }
}


genPhaQuanStar() {
    if (this.hasStar(TuViStar.PHAQUAN)) {
        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p187p4");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p187p5");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p187p6");
            }

        }
    }
}


commentQuanLoc() {
    this.genTuViStar();
    this.genLiemTrinhStar();
    this.genThienDongStar();
    this.genVuKhucStar();
    this.genThaiDuongStar();
    this.genThienCo();
    this.genThienPhuRStar();
    this.genThaiAmStar();
    this.genThamLangStar();
    this.genCumonStar();
    this.genThienTuongStar();
    this.genThienLuongStar();
    this.genThatSatStar();
    this.genPhaQuanStar();
    this.genQuiCuc();
    this.genRef17p188();
}


override comment() {
    super.comment();
    this.commentQuanLoc();
}

}
