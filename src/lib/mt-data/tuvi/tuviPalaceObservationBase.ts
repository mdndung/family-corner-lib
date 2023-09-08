/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { threadId } from "worker_threads";
import { BaziHelper } from "../../helper/baziHelper";
import { BrancheHelper } from "../../helper/brancheHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { TuViHelper } from "../../helper/tuviHelper";
import { TuViStarHelper } from "../../helper/tuviStarHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ObservationBase } from "../../observations/observationBase";
import { Branche } from "../bazi/branche";
import { BrancheRelation } from "../bazi/brancheRelation";
import { Lunar } from "../bazi/lunar";
import { Trunk } from "../bazi/trunk";
import { Element } from "../feng-shui/element";
import { ElementRelation } from "../feng-shui/element-relation";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { TuViPalace } from "./tuviPalace";
import { TuViRing } from "./tuviRing";
import { TuViStar } from "./tuviStar";
import { LunarBase } from "../bazi/lunarBase";
import { DateHelper } from "../../helper/dateHelper";

export abstract class TuViPalaceObservationBase extends ObservationBase {
  static SINHDIA = ElementLifeCycle.BIRTH;
  static VUONGDIA = ElementLifeCycle.PROSPERITY;
  static BAIDIA = ElementLifeCycle.BATH;
  static TUYETDIA = ElementLifeCycle.REPOSE;

