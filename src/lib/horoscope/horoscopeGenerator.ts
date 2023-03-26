// Generate horoscope base on each contributor
import { PropertyHelper } from '../helper/PropertyHelper';
import { XcelDocInterface } from '../interface/xcelDocInterface';
import { Lunar } from '../mt-data/bazi/lunar';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { HoroscopeHelper } from '../helper/horoscopeHelper';
import { ObjectHelper } from '../helper/objectHelper';
import { ObsPeriod } from '../observations/obsPeriod';
import { HoroscopeContributor } from './horoscopeContributor';
import { MessageHelper } from '../helper/messageHelper';




export class HoroscopeGenerator {
  birthDate: MyCalendar;
  studyDate: MyCalendar;
  birthLunar: Lunar;
  doc: XcelDocInterface;
  studyAge: number;

  contributors: HoroscopeContributor[];

  constructor(
    birthDate: MyCalendar,
    studyDate: MyCalendar,
    isMan: boolean,
    xcelDoc: XcelDocInterface
  ) {
    this.birthDate = birthDate.getCopy();
    this.birthLunar = new Lunar(birthDate, isMan);
    this.studyDate = studyDate.getCopy();
    this.doc = xcelDoc;
    this.contributors = [];
    this.studyAge = HoroscopeHelper.computeStudyAge(this.studyDate,this.birthDate);
  }

  addContributor(contrib: HoroscopeContributor) {
    ObjectHelper.pushIfNotExist(this.contributors, contrib);
  }

  init() {
    let currGenre = this.birthLunar.getGenrePrefix();
    PropertyHelper.setGenre(currGenre)
    PropertyHelper.initHelper(ObsPeriod.BIRTHTHEME, this.birthDate);
    this.contributors.forEach((contrib) => {
      contrib.init(this.studyAge);
    });
  }

  genBirthTheme() {
    // Done in init phase PropertyHelper.initHelper(ObsPeriod.BIRTHTHEME, this.birthDate);
    this.contributors.forEach((contrib) => {
      contrib.genBirthTheme(this.studyAge);
    });
    this.finalizeSession();
  }


  genPeriodTheme() {
    PropertyHelper.initHelper(ObsPeriod.PERIODTHEME,this.studyDate);
    this.contributors.forEach((contrib) => {
      contrib.genPeriodTheme(this.studyAge,this.studyDate);
    });
    this.finalizeSession();
  }

  genYearTheme() {
    PropertyHelper.initHelper(ObsPeriod.YEARTHEME,this.studyDate);
    this.contributors.forEach((contrib) => {
      contrib.genYearTheme(this.studyAge,this.studyDate);
    });
    this.finalizeSession();
  }

  genMonthTheme() {
    PropertyHelper.initHelper(ObsPeriod.MONTHTHEME, this.studyDate);
    this.contributors.forEach((contrib) => {
      contrib.genMonthTheme(this.studyAge);
    });
    this.finalizeSession();
  }

  genDayTheme() {
    PropertyHelper.initHelper(ObsPeriod.DAYTHEME, this.studyDate);
    this.contributors.forEach((contrib) => {
      contrib.genDayTheme(this.studyAge);
    });
    this.finalizeSession();
  }

  finalizeSession() {
    this.contributors.forEach((contrib) => {
      contrib.finalizeSession(this.studyAge);
    });
    PropertyHelper.finalizeSession();
  }


  displayHoroscopeSession(toSession: ObsPeriod) {
    const sessions = ObsPeriod.getValues();
    const toSessionIdx = toSession.ordinal();
    const labelAge = MessageHelper.getMessage('Label.Age')+' ';
    for (let index = 0; index < sessions.length; index++) {
      const session = sessions[index];
      const sessionDate = '' +  PropertyHelper.getSessionDate(session);
      const titleLines = [session.getName(), labelAge+ this.studyAge +'. '+ sessionDate];
      if (index <= toSessionIdx) {
          HoroscopeHelper.genWorkRowByCategory(session, this.doc, titleLines,session.displayCategory);
      } else {
        break;
      }
    }
  }


  generateTo(toPeriod: ObsPeriod, debugMode:number) {
    HoroscopeHelper.debug=debugMode;
    this.init();
    const toIdx = toPeriod.ordinal();
    if (toIdx >= ObsPeriod.BIRTHTHEME.ordinal()) {
      this.genBirthTheme();
    }

    if (toIdx >= ObsPeriod.YEARTHEME.ordinal()) {
      this.genYearTheme();
    }

    if (toIdx >= ObsPeriod.MONTHTHEME.ordinal()) {
       this.genMonthTheme();
    }

    if (toIdx >= ObsPeriod.DAYTHEME.ordinal()) {
      this.genDayTheme();
    }

    this.displayHoroscopeSession(toPeriod);

  }
}
