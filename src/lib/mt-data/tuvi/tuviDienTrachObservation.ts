import { BrancheHelper } from '../../helper/brancheHelper';
import { TuViHoroscope } from '../../horoscope/tuviHoroscope';
import { TuViPalace } from './tuviPalace';
import { TuViPalaceObservationBase } from './tuviPalaceObservationBase';
import { Branche } from '../bazi/branche';
import { TuViStar } from './tuviStar';
import { TuViStarHelper } from '../../helper/tuviStarHelper';

export class TuViDienTrachObservation extends TuViPalaceObservationBase {

  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  genTuViStar() {
    if (this.hasStar(TuViStar.TUVI)) {
      this.addSupportBaseComment(8, 'Ref17p171p1');

      if (this.palace.chinhTinhCount == 1) {
        if (this.palace.branche == Branche.HORSE) {
          this.addSupportBaseComment(7, 'Ref17p171p2');
        }
        if (this.palace.branche == Branche.RAT) {
          this.addSupportBaseComment(5, 'Ref17p171p3');
        }
      }
      if (
        this.hasStar(TuViStar.THIENPHUR) ||
        this.hasStar(TuViStar.THIENTUONG)
      ) {
        this.addSupportBaseComment(7, 'Ref17p171p2');
      }

      if (this.hasStar(TuViStar.THATSAT)) {
        this.addSupportBaseComment(3, 'Ref17p171p4');
      }
      if (this.hasStar(TuViStar.PHAQUAN)) {
        this.addSupportBaseComment(3, 'Ref17p171p5');
      }
      if (this.hasStar(TuViStar.THAMLANG)) {
        this.addSupportBaseComment(3, 'Ref17p171p6');
      }
    }
  }

