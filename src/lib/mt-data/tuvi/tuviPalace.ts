/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectHelper } from '../../helper/objectHelper';
import { TuViStarHelper } from '../../helper/tuviStarHelper';
import { Branche } from '../bazi/branche';
import { TuViRing } from './tuviRing';
import { TuViStar } from './tuviStar';
import { Element } from '../../mt-data/feng-shui/element';
import { Lunar } from '../bazi/lunar';
import { BrancheRelation } from '../bazi/brancheRelation';
import { Omen } from '../feng-shui/omen';
import { TuViPalaceObservationBase } from './tuviPalaceObservationBase';
import { BaziHelper } from '../../helper/baziHelper';
import { BrancheHelper } from '../../helper/brancheHelper';
import { StringHelper } from '../../helper/stringHelper';

export class TuViPalace {

  static DAIHAN = 1;
  static DAIHANNAM = 2;
  static TIEUHAN = 3;
  static NGUYETHAN = 4;
  static NHATHAN = 5;
  static HOURHAN = 6;
  static NOHAN = 0;

  static AVAILSTARNBCOUNT = 2;
  static GOODNOTESREFERENCE = 60.0;
  static BADNOTESREFERENCE = 50.0;
  static trungTinhWeigth = 1;
  static bangTinhWeigth = 1.5;
  static ChinhTinhIdx = 0;
  static TrungTinhIdx = 1;
  static OtherTinhIdx = 2;
  static goodStarIdx = 0;
  static badStarIdx = 1;

  branche: Branche= null;
  prev: TuViPalace= null;
  ringType?: TuViRing= null;
  isThan?: boolean = false;
  han?: number= null;

  palaceObservation: TuViPalaceObservationBase= null;

  bigPeriodFromYear?: number= null;
  bigPeriodToYear?: number= null;
  starSet: TuViStar[]= null;
  baiTinhCount: number= null;
  satTinhCount: number= null;
  chinhTinhCount: number= null;
  secondaryPeriodBranche?: Branche= null;

  bigPeriodOnBirthYearOmen: Omen= null;
  bigPeriodOnBirthElementOmen: Omen= null;

  maxPoints: number= null;
  points: number= null;
  goodBadChinhTinhBalanceForce: number= null;
  goodActiveChinhTinhCount: number= null;
  badActiveChinhTinhCount: number= null;
  hasBadDeactivateStar: boolean= null;
  goodBadStarByRangeTinhCount: number[][]= null;
  goodBadStarByRangeTinhForce: number[][]= null;
  chinhTinhElementCompatibleCount: number= null;
  chinhTinhElementIncompatibleCount: number= null;
  trungTinhElementCompatibleCount: number= null;
  trungTinhElementIncompatibleCount: number;
  chinhTinhElementNTuviElementCompatibleCount: number= null;
  chinhTinhElementNTuviElementInCompatibleCount: number= null;
  trungTinhElementNTuviElementCompatibleCount: number= null;
  trungTinhElementNTuviElementInCompatibleCount: number= null;
  bangTinhForce: number= null;
  generalNote: number= null;
  periodAddPoints: number= null;
  periodMaxPoints: number= null;
  chinhTinhForce: number= null;
  trungTinhForce: number= null;


  constructor(branche: Branche, prev: TuViPalace) {
    this.branche = branche;
    this.prev = prev;
    this.starSet = [];
    this.baiTinhCount = 0;
    this.satTinhCount = 0;
    this.chinhTinhCount = 0;
    this.han=TuViPalace.NOHAN;
  }

