/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { MyCalendar } from '../mt-data/date/mycalendar';
import { House } from '../mt-data/zodiac/house/house';
import { House1Observation } from '../mt-data/zodiac/house/house1Observation';
import { House6Observation } from '../mt-data/zodiac/house/house6Observation';
import { HouseObservation } from '../mt-data/zodiac/house/houseObservation';
import { Planet } from '../mt-data/zodiac/planet';
import { Zodiac } from '../mt-data/zodiac/zodiac';
import { ZodiacTheme } from '../mt-data/zodiac/zodiacTheme';
import { Temporal } from 'temporal-polyfill';
import { CalcHelper } from './calcHelper';
import { CoordinateSystem } from '../mt-data/coordinateSystem';


export class ZodiacHelper {

  static ASHOUSEIDX = 1; // House ascending index
  static DSHOUSEIDX = 7; // House descending index
  static FCHOUSEIDX = 4; // House bottom sky index
  static MCHOUSEIDX = 10; // House middle sky index


  //Ref23 Page 271, Ref24 page 394
  static incHsiuIdx(currIdx: number, inc: number) {
    let res = currIdx + inc;
    if (inc > 0) {
      if (res > 28) {res = 1;}
    } else {
      if (res <= 0) {res = 28;}
    }
    return res;
  }

  static isNightHouse( houseNb: number) {
    return houseNb<=6 ;
}

 static isEastHouse(houseNb: number) {
  return houseNb<=3 || houseNb>=10;
}

static isCardinal(houseNb: number) {
  return houseNb%3===1;
}

static isFix(houseNb: number) {
  return  houseNb%3===2 ;
}

static getHouseQuadrantNb(houseNb: number) {
  return Math.trunc(5-(1+(houseNb-1)/3));
}
  //Ref23 Page 271, Ref24 page 394
  static getLunarMansionsDayIdx(dayCalendar: MyCalendar) {
    let resIdx = 28;
    // Year Code
    let currYear = 2031;
    const dayYear = dayCalendar.getYear();

    let inc = 1;
    if (dayYear < currYear) {inc = -1;}

    while (dayYear !== currYear) {
      if (inc > 0) {
        if (currYear % 4===0) {resIdx = ZodiacHelper.incHsiuIdx(resIdx, inc);}
      }
      resIdx = ZodiacHelper.incHsiuIdx(resIdx, inc);
      currYear = currYear + inc;
      if (inc < 0) {
        if (currYear % 4===0) {resIdx = ZodiacHelper.incHsiuIdx(resIdx, inc);}
      }
    }

    // Month
    const currMonth = dayCalendar.getMonth();
    let monthIdx = 0;
    switch (currMonth) {
      case MyCalendar.JANUARY:
        monthIdx = 27;
        break;
      case MyCalendar.FEBRUARY:
      case MyCalendar.MARCH:
        monthIdx = 2;
        break;
      case MyCalendar.APRIL:
        monthIdx = 5;
        break;
      case MyCalendar.MAY:
        monthIdx = 7;
        break;
      case MyCalendar.JUNE:
        monthIdx = 10;
        break;
      case MyCalendar.JULY:
        monthIdx = 12;
        break;
      case MyCalendar.AUGUST:
        monthIdx = 15;
        break;
      case MyCalendar.SEPTEMBER:
        monthIdx = 18;
        break;
      case MyCalendar.OCTOBER:
        monthIdx = 20;
        break;
      case MyCalendar.NOVEMBER:
        monthIdx = 23;
        break;
      case MyCalendar.DECEMBER:
        monthIdx = 25;
        break;
      default:
        break;
    }
    resIdx += monthIdx;

    resIdx += dayCalendar.getDay();
    if (dayYear % 4===0 && currMonth >= MyCalendar.MARCH) {
      resIdx++;
    }

    resIdx = resIdx % 28;
    if (resIdx===0) {resIdx = 28;}
    return resIdx;
  }

  static getZodiac(longitude: number) {

    const values = Zodiac.getValues();
    let zodiac = null;
    for (let index = 0; index < values.length; index++) {
      zodiac = values[index] as Zodiac;
      if (zodiac.longitudeFrom <= longitude && zodiac.longitudeTo > longitude) {
        break;
      }
    }
    return zodiac;
  }

  static getPlanetHome(lHome: Zodiac) {
    const values = Planet.getValues();
    for (let index = 0; index < values.length; index++) {
      const p = values[index] as Planet;
      if (p.home === lHome) {return p;}
    }
    // No Home planet. Try exaltation
    for (let index = 0; index < values.length; index++) {
      const p = values[index] as Planet;
      if (p.isInExaltation(lHome)) {return p;}
    }
    return null;
  }

  static getHouseObservation(theme: ZodiacTheme, house: House): HouseObservation {
    let observation: HouseObservation;
    switch (house.nb) {
      case 1:
        observation = new House1Observation(house, theme);
        break;
      case 6:
        observation = new House6Observation(house, theme);
        break;
      default:
        observation = new HouseObservation(house, theme);
        break;
    }
    return observation;
  }

  static getPlanetRevolution(fromTheme: ZodiacTheme, nbYear: number, planet: Planet,studyCoodinate: CoordinateSystem,nbMonth: number, nbDay: number) {
    const birthDate = fromTheme.themeDate;
    const planetRBirthDPos = fromTheme.getPlanetD(planet);
    // Get the planetR at 0 hour
    const tempCalendar = new MyCalendar(birthDate.getYear() + nbYear,nbMonth, nbDay, 0, 0, 1);
    let zodiacHoroscope = fromTheme.getZodiacHoroscope(tempCalendar, studyCoodinate);
    const planetPosAtDay0 = fromTheme.getPlanetD2(zodiacHoroscope, planet);
    const distance = planetRBirthDPos - planetPosAtDay0;

    tempCalendar.add(Temporal.Duration.from({ days: 1 }));

    zodiacHoroscope = fromTheme.getZodiacHoroscope(tempCalendar, studyCoodinate);
    const planetPosAtDay1 = fromTheme.getPlanetD2(zodiacHoroscope, planet);
    const planetStep = CalcHelper.MinDistanceD(planetPosAtDay1, planetPosAtDay0);

    let temp = distance * 24.0 / planetStep;
    const hour = Math.trunc(temp);
    temp = temp - hour;
    temp = temp * 60;
    const minute = Math.trunc(temp);
    temp = temp - minute;
    temp = temp * 60;
    const sec = Math.trunc(temp);

    tempCalendar.add(Temporal.Duration.from({ days: -1 }));
    return new MyCalendar(tempCalendar.getYear(), tempCalendar.getMonth(), tempCalendar.getDay(), hour, minute, sec);

  }

  static getGoverner(zodiac: Zodiac) {
    return ZodiacHelper.getPlanetHome(zodiac);
  }

  static getOpposite(zodiac: Zodiac) {
    return ZodiacHelper.getZodiac((zodiac.longitudeFrom + 185) % 360);
  }
}
