/* eslint-disable @typescript-eslint/naming-convention */
import { XcelDocInterface } from '../interface/xcelDocInterface';
import { Lunar } from '../mt-data/bazi/lunar';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { TranslateService } from '@ngx-translate/core';
import { HoroscopeHelper } from '../helper/horoscopeHelper';
import { MessageHelper } from '../helper/messageHelper';
import { ObsPeriod } from '../observations/obsPeriod';
import { HalacHoroscope } from './halacHoroscope';
import { HoroscopeGenerator } from './horoscopeGenerator';
import { CoordinateSystem } from '../mt-data/coordinateSystem';
import { ZodiacTheme } from '../mt-data/zodiac/zodiacTheme';
import { ZodiacHoroscope } from './zodiacHoroscope';
import { TuViHoroscope } from './tuviHoroscope';
import { SelectHoroscopeOption } from './selectHoroscopeOption';
import { BaziHoroscope } from './baziHoroscope';

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

  logEvolution(
    studyDate: MyCalendar,
    studyLieu: CoordinateSystem,
    headerLines: string[][],
    headerColFont: number[],
    selectHoroscope: SelectHoroscopeOption,
    debugMode: number
  ) {
    this.doc.createWorkSheet('DestinyNew');
    this.genDocHeader(headerLines, headerColFont);

    const hGen = new HoroscopeGenerator(
      this.baseBirthDate,
      studyDate,
      this.baseLunar.isMan,
      this.doc
    );

    console.log(selectHoroscope);

    if ( selectHoroscope.isBaziSelected() ) {
      hGen.addContributor(
        new BaziHoroscope(this.baseBirthDate, studyDate, this.baseLunar.isMan)
      );
    }


    if ( selectHoroscope.isHalacSelected() ) {
      hGen.addContributor(
        new HalacHoroscope(this.baseBirthDate, studyDate, this.baseLunar.isMan)
      );
    }
    if ( selectHoroscope.isZodiacSelected() ) {
      const birthTheme = new ZodiacTheme(this.baseBirthDate, this.baseBirthLieu);
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
      hGen.addContributor(
        new TuViHoroscope(
          this.baseBirthDate,
          studyDate,
          this.baseLunar.isMan
        )
      );
    }
    hGen.generateTo(ObsPeriod.DAYTHEME,debugMode);
  }


}