  getName() {
    let res = 'Palace ' ;
    res += 'Branche '+ this.branche.getName() + ' . Ring type '+ this.ringType + StringHelper.NL;
    res += ' Notes: Palace ' + this.getNote() + ' Observations '+ this.palaceObservation.getNote() +StringHelper.NL;
    res += 'Stars '+ this.starSet + StringHelper.NL;
    res += 'ActiveChinhtinh Stars Count: Good '+
    this.goodActiveChinhTinhCount + ' Bad ' +
    this.badActiveChinhTinhCount+
    StringHelper.NL;
    res += 'Star count: Main '+ this.chinhTinhCount+
    ' Middle '+this.baiTinhCount+ ' Sat '+ this.satTinhCount + StringHelper.NL;
    res += 'Star force: Main '+
    this.chinhTinhForce + ' Middle ' +
    this.trungTinhForce+ ' Bad ' +
    this.bangTinhForce+
    ' Balance force: ' + this.goodBadChinhTinhBalanceForce
    StringHelper.NL;
    return res ;

  }

  getNextPalace(count: number): TuViPalace {
    let res: TuViPalace = this;
    while (count < 0) {count = count + 12;}
    count = 12 - count;
    for (let i = 0; i < count; i++) {
      res = res.prev;
    }
    return res;
  }

  addStar(star: TuViStar) {
    if (this.containsStar(star)) {return;}
    this.starSet.push(star);
    if (star.isBaiTinh()) {this.baiTinhCount++;}
    if (star.isSatTinh()) {this.satTinhCount++;}
    if (star.isChinhTinh()) {this.chinhTinhCount++;}
  }

  containsStar(star: TuViStar) {
    return ObjectHelper.hasItem(this.starSet, star);
  }

  hasStar(starArr: TuViStar[]) {
    return this.hasStars(starArr, 1);
  }

  hasStars(starArr: TuViStar[], minCount: number) {
    let count = minCount;
    for (let index = 0; index < starArr.length; index++) {
      const tuViStar = starArr[index];
      if (this.containsStar(tuViStar)) {
        count--;
        if (count=== 0) {return true;}
      }
    }
    return false;
  }

  hasStarWithStatus(star: TuViStar, status: number) {
    return this.hasStar([star]) && star.diaStatus > status;
  }

  countStarWithStatus(starArr: TuViStar[], status: number) {
    let count = 0;
    starArr.forEach((tuViStar) => {
      if (this.hasStarWithStatus(tuViStar, status)) {
        count++;
      }
    });
    return count;
  }

  hasStarWithStatusArr(starArr: TuViStar[], status: number, minCount: number) {
    return this.countStarWithStatus(starArr, status) >= minCount;
  }

  hasStarWithForceStatus(star: TuViStar, status: boolean) {
    return this.hasStar([star]) && star.force > 0=== status;
  }

  countStarWithForceStatus(starArr: TuViStar[], status: boolean) {
    let count = 0;
    starArr.forEach((tuViStar) => {
      if (this.hasStarWithForceStatus(tuViStar, status)) {
        count++;
      }
    });
    return count;
  }

  hasStarWithForceStatusArr(
    starArr: TuViStar[],
    status: boolean,
    minCount: number
  ) {
    return this.countStarWithForceStatus(starArr, status) >= minCount;
  }

  hasOppositePalaceStarB(star: TuViStar, forceStatus: boolean) {
    return (
      this.getOppositePalace().containsStar(star) &&
      star.force > 0=== forceStatus
    );
  }

  hasOppositeStar(starArr: TuViStar[], forceStatus: boolean) {
    for (let index = 0; index < starArr.length; index++) {
      const tuViStar = starArr[index];
      if (this.hasOppositePalaceStarB(tuViStar, forceStatus)) {return true;}
    }
    return false;
  }

  hasGoodDiaStar(star: TuViStar) {
    return this.containsStar(star) && star.diaStatus > TuViStar.HAMDIA;
  }

  hasGoodDiaStars(starSetArr: TuViStar[], goal: number) {
    let count = goal;
    for (let index = 0; index < starSetArr.length; index++) {
      const tuViStar = starSetArr[index];
      if (this.hasGoodDiaStar(tuViStar)) {
        count--;
        if (count=== 0) {return true;}
      }
    }
    return false;
  }

