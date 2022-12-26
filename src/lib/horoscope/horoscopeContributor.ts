import { PropertyHelper } from '../helper/PropertyHelper';
import { MyCalendar } from '../mt-data/date/mycalendar';


export abstract class HoroscopeContributor {

    birthDate: MyCalendar;
    birthYear: number;
    studyDate: MyCalendar;
    isMan: boolean;

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




    abstract init(currAge: number): void ;

    abstract genBirthTheme(currAge: number): void;

    abstract genYearTheme(currAge: number): void;

    abstract genMonthTheme(currAge: number): void;

    abstract genDayTheme(currAge: number): void;

    abstract finalizeSession(currAge: number): void;
}
