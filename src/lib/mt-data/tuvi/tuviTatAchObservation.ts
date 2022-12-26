import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Element } from '../feng-shui/element';
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";
import { DateHelper } from "../../helper/dateHelper";

export class TuViTatAchObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }


  genTuVi() {
    if (this.hasStar(TuViStar.TUVI)) {
        if (BrancheHelper.isRatHorse(this.palace.branche)) {
            if (this.hasSupportStars0(TuViStarHelper.PHURSATLUONG)) {
                this.addSupportBaseComment(8, "Ref17p206p1");
            }
        }
    }
}

genRef17p207() {
    if (this.hasStar(TuViStar.HOAKHOA)) {
        this.addSupportBaseComment(8, "Ref17p207p1");
    }
    if (this.hasAllStars(TuViStarHelper.TAMGIAI)) {
        this.addSupportBaseComment(7, "Ref17p207p2");
    }
    if (this.hasStars(TuViStarHelper.LOCBACSI, 2)) {
        if (!this.hasCombinedSatTinh) {
            this.addSupportBaseComment(7, "Ref17p207p3");
        } else {
            this.addSupportBaseComment(3, "Ref17p207p3");
        }
    }
    if (this.hasStar(TuViStar.DEVUONG)) {
        this.addSupportBaseComment(7, "Ref17p207p4");
    }
    if (this.hasStar(TuViStar.TRANGSINH)) {
        if (!this.hasCombinedSatTinh) {
            this.addSupportBaseComment(8, "Ref17p207p5");
        } else {
            this.addSupportBaseComment(3, "Ref17p207p5");
        }
    }
    if (this.hasStars(TuViStarHelper.THIEUDUONGAMDUCLONG, 4)) {
        this.addSupportBaseComment(5, "Ref17p207p6");
    }
    if (this.hasStar(TuViStar.HOAQUYEN)) {
        if (this.hasManyGoodStars) {
            this.addSupportBaseComment(7, "Ref17p207p7");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(3, "Ref17p207p7");
            }
        }
    }
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
        if (this.hasManyGoodStars) {
            this.addSupportBaseComment(7, "Ref17p207p8");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(3, "Ref17p207p8");
            }
        }
    }
    if (this.hasTuanTrietKhong) {
        this.addSupportBaseComment(9, "Ref17p207p9");
    }
}

genLiemTrinh() {
    if (this.hasStar(TuViStar.LIEMTRINH)) {
        this.addBaseComment("Ref17p208p0");
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(4, "Ref17p208p1");
            if (this.palace.branche==Branche.SNAKE && this.hasAllStars(TuViStarHelper.HOATUONG)) {
                this.addSupportBaseComment(2, "Ref17p208p2");
            }
            if (this.hasStar(TuViStar.DIAKHONG) &&
            this.hasStars(TuViStarHelper.KIEPDIA,1)) {
                this.addSupportBaseComment(4, "Ref17p208p3");
            }
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(2, "Ref17p208p4");
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(2, "Ref17p208p5");
            }
        }
    }
}

genThienDong() {
    if (this.hasStar(TuViStar.THIENDONG)) {
        this.addSupportBaseComment(4, "Ref17p208p6");
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(3, "Ref17p208p7");
        }
        if (this.hasStar(TuViStar.THAIAM)) {
            this.addSupportBaseComment(4, "Ref17p208p8");
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(4, "Ref17p208p9");
        }
        if (this.hasStars(TuViStarHelper.KYHINHTHAIMOC, 3)) {
            this.addSupportBaseComment(4, "Ref17p208p10");
        }
    }

}

genVuKhuc() {
    if (this.hasStar(TuViStar.VUKHUC)) {
        this.addSupportBaseComment(5, "Ref17p208p11");
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(4, "Ref17p208p12");
        }
        if (this.hasStars(TuViStarHelper.XUONGKHUCTHAM, 2)) {
            this.addSupportBaseComment(5, "Ref17p208p13");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(4, "Ref17p208p14");
        }
        if (this.hasStar(TuViStar.LONGDUC)) {
            this.addSupportBaseComment(5, "Ref17p208p15");
        }
        if (this.hasStar(TuViStar.THIENRIEU)) {
            this.addSupportBaseComment(5, "Ref17p208p16");
            if (this.hasStar(TuViStar.THIENVIET) && this.hasStar(TuViStar.PHATOAI)) {
                this.addSupportBaseComment(2, "Ref17p208p17");

            }
        }


    }
}

