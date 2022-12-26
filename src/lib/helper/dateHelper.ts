import { MyCalendar } from '../mt-data/date/mycalendar';
import { Lunar } from '../mt-data/bazi/lunar';

import { CalendarChinese } from 'date-chinese';
import { Bazi } from '../mt-data/bazi/bazi';
import { Temporal } from 'temporal-polyfill';
import { BrancheHelper } from './brancheHelper';
import { Branche } from '../mt-data/bazi/branche';
import { Season } from '../mt-data/bazi/season';

export class DateHelper {


  static reference19850724JIARATDateDiff(myDate: MyCalendar) {
    //console.log("myDate ", myDate.toString());
    const refDate = new MyCalendar(
      1985,
      7,
      24,
      myDate.getHour(),
      myDate.getMinute(),
      myDate.getSecond()
    );
    let index = refDate.diffDate(myDate);
    //console.log("reference19850724JIARATDateDiff 1", index);
    let incDate23h = 0;
    if (myDate.getHour() === 23) {
      if (refDate.afterDate(myDate)) {
        incDate23h = -1;
      } else {
        incDate23h = +1;
      }
    }
    index = (index + incDate23h) % 60;
    if (refDate.afterDate(myDate)) {
      index = 60 - index;
    }
    //console.log("reference19850724JIARATDateDiff 2", index);

    return Math.round(index);
  }

  static getMyCalendarAfterAddDuration(
    myDate: MyCalendar,
    duration: Temporal.Duration
  ) {
    const newDate = myDate.getCopy();
    newDate.add(duration);
    return newDate;
  }

