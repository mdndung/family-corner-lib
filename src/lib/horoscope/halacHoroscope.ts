/* eslint-disable @typescript-eslint/naming-convention */

import { DateHelper } from '../helper/dateHelper';
import { MessageHelper } from '../helper/messageHelper';
import { PropertyHelper } from '../helper/PropertyHelper';
import { StringHelper } from '../helper/stringHelper';
import { Lunar } from '../mt-data/bazi/lunar';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { PropertyAttr } from '../mt-data/property/propertyAttr';
import { HalacThemeIterator } from '../mt-data/yi-jing/halac-theme-iterator';
import { HalacTheme } from '../mt-data/yi-jing/halacTheme';
import { YiJing } from '../mt-data/yi-jing/yijing';
import { HalacObservation } from '../observations/halacObservation';
import { HoroscopeContributor } from './horoscopeContributor';
import { YiJingAttr } from './yi-jing-attr';

export class HalacHoroscope extends HoroscopeContributor {

    static THEME_GEN_START_AGE = 12;
    static YEAR_RANGE_CHILD = 'ymd.child';
    static YEAR_RANGE_STUDY = 'ymd.study';
    static YEAR_RANGE_AGE = 'ymd.age';

    birthLunar: Lunar;
    birthTheme: HalacTheme;
    observation: HalacObservation;

    constructor(
        birthDate: MyCalendar,
        studyDate: MyCalendar,
        isMan: boolean
    ) {
        super(birthDate, studyDate, isMan);
        this.birthLunar = new Lunar(birthDate, isMan);
        this.birthTheme = new HalacTheme(this.birthLunar);
        this.initBaseQiType(this.birthLunar);
        this.observation=new HalacObservation(this.birthLunar.getGenrePrefix())
    }


    getYiJingAttr(theme: YiJing, basePeriodIdx: number) {
        const yiJingObs = new YiJingAttr(
            this.birthLunar,
            theme,
            this.getBaseQiType(basePeriodIdx)
        );
        this.baseQiTypeData[basePeriodIdx] = yiJingObs.qiTypeData;
        return yiJingObs;
    }

    logAddCommentLabel(comment:string) {
        PropertyHelper.addCommentLabel(comment)
    }

    genYiYingTheme(theme: YiJing, basePeriodIdx: number) {
        // Base addTheme
        const prefix = "Halac." + theme.getHexaOrdinal();
        const yaoPos = theme.getMyYaoPos() + 1;
        const yiJingObs = this.getYiJingAttr(theme, basePeriodIdx);

        const postFix = '&' + StringHelper.bool2Str(yiJingObs.isFavorable);
        this.logAddCommentLabel(
            prefix + PropertyAttr.DOT + yaoPos + postFix
        );
        PropertyHelper.addCommentLabel(
            prefix + PropertyAttr.DOT + yaoPos + '.yao' + postFix
        );
        PropertyHelper.addCommentLabel(prefix + postFix);
    }

    genPrincNComplementTheme(theme: YiJing, basePeriodIdx: number) {
        this.genYiYingTheme(theme, basePeriodIdx);
        this.genYiYingTheme(theme.getComplement(), basePeriodIdx);
    }

    getYearRange(age: number) {
        if (age < HalacHoroscope.THEME_GEN_START_AGE) {return HalacHoroscope.YEAR_RANGE_CHILD;}
        if (age < 25) {return HalacHoroscope.YEAR_RANGE_STUDY;}
        return HalacHoroscope.YEAR_RANGE_AGE;
    }

    // Ref4a and Ref4b: Bat tu ha lac pdf (01 and 02 pdf)
    // Called for Year, Month, Day result
    genDateTheme(theme: YiJing, currAge: number, basePeriodIdx: number) {
        this.genPrincNComplementTheme(theme, basePeriodIdx);
        const yearRangeType = this.getYearRange(currAge);
        const prefix = 'Halac.' + theme.getHexaOrdinal();
        const yaoPos = theme.getMyYaoPos() + 1;
        const yiJingObs = this.getYiJingAttr(theme, basePeriodIdx);
        const postFix = '&' + StringHelper.bool2Str(yiJingObs.isFavorable);

        PropertyHelper.addCommentLabel(
            prefix + PropertyAttr.DOT + yaoPos + postFix
        );
        PropertyHelper.addCommentLabel(
            prefix + PropertyAttr.DOT + yaoPos + '.yao' + postFix
        );
        PropertyHelper.addCommentLabel(
            prefix + PropertyAttr.DOT + yaoPos + '.ymd.all' + postFix
        );
        PropertyHelper.addCommentLabel(
            prefix + PropertyAttr.DOT + yaoPos + '.' + yearRangeType + postFix
        );
        PropertyHelper.addCommentLabel(prefix + postFix);
    }

