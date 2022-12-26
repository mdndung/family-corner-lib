/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../mt-data/enumBaseClass';
export class ObsPeriod extends EnumBaseClass {

  static BIRTHCATEGORY = [
    "ch.familycorner.bazi.CommentPersonality",
    "ch.familycorner.bazi.CommentFamily",
    "ch.familycorner.bazi.CommentHealth",
    "ch.familycorner.bazi.CommentCareer",
    "ch.familycorner.bazi.CommentRelation",
    "ch.familycorner.bazi.CommentFortune"];
    static YEARCATEGORY = [
      "ch.familycorner.bazi.CommentYear"
    ];
    static MONTHCATEGORY = [
      "ch.familycorner.bazi.CommentMonth"
    ];
    static DAYCATEGORY = [
      "ch.familycorner.bazi.CommentDay"
    ];
    static HOURCATEGORY = [
      "ch.familycorner.bazi.CommentHour"
    ];

    static BIRTHTHEME = new ObsPeriod('BIRTHTHEME',1,ObsPeriod.BIRTHCATEGORY);
    static PRINCIPALBIRTHTHEME = new ObsPeriod('PRINCIPALBIRTHTHEME',1,ObsPeriod.BIRTHCATEGORY);
    static SECONDARYBIRTHTHEME = new ObsPeriod('SECONDARYBIRTHTHEME',1,ObsPeriod.BIRTHCATEGORY);
    static PERIODTHEME = new ObsPeriod('PERIODSTHEME',1,ObsPeriod.BIRTHCATEGORY); // Or RSTHEME for zodiac
    static YEARTHEME = new ObsPeriod('YEARTHEME',1,ObsPeriod.YEARCATEGORY);
    static MONTHTHEME = new ObsPeriod('MONTHTHEME',1,ObsPeriod.MONTHCATEGORY);
    static DAYTHEME = new ObsPeriod('DAYTHEME',1,ObsPeriod.DAYCATEGORY);
    static HOURTHEME = new ObsPeriod('HOURTHEME',1,ObsPeriod.HOURCATEGORY);




    weight: number ;
    displayCategory: string[];

    constructor(name: string, weight: number, displayCategory: string[]) {
        super(name);
        this.weight = weight ;
        this.displayCategory = displayCategory ;
      }

    static getValues() : ObsPeriod[] {
      return ObsPeriod.BIRTHTHEME.getValues() as  ObsPeriod[];
    }

    static getObsPeriod(idx: number): ObsPeriod{
        return ObsPeriod.PRINCIPALBIRTHTHEME.getEnum(idx) as ObsPeriod ;
    }

    override getClassName() {
      return 'ObsPeriod';
    }
}
