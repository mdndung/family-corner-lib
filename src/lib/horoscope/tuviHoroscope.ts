import { BrancheHelper } from '../helper/brancheHelper';
import { TrunkHelper } from '../helper/trunkHelper';
import { TuViHelper } from '../helper/tuviHelper';
import { Lunar } from '../mt-data/bazi/lunar';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { TuViStarMap } from '../mt-data/tuvi/tuviStarMap';
import { HoroscopeContributor } from './horoscopeContributor';
import { Element } from '../mt-data/feng-shui/element';
import { Branche } from '../mt-data/bazi/branche';
import { BrancheRelation } from '../mt-data/bazi/brancheRelation';
import { TuViPalace } from '../mt-data/tuvi/tuviPalace';
import { BaziHelper } from '../helper/baziHelper';
import { TuViRing } from '../mt-data/tuvi/tuviRing';

export class TuViHoroscope extends HoroscopeContributor {
  birthLunar: Lunar;
  studyLunar: Lunar;
  tuviPalaceStarMap: TuViStarMap;
  tuViElement: Element;
  isBirthYearMonthEnergyCompatible: boolean;
  isBirthDayHourEnergyCompatible: boolean;
  isBirthYearMonthElementCompatible: boolean;
  isBirthDayHourElementCompatible: boolean;
  isYearMonthTrunkCombibed: boolean;
  isDayHourTrunkCombibed: boolean;
  isYearDestroyMonthTrunk: boolean;
  isDayDestroyHourTrunk: boolean;
  isTuViNPalaceElementCompatible: boolean;
  isYearNPalaceEnergyCompatible: boolean;
  isYearMonthBrancheCombibed: boolean;
  isYearDestroyMonthBranche: boolean;
  isDayHourBrancheCombibed: boolean;
  isDayDestroyHourBranche: boolean;
  daihan: TuViPalace;
  yDaihan: TuViPalace;
  monthHan: TuViPalace;

  constructor(birthDate: MyCalendar, studyDate: MyCalendar, isMan: boolean) {
    super(birthDate, studyDate, isMan);
    this.birthLunar = new Lunar(birthDate, isMan);
    this.studyLunar = new Lunar(studyDate, isMan);
    this.tuviPalaceStarMap = new TuViStarMap(this.birthLunar);
    this.initBaseQiType(this.birthLunar);
  }


  private getBrancheRelationStatus(relation: BrancheRelation) {
    let res = 0;
    if (relation != null) {
      if (relation.isFavorable()) {
        res = 1;
      } else {
        res = -1;
      }
    }
    return res;
  }

  getTuViMenhPalace() {
    return this.tuviPalaceStarMap.getPalace(0);
  }

  getInfo() {
    let res = this.tuviPalaceStarMap.getInfo() ;
    return res;
  }

  init(currAge: number) {
    const birthDate = this.birthLunar.birthDate;
    const lunarYearTrunk = TrunkHelper.getYearTrunk(birthDate.getChineseYear());
    const lunarYearBranche = BrancheHelper.getYearBranche(
      birthDate.getChineseYear()
    );

    const lunarMonthTrunk = TrunkHelper.getMonthTrunk(
      lunarYearTrunk,
      birthDate.getChineseMonth()
    );
    const lunarMonthBranche = BrancheHelper.getMonthBranche(
      birthDate.getChineseMonth()
    );

    const lunarDayTrunk = TrunkHelper.getDayTrunk(birthDate);
    const lunarDayBranche = BrancheHelper.getDayBranche(birthDate);

    const lunarHourTrunk = TrunkHelper.getHourTrunk(
      lunarDayTrunk,
      birthDate.getHour()
    );
    const lunarHourBranche = BrancheHelper.getHourBranche(birthDate.getHour());

    this.tuViElement = TuViHelper.getTuViElement(
      lunarYearBranche,
      lunarYearTrunk
    );

    const branches = Branche.getValues();
    branches.forEach((branche) => {
      // Palace
      const tuviPalace = this.tuviPalaceStarMap.getBranchePalace(branche);
      tuviPalace.evalForce(
        this.birthLunar,
        this.tuviPalaceStarMap.getcElement(),
        this.tuViElement
      );
      tuviPalace.palaceObservation = TuViHelper.getTuViObservation(
        this,
        tuviPalace
      );
    });

    this.tuviPalaceStarMap.branchePalaces.forEach((palace) => {
      palace.palaceObservation.evalTuanTrietKhong();
    });


    this.isBirthYearMonthEnergyCompatible =
      lunarYearBranche.getEnergy() == lunarMonthBranche.getEnergy();
    this.isBirthDayHourEnergyCompatible =
      lunarDayBranche.getEnergy() == lunarHourBranche.getEnergy();
    this.isBirthYearMonthElementCompatible = BaziHelper.getRelation(lunarYearBranche
      .getElement(),lunarMonthBranche.getElement())
      .isFavorable();
    this.isBirthDayHourElementCompatible = BaziHelper.getRelation(lunarDayBranche
      .getElement(),lunarHourBranche.getElement())
      .isFavorable();
    this.isYearMonthTrunkCombibed = TrunkHelper.isTransformable(
      lunarYearTrunk,
      lunarMonthTrunk
    );
    this.isDayHourTrunkCombibed = TrunkHelper.isTransformable(
      lunarDayTrunk,
      lunarHourTrunk
    );
    this.isYearDestroyMonthTrunk = TrunkHelper.isDestroying(
      lunarYearTrunk,
      lunarMonthTrunk
    );
    this.isDayDestroyHourTrunk = TrunkHelper.isDestroying(
      lunarDayTrunk,
      lunarHourTrunk
    );
    let iTemp = this.getBrancheRelationStatus(
      BrancheHelper.getUniqueRelation(lunarYearBranche, lunarMonthBranche)
    );
    this.isYearMonthBrancheCombibed = iTemp > 0;
    this.isYearDestroyMonthBranche = iTemp < 0;
    iTemp = this.getBrancheRelationStatus(
      BrancheHelper.getUniqueRelation(lunarDayBranche, lunarHourBranche)
    );
    this.isDayHourBrancheCombibed = iTemp > 0;
    this.isDayDestroyHourBranche = iTemp < 0;

    const originElement = this.tuViElement;
    const toElement = this.getTuViMenhPalace().branche.getElement();

    this.isTuViNPalaceElementCompatible = BaziHelper.getRelation(originElement,toElement)
      .isFavorable();
    this.isYearNPalaceEnergyCompatible =
      lunarYearBranche.getEnergy() ==
      this.getTuViMenhPalace().branche.getEnergy();

    // Pass 1: Update with Star influences
    this.tuviPalaceStarMap.initThaiDuongThaiAm();

  }

