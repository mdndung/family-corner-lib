/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { threadId } from 'worker_threads';
import { BaziHelper } from '../../helper/baziHelper';
import { BrancheHelper } from '../../helper/brancheHelper';
import { ObjectHelper } from '../../helper/objectHelper';
import { TrunkHelper } from '../../helper/trunkHelper';
import { TuViHelper } from '../../helper/tuviHelper';
import { TuViStarHelper } from '../../helper/tuviStarHelper';
import { TuViHoroscope } from '../../horoscope/tuviHoroscope';
import { ObservationBase } from '../../observations/observationBase';
import { Branche } from '../bazi/branche';
import { BrancheRelation } from '../bazi/brancheRelation';
import { Lunar } from '../bazi/lunar';
import { Trunk } from '../bazi/trunk';
import { Element } from '../feng-shui/element';
import { ElementRelation } from '../feng-shui/element-relation';
import { ElementLifeCycle } from '../feng-shui/elementLifeCycle';
import { TuViPalace } from './tuviPalace';
import { TuViRing } from './tuviRing';
import { TuViStar } from './tuviStar';

export abstract class TuViPalaceObservationBase extends ObservationBase {
  static SINHDIA = ElementLifeCycle.BIRTH;
  static VUONGDIA = ElementLifeCycle.PROSPERITY;
  static BAIDIA = ElementLifeCycle.BATH;
  static TUYETDIA = ElementLifeCycle.REPOSE;