genThaiDuong() {
    if (this.hasStar(TuViStar.THAIDUONG)) {
        this.addSupportBaseComment(5, "Ref17p208p18");
        if (this.hasStar(TuViStar.THAIAM)) {
            this.addSupportBaseComment(3, "Ref17p208p19");
        }
        if (this.hasManyGoodStars || this.hasManyGoodSupportStars()) {
            if (this.hasTuanTrietKhong) this.addSupportBaseComment(3, "Ref17p208p20");
            if (this.hasAllStars(TuViStarHelper.RIEUKYDA)) {
                this.addSupportBaseComment(4, "Ref17p208p21");
            }
        }
        if (this.hasManyBadStars || this.hasHostileStars()) {
            if (this.hasStar(TuViStar.THIENRIEU) || this.hasStar(TuViStar.DALA) || this.hasStar(TuViStar.HOAKY)) {
                this.addSupportBaseComment(3, "Ref17p209p1");
            }
        }
        if (this.hasStar(TuViStar.THANHLONG)) {
            this.addSupportBaseComment(2, "Ref17p209p2");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(2, "Ref17p209p3");
        }
    }
}

genThienCo() {
    if (this.hasStar(TuViStar.THIENCO)) {
        this.addSupportBaseComment(5, "Ref17p209p4");
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(4, "Ref17p209p5");
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(4, "Ref17p209p6");
        }
        if (this.hasStar(TuViStar.THAIAM)) {
            this.addSupportBaseComment(5, "Ref17p209p7");
        }
        if (this.hasStars(TuViStarHelper.KINHDA,1)) {
            this.addSupportBaseComment(5, "Ref17p209p8");
        }
        if (this.hasAllStars(TuViStarHelper.KHOCHU)) {
            this.addSupportBaseComment(3, "Ref17p209p9");
        }
        if (this.hasAllStars(TuViStarHelper.HINHKHONGKIEP)) {
            this.addSupportBaseComment(3, "Ref17p209p10");
        }
        if (this.hasHoaLinhStar()) {
            this.addSupportBaseComment(3, "Ref17p209p11");
        }
        if (this.hasTuanTrietKhong) this.addSupportBaseComment(3, "Ref17p209p12");
    }
}

genThaiAm() {
    if (this.hasStar(TuViStar.THAIAM)) {
        this.addSupportBaseComment(3, "Ref17p209p13");
        if (this.hasManyBadStars || this.hasHostileStars()) {
            this.addSupportBaseComment(4, "Ref17p209p14");
            if (this.hasStars(TuViStarHelper.RIEUKYDA, 2)) {
                this.addSupportBaseComment(2, "Ref17p209p15");
            }
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(3, "Ref17p209p16");
        }
    }
}

genThamLang() {
    if (this.hasStar(TuViStar.THAMLANG)) {
        if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
            if (this.palace.chinhTinhCount==1) {
                this.addSupportBaseComment(4, "Ref17p209p17");
            }
            if (this.hasStar(TuViStar.DALA)) {
                this.addSupportBaseComment(3, "Ref17p209p18");
            }
        }
        if (BrancheHelper.isDragonDog(this.palace.branche)) {
            if (this.palace.chinhTinhCount==1) {
                this.addSupportBaseComment(2, "Ref17p209p19");
            }
        }
        if (this.palace.branche==Branche.DOG && this.hasStar(TuViStar.BACHHO)) {
            this.addSupportBaseComment(1, "Ref17p209p20");
        }
        if (BrancheHelper.isRatHorse(this.palace.branche)) {
            if (this.palace.chinhTinhCount==1) {
                this.addSupportBaseComment(4, "Ref17p209p21");
            }
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(2, "Ref17p209p22");
        }
        if (this.hasStars(TuViStarHelper.KYLUONG,1)) {
            this.addSupportBaseComment(3, "Ref17p209p23");
        }
        if (this.hasStar(TuViStar.THIENRIEU)) {
            this.addSupportBaseComment(2, "Ref17p210p1");
        }
    }
}

genCuMon() {
    if (this.hasStar(TuViStar.CUMON)) {
        this.addSupportBaseComment(4, "Ref17p210p2");
        if (this.hasStar(TuViStar.THAIDUONG)) {
            this.addSupportBaseComment(3, "Ref17p210p3");
        }
        if (this.hasAllStars(TuViStarHelper.HOAKINH)) {
            this.addSupportBaseComment(4, "Ref17p210p4");
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(2, "Ref17p210p5");
        }
    }
}

