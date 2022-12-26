import { NagiaHelper } from '../../helper/nagiaHelper';
import { BaziHelper } from '../../helper/baziHelper';
import { ObjectHelper } from '../../helper/objectHelper';
import { TrigramHelper } from '../../helper/trigramHelper';
import { Branche } from '../bazi/branche';
import { Lunar } from '../bazi/lunar';
import { Trunk } from '../bazi/trunk';
import { Energy } from '../feng-shui/energy';
import { HalacTheme } from './halacTheme';
import { YiJing } from './yijing';
import { DateHelper } from '../../helper/dateHelper';


export class HalacThemeIterator {
  currHexagramArr?: Energy[]= null;
  currStartPeriodArr?: number[]= null;
  currStartYaoIdx?: number= null;
  currYaoPeriodIdx?: number= null;
  currStartYaoEnergy?: Energy= null;
  currentYaoAgeIdx?: number= null;
  currentYaoAge?: number= null;
  currAgeGroupLimit?: number= null;
  currentPosND?: number= null;


  baseTheme: HalacTheme= null;

  constructor(theme: HalacTheme) {
    this.baseTheme = theme;
    this.currentYaoAge = 1;
    this.currHexagramArr = null;
  }



  nextAgeHexagram() {
    this.currentYaoAgeIdx = (this.currentYaoAgeIdx + 1) % 6;
    this.currentYaoAge++;

    if (this.currentYaoAge > this.currAgeGroupLimit) {
      // Prepare next group
      this.initAgeHexagramIterator(this.currentYaoAge);
    } else {
      this.transform('Next Age');
    }
  }

  getHexaArray(trunk: Trunk, branche: Branche) {
    const nagiaNb = NagiaHelper.getNagiaIdx(trunk, branche);
    const trigramNb = NagiaHelper.getTrigramNb(nagiaNb);
    const trigram=TrigramHelper.getTrigramByOrd(trigramNb);
    return TrigramHelper.getMonogram(trigram.hauthienNb);
  }

  getFirstMonthTheme(studyLunar: Lunar) {
    const mStartHexArr = this.currHexagramArr;
    const mTTrigramArr: Energy[] = [];
    let currTheme = YiJing.getInstanceFromHexaArr(
      this.currHexagramArr,
      this.currentPosND
    );
    for (let index = 0; index < 3; index++) {
      const temp = Math.trunc((index + currTheme.getMyYaoPos()) % 6);
      mTTrigramArr.push(mStartHexArr[temp]);
    }
    const mUngTrigramArr = this.getHexaArray(
      studyLunar.getyTrunk(),
      studyLunar.getyBranche()
    );

    if (BaziHelper.isManYangOrWoManYing(this.baseTheme.lunar)) {
      currTheme = YiJing.getInstanceFromSkyEarth(
        TrigramHelper.getTrigramByEnergy(mUngTrigramArr),
        TrigramHelper.getTrigramByEnergy(mTTrigramArr),
        0
      );
      currTheme.setMyYaoPos(3);
    } else {
      currTheme = YiJing.getInstanceFromSkyEarth(
        TrigramHelper.getTrigramByEnergy(mTTrigramArr),
        TrigramHelper.getTrigramByEnergy(mUngTrigramArr),
        0
      );
      currTheme.setMyYaoPos(0);
    }
    return currTheme;
  }

  nextMonthOrDayTheme(theme: YiJing) {
    const yaoPos = theme.getHeYaoPos();
    theme.hexaArr[yaoPos] = theme.hexaArr[yaoPos].getOpposite();
    theme.evalYaoPos();
    return theme;
  }

  getMonthTheme(studyLunar: Lunar) {
    let currMonthTheme = this.getFirstMonthTheme(studyLunar);
    const birthLunar = this.baseTheme.lunar;
    const birthDate = birthLunar.birthDate;
    const birthMonth = birthDate.getChineseMonth();
    let currMonthCalendar = birthDate.getCopy();
    currMonthCalendar = DateHelper.getLunarFirstYearDate(birthDate);
    const studyMonth = studyLunar.birthDate.getChineseMonth();
    let foundMonthTheme = false;
    for (let currMonth = 1; currMonth < birthMonth; currMonth++) {
      if (currMonthCalendar.getChineseMonth() === studyMonth) {
        foundMonthTheme = true;
        break;
      }
      currMonthTheme = this.nextMonthOrDayTheme(currMonthTheme);
    }
    if (!foundMonthTheme) {
      currMonthTheme = this.getFirstMonthTheme(studyLunar);

      for (let currMonth = birthMonth; currMonth <= 12; currMonth++) {
        if (currMonthCalendar.getChineseMonth() === studyMonth) {
          break;
        }
        currMonthTheme = this.nextMonthOrDayTheme(currMonthTheme);
      }
    }
    return currMonthTheme;
  }

