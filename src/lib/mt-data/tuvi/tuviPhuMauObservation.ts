import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ElementRelation } from "../feng-shui/element-relation";
import { Energy } from "../feng-shui/energy";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Element } from '../../mt-data/feng-shui/element';
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";


export class TuViPhuMauObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "PhuMau"
  }

  genRef17p142() {
    const starPalace = TuViStar.THAIDUONG.getPalace();
    const isDayBorn = this.isBornInDay();
    if (starPalace.branche===TuViStar.THAIAM.getPalace().branche) {
        const observation = starPalace.palaceObservation;

        if (!observation.hasTuanTrietKhong) {
            if (isDayBorn) {
                this.addBaseComment("Ref17p142p7");
            } else {
                this.addBaseComment("Ref17p142p8");
            }
        } else {
            if (isDayBorn) {
                this.addBaseComment("Ref17p142p9");
            } else {
                this.addBaseComment("Ref17p142p10");
            }
        }
    } else {
        if (this.tuviHoroscope.tuviPalaceStarMap.isThaiDuongFavorable) {
            if (this.tuviHoroscope.tuviPalaceStarMap.isThaiAmFavorable) {
                if (isDayBorn) {
                    this.addBaseComment("Ref17p142p3");
                } else {
                    this.addBaseComment("Ref17p142p4");
                }
            } else {
                this.addBaseComment("Ref17p142p1");
            }
        } else {
            if (this.tuviHoroscope.tuviPalaceStarMap.isThaiAmFavorable) {
                this.addBaseComment("Ref17p142p2");
            } else {
                if (isDayBorn) {
                    this.addBaseComment("Ref17p142p5");
                } else {
                    this.addBaseComment("Ref17p142p6");
                }
            }

        }
    }
}

genTuViStar() {
    if (this.hasStar(TuViStar.TUVI)) {
        if (this.palace.chinhTinhCount===1) {
            if (this.palace.branche===Branche.HORSE) {
                this.addSupportBaseComment(9, "Ref17p142p11");
            }
            if (this.palace.branche===Branche.RAT) {
                this.addSupportBaseComment(8, "Ref17p142p12");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(7, "Ref17p142p13");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(7, "Ref17p142p14");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(5, "Ref17p142p15");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(5, "Ref17p142p16");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(5, "Ref17p143p1");
        }
    }
}

genLiemTrinhStar() {
    if (this.hasStar(TuViStar.LIEMTRINH)) {
        if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
            if (this.palace.chinhTinhCount===1) {
                this.addSupportBaseComment(5, "Ref17p143p2");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(5, "Ref17p143p3");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(3, "Ref17p143p4");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(3, "Ref17p143p5");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(3, "Ref17p143p6");
        }
    }
}

genThienDongStar() {
    if (this.hasStar(TuViStar.THIENDONG)) {
        if (this.palace.chinhTinhCount===1) {
            if (this.palace.branche===Branche.RABBIT) {
                this.addSupportBaseComment(6, "Ref17p143p7");
            }
            if (this.palace.branche===Branche.COCK) {
                this.addSupportBaseComment(5, "Ref17p143p8");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p143p9");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p143p10");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(6, "Ref17p143p11");
        }
        if (this.hasStar(TuViStar.THAIAM)) {
            if (this.palace.branche===Branche.RAT) {
                this.addSupportBaseComment(8, "Ref17p143p12");
            }
            if (this.palace.branche===Branche.HORSE) {
                this.addSupportBaseComment(4, "Ref17p143p13");
            }
        }
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(4, "Ref17p143p14");
        }
    }
}

genVuKhucStar() {
    if (this.hasStar(TuViStar.VUKHUC)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p144p1");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR)) {
            this.addSupportBaseComment(8, "Ref17p144p2");
        }
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(8, "Ref17p144p3");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(5, "Ref17p144p4");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(4, "Ref17p144p5");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(3, "Ref17p144p6");
        }
    }
}

genThaiDuongStar() {
    if (this.hasStar(TuViStar.THAIDUONG)) {
        if (BrancheHelper.isTigerToHorse(this.palace.branche)) {
            this.addSupportBaseComment(8, "Ref17p144p7");
        }
        if (BrancheHelper.isMonkeyToRat(this.palace.branche)) {
            this.addSupportBaseComment(4, "Ref17p144p8");
        }
        if (this.palace.branche===Branche.OX || this.palace.branche===Branche.GOAT) {
            if (this.hasStar(TuViStar.THAIAM)) {
                this.addSupportBaseComment(5, "Ref17p144p9");
            }
        }

    }
}

