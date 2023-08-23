import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";

import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";


export class TuViThienDiObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "ThienDi"
  }

   genTuVi() {
    if (this.hasStar(TuViStar.TUVI)) {
        if (this.hasStar(TuViStar.THIENPHUR)) {
            if (this.palace.branche===Branche.HORSE) {
                this.addSupportBaseComment(8, "Ref17p199p1");
            }
        }
        if (this.palace.branche===Branche.RAT) {
            this.addSupportBaseComment(7, "Ref17p199p2");
        }
        if (this.hasAllStars(TuViStarHelper.SATTUONG)) {
            this.addSupportBaseComment(9, "Ref17p199p3");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(5, "Ref17p199p4");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(4, "Ref17p199p5");
        }
    }

}

 genLiemTrinh() {
    if (this.hasStar(TuViStar.LIEMTRINH)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(9, "Ref17p199p6");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(7, "Ref17p199p7");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(9, "Ref17p199p8");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(4, "Ref17p199p9");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(3, "Ref17p200p1");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(3, "Ref17p200p2");
        }
    }

}

 genThienDong() {
    if (this.hasStar(TuViStar.THIENDONG)) {
        if (this.palace.chinhTinhCount===1) {
            if (this.palace.branche===Branche.RABBIT) {
                this.addSupportBaseComment(7, "Ref17p200p3");
            }
            if (this.palace.branche===Branche.COCK) {
                this.addSupportBaseComment(4, "Ref17p200p4");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p200p5");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p200p6");
            }
        }
        if (this.hasStar(TuViStar.THAIAM)) {
            if (this.palace.branche===Branche.RAT || this.hasStar(TuViStar.THIENLUONG)) {
                this.addSupportBaseComment(9, "Ref17p200p7");
            }
            if (this.palace.branche===Branche.HORSE) {
                this.addSupportBaseComment(3, "Ref17p200p8");
            }
        }
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(5, "Ref17p200p9");
        }

    }

}

 genVuKhuc() {
    if (this.hasStar(TuViStar.VUKHUC)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p200p10");
            }
        }
        if (this.hasAllStars(TuViStarHelper.PHUTUONG)) {
            this.addSupportBaseComment(9, "Ref17p200p11");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(6, "Ref17p200p12");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(4, "Ref17p201p1");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(5, "Ref17p201p2");
        }

    }
}

 genThaiDuong() {
    if (this.hasStar(TuViStar.THAIDUONG)) {

        if (BrancheHelper.isTigerToHorse(this.palace.branche)) {
            this.addSupportBaseComment(9, "Ref17p201p3");
        }
        if (BrancheHelper.isMonkeyToPig(this.palace.branche)) {
            this.addSupportBaseComment(2, "Ref17p201p4");
        }
        if (this.palace.chinhTinhCount===1) {
            if (this.palace.branche===Branche.RAT) {
                this.addBaseComment("Ref17p201p5");
            }
        }
        if (this.hasStar(TuViStar.THAIAM)) {
            this.addSupportBaseComment(8, "Ref17p201p6");
            if (this.hasAllStars(TuViStarHelper.TUANKY)) {
                this.incPoints(8);
            }
        }
    }
}

 genThienCo() {
    if (this.hasStar(TuViStar.THIENCO)) {

        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isSnakeHorseGoat(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p201p7");
            }
            if (BrancheHelper.isRatOxPig(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p201p8");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(8, "Ref17p201p9");
        }
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(7, "Ref17p201p10");
        }
        if (this.hasStar(TuViStar.THAIAM)) {
            this.addSupportBaseComment(8, "Ref17p201p11");
            if (this.palace.branche===Branche.TIGER) {
                this.addSupportBaseComment(6, "Ref17p202p1");
            }
        }

    }
}

 genThienPhuR() {
    if (this.hasStar(TuViStar.THIENPHUR)) {

        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p202p2");
            }
            if (BrancheHelper.isOxRabbitGoatCock(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p202p3");
            }
        }
    }
}

 genThaiAm() {
    if (this.hasStar(TuViStar.THAIAM)) {

        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isCockDogPig(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p202p4");
            }
            if (BrancheHelper.isRabbitDragonSnake(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p202p5");
            }
        }
    }
}

 genThamLang() {
    if (this.hasStar(TuViStar.THAMLANG)) {

        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isDragonSnake(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p202p6");
            }
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p202p7");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p202p8");
            }
        }
    }
}

 genCuMon() {
    if (this.hasStar(TuViStar.CUMON)) {

        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isRatHorsePig(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p202p9");
            }
            if (BrancheHelper.isDragonSnakeDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p202p10");
            }
        }
        if (this.hasStars(TuViStarHelper.HOALINH,1)) {
            this.addSupportBaseComment(2, "Ref1p202p10");
        }
    }
}

 genThienTuong() {
    if (this.hasStar(TuViStar.THIENTUONG)) {

        if (this.palace.chinhTinhCount===1) {
          if (BrancheHelper.isOxSnakeGoatPig(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p203p1");
            }
            if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p203p2");
            }
        }
    }
}

 genThienLuong() {
    if (this.hasStar(TuViStar.THIENLUONG)) {

        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p203p3");
            }
            if (BrancheHelper.isOxGoat(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p203p4");
            }
        }
    }
}

 genThatSat() {
    if (this.hasStar(TuViStar.THATSAT)) {

        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p203p5");
            }
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p203p6");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p203p7");
            }
        }
    }
}

 genPhaQuan() {
    if (this.hasStar(TuViStar.PHAQUAN)) {

        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p203p8");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p203p9");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p204p1");
            }
        }
    }
}

 genKinhDuongDala() {
    if (this.hasStar(TuViStar.KINHDUONG) || this.hasStar(TuViStar.DALA)) {
        this.addSupportBaseComment(4, "Ref17p204p2");
        if (this.hasManyGoodStars) {
            this.addSupportBaseComment(5, "Ref17p204p3");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p204p4");
            }
        }
    }
}

 genRef17p204() {
    if (this.hasHoaLinhStar()) {
        this.addSupportBaseComment(5, "Ref17p204p5");
    }
    if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
        this.addSupportBaseComment(3, "Ref17p204p6");
    }

    if (this.hasAllStars(TuViStarHelper.XUONGKHUCKHOIVIET)) {
        this.addSupportBaseComment(8, "Ref17p204p7");
    }
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
        this.addSupportBaseComment(7, "Ref17p204p8");
    }
    if (this.hasAllStars(TuViStarHelper.LOCTONHOALOC)) {
        this.addSupportBaseComment(7, "Ref17p204p9");
    }
    if (this.hasAllStars(TuViStarHelper.KHOAQUYEN)) {
        this.addSupportBaseComment(8, "Ref17p204p10");
    }
    if (this.hasStar(TuViStar.HOAKY)) {
        this.addSupportBaseComment(4, "Ref17p204p11");
    }
    if (this.hasHaoStar()) {
        this.addSupportBaseComment(5, "Ref17p204p12");
    }
    if (this.hasStar(TuViStar.THIENMA)) {
        this.addSupportBaseComment(7, "Ref17p204p13");
    }
}

 genRef17p205() {
    if (this.hasStar(TuViStar.THIENHINH)) {
        this.addSupportBaseComment(3, "Ref17p205p1");
    }
    if (this.hasAllStars(TuViStarHelper.HONGDAOHY)) {
        this.addSupportBaseComment(7, "Ref17p205p2");
    }
    if (this.hasTuanTrietKhong) {
        this.addSupportBaseComment(4, "Ref17p205p3");
        if (this.hasStars(TuViStarHelper.PHATHAM,1)) {
            this.addSupportBaseComment(4, "Ref17p205p4");
        }
        if (this.hasAllStars(TuViStarHelper.TUONGTUONG)) {
            this.addSupportBaseComment(4, "Ref17p205p5");
        }
        if (this.hasStar(TuViStar.THIENMA)) {
            this.addSupportBaseComment(3, "Ref17p205p6");
        }
    }
    if (this.hasStars(TuViStarHelper.TAHUUKIEPKHONG, 2)) {
        this.addSupportBaseComment(3, "Ref17p205p7");
    }
    if (this.hasAllStars(TuViStarHelper.LOCMA)) {
        this.addSupportBaseComment(8, "Ref17p205p8");
    }
    if (this.hasAllStars(TuViStarHelper.DATUEKY)) {
        this.addSupportBaseComment(3, "Ref17p205p9");
    }
    if (this.hasStars(TuViStarHelper.HINHLINHHOAKIEP, 3)) {
        this.addSupportBaseComment(3, "Ref17p205p10");
    }
    if (this.hasAllStars(TuViStarHelper.PHUCKHONGKIEP)) {
        this.addSupportBaseComment(3, "Ref17p205p11");
    }
    if (this.hasAllStars(TuViStarHelper.PHUCTUONGHONGDAO)) {
        this.addSupportBaseComment(4, "Ref17p205p12");
    }
    if (this.hasStars(TuViStarHelper.PHUCTUONGHONGDAOTHAIVUONG, 5)) {
        this.addSupportBaseComment(4, "Ref17p205p13");
    }
    if (this.hasAllStars(TuViStarHelper.LUUKIEP)) {
        this.addSupportBaseComment(2, "Ref17p205p14");
    }
}


 commentThienDi() {
    this.genTuVi();
    this.genLiemTrinh();
    this.genThienDong();
    this.genVuKhuc();
    this.genThaiDuong();
    this.genThienCo();
    this.genThienPhuR();
    this.genThaiAm();
    this.genThamLang();
    this.genCuMon();
    this.genThienTuong();
    this.genThienLuong();
    this.genThatSat();
    this.genPhaQuan();
    this.genKinhDuongDala();
    this.genRef17p204();
    this.genRef17p205();

}


override comment() {
    super.comment();
    this.commentThienDi();
}

}