  getPrincipleTermEnergy(studyLunar: Lunar) {
    // Tiet===Sectional
    const currSectionalDate = DateHelper.getMajorSolarTerm(studyLunar.birthDate);
    const currPrincipleBazi = new Lunar(
      currSectionalDate,
      this.baseTheme.lunar.isMan
    );
    return this.getHexaArray(
      currPrincipleBazi.getdTrunk(),
      currPrincipleBazi.getdBranche()
    );
  }

  getDayTheme(studyLunar: Lunar) {
    const lunar = this.baseTheme.lunar;
    const studyDate = studyLunar.birthDate;
    const sectDate = DateHelper.getPrevSectionalDate(studyDate);
    const sectionalLunar = new Lunar(sectDate, lunar.isMan);
    let dayTheme = this.getInitialDayTheme(studyLunar, sectionalLunar);
    const diffDate = studyDate.diffDate(sectDate);
    let iterDay = diffDate;
    if (diffDate >= 15) {
      iterDay = 14;
    }
    for (let index = 0; index < iterDay; index++) {
      dayTheme = this.nextMonthOrDayTheme(dayTheme);
    }

    if (diffDate >= 15) {
      const mCurrDayTTrigramArr: Energy[] = [];

      for (let pos = 0; pos < 3; pos++) {
        const yaoPos = dayTheme.getHeYaoPos();
        mCurrDayTTrigramArr.push(
          dayTheme.hexaArr[Math.trunc((pos + yaoPos) % 6)]
        );
      }
      const mCurrDayUngTrigramArr = this.getPrincipleTermEnergy(studyLunar);
      if (BaziHelper.isManYangOrWoManYing(this.baseTheme.lunar)) {
        dayTheme = YiJing.getInstanceFromSkyEarth(
          TrigramHelper.getTrigramByEnergy(mCurrDayTTrigramArr),
          TrigramHelper.getTrigramByEnergy(mCurrDayUngTrigramArr),
          0
        );
      } else {
        dayTheme = YiJing.getInstanceFromSkyEarth(
          TrigramHelper.getTrigramByEnergy(mCurrDayUngTrigramArr),
          TrigramHelper.getTrigramByEnergy(mCurrDayTTrigramArr),
          0
        );
      }
      iterDay = diffDate - 14;
      for (let index = 0; index < iterDay; index++) {
        dayTheme = this.nextMonthOrDayTheme(dayTheme);
      }
    }
    return dayTheme;
  }

  // get the first day theme
  getInitialDayTheme(studyLunar: Lunar, sectionalLunar: Lunar) {
    const mStartHexArr = this.currHexagramArr;
    const mTTrigramArr: Energy[] = [];

    const mCurrDayTTrigramArr: Energy[] = [];
    const mCurrDayStartHexaArr = this.currHexagramArr;
    let currTheme = YiJing.getInstanceFromHexaArr(
      this.currHexagramArr,
      this.currentPosND
    );
    for (let pos = 0; pos < 3; pos++) {
      mCurrDayTTrigramArr[pos] =
        mCurrDayStartHexaArr[(pos + currTheme.getMyYaoPos()) % 6];
    }

    const mCurrDayUngTrigramArr = this.getHexaArray(
      sectionalLunar.getyTrunk(),
      sectionalLunar.getyBranche()
    );
    // Eval theme of the sectional Term Energy
    if (BaziHelper.isManYangOrWoManYing(this.baseTheme.lunar)) {
      currTheme = YiJing.getInstanceFromSkyEarth(
        TrigramHelper.getTrigramByEnergy(mCurrDayUngTrigramArr),
        TrigramHelper.getTrigramByEnergy(mCurrDayTTrigramArr),
        0
      );
    } else {
      currTheme = YiJing.getInstanceFromSkyEarth(
        TrigramHelper.getTrigramByEnergy(mCurrDayTTrigramArr),
        TrigramHelper.getTrigramByEnergy(mCurrDayUngTrigramArr),
        0
      );
    }
    return currTheme;
  }

  logCurrHexagram(title: string) {
    //if ( this.currentYaoAge>8 && this.currentYaoAge<14 ) {
    console.log(
      title,
      'Age',
      this.currentYaoAge,
      'PeriodIdx',
      this.currYaoPeriodIdx,
      'Hexa ',
      BaziHelper.energyArrToString(this.currHexagramArr)
    );
    //}
  }

