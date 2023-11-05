/* eslint-disable @typescript-eslint/naming-convention */
import { XcelDocInterface } from '../interface/xcelDocInterface';
import { Lunar } from '../mt-data/bazi/lunar';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { HoroscopeHelper } from '../helper/horoscopeHelper';
import { ObsPeriod } from '../observations/obsPeriod';
import { HalacHoroscope } from './halacHoroscope';
import { HoroscopeGenerator } from './horoscopeGenerator';
import { CoordinateSystem } from '../mt-data/coordinateSystem';
import { ZodiacTheme } from '../mt-data/zodiac/zodiacTheme';
import { ZodiacHoroscope } from './zodiacHoroscope';
import { TuViHoroscope } from './tuviHoroscope';
import { SelectHoroscopeOption } from './selectHoroscopeOption';
import { BaziHoroscope } from './baziHoroscope';
import { Temporal } from 'temporal-polyfill';
import { PropertyHelper } from '../helper/PropertyHelper';

export class MyHoroscope {

  static THEME_GEN_START_AGE = 12;
  static YEAR_RANGE_CHILD = 'ymd.child';
  static YEAR_RANGE_STUDY = 'ymd.study';
  static YEAR_RANGE_AGE = 'ymd.age';

  baseBirthDate: MyCalendar= null;
  baseBirthLieu: CoordinateSystem= null;
  baseLunar: Lunar= null;
  doc: XcelDocInterface= null;

  constructor(
    birthDate: MyCalendar,
    birthLieu: CoordinateSystem,
    isMan: boolean,
    xcelDoc: XcelDocInterface,
  ) {
    this.baseBirthDate = birthDate.getCopy();
    this.baseBirthLieu = birthLieu;
    this.baseLunar = new Lunar(birthDate, isMan);
    this.doc = xcelDoc;
  }


  genDocHeader(headerLines: string[][], headerColFont: number[]) {
    headerLines.forEach((line) => {
      HoroscopeHelper.addRowLine(this.doc, line, headerColFont);
    });
  }

  getHoroscopeGenerator(
    studyDate: MyCalendar,
    studyLieu: CoordinateSystem,
    selectHoroscope: SelectHoroscopeOption,
  ) {
    const hGen = new HoroscopeGenerator(
      this.baseBirthDate,
      studyDate,
      this.baseLunar.isMan,
      this.doc
    );
    PropertyHelper.resetDefinedPropFile();

    if ( selectHoroscope.isBaziSelected() ) {
      PropertyHelper.addBaziPropFile();
      hGen.addContributor(
        new BaziHoroscope(this.baseBirthDate, studyDate, this.baseLunar.isMan)
      );
    }


    if ( selectHoroscope.isHalacSelected() ) {
      PropertyHelper.addHalacPropFile();
      hGen.addContributor(
        new HalacHoroscope(this.baseBirthDate, studyDate, this.baseLunar.isMan)
      );
    }
    if ( selectHoroscope.isZodiacSelected() ) {
      const genrePrefix = this.baseLunar.getGenrePrefix();
      const birthTheme = new ZodiacTheme(this.baseBirthDate, this.baseBirthLieu,genrePrefix);
      PropertyHelper.addZodiacPropFile();
      hGen.addContributor(
        new ZodiacHoroscope(
          this.baseBirthDate,
          studyDate,
          this.baseLunar.isMan,
          birthTheme,
          this.baseBirthLieu,
          studyLieu
        )
      );
    }
    if ( selectHoroscope.isTuViSelected() ) {
      PropertyHelper.addTuviPropFile();
      hGen.addContributor(
        new TuViHoroscope(
          this.baseBirthDate,
          studyDate,
          this.baseLunar.isMan
        )
      );
    }
    return hGen;
  }

  logYearSuite(
    studyDate: MyCalendar,
    studyLieu: CoordinateSystem,
    workSheetName: string,
    headerLines: string[][],
    headerColFont: number[],
    selectHoroscope: SelectHoroscopeOption,
    debugMode: number
  ) {
    this.doc.createWorkSheet(workSheetName);
    this.genDocHeader(headerLines, headerColFont);
    let currDate=this.baseBirthDate.getCopy();
    let oneYear=Temporal.Duration.from({years: 1});
    const hGen=this.getHoroscopeGenerator(currDate,studyLieu,selectHoroscope);
    while ( studyDate.afterDate(currDate)) {
      currDate.add(oneYear);
      hGen.setStudyDate(currDate);
      hGen.generateMe(ObsPeriod.YEARTHEME,debugMode);
    }
  }


  logEvolution(
    studyDate: MyCalendar,
    studyLieu: CoordinateSystem,
    workSheetName: string,
    headerLines: string[][],
    headerColFont: number[],
    selectHoroscope: SelectHoroscopeOption,
    debugMode: number
  ) {
    this.doc.createWorkSheet(workSheetName);
    this.genDocHeader(headerLines, headerColFont);
    const hGen=this.getHoroscopeGenerator(studyDate,studyLieu,selectHoroscope);
    hGen.generateTo(ObsPeriod.DAYTHEME,debugMode);
  }


}
