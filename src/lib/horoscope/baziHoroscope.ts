
import { Bazi } from "../mt-data/bazi/bazi";
import { BaziObservationBase } from "../mt-data/bazi/baziObservations";
import { Lunar } from "../mt-data/bazi/lunar";
import { MyCalendar } from "../mt-data/date/mycalendar";
import { HoroscopeContributor } from "./horoscopeContributor";

export class BaziHoroscope extends HoroscopeContributor {

    birthLunar: Lunar;
    birthBazi: Bazi;
    studyBazi: Bazi;
    observation: BaziObservationBase;

    constructor(
        birthDate: MyCalendar,
        studyDate: MyCalendar,
        isMan: boolean
    ) {
        super(birthDate, studyDate, isMan);
        this.studyBazi=new Bazi(this.studyDate, this.isMan);
        this.birthLunar = new Lunar(birthDate, isMan);
        this.observation=new BaziObservationBase(this.birthLunar);
        this.initBaseQiType(this.birthLunar);
    }

    init(currAge: number): void {
      console.log(' BaziHoroscope init. Update the baseQiTypeData for the current period depending on currAge ', currAge);
    }

    override initBaseQiType(lunar: Lunar) {
      this.baseQiTypeData = [];
      this.baseQiTypeData.push(lunar.pilarsAttr.qiTypeData);
    }


    genYearTheme(currAge: number): void {
    }

    genMonthTheme(currAge: number) {
    }

    genDayTheme(currAge: number) {
    }

    genBirthTheme(currAge: number): void {
      this.observation.comment();

    }

    finalizeSession(currAge: number): void {
      this.observation.convertRawProp2Prop();
    }
}