genThienTuongKhoi() {
    if (this.hasAllStars(TuViStarHelper.TUONGKHOI)) {
        this.addSupportBaseComment(4, "Ref17p210p6");
        if (this.hasStar(TuViStar.THIENTUONG) && this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p210p7");
            }
        }
        if (this.hasStar(TuViStar.VUKHUC)) {
            this.addSupportBaseComment(4, "Ref17p210p8");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(4, "Ref17p210p9");
        }
        if (this.hasTuanTrietKhong) {
            this.addSupportBaseComment(2, "Ref17p210p10");
        }
    }
}

genThienLuong() {
    if (this.hasStar(TuViStar.THIENLUONG)) {

        if (this.palace.chinhTinhCount==1) {
            if (BrancheHelper.isRatOxPig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p210p11");
            }
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(3, "Ref17p210p12");
        }
    }
}

genThatSat() {
    if (this.hasStar(TuViStar.THATSAT)) {
        this.addSupportBaseComment(4, "Ref17p210p13");
        if (this.hasStar(TuViStar.VUKHUC)) {
            this.addSupportBaseComment(3, "Ref17p210p14");
        }
        if (this.hasStar(TuViStar.DIAKHONG) ||
        this.hasStars(TuViStarHelper.KIEPDIA,1) ||
                this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(3, "Ref17p210p15");
        }
        if (this.hasSatTinh) {
            this.addSupportBaseComment(3, "Ref17p210p16");
        }
        if (this.hasStars(TuViStarHelper.DAKY,1)) {
            this.addSupportBaseComment(3, "Ref17p210p17");
        }
        if (this.hasStars(TuViStarHelper.HAOMOCKY, 2)) {
            this.addSupportBaseComment(3, "Ref17p210p18");
        }
        if (this.hasStars(TuViStarHelper.PHAHINHDA, 2)) {
            this.addSupportBaseComment(4, "Ref17p210p19");
        }
    }
}

genPhaQuan() {
    if (this.hasStar(TuViStar.PHAQUAN)) {
        this.addSupportBaseComment(5, "Ref17p211p1");
        if (this.hasStar(TuViStar.VUKHUC)) {
            this.addSupportBaseComment(4, "Ref17p211p2");
        }
        if (this.hasStar(TuViStar.LIEMTRINH)) {
            this.addSupportBaseComment(4, "Ref17p211p3");
            if (this.hasStar(TuViStar.HOATINH)) {
                this.addSupportBaseComment(2, "Ref17p211p4");
            }
        }
        if (this.hasAllStars(TuViStarHelper.HINHKIKINHDA)) {
            this.addSupportBaseComment(4, "Ref17p211p5");
        }
        if (this.hasStar(TuViStar.DIAKHONG) || this.hasStars(TuViStarHelper.KIEPDIA,1)) {
            this.addSupportBaseComment(3, "Ref17p211p6");
        }
        if (this.hasStars(TuViStarHelper.HAOMOCKY,1)) {
            this.addSupportBaseComment(2, "Ref17p211p7");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(3, "Ref17p211p8");
        }
        if (this.hasAllStars(TuViStarHelper.HINHLINHHOAVIET)) {
            this.addSupportBaseComment(3, "Ref17p211p9");
        }

        if (this.hasAllStars(TuViStarHelper.HINHPHUCKHONGKIEP)) {
            this.addSupportBaseComment(2, "Ref17p211p10");
        }

        if (this.hasAllStars(TuViStarHelper.HONGRIEU)) {
            this.addSupportBaseComment(5, "Ref17p211p11");
        }
    }
}

genKinhDuong() {
    if (this.hasStar(TuViStar.KINHDUONG)) {
        this.addSupportBaseComment(5, "Ref17p211p12");
        if (this.palace.branche==Branche.HORSE || this.hasAllStars(TuViStarHelper.SATHINH)) {
            this.addSupportBaseComment(2, "Ref17p211p13");
        }
        if (BrancheHelper.isRatPig(this.palace.branche)) {
            if (this.hasStar(TuViStar.HOAKY)) {
                this.addSupportBaseComment(2, "Ref17p211p14");
            }
        }
        if (this.hasStars(TuViStarHelper.HOALINHKHONGKIEP, 2)) {
            this.addSupportBaseComment(2, "Ref17p211p15");
        }
        if (this.hasStar(TuViStar.BACHHO)) {
            this.addSupportBaseComment(4, "Ref17p211p16");
        }
        if (this.hasStars(TuViStarHelper.KHONGKIEP,1)) {
            this.addSupportBaseComment(3, "Ref17p211p17");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(2, "Ref17p211p18");
            if (this.hasStars(TuViStarHelper.KHONGKIEP,1)) {
                this.addSupportBaseComment(2, "Ref17p211p19");
            }
        }
        if (this.hasStar(TuViStar.THAITUE)) {
            this.addBaseComment("Ref17p211p20");
        }
    }
}