  palace: TuViPalace = null;
  tuviHoroscope: TuViHoroscope = null;
  hasTuanTrietKhong: boolean = null;
  goodStarsCount: number = null;
  badStarsCount: number = null;
  goodChinhTinhSupportPalace: number = null;
  goodTrungTinhSupportPalace: number = null;
  hasCombinedSatTinh: boolean = null;
  satTinhCombinatedCount: number = null;
  isPartOfTuMo: boolean = null;
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
    this.hasMajorStarWithFavorableElement = false;
  }

  override getName() {
    return this.palace.getName();
  }

  protected override getPilar(pilarChar: string) {
    if (pilarChar === "Year" || pilarChar === "Period")
      return this.tuviHoroscope.studyLunar.getPilar(LunarBase.YINDEX);
    return super.getPilar(pilarChar);
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
    if (this.palace.hasStar([star])) {
      if (ObjectHelper.hasItem(TuViStarHelper.NorthStarGroup, star)) {
        // North group start effect is only strong when it is in
      }
    }
  }

  hasOneStar(starArr: TuViStar[]) {
    return this.palace.hasSomeStars(starArr, 1);
  }

  hasSomeStars(starArr: TuViStar[], count: number) {
    return this.palace.hasSomeStars(starArr, count);
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

  hasManyGoodStars(): boolean {
    return (
      this.palace.goodBadChinhTinhBalanceForce > 0 &&
      this.palace.goodActiveChinhTinhCount > 0 &&
      this.palace.trungTinhForce > 0
    );
  }

  hasManyBadStars() {
    return (
      this.palace.goodBadChinhTinhBalanceForce < 0 &&
      this.palace.satTinhCount > 0
    );
  }

  hasGoodSupportStars(starArr: TuViStar[], countMax: number) {
    return this.hasSupportStars(starArr, countMax);
  }

  hasRelationGoodSupportPalaceStar(relation: BrancheRelation): boolean {
    return this.palace.hasRelationGoodSupportPalaceStar(relation);
  }

  hasRelationBadSupportPalaceStar(relation: BrancheRelation) {
    return this.palace.hasRelationBadSupportPalaceStar(relation);
  }

  hasRelationPalaceStar(star: TuViStar, relation: BrancheRelation) {
    return this.palace.hasRelationPalaceStar(star, relation);
  }

  hasManyGoodSupportStars(): boolean {
    return (
      this.hasManyGoodStars() ||
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
      if (this.isFavorableStar(tuViStar)) {
        return true;
      }
    }
    return false;
  }

  hasOneNonFavorableStar(starArr: TuViStar[]) {
    for (let index = 0; index < starArr.length; index++) {
      const tuViStar = starArr[index];
      if (this.isNonFavorableStar(tuViStar)) {
        return true;
      }
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



  genRef17p116p6() {
    if (this.hasStar(TuViStar.VUKHUC)) {
      if (
        this.hasStarWithStatus(TuViStar.VANXUONG, TuViStar.DACDIA) ||
        this.hasStarWithStatus(TuViStar.VANKHUC, TuViStar.DACDIA)
      ) {
      }
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

  // Cung Xung Chieu: Ref14p52 (Ref17 p23)
  getCungXungChieu(): TuViPalace {
    return this.palace.getNextPalace(6);
  }

  hasOppositeStar(starArr: TuViStar[], forceStatus: boolean) {
    return this.palace.hasOppositeStar(starArr, forceStatus);
  }

  getObservations(ringType: TuViRing) {
    let res: TuViPalaceObservationBase = this;
    let count = 0;
    while (res != null && count <= 12) {
      if (res.palace.ringType === ringType) {
        return res;
      }
      res = res.palace.prev.palaceObservation;
      count++;
    }
    return null;
  }

  hasSupportStars(starArr: TuViStar[], minCount: number) {
    return this.palace.hasSupportStars(starArr, minCount);
  }

  hasSupportStarWithTransform(star: TuViStar) {
    return this.palace.hasSupportStarWithTransform(star);
  }

  genRef20p151c7a() {
    if (this.hasSupportStars0(TuViStarHelper.CUNHAT)) {
      const branche = this.palace.branche;
      if (branche === Branche.TIGER) {
        this.addSupportBaseComment(8, "Ref20p151c7a1");
      } else {
        this.addSupportBaseComment(6, "Ref20p151c7a2");
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
    const rel1 = BaziHelper.getRelation(palaceEl, starEl);
    const rel2 = BaziHelper.getRelation(starEl, menhCucEl);
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
  genThienDiaInfluence() {
    //Update with influence from thien thoi dia thoi
    this.incPoints(this.palace.getThienDiaInfluence() / 2);
  }

  updateForceFromObservation(influenceObservation: TuViPalaceObservationBase) {
    let points = 4;
    if (influenceObservation.isFavorable()) {
      points = 10;
    }
    this.incPoints(points);
  }

  evalPeriodStatuses(studyLunar: Lunar) {
    // Common for all
    // Ref17p292
    const birthBranche = this.getyBranche();
    const periodYearBranche = studyLunar.getyBranche();
    const periodPalace = this.palace.getPalaceWithBranche(periodYearBranche);
    const periodHanBranche = periodPalace.branche;
    // Ref17p293
    if (this.hasSomeStars(TuViStarHelper.NorthStarGroup, 3)) {
      if (this.tuviHoroscope.tuviPalaceStarMap.isDuongNamAmNu) {
        this.incPoints(8);
      }
    } else {
      if (this.hasSomeStars(TuViStarHelper.SouthStarGroup, 3)) {
        if (!this.tuviHoroscope.tuviPalaceStarMap.isDuongNamAmNu) {
          this.incPoints(8);
        }
      }
    }
    const isBadPeriod =
      BrancheHelper.isBadYearAgeNPeriod(birthBranche, periodHanBranche) ||
      BrancheHelper.isClashYearAgeNPeriod(
        birthBranche,
        periodYearBranche,
        this.palace
      );
    //
    this.currPeriodComplementForceFactor = 0;
    if (isBadPeriod) {
      if (!this.hasManyGoodStars())
        this.currPeriodComplementForceFactor = -0.25;
    }
  }

  commentOnStarPeriod(
    currAge: number,
    studyLunar: Lunar,
    isPeriodEnd: boolean,
    isDayPeriod: boolean
  ) {
    const map = this.tuviHoroscope.tuviPalaceStarMap;
    const daihan = map.getDaiVanPalaceForAge(currAge,studyLunar.birthDate);
    const daihanObs = daihan.palaceObservation;
    const yDaihan = map.getTuViStudyYearBrancheDaiHan(currAge, daihan,studyLunar.birthDate);
    const yDaiHanObs = yDaihan.palaceObservation;
    const yTieuHan = map.getTuViStudyYearBrancheTieuHan(
      studyLunar.getyBranche(),
      currAge
    );
    this.evalPeriodStatuses(studyLunar);

    if (isDayPeriod) {
      // Nam Dau stars
      // Ref17p293
      if (isPeriodEnd) {
        // Nam Dau stars
      } else {
        // Bac dau star group
        this.genThienVietPeriod();
      }
      this.genHoaQuyenPeriod();
      this.genHoaKhoaPeriod();
      this.genHoaKyPeriod();
      this.genDaiTieuHaoPeriod(TuViStar.DAIHAO, daihanObs, yDaiHanObs);
      this.genDaiTieuHaoPeriod(TuViStar.TIEUHAO, daihanObs, yDaiHanObs);
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
      this.genGiaiThanPeriod(daihanObs, yDaiHanObs);
      this.genThienKhongPeriod();
      this.genTuanKhongPeriod();
      this.genTrietKhongPeriod(currAge);
    }
  }

  commentOnYearPeriod(currAge: number, lunar: Lunar, isPeriodEnd: boolean) {
    // Done in another place this.initComment();
    this.commentOnStarPeriod(currAge, lunar, isPeriodEnd, false);
    this.filterObservation(this.getTuViPeriodYearXHeader(), false);
    this.filterObservation(this.getTuViPeriodXHeader(), false);
    this.filterObservation(this.getTuViYearXHeader(), false);
    this.filterObservation(this.getTuViPeriodHeader(), false);
    this.filterObservation(this.getTuViYearHeader(), false);
  }

  commentOnThan() {
    if (this.palace.isThan) {
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

  genDaiTieuHaoPeriod(
    haoStar: TuViStar,
    daihanObs: TuViPalaceObservationBase,
    yDaihanObs: TuViPalaceObservationBase
  ) {
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

      if (
        daihanObs.hasSupportStars0(TuViStarHelper.KHONGKIEPSUYPHUTOAITUKY) ||
        yDaihanObs.hasSupportStars0(TuViStarHelper.KHONGKIEPSUYPHUTOAITUKY)
      ) {
        this.addSupportBaseComment(3, "Ref17p305p13");
        if (
          this.palace.isTieuHan() &&
          (this.hasSupportStars0(TuViStarHelper.HINHPHIPHUBENHMOPHUCHO) ||
            this.palace.isMenh())
        ) {
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

  genLonnTriPhuongCacPeriod(star: TuViStar) {
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

  genAnQuangThienQuyPeriod(star: TuViStar) {
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

  genGiaiThanPeriod(
    daihanObs: TuViPalaceObservationBase,
    yDaihanObs: TuViPalaceObservationBase
  ) {
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

  genTrietKhongPeriod(currAge: number) {
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



  getThanPalace() {
    let res: TuViPalace = this.palace;
    let count = 0;
    while (!res.isThan && count < 13) {
      res = res.prev;
      count++;
    }
    return res;
  }

  getThanObservations() {
    return this.getThanPalace().palaceObservation;
  }

  adjustPalaceNotes() {
    if (ObjectHelper.isNaN(this.getNote())) {
      console.log("Palace Observation NAN Note  ", this.palace.getName());
    } else {
      this.palace.incPoints(this.getNote() / 10);
    }
  }

  hasNoGoodChinhTinh() {
    return this.palace.goodActiveChinhTinhCount <= 0;
  }
  // Return the first main star with relation searchRelation to toElement
  getMainStarWithElementRelation4(
    searchRelation1: ElementRelation,
    toElement1: Element,
    searchRelation2: ElementRelation,
    toElement2: Element
  ) {
    let resTuViStar = null;
    const starSet = this.palace.starSet;
    for (let index = 0; index < starSet.length; index++) {
      const tuViStar = starSet[index];
      if (tuViStar.isChinhTinh()) {
        const element = tuViStar.getElement();
        if (
          BaziHelper.getRelation(element, toElement1) === searchRelation1 &&
          BaziHelper.getRelation(element, toElement2) == searchRelation2
        ) {
          resTuViStar = tuViStar;
          break;
        }
      }
    }
    return resTuViStar;
  }

  // Return the first main star with relation searchRelation to toElement
  getMainStarWithElementRelation2(
    searchRelation: ElementRelation,
    toElement: Element
  ) {
    let resTuViStar = null;
    const starSet = this.palace.starSet;
    for (let index = 0; index < starSet.length; index++) {
      const tuViStar = starSet[index];
      if (tuViStar.isChinhTinh()) {
        if (
          BaziHelper.getRelation(tuViStar.getElement(), toElement) ==
          searchRelation
        ) {
          resTuViStar = tuViStar;
          break;
        }
      }
    }
    return resTuViStar;
  }

  // Ref22p218p1
  evalMenhStarElementEnergyCompatibility() {
    const palaceEnergy = this.palace.getEnergy();
    const menhElement = this.getTuViElement();
    let relation: ElementRelation;
    const palaceElement = this.palace.getElement();
    this.hasMajorStarWithFavorableElement = false;
    this.palace.starSet.forEach((tuViStar) => {
      let point = 0;
      if (tuViStar.isChinhTinh()) {
        if (palaceEnergy === tuViStar.elementNEnergy.getEnergy()) {
          point = 10;
          this.palace.incPoints(point);
        }
        point = this.getMenhCucPalaceNStarElement(
          palaceElement,
          tuViStar.getElement(),
          menhElement
        );
        this.palace.incPoints(point);
      } else if (tuViStar.isTrungTinh()) {
        if (palaceEnergy === tuViStar.elementNEnergy.getEnergy()) {
          point = 8;
          this.palace.incPoints(point);
        }

        relation = BaziHelper.getRelation(tuViStar.getElement(), menhElement);
        if (relation.isFavorable()) {
          point = 7;
          // Ref17p60CasB
          this.palace.incPoints(point);
          this.hasMajorStarWithFavorableElement = true;
        }
      }
    });
  }

  override initPoint() {
    super.initPoint();
    this.evalSupportPalaceStar();
  }

  override adjustDegree(degree: number) {
    return (
      degree + Math.round((10 - degree) * this.currPeriodComplementForceFactor)
    );
  }

  override getLunar() {
    return this.tuviHoroscope.birthLunar;
  }

  override getStudyDate() {
    return this.tuviHoroscope.studyDate;
  }

  // Usage PalaceBranche°BrancheList
  checkPalaceBranche(params: string[]): boolean {
    const checkBranches = this.checkEnumList(params[0], Branche.COCK);
    return checkBranches.indexOf(this.palace.branche.getName()) >= 0;
  }

  //Usage PalaceElement°ElementName
  checkPalaceElement(params: string[]): boolean {
    const checkElementList = this.checkEnumList(params[0], Element.EARTH);
    return checkElementList.indexOf(this.palace.branche.getElement().getName()) >= 0;
  }


  //Usage PalaceEnergy°+/-
  checkPalaceEnergy(params: string[]): boolean {
    const branche =this.palace.branche;
    return (params[0]==='+')==branche.getEnergy().isYang()
  }

  // Usage PalaceTuMo
  checkPalaceTuMo(): boolean {
    return this.isPartOfTuMo;
  }

   // Usage PalaceXKhong°Count
   checkPalaceXKhong(params: string[]): boolean {
    let count = +params[0]
    const tuKhong = TuViStarHelper.TUKHONG
    for (let index = 0; index < tuKhong.length; index++) {
      const star = tuKhong[index];
      if (ObjectHelper.hasItem(this.palace.starSet,star)) {
        count--;
        if ( count<=0 ) return true ;
      }

    }
    return false;
  }


  // Usage PalaceTuSinh
  checkPalaceTuSinh(): boolean {
    return BrancheHelper.isTuSinh(this.palace.branche);
  }

  // Usage PalaceStatus°+-
  // Usage Status°+-
  checkPalaceStatus(palace: TuViPalace, params: string[]): boolean {
    const checkStatus = params[0];
    return palace.isFavorable() === (checkStatus === "+");
  }

  // Usage HanStatus°+-
  checkHanStatus(params: string[]): boolean {
    return this.checkPalaceStatus(this.tuviHoroscope.yDaihan, params);
  }

  // Usage MeetHostileStars
  checkMeetHostileStars(): boolean {
    return this.hasHostileStars() || this.hasCombinedSatTinh;
  }


  // Usage StarGiapCungr°Count,StarList
  checkStarGiapCung(params: string[]): boolean {
    let { count, checkStars } = this.getStarList(params);
    for (let index = 0; index < checkStars.length; index++) {
      const star = checkStars[index];
      if (this.hasPrevNextStar(star)) {
        count--;
        if (count <= 0) return true;
      }
    }
    return false;
  }

  // Usage Star°Number,StarList
  checkStars(params: string[]): boolean {
    let { count, checkStars } = this.getStarList(params)

    const starSet = this.palace.starSet;
    if (count > checkStars.length) {
      count = checkStars.length;
    }
    for (let index = 0; index < starSet.length; index++) {
      const tuViStar = starSet[index];
      if (checkStars.indexOf(tuViStar) >= 0) {
        count--;
        if (count <= 0) return true;
      }
    }
    return false;
  }

  // Usage StarXungChieu°Number,StarList
  checkXungChieuStars(params: string[]): boolean {
    const cungXungChieu = this.getCungXungChieu();
    if (null !== cungXungChieu) {
      return cungXungChieu.palaceObservation.checkStars(params);
    }
    return false;
  }

  // Usage StarXungChieuGrp°Number,StarList
  checkXungChieuStarsGrp(params: string[]): boolean {
    const cungXungChieu = this.getCungXungChieu();
    if (null !== cungXungChieu) {
      const starGrp = TuViStarHelper.toStarGroupList(params[1]);
      return cungXungChieu.palaceObservation.checkStars([params[0], starGrp]);
    }
    return false;
  }
  // Usage StarHoiHop°Number,StarList
  checkHoiHopStars(params: string[]): boolean {
    if (params.length !== 2) {
      console.log(
        "Invalid param ",
        params,
        this.checkMethod,
        this.checkKey,
        this.prevKey
      );
    }
    const count = +params[0];
    const checkStars = TuViStarHelper.findStarGroupName(params[1]);
    return this.hasSupportStars(checkStars, count);
  }

  // Usage StarTamHop°Number,StarList
  checkTamHopStars(params: string[]): boolean {
    let { count, checkStars } = this.getStarList(params);
    if (count > checkStars.length) {
      count = checkStars.length;
    }
    for (let index = 0; index < checkStars.length; index++) {
      const star = checkStars[index];
      if (this.hasRelationPalaceStar(star, BrancheRelation.COMBINATION)) {
        count--;
        if (count <= 0) return true;
      }
    }
    return false;
  }

  // Usage StarAnNguOne°Star
  checkAnNguOneStar(params: string[]): boolean {
    const checkStars = this.checkGetEnumList(
      params[0],
      TuViStar.ANQUANG
    ) as TuViStar[];
    const checkStar = checkStars[0];
    const checkStarName = params[0];
    if (checkStar === TuViStar.TUANKHONG || checkStar === TuViStar.TRIETKHONG) {
      if (this.hasTuanTrietKhong) return true;
    }
    const checkParams = ["1", checkStarName];
    if (this.checkXungChieuStars(checkParams)) return true;
    if (this.checkStars(checkParams)) return true;
    if (this.checkTamHopStars(checkParams)) return true;
    return false;
  }


    // Usage ThanAnNgu
    checkThanAnNgu(): boolean {
      const thanPalace = this.getThanPalace()
      return this.checkPalaceAnNgu(thanPalace)
      return false;
    }

    checkPalaceAnNgu(checkPalace: TuViPalace): boolean {
      if ( checkPalace===this.palace ) return true;
      const cungXungChieu = this.getCungXungChieu();
      if ( checkPalace===cungXungChieu ) return true;
      const cungTamHop=this.palace.getPalaceWithBrancheRelation(BrancheRelation.COMBINATION);
      if ( cungTamHop.indexOf(checkPalace)>=0 ) return true;
      return false;
    }

  // Usage StarsAnNgu°Count,StarList
  checkAnNguStars(params: string[]): boolean {
    let { count, starList } = this.toStarList(params);
    const checkStars = this.checkEnumListSplit(starList, TuViStar.ANQUANG);
    if (count > checkStars.length) {
      count = checkStars.length;
    }
    for (let index = 0; index < checkStars.length; index++) {
      const checkStar = checkStars[index];
      if (this.checkAnNguOneStar([checkStar])) {
        count--;
        if (count <= 0) return true;
      }
    }
    return false;
  }


  // Usage TuanTriet
  checkTuanTriet(): boolean {
    return (
      this.checkAnNguOneStar(["TUANKHONG"]) ||
      this.checkAnNguOneStar(["TRIETKHONG"])
    );
  }

  // Usage StarNhiHop°Number,StarList
  checkNhiHopStars(params: string[]): boolean {
    let { count, checkStars } = this.getStarList(params);
    if (count > checkStars.length) {
      count = checkStars.length;
    }
    for (let index = 0; index < checkStars.length; index++) {
      const star = checkStars[index];
      if (this.hasSupportStarWithTransform(star)) {
        count--;
        if (count <= 0) return true;
      }
    }
    return false;
  }

  // Usage StarHopSinh°Number,StarList
  // Usage StarHopKhac°Number,StarList
  checkHopSinhKhacStars(
    params: string[],
    checkCompatibleElement: boolean
  ): boolean {
    let { count, checkStars } = this.getStarList(params);
    const tuviStarMap = this.tuviHoroscope.tuviPalaceStarMap;
    const palaceBranche = this.palace.branche;
    const palaceBrancheElement = palaceBranche.getElement();
    if (count > checkStars.length) {
      count = checkStars.length;
    }
    for (let index = 0; index < checkStars.length; index++) {
      const star = checkStars[index];
      const checkBranche = tuviStarMap.getStarBranche(star);
      if (
        BrancheRelation.isRelationPresent(
          this.palace.branche,
          checkBranche,
          BrancheRelation.TRANSFORMPLUS
        )
      ) {
        if (
          checkCompatibleElement ===
          palaceBrancheElement.isFavorable(checkBranche.getElement())
        ) {
          count--;
          if (count <= 0) return true;
        }
      }
    }
    return false;
  }

  toStarList(params: string[]) {
    let count = 1;
    let starList = params[0];
    if (params.length >= 2) {
      count = +params[0];
      starList = params[1];
    }
    return { count, starList };
  }

  getStarList(params: string[]) {
    let { count, starList } = this.toStarList(params);
    let checkStars: TuViStar[] = []
    if ( starList.indexOf("/")===-1 ) {
      // MayBe a predefined group
      checkStars = TuViStarHelper.findStarGroupName(starList);

    } else {
      checkStars = this.checkGetEnumList(
        starList,
        TuViStar.ANQUANG
      ) as TuViStar[];
    }

    if (count > checkStars.length) count = checkStars.length;
    return { count, checkStars };
  }

  // Usage StarHamDia°Count,StarList
  // Do not check Star in Palace star list if count < 0
  // ....
  checkStarsStatus(params: string[], status: number, checkFunc: any): boolean {
    let { count, checkStars } = this.getStarList(params);
    let starSet = this.palace.starSet;
    if (count < 0) {
      count = -count;
      starSet = checkStars;
    }
    if (count > checkStars.length) {
      count = checkStars.length;
    }
    for (let index = 0; index < checkStars.length; index++) {
      const star = checkStars[index];
      if (
        ObjectHelper.hasItem(starSet, star) &&
        checkFunc(star.diaStatus, status)
      ) {
        count--;
        if (count <= 0) return true;
      }
    }
    return false;
  }

  // Usage StarDiaStatus°Count,StarList,DiaStatusNameList
  checkStarsDiaStatus(params: string[], checkFunc: any): boolean {
    const diaStatusList = params[2].split("/");
    for (let index = 0; index < diaStatusList.length; index++) {
      const diaStatus = TuViStar.getDiaStatusByName(diaStatusList[index]);
      if (this.checkStarsStatus(params, diaStatus, checkFunc)) return true;
    }
    return false;
  }

  // Usage StarGEDacDia°count,StarList
  checkDiaStatus(params: string[], diaStatus: number, checkFunc: any): boolean {
    return this.checkStarsStatus(params, diaStatus, checkFunc);
  }

  checkEqual(param1: number, param2: number) {
    return param1 === param2;
  }

  checkGT(param1: number, param2: number) {
    return param1 > param2;
  }

  checkLT(param1: number, param2: number) {
    return param1 < param2;
  }

  checkGE(param1: number, param2: number) {
    return param1 >= param2;
  }

  checkLE(param1: number, param2: number) {
    return param1 <= param2;
  }

  // usage Genre°(f,m)(+,-))
  checkGenreWEnergy(params: string[]) {
    const param0 = params[0];
    let res = this.checkGenreOnly(params);
    if (!res) return res;
    if (param0.length === 1) return res;
    const brancheEnergy = this.getLunar().getyBranche().getEnergy();
    return brancheEnergy.isYin() && param0[1] === "-";
  }

  // Usage StarForce°(+,-),StarList
  override checkStarForce(params: string[]) {
    const checkFavorable = params[0] == "+";
    const starList = this.checkGetEnumList(
      params[1],
      TuViStar.ANQUANG
    ) as TuViStar[];
    for (let index = 0; index < starList.length; index++) {
      const star = starList[index];
      if (checkFavorable != star.isFavorable()) {
        return false;
      }
    }
    return true;
  }

  checkStarForceCountBase(
    checkFavorable: boolean,
    count: number,
    starList: TuViStar[]
  ) {
    const starSet = this.palace.starSet;
    for (let index = 0; index < starList.length; index++) {
      const star = starList[index];
      if (
        ObjectHelper.hasItem(starSet, star) &&
        checkFavorable == star.isFavorable()
      ) {
        count--;
        if (count <= 0) return true;
      }
    }
    return false;
  }

  // Usage StarForceCount°(+,-),Count,StarList
  override checkStarForceCount(params: string[]) {
    const checkFavorable = params[0] == "+";
    let count = +params[1];
    const starList = TuViStarHelper.findStarGroupName(params[2]);
    return this.checkStarForceCountBase(checkFavorable, count, starList);
  }

  // Usage StarBranche°Star,BrancheList
  checkStarBranches(params: string[]): boolean {
    const checkStars = this.checkGetEnumList(
      params[0],
      TuViStar.ANQUANG
    ) as TuViStar[];
    const checkBranches = this.checkGetEnumList(
      params[1],
      Branche.COCK
    ) as Branche[];
    const checkStar = checkStars[0];
    const tuviStarMap = this.tuviHoroscope.tuviPalaceStarMap;
    const checkStarBranche = tuviStarMap.getStarBranche(checkStar);
    for (let index = 0; index < checkBranches.length; index++) {
      const checkBranche = checkBranches[index];
      if (checkStarBranche === checkBranche) return true;
    }
    return false;
  }

  // Usage StarPrincipalCount°CheckNumber
  // If CheckNumber<=0 then checkLE abs(CheckNumber)
  // If CheckNumber>0 then checkGE
  // chinhTinhCount
  checkPrincipalStarCount(params: string[]): boolean {
    const fromCount = +params[0];
    const chinhTinhCount = this.goodStarsCount;
    if (fromCount > 0) {
      return chinhTinhCount >= fromCount;
    } else {
      return chinhTinhCount <= -fromCount;
    }
  }

    // Usage StarHostileCount°CheckNumber
  // If CheckNumber<=0 then checkLE abs(CheckNumber)
  // If CheckNumber>0 then checkGE
  // chinhTinhCount
  checkStarHostileCount(params: string[]): boolean {
    let fromCount=1
    if ( params.length===1 ) fromCount = +params[0];
    const hostileStarsCount = this.goodStarsCount;
    if (fromCount > 0) {
      return hostileStarsCount >= fromCount;
    } else {
      return hostileStarsCount <= -fromCount;
    }
  }

     // Usage StarGoodCount°CheckNumber
  // If CheckNumber<=0 then checkLE abs(CheckNumber)
  // If CheckNumber>0 then checkGE
  // chinhTinhCount
  checkStarGoodCount(params: string[]): boolean {
    let fromCount=1
    if ( params.length===1 ) fromCount = +params[0];
    const goodStarsCount = this.goodStarsCount;
    if (fromCount > 0) {
      return goodStarsCount >= fromCount;
    } else {
      return goodStarsCount <= -fromCount;
    }
  }

  // Usage HourKimSa°Type
  checkHourKimSa(params: string[]): boolean {
    const type = +params[0];
    const iRes = DateHelper.kimSaHourType(this.getLunar(), this.isMan());
    return iRes == type;
  }

  // Usage HourQuanSat
  checkHourQuanSat(): boolean {
    return DateHelper.isQuanSatHour(this.getLunar());
  }

  // Usage HourTuongQuan
  checkHourTuongQuan(): boolean {
    return DateHelper.isTuongQuanHour(this.getLunar());
  }

  // Usage HourDiemVuong
  checkHourDiemVuong(): boolean {
    return DateHelper.isDiemVuongHour(this.getLunar());
  }
  // Usage HourSeasonCompatible
  checkHourSeasonCompatible(): boolean {
    return DateHelper.isHourSeasonCompatible(this.getLunar());
  }

  checkPalaceFavorable() {
    return this.hasManyGoodSupportStars();
  }

  checkMenhFavorable() {
    const tuviMenhObservation = this.getObservations(TuViRing.Menh);
    return tuviMenhObservation.hasManyGoodSupportStars();
  }

  checkThanFavorable() {
    const tuviThanObservation = this.getThanObservations();
    return tuviThanObservation.hasManyGoodSupportStars();
  }

  checkMenhStarForceCount(params: string[]) {
    const tuviMenhObservation = this.getObservations(TuViRing.Menh);
    if (tuviMenhObservation != null) {
      return tuviMenhObservation.checkStarForceCount(params);
    }
    return false;
  }

  checkThanStarForceCount(params: string[]) {
    const tuviThanObservation = this.getThanObservations();
    if (tuviThanObservation != null) {
      return tuviThanObservation.checkStarForceCount(params);
    }
    return false;
  }

  checkSatTinhForceCount(params: string[]) {
    const checkFavorable = params[0] == "+";
    let count = +params[1];
    return this.checkStarForceCountBase(
      checkFavorable,
      count,
      this.palace.satTinhStars
    );
  }

  checkMenh(params: string[]) {
    const tuviMenhObservation = this.getObservations(TuViRing.Menh);
    return tuviMenhObservation.processFuncSuite(params.toString(),"§","$",false);
  }

  checkIsMenh() {
    const tuviMenhObservation = this.getObservations(TuViRing.Menh);
    return tuviMenhObservation.palace===this.palace
  }

  checkThan(params: string[]) {
    const tuviThanObservation = this.getThanObservations();
    return tuviThanObservation.processFuncSuite(params.toString(),"§","$",false);
  }

  checkHan(params: string[]) {
    const daiHan = this.tuviHoroscope.daihan;
    if ( daiHan===null ) return false ;
    if (  daiHan.palaceObservation===null ) return false ;
    return daiHan.palaceObservation.processFuncSuite(params.toString(),"§","$",false);
  }

  checkIsCuoiHan() {
    const daiHan = this.tuviHoroscope.daihan as TuViPalace;
    if ( daiHan===null ) return false ;
    if (  daiHan.palaceObservation===null ) return false ;
    return daiHan.cuoiHan
  }
  checkIsDaiHan() {
    const daiHan = this.tuviHoroscope.daihan;
    if ( daiHan===null ) return false ;
    if (  daiHan.palaceObservation===null ) return false ;
    return daiHan===this.palace;
  }

  checkIsTieuHan() {
    const yDaihan = this.tuviHoroscope.yDaihan;
    if ( yDaihan===null ) return false ;
    if (  yDaihan.palaceObservation===null ) return false ;
    return yDaihan===this.palace;
  }

  // Check if the pilar branche name is among the branche List
  // Usage: Branche°Period/Year/Y/M/D/H,BranceList
  //
  checkTuViBranche(params: string[]): boolean {
    const hanLunar = this.palace.hanLunar;
    if ( hanLunar===null ) {
      console.log("HanDate not init ");
      return false ;
    }
    if (params.length !== 2) return false;
    const pilarName = params[0];
    const brancheList = this.checkEnumList(params[1],Branche.RAT)
    const pilar = hanLunar.getPilarByName(pilarName)
    const brancheName = pilar.branche.getName();

    return brancheList.indexOf(brancheName) >= 0;
  }


  override isAttrPresent(attrKey: string, params: string[]): boolean {
    switch (attrKey) {
      case "Menh":
        return this.checkMenh(params);
        case "IsMenh":
          return this.checkIsMenh();
       case "Than":
        return this.checkThan(params);
        case "Han":
          return this.checkHan(params);
          case "IsCuoiHan":
            return this.checkIsCuoiHan();
        case "IsThan":
          return this.palace.isThan;
          case "IsDaiHan":
            return this.checkIsDaiHan();
            case "IsTieuHan":
              return this.checkIsTieuHan();
        case "ThanAnNgu":
          return this.checkThanAnNgu();
          case "PalaceAnNgu":
            return this.checkPalaceAnNgu(this.palace);
      case "MenhFavorable":
        return this.checkMenhFavorable();
      case "ThanFavorable":
        return this.checkThanFavorable();
      case "PalaceFavorable":
          return this.checkPalaceFavorable();
      case "PalaceThan":
        return this.palace.isThan;
      case "MenhStarForceCount":
        return this.checkMenhStarForceCount(params);

      case "ThanStarForceCount":
        return this.checkThanStarForceCount(params);

      case "SatTinhForceCount":
        return this.checkSatTinhForceCount(params);
      case "HourKimSa":
        return this.checkHourKimSa(params);
      case "HourQuanSat":
        return this.checkHourQuanSat();
      case "HourTuongQuan":
        return this.checkHourTuongQuan();
      case "HourDiemVuong":
        return this.checkHourDiemVuong();
      case "HourSeasonCompatible":
        return this.checkHourSeasonCompatible();
      case "PalaceBranche":
        return this.checkPalaceBranche(params);
      case "PalaceElement":
          return this.checkPalaceElement(params);
     case "PalaceEnergy":
            return this.checkPalaceEnergy(params);
      case "PalaceTuMo":
        return this.checkPalaceTuMo();
      case "PalaceXKhong":
          return this.checkPalaceXKhong(params);
      case "PalaceTuSinh":
        return this.checkPalaceTuSinh();
      case "Star":
        return this.checkStars(params);
        case "StarMieuDia":
          return this.checkStarsStatus(params, TuViStar.MIEUDIA, this.checkEqual);
      case "StarBinhDia":
          return this.checkStarsStatus(params, TuViStar.BINHDIA, this.checkEqual);
      case "StarHamDia":
        return this.checkStarsStatus(params, TuViStar.HAMDIA, this.checkEqual);
      case "StarDacDia":
        return this.checkStarsStatus(params, TuViStar.DACDIA, this.checkEqual);
      case "StarVuongDia":
        return this.checkStarsStatus(
          params,
          TuViStar.VUONGDIA,
          this.checkEqual
        );
      case "StarMieuDia":
        return this.checkStarsStatus(params, TuViStar.MIEUDIA, this.checkEqual);
      case "StarEQDiaStatus":
        return this.checkStarsDiaStatus(params, this.checkEqual);
      case "StarGEDacDia":
        if (params.length==1 ) {
          params.unshift("1")
        }
        return this.checkDiaStatus(
          params,
          TuViStar.DACDIA,
          this.checkGE
        );
      case "StarGEVuongDia":
        if (params.length==1 ) {
          params.unshift("1")
        }
        return this.checkDiaStatus(
          params,
          TuViStar.VUONGDIA,
          this.checkGE
        );
     case "StarAnNgu":
        return this.checkAnNguStars(params);
      case "StarAnNgu":
        return this.checkAnNguStars(params);
      case "StarAnNguOne":
        return this.checkAnNguOneStar([params[0]]);

      case "StarTamHop":
        return this.checkTamHopStars(params);
      case "StarHoiChieu":
        return (
          this.checkTamHopStars(params) || this.checkXungChieuStars(params)
        );
      case "StarHoiHop":
        return this.checkHoiHopStars(params);
      case "StarNhiHop":
        return this.checkNhiHopStars(params);
      case "StarHopKhac":
        return this.checkHopSinhKhacStars(params, false);
      case "StarHopSinh":
        return this.checkHopSinhKhacStars(params, true);
      case "StarXungChieuGrp":
        return this.checkXungChieuStarsGrp(params);

      case "StarToaChieu":
        return this.checkStars(params) || this.checkXungChieuStars(params);
      case "StarXungChieu":
        return this.checkXungChieuStars(params);
      case "MeetHostileStars":
        return this.checkMeetHostileStars();
      case "StarHostileCount":
        return this.checkStarHostileCount(params);
      case "MeetGoodStars":
        return this.hasManyGoodSupportStars();
      case "StarGiapCung":
        return this.checkStarGiapCung(params);
      case "PalaceStatus":
        return this.checkPalaceStatus(this.palace, params);
      case "HanStatus":
        return this.checkHanStatus(params);
      case "TuanTriet":
        return this.checkTuanTriet();
      case "Genre":
        return this.checkGenreWEnergy(params);

      case "StarGoodCount":
        return this.checkStarGoodCount(params);
      case "StarBranche":
        return this.checkStarBranches(params);
      case "StarPrincipalCount": // VoChinhDieu == StarPrincipalCount°0
        return this.checkPrincipalStarCount(params);
      case "VoChinhDieu":
        return this.checkPrincipalStarCount(["0"]);
      case "TuViBranche":
        return this.checkTuViBranche(params);
      default:
        return super.isAttrPresent(attrKey, params);
    }
    return false;
  }

  abstract getHeaderSuffix(): string;

  getTuViDestinHeader(): string {
    return "TuVi." + this.getHeaderSuffix();
  }

  getTuViPeriodHeader(): string {
    return "TuViPeriod." + this.getHeaderSuffix();
  }

  getTuViPeriodXHeader(): string {
    return "TuViPeriod.X"
  }

  getTuViPeriodYearXHeader(): string {
    return "TuViPY.X"
  }

  getTuViYearHeader(): string {
    return "TuViYear." + this.getHeaderSuffix();
  }

  getTuViYearXHeader(): string {
    return "TuViYear.X" ;
  }

  override filterObservation(header: string, genPeriodOrYear: boolean) {
    this.filterOnHeader(header);
  }

  override comment() {
    super.comment();
    this.commentOnThan();
    if (this.palace.isThan) {
      this.filterObservation("TuVi.Than", false);
    }
    this.filterObservation(this.getTuViDestinHeader(), false);
  }
}