  letTransformUntilAge(currAge: number) {
    const len = this.currStartPeriodArr.length;
    this.currYaoPeriodIdx = len - 1;
    this.currStartYaoIdx = Math.trunc((len + this.currStartYaoIdx - 1) % 6);
    for (let i = 0; i < this.currStartPeriodArr.length; i++) {
      if (currAge < this.currStartPeriodArr[i]) {
        if (i === 0) {
          this.currYaoPeriodIdx = 0;
        } else {
          this.currYaoPeriodIdx = i - 1;
          this.currStartYaoIdx = Math.trunc((i + this.currStartYaoIdx - 1) % 6);
        }
        break;
      }
    }
    this.currHexagramArr = [...this.currHexagramArr];
    this.currStartYaoEnergy = this.currHexagramArr[this.currStartYaoIdx];
    this.currentYaoAgeIdx = this.currStartYaoIdx;
    this.currAgeGroupLimit =
      this.currStartPeriodArr[this.currYaoPeriodIdx + 1] - 1;

    // First transform
    this.transform('First Transform');
    const currYaoYear = this.currentYaoAge;
    for (let i = currYaoYear; i < currAge; i++) {
      this.nextAgeHexagram();
    }
  }

  initAgeHexagramIterator(currAge: number) {
   // this.logCurrHexagram('INIT FROM age ' + currAge);

    if (currAge >= this.currentYaoAge) {
      const secondaryPeriodArr = this.baseTheme.secondaryPeriodArr;
      const principalPeriodArr = this.baseTheme.principalPeriodArr;
      const principalTheme = this.baseTheme.principalTheme;
      const secondaryTheme = this.baseTheme.secondaryTheme;
      if (currAge < secondaryPeriodArr[secondaryPeriodArr.length - 1]) {
        if (currAge < principalPeriodArr[principalPeriodArr.length - 1]) {
          this.currHexagramArr = principalTheme.hexaArr;
          this.currStartPeriodArr = principalPeriodArr;
          this.currStartYaoIdx = principalTheme.posND;
        } else {
          this.currHexagramArr = secondaryTheme.hexaArr;
          this.currStartPeriodArr = secondaryPeriodArr;
          this.currStartYaoIdx = secondaryTheme.posND;
        }
        this.letTransformUntilAge(currAge);
      } else {
        if (this.currHexagramArr === null) {
          this.currHexagramArr = secondaryTheme.hexaArr;
          this.currStartPeriodArr = secondaryPeriodArr;
          this.currStartYaoIdx = secondaryTheme.posND;
          this.letTransformUntilAge(currAge);
        } else {
          // current year data are all ready
          // Do nothing
        }
      }
    }
    //this.logCurrHexagram('INIT ' + currAge + ' result ');
  }

  private transform(title: string) {
    //this.logCurrHexagram(title + ' Transform from  ');
    const lunar = this.baseTheme.lunar;
    const birthYearBranchEnergy = lunar.getyBranche().getEnergy();
    //console.log("Energy ",this.currStartYaoEnergy.toString() );
    if (this.currStartYaoEnergy === Energy.YIN) {
      // Current start group is Yin
      this.currHexagramArr[this.currentYaoAgeIdx] =
        this.currHexagramArr[this.currentYaoAgeIdx].getOpposite();
      this.currentPosND = this.currentYaoAgeIdx;
    } else {
      // Current start group is Yang
      const diffYear =
        this.currentYaoAge - this.currStartPeriodArr[this.currYaoPeriodIdx] + 1;
      switch (diffYear) {
        case 1: // First Year
          if (birthYearBranchEnergy===Energy.YIN) {
            this.currHexagramArr[this.currentYaoAgeIdx] =
              this.currHexagramArr[this.currentYaoAgeIdx].getOpposite();
          }
          this.currentPosND = this.currentYaoAgeIdx;
          break;
        case 2: // Second
          this.currHexagramArr[(this.currentPosND + 3) % 6] =
            this.currHexagramArr[(this.currentPosND + 3) % 6].getOpposite();
          break;
        case 3: //  Third year
          this.currHexagramArr[this.currentPosND] =
            this.currHexagramArr[this.currentPosND].getOpposite();
          this.currentYaoAgeIdx = this.currentPosND;
          break;
        default: // 4th - 9th year
          this.currHexagramArr[this.currentYaoAgeIdx] =
            this.currHexagramArr[this.currentYaoAgeIdx].getOpposite();
          this.currentPosND = this.currentYaoAgeIdx;
          break;
      }
    }
    //this.logCurrHexagram(title+ ' Transform result ');
  }
}
