import { ObjectHelper } from '../helper/objectHelper';
import { PropertyHelper } from '../helper/PropertyHelper';
import { QiHelper } from '../helper/qiHelper';
import { Bazi } from '../mt-data/bazi/bazi';
import { Lunar } from '../mt-data/bazi/lunar';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { QiTypeDataRec } from '../mt-data/qi/qi-type-data-rec';


export abstract class HoroscopeContributor {

    birthDate: MyCalendar;
    birthYear: number;
    studyDate: MyCalendar;
    isMan: boolean;
    baseQiTypeData: QiTypeDataRec[];


    constructor(
        birthDate: MyCalendar,
        studyDate: MyCalendar,
        isMan: boolean
    ){
        this.birthDate=birthDate;
        this.birthYear = birthDate.getYear();

        this.studyDate=studyDate;
        this.isMan=isMan;

    }

    getBaseQiType(basePeriodIdx: number) {
      for (let index = basePeriodIdx; index >= 0; index--) {
          const element = this.baseQiTypeData[index];
          if (!ObjectHelper.isNaN(element)) {
              return element;
          }
      }
      return null;
  }

  initBaseQiType(lunar: Lunar) {
    this.baseQiTypeData = [];
    this.baseQiTypeData.push(QiHelper.getLunarQiForce(lunar));
  }

    abstract init(currAge: number): void ;

    abstract genBirthTheme(currAge: number): void;

    abstract genYearTheme(currAge: number): void;

    abstract genMonthTheme(currAge: number): void;

    abstract genDayTheme(currAge: number): void;

    abstract finalizeSession(currAge: number): void;
}