  palace: TuViPalace= null;
  tuviHoroscope: TuViHoroscope= null;
  hasTuanTrietKhong: boolean= null;
  goodStarsCount: number= null;
  badStarsCount: number= null;
  goodChinhTinhSupportPalace: number= null;
  goodTrungTinhSupportPalace: number= null;
  hasCombinedSatTinh: boolean= null;
  satTinhCombinatedCount: number= null;
  isPartOfTuMo: boolean= null;
  currPeriodComplementForceFactor = 0.0;
  hasMajorStarWithFavorableElement: boolean = false;

  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(tuviHoroscope.birthLunar.getGenrePrefix());
    this.palace = palace;
    this.tuviHoroscope = tuviHoroscope;
    this.satTinhCombinatedCount = -1;
    this.hasCombinedSatTinh =
      this.getSatTinhCombinedCount() > TuViPalace.AVAILSTARNBCOUNT;
    this.isPartOfTuMo = palace.branche.getElement() === Element.EARTH;
    this.hasMajorStarWithFavorableElement=false;

  }

  override getName() {
    return this.palace.getName();
  }

  getPalaceElement() {
    return this.palace.branche.getElement();
  }

  getTuViElement() {
    return this.tuviHoroscope.tuViElement;
  }

  getyBranche() {
    return this.tuviHoroscope.birthLunar.getyBranche();
  }

  getyTrunk() {
    return this.tuviHoroscope.birthLunar.getyTrunk();
  }

  hasPrevNextStar(star: TuViStar) {
    return this.palace.hasPrevNextStar(star);
  }

  hasPrevNextStars(starArr: TuViStar[], minCount: number) {
    return this.palace.hasPrevNextStars(starArr, minCount);
  }

  hasStars(starArr: TuViStar[], minCount: number) {
    return this.palace.hasStars(starArr, minCount);
  }

  hasKiepStar() {
    return this.hasStar(TuViStar.KIEPSAT) || this.hasStar(TuViStar.DIAKIEP);
  }
  hasStar(star: TuViStar) {
    return this.palace.hasStar([star]);
  }

  // Return true if this star is present in this palace and has effect
  // See Ref17p293
  hasValuableStar(star: TuViStar) {
    if (this.palace.hasStar([star]) ) {
       if ( ObjectHelper.hasItem(TuViStarHelper.NorthStarGroup,star) ) {
        // North group start effect is only strong when it is in

       }
    };
  }

  hasOneStar(starArr: TuViStar[]) {
    return this.palace.hasSomeStars(starArr,1);
  }

  hasSomeStars(starArr: TuViStar[], count: number) {
    return this.palace.hasSomeStars(starArr,count);
  }

  hasSomeStar(starArr: TuViStar[]) {
    return this.palace.hasSomeStar(starArr);
  }

  isBornInNight() {
    const birthHour = this.tuviHoroscope.birthDate.getHour();
    return birthHour < 6 || birthHour > 19;
  }

  isBornInDay() {
    return !this.isBornInNight();
  }

  hasSatTinh() {
    return this.palace.satTinhCount > 0;
  }

  getSatTinhCombinedCount() {
    if (this.satTinhCombinatedCount < 0) {
      // Not counted yet
      const favorableCombinedPalaces = this.palace.getPalaceWithBrancheRelation(
        BrancheRelation.COMBINATION
      );
      this.satTinhCombinatedCount = this.palace.satTinhCount;
      favorableCombinedPalaces.forEach((tuViPalace) => {
        this.satTinhCombinatedCount += tuViPalace.satTinhCount;
      });
    }
    return this.satTinhCombinatedCount;
  }

  isGoodStarCountFavorable() {
    return this.goodStarsCount > this.badStarsCount;
  }

  hasNoChinhTinh() {
    return this.palace.hasNoChinhTinh();
  }

  isGoodStarsFavorable() {
    return (
      this.isGoodStarCountFavorable() ||
      this.goodChinhTinhSupportPalace + this.goodTrungTinhSupportPalace >=
        TuViPalace.AVAILSTARNBCOUNT
    );
  }

  hasManyGoodStars() {
    return this.palace.goodBadChinhTinhBalanceForce > 0 &&
      this.palace.goodActiveChinhTinhCount > 0 &&
      this.palace.trungTinhForce > 0;
  }

  hasManyBadStars() {
    return this.palace.goodBadChinhTinhBalanceForce < 0 &&
      this.palace.satTinhCount > 0;
  }

  hasGoodSupportStars(starArr: TuViStar[], countMax: number) {
    return this.hasSupportStars(starArr, countMax);
  }

  hasRelationGoodSupportPalaceStar(relation: BrancheRelation) {
    return this.palace.hasRelationGoodSupportPalaceStar(relation);
  }

  hasRelationBadSupportPalaceStar(relation: BrancheRelation) {
    return this.palace.hasRelationBadSupportPalaceStar(relation);
  }

  hasRelationPalaceStar(star: TuViStar, relation: BrancheRelation) {
    return this.palace.hasRelationPalaceStar(star, relation);
  }

  hasManyGoodSupportStars() {
    return (
      this.hasManyGoodStars ||
      this.hasRelationGoodSupportPalaceStar(BrancheRelation.COMBINATION) ||
      this.hasRelationGoodSupportPalaceStar(BrancheRelation.TRANSFORMPLUS) ||
      this.hasRelationGoodSupportPalaceStar(BrancheRelation.TRANSFORMRESTRICT)
    );
  }

  hasFavorableStars() {
    return (
      (this.isFavorable() ||
        this.hasManyGoodStars ||
        this.hasManyGoodSupportStars()) &&
      !this.hasTuanTrietKhong
    );
  }

  isFavorableStar(star: TuViStar) {
    return this.hasStar(star) && star.force > 0;
  }

  isNonFavorableStar(star: TuViStar) {
    return this.hasStar(star) && star.force <= 0;
  }

  hasOneFavorableStar(starArr: TuViStar[]) {
    for (let index = 0; index < starArr.length; index++) {
      const tuViStar = starArr[index];
      if (this.isFavorableStar(tuViStar)) {return true;}
    }
    return false;
  }

  hasOneNonFavorableStar(starArr: TuViStar[]) {
    for (let index = 0; index < starArr.length; index++) {
      const tuViStar = starArr[index];
      if (this.isNonFavorableStar(tuViStar)) {return true;}
    }
    return false;
  }

  hasDirectSupportStar(star: TuViStar) {
    return this.palace.hasDirectSupportStar(star);
  }

  hasHaoStar() {
    return this.hasStar(TuViStar.DAIHAO) || this.hasStar(TuViStar.TIEUHAO);
  }

  hasHoaLinhStar() {
    return this.palace.hasHoaLinhStar();
  }

  //
  hasHostileStars() {
    // return  !hasFavorableStars() && hasCombinedSatTinh ; to be checked with this configuration
    return !this.hasFavorableStars() && this.hasCombinedSatTinh;
  }

  hasSupportStars0(starArr: TuViStar[]) {
    return this.palace.hasSupportStars0(starArr);
  }

  hasSupportStars2(star1: TuViStar, star2: TuViStar) {
    return this.palace.hasSupportStars2(star1, star2);
  }

  hasStarWithForceStatusArr(
    starArr: TuViStar[],
    status: boolean,
    minCount: number
  ) {
    return this.palace.hasStarWithForceStatusArr(starArr, status, minCount);
  }

  hasStarWithForceStatus(star: TuViStar, status: boolean) {
    return this.palace.hasStarWithForceStatus(star, status);
  }

  hasStarWithStatusArr(starArr: TuViStar[], status: number, minCount: number) {
    return this.palace.hasStarWithStatusArr(starArr, status, minCount);
  }

  hasStarWithStatus(star: TuViStar, status: number) {
    return this.palace.hasStarWithStatus(star, status);
  }

  // Evaluate bad/good support star count
  evalSupportPalaceStar() {
    const starSet = this.palace.starSet;
    this.goodStarsCount = 0;
    this.badStarsCount = 0;
    this.goodChinhTinhSupportPalace = 0;
    this.goodTrungTinhSupportPalace = 0;
    starSet.forEach((tuViStar) => {
      if (tuViStar.force > 0) {
        if (tuViStar.isChinhTinh()) {
          this.goodChinhTinhSupportPalace++;
        } else {
          if (tuViStar.isTrungTinh()) {
            this.goodTrungTinhSupportPalace++;
          }
        }
        this.goodStarsCount++;
      } else {
        this.badStarsCount++;
      }
      if (tuViStar.diaStatus > TuViStar.HAMDIA) {
        this.goodStarsCount++;
      } else {
        this.badStarsCount++;
      }
    });
  }

  evalTuanTrietKhong() {
    this.hasTuanTrietKhong = false;

    if (this.hasStars(TuViStarHelper.TUANTRIET, 1)) {
      const ringDirection =
        this.tuviHoroscope.tuviPalaceStarMap.getRingDirection();
      const nextPalace = this.palace.getNextPalace(ringDirection);
      this.hasTuanTrietKhong = nextPalace.hasSomeStar(TuViStarHelper.TUANTRIET);
    }
  }

  isMan() {
    return this.tuviHoroscope.birthLunar.isMan;
  }

  genRef17p62p20() {
    if (this.palace.ringType === TuViRing.ThienDi) {
      if (this.palace.goodBadChinhTinhBalanceForce > 0) {
        this.addSupportBaseComment(7, 'Ref17p62p20a');
      }
      if (this.hasTuanTrietKhong || this.hasHostileStars()) {
        this.addSupportBaseComment(4, 'Ref17p62p20b');
      }
    }
  }

  genRef17p62p22() {
    if (this.palace.ringType === TuViRing.PhuThe) {
      if (this.hasStar(TuViStar.THAIAM)) {
        this.addSupportBaseComment(5, 'Ref17p62p22a');
      }
      if (this.hasTuanTrietKhong) {
        this.addSupportBaseComment(5, 'Ref17p62p22b');
      }
    }
  }

  genRef17p62p23() {
    if (this.palace.ringType === TuViRing.TaiBach) {
      if (this.palace.goodBadChinhTinhBalanceForce > 0) {
        if (
          this.hasSupportStars0(TuViStarHelper.CONGUYETDONGLUONG) ||
          this.hasSupportStars0(TuViStarHelper.SATPHALIEMTHAM)
        ) {
          this.addSupportBaseComment(7, 'Ref17p62p23a');
        }
      }
      if (this.hasSupportStars0(TuViStarHelper.HAOQUYENLOCKIEPHOA)) {
        this.addSupportBaseComment(7, 'Ref17p62p23b1');
        if (this.hasSupportStars0(TuViStarHelper.KINHPHUC)) {
          this.addSupportBaseComment(4, 'Ref17p62p23b2');
        }
      }
      if (this.hasSupportStars0(TuViStarHelper.LUUKIEP)) {
        this.addSupportBaseComment(4, 'Ref17p62p23c');
      }
    }
  }

  genRef17p62p24() {
    if (this.palace.ringType === TuViRing.QuanLoc) {
      if (this.isMan()) {
        if (
          this.hasTuanTrietKhong &&
          this.hasSupportStars0(TuViStarHelper.KIEPHOAKY)
        ) {
          this.addBaseComment('Ref17p62p24a1');
          if (this.palace.isGoodStarFavorable()) {
            this.addSupportBaseComment(7, 'Ref17p62p24a2');
          }
        }
      } else {
        if (
          this.hasTuanTrietKhong &&
          this.hasSupportStars0(TuViStarHelper.MONHO) &&
          this.hasCombinedSatTinh
        ) {
          this.addSupportBaseComment(4, 'Ref17p62p24b');
        }
      }
    }
  }

  genRef17p62p25() {
    if (this.palace.ringType === TuViRing.PhucDuc) {
      if (
        this.palace.goodBadChinhTinhBalanceForce > 0 &&
        this.palace.getNote() > TuViPalace.GOODNOTESREFERENCE
      ) {
        this.addSupportBaseComment(8, 'Ref17p62p25a');
      } else {
        if (this.palace.badActiveChinhTinhCount > 1 && this.hasSatTinh()) {
          this.addSupportBaseComment(3, 'Ref17p62p25b');
        }
      }
    }
  }

  genRef17p86p9() {
    if (this.palace.branche === Branche.TIGER) {
      if (
        this.hasSupportStars0(TuViStarHelper.KHOAQUYENLOC) &&
        this.hasStars(TuViStarHelper.KINHBAT, 1)
      ) {
        if (!this.hasTuanTrietKhong) {this.addBaseComment('Ref17p86p9');}
      }
    }
  }

  genRef17p89p3() {
    if (this.hasStar(TuViStar.THAIAM)) {
      this.addBaseComment('Ref17p89p3');
    }
  }

  genRef17p101p2() {
    if (this.hasStarWithStatus(TuViStar.CUMON, TuViStar.HAMDIA)) {
      if (this.hasStars(TuViStarHelper.KINHDA, 1)) {
        this.addSupportBaseComment(3, 'Ref17p101p2');
      }
    }
  }

  genRef17p103p6() {
    // Menh case but seems apply also for than (cas Thuy)
    if (this.hasStar(TuViStar.TUONGQUAN) && !this.isMan()) {
      this.addSupportBaseComment(6, 'Ref17p103p6');
    }
  }

  genRef17p116p6() {
    if (this.hasStar(TuViStar.VUKHUC)) {
      if (
        this.hasStarWithStatus(TuViStar.VANXUONG, TuViStar.DACDIA) ||
        this.hasStarWithStatus(TuViStar.VANKHUC, TuViStar.DACDIA)
      ) {
        this.addSupportBaseComment(8, 'Ref17p116p6');
      }
    }
  }

  genRef17p120p8() {
    if (this.hasStar(TuViStar.LOCTON)) {
      if (BrancheHelper.isRatHorse(this.palace.branche)) {
        if (this.hasStar(TuViStar.DIAKHONG) && this.hasManyGoodSupportStars()) {
          this.addSupportBaseComment(8, 'Ref17p120p8');
        }
      }
    }
  }

  genRef17p126p5() {
    if (this.hasSupportStars0(TuViStarHelper.KINHDAHOALINH)) {
      this.addSupportBaseComment(4, 'Ref17p126p5');
    }
    if (
      this.hasStarWithStatus(TuViStar.KINHDUONG, TuViStar.HAMDIA) ||
      this.hasStarWithStatus(TuViStar.DALA, TuViStar.HAMDIA) ||
      this.hasStarWithStatus(TuViStar.HOATINH, TuViStar.HAMDIA) ||
      this.hasStarWithStatus(TuViStar.LINHTINH, TuViStar.HAMDIA)
    ) {
      this.incPoints(2);
    }
  }

  hasGoodDiaStar(star: TuViStar) {
    return this.palace.hasGoodDiaStar(star);
  }

  hasGoodDiaStars(starSetArr: TuViStar[], goal: number) {
    return this.palace.hasGoodDiaStars(starSetArr, goal);
  }

  hasPrevNextStar1(star: TuViStar) {
    return this.palace.hasPrevNextStar1(star);
  }

  hasPrevNextStar2(star: TuViStar, forceStatus: boolean) {
    return this.palace.hasPrevNextStar2(star, forceStatus);
  }

  hasPrevNextStarArr(checkstarArr: TuViStar[], forceStatus: boolean) {
    this.palace.hasPrevNextStarArr(checkstarArr, forceStatus);
  }

  hasAllStars(checkstarArr: TuViStar[]) {
    return this.palace.hasAllStars(checkstarArr);
  }

  hasPrevNextStarArr1(checkstarArr: TuViStar[]) {
    return this.palace.hasPrevNextStarArr2(checkstarArr, 1);
  }

  hasPrevNextStarArr2(checkstarArr: TuViStar[], minCount: number) {
    return this.palace.hasPrevNextStarArr2(checkstarArr, minCount);
  }

  hasOppositePalaceStarArr(starArr: TuViStar[], minCount: number) {
    return this.palace.hasOppositePalaceStarArr(starArr, minCount);
  }

  hasOppositePalaceStar(star: TuViStar) {
    return this.palace.hasOppositePalaceStar(star);
  }

  hasOppositeStar(starArr: TuViStar[], forceStatus: boolean) {
    return this.palace.hasOppositeStar(starArr, forceStatus);
  }

  genRef17p259p1_6() {
    // Assume this is Menh or TaiBach or DienTrach Palace
    const ringType = this.palace.ringType;
    if (
      ringType === TuViRing.Menh ||
      ringType === TuViRing.TaiBach ||
      ringType === TuViRing.DienTrach
    ) {
      if (
        this.hasGoodDiaStar(TuViStar.TUONGQUAN) ||
        this.hasPrevNextStar1(TuViStar.THIENLUONG)
      ) {
        this.addSupportBaseComment(9, 'Ref17p259p1');
      }
      if (
        this.palace.branche === Branche.HORSE &&
        this.hasStar(TuViStar.THAIDUONG)
      ) {
        this.addSupportBaseComment(9, 'Ref17p259p3');
      }
      if (this.palace.branche === Branche.OX) {
        if (this.hasAllStars(TuViStarHelper.VUTHAM)) {
          this.addSupportBaseComment(9, 'Ref17p259p4');
        }
      }
      if (this.palace.branche === Branche.GOAT) {
        if (this.hasPrevNextStarArr2(TuViStarHelper.NHATNGUYET, 2)) {
          this.addSupportBaseComment(9, 'Ref17p259p4');
        }
      }
      if (BrancheHelper.isOxGoat(this.palace.branche)) {
        if (this.hasOppositePalaceStarArr(TuViStarHelper.NHATNGUYET, 2)) {
          this.addSupportBaseComment(9, 'Ref17p259p5');
        }
      }
      if (this.hasStar(TuViStar.THIENMA)) {
        if (this.hasPrevNextStarArr2(TuViStarHelper.LOCVU, 2)) {
          this.addSupportBaseComment(9, 'Ref17p259p6');
        }
      }
    }
    if (this.palace.isThan) {
      if (this.hasSupportStars0(TuViStarHelper.PHUTUONG)) {
        this.addSupportBaseComment(9, 'Ref17p259p2');
      }
    }
  }

  genPhuCuc() {
    this.genRef17p259p1_6();
  }

  genThienInfluence() {
    //Update with influence from thien thoi dia thoi
    this.incPoints(this.palace.bigPeriodOnBirthElementOmen.getPointBase20()/2);
}

  getObservations(ringType: TuViRing) {
    let res: TuViPalaceObservationBase = this;
    let count = 0;
    while (res != null && count <= 12) {
      if (res.palace.ringType === ringType) {return res;}
      res = res.palace.prev.palaceObservation;
      count++;
    }
    return null;
  }

  genRef17p259p7() {
    let observations = this.getObservations(TuViRing.Menh);
    if (observations.hasGoodDiaStar(TuViStar.TUVI)) {
      this.addSupportBaseComment(10, 'Ref17p259p7');
    }
    observations = this.getObservations(TuViRing.QuanLoc);
    if (
      observations.hasOppositePalaceStarArr(TuViStarHelper.TAHUU, 2) ||
      observations.hasOppositePalaceStarArr(TuViStarHelper.NHATNGUYET, 2)
    ) {
      this.addSupportBaseComment(10, 'Ref17p259p7');
    }
  }

  genRef17p260() {
    const ringType = this.palace.ringType;
    if (ringType === TuViRing.Menh || ringType === TuViRing.QuanLoc) {
      if (
        this.hasGoodDiaStar(TuViStar.TUVI) ||
        this.hasGoodDiaStar(TuViStar.THIENPHUR)
      ) {
        if (this.hasOppositePalaceStarArr(TuViStarHelper.TUPHUR, 1)) {
          this.addSupportBaseComment(10, 'Ref17p260p1');
        }
      }
      if (this.hasGoodDiaStar(TuViStar.TUVI)) {
        if (this.hasSupportStars2(TuViStar.TAPHU, TuViStar.HUUBAT)) {
          this.addSupportBaseComment(10, 'Ref17p260p2');
        }
        if (this.hasSupportStars2(TuViStar.VANXUONG, TuViStar.VANKHUC)) {
          this.addSupportBaseComment(10, 'Ref17p260p3');
        }
        if (this.hasSupportStars2(TuViStar.THIENKHOI, TuViStar.THIENVIET)) {
          this.addSupportBaseComment(10, 'Ref17p260p3');
        }
        if (this.hasSupportStars2(TuViStar.LONGTRI, TuViStar.PHUONGCAC)) {
          this.addSupportBaseComment(10, 'Ref17p260p3');
        }
      }
      if (
        this.hasGoodDiaStar(TuViStar.THIENPHUR) ||
        this.hasGoodDiaStar(TuViStar.TUONGQUAN)
      ) {
        if (this.hasOppositePalaceStarArr(TuViStarHelper.PHUTUONG, 1)) {
          this.addSupportBaseComment(10, 'Ref17p260p4');
        }
      }
      if (ringType === TuViRing.Menh) {
        if (
          this.palace.branche === Branche.RABBIT &&
          this.hasStar(TuViStar.VUKHUC)
        ) {
          this.addSupportBaseComment(10, 'Ref17p260p5');
        }
      }
      if (BrancheHelper.isRabbitCock(this.palace.branche)) {
        if (this.hasAllStars(TuViStarHelper.CUCO)) {
          this.addSupportBaseComment(10, 'Ref17p260p6');
        }
      }
      if (this.hasStar(TuViStar.THATSAT)) {
        if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
          if (this.hasOppositePalaceStarArr(TuViStarHelper.TUPHUR, 2)) {
            this.addSupportBaseComment(10, 'Ref17p260p7');
          }
        }
      }

      if (this.isPartOfTuMo) {
        if (this.hasAllStars(TuViStarHelper.THAMHOA)) {
          this.addSupportBaseComment(10, 'Ref17p260p8');
        }
      }
      if (this.palace.branche === Branche.RABBIT) {
        if (this.hasStar(TuViStar.THAIDUONG)) {
          this.addSupportBaseComment(10, 'Ref17p260p9');
        }
      }
      if (this.hasStar(TuViStar.THAIAM)) {
        if (this.palace.branche === Branche.PIG) {
          this.addSupportBaseComment(10, 'Ref17p260p10');
        }
      }
    }
  }

  genRef17p261() {
    const ringType = this.palace.ringType;
    const branche = this.palace.branche;
    if (ringType === TuViRing.Menh || ringType === TuViRing.QuanLoc) {
      if (this.hasStar(TuViStar.THAIAM)) {
        if (this.palace.branche === Branche.RAT) {
          this.addSupportBaseComment(10, 'Ref17p261p1');
        }
      }
      if (branche === Branche.OX) {
        if (
          TuViStar.THAIDUONG.getPalace().branche === Branche.SNAKE ||
          TuViStar.THAIAM.getPalace().branche === Branche.PIG
        ) {
          this.addSupportBaseComment(10, 'Ref17p261p2');
        }
      }
      if (branche === Branche.GOAT) {
        if (this.hasOppositePalaceStarArr(TuViStarHelper.NHATNGUYET, 2)) {
          this.addSupportBaseComment(10, 'Ref17p261p3');
        }
        if (
          TuViStar.THAIDUONG.getPalace().branche === Branche.RABBIT &&
          TuViStar.THAIAM.getPalace().branche === Branche.PIG
        ) {
          this.addSupportBaseComment(10, 'Ref17p261p4');
        }
      }

      if (ringType === TuViRing.Menh) {
        if (this.hasPrevNextStarArr2(TuViStarHelper.NHATNGUYET, 2)) {
          this.addSupportBaseComment(10, 'Ref17p261p5');
        }
      }
      if (this.hasGoodDiaStar(TuViStar.TUONGQUAN)) {
        if (this.hasPrevNextStarArr1(TuViStarHelper.LOCMA)) {
          this.addSupportBaseComment(10, 'Ref17p261p6');
        }
      }
      if (this.hasGoodDiaStar(TuViStar.QUOCAN)) {
        if (this.hasPrevNextStarArr1(TuViStarHelper.LIEMKINH)) {
          this.addSupportBaseComment(10, 'Ref17p261p7');
        }
      }
      if (branche === Branche.HORSE && this.hasStar(TuViStar.KINHDUONG)) {
        if (this.hasSupportStars0([TuViStar.THIENMA])) {
          this.addSupportBaseComment(10, 'Ref17p261p8');
        }
      }

      if (this.isPartOfTuMo) {
        if (this.hasStar(TuViStar.KINHDUONG)) {
          if (
            BrancheHelper.isOxDragonGoatDog(
              this.tuviHoroscope.birthLunar.getyBranche()
            )
          ) {
            this.addSupportBaseComment(10, 'Ref17p261p9');
          }
        }
      }
    }
  }

  hasSupportStars(starArr: TuViStar[], minCount: number) {
    return this.palace.hasSupportStars(starArr, minCount);
  }

  hasSupportStarWithTransform(star: TuViStar) {
    return this.palace.hasSupportStarWithTransform(star);
  }

  genRef17p262() {
    const ringType = this.palace.ringType;
    if (ringType === TuViRing.Menh || ringType === TuViRing.QuanLoc) {
      if (
        (this.hasStar(TuViStar.THIENKHOI) &&
          this.hasOppositePalaceStar(TuViStar.THIENVIET)) ||
        (this.hasStar(TuViStar.TAPHU) &&
          this.hasOppositePalaceStar(TuViStar.THIENKHOI))
      ) {
        this.addSupportBaseComment(10, 'Ref17p262p1');
      }
      if (this.hasSupportStars2(TuViStar.VANXUONG, TuViStar.VANKHUC)) {
        if (this.hasSupportStars0(TuViStarHelper.TUEKHOIVIET)) {
          this.addSupportBaseComment(10, 'Ref17p262p2b');
        } else {
          this.addSupportBaseComment(8, 'Ref17p262p2a');
        }
      }
      if (this.hasSupportStars0(TuViStarHelper.KHOAQUYENLOC)) {
        this.addSupportBaseComment(10, 'Ref17p262p3');
      }
      if (this.hasSupportStars(TuViStarHelper.QUYENLOCSINH, 3)) {
        this.addSupportBaseComment(10, 'Ref17p262p4');
      }
      if (
        (this.hasStar(TuViStar.HOAKHOA) &&
          this.hasSupportStarWithTransform(TuViStar.HOALOC)) ||
        (this.hasStar(TuViStar.HOALOC) &&
          this.hasSupportStarWithTransform(TuViStar.HOAKHOA))
      ) {
        this.addSupportBaseComment(10, 'Ref17p262p5');
      }
      if (
        (this.hasStar(TuViStar.LOCTON) &&
          this.hasSupportStarWithTransform(TuViStar.HOALOC)) ||
        (this.hasStar(TuViStar.HOALOC) &&
          this.hasSupportStarWithTransform(TuViStar.LOCTON))
      ) {
        this.addSupportBaseComment(10, 'Ref17p262p6');
      }
      if (this.hasStars(TuViStarHelper.LOCTONHOALOC, 1)) {
        if (this.hasPrevNextStarArr2(TuViStarHelper.VUTUONG, 2)) {
          this.addSupportBaseComment(10, 'Ref17p262p7');
        }
      }
    }
  }

  checkPhiThuongCach() {
    const starSet = TuViStarHelper.SATPHALIEMTHAM;
    if (this.hasSupportStars(starSet, starSet.length)) {
      this.addSupportBaseComment(10, 'Ref17p256p1b');
      if (
        this.hasSupportStars(
          TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCDUCCACHONGDAOXXX,
          6
        )
      ) {
        this.incPoints(10);
      }
    }
  }

  genNgheoHenCuc() {
    const branche = this.palace.branche;
    if (branche === Branche.TIGER || branche === Branche.MONKEY) {
      if (this.hasStar(TuViStar.LIEMTRINH) && this.hasTuanTrietKhong) {
        this.addSupportBaseComment(3, 'Ref17p262p8');
      }
      if (this.hasStar(TuViStar.PHAQUAN) && this.hasCombinedSatTinh) {
        this.addSupportBaseComment(3, 'Ref17p262p9');
      }
    }
  }

  genRef20p151c7a() {
    if (this.hasSupportStars0(TuViStarHelper.CUNHAT)) {
      const branche = this.palace.branche;
      if (branche === Branche.TIGER) {
        this.addSupportBaseComment(8, 'Ref20p151c7a1');
      } else {
        this.addSupportBaseComment(6, 'Ref20p151c7a2');
      }
      if (this.hasStars(TuViStarHelper.QUYENPHUONG, 1)) {
        this.incPoints(9);
      }
      if (this.hasStar(TuViStar.LOCTON)) {
        this.incPoints(3);
      }
    }
  }

  getTuViCucElement() {
    return this.tuviHoroscope.tuviPalaceStarMap.tuViCucElement;
  }

  getLunarYearBranche() {
    return this.tuviHoroscope.birthLunar.getyBranche();
  }

  getMenhCucPalaceNStarElement(
    palaceEl: Element,
    starEl: Element,
    menhCucEl: Element
  ) {
    let points = 0;
    const rel1 = BaziHelper.getRelation(palaceEl,starEl);
    const rel2 = BaziHelper.getRelation(starEl,menhCucEl);
    switch (rel1) {
      case ElementRelation.GENERATE:
        switch (rel2) {
          case ElementRelation.GENERATE:
            points = 10;
            break;
          case ElementRelation.GENERATED:
            points = 9;
            break;
          case ElementRelation.ENFORCE:
            points = 7;
            break;
          case ElementRelation.RESTRICT:
            points = 3;
            break;

          case ElementRelation.RESTRICTED:
            points = 4;
            break;
        }
        break;
      case ElementRelation.ENFORCE:
        switch (rel2) {
          case ElementRelation.GENERATE:
            points = 8;
            break;
          case ElementRelation.GENERATED:
            points = 7;
            break;
          case ElementRelation.ENFORCE:
            points = 6;
            break;
          case ElementRelation.RESTRICT:
          case ElementRelation.RESTRICTED:
            points = 2;
            break;
        }
        break;
      case ElementRelation.RESTRICT:
        switch (rel2) {
          case ElementRelation.GENERATE:
            points = 5;
            break;
          case ElementRelation.GENERATED:
          case ElementRelation.ENFORCE:
            points = 4;
            break;
          case ElementRelation.RESTRICT:
            points = 1;
            break;
          case ElementRelation.RESTRICTED:
            points = 3;
            break;
        }
        break;

      case ElementRelation.RESTRICTED:
        switch (rel2) {
          case ElementRelation.GENERATE:
          case ElementRelation.ENFORCE:
            points = 5;
            break;
          case ElementRelation.GENERATED:
            points = 4;
            break;
          case ElementRelation.RESTRICT:
          case ElementRelation.RESTRICTED:
            points = 2;
            break;
        }
        break;
    }

    return points;
  }

  checkThuongCach() {
    const hasSupportStars = this.hasSupportStars(
      TuViStarHelper.XUONGKHUCTHUONGCACH,
      7
    );
    if (hasSupportStars) {
      if (this.hasGoodDiaStars(TuViStarHelper.TUPHUVUTUONG, 3)) {
        this.addSupportBaseComment(10, 'Ref17p255p1a');
      }
      if (this.hasGoodDiaStars(TuViStarHelper.CODONGLUONG, 3)) {
        if (this.hasGoodDiaStar(TuViStar.NGUYETDUC)) {
          this.addSupportBaseComment(10, 'Ref17p255p1b1');
        }
        if (this.hasGoodDiaStar(TuViStar.THAIAM)) {
          this.addSupportBaseComment(10, 'Ref17p255p1b2');
        }
      }
      if (this.hasGoodDiaStar(TuViStar.THAIDUONG)) {
        if (this.hasGoodDiaStar(TuViStar.CUMON)) {
          this.addSupportBaseComment(10, 'Ref17p255p1c');
        }
        if (this.hasGoodDiaStar(TuViStar.THAIAM)) {
          this.addSupportBaseComment(10, 'Ref17p255p1d');
        }
      }
    }
  }

  checkTrungCach() {
    let starArr;
    if (this.hasStars(TuViStarHelper.CODONGLUONG, 2)) {
      if (this.hasSupportStars(TuViStarHelper.TAHUUQUANGQUYPHUC, 2)) {
        if (this.hasStar(TuViStar.NGUYETDUC)) {
          this.addSupportBaseComment(8, 'Ref17p255p2a1');
        }
        if (this.hasStar(TuViStar.THAIAM)) {
          this.addSupportBaseComment(8, 'Ref17p255p2a2');
        }
      }
      starArr = [
        TuViStar.TAPHU,
        TuViStar.HUUBAT,
        TuViStar.MO,
        TuViStar.HOAQUYEN,
        TuViStar.THIENKHOI,
        TuViStar.THIENVIET,
        TuViStar.VANXUONG,
        TuViStar.VANKHUC,
        TuViStar.TAUTHU,
      ];
      if (this.hasSupportStars(starArr,1)) {
        if (this.hasStar(TuViStar.NGUYETDUC)) {
          this.addSupportBaseComment(8, 'Ref17p255p2b1');
        }
        if (this.hasStar(TuViStar.THAIAM)) {
          this.addSupportBaseComment(8, 'Ref17p255p2b2');
        }
      }

      if (this.hasSupportStars(TuViStarHelper.TAHUUXUONGKHUC,1)) {
        if (this.hasStar(TuViStar.NGUYETDUC)) {
          this.addSupportBaseComment(8, 'Ref17p255p2c1');
        }
        if (this.hasStar(TuViStar.THAIAM)) {
          this.addSupportBaseComment(8, 'Ref17p255p2c2');
        }
      }

      if (this.hasSupportStars(TuViStarHelper.TAHUUXUONGKHUCTHAICAO,1)) {
        this.addSupportBaseComment(7, 'Ref17p255p2h');
      }
      starArr = [
        TuViStar.TUONGQUAN,
        TuViStar.QUOCAN,
        TuViStar.LONGDUC,
        TuViStar.PHUONGCAC,
        TuViStar.THIENHINH,
        TuViStar.THIENRIEU,
        TuViStar.HONGLOAN,
        TuViStar.DAOHOA,
      ];
      if (this.hasSupportStars(starArr,1)) {
        this.addSupportBaseComment(7, 'Ref17p255p2i');
      }
    }
    if (this.hasStars(TuViStarHelper.TUPHUVUTUONG, 3)) {
      starArr = [
        TuViStar.LONGDUC,
        TuViStar.PHUONGCAC,
        TuViStar.TAPHU,
        TuViStar.HUUBAT,
        TuViStar.THIENHINH,
        TuViStar.THIENRIEU,
      ];
      if (this.hasSupportStars(starArr,1)) {
        this.addSupportBaseComment(7, 'Ref17p255p2d1');
      }
    }
    if (this.hasStar(TuViStar.THIENCO)) {
      if (this.hasSupportStars(TuViStarHelper.HONGRIEUDAOTHU,1)) {
        this.addSupportBaseComment(7, 'Ref17p255p2d2');
      }
      if (this.hasSupportStars0(TuViStarHelper.HONGTHU)) {
        this.addSupportBaseComment(7, 'Ref17p255p2e');
      }
    }
    if (this.hasAllStars(TuViStarHelper.SATPHALIEMTHAM)) {
      if (this.hasSupportStars(TuViStarHelper.HONGDAOTHUDUCCAC, 1)) {
        this.addSupportBaseComment(7, 'Ref17p255p2g');
      }
      if (
        this.hasStarWithStatusArr(
          TuViStarHelper.TAHUUQUYENLOCNHATNGUYET,
          TuViStar.HAMDIA,
          1
        )
      ) {
        this.addSupportBaseComment(7, 'Ref17p255p2k');
      }
    }

    if (this.hasStar(TuViStar.THIENTUONG)) {
      if (this.hasSupportStars0(TuViStarHelper.PHUFTABUUTUONGQUOC)) {
        this.addSupportBaseComment(7, 'Ref17p255p2m');
      }
    }
  }


  genThienDiaInfluence() {
    //Update with influence from thien thoi dia thoi
    this.incPoints(this.palace.getThienDiaInfluence()/2);
}

  updateForceFromObservation(influenceObservation: TuViPalaceObservationBase) {
    let points = 4;
    if (influenceObservation.isFavorable()) {
      points = 10;
    }
    this.incPoints(points);
  }

  genQuiCuc() {
    this.genRef17p259p7();
    this.genRef17p260();
    this.genRef17p261();
    this.genRef17p262();
  }

  genRef17p289( tuviMenhObservation:TuViPalaceObservationBase,  tuviThanObservation:TuViPalaceObservationBase) {

    const menhBranche = tuviMenhObservation.palace.branche;
    const yTrunk = this.getyTrunk();
    if (tuviMenhObservation.hasSupportStars(TuViStarHelper.TUPHUVUTUONG, 4)) {
        if (this.hasSupportStars(TuViStarHelper.TUDATUYETCUDONG,1) && this.hasCombinedSatTinh) {
            this.addSupportBaseComment(1, "Ref17p289p1");
        }
        if (TrunkHelper.isJiaJi(yTrunk)) {
            if (this.hasSupportStars0(TuViStarHelper.HONGXUONGTAUKINH)) {
                this.addSupportBaseComment(9, "Ref17p289p2");
            }
        }
    }
    if (tuviMenhObservation.hasSupportStars(TuViStarHelper.CONGUYETDONGLUONG, 4)) {
        if (yTrunk===Trunk.JI) {
            if (this.hasStars(TuViStarHelper.SATPHALIEMTHAM, 2) && this.hasAllStars(TuViStarHelper.TAHUU)) {
                this.addSupportBaseComment(8, "Ref17p289p3");
            }
        }
        if (TrunkHelper.isYiXin(yTrunk)) {
            if (tuviMenhObservation.hasSupportStars0(TuViStarHelper.HUKINHTUEKHACH)) {
                if (this.hasSupportStars(TuViStarHelper.HUKINHTUEKHACH,1)) {
                    this.addSupportBaseComment(8, "Ref17p289p4");
                }
            }

        }
    }
    if (tuviThanObservation.hasSupportStars0(TuViStarHelper.SATPHALIEMTHAM)) {
        if (this.hasSupportStars(TuViStarHelper.VONGHINHKHOI,1) &&
        this.hasOppositePalaceStarArr(TuViStarHelper.DAKY, 2)) {
            this.addSupportBaseComment(1, "Ref17p289p5");
        }
    }
    if (BrancheHelper.isOxGoat(menhBranche) && tuviMenhObservation.hasStars(TuViStarHelper.TUPHUR,1)) {
        if (this.palace.branche.getElement()===Element.EARTH && this.hasSupportStars(TuViStarHelper.TAHUU,1)) {
            this.addSupportBaseComment(8, "Ref17p289p6a");
            if (tuviThanObservation.hasSomeStars(TuViStarHelper.HONGLOCKHOA, 2)) {
                this.addSupportBaseComment(9, "Ref17p289p6b");
            }
        }
    }

    if (menhBranche===Branche.HORSE && tuviMenhObservation.hasStar(TuViStar.TUVI)) {
        if (tuviMenhObservation.hasSupportStars0(TuViStarHelper.KHOAQUYENLOCHINHANXUONGKHOIHONGBAT)) {
            if (this.hasStars(TuViStarHelper.CUSATDALINH, 3)) {
                this.addSupportBaseComment(1, "Ref17p289p7");
            }
        }
    }

    if (tuviMenhObservation.hasStar(TuViStar.TUVI) && menhBranche===Branche.RAT) {
        this.addSupportBaseComment(3, "Ref17p289p8a");
        if ((BrancheHelper.isDragonDog(this.palace.branche)) && this.hasHostileStars()) {
            this.addSupportBaseComment(3, "Ref17p289p8b");
        }
    }
    if (BrancheHelper.isTigerMonkey(menhBranche)) {
        if (tuviMenhObservation.hasAllStars(TuViStarHelper.CUNHAT)) {
            if ( this.hasSupportStars0(TuViStarHelper.SATHINHKIEPKY)) {
                this.addSupportBaseComment(4, "Ref17p289p9a");
                if ( this.hasStar(TuViStar.THIENMA)) {
                    this.addSupportBaseComment(4, "Ref17p289p9b");
                }
            }
        }
    }

}