    getYTrunkBranchStr(lunar: Lunar) {
        const periodTrunk = lunar.getyTrunk();
        const periodBranche = lunar.getyBranche();
        const periodTrunkBranch =
            MessageHelper.getMessage(periodTrunk.getFullName()) +
            ' ' +
            MessageHelper.getMessage(periodBranche.getFullName());
        return periodTrunkBranch;
    }


    genPeriod(periodAge: number) {
        for (let part = 1; part < 3; part++) {
            const currAge = periodAge + (part - 1) * 5;
            const iterator = new HalacThemeIterator(this.birthTheme);

            iterator.initAgeHexagramIterator(currAge);
            const periodTheme = YiJing.getInstanceFromHexaArr(
                iterator.currHexagramArr,
                iterator.currentPosND
            );
            const basePeriodIdx = 2;
            this.genDateTheme(periodTheme, currAge, basePeriodIdx);
        }
    }


    genMainDestinyPeriod(
        periodArr: number[],
        currAge: number,
        isFirstGroup: boolean
    ) {
        let fromIndex = 0;
        if (!isFirstGroup) {
            fromIndex = 1;
        }
        for (let index = fromIndex; index < periodArr.length; index++) {
            const startPeriodAge = periodArr[index];
            this.genPeriod(startPeriodAge);
            if (startPeriodAge > currAge) {break;}
        }
    }

    genPeriodTheme(currAge: number,currDate: MyCalendar): void {
    }


    genYearTheme(currAge: number,currDate: MyCalendar): void{
        const iterator = new HalacThemeIterator(this.birthTheme);
        iterator.initAgeHexagramIterator(currAge);
        const yearTheme = YiJing.getInstanceFromHexaArr(
            iterator.currHexagramArr,
            iterator.currentPosND
        );
        const basePeriodIdx = 3;
        this.genDateTheme(yearTheme, currAge, basePeriodIdx);
    }

    genMonthTheme(currAge: number) {
        const lunar = this.birthLunar;
        const studyLunar = new Lunar(this.studyDate, lunar.isMan);
        const iterator = new HalacThemeIterator(this.birthTheme);
        iterator.initAgeHexagramIterator(currAge);
        const monthTheme = iterator.getMonthTheme(studyLunar);
        const basePeriodIdx = 4;
        this.genDateTheme(monthTheme, currAge, basePeriodIdx);
    }

    genDayTheme(currAge: number) {
        const studyLunar = new Lunar(this.studyDate, this.isMan);
        const sectDate = DateHelper.getPrevSectionalDate(this.studyDate);
        const sectionalLunar = new Lunar(sectDate, this.isMan);
        const sectAge = sectDate.getYear() - this.birthYear;
        const iterator = new HalacThemeIterator(this.birthTheme);
        iterator.initAgeHexagramIterator(sectAge);
        // Iterate to the sectional month
        //
        iterator.getMonthTheme(sectionalLunar);
        const dayTheme = iterator.getDayTheme(studyLunar);
        const basePeriodIdx = 5;
        this.genDateTheme(dayTheme, currAge, basePeriodIdx);

    }


    init(currAge: number): void {
    }

    genBirthTheme(currAge: number): void {
      const period1Arr = this.birthTheme.principalPeriodArr;
      if ( currAge<period1Arr[period1Arr.length - 1]) {
        this.genPrincipalTheme();
      } else {
          this.genSecondaryTheme();
        }
    }

    genMainTheme(theme: YiJing, basePeriodIdx: number) {
      this.genPrincNComplementTheme(theme, basePeriodIdx);
    }


    genPrincipalTheme() {
        const pTheme = this.birthTheme.principalTheme;
        const basePeriodIdx = 1;
        this.genMainTheme(pTheme, basePeriodIdx);
    }

    genSecondaryTheme() {
        const basePeriodIdx = 1;
        const secTheme = this.birthTheme.secondaryTheme;
        this.genMainTheme(secTheme, basePeriodIdx);
        return -1;
    }

    finalizeSession(currAge: number): void {
      // Nothing to be done
    }
}
