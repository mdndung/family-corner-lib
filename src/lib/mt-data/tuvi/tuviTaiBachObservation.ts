import { BrancheHelper } from '../../helper/brancheHelper';
import { TuViHoroscope } from '../../horoscope/tuviHoroscope';
import { TuViPalace } from './tuviPalace';
import { TuViPalaceObservationBase } from './tuviPalaceObservationBase';
import { TuViRing } from './tuviRing';
import { Branche } from '../bazi/branche';
import { TuViStar } from './tuviStar';
import { TuViStarHelper } from '../../helper/tuviStarHelper';


export class TuViTaiBachObservation extends TuViPalaceObservationBase {
  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  genTuVi() {
    if (this.hasStar(TuViStar.TUVI)) {
      if (this.palace.chinhTinhCount >= 1) {
        if (
          this.palace.branche==Branche.HORSE ||
          this.hasStar(TuViStar.THIENTUONG)
        ) {
          this.addSupportBaseComment(9, 'Ref17p216p1');
        }
        if (this.palace.branche==Branche.RAT) {
          this.addSupportBaseComment(7, 'Ref17p216p2');
        }
      }
      if (this.hasStar(TuViStar.THIENPHUR)) {
        this.addSupportBaseComment(9, 'Ref17p216p3');
      }
      if (this.hasStar(TuViStar.THATSAT)) {
        this.addSupportBaseComment(7, 'Ref17p216p4');
      }
      if (this.hasStar(TuViStar.PHAQUAN)) {
        this.addSupportBaseComment(6, 'Ref17p216p5');
      }
      if (this.hasStar(TuViStar.THAMLANG)) {
        this.addSupportBaseComment(5, 'Ref17p216p6');
      }
    }
  }