genRef17p290( tuviMenhObservation:TuViPalaceObservationBase,  tuviThanObservation: TuViPalaceObservationBase) {
    const menhBranche = tuviMenhObservation.palace.branche;
    const thanBranche = tuviThanObservation.palace.branche;
    if (menhBranche===Branche.HORSE && tuviMenhObservation.hasStar(TuViStar.THAIDUONG)) {
        if (this.hasSupportStars0(TuViStarHelper.HINHTANGHOKHOC)) {
            this.addSupportBaseComment(8, "Ref17p290p1");
        }
    }
    if (tuviMenhObservation.hasAllStars(TuViStarHelper.CUKY)) {
        if (this.hasSupportStars0(TuViStarHelper.TUEDAPHUF)) {
            this.addSupportBaseComment(4, "Ref17p290p2");
        }
    }
    if (thanBranche===Branche.TIGER && tuviThanObservation.hasAllStars(TuViStarHelper.COTHAIAM)) {
        if (this.hasSupportStars0(TuViStarHelper.LIEMHOLINHRIEU)) {
            if (!this.hasAllStars(TuViStarHelper.KHOAPHUONG)) {
                this.addSupportBaseComment(4, "Ref17p290p3a");
                if (!this.isMan()) {
                    this.addSupportBaseComment(4, "Ref17p290p3b");
                }
                if (this.hasSupportStars(TuViStarHelper.KIEPHINH,1)) {
                    if (this.isMan()) {
                        this.addSupportBaseComment(2, "Ref17p290p3c");
                    } else {
                        this.addSupportBaseComment(4, "Ref17p290p3b");
                    }
                }
            }
        }
    }
    if (tuviMenhObservation.hasStar(TuViStar.THAIAM)) {
        if (menhBranche===Branche.PIG) {
            if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCQUYENKY)) {
                this.addSupportBaseComment(8, "Ref17p290p4");
            }
        }
        if (tuviMenhObservation.hasAllStars(TuViStarHelper.HONGHINHRIEUKY)) {
            if (this.hasSupportStars0(TuViStarHelper.XUONGVU)) {
                this.addSupportBaseComment(3, "Ref17p290p5");
            }
        }
    }

    if (menhBranche===Branche.RABBIT && tuviMenhObservation.hasStar(TuViStar.THIENTUONG)) {
        if (tuviMenhObservation.hasSupportStars0(TuViStarHelper.SINHVUONGHONGDAOTAHUUQUYENXUONG)) {
            if (this.hasSupportStars0(TuViStarHelper.PHAKIEPHINHDA)) {
                this.addSupportBaseComment(3, "Ref17p290p6");
            }
        }
    }

    const yTrunk = this.getyTrunk();

    if (BrancheHelper.isDragonDog(menhBranche)) {
        if (tuviMenhObservation.hasOneStar(TuViStarHelper.VUTHAM)) {
            if (TrunkHelper.isWuGeng(yTrunk)) {
                if (!this.isMan()) {
                    if (BaziHelper.isManYangOrWoManYing(this.tuviHoroscope.birthLunar)) {
                        this.addSupportBaseComment(4, "Ref17p290p7a");
                        if (this.hasSupportStars0(TuViStarHelper.KINHDA)) {
                            this.addSupportBaseComment(1, "Ref17p290p7b");
                        }
                    }
                }
            }
        }
    }

    if (tuviMenhObservation.hasStar(TuViStar.THATSAT) ||
            tuviThanObservation.hasStar(TuViStar.THATSAT)) {
        if (this.hasSupportStars0(TuViStarHelper.KINHDA)) {
            this.addSupportBaseComment(2, "Ref17p290p8");
        }
    }
    if (tuviMenhObservation.hasAllStars(TuViStarHelper.SATHINHLINH)) {
        if (this.hasStar(TuViStar.BACHHO)) {
            this.addSupportBaseComment(3, "Ref17p290p9");
        }
    }
    if (TrunkHelper.isDingXin(yTrunk)) {
        if (BrancheHelper.isTigerMonkey(menhBranche)) {
            if (tuviMenhObservation.hasStar(TuViStar.PHAQUAN)) {
                if (tuviMenhObservation.hasSupportStars0(TuViStarHelper.HOAVIET)) {
                    this.addSupportBaseComment(7, "Ref17p290p10a");
                    if (this.hasSupportStars0(TuViStarHelper.MATUYET)) {
                        this.addSupportBaseComment(3, "Ref17p290p10b");
                    }
                }
            }
        }
    }
}


