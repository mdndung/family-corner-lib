/* eslint-disable @typescript-eslint/naming-convention */
import { ZodiacHelper } from '../../helper/zodiacHelper';
import { EnumBaseClass } from '../enumBaseClass';
import { Zodiac } from './zodiac';

export class Planet extends EnumBaseClass {
  static SUN = new Planet(
    'SUN',
    Zodiac.LEO,
    5,
    Zodiac.ARIES,
    Zodiac.LIBRA,
    true,
    4
  );
  static MOON = new Planet(
    'MOON',
    Zodiac.CANCER,
    4,
    Zodiac.TAURUS,
    Zodiac.SCORPIO,
    true,
    3
  );
  static MERCURY = new Planet(
    'MERCURY',
    Zodiac.GEMINI,
    3,
    Zodiac.VIRGO,
    Zodiac.PISCES,
    true,
    2
  );
  static VENUS = new Planet(
    'VENUS',
    Zodiac.TAURUS,
    7,
    Zodiac.PISCES,
    Zodiac.VIRGO,
    true,
    2
  );
  static MARS = new Planet(
    'MARS',
    Zodiac.ARIES,
    1,
    Zodiac.CAPICORN,
    Zodiac.CANCER,
    true,
    2
  );
  static JUPITER = new Planet(
    'JUPITER',
    Zodiac.SAGITTATIUS,
    9,
    Zodiac.CANCER,
    Zodiac.CAPICORN,
    true,
    2
  );
  static SATURN = new Planet(
    'SATURN',
    Zodiac.CAPICORN,
    10,
    Zodiac.LIBRA,
    Zodiac.ARIES,
    true,
    2
  );
  static URANUS = new Planet(
    'URANUS',
    Zodiac.AQUARIUS,
    11,
    Zodiac.SCORPIO,
    Zodiac.TAURUS,
    false,
    1
  );
  static NEPTUNE = new Planet(
    'NEPTUNE',
    Zodiac.PISCES,
    12,
    Zodiac.LEO,
    Zodiac.AQUARIUS,
    false,
    1
  );
  static PLUTO = new Planet(
    'PLUTO',
    Zodiac.SCORPIO,
    8,
    Zodiac.ARIES,
    Zodiac.LIBRA,
    false,
    1
  );
  // Ascendant, Middle sky virtual plannet for aspect calculus purposes
  static AS = new Planet('AS', null, 1, null, null, true, 4);
  static DC = new Planet('DC', null, 7, null, null, true, 0);
  static MC = new Planet('MC', null, 10, null, null, true, 0);
  static FC = new Planet('FC', null, 4, null, null, true, 0);

  static MAX_PLANETS = 10;
  static AS_PLANET = 10; // Ascending position
  static MC_PLANET = 11; // Middle sky position
  static DC_PLANET = 12; //
  static FC_PLANET = 13; //
  static ALL_PLANETS = Planet.FC_PLANET + 2;

  home: Zodiac= null;
  empathyHouseNb: number= null;
  exaltation: Zodiac= null;
  decline: Zodiac= null;
  fastPlanet: boolean= null;
  points: number= null;

  constructor(
    name: string,
    home: Zodiac,
    empathyHouseNb: number,
    exaltation: Zodiac,
    decline: Zodiac,
    fastPlanet: boolean,
    points: number
  ) {
    super(name);
    this.home = home;
    this.empathyHouseNb = empathyHouseNb;
    this.exaltation = exaltation;
    this.decline = decline;
    this.fastPlanet = fastPlanet;
    this.points = points;
  }

  static getValues(): Planet[] {
    return Planet.SUN.getValues() as Planet[];
  }

  override getClassName() {
    return 'Planet';
  }



  isInHome(actualPlanetSign: Zodiac) {
    return this.home === actualPlanetSign;
  }

  public isInExil(actualPlanetSign: Zodiac) {
    if (this.isVirtual()) {return false;}
    return ZodiacHelper.getOpposite(this.home) === actualPlanetSign;
  }

  // Ref23 p159
  public getConjonctionOrbe() {
    let res = 8;
    if (this.fastPlanet) {res = 10;}
    return res;
  }

  getSextileOrbe() {
    let res = 4;
    if (this.fastPlanet) {res = 5;}
    return res;
  }
  getTrigoneOrbe() {
    let res = 7;
    if (this.fastPlanet) {res = 8;}
    return res;
  }

  isInExaltation(actualPlanetSign: Zodiac) {
    return this.exaltation === actualPlanetSign;
  }

  isInDecline(actualPlanetSign: Zodiac) {
    return this.decline === actualPlanetSign;
  }

  isVirtual() {
    return this.ordinal() >= Planet.MAX_PLANETS;
  }

  getAspectConjonctionOppositionTolerance(otherPlanet: Planet) {
    const otherOrbe = otherPlanet.getConjonctionOrbe();
    const myOrbe = this.getConjonctionOrbe();
    if (myOrbe <= otherOrbe) {return myOrbe;}
    return otherOrbe;
  }

  getAspectSextileTolerance(otherPlanet: Planet) {
    const otherOrbe = otherPlanet.getSextileOrbe();
    const myOrbe = this.getSextileOrbe();
    if (myOrbe <= otherOrbe) {return myOrbe;}
    return otherOrbe;
  }

  getAspectTrigoneTolerance(otherPlanet: Planet) {
    const otherOrbe = otherPlanet.getTrigoneOrbe();
    const myOrbe = this.getTrigoneOrbe();
    if (myOrbe <= otherOrbe) {return myOrbe;}
    return otherOrbe;
  }

  getForce(zodiac: Zodiac) {
    if (this.isInExaltation(zodiac)) {return 10;}
    if (this.isInHome(zodiac)) {return 8;}
    if (this.isInDecline(zodiac)) {return 4;}
    return 6;
  }
}