  genLiemTrinh() {
    if (this.hasStar(TuViStar.LIEMTRINH)) {
      if (this.palace.chinhTinhCount==1) {
        if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
          this.addSupportBaseComment(6, 'Ref17p216p7');
        }
      }
      if (this.hasAllStars(TuViStarHelper.PHUTUONG)) {
        this.addSupportBaseComment(9, 'Ref17p216p8');
      }
      if (this.hasStar(TuViStar.PHAQUAN)) {
        this.addSupportBaseComment(5, 'Ref17p217p1');
        this.addSupportBaseComment(5, 'Ref17p217p2');
      }

      if (this.hasStar(TuViStar.THAMLANG)) {
        this.addSupportBaseComment(4, 'Ref17p217p3');
      }
    }
  }

  genThienDong() {
    if (this.hasStar(TuViStar.THIENDONG)) {
      if (this.palace.chinhTinhCount==1) {
        if (
          this.palace.branche==Branche.RABBIT ||
          (this.hasStars(TuViStarHelper.NGUYETAM, 1) &&
            this.palace.branche==Branche.RAT)
        ) {
          this.addSupportBaseComment(8, 'Ref17p217p4');
        }
        if (this.palace.branche==Branche.COCK) {
          this.addSupportBaseComment(4, 'Ref17p217p5');
        }
        if (BrancheHelper.isSnakePig(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p217p6');
        }
        if (BrancheHelper.isDragonDog(this.palace.branche)) {
          this.addSupportBaseComment(2, 'Ref17p217p7');
        }
      }

      if (this.hasStar(TuViStar.THIENLUONG)) {
        this.addSupportBaseComment(9, 'Ref17p217p8');
      }
      if (
        this.hasStars(TuViStarHelper.NGUYETAM, 1) &&
        this.palace.branche==Branche.HORSE
      ) {
        this.addSupportBaseComment(5, 'Ref17p217p9');
      }
      if (this.hasStar(TuViStar.CUMON)) {
        this.addSupportBaseComment(4, 'Ref17p217p10');
      }
    }
  }

  genVuKhuc() {
    if (this.hasStar(TuViStar.VUKHUC)) {
      if (this.palace.chinhTinhCount==1) {
        if (BrancheHelper.isDragonDog(this.palace.branche)) {
          this.addSupportBaseComment(9, 'Ref17p217p11');
        }
      }

      if (this.hasStar(TuViStar.THIENPHUR)) {
        this.addSupportBaseComment(9, 'Ref17p217p12');
      }
      if (this.hasStar(TuViStar.THAMLANG)) {
        this.addSupportBaseComment(7, 'Ref17p217p13');
      }
      if (this.hasStar(TuViStar.THIENTUONG)) {
        this.addSupportBaseComment(10, 'Ref17p217p14');
      }

      if (this.hasStar(TuViStar.THATSAT)) {
        this.addSupportBaseComment(7, 'Ref17p217p15');
      }

      if (this.hasStar(TuViStar.PHAQUAN)) {
        this.addSupportBaseComment(6, 'Ref17p218p1');
      }
    }
  }

  genThaiDuong() {
    if (this.hasStar(TuViStar.THAIDUONG)) {
      if (BrancheHelper.isNhatFavorableBranche(this.palace.branche)) {
        this.addSupportBaseComment(9, 'Ref17p218p2');
      } else {
        this.addSupportBaseComment(4, 'Ref17p218p3');
      }
      if (this.hasStar(TuViStar.THAIAM)) {
        this.addSupportBaseComment(7, 'Ref17p218p4a');
        if (this.hasStar(TuViStar.HOAKY) || this.hasTuanTrietKhong) {
          this.addSupportBaseComment(8, 'Ref17p218p4b');
        }
      }
    }
  }

  genThienCo() {
    if (this.hasStar(TuViStar.THIENCO)) {
      if (this.palace.chinhTinhCount==1) {
        if (BrancheHelper.isSnakeHorseGoat(this.palace.branche)) {
          this.addSupportBaseComment(8, 'Ref17p218p5');
        }
        if (BrancheHelper.isRatOxPig(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p218p6');
        }
      }
      if (this.hasStar(TuViStar.THIENLUONG)) {
        this.addSupportBaseComment(8, 'Ref17p218p7');
      }

      if (this.hasStar(TuViStar.CUMON)) {
        this.addSupportBaseComment(8, 'Ref17p218p8');
        if (BrancheHelper.isRabbitCock(this.palace.branche)) {
          this.addSupportBaseComment(8, 'Ref20p154d');
        }
      }

      if (this.hasStars(TuViStarHelper.NGUYETAM, 1)) {
        if (this.palace.branche==Branche.MONKEY) {
          this.addSupportBaseComment(7, 'Ref17p218p9');
        }
        if (this.palace.branche==Branche.TIGER) {
          this.addSupportBaseComment(5, 'Ref17p218p10');
        }
      }
    }
  }

  genThienPhuR() {
    if (this.hasStar(TuViStar.THIENPHUR)) {
      if (this.palace.chinhTinhCount==1) {
        if (BrancheHelper.isSnakePig(this.palace.branche)) {
          this.addSupportBaseComment(9, 'Ref17p218p11');
        }
        if (BrancheHelper.isOxRabbitGoatCock(this.palace.branche)) {
          this.addSupportBaseComment(7, 'Ref17p218p12');
        }
      }
    }
  }

  genThaiAm() {
    if (this.hasStar(TuViStar.THAIAM)) {
      if (this.palace.chinhTinhCount==1) {
        if (BrancheHelper.isCockDogPig(this.palace.branche)) {
          this.addSupportBaseComment(9, 'Ref17p218p2');
        }
        if (BrancheHelper.isRabbitDragonSnake(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p218p3');
        }
      }
    }
  }

  genThamLang() {
    if (this.hasStar(TuViStar.THAMLANG)) {
      if (this.palace.chinhTinhCount==1) {
        if (BrancheHelper.isDragonDog(this.palace.branche)) {
          this.addSupportBaseComment(7, 'Ref17p219p3');
        }
        if (BrancheHelper.isRatHorse(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p219p4');
        }
        if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p219p5');
        }
      }
    }
  }

  genCuMon() {
    if (this.hasStar(TuViStar.CUMON)) {
      if (this.palace.chinhTinhCount==1) {
        if (BrancheHelper.isRatHorsePig(this.palace.branche)) {
          this.addSupportBaseComment(7, 'Ref17p219p6');
        }
        if (BrancheHelper.isDragonSnakeDog(this.palace.branche)) {
          this.addSupportBaseComment(4, 'Ref17p219p7');
        }
      }
      if (this.hasStar(TuViStar.THAIDUONG)) {
        if (this.palace.branche==Branche.TIGER) {
          this.addSupportBaseComment(9, 'Ref17p218p2');
        }
        if (this.palace.branche==Branche.MONKEY) {
          this.addSupportBaseComment(4, 'Ref17p218p3');
        }
      }
    }
  }

  genThienTuong() {
    if (this.hasStar(TuViStar.THIENTUONG)) {
      if (this.palace.chinhTinhCount==1) {
        if (BrancheHelper.isOxSnakeGoatPig(this.palace.branche)) {
          this.addSupportBaseComment(7, 'Ref17p219p8');
        }
        if (BrancheHelper.isRabbitCock(this.palace.branche)) {
          this.addBaseComment('Ref17p219p9');
        }
      }
    }
  }

  genThienLuong() {
    if (this.hasStar(TuViStar.THIENLUONG)) {
      if (this.palace.chinhTinhCount==1) {
        if (BrancheHelper.isRatHorse(this.palace.branche)) {
          this.addSupportBaseComment(8, 'Ref17p220p1');
        }
        if (BrancheHelper.isOxGoat(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p220p2');
        }
        if (BrancheHelper.isSnakePig(this.palace.branche)) {
          this.addSupportBaseComment(5, 'Ref17p217p9');
        }
        if (this.hasStar(TuViStar.THAIDUONG)) {
          if (this.palace.branche==Branche.RABBIT) {
            this.addSupportBaseComment(9, 'Ref17p218p2');
          }
          if (this.palace.branche==Branche.COCK) {
            this.addBaseComment('Ref17p218p3');
          }
        }
      }
    }
  }

  genThatSat() {
    if (this.hasStar(TuViStar.THATSAT)) {
      if (this.palace.chinhTinhCount==1) {
        if (
          this.palace.branche==Branche.TIGER ||
          this.palace.branche==Branche.MONKEY
        ) {
          this.addSupportBaseComment(6, 'Ref17p220p3');
        }
        if (
          this.palace.branche==Branche.RAT ||
          this.palace.branche==Branche.HORSE
        ) {
          this.addSupportBaseComment(6, 'Ref17p220p4');
        }
        if (
          this.palace.branche==Branche.DRAGON ||
          this.palace.branche==Branche.DOG
        ) {
          this.addSupportBaseComment(4, 'Ref17p220p5');
        }
      }
    }
  }

  genPhaQuan() {
    if (this.hasStar(TuViStar.PHAQUAN)) {
      if (this.palace.chinhTinhCount==1) {
        if (
          this.palace.branche==Branche.RAT ||
          this.palace.branche==Branche.MONKEY
        ) {
          this.addSupportBaseComment(9, 'Ref17p220p6');
        }
        if (
          this.palace.branche==Branche.DRAGON ||
          this.palace.branche==Branche.DOG
        ) {
          this.addSupportBaseComment(6, 'Ref17p220p7');
        }
        if (
          this.palace.branche==Branche.TIGER ||
          this.palace.branche==Branche.MONKEY
        ) {
          this.addSupportBaseComment(5, 'Ref17p220p8');
        }
      }
    }
  }

  genKinhDuongDala() {
    if (this.hasStar(TuViStar.KINHDUONG) || this.hasStar(TuViStar.DALA)) {
      if (this.hasFavorableStars()) {
        this.addSupportBaseComment(6, 'Ref17p221p1');
      } else {
        this.addSupportBaseComment(6, 'Ref17p221p2');
      }
    }
  }

  genHoaLinhTinh() {
    if (this.hasHoaLinhStar()) {
      if (this.hasFavorableStars()) {
        this.addSupportBaseComment(6, 'Ref17p221p3');
      } else {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(2, 'Ref17p221p4');
        }
      }
    }
  }

  genDiaKhongKiepTinh() {
    if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
      if (this.hasFavorableStars()) {
        this.addSupportBaseComment(4, 'Ref17p221p5');
      } else {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(2, 'Ref17p221p6');
        }
      }
    }
  }

  genXuongKhuc() {
    if (this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
      if (this.hasFavorableStars()) {
        this.addSupportBaseComment(8, 'Ref17p221p7');
      } else {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(5, 'Ref17p221p8');
        }
      }
    }
  }

  genRef17p221p9_12() {
    if (this.hasStars(TuViStarHelper.KHOIVIET, 1)) {
      this.addSupportBaseComment(7, 'Ref17p221p9');
    }
    if (this.hasAllStars(TuViStarHelper.TAHUU)) {
      this.addSupportBaseComment(7, 'Ref17p221p10');
    }
    if (this.hasAllStars(TuViStarHelper.LOCTONHOALOC)) {
      this.addSupportBaseComment(8, 'Ref17p221p11');
    }
    if (this.hasAllStars(TuViStarHelper.KHOAQUYEN)) {
      this.addSupportBaseComment(8, 'Ref17p221p12');
    }
  }

  genRef17p222() {
    if (this.hasStar(TuViStar.HOAKY)) {
      this.addSupportBaseComment(22, 'Ref17p222p1');
    }
    if (this.hasStar(TuViStar.THIENMA)) {
      this.addSupportBaseComment(6, 'Ref17p222p2');
    }
    if (this.hasStars(TuViStarHelper.COTHANQUATU, 1)) {
      this.addSupportBaseComment(6, 'Ref17p222p3');
    }
    if (this.hasAllStars(TuViStarHelper.HONGDAO)) {
      this.addSupportBaseComment(5, 'Ref17p222p4');
    }
    if (this.hasHaoStar()) {
      this.addSupportBaseComment(4, 'Ref17p222p5');
      if (this.hasFavorableStars()) {
        this.addSupportBaseComment(5, 'Ref17p222p6');
      } else {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(3, 'Ref17p222p7');
        }
      }
    }
    if (this.hasAllStars(TuViStarHelper.QUANGQUY)) {
      this.addSupportBaseComment(8, 'Ref17p222p8');
    }
    if (this.hasStar(TuViStar.DAUQUAN)) {
      this.addSupportBaseComment(7, 'Ref17p222p9');
    }
    if (this.hasStar(TuViStar.PHUCBINH)) {
      this.addSupportBaseComment(3, 'Ref17p222p10');
    }
    if (this.hasStar(TuViStar.TU)) {
      this.addSupportBaseComment(7, 'Ref17p222p11');
    }
    if (this.hasStar(TuViStar.THIENRIEU) || this.hasStar(TuViStar.THIENY)) {
      if (this.hasFavorableStars()) {
        this.addSupportBaseComment(7, 'Ref17p222p12');
      } else {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(4, 'Ref17p222p13');
        }
      }
    }
    if (this.hasStar(TuViStar.DIEUKHACH)) {
      this.addSupportBaseComment(4, 'Ref17p222p14');
    }
    if (this.hasTuanTrietKhong) {
      if (this.hasFavorableStars()) {
        this.addSupportBaseComment(4, 'Ref17p222p15');
      } else {
        if (this.hasHostileStars()) {
          this.addSupportBaseComment(6, 'Ref17p222p16');
        }
      }
    }
  }

  genRef17p223() {
    if (this.hasStars(TuViStarHelper.KHONGKIEPDAKINHLIEMHINH, 4)) {
      this.addSupportBaseComment(3, 'Ref17p223p1');
    }
    if (this.hasStars(TuViStarHelper.TAHUUKIEPKHONG, 2)) {
      this.addSupportBaseComment(2, 'Ref17p223p3');
    }
    if (this.hasSatTinh || this.hasAllStars(TuViStarHelper.BINHTUONG)) {
      this.addSupportBaseComment(4, 'Ref17p223p4');
    }
    if (this.hasStar(TuViStar.LOCTON)) {
      if (this.hasStar(TuViStar.MO)) {
        this.addSupportBaseComment(8, 'Ref17p223p5');
      }
      if (this.hasStar(TuViStar.HONGLOAN)) {
        this.addSupportBaseComment(4, 'Ref17p223p6');
      }
      if (this.hasHaoStar()) {
        this.addSupportBaseComment(3, 'Ref17p223p7');
      }
      if (this.hasAllStars(TuViStarHelper.DATANG)) {
        this.addSupportBaseComment(7, 'Ref17p223p8');
      }
      if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
        this.addSupportBaseComment(3, 'Ref17p223p9');
      }
      if (this.hasStar(TuViStar.THIENMA)) {
        this.addSupportBaseComment(8, 'Ref17p223p10');
      }
    }
    if (this.hasHaoStar()) {
      if (this.hasHoaLinhStar()) {
        this.addSupportBaseComment(2, 'Ref17p223p11');
      }
      if (this.hasAllStars(TuViStarHelper.HONGDAO)) {
        this.addSupportBaseComment(3, 'Ref17p223p12');
      }
    }
  }

  genRef17p224() {
    if (this.hasHaoStar()) {
      if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
        this.addSupportBaseComment(2, 'Ref17p224p1');
      }
    }
    if (this.hasStars(TuViStarHelper.LONGCACMO, 2)) {
      this.addSupportBaseComment(8, 'Ref17p224p2');
    }
    if (this.hasStar(TuViStar.THAITUE)) {
      if (this.hasStar(TuViStar.LOCTON)) {
        this.addSupportBaseComment(8, 'Ref17p224p3');
      }
      if (this.hasAllStars(TuViStarHelper.DAKY)) {
        this.addSupportBaseComment(4, 'Ref17p224p4');
      }
      if (this.hasAllStars(TuViStarHelper.COHINH)) {
        this.addSupportBaseComment(7, 'Ref17p224p5');
      }
    }
    if (this.hasStar(TuViStar.THIENHINH)) {
      if (this.hasStar(TuViStar.LUCSI)) {
        this.addSupportBaseComment(2, 'Ref17p224p6');
      }
    }
    if (this.hasStars(TuViStarHelper.TANGDAODUONG, 2)) {
      this.addSupportBaseComment(8, 'Ref17p224p7');
    }
    if (this.hasStars(TuViStarHelper.LUUKIEPHINH, 3)) {
      this.addSupportBaseComment(1, 'Ref17p224p8');
    }
    if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
      this.addSupportBaseComment(2, 'Ref17p224p9');
    }
    if (this.palace.chinhTinhCount==0) {
      if (this.hasTuanTrietKhong) {
        this.addSupportBaseComment(6, 'Ref17p224p10');
      }
      if (
        (this.tuviHoroscope.tuviPalaceStarMap.isThaiDuongFavorable &&
          this.tuviHoroscope.tuviPalaceStarMap.isThaiAmFavorable) ||
        this.hasSupportStars0(TuViStarHelper.NHATNGUYET)
      ) {
        this.addSupportBaseComment(9, 'Ref17p224p11');
      }
    }
  }

  //
  override updateForce() {
    super.updateForce();
    this.updateForceFromObservation(this.getObservations(TuViRing.Menh));
    this.updateForceFromObservation(this.getThanObservations());
    this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
    this.updateForceFromObservation(this.getObservations(TuViRing.QuanLoc));
    this.updateForceFromObservation(this.getObservations(TuViRing.ThienDi));
  }

  commentTaiBach() {
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
    this.genHoaLinhTinh();
    this.genDiaKhongKiepTinh();
    this.genXuongKhuc();
    this.genRef17p221p9_12();
    this.genRef17p222();
    this.genRef17p223();
    this.genRef17p224();
    this.genPhuCuc();
  }

  override comment() {
    super.comment();
    this.commentTaiBach();
  }
}