genThienCo() {
    if (this.hasStar(TuViStar.THIENCO)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isSnakeHorse(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p144p10");
            }
            if (BrancheHelper.isRatPigOx(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p144p11");
            }
        }
        if (this.hasStar(TuViStar.THAIAM)) {
            if (this.palace.branche===Branche.MONKEY) {
                this.addSupportBaseComment(6, "Ref17p144p12");
            }
            if (this.palace.branche===Branche.TIGER) {
                this.addSupportBaseComment(6, "Ref17p144p13");
            }
        }
        if (this.hasStar(TuViStar.THIENLUONG)) {
            this.addSupportBaseComment(7, "Ref17p144p14");
        }
        if (this.hasStar(TuViStar.CUMON)) {
            this.addSupportBaseComment(4, "Ref17p144p15");
        }
    }
}

genThienPhuRStar() {
    if (this.hasStar(TuViStar.THIENPHUR)) {
        this.addSupportBaseComment(6, "Ref17p145p1");
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p145p2");
            }
            if (BrancheHelper.isOxRabbitGoatCock(this.palace.branche)) {
                this.addBaseComment("Ref17p145p3");
            }
        }
    }
}

genThaiAmStar() {
    if (this.hasStar(TuViStar.THAIAM)) {
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isCockDogPig(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p145p4");
            }
            if (BrancheHelper.isRabbitDragonSnake(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p145p5");
            }
        }
    }
}

genThamLangStar() {
    if (this.hasStar(TuViStar.THAMLANG)) {
        this.addSupportBaseComment(5, "Ref17p145p6");
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p145p7");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p145p8");
            }
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p145p9");
            }
        }
    }
}

genCumonStar() {
    if (this.hasStar(TuViStar.CUMON)) {
        this.addSupportBaseComment(5, "Ref17p145p10");
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isRatHorsePig(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p145p11");
            }
            if (this.palace.branche===Branche.SNAKE) {
                this.addSupportBaseComment(4, "Ref17p145p12");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p145p13");
            }
        }
    }
}

genThienTuongStar() {
    if (this.hasStar(TuViStar.THIENTUONG)) {
        this.addSupportBaseComment(5, "Ref17p146p1");
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isSnakePig(this.palace.branche) || BrancheHelper.isOxGoat(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p146p2");
            }
            if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p146p3");
            }
        }
    }
}

genThienLuongStar() {
    if (this.hasStar(TuViStar.THIENLUONG)) {
        this.addBaseComment("Ref17p146p1");
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isSnakeHorse(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p146p4");
            }
            if (BrancheHelper.isOxGoat(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p146p5");
            }
            if (BrancheHelper.isSnakePig(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p146p6");
            }
        }
    }
}

genThatSatStar() {
    if (this.hasStar(TuViStar.THATSAT)) {
        this.addSupportBaseComment(4, "Ref17p146p7");
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(8, "Ref17p146p8");
            }
            if (BrancheHelper.isSnakeHorse(this.palace.branche)) {
                this.addSupportBaseComment(6, "Ref17p146p9");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p146p10");
            }
        }
    }
}


genPhaQuanStar() {
    if (this.hasStar(TuViStar.PHAQUAN)) {
        this.addSupportBaseComment(4, "Ref17p147p1");
        if (this.palace.chinhTinhCount===1) {
            if (BrancheHelper.isRatHorse(this.palace.branche)) {
                this.addSupportBaseComment(5, "Ref17p147p2");
            }
            if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p147p3");
            }
            if (BrancheHelper.isDragonDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p147p4");
            }
        }
    }
}

genKinhDuongStar() {
    if (this.hasStar(TuViStar.KINHDUONG)) {
        this.addSupportBaseComment(5, "Ref17p147p5");
        if (this.hasStar(TuViStar.LIEMTRINH)) {
            this.addSupportBaseComment(3, "Ref17p147p6");
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(3, "Ref17p147p7");
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(4, "Ref17p147p8");
        }
    }
}

genHoaLinhTinhStar() {
    if (this.hasHoaLinhStar()) {
        this.addSupportBaseComment(4, "Ref17p147p9");
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(8, "Ref17p147p10");
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(3, "Ref17p147p11");
        }
    }
}

genDiaKhongKiepStar() {
    if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
        this.addSupportBaseComment(4, "Ref17p147p12");
    }
}

