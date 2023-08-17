import { BrancheHelper } from "../../helper/brancheHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ElementRelation } from "../feng-shui/element-relation";
import { Energy } from "../feng-shui/energy";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { TuviMenhObservation } from "./tuviMenhObservation";
import { Element } from '../feng-shui/element';
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";
import { Trunk } from "../bazi/trunk";
import { BrancheRelation } from "../bazi/brancheRelation";
import { TuViHelper } from "../../helper/tuviHelper";

export class TuViNoBocObservation extends TuViPalaceObservationBase {

  menhObservation: TuViPalaceObservationBase = null;

  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }
  getHeaderSuffix(): string {
    return "NoBoc"
  }

  isMenhStarFavorable( starArr: TuViStar[]) {
    let res = false;

    if (this.menhObservation != null) {
        if (this.menhObservation.isGoodStarsFavorable() &&
        this.menhObservation.palace.getNote() > TuViPalace.GOODNOTESREFERENCE) {
            res = this.hasMenhNoBocStars(starArr);
        }
    }
    return res;
}


hasMenhNoBocStars(starArr: TuViStar[]) {
    let res = false;
    if (this.menhObservation != null) {
      for (let index = 0; index < starArr.length; index++) {
        const tuViStar = starArr[index];
            if (this.menhObservation.hasStar(tuViStar)) {
                res = true;
                break;
            }
        }
    }
    return res;

}

isMenhStarNotFavorable(starArr: TuViStar[]) {
  let res = false;
  if (this.menhObservation != null) {
        if (!this.menhObservation.isGoodStarsFavorable() &&
            this.menhObservation.palace.getNote() < TuViPalace.BADNOTESREFERENCE) {
            res = this.hasMenhNoBocStars(starArr);
        }
    }
    return res;
}