genRef17p291( tuviMenhObservation: TuViPalaceObservationBase,  tuviThanObservation: TuViPalaceObservationBase) {
    const menhBranche = tuviMenhObservation.palace.branche;
    if (BrancheHelper.isRatHorse(menhBranche)) {
        if (tuviMenhObservation.hasAllStars(TuViStarHelper.LIEMTUONG)) {
            if (this.hasSupportStars(TuViStarHelper.LAVONGTHAMLINHDA,1)) {
                this.addSupportBaseComment(1, "Ref17p291p1");
            }
        }
    }
    const yTrunk = this.getyTrunk();
    if (BrancheHelper.isOxGoat(menhBranche)) {
        if (TrunkHelper.isJiYi(yTrunk)) {
          if (this.isMan() &&BaziHelper.isManYangOrWoManYing(this.tuviHoroscope.birthLunar)) {
                if (tuviMenhObservation.hasAllStars(TuViStarHelper.LIEMSAT)) {
                    this.addSupportBaseComment(8, "Ref17p291p2a");
                    if (this.hasSupportStars0(TuViStarHelper.KHOASINH)) {
                        this.addSupportBaseComment(8, "Ref17p291p2b");
                    }
                }
            }
        }
    }

    if (tuviMenhObservation.hasStar(TuViStar.THAMLANG)) {
        if (this.hasHaoStar()) {
            this.addSupportBaseComment(4, "Ref17p291p3");
        }
        if (this.hasAllStars(TuViStarHelper.LOCTONHOALOC)) {
            this.addSupportBaseComment(8, "Ref17p291p4");
        }
    }
    if (tuviMenhObservation.hasAllStars(TuViStarHelper.KIEPKHONG) || tuviMenhObservation.hasTuanTrietKhong) {
        this.addSupportBaseComment(5, "Ref17p291p5");
        if (tuviMenhObservation.hasAllStars(TuViStarHelper.KIEPKHONG)) {
            if (this.palace.branche===tuviMenhObservation.palace.branche) {
                this.addSupportBaseComment(1, "Ref17p291p6");
            }
        }
    }
    if (tuviMenhObservation.hasAllStars(TuViStarHelper.HOALINH)) {
        if (this.hasSupportStars0(TuViStarHelper.KIEPKHONGTHUONGSU)) {
            this.addSupportBaseComment(1, "Ref17p291p7");
        }
    }
    if (tuviMenhObservation.hasAllStars(TuViStarHelper.LOCTONHOALOC)) {
        if (this.hasHaoStar()) {
            this.addSupportBaseComment(4, "Ref17p291p8");
        }
    }
    if (tuviMenhObservation.hasHaoStar()) {
        if (this.hasOneStar(TuViStarHelper.LOCTONHOALOC)) {
            this.addSupportBaseComment(8, "Ref17p291p9");
        }
        if (this.hasHostileStars()) {
            this.addSupportBaseComment(4, "Ref17p291p10");
        }
    }
    if (tuviMenhObservation.hasOneStar(TuViStarHelper.KHOIVIET) ||
        tuviThanObservation.hasOneStar(TuViStarHelper.KHOIVIET)) {
        if (this.palace===tuviMenhObservation.palace ||
          this.palace===tuviThanObservation.palace) {
            this.addSupportBaseComment(10, "Ref17p291p11");
        }
    }
    if (tuviMenhObservation.hasStar(TuViStar.TUONGQUAN)) {
        if (tuviMenhObservation.hasSupportStars0(TuViStarHelper.CAIDAOKHUCMOC)) {
            this.addSupportBaseComment(4, "Ref17p291p12");
        }
    }
    if (TrunkHelper.isBingRen(yTrunk)) {
        if (BrancheHelper.isSnakePig(menhBranche)) {
            if (tuviMenhObservation.hasSupportStars0(TuViStarHelper.TUONGBINHAN)) {
                this.addSupportBaseComment(8, "Ref17p291p13a");
                if (this.hasSupportStars0(TuViStarHelper.PHAQUYENLOC)) {
                    this.addSupportBaseComment(8, "Ref17p291p13b");
                }
            }
        }
    }
    if (tuviMenhObservation.palace.chinhTinhCount===0) {
        if (this.hasStars(TuViStarHelper.SATPHATHAM,1) &&
        this.hasSupportStars0(TuViStarHelper.DAOHONGSUYTUYET)) {
            this.addSupportBaseComment(1, "Ref17p291p14");
        }
    }
}

genRef17p292( tuviThanObservation: TuViPalaceObservationBase) {
  const branche=this.palace.branche;
  switch (this.getyBranche()) {
      case Branche.COCK:
          if (BrancheHelper.isRabbitCock(branche)) {
              if (this.hasOneStar(TuViStarHelper.KINHDA)) {
                  this.addSupportBaseComment(2, "Ref17p292p6");
              }
          }
          break;
      case Branche.DOG:
          if (BrancheHelper.isDragonDog(branche)) {
              if (tuviThanObservation.palace.branche===branche) {
                  this.addSupportBaseComment(2, "Ref17p292p7");
              }
          }
          break;
      case Branche.DRAGON:
          if (BrancheHelper.isDragonDog(branche)) {
              this.addSupportBaseComment(2, "Ref17p292p2");
              if (tuviThanObservation.palace.branche===branche) {
                  // To enforce previous rule
                  this.addSupportBaseComment(2, "Ref17p292p2");
              }
          }
          break;
      case Branche.GOAT:
          if (BrancheHelper.isCockPig(branche)) {
              this.addSupportBaseComment(2, "Ref17p292p4");
          }
          break;

      case Branche.MONKEY:
          if (BrancheHelper.isTigerHorseMonkey(branche)) {
              if (this.hasAllStars(TuViStarHelper.HOALINH)) {
                  this.addSupportBaseComment(2, "Ref17p292p5");
              }
          }
          break;
      case Branche.HORSE:
      case Branche.OX:
          if (BrancheHelper.isOxHorse(branche)) {
              this.addSupportBaseComment(2, "Ref17p292p1");
              if (this.hasStar(TuViStar.THATSAT)) {
                this.incPoints(1);
              }
          }
          break;
      case Branche.PIG:
          if (BrancheHelper.isSnakePig(branche)) {
              if (this.hasOneStar(TuViStarHelper.KINHDA)) {
                  this.addSupportBaseComment(2, "Ref17p292p8");
              }
          }
          break;
      case Branche.SNAKE:
          if (BrancheHelper.isSnakePig(branche)) {
              this.addSupportBaseComment(2, "Ref17p292p3");
              if (branche===Branche.SNAKE && tuviThanObservation.palace.branche===branche) {
                  // To enforce previous rule
                  this.incPoints(1);
              }
          }
          break;

      default:
          break;

  }
}

  commentOnMenhThanNPeriod() {

    // Ref17p287
    const tuviMenhObservation = this.getObservations(TuViRing.Menh);
    const tuviThanObservation = this.getThanObservations();

    const isMenhFavorable = tuviMenhObservation.hasFavorableStars();
    const isMenhTUPHUCUNHATCONGUYETDONGLUONG = tuviMenhObservation.hasSomeStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG);
    const isMenhSATPHALIEMTHAM = tuviMenhObservation.hasSomeStar(TuViStarHelper.SATPHALIEMTHAM);
    const isTUPHUCUNHATCONGUYETDONGLUONG = this.hasSomeStar(TuViStarHelper.TUPHUCUNHATCONGUYETDONGLUONG);
    const isSATPHALIEMTHAM = this.hasSomeStar(TuViStarHelper.SATPHALIEMTHAM);
    const isFavorable = this.hasFavorableStars();

    if (isMenhFavorable && tuviThanObservation.isFavorable()) {
        this.addSupportBaseComment(5, "Ref17p287p1");
    }

    if (!isMenhFavorable && !tuviThanObservation.isFavorable() && this.hasHostileStars()) {
      this.addSupportBaseComment(1, "Ref17p287p2");
    }


    if (isMenhTUPHUCUNHATCONGUYETDONGLUONG && isMenhFavorable) {
        if (isTUPHUCUNHATCONGUYETDONGLUONG && isFavorable) {
          this.addSupportBaseComment(9, "Ref17p287p3");
        }
    }
    if (isMenhSATPHALIEMTHAM && (isMenhFavorable)) {
        if (isSATPHALIEMTHAM) {
            if (isFavorable) {
              this.addSupportBaseComment(9, "Ref17p287p4a");
            } else {
              this.addSupportBaseComment(6, "Ref17p287p4b");
            }
        }
    }
    if (isMenhTUPHUCUNHATCONGUYETDONGLUONG && isMenhFavorable) {
        if (isSATPHALIEMTHAM) {
            if (isFavorable) {
              this.addSupportBaseComment(7, "Ref17p287p5a");
            } else {
              this.addSupportBaseComment(3, "Ref17p287p5b");
            }
        }
    }
    if (isMenhSATPHALIEMTHAM && (isMenhFavorable)) {
        if (isTUPHUCUNHATCONGUYETDONGLUONG) {
            if (isFavorable) {
                this.addSupportBaseComment(7, "Ref17p287p6a");
            } else {
                this.addSupportBaseComment(3, "Ref17p287p6b");
            }
        }
    }


    if (tuviMenhObservation.hasAllStars(TuViStarHelper.VUTUONG) && isMenhFavorable) {
        if (isTUPHUCUNHATCONGUYETDONGLUONG || isSATPHALIEMTHAM) {
            if (isFavorable) {
              this.addSupportBaseComment(7, "Ref17p287p7");
            }
        }
    }

    if (isMenhTUPHUCUNHATCONGUYETDONGLUONG || isMenhSATPHALIEMTHAM) {
        if (isMenhFavorable) {
            if (this.hasStars(TuViStarHelper.VUTUONG,1)) {
                if (isFavorable) {
                  this.addSupportBaseComment(9, "Ref17p288p1");
                } else {
                  this.addSupportBaseComment(7, "Ref17p288p1");
                }
            }
        }

    }
    if (tuviMenhObservation.palace.chinhTinhCount === 0) {
        if (isSATPHALIEMTHAM) {
            if (isFavorable) {
                this.addSupportBaseComment(8, "Ref17p288p2a");
            } else {
                this.addSupportBaseComment(5, "Ref17p288p2b");
            }
        }
        if (this.palace.chinhTinhCount === 0) {
            if (this.hasTuanTrietKhong) {
                this.addSupportBaseComment(9, "Ref17p288p3b");
            } else {
                this.addSupportBaseComment(3, "Ref17p288p3a");
            }
        }
    }
    if (!isMenhFavorable && tuviMenhObservation.palace === this.palace) {
        if (!(this.hasStar(TuViStar.THIENKHONG) && this.hasStar(TuViStar.KIEPSAT))) {
            this.addSupportBaseComment(8, "Ref17p288p4");
        } else {
          this.incPoints(2);
        }
    }
    this.genRef17p289(tuviMenhObservation, tuviThanObservation);
    this.genRef17p290(tuviMenhObservation, tuviThanObservation);
    this.genRef17p291(tuviMenhObservation, tuviThanObservation);
    this.genRef17p292( tuviThanObservation);
}

    // Ref17p286
