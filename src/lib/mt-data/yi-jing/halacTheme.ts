import { DateHelper } from '../../helper/dateHelper';
import { Lunar } from '../bazi/lunar';
import { Branche } from '../bazi/branche';
import { Energy } from '../feng-shui/energy';
import { Trigram } from '../feng-shui/trigram';
import { YiJing } from './yijing';
import { Temporal } from 'temporal-polyfill';

export class HalacTheme {
  lunar: Lunar= null;
  principalTheme?: YiJing= null;
  secondaryTheme?: YiJing= null;
  principalPeriodArr?: number[]= null;
  secondaryPeriodArr?: number[]= null;


  constructor(lunar: Lunar) {
    this.lunar = lunar;
    this.initTheme();
  }

  initTheme() {
    const skyEarthTrigram = this.lunar.getSkyEarthTrigram();

    this.principalTheme = YiJing.getInstanceFromSkyEarth(
      skyEarthTrigram.earthTrigram,
      skyEarthTrigram.skyTriGram,
      this.getNDPos(skyEarthTrigram.skyTriGram, skyEarthTrigram.earthTrigram)
    );
    this.secondaryTheme = this.principalTheme.getSecondaryThemeInstance();
    this.principalPeriodArr = this.principalTheme.getPeriod(1);
    this.secondaryPeriodArr = this.secondaryTheme.getPeriod(
      this.principalPeriodArr[this.principalPeriodArr.length-1]
    );
  }

  // Ref2p49-54
 getNDPos(skyTriGram: Trigram, earthTrigram: Trigram) {
    let res = 0;
    //console.log("getNDPos",earthTrigram.toString(),skyTriGram.toString());
    const hourBranche = this.lunar.gethBranche();
    const hourEnergy = hourBranche.getHourEnergy();
    //console.log("hourBranche ",hourBranche.toString(),hourEnergy.toString());
    const yiJing = YiJing.getInstanceFromSkyEarth( earthTrigram, skyTriGram, 0);
    //console.log("yiJing ",yiJing.toString());
    const yangCount = yiJing.getEnergyCount(Energy.YANG);
    let hourCount = hourBranche.ordinal();
    //console.log("");
    if (Energy.YIN.isEqual(hourEnergy)) {
      hourCount = hourCount - Branche.HORSE.ordinal();
    } else {
      hourCount++;
    }
    //console.log("yangCount ",yangCount, hourCount);

    if (yangCount !== 0 && yangCount !== 6) {
      // Pass1 Inc using the same hourEnergy in b
      let count = 0;
      res = 0;
      const len = yiJing.hexaArr.length;
      while (count < hourCount) {
        if (yiJing.hexaArr[res].isEqual(hourEnergy)) {
          count++;
          if (count < hourCount) {
            count++;
          }
        }
        if (count < hourCount) {
          res++;
          if (res >= len) {
            break;
          }
        }
      }
      //console.log("res 1 ",res, count, hourCount);
      if (count < hourCount) {
        res = 0;
        while (count < hourCount) {
          if (yiJing.hexaArr[res] !== hourEnergy) {
            count++;
          }
          if (count < hourCount) {
            res++;
            if (res >= len) {
              res = 0;
            }
          }
        }
      }
      //console.log("");
    } else {
      const birthSolarDegree = DateHelper.getSolarDegree(this.lunar.birthDate);
      hourCount--;
      res = hourCount % 3;
      //console.log("");
      if (Energy.YIN.isEqual(hourEnergy)) {
        res = 3 + res;
      }
      if (this.lunar.isMan) {
        if (90 <= birthSolarDegree && birthSolarDegree < 270) {
          res = 5 - res;
        }
      } else {
        if (!(90 <= birthSolarDegree) && birthSolarDegree < 270) {
          res = 5 - res;
        }
      }
    }
    //console.log("");
    return res;
  }

   getPeriodIncrementSign() {
    let res = 1 ;
    if ( Energy.YIN.isEqual(this.lunar.getyBranche().getEnergy())) {
      res = -1;
    }
    if ( !this.lunar.isMan ) {
      res = -res;
    }
    return res;
  }

  //Ref3p274??
  getStartPeriod() {

    const birthDate =this.lunar.birthDate;
    let term=birthDate.getCopy() ;
    //console.log("Study date", birthDate.toString());
    // Take the precede solar term
    term.add(Temporal.Duration.from({months:-1}));
    //console.log("Solar term", DateHelper.getSolarTerm(term).toString());
    term= DateHelper.getSolarTerm(term);
    //console.log("term", term.toString());
    const inc = this.getPeriodIncrementSign();
    if ( inc<0 ) {
      if ( term.afterDate(birthDate)) {
        term.add(Temporal.Duration.from({months:-1}));
      }
    } else {
      if ( birthDate.afterDate(term)) {
        term.add(Temporal.Duration.from({months:1}));
      }
    }
    const diffDays = term.diffDate(birthDate)+1;
    const year = Math.trunc(diffDays / 3) ;
    const startPeriod = birthDate.getCopy() ;

    startPeriod.add(Temporal.Duration.from({years:year}));
    let month = Math.trunc((diffDays % 3)*4);
    startPeriod.add(Temporal.Duration.from({months:month}));

    let day = inc * this.getPeriodIncrementSign()*(term.getHour()-birthDate.getHour());
    //console.log("Diff Days", diffDays, "year ", year, " month ", month, "day ", day);
    //console.log("startPeriod", startPeriod.toString());
    if ( day>0 ) {
      day = 5 * ( day +inc ) + 1 ;
    } else {
      day = 5 * day ;
    }
    month = Math.trunc(day / 30) ;
    startPeriod.add(Temporal.Duration.from({months:month}));
    day = Math.trunc(day % 30) ;
    startPeriod.add(Temporal.Duration.from({days:day}));
    // Minute and seconde ?
    //console.log("add month ", month, " day ", day);

    return startPeriod;
  }

  toString() {
    return ' Lunar ' +
      this.lunar.toString() +
      ' ' +
      ' Principal Theme ' +
      this.principalTheme.toString() +
      ' ' +
      ' Secondary Theme ' +
      this.secondaryTheme.toString();
  }
}