  genLiemTrinhStar() {
    if (this.hasStar(TuViStar.LIEMTRINH)) {
      if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
        if (this.palace.chinhTinhCount == 1) {
          this.addSupportBaseComment(3, 'Ref17p172p1');
        }
      }
      if (this.hasStar(TuViStar.THIENPHUR)) {
        this.addSupportBaseComment(3, 'Ref17p172p2');
      }
      if (this.hasStar(TuViStar.THIENTUONG)) {
        this.addSupportBaseComment(7, 'Ref17p172p3');
      }
      if (this.hasStar(TuViStar.THATSAT)) {
        this.addSupportBaseComment(5, 'Ref17p172p4');
      }
      if (this.hasStar(TuViStar.PHAQUAN)) {
        this.addSupportBaseComment(5, 'Ref17p172p5');
      }
      if (this.hasStar(TuViStar.THAMLANG)) {
        this.addSupportBaseComment(3, 'Ref17p172p6');
      }
    }
  }

  genThienDongStar() {
    if (this.hasStar(TuViStar.THIENDONG)) {
      this.addSupportBaseComment(5, 'Ref17p172p7');
      if (this.palace.chinhTinhCount == 1) {
        if (this.palace.branche == Branche.RABBIT) {
          this.addSupportBaseComment(8, 'Ref17p172p8');
        }
        if (this.palace.branche == Branche.COCK) {
          this.addSupportBaseComment(5, 'Ref17p172p9');
        }
        if (BrancheHelper.isSnakePig(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p172p10');
        }
        if (BrancheHelper.isDragonDog(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p172p11');
        }
      }
      if (this.hasStar(TuViStar.THIENLUONG)) {
        this.addSupportBaseComment(7, 'Ref17p172p12');
      }
      if (this.hasStar(TuViStar.THAIAM)) {
        if (this.palace.branche == Branche.RAT) {
          this.addSupportBaseComment(8, 'Ref17p172p8');
        }
        if (this.palace.branche == Branche.HORSE) {
          this.addSupportBaseComment(5, 'Ref17p172p9');
        }
      }
      if (this.hasStar(TuViStar.CUMON)) {
        this.addSupportBaseComment(5, 'Ref17p172p13');
      }
    }
  }

  genVuKhucStar() {
    if (this.hasStar(TuViStar.VUKHUC)) {
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isDragonDog(this.palace.branche)) {
          this.addSupportBaseComment(7, 'Ref17p173p1');
        }
      }
      if (this.hasStar(TuViStar.THIENPHUR)) {
        this.addSupportBaseComment(7, 'Ref17p173p2');
      }
      if (this.hasStar(TuViStar.THIENTUONG)) {
        this.addSupportBaseComment(6, 'Ref17p173p3');
      }
      if (this.hasStar(TuViStar.THAMLANG)) {
        this.addSupportBaseComment(6, 'Ref17p173p4');
      }
      if (this.hasStar(TuViStar.PHAQUAN)) {
        this.addSupportBaseComment(5, 'Ref17p173p5');
      }
      if (this.hasStar(TuViStar.THATSAT)) {
        this.addSupportBaseComment(5, 'Ref17p173p6');
      }
    }
  }

  genThaiDuongStar() {
    if (this.hasStar(TuViStar.THAIDUONG)) {
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isDragonSnakeHorse(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p173p7');
        }
        if (BrancheHelper.isRatDogPig(this.palace.branche)) {
          this.addSupportBaseComment(3, 'Ref17p173p8');
        }
      }
      if (this.palace.branche == Branche.TIGER) {
        this.addSupportBaseComment(8, 'Ref17p173p9');
      }
      if (
        this.hasStar(TuViStar.THIENLUONG) &&
        this.palace.branche == Branche.RABBIT
      ) {
        this.addSupportBaseComment(8, 'Ref17p173p9');
      }
      if (
        this.hasStar(TuViStar.CUMON) &&
        this.palace.branche == Branche.MONKEY
      ) {
        this.addSupportBaseComment(3, 'Ref17p173p10');
      }
      if (
        this.hasStar(TuViStar.THIENLUONG) &&
        this.palace.branche == Branche.COCK
      ) {
        this.addSupportBaseComment(3, 'Ref17p173p10');
      }
      if (this.hasStar(TuViStar.THAIAM)) {
        this.addSupportBaseComment(8, 'Ref17p173p11');
      }
    }
  }

  genThienCo() {
    if (this.hasStar(TuViStar.THIENCO)) {
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isSnakeHorseGoat(this.palace.branche)) {
          this.addSupportBaseComment(8, 'Ref17p173p12');
        }
        if (BrancheHelper.isRatOxPig(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p173p13');
        }
      }

      if (this.hasStar(TuViStar.THIENLUONG)) {
        this.addSupportBaseComment(7, 'Ref17p174p1');
      }

      if (this.hasStar(TuViStar.THAIAM)) {
        if (this.palace.branche == Branche.MONKEY) {
          this.addSupportBaseComment(7, 'Ref17p174p2');
        }
        if (this.palace.branche == Branche.TIGER) {
          this.addSupportBaseComment(5, 'Ref17p174p3');
        }
      }
      if (this.hasStar(TuViStar.CUMON)) {
        if (this.palace.branche == Branche.RABBIT) {
          this.addSupportBaseComment(6, 'Ref17p174p4');
        }
        if (this.palace.branche == Branche.COCK) {
          this.addSupportBaseComment(4, 'Ref17p174p5');
        }
      }
    }
  }

  genThienPhuRStar() {
    if (this.hasStar(TuViStar.THIENPHUR)) {
      this.addSupportBaseComment(5, 'Ref17p174p6');
      if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
        this.addSupportBaseComment(7, 'Ref17p174p7');
      }
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isOxRabbitGoatCock(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p174p8');
        }
      }
    }
  }

  genThaiAmStar() {
    if (this.hasStar(TuViStar.THAIAM)) {
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isCockDogPig(this.palace.branche)) {
          this.addSupportBaseComment(7, 'Ref17p174p9');
        }
        if (BrancheHelper.isRabbitDragonSnake(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p174p10');
        }
      }
    }
  }

  genThamLangStar() {
    if (this.hasStar(TuViStar.THAMLANG)) {
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isDragonDog(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p174p11');
        }
        if (BrancheHelper.isRatHorseTigerMonkey(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p174p12');
        }
      }
    }
  }

  genThienTuongStar() {
    if (this.hasStar(TuViStar.THIENTUONG)) {
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isOxSnakeGoatPig(this.palace.branche)) {
          this.addSupportBaseComment(6, 'Ref17p175p4');
        }
        if (BrancheHelper.isRabbitCock(this.palace.branche)) {
          this.addSupportBaseComment(6, 'Ref17p175p5');
        }
      }
    }
  }

  genThienLuongStar() {
    if (this.hasStar(TuViStar.THIENLUONG)) {
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isRatHorse(this.palace.branche)) {
          this.addSupportBaseComment(8, 'Ref17p175p5');
        }
        if (BrancheHelper.isOxGoat(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p175p6');
        }
        if (BrancheHelper.isSnakePig(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p175p7');
        }
      }
    }
  }

  genThatSatStar() {
    if (this.hasStar(TuViStar.THATSAT)) {
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
          this.addSupportBaseComment(7, 'Ref17p175p8');
        }
        if (BrancheHelper.isRatHorse(this.palace.branche)) {
          this.addSupportBaseComment(7, 'Ref17p175p9');
        }
        if (BrancheHelper.isDragonDog(this.palace.branche)) {
          this.addSupportBaseComment(3, 'Ref17p175p10');
        }
      }
    }
  }

  genPhaQuanStar() {
    if (this.hasStar(TuViStar.PHAQUAN)) {
      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isRatHorse(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p176p1');
        }
        if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p176p2');
        }
        if (BrancheHelper.isDragonDog(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p176p3');
        }
      }
    }
  }

  genKinhDuongStar() {
    if (this.hasStar(TuViStar.KINHDUONG)) {
      if (this.hasManyGoodSupportStars()) {
        this.addSupportBaseComment(5, 'Ref17p176p4');
      } else {
        //				if ( hasManyBadSupportStars() ) {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(4, 'Ref17p176p5');
        }
      }
      if (this.hasStars(TuViStarHelper.KHONGKIEP, 1)) {
        this.addSupportBaseComment(4, 'Ref17p176p6');
      }
    }
  }

  genDalaStar() {
    if (this.hasStar(TuViStar.DALA)) {
      this.addSupportBaseComment(4, 'Ref17p176p7');
    }
  }

  genHoaLinhTinhStar() {
    if (this.hasHoaLinhStar()) {
      this.addSupportBaseComment(4, 'Ref17p176p8');
      if (this.hasAllStars(TuViStarHelper.THAMVU)) {
        this.addSupportBaseComment(7, 'Ref17p176p9');
      }
      if (this.hasStars(TuViStarHelper.KHONGKIEP, 1)) {
        this.addSupportBaseComment(3, 'Ref17p176p10');
      }
    }
  }

  genDiaKhongKiepStar() {
    if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
      if (this.hasManyGoodSupportStars()) {
        this.addSupportBaseComment(5, 'Ref17p176p11');
      } else {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(4, 'Ref17p176p12');
        }
      }
    }
  }

  genVanXuongKhucStar() {
    if (this.hasStar(TuViStar.VANXUONG) || this.hasStar(TuViStar.VANKHUC)) {
      if (this.hasManyGoodSupportStars()) {
        this.addSupportBaseComment(8, 'Ref17p177p1');
      } else {
        //				if ( hasManyBadSupportStars() ) {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(4, 'Ref17p177p2');
        }
      }
    }
  }

  genKhoiVietStar() {
    if (this.hasStars(TuViStarHelper.KHOIVIET, 1)) {
      this.addSupportBaseComment(8, 'Ref17p177p3');
    }
  }

  genTaHuuStar() {
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
      if (this.hasManyGoodSupportStars()) {
        this.addSupportBaseComment(8, 'Ref17p177p4');
      } else {
        //				if ( hasManyBadSupportStars() ) {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(5, 'Ref17p177p5');
        }
      }
    }
  }

  genLocTonStar() {
    if (this.hasStar(TuViStar.LOCTON)) {
      this.addSupportBaseComment(5, 'Ref17p177p6');
    }
  }

  genHoaLocStar() {
    if (this.hasStar(TuViStar.HOALOC)) {
      this.addSupportBaseComment(6, 'Ref17p177p7');
    }
  }

  genHoaQuyenStar() {
    if (this.hasStar(TuViStar.HOAQUYEN)) {
      this.addSupportBaseComment(8, 'Ref17p177p8');
    }
  }

  genHoaKhoaStar() {
    if (this.hasStar(TuViStar.HOAKHOA)) {
      this.addSupportBaseComment(6, 'Ref17p177p7');
    }
  }

  genHoaKyStar() {
    if (this.hasStar(TuViStar.HOAKY)) {
      this.addSupportBaseComment(6, 'Ref17p177p9');
    }
  }

  genKhocHuStar() {
    if (this.hasAllStars(TuViStarHelper.KHOCHU)) {
      this.addSupportBaseComment(5, 'Ref17p177p11');
    }
  }

  genThienMaStar() {
    if (this.hasStar(TuViStar.THIENMA)) {
      this.addSupportBaseComment(6, 'Ref17p177p10');
    }
  }

  genLongTriPhuongCacStar() {
    if (this.hasAllStars(TuViStarHelper.LONGCAC)) {
      this.addSupportBaseComment(7, 'Ref17p177p12');
    }
  }

  genCoThanQuaTuStar() {
    if (this.hasAllStars(TuViStarHelper.COTHANQUATU)) {
      this.addSupportBaseComment(6, 'Ref17p177p13');
    }
  }

  genQuangQuyStar() {
    if (this.hasAllStars(TuViStarHelper.QUANGQUY)) {
      this.addSupportBaseComment(6, 'Ref17p178p1');
    }
  }

  genDauQuanStar() {
    if (this.hasStar(TuViStar.DAUQUAN)) {
      if (this.hasManyGoodSupportStars()) {
        this.addSupportBaseComment(7, 'Ref17p178p2');
      } else {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(4, 'Ref17p178p3');
        }
      }
    }
  }

  genTuanTrietStar() {
    if (this.hasAllStars(TuViStarHelper.TUANTRIET)) {
      this.addSupportBaseComment(5, 'Ref17p178p4');
    }
  }

  genCuMonStar() {
    if (this.hasStar(TuViStar.CUMON)) {
      this.addSupportBaseComment(5, 'Ref17p175p1');

      if (this.palace.chinhTinhCount == 1) {
        if (BrancheHelper.isRatDogPig(this.palace.branche)) {
          this.addSupportBaseComment(6, 'Ref17p175p2');
        }
        if (BrancheHelper.isDragonSnakeDog(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p175p3');
        }
      }
      if (this.hasStar(TuViStar.HOATINH)) {
        this.addSupportBaseComment(4, 'Ref17p178p9');
      }
      if (this.hasStar(TuViStar.TANGMON)) {
        this.addSupportBaseComment(5, 'Ref17p178p10');
      }
    }
  }

  genRef17p180() {
    if (this.palace.chinhTinhCount == 0) {
      this.addSupportBaseComment(5, 'Ref17p180p8');
      let count = 0;
      if (this.hasTuanTrietKhong) {
        this.addSupportBaseComment(5, 'Ref17p180p9');
        count++;
      }
      if (this.hasSupportStars0(TuViStarHelper.NHATNGUYET)) {
        this.addSupportBaseComment(7, 'Ref17p180p10');
        count++;
      }
      if (count == 2) {
        this.addSupportBaseComment(9, 'Ref17p180p11');
      }
    }
  }

  commentDienTrach() {
    this.genTuViStar();
    this.genLiemTrinhStar();
    this.genThienDongStar();
    this.genVuKhucStar();
    this.genThaiDuongStar();
    this.genThienCo();
    this.genThienPhuRStar();
    this.genThaiAmStar();
    this.genThamLangStar();
    this.genThienTuongStar();
    this.genThienLuongStar();
    this.genThatSatStar();
    this.genPhaQuanStar();
    this.genCuMonStar();
    this.genKinhDuongStar();
    this.genDalaStar();
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
    this.genKhocHuStar();
    this.genThienMaStar();
    this.genLongTriPhuongCacStar();
    this.genCoThanQuaTuStar();
    this.genTuanTrietStar();
    this.genQuangQuyStar();
    this.genDauQuanStar();
    this.genRef17p180();
    this.genPhuCuc();
  }

  override comment() {
    super.comment();
    this.commentDienTrach();
  }
}