commentTuViElementNTieuHan() {
  const tuViElement = this.getTuViElement();
  if (BaziHelper.getRelation(
        tuViElement,
        this.palace.branche.getElement()).isFavorable()) {
    this.addSupportBaseComment(3, "Ref17p286p1_5");
    if (tuViElement === Element.EARTH) {
      this.addSupportBaseComment(3, "Ref17p286p5");
    }
    if (tuViElement === Element.WATER) {
      this.addSupportBaseComment(3, "Ref17p286p3");
    }
    if (this.hasTuanTrietKhong || this.hasManyGoodStars) {
      this.addSupportBaseComment(8, "Ref17p286p6");
    }
  }
}

genTuViPeriod(daihan:TuViPalace,yDaihan:TuViPalace,yTieuHan:TuViPalace,) {
  if (this.hasStar(TuViStar.TUVI)) {
      if (BrancheHelper.isSnakePigRabbitCock(this.palace.branche)) {
        this.addSupportBaseComment(3, "Ref17p294p1");
      }
      if (this.hasTuanTrietKhong) {
          const map = this.tuviHoroscope.tuviPalaceStarMap;
           if (daihan.branche===yTieuHan.branche) {
            this.addSupportBaseComment(4, "Ref17p294p2");
          }
          if (yDaihan.branche===yTieuHan.branche) {
            this.addSupportBaseComment(2, "Ref17p294p2");
          }
      }
      if (this.hasStars(TuViStarHelper.PHUVUTUONGTAHUUKHOAQUYENLOC, 3)) {
        this.addSupportBaseComment(9, "Ref17p294p3");
      }
      if (this.hasOneStar(TuViStarHelper.KHOIVIET)) {
        this.addSupportBaseComment(8, "Ref17p294p4");
      }
      if (this.hasStars(TuViStarHelper.TAMKHONGKIETKY, 3)) {
        this.addSupportBaseComment(3, "Ref17p294p5");
      }
      if (this.hasStars(TuViStarHelper.KINHDAKIEPKY, 3)) {
        this.addSupportBaseComment(4, "Ref17p294p6");
      }
  }
}


evalPeriodStatuses (  studyLunar: Lunar) {
  // Common for all
  // Ref17p292
  const birthBranche=this.getyBranche()
  const periodYearBranche = studyLunar.getyBranche();
  const periodPalace = this.palace.getPalaceWithBranche(periodYearBranche);
  const periodHanBranche = periodPalace.branche;
  // Ref17p293
  if ( this.hasSomeStars(TuViStarHelper.NorthStarGroup,3) ) {
    if ( this.tuviHoroscope.tuviPalaceStarMap.isDuongNamAmNu ) {
      this.incPoints(8);
    }
  } else {
    if ( this.hasSomeStars(TuViStarHelper.SouthStarGroup,3) ) {
      if ( !this.tuviHoroscope.tuviPalaceStarMap.isDuongNamAmNu ) {
        this.incPoints(8);
      }
    }
  }
  const isBadPeriod=
          BrancheHelper.isBadYearAgeNPeriod(birthBranche,periodHanBranche) ||
          BrancheHelper.isClashYearAgeNPeriod(birthBranche,periodYearBranche, this.palace)
          ;
  //
  this.currPeriodComplementForceFactor = 0;
  if ( isBadPeriod ) {
      if ( ! this.hasManyGoodStars() )
          this.currPeriodComplementForceFactor = -0.25;
  }


}

commentOnStarPeriod( currAge: number,  studyLunar: Lunar,  isPeriodEnd: boolean,  isDayPeriod: boolean) {
  const map = this.tuviHoroscope.tuviPalaceStarMap;
  const daihan = map.getDaiVanPalaceForAge(currAge);
  const daihanObs = daihan.palaceObservation;
  const yDaihan =  map.getTuViStudyYearBrancheDaiHan(currAge,daihan);
  const yDaiHanObs = yDaihan.palaceObservation;
  const yTieuHan=   map.getTuViStudyYearBrancheTieuHan(studyLunar.getyBranche(), currAge);
  this.evalPeriodStatuses(studyLunar);
  this.genTuViPeriod(daihan,yDaihan, yTieuHan );


  if ( isDayPeriod ) {
      // Nam Dau stars
      this.genThaiAmPeriod();
      this.genThamLangPeriod();
      this.genCuMonPeriod(daihanObs);
      this.genLiemTrinhPeriod();
      this.genVuKhucPeriod();
      this.genPhaQuanPeriod();
      // Bac dau star group
      this.genThienDongPeriod();
      this.genThaiDuongPeriod();
      this.genThienPhuRPeriod();
      this.genThienTuongPeriod();
      this.genThatSatPeriod();
      this.genThienCoPeriod(daihanObs);
  } else {
      // Ref17p293
      if ( isPeriodEnd ) {
          // Nam Dau stars
          this.genThaiAmPeriod();
          this.genThamLangPeriod();
          this.genCuMonPeriod(daihanObs);
          this.genLiemTrinhPeriod();
          this.genVuKhucPeriod();
          this.genPhaQuanPeriod();
          this.genKinhDuongPeriod();
          this.genDaLaPeriod();
          this.genLocTonPeriod(daihanObs);
          this.genTaHuuPeriod(TuViStar.TAPHU);
          this.genTaHuuPeriod(TuViStar.HUUBAT);
          this.genXuongKhucPeriod(TuViStar.VANXUONG);
      } else {
          // Bac dau star group
          this.genThienDongPeriod();
          this.genThaiDuongPeriod();
          this.genThienPhuRPeriod();
          this.genThienTuongPeriod();
          this.genThienLuongPeriod();
          this.genThatSatPeriod();
          this.genThienCoPeriod(daihanObs);
          this.genHoaTinhPeriod();
          this.genLinhTinhPeriod();
          this.genXuongKhucPeriod(TuViStar.VANKHUC);
          this.genThienKhoiPeriod();
          this.genThienVietPeriod();
      }
      this.genDiaKhongKiepPeriod(TuViStar.DIAKHONG);
      this.genDiaKhongKiepPeriod(TuViStar.DIAKIEP);
      this.genHoaQuyenPeriod();
      this.genHoaKhoaPeriod();
      this.genHoaKyPeriod();
      this.genDaiTieuHaoPeriod(TuViStar.DAIHAO,daihanObs,yDaiHanObs);
      this.genDaiTieuHaoPeriod(TuViStar.TIEUHAO,daihanObs,yDaiHanObs);
      this.genTangMonPeriod();
      this.genBachHoPeriod();
      this.genLonnTriPhuongCacPeriod(TuViStar.LONGTRI);
      this.genLonnTriPhuongCacPeriod(TuViStar.PHUONGCAC);
      this.genDaoHoaPeriod();
      this.genHongLoanPeriod();
      this.genAnQuangThienQuyPeriod(TuViStar.ANQUANG);
      this.genAnQuangThienQuyPeriod(TuViStar.THIENQUY);
      this.genTuongQuanPeriod();
      this.genPhucBinhPeriod();
      this.genQuocAnPeriod();
      this.genDuongPhuPeriod();
      this.genThienMaPeriod(daihanObs);
      this.genGiaiThanPeriod(daihanObs,yDaiHanObs);
      this.genThienKhongPeriod();
      this.genTuanKhongPeriod();
      this.genTrietKhongPeriod(currAge);
  }
}


commentOnYearPeriod( currAge: number, lunar: Lunar, isPeriodEnd: boolean) {
    // Done in another place this.initComment();
    this.commentOnMenhThanNPeriod();
    this.commentOnStarPeriod(currAge, lunar,isPeriodEnd,false);
}



  commentOnThan() {
    if (this.palace.isThan) {
      this.genRef17p62p20();
      this.genRef17p62p22();
      this.genRef17p62p23();
      this.genRef17p62p24();
      this.genRef17p62p25();
      this.genRef17p86p9();
      this.genRef17p89p3();
      this.genRef17p101p2();
      this.genRef17p103p6();
      this.genRef17p116p6();
      this.genRef17p120p8();
      this.genRef17p126p5();
      this.checkPhiThuongCach();
      this.genNgheoHenCuc();
      this.genRef20p151c7a();
      this.palace.starSet.forEach((tuViStar) => {
        if (tuViStar.isChinhTinh()) {
          const cucElement = this.getTuViCucElement();
          const palaceElement = this.palace.branche.getElement();
          const point = this.getMenhCucPalaceNStarElement(
            palaceElement,
            tuViStar.getElement(),
            cucElement
          );
          this.palace.incPoints(point);
        }
      });
    }
  }

  genThaiAmPeriod() {
    if (this.hasStar(TuViStar.THAIAM)) {
            if (TuViStar.THAIAM.isFavorable()) {
                if (this.isFavorable()) {
                    this.addSupportBaseComment(9, "Ref17p296p13");
                }
            } else {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(3, "Ref17p296p14");
                    if (this.hasOneStar(TuViStarHelper.DATUEHO)) {
                        this.addSupportBaseComment(2, "Ref17p297p1");
                    }
                }
            }
            if (this.hasOneStar(TuViStarHelper.TRISAT)) {
                this.addSupportBaseComment(5, "Ref17p297p2");
            }
            if (this.hasAllStars(TuViStarHelper.DAKY)) {
                this.addSupportBaseComment(3, "Ref17p297p3");
            }
            if (this.hasAllStars(TuViStarHelper.HOALINH)) {
                this.addSupportBaseComment(4, "Ref17p297p4");
            }
            if (this.hasStar(TuViStar.THIENHINH)) {
                this.addSupportBaseComment(3, "Ref17p297p5");
            }
    }
}

genThamLangPeriod() {
    if (this.hasStar(TuViStar.THAMLANG)) {
        if (TuViStar.THAMLANG.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(7, "Ref17p297p6a");
                if (this.isPartOfTuMo) {
                    if (BrancheHelper.isOxDragonGoatDog(this.getyBranche())) {
                        this.addSupportBaseComment(8, "Ref17p297p6b");
                        if (this.hasSupportStars(TuViStarHelper.HOALINH, 2)) {
                            this.addSupportBaseComment(8, "Ref17p297p6c");
                        }
                    }
                }
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p297p7");
            }
        }
        if (this.hasAllStars(TuViStarHelper.VULOCMA)) {
            this.addSupportBaseComment(7, "Ref17p297p8");
        }
        if (this.hasAllStars(TuViStarHelper.HONGDAO)) {
            this.addSupportBaseComment(7, "Ref17p297p9");
        }
        if (this.hasOneStar(TuViStarHelper.KYLUONG)) {
            this.addSupportBaseComment(3, "Ref17p297p10");
        }
        if (this.hasAllStars(TuViStarHelper.KYRIEU)) {
            this.addSupportBaseComment(3, "Ref17p297p11");
        }
        if (this.hasAllStars(TuViStarHelper.KIEPKHONG)) {
            this.addSupportBaseComment(4, "Ref17p297p12");
        }
        if (this.hasStar(TuViStar.BACHHO)) {
            this.addSupportBaseComment(4, "Ref17p297p13");
            if (BrancheHelper.isTigerDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p297p13");
            }
        }
    }
}