  hasPrevStar(star: TuViStar) {
    return this.prev.containsStar(star);
  }

  hasNextStar(star: TuViStar) {
    return this.getNextPalace(1).containsStar(star);
  }

  hasPrevNextStar1(star: TuViStar) {
    return this.hasPrevStar(star) || this.hasNextStar(star);
  }

  hasPrevNextStar2(star: TuViStar, forceStatus: boolean) {
    return this.hasPrevNextStar1(star) && star.force > 0=== forceStatus;
  }

  hasPrevNextStarArr(checkstarArr: TuViStar[], forceStatus: boolean) {
    for (let index = 0; index < checkstarArr.length; index++) {
      const tuViStar = checkstarArr[index];
      if (this.hasPrevNextStar2(tuViStar, forceStatus)) {return true;}
    }
    return false;
  }

  hasPrevNextStarArr2(checkstarArr: TuViStar[], minCount: number) {
    let count = 0;
    for (let index = 0; index < checkstarArr.length; index++) {
      const tuViStar = checkstarArr[index];
      if (this.hasPrevNextStar1(tuViStar)) {
        count++;
        if (count >= minCount) {return true;}
      }
    }
    return count=== this.starSet.length;
  }

  hasAllStars(checkstarArr: TuViStar[]) {
    for (let index = 0; index < checkstarArr.length; index++) {
      const tuViStar = checkstarArr[index];
      if (!this.hasStar([tuViStar])) {
        return false;
      }
    }
    return true;
  }

  hasSomeStars(starArr: TuViStar[], count: number) {
    for (let index = 0; index < starArr.length; index++) {
      const tuViStar = starArr[index];
      if (this.containsStar(tuViStar)) {
        count--;
        if (count=== 0) {return true;}
      }
    }
    return false;
  }

  hasSomeStar(starArr: TuViStar[]) {
    let count = starArr.length / 2 + 1;
    return this.hasSomeStars(starArr,count);
  }

  countStar(starArr: TuViStar[]) {
    let count = 0;
    starArr.forEach((tuViStar) => {
      if (this.containsStar(tuViStar)) {count++;}
    });
    return count;
  }

  hasOppositePalaceStarArr(starArr: TuViStar[], minCount: number) {
    return this.getOppositePalace().countStar(starArr) >= minCount;
  }

  getOppositePalace() {
    const oppositeBranche = this.branche.getEnumNextNElement(6);
    return this.getPalaceWithBranche(oppositeBranche);
  }

  hasRelationPalaceStar(star: TuViStar, relation: BrancheRelation) {
    const favorableCombinedPalaces =
      this.getPalaceWithBrancheRelation(relation);
    for (let index = 0; index < favorableCombinedPalaces.length; index++) {
      const tuViPalace = favorableCombinedPalaces[index];
      if (tuViPalace.containsStar(star)) {return true;}
    }
    return false;
  }

  hasRelationGoodSupportPalaceStar(relation: BrancheRelation) {
    const favorableCombinedPalaces =
      this.getPalaceWithBrancheRelation(relation);
    for (let index = 0; index < favorableCombinedPalaces.length; index++) {
      const tuViPalace = favorableCombinedPalaces[index];
      if (tuViPalace.palaceObservation.hasManyGoodStars) {return true;}
    }
    return false;
  }

  hasRelationBadSupportPalaceStar(relation: BrancheRelation) {
    const favorableCombinedPalaces =
      this.getPalaceWithBrancheRelation(relation);
    for (let index = 0; index < favorableCombinedPalaces.length; index++) {
      const tuViPalace = favorableCombinedPalaces[index];
      if (tuViPalace.palaceObservation.hasManyBadStars) {return true;}
    }
    return false;
  }

  // Same as hasRelationPalaceStar(star,BrancheRelation.CLASH)
  hasOppositePalaceStar(star: TuViStar) {
    return this.getOppositePalace().containsStar(star);
  }

