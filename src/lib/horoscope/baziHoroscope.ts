
import { Bazi } from "../mt-data/bazi/bazi";
import { Lunar } from "../mt-data/bazi/lunar";
import { MyCalendar } from "../mt-data/date/mycalendar";
import { HoroscopeContributor } from "./horoscopeContributor";
import { ObsPeriod } from "../observations/obsPeriod";
import { StringHelper } from "../helper/stringHelper";
import { BaziObservation } from "../mt-data/bazi/baziObservations";
import { PropertyHelper } from "../helper/PropertyHelper";

export class BaziHoroscope extends HoroscopeContributor {

    birthLunar: Lunar;
    birthBazi: Bazi;
    studyBazi: Bazi;
    observation: BaziObservation;

    constructor(
        birthDate: MyCalendar,
        studyDate: MyCalendar,
        isMan: boolean
    ) {
        super(birthDate, studyDate, isMan);
        this.studyBazi=new Bazi(this.studyDate, this.isMan);
        this.birthLunar = new Lunar(birthDate, isMan);
        this.birthBazi = new Bazi(birthDate, isMan);
        this.observation=new BaziObservation(this.birthBazi);
        this.initBaseQiType(this.birthLunar);
    }

    init(currAge: number): void {
    }

    override initBaseQiType(lunar: Lunar) {
      this.baseQiTypeData = [];
      this.baseQiTypeData.push(lunar.pilarsAttr.qiTypeData);
    }

    genPeriodTheme(currAge: number,currDate: MyCalendar): void {
      const currAgeBazi=new Bazi(currDate, this.isMan);
      this.observation.commentOnPeriod(currAgeBazi);
    }

    genYearTheme(currAge: number, currDate: MyCalendar): void {
      const currAgeBazi=new Bazi(currDate, this.isMan);
      this.observation.commentOnYear(currAgeBazi);
    }

    genMonthTheme(currAge: number) {
    }

    genDayTheme(currAge: number) {
    }

    genBirthTheme(currAge: number): void {
      this.observation.comment();
    }


  override getPeriodStatus(period: ObsPeriod): string {
    let res = "";
    if ( period===ObsPeriod.YEARTHEME ) {
      if ( null !== this.observation.periodAttr ) {
       res= this.observation.periodAttr.perStatus.getRawDetail()+
       StringHelper.NL+StringHelper.NL+
       this.observation.yearAttr.yearStatus.getRawDetail()+
       StringHelper.NL;
      }
    }
    return res ;
  }

    finalizeSession(currAge: number): void {
      this.observation.convertRawProp2Prop();
    }
}