  static getMyCalendarFromDate(date: Date) {
    return new MyCalendar(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
  }

  static getLunarDate(date: Date, isMan: boolean) {
    return new Lunar(DateHelper.getMyCalendarFromDate(date), isMan);
  }

  static getBaziDate(date: Date, isMan: boolean) {
    return new Bazi(DateHelper.getMyCalendarFromDate(date), isMan);
  }

  static getSolarYear(date: MyCalendar) {
    let year = date.getYear();
    const month = date.getMonth();
    const day = date.getDay();

    if (month === 1) {
      year = year - 1;
    } else {
      if (month === 2) {
        if (day <= 4) {
          year = year - 1;
        }
      }
    }
    return year;
  }

  static julianNb(date: MyCalendar) {
    const month = date.getMonth();
    const year = date.getYear();
    const a = Math.trunc((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    const res =
      date.getDay() +
      Math.trunc((153 * m + 2) / 5) +
      365 * y +
      Math.trunc(y / 4) -
      Math.trunc(y / 100) +
      Math.trunc(y / 400) -
      32045;
    return res;
  }

  static julianDate(date: MyCalendar) {
    const res =
      DateHelper.julianNb(date) +
      (date.getHour() - 12) / 24 +
      date.getMinute() / 1440 +
      date.getSecond() / 86400;
    return res;
  }

  static getSolarDegree(date: MyCalendar) {
    const jd = DateHelper.julianDate(date);
    const t = (jd - 2451545.0) / 36525;
    const t2 = t * t;
    const dr = Math.PI / 180;

    // mean longitude, degree
    const l0 = 280.46645 + 36000.76983 * t + 0.0003032 * t2;
    // mean anomaly, degree
    const m = 357.5291 + 35999.0503 * t - 0.0001559 * t2 - 0.00000048 * t2 * t;
    // Sun's equation of center
    let c = (1.9146 - 0.004817 * t - 0.000014 * t2) * Math.sin(dr * m);
    c =
      c +
      (0.01993 - 0.000101 * t) * Math.sin(dr * 2 * m) +
      0.00029 * Math.sin(dr * 3 * m);
    const theta = l0 + c; // true longitude, degree
    // obtain apparent longitude by correcting for nutation and aberration
    const omega = 125.04 - 1934.136 * t;
    let lambda = theta - 0.00569 - 0.00478 * Math.sin(omega * dr);
    // Normalize to (0, 360)
    lambda = lambda - 360 * Math.trunc(lambda / 360);
    return lambda;
  }

  static getSolarTermByIteration(date: MyCalendar) {
    const termMonth=date.getMonth()+1;
    let termDegree= (termMonth-4)*30+15;
    termDegree = (termDegree+360) % 360 ;
    const year = date.getYear();
    const month = date.getMonth();
    const day = date.getDay();
    let iLow = 0;
    let iHigh= 24*3600-1;
    let iMid = 0 ;
    let low = new MyCalendar(year,month,day,iLow,1,0);
    let high =low.getCopy();
    let lowDegree = DateHelper.getSolarDegree(low);
    let highDegree = DateHelper.getSolarDegree(high);
    while ((highDegree-lowDegree>0.0001)&&(iHigh-iLow>1)) {
      iMid = (iHigh+iLow)/2;
		  let mid = low.getCopy();
      mid.add( Temporal.Duration.from({ seconds: iMid }));
		  if (DateHelper.getSolarDegree(mid)<termDegree) {
		    low = mid ;
		    iLow = iMid;
		    lowDegree = DateHelper.getSolarDegree(low);
		 } else {
		    high = mid ;
		    iHigh = iMid;
		    highDegree = DateHelper.getSolarDegree(high);
		  }
    }
    return low;
  }

  static getSolarTerm(date: MyCalendar) {
    const cal = new CalendarChinese();
    const qm = cal.solarTerm(date.getMonth(), date.getYear());
    cal.fromJDE(qm);
    const sDate = cal.toDate();
    return DateHelper.getMyCalendarFromDate(sDate);
  }

  static getMajorSolarTerm(date: MyCalendar) {
    const cal = new CalendarChinese();
    const qm = cal.majorSolarTerm(date.getMonth(), date.getYear());
    cal.fromJDE(qm);
    const sDate = cal.toDate();
    return DateHelper.getMyCalendarFromDate(sDate);
  }

  static getMinorSolarTerm(date: MyCalendar) {
    const cal = new CalendarChinese();
    const qm = cal.minorSolarTerm(date.getMonth(), date.getYear());
    cal.fromJDE(qm);
    const sDate = cal.toDate();
    return DateHelper.getMyCalendarFromDate(sDate);
  }

  static getLunarFirstYearDate(fromDate: MyCalendar) {
    const currDate = fromDate.getCopy();
    let fromYearBranche = currDate.chineseDate.yearFromEpochCycle();

    const fromBranche = BrancheHelper.getYearBranche(fromYearBranche);
    let incTemporal = Temporal.Duration.from({ days: -1 });

    while (fromBranche === BrancheHelper.getYearBranche(fromYearBranche)) {
      currDate.add(incTemporal);
      fromYearBranche = currDate.chineseDate.yearFromEpochCycle();
    }
    incTemporal = Temporal.Duration.from({ hours: 1 });
    while (fromBranche !== BrancheHelper.getYearBranche(fromYearBranche)) {
      currDate.add(incTemporal);
      fromYearBranche = currDate.chineseDate.yearFromEpochCycle();
    }
    return currDate;
  }

  static getPrevSectionalDate(currDate: MyCalendar) {
    let secTerm = DateHelper.getSolarTerm(currDate);
    if (secTerm.afterDate(currDate)) {
      const incTemporal = Temporal.Duration.from({ months: -1 });
      secTerm.add(incTemporal);
      secTerm = DateHelper.getSolarTerm(secTerm);
    }
    return secTerm;
  }

  // Kim Sa born hour
  static kimSaHourType(chineseBirthDate: Lunar, isMan: boolean) {
    const ybranche = chineseBirthDate.getyBranche();
    // Step 1 Start from Dog
    let branche = Branche.DOG.getEnumNextNElement(ybranche.ordinal());
    const month = chineseBirthDate.birthDate.getChineseMonth();
    // Step 2
    branche = branche.getEnumNextNElement(month - 1);
    const hbranche = chineseBirthDate.gethBranche();
    branche = branche.getEnumNextNElement(hbranche.ordinal());
    let res = 0;
    if (isMan) {
      if (branche===Branche.DRAGON || branche===Branche.DOG) {res = 2;}
      if (branche===Branche.OX || branche===Branche.GOAT) {res = 1;}
    } else {
      if (branche===Branche.DRAGON || branche===Branche.DOG) {res = 1;}
      if (branche===Branche.OX || branche===Branche.GOAT) {res = 2;}
    }
    return res;
  }

  // Quan Sat born hour
  static isQuanSatHour(lunar: Lunar) {
    const month = lunar.birthDate.getChineseMonth();
    const hour = lunar.gethBranche().ordinal();
    if (month >= 8) {
      return month - 8===hour;
    } else {
      return month===hour - Branche.DRAGON.ordinal();
    }
  }

  // Tuong Quan born hour
  static isTuongQuanHour(lunar: Lunar) {
    const season = lunar.getmBranche().season;
    const hbranche = lunar.gethBranche();
    let res = false;
    switch (season) {
      case Season.SPRING:
        res =
          hbranche === Branche.DRAGON ||
          hbranche === Branche.DOG ||
          hbranche === Branche.COCK;
        break;
      case Season.SUMMER:
        res =
          hbranche === Branche.RAT ||
          hbranche === Branche.RABBIT ||
          hbranche === Branche.GOAT;
        break;
      case Season.AUTUMN:
        res =
          hbranche === Branche.TIGER ||
          hbranche === Branche.HORSE ||
          hbranche === Branche.OX;
        break;
      case Season.WINTER:
        res =
          hbranche === Branche.MONKEY ||
          hbranche === Branche.SNAKE ||
          hbranche === Branche.PIG;
        break;
      default:
        break;
    }
    return res;
  }
  // Diem Vuong born hour
  static isDiemVuongHour(lunar: Lunar) {
    const season = lunar.getmBranche().season;
    const hbranche = lunar.gethBranche();
    let res = false;
    switch (season) {
      case Season.SPRING:
        res = hbranche === Branche.OX || hbranche === Branche.GOAT;
        break;
      case Season.SUMMER:
        res = hbranche === Branche.DRAGON || hbranche === Branche.DOG;
        break;
      case Season.AUTUMN:
        res = hbranche === Branche.RAT || hbranche === Branche.HORSE;
        break;
      case Season.WINTER:
        res = hbranche === Branche.RABBIT || hbranche === Branche.COCK;
        break;
      default:
        break;
    }
    return res;
  }
  // Date born hour
  static isHourSeasonCompatible(lunar: Lunar) {
    const season = lunar.getmBranche().season;
    const hbranche = lunar.gethBranche();
    let res = false;
    switch (season) {
      case Season.SPRING:
        res = hbranche === Branche.HORSE;
        break;
      case Season.SUMMER:
        res = hbranche === Branche.COCK;
        break;
      case Season.AUTUMN:
        res = hbranche === Branche.RAT;
        break;
      case Season.WINTER:
        res = hbranche === Branche.RABBIT;
        break;
      default:
        break;
    }
    return res;
  }
}