genCuMonPeriod(daihanObs:TuViPalaceObservationBase ) {
    if (this.hasStar(TuViStar.CUMON)) {
        if (TuViStar.CUMON.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p297p14aRef20p155L3");
                if (this.palace.branche===Branche.PIG && this.hasOneStar(TuViStarHelper.LOCTONHOALOC)) {
                    this.addSupportBaseComment(6, "Ref17p297p14bRef20p155L4");
                }
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p298p1aRef20p155L5");
                if (!daihanObs.isFavorable()) this.incPoints(2); // Ref20p155j5
                if (this.isPartOfTuMo) {
                    this.addSupportBaseComment(1, "Ref17p298p1b");
                }
            }
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(3, "Ref17p298p2Ref20p155L1");
        }
        if (this.hasStar(TuViStar.TANGMON)) {
            this.addSupportBaseComment(3, "Ref17p298p3");
        }
        if (this.hasAllStars(TuViStarHelper.TANGHOALINH)) {
            this.addSupportBaseComment(3, "Ref17p298p4Ref20p155L6");
        }
    }
}

genThienTuongPeriod() {
    if (this.hasStar(TuViStar.THIENTUONG)) {
        if (TuViStar.THIENTUONG.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p298p5");
            }
        } else {
            if (this.hasHostileStars() && this.hasCombinedSatTinh) {
                this.addSupportBaseComment(5, "Ref17p298p6");
            }
        }
        if (this.hasAllStars(TuViStarHelper.KIEPKHONG)) {
            this.addSupportBaseComment(5, "Ref17p298p7");
        }
        if (this.hasAllStars(TuViStarHelper.KHOIHINH)) {
            this.addSupportBaseComment(3, "Ref17p298p8");
        }
        if (this.hasTuanTrietKhong) {
            this.addSupportBaseComment(3, "Ref17p298p9a");
            if (this.palace.ringType===TuViRing.ThienDi) {
                this.addSupportBaseComment(2, "Ref17p298p9b");
            }
        }
    }
}

genThienLuongPeriod() {
    if (this.hasStar(TuViStar.THIENLUONG)) {
        if (TuViStar.THIENLUONG.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p298p10");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(5, "Ref17p299p1a");
                if (BrancheHelper.isRatPig(this.palace.branche)) {
                    this.addSupportBaseComment(5, "Ref17p299p1b");
                }
            }
        }
        if (this.hasCombinedSatTinh) {
            this.addSupportBaseComment(3, "Ref17p299p2");
        }
    }
}

genThatSatPeriod() {
    if (this.hasStar(TuViStar.THATSAT)) {
        if (TuViStar.THATSAT.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p299p3a");
                if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
                    this.addSupportBaseComment(8, "Ref17p299p3b");
                }
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p299p4a");
                if (this.hasCombinedSatTinh) {
                    this.addSupportBaseComment(4, "Ref17p299p4b");
                }
                if (this.hasAllStars(TuViStarHelper.KINHDA)) {
                    this.addSupportBaseComment(4, "Ref17p299p4b");
                }
                if (BrancheHelper.isDragonDog(this.palace.branche)) {
                    this.addSupportBaseComment(4, "Ref17p299p4c");
                }
            }
        }
        if (this.hasStars(TuViStarHelper.LIEMTHAMPHUONG, 2)) {
            this.addSupportBaseComment(6, "Ref17p299p5");
        }
        if (this.hasAllStars(TuViStarHelper.PHAHINH)) {
            this.addSupportBaseComment(4, "Ref17p299p6");
        }
        if (this.hasStars(TuViStarHelper.PHAHAOMOCKY, 2)) {
            this.addSupportBaseComment(4, "Ref17p299p7");
        }
        if (this.hasStars(TuViStarHelper.KINHPHUCKHONGHAOHOA, 3)) {
            this.addSupportBaseComment(2, "Ref17p299p8");
        }
        if (this.hasHaoStar()) {
            this.addSupportBaseComment(3, "Ref17p299p9");
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(3, "Ref17p299p10");
        }
    }
}

genPhaQuanPeriod() {
    if (this.hasStar(TuViStar.PHAQUAN)) {
        if (TuViStar.PHAQUAN.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p299p11aRef20p170J1a");
                if (this.hasStars(TuViStarHelper.XUONGKHUCKHOIVIET, 2)) {
                    this.addSupportBaseComment(8, "Ref17p299p11b");
                }
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p299p12aRef20p170J1b");
                if (this.hasCombinedSatTinh) {
                    this.addSupportBaseComment(3, "Ref17p299p12b");
                }
                if (!this.isMan()) {
                    this.addSupportBaseComment(4, "Ref17p299p12c");
                }
            }
        }
        if (this.hasAllStars(TuViStarHelper.LIEMHOA)) {
            this.addSupportBaseComment(4, "Ref17p300p1Ref20p170J3");
        }
        if (this.hasOneStar(TuViStarHelper.SATLINH)) {
            this.addSupportBaseComment(4, "Ref17p300p2");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(4, "Ref17p300p3");
        }
        if (this.hasAllStars(TuViStarHelper.HINHLINHVIET)) {
            this.addSupportBaseComment(4, "Ref17p300p4Ref20p170J4");
        }
        if (this.hasStar(TuViStar.PHUONGCAC)) {
            this.addSupportBaseComment(4, "Ref17p300p5");
        }
        if (this.hasOneStar(TuViStarHelper.TUEKY)) {
            this.addSupportBaseComment(4, "Ref17p300p6Ref20p170J2");
        }
        if (this.hasStar(TuViStar.QUATU)) {
            this.addSupportBaseComment(4, "Ref17p300p7");
        }
        if (this.hasAllStars(TuViStarHelper.PHUCTUONGRIEUTHAI)) {
            this.addSupportBaseComment(4, "Ref17p300p8Ref20p170J5");
        }
    }
}

genKinhDuongPeriod() {
  const branche=this.palace.branche;
    if (this.hasStar(TuViStar.KINHDUONG)) {
        if (TuViStar.KINHDUONG.isFavorable()) {
            if (this.isFavorable()) {
              if (BrancheHelper.isOxDragonGoatDog(branche)) {
                    this.addSupportBaseComment(8, "Ref17p300p9b");
                } else {
                    this.addSupportBaseComment(5, "Ref17p300p9a");
                }
            }
        } else {
            if (this.hasHostileStars()) {
              if (BrancheHelper.isOxDragonGoatDog(branche)) {
                    this.addSupportBaseComment(6, "Ref17p300p10a");
                } else {
                    this.addSupportBaseComment(5, "Ref17p300p10a");
                    if (this.hasCombinedSatTinh) {
                        this.addSupportBaseComment(4, "Ref17p300p10b");
                    }
                }
            }
        }
        if (this.hasOneStar(TuViStarHelper.DAKHONGKIEP)) {
            this.addSupportBaseComment(3, "Ref17p300p11");
        }
        if (this.hasOneStar(TuViStarHelper.DAMA)) {
            this.addSupportBaseComment(5, "Ref17p300p12");
        }
        if (this.hasOneStar(TuViStarHelper.KIEPCAI)) {
            this.addSupportBaseComment(5, "Ref17p300p13");
        }
        if (this.hasOneStar(TuViStarHelper.DACAI)) {
            this.addSupportBaseComment(5, "Ref17p300p14");
        }
        if (this.hasStar(TuViStar.THIENRIEU)) {
            this.addSupportBaseComment(5, "Ref17p300p15");
        }
        if (this.hasOneStar(TuViStarHelper.KIEPHA)) {
            this.addSupportBaseComment(3, "Ref17p300p16");
        }
        if (this.hasOneStar(TuViStarHelper.KIEPKY)) {
            this.addSupportBaseComment(4, "Ref17p300p17");
        }
        if (this.hasStar(TuViStar.LUCSI)) {
            this.addSupportBaseComment(5, "Ref17p300p18");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(5, "Ref17p300p19");
        }
    }
}

genDaLaPeriod() {
    if (this.hasStar(TuViStar.DALA)) {
        if (TuViStar.DALA.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(6, "Ref17p301p1");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(2, "Ref17p301p2");
            }
        }
        if (this.hasStar(TuViStar.THAITUE)) {
            this.addSupportBaseComment(4, "Ref17p301p3");
            if (this.hasStar(TuViStar.HOAKY)) {
                this.addSupportBaseComment(3, "Ref17p301p4");
            }
            if (this.hasStar(TuViStar.THANHLONG)) {
                this.addSupportBaseComment(3, "Ref17p301p5");
            }
            if (this.hasStar(TuViStar.KIEPSAT)) {
                this.addSupportBaseComment(3, "Ref17p301p6");
            }
        }
        if (this.hasAllStars(TuViStarHelper.HOKY)) {
            this.addSupportBaseComment(3, "Ref17p301p6");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(4, "Ref17p301p7");
        }
        if (this.hasOneStar(TuViStarHelper.HOALINH)) {
            this.addSupportBaseComment(4, "Ref17p301p8");
        }
    }
}

genHoaTinhPeriod() {
    if (this.hasStar(TuViStar.HOATINH)) {
        if (TuViStar.HOATINH.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(7, "Ref17p301p9a");
                if (BrancheHelper.isRabbitHorse(this.palace.branche)) {
                    this.addSupportBaseComment(3, "Ref17p301p9b");
                }
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(3, "Ref17p301p10");
            }
        }
        if (this.hasAllStars(TuViStarHelper.LINHMOC)) {
            this.addSupportBaseComment(4, "Ref17p301p11");
        }
        if (this.hasStar(TuViStar.TANGMON)) {
            this.addSupportBaseComment(4, "Ref17p301p12");
        }
    }
}

genLinhTinhPeriod() {
    if (this.hasStar(TuViStar.LINHTINH)) {
        if (TuViStar.LINHTINH.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p301p13");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(2, "Ref17p301p14");
            }
        }
        if (this.hasAllStars(TuViStarHelper.XUONGPHUDA)) {
            this.addSupportBaseComment(3, "Ref17p301p15");
        }
        if (this.hasOneStar(TuViStarHelper.SATPHA)) {
            this.addSupportBaseComment(4, "Ref17p301p16");
        }
        if (this.hasStar(TuViStar.THIENVIET)) {
            this.addSupportBaseComment(2, "Ref17p301p17");
        }
    }
}

genLocTonPeriod(daihanObs: TuViPalaceObservationBase) {
    if (this.hasStar(TuViStar.LOCTON)) {
        if (TuViStar.LOCTON.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p302p10");
            }
        }
        if (this.hasStars(TuViStarHelper.KHOAQUYENTAHUU, 2)) {
            this.addSupportBaseComment(9, "Ref17p302p11");
        }
        if (this.hasStar(TuViStar.HOALOC)) {
            this.addSupportBaseComment(5, "Ref17p302p12");
        }
        if (this.hasOppositePalaceStar(TuViStar.HOALOC)) {
            this.addSupportBaseComment(9, "Ref17p302p12");
        }
        if (this.hasStar(TuViStar.THIENMA)) {
            this.addSupportBaseComment(8, "Ref17p302p13");
        }
        if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
            this.addSupportBaseComment(4, "Ref17p302p14");
            if (daihanObs.hasHostileStars()) {
                this.addSupportBaseComment(1, "Ref17p302p15");
            }
        }
        if (this.hasStar(TuViStar.THAITUE)) {
            if (daihanObs.hasHostileStars()) {
                this.addSupportBaseComment(1, "Ref17p302p15");
            }
        }
    }
}


genDiaKhongKiepPeriod( star: TuViStar) {
    if (this.hasStar(star)) {
        if (star.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p302p1");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(2, "Ref17p302p2");
            }
        }
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(4, "Ref17p302p3");
        }
        if (this.hasStars(TuViStarHelper.TUPHUKHOIVIET, 2)) {
            this.addSupportBaseComment(4, "Ref17p302p4");
        }
        if (this.hasAllStars(TuViStarHelper.TAHUU)) {
            this.addSupportBaseComment(4, "Ref17p302p5");
        }
        if (this.hasStars(TuViStarHelper.SATTUEKHONGPHUCKINHHAO, 3)) {
            this.addSupportBaseComment(1, "Ref17p302p6");
        }
        if (this.hasStars(TuViStarHelper.HOALINHKYTUEHAOPHUC, 3)) {
            this.addSupportBaseComment(1, "Ref17p302p7");
        }
        if (this.hasStar(TuViStar.HOAQUYEN)) {
            this.addSupportBaseComment(4, "Ref17p302p8");
        }
        if (this.hasAllStars(TuViStarHelper.QUANPHURF)) {
            this.addSupportBaseComment(4, "Ref17p302p9");
        }
    }
}


genTaHuuPeriod( star: TuViStar) {
    if (this.hasStar(star)) {
        if (star.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p303p1a");
                if (this.isPartOfTuMo) {
                    this.addSupportBaseComment(8, "Ref17p303p1b");
                }
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(2, "Ref17p303p2");
            }
        }
        if (this.hasStars(TuViStarHelper.KHOAQUYENLOC, 2)) {
            this.addSupportBaseComment(7, "Ref17p303p3");
        }
        if (this.hasCombinedSatTinh) {
            this.addSupportBaseComment(4, "Ref17p303p4");
        }
    }
}


genXuongKhucPeriod(star:TuViStar) {
    if (this.hasStar(star)) {
        if (star.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p303p5a");
                if (this.hasStar(TuViStar.VANXUONG)) {
                    this.addSupportBaseComment(9, "Ref17p303p5b");
                }
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p303p6");
            }
        }
        if (this.hasAllStars(TuViStarHelper.DONGTAHUU)) {
            this.addSupportBaseComment(7, "Ref17p303p7");
        }
        if (this.hasAllStars(TuViStarHelper.LIEMKINHDA)) {
            this.addSupportBaseComment(2, "Ref17p303p8");
        }
        if (this.hasStar(TuViStar.HOAKY)) {
            this.addSupportBaseComment(4, "Ref17p303p9");
        }
        if (this.hasStar(TuViStar.MOCDUC)) {
            this.addSupportBaseComment(6, "Ref17p303p10");
        }
        if (this.hasStar(TuViStar.THAITUE)) {
            this.addSupportBaseComment(8, "Ref17p303p11");
        }
        if (this.hasCombinedSatTinh) {
            this.addSupportBaseComment(3, "Ref17p303p12a");
            if (this.hasStar(TuViStar.LINHTINH)) {
                this.addSupportBaseComment(4, "Ref17p303p12b");
            }
        }
    }
}