genDala() {
    if (this.hasStar(TuViStar.DALA)) {
        this.addSupportBaseComment(5, "Ref17p212p1");
        if (BrancheHelper.isRatHorse(this.palace.branche)) {
            if (this.hasStar(TuViStar.THIENPHUR)) {
                this.addSupportBaseComment(2, "Ref17p212p2");
            }
        }
        if (this.hasStar(TuViStar.THIENMA)) {
            this.addSupportBaseComment(3, "Ref17p212p3");
        }
        if (this.hasAllStars(TuViStarHelper.KYRIEU)) {
            this.addSupportBaseComment(3, "Ref17p212p4");
        }

    }
}

genHoaLinhTinh() {
    if (this.hasHoaLinhStar()) {
        if (this.hasFavorableStars()) {
            this.addSupportBaseComment(7, "Ref17p212p5");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(5, "Ref17p212p6");
            }
        }
        if (this.palace.branche==Branche.DRAGON && (this.hasAllStars(TuViStarHelper.KINHLINH))) {
            this.addSupportBaseComment(2, "Ref17p212p7");
        }
        if (this.hasAllStars(TuViStarHelper.HINHVIET)) {
            this.addSupportBaseComment(3, "Ref17p212p8");
            if (this.hasStar(TuViStar.PHILIEM)) {
                this.addSupportBaseComment(3, "Ref17p212p9");
            }
        }
        if (this.hasStar(TuViStar.BENHPHU)) {
            this.addSupportBaseComment(3, "Ref17p212p10");
        }
        if (this.hasStar(TuViStar.MOCDUC)) {
            this.addSupportBaseComment(3, "Ref17p212p11");
        }
    }
}

genDiaKhongKiepTinh() {
    if (this.hasAllStars(TuViStarHelper.KHONGKIEP) || this.hasStar(TuViStar.DIAKIEP)) {
        this.addSupportBaseComment(4, "Ref17p212p12");
        if (this.hasStar(TuViStar.THIENCO)) {
            this.addSupportBaseComment(4, "Ref17p212p13");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(3, "Ref17p212p14");
        }
        if (this.hasStar(TuViStar.THIENVIET)) {
            this.addSupportBaseComment(3, "Ref17p212p15");
            this.addBaseComment("Ref17p212p16");
        }
        if (this.hasAllStars(TuViStarHelper.TUEVIET)) {
            this.addSupportBaseComment(2, "Ref17p212p16");
        }
    }
}

genRef17p212p17() {
    if (this.hasAllStars(TuViStarHelper.LOCKHONGKIEP)) {
        this.addSupportBaseComment(5, "Ref17p212p17");
    }
}

genHoaKyStar() {
    if (this.hasStar(TuViStar.HOAKY)) {
        this.addSupportBaseComment(5, "Ref17p212p18a");
        if (this.isMan()) {
            this.addSupportBaseComment(4, "Ref17p212p18b");
        } else {
            this.addSupportBaseComment(4, "Ref17p212p18c");
            if (this.hasStar(TuViStar.THAIDUONG) || this.hasStar(TuViStar.THIENHU)) {
                this.addSupportBaseComment(4, "Ref17p212p19");
            }
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            if (BrancheHelper.isRatPig(this.palace.branche)) {
                this.addSupportBaseComment(2, "Ref17p213p1");
            }
        }
        if (this.hasStars(TuViStarHelper.TANGKHACH,1)) {
            this.addSupportBaseComment(2, "Ref17p213p2");
        }
        if (this.hasAllStars(TuViStarHelper.DAITIEUHAO) || this.hasStar(TuViStar.MOCDUC)) {
            this.addSupportBaseComment(4, "Ref17p213p3");
        }
        if (this.hasStar(TuViStar.THIENRIEU)) {
            this.addSupportBaseComment(5, "Ref17p213p4");
        }

    }
}

