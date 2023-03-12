
import { PropertyHelper } from '../helper/PropertyHelper';
import { ZodiacHelper } from '../helper/zodiacHelper';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { CoordinateSystem } from '../mt-data/coordinateSystem';
import { Planet } from '../mt-data/zodiac/planet';
import { ZodiacTheme } from '../mt-data/zodiac/zodiacTheme';
import { HoroscopeContributor } from './horoscopeContributor';
import { Temporal } from 'temporal-polyfill';


export class ZodiacHoroscope extends HoroscopeContributor {
  birthTheme: ZodiacTheme;
  birthCoodinate: CoordinateSystem;
  studyCoodinate: CoordinateSystem;
  themesList: ZodiacTheme[];

  constructor(
    birthDate: MyCalendar,
    studyDate: MyCalendar,
    isMan: boolean,
    birthTheme: ZodiacTheme,
    birthCoodinate: CoordinateSystem,
    studyCoodinate: CoordinateSystem
  ) {
    super(birthDate, studyDate, isMan);
    this.birthTheme = birthTheme;
    this.birthCoodinate = birthCoodinate;
    this.studyCoodinate = studyCoodinate;
    this.themesList=[];
  }

  init(currAge: number): void {
    // Must be done when house initialized
    this.birthTheme.addHouseAxeForce();
  }

  genDateThemeComment(pRSTheme: ZodiacTheme, prefix: string) {
    pRSTheme.evalRSSunContribution();

    // Comment on Planet house's position in RS Theme
    pRSTheme.genPlanetInHouseObservation(prefix);
    // Comment on AS + MC  of RS Theme in its zodiac sign
    pRSTheme.genASMCZodiacObservation(prefix);
    // Comment on RS Theme's AS and MC in birth theme's house
    pRSTheme.genASMCInNatalHouseObservation(prefix, this.birthTheme);

    // Comment on RS Aspect on in birth theme
    pRSTheme.genHouseAspectFusion(prefix, this.birthTheme);

    // Comment on PS Planet return position in birth theme
    pRSTheme.genPlanetsSuperposition(prefix, this.birthTheme);
  }

  //Ref32p38-p.. Pour révolution solaire et Ref32p159-.. pour thème progressé
  genThisYearTheme(currAge: number, currMonth: number, currDay: number) {

    const currPlanetSunRevolutionDate = ZodiacHelper.getPlanetRevolution(
      this.birthTheme,
      currAge, // The Sun at the day 1 of currAge
      Planet.SUN,
      this.studyCoodinate,
      currMonth,
      currDay
    );
    const anniversaryDate = this.birthDate.getCopy();
    anniversaryDate.add(Temporal.Duration.from({ years: currAge }));
    const pRSTheme = this.birthTheme.getInstance(
      currPlanetSunRevolutionDate,
      this.studyCoodinate
    );
    const pAnniversaryProgressTheme = this.birthTheme.getInstance(
      anniversaryDate,
      this.studyCoodinate
    );
    this.themesList.push(pRSTheme);
    this.themesList.push(pAnniversaryProgressTheme);
    pRSTheme.evalForce();
    pAnniversaryProgressTheme.evalForce();
    this.genDateThemeComment(pRSTheme, 'RS');
    this.birthTheme.genPlanetDirection(currAge);
  }

  genMansionsDestiny() {
    // Zodiac Mansion Day is common for both Principal Theme and Secondary theme
    const zodiacDayMansionIdx = ZodiacHelper.getLunarMansionsDayIdx(
      this.birthDate
    );
    PropertyHelper.addCommentLabel(
      'Lunar.Mansions.Destiny.' + zodiacDayMansionIdx
    );
  }

  genBirthTheme(currAge: number) {
    this.birthTheme.comment();
    this.genMansionsDestiny();
  }

  genPeriodTheme(currAge: number,currDate: MyCalendar): void {
  }

  genYearTheme(currAge: number,currDate: MyCalendar): void {
    this.genThisYearTheme(currAge,this.birthDate.getMonth(), this.birthDate.getDay());
  }

  genMonthTheme(currAge: number) {
    //this.genPeriodTheme(currAge,this.studyDate.getMonth(), 1);
  }

  genDayTheme(currAge: number) {
    //this.genPeriodTheme(currAge,this.studyDate.getMonth(), this.studyDate.getDay());
  }

  finalizeSession(currAge: number): void {
    // Flush themes
    this.themesList.forEach(theme => {
      theme.convertRawProp2Prop();
    });
  }
}