genThienKhoiPeriod() {
    if (this.hasStar(TuViStar.THIENKHOI)) {
        if (this.hasStars(TuViStarHelper.TUPHURXUONGKHUCKHOIVIET, 4)) {
            this.addSupportBaseComment(9, "Ref17p303p13");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(3, "Ref17p303p14");
        }
        if (this.hasTuanTrietKhong) {
            this.addSupportBaseComment(3, "Ref17p304p1");
        }
    }
}

genThienVietPeriod() {
    if (this.hasStar(TuViStar.THIENVIET)) {
        if (this.hasStars(TuViStarHelper.TUPHURXUONGKHUCKHOIVIET, 4)) {
            this.addSupportBaseComment(9, "Ref17p304p2");
        }
        if (this.hasAllStars(TuViStarHelper.HINHLINH)) {
            this.addSupportBaseComment(3, "Ref17p304p3");
        }

    }
}

genHoaLocPeriod() {
    if (this.hasStar(TuViStar.HOALOC)) {
        if (this.hasOppositePalaceStar(TuViStar.LOCTON)) {
            this.addSupportBaseComment(8, "Ref17p304p4");
        }
        if (this.hasAllStars(TuViStarHelper.THAMVU)) {
            this.addSupportBaseComment(8, "Ref17p304p5");
        }

    }
}

genHoaQuyenPeriod() {
    if (this.hasStar(TuViStar.HOAQUYEN)) {
        if (TuViStar.HOAQUYEN.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p304p6");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p304p7");
            }
        }
        if (this.hasOneStar(TuViStarHelper.THAMVU)) {
            this.addSupportBaseComment(8, "Ref17p304p8");
        }
        if (this.hasTuanTrietKhong) {
            this.addSupportBaseComment(5, "Ref17p304p9");
        }
    }
}

genHoaKhoaPeriod() {
    if (this.hasStar(TuViStar.HOAKHOA)) {
        if (TuViStar.HOAKHOA.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p304p10");
            }
        }
        if (this.hasStars(TuViStarHelper.XUONGKHUCKHOIVIET, 3)) {
            this.addSupportBaseComment(8, "Ref17p304p11");
        }
    }
}

genHoaKyPeriod() {
    if (this.hasStar(TuViStar.HOAKY)) {
        if (TuViStar.HOAKY.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(7, "Ref17p305p1a");
            }
            if (this.hasAllStars(TuViStarHelper.NHATNGUYET)) {
                this.addSupportBaseComment(8, "Ref17p305p1b");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p305p2");
            }
        }
        if (this.hasStar(TuViStar.TUEPHA)) {
            this.addSupportBaseComment(5, "Ref17p305p3");
        }
        if (this.hasAllStars(TuViStarHelper.PHAKINH)) {
            this.addSupportBaseComment(4, "Ref17p305p4");
        }
        if (this.hasAllStars(TuViStarHelper.SATDA)) {
            this.addSupportBaseComment(3, "Ref17p305p5");
        }
        if (this.hasAllStars(TuViStarHelper.DAHO)) {
            this.addSupportBaseComment(3, "Ref17p305p6");
        }
        if (this.hasAllStars(TuViStarHelper.KINHDA)) {
            this.addSupportBaseComment(3, "Ref17p305p7");
        }
        if (this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
            this.addSupportBaseComment(3, "Ref17p305p8");
        }
        if (this.hasAllStars(TuViStarHelper.KIEPHINH)) {
            this.addSupportBaseComment(3, "Ref17p305p9");
        }
        if (this.hasAllStars(TuViStarHelper.HONGDAO)) {
            this.addSupportBaseComment(5, "Ref17p305p10");
        }
    }
}

genDaiTieuHaoPeriod( haoStar: TuViStar,daihanObs: TuViPalaceObservationBase, yDaihanObs: TuViPalaceObservationBase) {
    if (this.hasStar(haoStar)) {
        if (haoStar.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p305p11");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p305p12a");
                if (this.hasStars(TuViStarHelper.VUPHURLOC, 2)) {
                    this.addSupportBaseComment(3, "Ref17p305p12b");
                }
            }
        }

        if (daihanObs.hasSupportStars0(TuViStarHelper.KHONGKIEPSUYPHUTOAITUKY) ||
                yDaihanObs.hasSupportStars0(TuViStarHelper.KHONGKIEPSUYPHUTOAITUKY)) {
            this.addSupportBaseComment(3, "Ref17p305p13");
            if (this.palace.isTieuHan() && (
                    this.hasSupportStars0(TuViStarHelper.HINHPHIPHUBENHMOPHUCHO) ||
                            this.palace.isMenh())) {
                this.addSupportBaseComment(1, "Ref17p305p13");
            }
        }
        if (this.hasStar(TuViStar.PHAQUAN)) {
            this.addSupportBaseComment(4, "Ref17p305p14");
        }
        if (this.hasAllStars(TuViStarHelper.KIEPHINH)) {
            this.addSupportBaseComment(4, "Ref17p305p15");
        }
        if (this.hasStar(TuViStar.THIENTHUONG)) {
            this.addSupportBaseComment(4, "Ref17p306p1");
        }
        if (this.hasAllStars(TuViStarHelper.KYMOC)) {
            this.addSupportBaseComment(4, "Ref17p306p2");
        }
        if (this.hasStar(TuViStar.TUYET)) {
            this.addSupportBaseComment(3, "Ref17p306p3");
        }
    }
}

genTangMonPeriod() {

    if (this.hasStar(TuViStar.TANGMON)) {
        if (this.hasAllStars(TuViStarHelper.PHAKY)) {
            this.addSupportBaseComment(5, "Ref17p306p4");
        }
        if (this.hasAllStars(TuViStarHelper.KHOCHO)) {
            this.addSupportBaseComment(3, "Ref17p306p5");
        }
        if (this.hasOneStar(TuViStarHelper.KHOCHO)) {
            if (this.hasStar(TuViStar.THIENHU)) {
                this.addSupportBaseComment(5, "Ref17p306p6");
            }
            if (this.hasStar(TuViStar.THIENMA)) {
                this.addSupportBaseComment(5, "Ref17p306p7");
            }
        }
        if (this.hasOneStar(TuViStarHelper.KHOCKHONG)) {
            this.addSupportBaseComment(4, "Ref17p306p8");
        }
        if (this.hasStar(TuViStar.DIEUKHACH)) {
            this.addSupportBaseComment(3, "Ref17p306p11");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(3, "Ref17p306p9");
        }
        if (this.hasStar(TuViStar.THAITUE)) {
            this.addSupportBaseComment(4, "Ref17p306p10");
        }

        if (this.hasStar(TuViStar.HOATINH)) {
            this.addSupportBaseComment(4, "Ref17p306p12");
        }
    }
}

genBachHoPeriod() {

    if (this.hasStar(TuViStar.BACHHO)) {
        if (this.hasStar(TuViStar.THAMLANG)) {
            this.addSupportBaseComment(4, "Ref17p306p13");
            if (BrancheHelper.isTigerDog(this.palace.branche)) {
                this.addSupportBaseComment(4, "Ref17p306p13");
            }
        }
        if (this.hasStar(TuViStar.THATSAT)) {
            this.addSupportBaseComment(3, "Ref17p306p14");
        }
        if (this.hasSomeStar(TuViStarHelper.KIEPHINH)) {
            this.addSupportBaseComment(4, "Ref17p306p15");
        }
        if (this.hasStar(TuViStar.THIENKHOC)) {
            this.addSupportBaseComment(5, "Ref17p306p16");
        }
        if (this.hasAllStars(TuViStarHelper.KHOCRIEU)) {
            this.addSupportBaseComment(3, "Ref17p306p17");
        }
        if (this.hasStar(TuViStar.PHILIEM)) {
            this.addSupportBaseComment(8, "Ref17p306p18");
        }
        if (this.hasStar(TuViStar.TAUTHU)) {
            this.addSupportBaseComment(8, "Ref17p306p19");
        }
    }
}

genLonnTriPhuongCacPeriod( star: TuViStar) {
    if (this.hasStar(star)) {
        if (this.hasStar(TuViStar.THIENHY)) {
            this.addSupportBaseComment(8, "Ref17p307p3");
        }
        if (this.hasStars(TuViStarHelper.MASINHVUONG, 2)) {
            this.addSupportBaseComment(8, "Ref17p307p4");
        }
        if (this.hasStar(TuViStar.THAI)) {
            this.addSupportBaseComment(8, "Ref17p307p5");
        }
        if (this.hasAllStars(TuViStarHelper.RIEUHY)) {
            this.addSupportBaseComment(8, "Ref17p307p6");
        }
        if (this.hasOneStar(TuViStarHelper.THAIPHUJ)) {
            this.addSupportBaseComment(8, "Ref17p307p7");
        }
        if (this.hasAllStars(TuViStarHelper.LONGKHONGKIEP)) {
            this.addSupportBaseComment(3, "Ref17p307p8");
        }
        if (this.hasAllStars(TuViStarHelper.LONGDIEU)) {
            this.addSupportBaseComment(4, "Ref17p307p9");
        }
        if (this.hasStars(TuViStarHelper.PHUONGKHONGKIEP, 2)) {
            this.addSupportBaseComment(4, "Ref17p307p10");
        }
    }
}

genDaoHoaPeriod() {
    if (this.hasStar(TuViStar.DAOHOA)) {
        if (TuViStar.DAOHOA.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p307p11");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(3, "Ref17p307p12");
            }
        }
        if (this.hasStars(TuViStarHelper.TUPHUTUONGHONG, 2)) {
            this.addSupportBaseComment(8, "Ref17p307p13");
        }
        if (this.hasStars(TuViStarHelper.SATPHALIEMTHAMHONG, 3)) {
            this.addSupportBaseComment(8, "Ref17p307p14");
        }
         if (this.hasStars(TuViStarHelper.COCUTAHUUTUE, 3)) {
            this.addSupportBaseComment(3, "Ref17p307p15");
        }
        const phummau = this.getObservations(TuViRing.PhuMau);
        if (phummau.hasStar(TuViStar.TANGMON) && this.palace.isMenh()) {
            this.addSupportBaseComment(5, "Ref17p307p16");
        }
        if (this.hasAllStars(TuViStarHelper.HONGHYRIEU)) {
            this.addSupportBaseComment(4, "Ref17p308p1");
        }
    }
}

genHongLoanPeriod() {
    if (this.hasStar(TuViStar.HONGLOAN)) {
        if (TuViStar.HONGLOAN.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p308p2");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(8, "Ref17p308p3");
            }
        }
         if (this.hasStars(TuViStarHelper.TAHUULONGPHUONGRIEU, 3)) {
            this.addSupportBaseComment(8, "Ref17p308p4");
        }
        if (this.hasStar(TuViStar.THANHLONG)) {
            this.addSupportBaseComment(4, "Ref17p308p5");
        }
    }
}

genAnQuangThienQuyPeriod( star: TuViStar) {
    if (this.hasStar(star)) {
        if (star.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p308p6");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(8, "Ref17p308p7");
            }
        }
    }
}

genTuongQuanPeriod() {
    if (this.hasStar(TuViStar.TUONGQUAN)) {
        if (this.hasStar(TuViStar.THIENTUONG)) {
            this.addSupportBaseComment(8, "Ref17p308p8");
        }
        if (this.hasAllStars(TuViStarHelper.HINHAN)) {
            this.addSupportBaseComment(8, "Ref17p308p9");
        }
        if (this.hasTuanTrietKhong) {
            this.addSupportBaseComment(3, "Ref17p308p10");
        }
    }

}

genPhucBinhPeriod() {
    if (this.hasStar(TuViStar.PHUCBINH)) {
        if (TuViStar.PHUCBINH.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p308p11");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p308p12");
            }
        }
        if (this.hasStar(TuViStar.TANGMON)) {
            this.addSupportBaseComment(3, "Ref17p309p1");
        }
        if (this.hasStar(TuViStar.BACHHO)) {
            this.addSupportBaseComment(3, "Ref17p309p2");
        }
        if (this.hasAllStars(TuViStarHelper.HINHKHONGKIEP)) {
            this.addSupportBaseComment(4, "Ref17p309p3");
        }
        if (this.hasAllStars(TuViStarHelper.TUEKY)) {
            this.addSupportBaseComment(4, "Ref17p309p4");
        }
        if (this.hasAllStars(TuViStarHelper.HONGTHAIDAO)) {
            this.addSupportBaseComment(4, "Ref17p309p5");
        }
        if (this.hasAllStars(TuViStarHelper.HONGRIEUDAO)) {
            this.addSupportBaseComment(4, "Ref17p309p6");
        }
    }
}

genQuocAnPeriod() {
    if (this.hasStar(TuViStar.QUOCAN)) {
        if (TuViStar.QUOCAN.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(8, "Ref17p309p7");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p309p8");
            }
        }
        if (this.hasTuanTrietKhong) {
            this.addSupportBaseComment(4, "Ref17p309p9");
        }
    }
}

