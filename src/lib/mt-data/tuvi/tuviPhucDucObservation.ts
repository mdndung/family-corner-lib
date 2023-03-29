import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ElementRelation } from "../feng-shui/element-relation";
import { Energy } from "../feng-shui/energy";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";

export class TuViPhucDucObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  // Force String depend on palace type and note
  override evalForceString() {
        let res = "&+.+";
        const note = this.palace.getNote();
        if (note <= 80) res = "&+";
        if (note <= 60) res = "&+.-";
        if (note <= 50) res = "&-";
        if (note <= 40) res = "&-.-";
        return "&+.+";
  }

    override isFavorable() {
        return this.palace.getNote() > 50;
    }

   genTuViStar() {
        if (this.hasStar(TuViStar.TUVI)) {
            if (this.palace.chinhTinhCount===1) {
                if (this.palace.branche===Branche.HORSE) {
                    this.addSupportBaseComment(8, "Ref17p150p1");
                }
                if (this.palace.branche===Branche.RAT) {
                    this.addSupportBaseComment(7, "Ref17p150p2");
                }
            }
            if (this.hasAllStars(TuViStarHelper.PHUTUONG)) {
                this.addSupportBaseComment(9, "Ref17p150p3");
            }

            if (this.hasStar(TuViStar.THATSAT)) {
                this.addSupportBaseComment(6, "Ref17p150p4");
            }
            if (this.hasStar(TuViStar.PHAQUAN)) {
                this.addSupportBaseComment(3, "Ref17p150p5");
            }
            if (this.hasStar(TuViStar.THAMLANG)) {
                this.addSupportBaseComment(3, "Ref17p150p6");
            }
            if (this.hasSatTinh) {
                this.addSupportBaseComment(4, "Ref17p159p8");

            }
        }
    }

   genLiemTrinhStar() {
        if (this.hasStar(TuViStar.LIEMTRINH)) {
            if (this.palace.branche===Branche.TIGER || this.palace.branche===Branche.MONKEY) {
                if (this.palace.chinhTinhCount===1) {
                    this.addSupportBaseComment(6, "Ref17p151p1");
                }
            }
            if (this.hasStar(TuViStar.THIENPHUR)) {
                this.addSupportBaseComment(8, "Ref17p151p2");
            }
            if (this.hasStar(TuViStar.THIENTUONG)) {
                this.addSupportBaseComment(7, "Ref17p151p3");
            }
            if (this.hasStar(TuViStar.PHAQUAN)) {
                this.addSupportBaseComment(4, "Ref17p151p4");
            }
            if (this.hasStar(TuViStar.THAMLANG)) {
                this.addSupportBaseComment(4, "Ref17p151p5");
            }
            if (this.hasStar(TuViStar.THATSAT)) {
                this.addSupportBaseComment(2, "Ref17p151p6");
            }
        }
    }

   genThienDongStar() {
        if (this.hasStar(TuViStar.THIENDONG)) {
            if (this.palace.chinhTinhCount===1) {
                if (this.palace.branche===Branche.RABBIT) {
                    this.addSupportBaseComment(8, "Ref17p151p7");
                }
                if (this.palace.branche===Branche.COCK) {
                    this.addSupportBaseComment(3, "Ref17p151p8");
                }
                if (BrancheHelper.isSnakePig(this.palace.branche)) {
                    this.addSupportBaseComment(6, "Ref17p151p9");
                }
            }
            if (BrancheHelper.isDragonDog(this.palace.branche) || this.hasStar(TuViStar.CUMON)) {
                this.addSupportBaseComment(4, "Ref17p151p10");
            }
            if (this.hasStar(TuViStar.THIENLUONG)) {
                this.addSupportBaseComment(8, "Ref17p152p1");
            }
            if (this.hasStar(TuViStar.THAIAM)) {
                if (this.palace.branche===Branche.RAT) {
                    this.addSupportBaseComment(8, "Ref17p152p2");
                }
                if (this.palace.branche===Branche.HORSE) {
                    this.addSupportBaseComment(3, "Ref17p152p3");
                }
            }

        }
    }

   genVuKhucStar() {
        if (this.hasStar(TuViStar.VUKHUC)) {
            if (this.palace.chinhTinhCount===1) {
              if (BrancheHelper.isDragonDog(this.palace.branche) || this.hasStar(TuViStar.THAMLANG)) {
                    this.addSupportBaseComment(7, "Ref17p152p4");
                }
            }
            if (this.hasStar(TuViStar.THIENPHUR)) {
                this.addSupportBaseComment(7, "Ref17p152p5");
            }
            if (this.hasStar(TuViStar.THIENTUONG)) {
                this.addSupportBaseComment(8, "Ref17p152p6");
            }
            if (this.hasStar(TuViStar.PHAQUAN)) {
                this.addSupportBaseComment(5, "Ref17p152p7");
            }
            if (this.hasStar(TuViStar.THATSAT)) {
                this.addSupportBaseComment(3, "Ref17p152p8");
            }
        }
    }

   genThaiDuongStar() {
        if (this.hasStar(TuViStar.THAIDUONG)) {
          if (BrancheHelper.isTigerToHorse(this.palace.branche)) {
                this.addSupportBaseComment(7, "Ref17p152p9");
            }
            if (BrancheHelper.isMonkeyToRat(this.palace.branche)) {
                this.addSupportBaseComment(3, "Ref17p152p10");
            }

            if (this.hasStar(TuViStar.THAIAM)) {
                this.addSupportBaseComment(4, "Ref17p153p1");
            }
        }
    }

   genThienCo() {
        if (this.hasStar(TuViStar.THIENCO)) {
            if (this.palace.chinhTinhCount===1) {
              if (BrancheHelper.isSnakeHorseGoat(this.palace.branche)) {
                    this.addSupportBaseComment(7, "Ref17p153p2");
                }
                if (BrancheHelper.isRatPigOx(this.palace.branche)) {
                    this.addSupportBaseComment(4, "Ref17p153p3");
                }
            }
            if (this.hasStar(TuViStar.CUMON)) {
                this.addSupportBaseComment(6, "Ref17p153p4");
            }
            if (this.hasStar(TuViStar.THIENLUONG)) {
                this.addSupportBaseComment(8, "Ref17p153p5");
            }

            if (this.hasStar(TuViStar.THAIAM)) {
                if (this.palace.branche===Branche.MONKEY) {
                    this.addSupportBaseComment(7, "Ref17p153p6");
                }
                if (this.palace.branche===Branche.TIGER) {
                    this.addSupportBaseComment(4, "Ref17p153p7");
                }
            }


        }
    }

   genThienPhuRStar() {
        if (this.hasStar(TuViStar.THIENPHUR)) {
            if (this.palace.chinhTinhCount===1) {
              if (BrancheHelper.isSnakePig(this.palace.branche)) {
                    this.addSupportBaseComment(7, "Ref17p153p8");
                }
                if (BrancheHelper.isOxRabbitGoatCock(this.palace.branche)) {
                    this.addSupportBaseComment(5, "Ref17p153p9");
                }
            }
        }
    }

   genThaiAmStar() {
        if (this.hasStar(TuViStar.THAIAM)) {
            if (this.palace.chinhTinhCount===1) {
              if (BrancheHelper.isCockDogPig(this.palace.branche)) {
                    this.addSupportBaseComment(7, "Ref17p154p1");
                }
                if (BrancheHelper.isRabbitDragonSnake(this.palace.branche)) {
                    this.addSupportBaseComment(4, "Ref17p154p2");
                }
            }
        }
    }

   genThamLangStar() {
        if (this.hasStar(TuViStar.THAMLANG)) {
            if (this.palace.chinhTinhCount===1) {
              if (BrancheHelper.isDragonDog(this.palace.branche)) {
                    this.addSupportBaseComment(7, "Ref17p154p3");
                }
                if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                    this.addSupportBaseComment(6, "Ref17p154p4");
                }
                if (BrancheHelper.isRatHorse(this.palace.branche)) {
                    this.addSupportBaseComment(3, "Ref17p154p5");
                }
            }
        }
    }

   genCumonStar() {
        if (this.hasStar(TuViStar.CUMON)) {
            if (this.palace.chinhTinhCount===1) {
              if (BrancheHelper.isRatHorsePig(this.palace.branche)) {
                    this.addSupportBaseComment(7, "Ref17p154p6");
                }
                if (BrancheHelper.isDragonSnakeDog(this.palace.branche)) {
                    this.addSupportBaseComment(3, "Ref17p154p7");
                }
            }
        }
    }

   genThienTuongStar() {
        if (this.hasStar(TuViStar.THIENTUONG)) {
            if (this.palace.chinhTinhCount===1) {
              if (BrancheHelper.isOxSnakeGoatPig(this.palace.branche)) {
                    this.addSupportBaseComment(8, "Ref17p155p1");
                }
                if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                    this.addSupportBaseComment(6, "Ref17p155p2");
                }
            }
        }
    }

   genThienLuongStar() {
        if (this.hasStar(TuViStar.THIENLUONG)) {
            if (this.palace.chinhTinhCount===1) {
              if (BrancheHelper.isSnakeHorse(this.palace.branche)) {
                    this.addSupportBaseComment(8, "Ref17p155p3");
                }
                if (BrancheHelper.isOxGoat(this.palace.branche)) {
                    this.addSupportBaseComment(7, "Ref17p155p4");
                }
                if (BrancheHelper.isSnakePig(this.palace.branche)) {
                    this.addSupportBaseComment(3, "Ref17p155p5");
                }
            }
        }
    }

   genThatSatStar() {
        if (this.hasStar(TuViStar.THATSAT)) {
            if (this.palace.chinhTinhCount===1) {
              if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                    this.addSupportBaseComment(7, "Ref17p155p6");
                }
                if (BrancheHelper.isRatHorse(this.palace.branche)) {
                    this.addSupportBaseComment(4, "Ref17p155p7");
                }
                if (BrancheHelper.isDragonDog(this.palace.branche)) {
                    this.addSupportBaseComment(3, "Ref17p155p8");
                }
            }
        }
    }


   genPhaQuanStar() {
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(5, "Ref17p156p1");
            if (this.palace.chinhTinhCount===1) {
                if (BrancheHelper.isRatHorse(this.palace.branche)) {
                    this.addSupportBaseComment(6, "Ref17p156p2");
                }
                if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                    this.addSupportBaseComment(3, "Ref17p156p4");
                }
                if (BrancheHelper.isDragonDog(this.palace.branche)) {
                    this.addSupportBaseComment(4, "Ref17p156p3");
                }
            }
        }
    }

   genKinhDaStar() {
        if (this.hasStars(TuViStarHelper.KINHDA,1)) {
            if (this.hasManyGoodSupportStars()) {
                this.addSupportBaseComment(6, "Ref17p156p5");
            } else {
//				if ( hasManyBadSupportStars() ) {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(3, "Ref17p156p6");
                }
            }
        }
    }

   genHoaLinhTinhStar() {
        if (this.hasHoaLinhStar()) {
            //

            if (this.hasManyGoodSupportStars()) {
                this.addSupportBaseComment(6, "Ref17p156p8");
            } else {
//				if ( hasManyBadSupportStars() ) {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(4, "Ref17p156p9");
                }
            }
        }
    }

   genDiaKhongKiepStar() {
        if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
            if (this.hasManyGoodSupportStars()) {
                this.addSupportBaseComment(5, "Ref17p156p10");
            } else {
//				if ( hasManyBadSupportStars() ) {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(4, "Ref17p156p11");
                }
            }
        }
    }

   genVanXuongKhucStar() {
        if (this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
            if (this.hasManyGoodSupportStars()) {
                this.addSupportBaseComment(7, "Ref17p157p1");
            } else {
//				if ( hasManyBadSupportStars() ) {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(4, "Ref17p157p2");
                }
            }
        }
    }

   genKhoiVietStar() {
        if (this.hasStars(TuViStarHelper.KHOIVIET,1)) {
            this.addSupportBaseComment(6, "Ref17p157p3");
            if (this.hasManyGoodSupportStars()) {
                this.addSupportBaseComment(7, "Ref17p157p4");
            } else {
//				if ( hasManyBadSupportStars() ) {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(4, "Ref17p157p5");
                }
            }
        }
    }

   genTaHuuStar() {
        if (this.hasAllStars(TuViStarHelper.TAHUU)) {
            if (this.hasManyGoodSupportStars()) {
                this.addSupportBaseComment(7, "Ref17p157p6");
            } else {
//				if ( hasManyBadSupportStars() ) {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(3, "Ref17p157p7");
                }
            }
        }
    }

   genLocTonStar() {
        if (this.hasStar(TuViStar.LOCTON)) {
            this.addSupportBaseComment(6, "Ref17p157p8");
        }
    }

   genHoaLocStar() {
        if (this.hasStar(TuViStar.HOALOC)) {
            this.addSupportBaseComment(7, "Ref17p157p9");
        }
    }

   genHoaQuyenStar() {
        if (this.hasStar(TuViStar.HOAQUYEN)) {
            this.addSupportBaseComment(7, "Ref17p158p1");
        }
    }

   genHoaKhoaStar() {
        if (this.hasStar(TuViStar.HOAKHOA)) {
            this.addSupportBaseComment(8, "Ref17p158p2");
        }
    }

   genHoaKyStar() {
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(4, "Ref17p158p3");
        }
    }

   genHaoStar() {
        if (this.hasStars(TuViStarHelper.DAITIEUHAO,1)) {
            this.addSupportBaseComment(4, "Ref17p158p4");
        }
    }

   genTangMonBachHoStar() {
        if (this.hasStars(TuViStarHelper.MONHO,1)) {
            this.addSupportBaseComment(3, "Ref17p158p5");
        }
    }

   genKhocHuStar() {
        if (this.hasAllStars(TuViStarHelper.KHOCHU)) {
            this.addSupportBaseComment(4, "Ref17p158p6");
        }
    }

   genThienMaStar() {
        if (this.hasStar(TuViStar.THIENMA)) {
            this.addSupportBaseComment(7, "Ref17p158p7");
        }
    }

   genThaiTueStar() {
        if (this.hasStar(TuViStar.THAITUE)) {
            this.addSupportBaseComment(4, "Ref17p158p8");
        }
    }

   genLongTriPhuongCacStar() {
        if (this.hasAllStars(TuViStarHelper.LONGCAC)) {
            this.addSupportBaseComment(6, "Ref17p158p9");
        }
    }

   genCoThanQuaTuStar() {
        if (this.hasStars(TuViStarHelper.COTHANQUATU,1)) {
            if (this.hasManyGoodSupportStars()) {
                this.addSupportBaseComment(6, "Ref17p158p10");
            } else {
//				if ( hasManyBadSupportStars() ) {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(4, "Ref17p158p11");
                }
            }
        }
    }

   genDaoHoaHongLoanStar() {
        if (this.hasAllStars(TuViStarHelper.HONGDAO)) {
            if (this.hasManyGoodSupportStars()) {
                this.addSupportBaseComment(9, "Ref17p159p1");
            } else {
//				if ( hasManyBadSupportStars() ) {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(4, "Ref17p159p2");
                }
            }
        }
    }

   genQuangQuyStar() {
        if (this.hasAllStars(TuViStarHelper.QUANGQUY)) {
            this.addSupportBaseComment(7, "Ref17p159p3");
        }
    }

   genQuyNhanStar() {
        if (this.hasAllStars(TuViStarHelper.QUANPHUC)) {
            this.addSupportBaseComment(7, "Ref17p159p4");
        }
    }


   genTuanTrietStar() {
        if (this.hasAllStars(TuViStarHelper.TUANTRIET)) {
            this.addSupportBaseComment(5, "Ref17p159p5");
            if (this.hasManyGoodSupportStars()) {
                this.addSupportBaseComment(3, "Ref17p159p6");
            } else {
//				if ( hasManyBadSupportStars() ) {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(7, "Ref17p159p7");
                }
            }
        }
    }

   genVuXuongKhucKhoiVietStar() {
        if (this.hasAllStars(TuViStarHelper.XUONGKHUCVUKHOIVIET)) {
            this.addSupportBaseComment(7, "Ref17p159p9");
        }
    }

   genRef17p160() {
        if (this.hasAllStars(TuViStarHelper.RIEUKYDA)) {
            if (this.tuviHoroscope.tuviPalaceStarMap.isThaiDuongFavorable) {
                this.addSupportBaseComment(3, "Ref17p160p1");
            } else {
                this.addSupportBaseComment(3, "Ref17p160p2");
            }
            if (this.tuviHoroscope.tuviPalaceStarMap.isThaiAmFavorable) {
                this.addSupportBaseComment(3, "Ref17p160p3");
            } else {
                this.addSupportBaseComment(3, "Ref17p160p4");
            }
        }
        if (BrancheHelper.isOxGoat(this.palace.branche)) {
            if (this.hasAllStars(TuViStarHelper.NHATNGUYETKY)) {
                this.addSupportBaseComment(6, "Ref17p160p5");
            }
            if (this.hasAllStars(TuViStarHelper.THAMVU) &&
                    this.hasHoaLinhStar()) {
                this.addSupportBaseComment(7, "Ref17p160p7");
            }
        }
        if (this.hasStar(TuViStar.THIENPHUR) &&
                this.hasAllStars(TuViStarHelper.TAMKHONG)) {
            this.addSupportBaseComment(4, "Ref17p160p6");
        }
    }

   genRef17p161() {

        if (this.hasAllStars(TuViStarHelper.CUKY)) {
            this.addSupportBaseComment(3, "Ref17p161p1");
        }

        if (this.hasAllStars(TuViStarHelper.CUHOA)) {
            this.addSupportBaseComment(4, "Ref17p161p2");
        }
        if (this.hasAllStars(TuViStarHelper.KINHSAT)) {
            this.addSupportBaseComment(3, "Ref17p161p3");
        }
        if (this.hasAllStars(TuViStarHelper.KINHDA)) {
            if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
                this.addSupportBaseComment(3, "Ref17p161p4");
            }
            if (this.hasStar(TuViStar.HOATINH)) {
                this.addSupportBaseComment(3, "Ref17p161p5");
            }
        }
        if (this.hasHoaLinhStar()) {
            if (this.hasStar(TuViStar.TANGMON)) {
                this.addSupportBaseComment(3, "Ref17p161p6");
            }
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            if (this.hasStars(TuViStarHelper.KINHDA,1)) {
                this.addSupportBaseComment(3, "Ref17p161p7");
            }
            if (this.hasStar(TuViStar.DIAKHONG) && this.hasStars(TuViStarHelper.KIEPDIA,1)) {
                this.addSupportBaseComment(3, "Ref17p161p8");
            }
            if (this.hasStars(TuViStarHelper.BENHPHUFHINH, 2)) {
                this.addSupportBaseComment(3, "Ref17p161p9");
            }
        }
    }

   genRef17p162() {
        if (this.hasStars(TuViStarHelper.COTHANQUATU,1)) {
            if (this.hasStars(TuViStarHelper.QUANPHUC,1)) {
                this.addSupportBaseComment(8, "Ref17p162p1");
            }
            if (this.hasStars(TuViStarHelper.HONGDAO,1)) {
                this.addSupportBaseComment(6, "Ref17p162p2");
            }
        }
        if (this.palace.chinhTinhCount===0) {
            if (this.hasTuanTrietKhong ||
                    this.hasSupportStars0(TuViStarHelper.TAMKHONG)) {
                this.addSupportBaseComment(8, "Ref17p162p6a");
            } else {
                this.addSupportBaseComment(5, "Ref17p162p6b");
            }
            if (this.hasSupportStars0(TuViStarHelper.NHATNGUYET)) {

                if (this.hasTuanTrietKhong || this.hasSupportStars0(this.palace.starSet)) {
                    this.addSupportBaseComment(8, "Ref17p162p7");
                } else {
                    this.addBaseComment("Ref17p162p7");
                }
            }
            if (this.hasStar(TuViStar.DALA) && this.palace.branche===Branche.TIGER && !this.hasTuanTrietKhong) {
                this.addSupportBaseComment(8, "Ref17p163p1");
            }
        }

    }

   commentPhucDuc() {
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
        this.genKinhDaStar();
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
        this.genHaoStar();
        this.genTangMonBachHoStar();
        this.genKhocHuStar();
        this.genThienMaStar();
        this.genThaiTueStar();
        this.genLongTriPhuongCacStar();
        this.genCoThanQuaTuStar();
        this.genDaoHoaHongLoanStar();
        this.genTuanTrietStar();
        this.genQuangQuyStar();
        this.genQuyNhanStar();
        this.genVuXuongKhucKhoiVietStar();
        this.genRef17p160();
        this.genRef17p161();
        this.genRef17p162();
        this.genThienInfluence();
    }


    override comment() {
        super.comment();
        this.commentPhucDuc();
    }

    ;
}
