
import { Bazi } from "../mt-data/bazi/bazi";
import { Lunar } from "../mt-data/bazi/lunar";
import { MyCalendar } from "../mt-data/date/mycalendar";
import { HoroscopeContributor } from "./horoscopeContributor";

export class BaziHoroscope extends HoroscopeContributor {

    birthLunar: Lunar;
    birthBazi: Bazi;
    studyBazi: Bazi;

    constructor(
        birthDate: MyCalendar,
        studyDate: MyCalendar,
        isMan: boolean
    ) {
        super(birthDate, studyDate, isMan);
        this.studyBazi=new Bazi(this.studyDate, this.isMan);

    }

    init(currAge: number): void {
    }

    genYearTheme(currAge: number): void {
    }

    genMonthTheme(currAge: number) {
    }

    genDayTheme(currAge: number) {
    }

    genBirthTheme(currAge: number): void {
    }

    finalizeSession(currAge: number): void {

    }
}