genDuongPhuPeriod() {
    if (this.hasStar(TuViStar.DUONGPHU)) {
        if (TuViStar.DUONGPHU.isFavorable()) {
            if (this.hasFavorableStars()) {
                this.addSupportBaseComment(8, "Ref17p309p10");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(4, "Ref17p309p11");
            }
        }
        if (this.hasOneStar(TuViStarHelper.LONGPHUONG)) {
            this.addSupportBaseComment(7, "Ref17p309p12");
        }
        if (this.hasStar(TuViStar.BACHHO)) {
            this.addSupportBaseComment(3, "Ref17p309p13");
        }
    }
}

genThienMaPeriod(daihanObs: TuViPalaceObservationBase) {
    if (this.hasStar(TuViStar.THIENMA)) {
        if (this.hasAllStars(TuViStarHelper.TUPHUR)) {
            this.addSupportBaseComment(9, "Ref17p309p14");
        }
         if (this.hasAllStars(TuViStarHelper.TUEKHONGKIEP)) {
            this.addSupportBaseComment(3, "Ref17p309p15a");
            if (!daihanObs.isFavorable()) {
                this.addSupportBaseComment(1, "Ref17p309p15b");
            }
        }
        if (this.hasOneStar(TuViStarHelper.DATHAI)) {
            this.addSupportBaseComment(3, "Ref17p309p16");
        }
        if (this.hasAllStars(TuViStarHelper.KHOCKHACH)) {
            this.addSupportBaseComment(8, "Ref17p309p17");
        }
        if (this.hasStar(TuViStar.THIENHINH)) {
            this.addSupportBaseComment(3, "Ref17p310p1");
        }
        if (this.hasStar(TuViStar.TUYET)) {
            this.addSupportBaseComment(3, "Ref17p310p2");
        }
        if (this.hasTuanTrietKhong) {
            this.addSupportBaseComment(3, "Ref17p310p3");
        }
    }
}

genGiaiThanPeriod(daihanObs: TuViPalaceObservationBase,yDaihanObs: TuViPalaceObservationBase) {
    if (this.hasStar(TuViStar.GIAITHAN)) {
        if (TuViStar.GIAITHAN.isFavorable()) {
            if (this.isFavorable()) {
                this.addSupportBaseComment(6, "Ref17p310p4");
            }
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(6, "Ref17p310p5");
            }
        }
        if (!daihanObs.isFavorable() && !yDaihanObs.isFavorable()) {
            if (this.palace.isTieuHan()) {
                this.addSupportBaseComment(1, "Ref17p310p6");
            }
        }
    }
}

genThienKhongPeriod() {
    if (this.hasStar(TuViStar.THIENKHONG)) {
        if (this.hasTuanTrietKhong) {
            this.addSupportBaseComment(1, "Ref17p310p7b");
        } else {
            this.addSupportBaseComment(8, "Ref17p310p7a");
        }
    }
}

genTuanKhongPeriod() {
    if (this.hasStar(TuViStar.TUANKHONG)) {
        if (this.hasManyGoodStars) {
            this.addSupportBaseComment(3, "Ref17p310p8");
        } else {
            if (this.hasHostileStars()) {
                this.addSupportBaseComment(5, "Ref17p311p1");
            }
        }
    }
}

genTrietKhongPeriod( currAge: number) {
    if (this.hasStar(TuViStar.TUANKHONG)) {
        if (currAge <= 30) {
            if (this.hasManyGoodStars) {
                this.addSupportBaseComment(3, "Ref17p311p2");
            } else {
                if (this.hasHostileStars()) {
                    this.addSupportBaseComment(7, "Ref17p311p3");
                }
            }
        }
    }
}

genLiemTrinhPeriod() {
  if (this.hasStar(TuViStar.LIEMTRINH)) {
      if (TuViStar.LIEMTRINH.isFavorable() && this.hasManyGoodSupportStars()) {
          this.addSupportBaseComment(8, "Ref17p294p7");
      }
if (BrancheHelper.isSnakePig(this.palace.branche)) {
          let points = 4;
          if (this.hasTuanTrietKhong || this.hasStar(TuViStar.HOAKY)) {
              points = 5;
          }
          this.addSupportBaseComment(points, "Ref17p294p8Ref20p162J1");
          if (this.hasStar(TuViStar.THIENHINH)) {
              this.addSupportBaseComment(points - 1, "Ref17p294p10");
          }
      }
if (BrancheHelper.isSnakePigRabbitCock(this.palace.branche)) {
          if (this.hasOneStar(TuViStarHelper.HOALINH)) {
              this.addSupportBaseComment(3, "Ref17p294p9");
          }
      }

      if (this.hasAllStars(TuViStarHelper.THAMSATPHA)) {
          this.addSupportBaseComment(4, "Ref17p294p11Ref20p162J2");
      }
      if (this.hasStar(TuViStar.PHAQUAN) && this.hasAllStars(TuViStarHelper.KIEPKINH)) {
          this.addSupportBaseComment(3, "Ref17p294p12Ref20p162J3");
      }
      if (this.hasOneStar(TuViStarHelper.KINHDA)) {
          this.addSupportBaseComment(4, "Ref17p294p13Ref20p162J4");
      }
      if (this.hasAllStars(TuViStarHelper.KYHINH) && this.hasOneStar(TuViStarHelper.KINHDA)) {
          this.addSupportBaseComment(2, "Ref17p294p14Ref20p162J5");
      }
  }
}

genThienDongPeriod() {
  if (this.hasStar(TuViStar.THIENDONG)) {
      this.addSupportBaseComment(6, "Ref17p294p15");
      if (TuViStar.THIENDONG.isFavorable()) {
          this.addSupportBaseComment(8, "Ref17p295p1");
      } else {
          this.addSupportBaseComment(4, "Ref17p295p2");
      }
      if (this.hasAllStars(TuViStarHelper.KINHLINH)) {
          this.addSupportBaseComment(8, "Ref17p295p3");
      }
      if (this.hasStar(TuViStar.HOAKY)) {
          this.addSupportBaseComment(5, "Ref17p295p4");
      }
  }
}

genVuKhucPeriod() {
  if (this.hasStar(TuViStar.VUKHUC)) {
      if (TuViStar.VUKHUC.isFavorable()) {
          this.addSupportBaseComment(8, "Ref17p295p5");
          if (this.hasAllStars(TuViStarHelper.TAHUUXUONGKHUC)) {
              this.incPoints(9);
          }
      } else {
          this.addSupportBaseComment(3, "Ref17p295p6");
      }
  }
}

genThaiDuongPeriod() {
  if (this.hasStar(TuViStar.THAIDUONG)) {
      if (TuViStar.THAIDUONG.isFavorable()) {
          this.addSupportBaseComment(8, "Ref17p295p7");
      } else {
          this.addSupportBaseComment(4, "Ref17p295p8");
          if (this.hasStars(TuViStarHelper.TANGKYDA, 2)) {
              this.incPoints(1);
          }
      }
      if (this.hasStar(TuViStar.LONGTRI)) {
          this.addSupportBaseComment(5, "Ref17p295p9");
      }
      if (this.hasStar(TuViStar.THANHLONG)) {
          this.addSupportBaseComment(4, "Ref17p295p10");
      }
      if (this.hasAllStars(TuViStarHelper.RIEUKYDA)) {
          this.addSupportBaseComment(4, "Ref17p295p11");
      }
      if (this.hasAllStars(TuViStarHelper.KINHDAHOALINH)) {
          this.addSupportBaseComment(3, "Ref17p295p12");
      }
  }
}

genThienCoPeriod(daihanObs: TuViPalaceObservationBase) {
  if (this.hasStar(TuViStar.THIENCO)) {
      if (TuViStar.THIENCO.isFavorable()) {

          if (this.hasAllStars(TuViStarHelper.LOCTONHOALOC)) {
              this.addSupportBaseComment(9, "Ref17p295p13");
          } else {
              this.addSupportBaseComment(8, "Ref17p295p13");
          }
      } else {
          this.addSupportBaseComment(3, "Ref17p296p1a");
          if (this.hasSupportStars0(TuViStarHelper.CUKINHDA)) {
              this.incPoints(2);
              if (daihanObs.hasHostileStars()) {
                  this.addSupportBaseComment(1, "Ref17p296p1b");
              }
          }
      }
      if (this.hasStars(TuViStarHelper.NGUYETDONGLUONGTAHUU, 2) && this.hasCombinedSatTinh) {
          this.addSupportBaseComment(7, "Ref17p296p2");
      }
      if (this.hasAllStars(TuViStarHelper.TANGTUELUONG)) {
          this.addSupportBaseComment(3, "Ref17p296p3");
      }
      if (this.hasOneStar(TuViStarHelper.THUONGSU)) {
          if (this.hasStar(TuViStar.KINHDUONG)) {
              this.addSupportBaseComment(4, "Ref17p296p6");
              if (this.hasStar(TuViStar.CUMON)) {
                  this.addSupportBaseComment(4, "Ref17p296p4");
              }
              if (this.hasStar(TuViStar.HOAKY)) {
                  this.addSupportBaseComment(2, "Ref17p296p5");
              }
          }
      }
      if (this.hasAllStars(TuViStarHelper.TANGKHOC)) {
          this.addSupportBaseComment(4, "Ref17p296p7");
      }
      if (this.hasAllStars(TuViStarHelper.KHOCHOAKINH)) {
          this.addSupportBaseComment(5, "Ref17p296p8");
      }
      if (this.hasAllStars(TuViStarHelper.KHOCHU)) {
          this.addSupportBaseComment(5, "Ref17p296p9");
      }
      if (this.hasStar(TuViStar.QUATU)) {
          this.addSupportBaseComment(4, "Ref17p296p10a");
          if (this.tuviHoroscope.getTuViMenhPalace().palaceObservation.hasHaoStar()) {
              this.addSupportBaseComment(2, "Ref17p296p10b");
          }
      }
  }
}

genThienPhuRPeriod() {
  if (this.hasStar(TuViStar.THIENPHUR)) {
      if (this.hasStars(TuViStarHelper.TAMKHONG, 2)) {
          if (TuViStarHelper.isHamDia(TuViStar.THIENPHUR,this.palace.branche)) {
            this.addSupportBaseComment(4, "Ref17p296p11");
          } else {
            this.addSupportBaseComment(2, "Ref17p296p11");
          }
      } else {
          if (! this.hasOneStar(TuViStarHelper.TAMKHONG)) {
            this.addSupportBaseComment(8, "Ref17p296p12a");
               if (this.hasAllStars(TuViStarHelper.KHOAQUYENLOC)) {
                this.addSupportBaseComment(8, "Ref17p296p12b");
               }
          }
      }
  }
}


getThanPalace() {
  let res: TuViPalace = this.palace;
  let count = 0;
  while ((!res.isThan) && count < 13) {
      res = res.prev;
      count++;
  }
  return res;
}

getThanObservations() {
  return this.getThanPalace().palaceObservation;
}

adjustPalaceNotes () {
  if ( ObjectHelper.isNaN(this.getNote())) {
      console.log('Palace Observation NAN Note  ', this.palace.getName());
  } else {
  this.palace.incPoints(this.getNote() / 10);
  }
}

hasNoGoodChinhTinh() {
  return this.palace.goodActiveChinhTinhCount <= 0;
}
 // Return the first main star with relation searchRelation to toElement
 getMainStarWithElementRelation4( searchRelation1:ElementRelation,  toElement1:Element,  searchRelation2:ElementRelation,  toElement2:Element) {
  let resTuViStar = null;
  const starSet = this.palace.starSet;
  for (let index = 0; index < starSet.length; index++) {
    const tuViStar = starSet[index];
      if (tuViStar.isChinhTinh()) {
          const element = tuViStar.getElement();
          if (BaziHelper.getRelation(element,toElement1) === searchRelation1 &&
          BaziHelper.getRelation(element,toElement2) == searchRelation2) {
              resTuViStar = tuViStar;
              break;
          }
      }
  }
  return resTuViStar;
}

// Return the first main star with relation searchRelation to toElement
getMainStarWithElementRelation2( searchRelation:ElementRelation, toElement:Element) {
let resTuViStar = null;
const starSet = this.palace.starSet;
for (let index = 0; index < starSet.length; index++) {
  const tuViStar = starSet[index];
    if (tuViStar.isChinhTinh()) {
        if (BaziHelper.getRelation(tuViStar.getElement(),toElement) == searchRelation) {
            resTuViStar = tuViStar;
            break;
        }
    }
}
return resTuViStar;
}


  // Ref22p218p1
  evalMenhStarElementEnergyCompatibility () {
    const palaceEnergy = this.palace.getEnergy();
    const menhElement = this.getTuViElement();
    let relation: ElementRelation ;
    const palaceElement = this.palace.getElement();
    this.hasMajorStarWithFavorableElement = false ;
    this.palace.starSet.forEach(tuViStar => {
        let point = 0;
        if ( tuViStar.isChinhTinh() ) {
            if (palaceEnergy===tuViStar.elementNEnergy.getEnergy()) {
                point = 10;
                this.palace.incPoints(point);
            }
            point = this.getMenhCucPalaceNStarElement(palaceElement,tuViStar.getElement(),menhElement);
            this.palace.incPoints(point);
        } else  if ( tuViStar.isTrungTinh() ) {

            if (palaceEnergy===tuViStar.elementNEnergy.getEnergy()) {
                point = 8;
                this.palace.incPoints(point);
            }

            relation = BaziHelper.getRelation(tuViStar.getElement(),menhElement);
            if (relation.isFavorable()) {
                point = 7;
                // Ref17p60CasB
                this.palace.incPoints(point);
                this.hasMajorStarWithFavorableElement = true ;
            }
        }
    })
}

override initPoint() {
  super.initPoint();
  this.evalSupportPalaceStar();
}


override adjustDegree(degree: number) {
  return degree + Math.round((10 - degree) * this.currPeriodComplementForceFactor);
}

override comment() {
  super.comment();
  this.commentOnThan();
  this.checkThuongCach();
  this.checkTrungCach();
}


}