  hasSupportStarWithTransform(star: TuViStar) {
    let relation = null;
    if (this.hasRelationPalaceStar(star, BrancheRelation.TRANSFORMPLUS)) {
      relation = BrancheRelation.TRANSFORMPLUS;
    } else {
      if (this.hasRelationPalaceStar(star, BrancheRelation.TRANSFORMRESTRICT)) {
        relation = BrancheRelation.TRANSFORMRESTRICT;
      }
    }
    return relation != null;
  }

  // See Ref17p3 + Ref17p41
  hasSupportStar(star: TuViStar) {
    if (this.hasStar([star])) {
      return true;
    }
    if (this.hasOppositePalaceStar(star)) {
      return true;
    }
    if (this.hasRelationPalaceStar(star, BrancheRelation.CLASH)) {
      return true;
    }
    if (this.hasRelationPalaceStar(star, BrancheRelation.COMBINATION)) {
      return true;
    }
    return this.hasSupportStarWithTransform(star);
  }

  hasSupportStars(starArr: TuViStar[], minCount: number) {
    let count = minCount;
    if (count > starArr.length) {count = starArr.length;}
    for (let index = 0; index < starArr.length; index++) {
      const tuViStar = starArr[index];
      if (this.hasSupportStar(tuViStar)) {
        count--;
        if (count <= 0) {return true;}
      }
    }
    return false;
  }

  hasNoChinhTinh() {
    return (
      this.goodActiveChinhTinhCount=== 0 && this.badActiveChinhTinhCount=== 0
    );
  }

  hasPrevNextStar(star: TuViStar) {
    return this.hasPrevStar(star) || this.hasNextStar(star);
  }

  hasPrevNextStars(starArr: TuViStar[], minCount: number) {
    let count = 0;
    for (let index = 0; index < starArr.length; index++) {
      const tuViStar = starArr[index];
      if (this.hasPrevNextStar(tuViStar)) {
        count++;
        if (count >= minCount) {return true;}
      }
    }
    return count >= starArr.length;
  }

  hasDirectSupportStar(star: TuViStar) {
    if (this.hasStar([star])) {return true;}
    return this.hasOppositePalaceStar(star);
  }

  hasHoaLinhStar() {
    return this.hasStars([TuViStar.HOATINH, TuViStar.LINHTINH], 1);
  }

  hasSupportStars0(starArr: TuViStar[]) {
    return this.hasSupportStars(starArr, TuViPalace.AVAILSTARNBCOUNT);
  }

  hasSupportStars2(star1: TuViStar, star2: TuViStar) {
    return this.hasSupportStar(star1) && this.hasSupportStar(star2);
  }

  isGoodStarFavorable() {
    return (
      this.goodActiveChinhTinhCount > this.badActiveChinhTinhCount &&
      this.goodBadChinhTinhBalanceForce >= 0 &&
      this.getNote() > TuViPalace.BADNOTESREFERENCE
    );
  }

  // Ref17p40
  // Eval primary star influence force to support receiverElement
  getPrimaryStarElementSupportForce(receiverElement: Element) {
    let res = 0.0;
    const step = 10.0;
    this.starSet.forEach((star) => {
      if (star.isChinhTinh()) {
        const rel = BaziHelper.getRelation(receiverElement,star.getElement());
        const omen = rel.getReceiverOmen();

        if (omen.isFavorable()) {
          res += step;
        } else {
          res -= step;
        }
      }
    });
    return res;
  }

  getNote() {
    if ( this.maxPoints>0 ) {
      return (this.points * 100) / this.maxPoints;
    }
    return 0.0;
  }

  incPoints(incVal: number) {
    if (incVal <= 0) {return;} // Point is from 1 to 10.  Avoid zero or negative points
    this.points += incVal;
    this.maxPoints += 10;
  }