genRef17p193_194p4() {
    if (this.isMenhStarFavorable(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {

        if (this.hasOneFavorableStar(TuViStarHelper.SATPHALIEMTHAM)) {
            this.addSupportBaseComment(8, "Ref17p193p1");
        }
        if (this.hasOneNonFavorableStar(TuViStarHelper.SATPHALIEMTHAM)) {
            this.addSupportBaseComment(4, "Ref17p193p2");
        }

        if (this.hasOneFavorableStar(TuViStarHelper.VUTUONG)) {
            this.addSupportBaseComment(9, "Ref17p193p3");
        }
        if (this.hasOneNonFavorableStar(TuViStarHelper.VUTUONG)) {
            this.addSupportBaseComment(3, "Ref17p193p4");
        }
        if (this.hasSatTinh) {
            if (this.isGoodStarsFavorable()) {
                this.addSupportBaseComment(3, "Ref17p193p5");
            } else {
                this.addSupportBaseComment(2, "Ref17p193p6");
            }
        }
    } else {

        if (this.isMenhStarNotFavorable(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {
            if (this.hasOneFavorableStar(TuViStarHelper.SATPHALIEMTHAM)) {
                this.addBaseComment("Ref17p193p7");
            }
            if (this.hasOneNonFavorableStar(TuViStarHelper.SATPHALIEMTHAM)) {
                this.addBaseComment("Ref17p193p8");
            }
            if (this.hasOneFavorableStar(TuViStarHelper.VUTUONG)) {
                this.addSupportBaseComment(8, "Ref17p194p1");
            }
            if (this.hasOneNonFavorableStar(TuViStarHelper.VUTUONG)) {
                this.addSupportBaseComment(4, "Ref17p194p2");
            }
            if (this.hasSatTinh) {
                if (this.isGoodStarsFavorable()) {
                    this.addSupportBaseComment(3, "Ref17p194p3");
                } else {
                    this.addSupportBaseComment(4, "Ref17p194p4");
                }
            }

        }
    }
}

genRef17p194p5_195p6() {

    if (this.isMenhStarFavorable(TuViStarHelper.SATPHALIEMTHAM)) {

        if (this.hasOneFavorableStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {
            this.addSupportBaseComment(7, "Ref17p194p5");
        }
        if (this.hasOneNonFavorableStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {
            this.addSupportBaseComment(4, "Ref17p194p6");
        }

        if (this.hasOneFavorableStar(TuViStarHelper.VUTUONG)) {
            this.addBaseComment("Ref17p194p7");
        }
        if (this.hasOneNonFavorableStar(TuViStarHelper.VUTUONG)) {
            this.addSupportBaseComment(4, "Ref17p194p8");
        }
        if (this.hasSatTinh) {
            if (this.isGoodStarsFavorable()) {
                this.addSupportBaseComment(9, "Ref17p194p9");
            } else {
                this.addSupportBaseComment(3, "Ref17p194p10");
            }
        }
    } else {
        if (this.isMenhStarNotFavorable(TuViStarHelper.SATPHALIEMTHAM)) {
            if (this.hasOneFavorableStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {
                this.addSupportBaseComment(9, "Ref17p195p1");
            }
            if (this.hasOneNonFavorableStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {
                this.addSupportBaseComment(5, "Ref17p195p2");
            }
            if (this.hasOneFavorableStar(TuViStarHelper.VUTUONG)) {
                this.addSupportBaseComment(7, "Ref17p195p3");
            }
            if (this.hasOneNonFavorableStar(TuViStarHelper.VUTUONG)) {
                this.addSupportBaseComment(4, "Ref17p195p4");
            }
            if (this.hasSatTinh) {
                if (this.isFavorable()) {
                    this.addSupportBaseComment(6, "Ref17p195p5");
                } else {
                    this.addSupportBaseComment(3, "Ref17p195p6");
                }
            }
        }
    }
}

genRef17p195p7_p196() {

    if (this.isMenhStarFavorable(TuViStarHelper.VUTUONG)) {

        if (this.hasOneFavorableStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {
            this.addSupportBaseComment(6, "Ref17p195p7");
        }
        if (this.hasOneNonFavorableStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {
            this.addSupportBaseComment(4, "Ref17p195p8");
        }

        if (this.hasOneFavorableStar(TuViStarHelper.SATPHALIEMTHAM)) {
            this.addSupportBaseComment(8, "Ref17p195p9");
        }

        if (this.hasOneFavorableStar(TuViStarHelper.SATPHALIEMTHAM)) {
            this.addSupportBaseComment(3, "Ref17p196p1");
        }
        if (this.hasSatTinh) {
            if (this.isGoodStarsFavorable()) {
                this.addSupportBaseComment(8, "Ref17p195p9");
            } else {
                this.addSupportBaseComment(3, "Ref17p196p1");
            }
        }
    } else {
        if (this.isMenhStarNotFavorable(TuViStarHelper.VUTUONG)) {
            if (this.hasOneFavorableStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {
                this.addSupportBaseComment(7, "Ref17p196p2");
            }
            if (this.hasOneNonFavorableStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG)) {
                this.addSupportBaseComment(4, "Ref17p196p3");
            }

            if (this.hasOneFavorableStar(TuViStarHelper.SATPHALIEMTHAM)) {
                this.addSupportBaseComment(7, "Ref17p196p4");
            }
            if (this.hasOneNonFavorableStar(TuViStarHelper.SATPHALIEMTHAM)) {
                this.addSupportBaseComment(4, "Ref17p196p5");
            }
            if (this.hasSatTinh) {
                if (this.isGoodStarsFavorable()) {
                    this.addSupportBaseComment(7, "Ref17p196p4");
                } else {
                    this.addSupportBaseComment(4, "Ref17p196p5");
                }
            }
        }
    }
}

genRef17p197() {
    if (this.hasStars(TuViStarHelper.XUONGKHUCKHOIVIET, 3)) {
        this.addSupportBaseComment(5, "Ref17p197p1");
        if (this.hasManyGoodStars) {
            this.addSupportBaseComment(5, "Ref17p197p2");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(5, "Ref17p197p3");
            }
        }
    }
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(7, "Ref17p197p4");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(3, "Ref17p197p5");
            }
        }
    }
    if (this.hasStar(TuViStar.LOCTON)) {
        this.addSupportBaseComment(5, "Ref17p197p6");
    }

    if (this.hasAllStars(TuViStarHelper.KHOAQUYENLOC)) {
        this.addSupportBaseComment(6, "Ref17p197p7");
    }
    if (this.hasStar(TuViStar.HOAKY)) {
        this.addSupportBaseComment(3, "Ref17p197p8");
    }
    if (this.hasHaoStar()) {
        this.addSupportBaseComment(2, "Ref17p197p9");
    }
    if (this.hasAllStars(TuViStarHelper.KHOCHU)) {
        this.addSupportBaseComment(4, "Ref17p197p10");
    }
    if (this.hasStar(TuViStar.TUONGQUAN)) {
        this.addSupportBaseComment(4, "Ref17p197p11");
    }
}

genRef17p198() {
    if (this.hasStar(TuViStar.PHUCBINH)) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(9, "Ref17p198p1");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p198p2");
            }
        }
    }
    if (this.hasStar(TuViStar.DAOHOA)) {
        this.addSupportBaseComment(3, "Ref17p198p3");
    }
    if (this.hasTuanTrietKhong) {
        this.addSupportBaseComment(4, "Ref17p198p4");
    }

    if (this.hasAllStars(TuViStarHelper.QUYENDAO)) {
        this.addSupportBaseComment(4, "Ref17p198p7");
    }
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
        if (this.hasStar(TuViStar.DIAKHONG) ||
                this.hasStars(TuViStarHelper.KIEPDIA,1) ){
            this.addSupportBaseComment(4, "Ref17p198p5");
        }
        if (this.hasStars(TuViStarHelper.BINHTUONG,1)) {
            this.addSupportBaseComment(8, "Ref17p198p6");
        }

        if (this.hasStars(TuViStarHelper.HONGCAIDAO,1)) {
            this.addSupportBaseComment(5, "Ref17p198p8");
        }
    }

    if (this.hasAllStars(TuViStarHelper.HONGDAOTHAIVUONG)) {
        this.addSupportBaseComment(4, "Ref17p198p9");
    }
}


 commentNoBoc() {
    this.menhObservation = this.getObservations(TuViRing.Menh);
    this.genRef17p193_194p4();
    this.genRef17p194p5_195p6();
    this.genRef17p195p7_p196();
    this.genRef17p197();
    this.genRef17p198();
}


override comment() {
    super.comment();
    this.commentNoBoc();
}


}