  genBirthTheme(currAge:number):void {
    const tuViStarMap = this.tuviPalaceStarMap;
        // Comment on menh, Phuc first to allow propagating their influence
        // For example in phuthePalace (tuviPhuTheObservation.updateForce)
        const tuviMenhPalace = tuViStarMap.getRingPalace(TuViRing.Menh);
        tuviMenhPalace.palaceObservation.comment();
        const tuviPhucDucPalace = tuViStarMap.getRingPalace(TuViRing.PhucDuc);
        tuviPhucDucPalace.palaceObservation.comment();
        const tuviThanPalace = tuViStarMap.getBranchePalace(tuViStarMap.tuViThanBranche);
        tuviThanPalace.palaceObservation.comment();
        tuViStarMap.branchePalaces.forEach(palace => {
            // other Palaces
            if ( palace!==tuviMenhPalace &&
              palace!==tuviPhucDucPalace&&
              palace!==tuviThanPalace ) {
                palace.palaceObservation.comment();
              }
        });
        // Adjust/propagate palace note from observation
        tuViStarMap.branchePalaces.forEach(palace => {
              palace.palaceObservation.adjustPalaceNotes();
      });
  }

 isPeriodFavorable(palace: TuViPalace) {
    let res = false;
    res = res || palace.isPalaceElementSupportingStar() && palace.isStarSupportingTuviMenh();
    res = res || palace.isGoodStarFavorable();
    return res;
}

  getPeriodFavorablePoint( palace: TuViPalace) {
    if (this.isPeriodFavorable(palace)) return 10;
    return 1;
}


  initHanPalace(currAge:number) {
    this.daihan = this.tuviPalaceStarMap.getDaiVanPalaceForAge(currAge);
    this.yDaihan = this.tuviPalaceStarMap.getTuViStudyYearBrancheDaiHan(currAge,this.daihan);
  }

   genYearTheme(currAge:number): void {
    this.initHanPalace(currAge);
    const isDaihanEndPeriod = this.daihan.bigPeriodFromYear+5>currAge;
    const isydaiHanEndPeriod = this.studyLunar.birthDate.getChineseMonth()>6;

    const yTieuHan = this.tuviPalaceStarMap.getTuViStudyYearBrancheTieuHan(this.studyLunar.getyBranche(), currAge);

    yTieuHan.palaceObservation.commentTuViElementNTieuHan();
    // Year
    this.daihan.palaceObservation.commentOnYearPeriod(currAge, this.studyLunar,isDaihanEndPeriod);
    this.yDaihan.palaceObservation.commentOnYearPeriod(currAge, this.studyLunar,isydaiHanEndPeriod);
    yTieuHan.palaceObservation.commentOnYearPeriod(currAge, this.studyLunar,isydaiHanEndPeriod);

    const point = this.getPeriodFavorablePoint(this.daihan);
    this.yDaihan.incPoints(point);
    this.monthHan = this.tuviPalaceStarMap.getTuViStudyMonthPalace(
      yTieuHan, this.studyDate.getMonth0(), this.studyLunar.gethTrunk());
   }

   genMonthTheme(currAge:number): void{
    this.monthHan.incPoints(this.getPeriodFavorablePoint(this.yDaihan));
    const isEndPeriod = this.studyDate.getChineseDay()>15;
    this.monthHan.palaceObservation.commentOnStarPeriod(currAge, this.studyLunar,isEndPeriod,false);
   }


   genDayTheme(currAge:number): void{
    const daihan = this.tuviPalaceStarMap.getDaiVanPalaceForAge(currAge);
    const dayHan = this.tuviPalaceStarMap.getTuViStudyDayPalace(this.monthHan, this.studyDate.getDay());
    dayHan.incPoints(this.getPeriodFavorablePoint(this.monthHan));
    dayHan.palaceObservation.commentOnStarPeriod(currAge, this.studyLunar,false,true);
   }

   finalizeSession(currAge: number): void {
     this.tuviPalaceStarMap.branchePalaces.forEach(palace => {
        palace.palaceObservation.convertRawProp2Prop();
      });
  }
}