  initTuViRingForce() {
    this.hasBadDeactivateStar = false;
    let badDeactivateStarForce = 0;
    this.starSet.forEach((starNW) => {
      starNW.addOmen(TuViStarHelper.getStarOmenByTuViRingType(starNW,this.ringType));
      const force = starNW.force;
      if (starNW.isChinhTinh()) {
        if (starNW.isFavorable()) {
          this.goodActiveChinhTinhCount++;
        } else {
          this.badActiveChinhTinhCount++;
        }
        this.goodBadChinhTinhBalanceForce += force;
      }
      if (TuViStarHelper.isDeactivateBadStarAbility(starNW)) {
        this.hasBadDeactivateStar = true;
        badDeactivateStarForce += force;
      }
    });
    if (this.hasBadDeactivateStar) {
      this.goodBadChinhTinhBalanceForce += badDeactivateStarForce;
      if (this.goodBadChinhTinhBalanceForce > 0)
        {this.badActiveChinhTinhCount = 0;}
      if (this.goodBadChinhTinhBalanceForce !== 0) {
        // update bad/good star force
        this.starSet.forEach((starNW) => {
          if (!starNW.isFavorable() && !starNW.isTrangSinhRing()) {
            starNW.incForce(this.goodBadChinhTinhBalanceForce);
          }
        });
      }
    }
  }

  updatePalaceCompatibilty() {
    this.starSet.forEach((starNW) => {
      let force = 0;
      if (!starNW.isChinhTinh()) {
        // Less influence if not chinh tinh
        force -= 1;
      } else {
        let omen = Omen.D4;
        if (TuViStarHelper.isHamDia(starNW, this.branche)) {
          omen = Omen.D4;
        } else {
          if (TuViStarHelper.isMieuDia(starNW, this.branche)) {
            omen = Omen.F1;
          } else {
            if (TuViStarHelper.isVuong(starNW, this.branche)) {
              omen = Omen.F2;
            } else {
              if (TuViStarHelper.isDacDia(starNW, this.branche)) {
                omen = Omen.F3;
              } else {
                if (TuViStarHelper.isBinhDia(starNW, this.branche)) {
                  omen = Omen.F4;
                }
              }
            }
          }
        }
        force = omen.getPointBase20();
      }
      starNW.incForce(force);
    });
  }

  getSumSupportStarForce() {
    let res = 0.0;
    let count = 0;
    this.starSet.forEach((starNW) => {
      if (starNW.isTrungTinh()) {
        res += starNW.force;
        count++;
      }
    });
    if (count=== 0) {return 0.0;}
    return res / count;
  }

  updateMainStarTuViRingForce(supportStarForce: number) {
    this.starSet.forEach((starNW) => {
      if (starNW.isChinhTinh()) {
        if (supportStarForce >= 0) {
          starNW.incForce(supportStarForce / 5);
        } else {
          // Negative support force
          if (!starNW.isFavorable()) {
            starNW.incForce(supportStarForce / 2);
          } else {
            starNW.incForce(supportStarForce / 5);
          }
        }
      }
    });
  }

  getSumChinhTinhForce() {
    let res = 0.0;
    this.starSet.forEach((starNW) => {
      if (starNW.isChinhTinh()) {
        res += starNW.force;
      }
    });
    return res;
  }

  updateBangTinhStarForce(mainStarForce: number) {
    if (mainStarForce=== 0) {return;}
    this.starSet.forEach((starNW) => {
      if (starNW.isPhuTinh()) {
        if (TuViStarHelper.isBothStarForceActivatedStar(starNW)) {
          starNW.incForce(mainStarForce);
        } else {
          if (
            this.goodActiveChinhTinhCount > 0 &&
            TuViStarHelper.isOnlyGoodMainStarForceActivatedStar(starNW)
          ) {
            starNW.incForce(mainStarForce);
          } else {
            if (!starNW.isFavorable()) {
              if (
                this.badActiveChinhTinhCount > 0 &&
                TuViStarHelper.isOnlyBadMainStarForceActivatedStar(starNW)
              ) {
                starNW.incForce(mainStarForce);
              } else {
                if (this.hasBadDeactivateStar) {
                  starNW.incForce(mainStarForce);
                }
              }
            }
          }
        }
      }
    });
  }