genVanXuongKhucStar() {
    if (this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
        this.addSupportBaseComment(7, "Ref17p147p13");
    }
}

genKhoiVietStar() {
    if (this.hasStars(TuViStarHelper.KHOIVIET,1)) {
        this.addSupportBaseComment(6, "Ref17p147p14");
    }
}

genTaHuuStar() {
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
        this.addSupportBaseComment(7, "Ref17p148p1a");
        if (this.hasCombinedSatTinh) {
            this.addSupportBaseComment(4, "Ref17p148p1b");
        }

    }
}

genLocTonStar() {
    if (this.hasStar(TuViStar.LOCTON)) {
        this.addSupportBaseComment(5, "Ref17p148p2");
    }
}

genHoaLocStar() {
    if (this.hasStar(TuViStar.HOALOC)) {
        this.addSupportBaseComment(6, "Ref17p148p3");
    }
}

genHoaQuyenStar() {
    if (this.hasStar(TuViStar.HOAQUYEN)) {
        this.addSupportBaseComment(7, "Ref17p148p4");
    }
}

genHoaKhoaStar() {
    if (this.hasStar(TuViStar.HOAKHOA)) {
        this.addSupportBaseComment(8, "Ref17p148p5");
    }
}

genHoaKyStar() {
    if (this.hasStar(TuViStar.HOAKY)) {
        this.addSupportBaseComment(4, "Ref17p148p6");
        if (this.palace.branche===Branche.OX && this.hasAllStars(TuViStarHelper.NHATNGUYET)) {
            this.addSupportBaseComment(8, "Ref17p148p7");
        }
        if (this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
            this.addSupportBaseComment(3, "Ref17p148p8");
        }
    }
}

genThienMaStar() {
    if (this.hasStar(TuViStar.THIENMA)) {
        this.addSupportBaseComment(6, "Ref17p148p9");
        if (this.hasStar(TuViStar.HOALOC)) {
            this.addSupportBaseComment(6, "Ref17p148p10");
        }
        if (this.hasStar(TuViStar.DALA)) {
            this.addSupportBaseComment(4, "Ref17p148p11a");
            if (this.hasCombinedSatTinh) {
                this.addSupportBaseComment(4, "Ref17p148p11b");
            }
        }
    }
}

genThaiTueStar() {
    if (this.hasStar(TuViStar.THAITUE)) {
        this.addSupportBaseComment(4, "Ref17p148p12a");
        if (this.hasCombinedSatTinh || this.hasSupportStars0(TuViStarHelper.DAKY)) {
            this.addSupportBaseComment(4, "Ref17p148p12b");
        }
    }
}

genCoThanQuaTuStar() {
    if (this.hasStars(TuViStarHelper.COTHANQUATU,1)) {
        this.addSupportBaseComment(4, "Ref17p149p1a");
        if (this.hasCombinedSatTinh) {
            this.addSupportBaseComment(4, "Ref17p149p1b");
        }
    }
}

genDaoHoaHongLoanStar() {
    if (this.hasAllStars(TuViStarHelper.HONGDAO)) {
        this.addSupportBaseComment(4, "Ref17p149p2a");
        if (this.hasStar(TuViStar.DEVUONG) || this.hasStar(TuViStar.THAITUE)) {
            this.addSupportBaseComment(4, "Ref17p149p2b");
        }
    }
}

genTuanTrietStar() {
    if (this.hasAllStars(TuViStarHelper.TUANTRIET)) {
        this.addSupportBaseComment(4, "Ref17p149p3");
    }
}

commentPhuMau() {
    this.genRef17p142();
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
    this.genKinhDuongStar();
    this.genHoaLinhTinhStar();
    this.genDiaKhongKiepStar();
    this.genVanXuongKhucStar();
    this.genKhoiVietStar();
    this.genTaHuuStar();
    this.genLocTonStar();
    this.genHoaLocStar();
    this.genHoaQuyenStar();
    this.genHoaKhoaStar();
    this.genHoaKyStar();
    this.genThienMaStar();
    this.genThaiTueStar();
    this.genCoThanQuaTuStar();
    this.genDaoHoaHongLoanStar();
    this.genTuanTrietStar();
}


// Update force based on force of Palaces:  PhucDuc
//
override updateForce() {
    super.updateForce();
    this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
}

override comment() {
    super.comment();
    this.commentPhuMau();
}


}
