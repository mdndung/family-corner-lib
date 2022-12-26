/* eslint-disable @typescript-eslint/naming-convention */
import {Temporal} from 'temporal-polyfill';
import { CalendarChinese } from 'date-chinese';

export class MyCalendar {
  static JANUARY = 1 ;
  static FEBRUARY = MyCalendar.JANUARY+1 ;
  static  MARCH= MyCalendar.FEBRUARY+1 ;
  static  APRIL= MyCalendar.MARCH+1 ;
  static  MAY= MyCalendar.APRIL+1 ;
  static  JUNE= MyCalendar.MAY+1 ;
  static  JULY= MyCalendar.JUNE+1 ;
  static  AUGUST= MyCalendar.JULY+1 ;
  static  SEPTEMBER= MyCalendar.AUGUST+1 ;
  static OCTOBER = MyCalendar.SEPTEMBER+1 ;
  static  NOVEMBER= MyCalendar.OCTOBER+1 ;
  static DECEMBER = MyCalendar.NOVEMBER+1 ;


  plainDateTime: Temporal.PlainDateTime= null;
  duration: Temporal.Duration= null;
  chineseDate: CalendarChinese= null;

  constructor(year: number, month1_12: number, day1_31: number, hour0_23: number, minute: number, second: number) {
    this.plainDateTime = Temporal.PlainDateTime.from(
      { year, month:month1_12, day:day1_31, hour:hour0_23, minute, second}
      );
    this.duration=this.toDuration(this);
    this.chineseDate = new CalendarChinese();
    this.chineseDate.fromGregorian(this.getYear(),this.getMonth(), this.getDay());
  }

  getCopy() {
    return new MyCalendar (
      this.getYear(),this.getMonth(),this.getDay(),
      this.getHour(),this.getMinute(),this.getSecond(),
      );
  }

  getChineseYear() {
    const year = this.chineseDate.get()[1];
    return Math.abs(year);
  }

  // From 1 to 12
  getChineseMonth() {
    const month = this.chineseDate.get()[2];
    return Math.abs(month);
  }

  getChineseDay() {
    const day = this.chineseDate.get()[4];
    return day;
  }

  getYear() {
    return this.plainDateTime.year;
  }


  // From 1 to 12
  getMonth() {
    return this.plainDateTime.month;
  }

  getMonth0() {
    return this.plainDateTime.month-1;
  }

  // From 1 to 31
  getDay() {
    return this.plainDateTime.day;
  }


  // From 0 to 23
  getHour() {
    return this.plainDateTime.hour;
  }

  // From 0 to 59
  getMinute() {
    return this.plainDateTime.minute;
  }

    // From 0 to 59
  getSecond() {
    return this.plainDateTime.second;
  }

  getPrincipleTerm() {
    const gYear = this.getYear();
    const gMonth = this.getMonth();
    return this.chineseDate.solarTerm(gMonth,gYear);
  }

  toDuration(mc: MyCalendar) {
    return Temporal.Duration.from(
      {years:mc.getYear(),months:mc.getMonth(),days:mc.getDay(),
        hours:mc.getHour(),minutes:mc.getMinute(),seconds:mc.getSecond()}
    );
  }

  toStr2(nb: number) {
    if ( nb<10 ) {
      return '0'+nb;
    } else {
      return ''+nb;
    }
  }

  getIso8601() {
    return this.getYear()+
    '-'+this.toStr2(this.getMonth())+
    '-'+this.toStr2(this.getDay())+
    'T'+this.toStr2(this.getHour())+
    ':'+this.toStr2(this.getSecond());
  }

  getRelativeTo(dCal: MyCalendar) {
    let  rYear= this.getYear();
    let  rMonth= 0;
    let  rDay= 0;
    if ( rYear>dCal.getYear() ) {
      rYear = dCal.getYear() ;
      rMonth= dCal.getMonth();
      rDay= dCal.getDay();
    } else {
      rMonth= this.getMonth();
      rDay= this.getDay();
    }
    return rYear+'-'+this.toStr2(rMonth)+'-'+this.toStr2(rDay);
  }

  diffDate(dCal: MyCalendar) {
    let dateFrom = this.getCopy();
    let dateTo = dCal.getCopy();
    if ( dateFrom.afterDate(dateTo) ) {
      const someDate = dateFrom;
      dateFrom=dateTo; dateTo=someDate;
    }
    const until = dateFrom.plainDateTime.until(dateTo.plainDateTime, { largestUnit: 'day' });
    const count = until.days;

    return  count;
  }

  afterDate(dCal: MyCalendar) {
    const rTo = this.getRelativeTo(dCal);
    const seconds1 = this.duration.total({unit:'second',relativeTo:rTo});
    const seconds2 = dCal.duration.total({unit:'second',relativeTo:rTo});
    return seconds1>seconds2;
  }

  add(duration: Temporal.Duration) {
    this.plainDateTime = this.plainDateTime.add(duration);
    this.duration=this.toDuration(this);
    this.chineseDate.fromGregorian(this.getYear(),this.getMonth(), this.getDay());
  }

  toDateString() {
    const res =
      ''+this.getYear()+'-'+this.toStr2(this.getMonth())+'-'+this.toStr2(this.getDay())
      return res ;
  }

  toString() {
    const res =
      this.toDateString()+' '+
      this.toStr2(this.getHour())+':'+this.toStr2(this.getMinute())+':'+this.toStr2(this.getSecond());
      return res ;
  }
}