  evalStarForce() {
    // Pass1 eval force based on
    // +a Compatibility with TuviRing
    //   force =  TuviRing force
    this.initTuViRingForce();

    // +b Compatibility (type M,V,B,H) with Palace
    this.updatePalaceCompatibilty();
    // +c Compatibility with period
    //     - Result to be done
    //
    // Pass2
    // + For Main star:
    //    -Presence positive of support star
    //    if non presence force = force/5
    //    if presence add sum of support star
    const tempTrungTinhForce = this.getSumSupportStarForce();
    this.updateMainStarTuViRingForce(tempTrungTinhForce);

    const tempChinhTinhForce = this.getSumChinhTinhForce();
    this.updateBangTinhStarForce(tempChinhTinhForce);

    // Pass3
    // + Element compatible with other star and Palace
    //
  }

  getZeroStar() {
    return [
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  evalStarStat(tuviElement: Element) {
    this.goodBadStarByRangeTinhCount = this.getZeroStar();
    this.goodBadStarByRangeTinhForce = this.getZeroStar();

    this.chinhTinhElementCompatibleCount = 0;
    this.chinhTinhElementIncompatibleCount = 0;
    this.trungTinhElementCompatibleCount = 0;
    this.trungTinhElementIncompatibleCount = 0;

    this.chinhTinhElementNTuviElementCompatibleCount = 0;
    this.chinhTinhElementNTuviElementInCompatibleCount = 0;
    this.trungTinhElementNTuviElementCompatibleCount = 0;
    this.trungTinhElementNTuviElementInCompatibleCount = 0;

    this.bangTinhForce = 0;
    this.generalNote = 0;
    this.periodAddPoints = 0;
    this.periodMaxPoints = 0;
    this.points = 0;
    this.maxPoints = 0;
    let max = 0.0;
    this.chinhTinhForce = 0.0;
    this.trungTinhForce = 0.0;
    const palaceElement = this.branche.getElement();
    this.starSet.forEach((starNW) => {
      const force = starNW.force;
      let starIdx = TuViPalace.OtherTinhIdx;
      let goodBadIdx;
      const starElement = starNW.getElement();
      if (starNW.isChinhTinh()) {
        starIdx = TuViPalace.ChinhTinhIdx;
        this.chinhTinhForce += force;
        if (BaziHelper.getRelation(palaceElement,starElement).isFavorable()) {
          this.chinhTinhElementCompatibleCount++;
        } else {
          this.chinhTinhElementIncompatibleCount++;
        }
        if (BaziHelper.getRelation(starElement,tuviElement).isFavorable()) {
          this.chinhTinhElementNTuviElementCompatibleCount++;
        } else {
          this.chinhTinhElementNTuviElementInCompatibleCount++;
        }
      } else {
        if (starNW.isTrungTinh()) {
          this.trungTinhForce += force;
          starIdx = TuViPalace.TrungTinhIdx;
          if (BaziHelper.getRelation(palaceElement,starElement).isFavorable()) {
            this.trungTinhElementCompatibleCount++;
          } else {
            this.trungTinhElementIncompatibleCount++;
          }
          if (BaziHelper.getRelation(starElement,tuviElement).isFavorable()) {
            this.trungTinhElementNTuviElementCompatibleCount++;
          } else {
            this.trungTinhElementNTuviElementInCompatibleCount++;
          }
        } else {
          // Update bangTinhForce
          this.bangTinhForce += force;
        }
      }
      if (force >= 0) {
        goodBadIdx = TuViPalace.goodStarIdx;
      } else {
        goodBadIdx = TuViPalace.badStarIdx;
      }
      max += Math.abs(force);
      this.goodBadStarByRangeTinhCount[goodBadIdx][starIdx]++;
      this.goodBadStarByRangeTinhForce[goodBadIdx][starIdx] += Math.abs(force);
    });
    this.generalNote =
      this.chinhTinhForce +
      this.trungTinhForce / TuViPalace.trungTinhWeigth +
      this.bangTinhForce / TuViPalace.bangTinhWeigth;
    this.generalNote = (100 * this.generalNote) / max;
  }

  evalForce(lunar: Lunar, personYiJingElement: Element, tuviElement: Element) {
    const brElement = BrancheRelation.getCombinaisonResultElement(this.branche).getValue();
    const yElement = BrancheRelation.getCombinaisonResultElement(lunar.getyBranche()).getValue();

    // yElement is the receiver omen
    let relation = BaziHelper.getRelation(yElement,brElement);
    this.bigPeriodOnBirthYearOmen = relation.getReceiverOmen();
    //
    relation = BaziHelper.getRelation(personYiJingElement,this.branche.getElement());
    this.bigPeriodOnBirthElementOmen = relation.getReceiverOmen();

    this.evalStarForce();
    // Eval star statistic
    this.evalStarStat(tuviElement);
  }

  getPalaceWithBranche(searchBranche: Branche): TuViPalace {
    let res: TuViPalace = this;
    let count = 0;
    while (res.branche !== searchBranche && count < 13) {
      res = res.prev;
      count++;
    }
    return res;
  }

  getPalaceWithBrancheRelation(relation: BrancheRelation) {
    const resArray: TuViPalace[] = [];
    const branches = Branche.getValues();
    for (let index = 0; index < branches.length; index++) {
      const otherBranche = branches[index];

      const relationArr = BrancheHelper.getBrancheRelation(
        this.branche,
        otherBranche
      );
      for (let i = 0; i < relationArr.length; i++) {
        const brancheRelation = relationArr[i];
        if (brancheRelation=== relation) {
          resArray.push(this.getPalaceWithBranche(otherBranche));
          break;
        }
      }
    }
    return resArray;
  }

  getElement() {
    return this.branche.getElement();
  }

  getEnergy() {
    return this.branche.getEnergy();
  }

  getRingPalace(ringType: TuViRing) {
    let res: TuViPalace = this;
    let count = 0;
    while (res.ringType !== ringType && count < 13) {
      res = res.prev;
      count++;
    }
    return res;
  }

  isMenh() {
    return this.ringType=== TuViRing.Menh;
  }

  isTieuHan() {
    return this.han=== TuViPalace.TIEUHAN;
}

  getThienDiaInfluence() {
    //Update with influence from thien thoi dia thoi
    const thiendiacontrib =
      this.bigPeriodOnBirthYearOmen.getPointBase20() +
      this.bigPeriodOnBirthElementOmen.getPointBase20();
    return thiendiacontrib / 2;
  }

 isPalaceElementSupportingStar() {
    if (this.chinhTinhElementCompatibleCount=== 0 && this.chinhTinhElementIncompatibleCount=== 0) {
        return this.trungTinhElementCompatibleCount > this.trungTinhElementIncompatibleCount;
    } else {
        return this.chinhTinhElementCompatibleCount > this.chinhTinhElementIncompatibleCount;
    }
}

isStarSupportingTuviMenh() {
  if (this.chinhTinhElementNTuviElementCompatibleCount=== 0 && this.chinhTinhElementNTuviElementInCompatibleCount=== 0) {
      return this.trungTinhElementNTuviElementCompatibleCount > this.trungTinhElementNTuviElementInCompatibleCount;
  } else {
      return this.chinhTinhElementNTuviElementCompatibleCount > this.chinhTinhElementNTuviElementInCompatibleCount;
  }
}

    // Ref17 p28
    getTuViStudyDayPalace( monthPalace: TuViPalace, dayS1: number) {
      // dayS0 start with 1 as first day
      return monthPalace.getNextPalace(dayS1 - 1);
  }

}
