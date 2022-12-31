/* eslint-disable @typescript-eslint/naming-convention */
import { ZodiacHelper } from '../../helper/zodiacHelper';
import { Season } from '../bazi/season';
import { EnumBaseClass } from '../enumBaseClass';
import { Element } from '../feng-shui/element';

export class Zodiac extends EnumBaseClass {
  static ARIES = new Zodiac('ARIES', 0, 30, Element.FIRE, Season.SPRING);
  static TAURUS = new Zodiac('TAURUS', 30, 60, Element.EARTH, Season.SPRING);
  static GEMINI = new Zodiac('GEMINI', 60, 90, Element.METAL, Season.SPRING);
  static CANCER = new Zodiac('CANCER', 90, 120, Element.WATER, Season.SUMMER);
  static LEO = new Zodiac('LEO', 120, 150, Element.FIRE, Season.SUMMER);
  static VIRGO = new Zodiac('VIRGO', 150, 180, Element.EARTH, Season.SUMMER);
  static LIBRA = new Zodiac('LIBRA', 180, 210, Element.METAL, Season.AUTUMN);
  static SCORPIO = new Zodiac('SCORPIO', 210, 240, Element.WATER, Season.AUTUMN);
  static SAGITTATIUS = new Zodiac(
    'SAGITTATIUS',
    240,
    270,
    Element.FIRE,
    Season.AUTUMN
  );
  static CAPICORN = new Zodiac(
    'CAPICORN',
    270,
    300,
    Element.EARTH,
    Season.WINTER
  );
  static AQUARIUS = new Zodiac(
    'AQUARIUS',
    300,
    330,
    Element.METAL,
    Season.WINTER
  );
  static PISCES = new Zodiac('PISCES', 300, 360, Element.WATER, Season.WINTER);

  longitudeFrom: number= null;
  longitudeTo: number= null;
  element: Element= null;
  season: Season= null;

  constructor(
    name: string,
    longStart: number,
    longEnd: number,
    element: Element,
    season: Season
  ) {
    super(name);
    this.longitudeFrom = longStart;
    this.longitudeTo = longEnd;
    this.element = element;
    this.season = season;
  }


  static getValues() {
    return Zodiac.ARIES.getValues() as Zodiac[];
  }

  override getClassName() {
    return 'Zodiac';
  }

  isYin() {
    return Math.trunc(this.ordinal() % 2)  === 1;
  }

  isCardinal() {
    return Math.trunc(this.ordinal() % 3)===0;
  }

  isFix() {
    return Math.trunc(this.ordinal() % 3)===1;
  }

  isMutable() {
    return Math.trunc(this.ordinal() % 3)===2;
  }


  getOpposite() {
    return ZodiacHelper.getZodiac((this.longitudeFrom + 185) % 360);
  }

  override getViewColorName() {
    return this.element.getViewColorName();
  }
}