genThienMaStar() {
    if (this.hasStar(TuViStar.THIENMA)) {
        if (this.hasStar(TuViStar.DIAKIEP) || this.hasStar(TuViStar.TUEPHA)) {
            this.addSupportBaseComment(2, "Ref17p213p5");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(2, "Ref17p213p6");
        }
        if (this.hasTuanTrietKhong) {
            this.addSupportBaseComment(3, "Ref17p213p7");
        }
    }
}

genThaiTueStar() {
    if (this.hasStar(TuViStar.THAITUE)) {
        this.addSupportBaseComment(5, "Ref17p213p8");
        if (this.hasAllStars(TuViStarHelper.SATDAKY)) {
            this.addSupportBaseComment(2, "Ref17p213p9");
        }
    }
}

genHaoStar() {
    if (this.hasHaoStar()) {
        this.addSupportBaseComment(4, "Ref17p213p10");
    }
}

genTangMonStar() {
    if (this.hasStar(TuViStar.TANGMON)) {
        this.addSupportBaseComment(4, "Ref17p213p11");

        if (this.hasStar(TuViStar.TUVI)) {
            this.addSupportBaseComment(3, "Ref17p213p12");
        }
        if (this.hasAllStars(TuViStarHelper.HOKHOCHU)) {
            this.addSupportBaseComment(3, "Ref17p213p13");
        }
        if (this.hasStar(TuViStar.DIEUKHACH)) {
            this.addSupportBaseComment(3, "Ref17p213p14");
        }
    }
}

genBachHoStar() {
    if (this.hasStar(TuViStar.BACHHO)) {
        this.addSupportBaseComment(3, "Ref17p213p13");
        if (this.hasAllStars(TuViStarHelper.KINHDA)) {
            this.addSupportBaseComment(3, "Ref17p213p13");
        }
        if (this.hasStar(TuViStar.THIENRIEU)) {
            this.addSupportBaseComment(4, "Ref17p213p14");
        }
        if (this.hasStars(TuViStarHelper.QUANPHURF,1)) {
            this.addSupportBaseComment(3, "Ref17p213p15");
        }
    }
}

genRef17p214() {
    if (this.hasStar(TuViStar.THIENKHOC)) {
        this.addSupportBaseComment(4, "Ref17p214p1");
    }
    if (this.hasStar(TuViStar.THIENHU)) {
        this.addSupportBaseComment(3, "Ref17p214p2");
    }
    if (this.hasStar(TuViStar.THIENHINH)) {
        this.addSupportBaseComment(3, "Ref17p214p3");
        if (this.hasAllStars(TuViStarHelper.KINHDAU)) {
            this.addSupportBaseComment(3, "Ref17p214p4");
        }
        if (this.hasStars(TuViStarHelper.KIEPRIEUKHONG,1)) {
            this.addSupportBaseComment(4, "Ref17p214p5");
        }
        if (this.hasStar(TuViStar.PHUCBINH)) {
            this.addSupportBaseComment(4, "Ref17p214p6");
        }
        if (this.hasAllStars(TuViStarHelper.KIEPKY)) {
            this.addSupportBaseComment(3, "Ref17p214p7");
        }
    }
    if (this.hasStar(TuViStar.LONGTRI)) {
        if (this.hasStar(TuViStar.THAIDUONG) || this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(5, "Ref17p214p8");
        }
        if (this.hasStar(TuViStar.THAIAM) || this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(5, "Ref17p214p9");
        }
        if (this.hasStars(TuViStarHelper.KHONGKIEPMOC, 2)) {
            this.addSupportBaseComment(3, "Ref17p214p10");
        }
    }
    if (this.hasAllStars(TuViStarHelper.HONGDAO)) {
        this.addSupportBaseComment(4, "Ref17p214p11");
        if (this.hasStars(TuViStarHelper.KHONGKIEP,1)) {
            this.addSupportBaseComment(4, "Ref17p214p12");
        }
        if (this.hasAllStars(TuViStarHelper.RIEUHY)) {
            this.addSupportBaseComment(4, "Ref17p214p13");
        }
    }
    if (this.hasStar(TuViStar.DIEUKHACH)) {
        this.addSupportBaseComment(3, "Ref17p214p14");
    }
    if (this.hasAllStars(TuViStarHelper.QUANPHURF) && this.hasStar(TuViStar.KINHDUONG)) {
        this.addSupportBaseComment(2, "Ref17p214p15");
    }
    if (this.hasStar(TuViStar.THAI)) {
        if (this.hasStars(TuViStarHelper.KHONGKIEP,1)) {
            if (!this.isMan()) this.addSupportBaseComment(3, "Ref17p214p16");
        }
        if (this.hasStars(TuViStarHelper.HONGDAOKINHKYMOC, 4)) {
            this.addSupportBaseComment(3, "Ref17p214p17");
        }
    }
}

genRef17p215() {
    if (this.hasStar(TuViStar.MOCDUC)) {
        this.addSupportBaseComment(5, "Ref17p215p1");
    }
    if (this.hasStar(TuViStar.BENH)) {
        this.addSupportBaseComment(5, "Ref17p215p2");
        if (this.hasAllStars(TuViStarHelper.TUPHUR)) {
            this.addSupportBaseComment(4, "Ref17p215p3");
            if (this.hasStars(TuViStarHelper.KYHINH,1)) {
                this.addSupportBaseComment(4, "Ref17p215p4");
            }
            if (this.hasHaoStar() || this.hasSatTinh) {
                this.addSupportBaseComment(3, "Ref17p215p5");
            }
        }
    }
    if (this.hasStar(TuViStar.THIENRIEU)) {
        this.addSupportBaseComment(4, "Ref17p215p6");
        if (this.hasStar(TuViStar.TANGMON)) {
            this.addSupportBaseComment(3, "Ref17p215p7");
        }
        if (this.hasHoaLinhStar()) {
            this.addSupportBaseComment(4, "Ref17p215p8");
        }
    }
    if (this.hasStar(TuViStar.LUUHA)) {
        this.addSupportBaseComment(2, "Ref17p215p9");

        if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
            this.addSupportBaseComment(1, "Ref17p215p10");
        }
        if (this.hasStar(TuViStar.KIEPSAT)) {
            this.addSupportBaseComment(1, "Ref17p215p11");
        }
    }
    if (this.hasStar(TuViStar.HOACAI)) {
        if (this.hasStar(TuViStar.MOCDUC)) {
            this.addSupportBaseComment(4, "Ref17p215p12");
        }
        if (this.hasStar(TuViStar.THIENRIEU)) {
            this.addSupportBaseComment(4, "Ref17p215p13");
        }
    }
    if (this.hasStar(TuViStar.HYTHAN)) {
        this.addSupportBaseComment(4, "Ref17p215p14");
    }
    if (this.hasAllStars(TuViStarHelper.PHUCHINHVIET)) {
        this.addSupportBaseComment(2, "Ref17p215p15");
    }
    if (this.hasStars(TuViStarHelper.COTHANQUATU,1)) {
        this.addSupportBaseComment(3, "Ref17p215p16");
    }
    if (this.hasStar(TuViStar.DUONG)) {
        this.addBaseComment("Ref17p215p17");
    }
}

genRef17p270_272() {
    const lunar = this.tuviHoroscope.birthLunar
    const iRes = DateHelper.kimSaHourType(lunar, this.isMan());
    if (iRes==2) {
        this.addSupportBaseComment(3, "Ref17p270p1a");
    } else {
        if (iRes==1) {
            this.addSupportBaseComment(4, "Ref17p270p1b");
        }
    }
    if (DateHelper.isQuanSatHour(lunar)) {
        this.addSupportBaseComment(4, "Ref17p270p2");
    }
    if (DateHelper.isTuongQuanHour(lunar)) {
        this.addSupportBaseComment(4, "Ref17p271p1");
    }
    if (DateHelper.isDiemVuongHour(lunar)) {
        this.addSupportBaseComment(5, "Ref17p271p2");
    }
    if (DateHelper.isHourSeasonCompatible(lunar)) {
        this.addSupportBaseComment(5, "Ref17p272p1");
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
      this.incPoints(8);
    }
    //}
}

commentTatAch() {
    this.genRef17p207();
    this.genTuVi();
    this.genLiemTrinh();
    this.genThienDong();
    this.genVuKhuc();
    this.genThaiDuong();
    this.genThienCo();
    this.genThaiAm();
    this.genThamLang();
    this.genCuMon();
    this.genThienTuongKhoi();
    this.genThienLuong();
    this.genThatSat();
    this.genPhaQuan();
    this.genKinhDuong();
    this.genDala();
    this.genHoaLinhTinh();
    this.genDiaKhongKiepTinh();
    this.genRef17p212p17();
    this.genHoaKyStar();
    this.genThienMaStar();
    this.genThaiTueStar();
    this.genHaoStar();
    this.genTangMonStar();
    this.genBachHoStar();
    this.genRef17p214();
    this.genRef17p215();
    this.genRef17p270_272();
}


override comment() {
    super.comment();
    this.commentTatAch();
}

}
