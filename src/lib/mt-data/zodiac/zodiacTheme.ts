/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { MyCalendar } from '../date/mycalendar';
import { Zodiac } from './zodiac';
import { ZodiacObservationBase } from './zodiacObservationBase';
import { Origin, Horoscope } from 'circular-natal-horoscope-js';
import { Planet } from './planet';
import { House } from './house/house';
import { ZodiacHelper } from '../../helper/zodiacHelper';
import { AspectBase } from './aspect/aspectBase';
import { ObjectHelper } from '../../helper/objectHelper';
import { CalcHelper } from '../../helper/calcHelper';
import { ConjonctionAspect } from './aspect/conjonctionAspect';
import { OppositionAspect } from './aspect/oppositionAspect';
import { SextileAspect } from './aspect/sextileAspect';
import { TrigoneAspect } from './aspect/trigoneAspect';
import { SquareAspect } from './aspect/squareAspect';
import { CoordinateSystem } from '../coordinateSystem';
import { Season } from '../bazi/season';
import { Element } from '../feng-shui/element';
import { threadId } from 'worker_threads';

export class ZodiacTheme extends ZodiacObservationBase {
  static SEXTILEPARTITION = 60;
  static SQUAREPARTITION = 90;
  static TRIGONEPARTITION = 120;

  themeDate: MyCalendar;

  static SEASONFORCEIDX = 0;
  static YINYANGFORCEIDX = 1;
  static HOUSETYOEFORCEIDX = 2;
  static ELEMENTFORCEIDX = 3;
  static DAYNIGHTFORCEIDX = 4;
  static EASTWESTFORCEIDX = 5;
  static CARDINALFIXMUTABLEFORCEIDX = 6;
  static SPRINGSUMMERIDX = 0;
  static AUTUMNWINTERIDX = 1;
  static YANGIDX = 2;
  static YINIDX = 3;


  static FIREIDX = 7;
  static EARTHIDX = 8;
  static AIRIDX = 9;
  static WATERIDX = 10;
  static DAYIDX = 0;
  static NIGHTIDX = 1;
  static EASTIDX = 2;
  static WESTIDX = 3;
  static CARDINALIDX = 4;
  static FIXIDX = 5;
  static MUTABLEIDX = 6;
  static QUADRANT1IDX = 7;
  static QUADRANT4IDX = 8;
  static QUADRANT2IDX = 9;
  static QUADRANT3IDX = 10;

  static ASHOUSEIDX = 1; // House ascending index
  static DSHOUSEIDX = 7; // House descending index
  static FCHOUSEIDX = 4; // House bottom sky index
  static MCHOUSEIDX = 10; // House middle sky index

  houseArr: House[]= null;
  governerArr: Planet[]= null;
  isolatePlanets: Planet[]= null;
  themeGpsCoord: CoordinateSystem= null;
  stateForceArr: number[]= null;
  skyState: number[]= null;
  earthState: number[]= null;
  birthZodiac: Zodiac= null;

  private asZodiac: Zodiac= null;
  private zodiacHoroscope: Horoscope= null;



  constructor(themeDate: MyCalendar, coord: CoordinateSystem,genrePrefix: string) {
    super(genrePrefix);
    this.themeDate = themeDate;
    this.themeGpsCoord = coord;
    this.themeGpsCoord = coord;
    this.houseArr = [];
    this.governerArr = [];
    this.isolatePlanets = [];
    this.stateForceArr=ObjectHelper.newArray(7,0);
    this.zodiacHoroscope = this.getZodiacHoroscope(themeDate, coord);
    this.setHouseContent();
    this.birthZodiac = this.getPlanetZodiac(Planet.SUN);
    //Ascendant Zodiac theme
    this.asZodiac = this.getHouse(ZodiacHelper.ASHOUSEIDX).getZodiac();
    // Init Planets aspect container
    this.initAspectPlanets();

  }

  override getName() {
    return 'Zodiac theme '+ this.birthZodiac + ' Ascendant '+ this.asZodiac;
  }

  getTheme(): ZodiacTheme {
    return this;
  }

  getInstance(themeDate: MyCalendar, coord: CoordinateSystem,genrePrefix: string) {
    return new ZodiacTheme(themeDate, coord,genrePrefix);
  }

  getZodiacHoroscope(themeDate: MyCalendar, coord: CoordinateSystem) {

    const origin = new Origin({
      year: themeDate.getYear(),
      month: themeDate.getMonth0(), // 0 = January, 11 = December!
      date: themeDate.getDay(),
      hour: themeDate.getHour(),
      minute: themeDate.getMinute(),
      latitude: coord.latitude,
      longitude: coord.longitude,
    });
    const customOrbs = {
      conjunction: 8,
      opposition: 8,
      trine: 8,
      square: 7,
      sextile: 6,
      quincunx: 5,
      quintile: 1,
      septile: 1,
      'semi-square': 1,
      'semi-sextile': 1,
    };

    const horoscope = new Horoscope({
      origin,
      houseSystem: coord.zodiacHouseSystem,
      zodiac: coord.zodiacSystem,
      aspectPoints: ['bodies', 'points', 'angles'],
      aspectWithPoints: ['bodies', 'points', 'angles'],
      aspectTypes: ['major', 'minor'],
      customOrbs,
      language: 'en',
    });
    return horoscope;
  }

  // Aspect planet
  addIfInTolerance(
    instanceAspect: AspectBase,
    diff: number,
    tolerance: number,
    planetOrigin: Planet,
    planet: Planet
  ) {
    if (Math.abs(diff) <= tolerance) {
      // Planet is in an aspect case. Remove it from isolate planet
      ObjectHelper.popIfExist(this.isolatePlanets, planet);
      ObjectHelper.popIfExist(this.isolatePlanets, planetOrigin);

      const originhouse = this.getPlanetHouse(planetOrigin);
      const hObservation = originhouse.observation;
      if (hObservation.getPairedAspect(planetOrigin, planet) === null) {
        const aspect = instanceAspect.newInstance(planetOrigin, planet);
        hObservation.addAspect(aspect);
      }
    }
  }

  isInTolerance(diff: number, tolerance: number) {
    return Math.abs(diff) <= tolerance;
  }

  aspectPlanetDiff(p1: Planet, exactDiff: number, p2: Planet) {
    return this.aspectDiff(this.getPlanetD(p1), exactDiff, this.getPlanetD(p2));
  }

  aspectDiff(d1: number, exactDiff: number, d2: number) {
    const distance = CalcHelper.MinDistanceD(d1, d2);
    return CalcHelper.MinDistanceD(exactDiff, distance);
  }

  initAspectPlanets() {
    // Fill isolate planet with all planets
    // which will be removed later when aspect found
    this.isolatePlanets = Planet.getValues();
    const planets = Planet.getValues();
    planets.forEach((p1) => {
      if (!p1.isVirtual()) {
        const p1Ord = p1.ordinal();
        let tolerance;
        let distance;
        // Planet
        planets.forEach((p2) => {
          if (p2.ordinal() !== p1Ord) {
            tolerance = p1.getAspectConjonctionOppositionTolerance(p2);
            distance = this.aspectPlanetDiff(p1, 0, p2);
            this.addIfInTolerance(
              ConjonctionAspect.getInstance(),
              distance,
              tolerance,
              p1,
              p2
            );
            this.addIfInTolerance(
              OppositionAspect.getInstance(),
              CalcHelper.MinDistanceD(180, distance),
              tolerance,
              p1,
              p2
            );
            tolerance = p1.getAspectSextileTolerance(p2);
            this.addIfInTolerance(
              SextileAspect.getInstance(),
              CalcHelper.MinDistanceD(ZodiacTheme.SEXTILEPARTITION, distance),
              tolerance,
              p1,
              p2
            );
            tolerance = p1.getAspectTrigoneTolerance(p2);
            this.addIfInTolerance(
              TrigoneAspect.getInstance(),
              CalcHelper.MinDistanceD(ZodiacTheme.TRIGONEPARTITION, distance),
              tolerance,
              p1,
              p2
            );
            tolerance = tolerance - 1;
            this.addIfInTolerance(
              SquareAspect.getInstance(),
              CalcHelper.MinDistanceD(ZodiacTheme.SQUAREPARTITION, distance),
              tolerance,
              p1,
              p2
            );
          }
        });
      }
    });
  }

  setHouseContent() {
    const houses: House[] = [];
    const zHouseArr = this.zodiacHoroscope.Houses;
    let currHouse: House;
    let prevHouse: House;
    for (let houseNb = 0; houseNb < zHouseArr.length; houseNb++) {
      const housePosition = zHouseArr[houseNb].ChartPosition;
      const start = housePosition.StartPosition.Ecliptic.DecimalDegrees;
      let end = housePosition.EndPosition.Ecliptic.DecimalDegrees;
      if ( houseNb===zHouseArr.length-1 ) {
        end = zHouseArr[0].ChartPosition.StartPosition.Ecliptic.DecimalDegrees;
      }
      currHouse = new House(houseNb, start, end, this);
      houses.push(currHouse);
      currHouse.prevHouse = prevHouse;
      if (prevHouse != null) {prevHouse.nextHouse = currHouse;}
      prevHouse = currHouse;
    }
    houses[0].prevHouse = currHouse;
    currHouse.nextHouse = houses[0];
    this.houseArr = houses;
    // Add planet
    const pValues = Planet.getValues();
    for (let planetNb = 0; planetNb < pValues.length; planetNb++) {
      const planet = pValues[planetNb];
      const house = this.getPlanetHouse(planet);
      house.addPlanet(planet);
    }
    // Set governer
    for (let houseNb = 1; houseNb <= houses.length; houseNb++) {
      const idx = houseNb - 1;
      const z = this.houseArr[idx].getZodiac();
      this.governerArr.push( ZodiacHelper.getGoverner(z));
    }
  }

  addHouseAxeforce(houseIdx1: number, houseIdx2: number) {
    const force = Math.trunc(
      (this.getHouse(houseIdx1).observation.getNote() +
        this.getHouse(houseIdx2).observation.getNote()) /
        (2 * 10.0)
    );
    this.incPoints(force);
  }
  addHouseAxeForce() {
    this.addHouseAxeforce(1, 7);
    this.addHouseAxeforce(4, 10);
  }

  getHouseByDegreePos(degree: number): House {
    degree = degree % 360;
    for (let houseNb = 0; houseNb < this.houseArr.length; houseNb++) {
      const house = this.houseArr[houseNb];
      if (house.isinHouse(degree)) {return house;}
    }
    // Limit 360 degree problem
    // Try second pass
    degree+=360;
    for (let houseNb = 0; houseNb < this.houseArr.length; houseNb++) {
      const house = this.houseArr[houseNb];
      if (house.isinHouse(degree)) {return house;}
    }

    return null; // Should never happened
  }

  getPlanetHouse(planet: Planet) {
    return this.getHouseByDegreePos(this.getPlanetD(planet));
  }

  getHouse(nb: number) {
    return this.houseArr[nb - 1];
  }

  getPlanetD(planet: Planet) {
    return this.getPlanetD2(this.zodiacHoroscope, planet);
  }

  getPlanetD2(zodiacHoroscope: Horoscope, planet: Planet) {
    if (!planet.isVirtual()) {
      const planetId = planet.ordinal();
      return zodiacHoroscope.CelestialBodies.all[planetId].ChartPosition
        .Ecliptic.DecimalDegrees;
    }

    // Ref28p21 p22
    // Return the house cuspide
    const house = this.getHouse(planet.empathyHouseNb);
    return house.getCuspide();
  }

  getPlanetZodiac(planet: Planet) {
    return ZodiacHelper.getZodiac(this.getPlanetD(planet));
  }

  getNorthNodeD() {
    return this.zodiacHoroscope.CelestialPoints.northnode.ChartPosition.Ecliptic
      .DecimalDegrees;
  }

  getSouthNodeD() {
    return this.zodiacHoroscope.CelestialPoints.southnode.ChartPosition.Ecliptic
      .DecimalDegrees;
  }

  getBlackMoonD() {
    return this.zodiacHoroscope.CelestialPoints.lilith.ChartPosition.Ecliptic
      .DecimalDegrees;
  }

  getBlackMoonZodiac() {
    return ZodiacHelper.getZodiac(this.getBlackMoonD());
  }

  getBlackMoonHouse() {
    return this.getHouseByDegreePos(this.getBlackMoonD());
  }

  // Algorith Ref28p109
  getFortunePartD() {
    let res =
      this.getHouse(1).getCuspide() +
      this.getPlanetD(Planet.MOON) -
      this.getPlanetD(Planet.SUN);
    while (res < 0) {res += 360;}
    res = res % 360;
    return res;
  }

  getFortunePartZodiac() {
    return ZodiacHelper.getZodiac(this.getFortunePartD());
  }

  getPlanetAspectList(planet: Planet): AspectBase[] {
    const planetAspectList: AspectBase[] = [];
    this.houseArr.forEach((house) => {
      const observation = house.observation;
      observation.planetAspectList.forEach((aspect) => {
        if (aspect.isAspected1(planet)) {planetAspectList.push(aspect);}
      });
    });
    return planetAspectList;
  }

  getPlanetAspectForce(planet: Planet) {
    let force = 0;
    const planetAspectList = this.getPlanetAspectList(planet);
    //
    force = 5;
    if (planetAspectList.length > 0) {
      planetAspectList.forEach((aspect) => {
        force += aspect.getForce();
      });
      force = force / planetAspectList.length;
    } else {
      force = 4;
    }
    return force;
  }

  getPlanetForce(planet: Planet) {
    let force = 0;
    let count = 0;
    force = this.getPlanetAspectForce(planet);
    count++;
    force += planet.getForce(this.getPlanetZodiac(planet));
    count++;
    force = force / count;
    return force;
  }

  getHouseGovernerNb(governer: Planet) {
    for (let i = 0; i < this.governerArr.length; i++) {
      if (governer === this.governerArr[i]) {return i + 1;}
    }
    return 0;
  }

  // Refp362p0
  evalRSSunContribution() {
    const house = this.getPlanetHouse(Planet.SUN);
    const hObs=house.observation;
    const aspect = hObs.getPairedAspect(Planet.SUN,Planet.MOON);
    if (
      aspect!==null && (
      aspect.isSameAspectType(ConjonctionAspect.getInstance()) ||
      aspect.isSameAspectType(OppositionAspect.getInstance()))
    ) {
      this.incPoints(8);
    }
  }

  genPlanetInHouseObservation(prefix: string) {
    const planets = Planet.getValues();
    planets.forEach((planet) => {
      if (!planet.isVirtual()) {
        const z = this.getPlanetZodiac(planet);
        // Ref32p40 a planet is mainly activated when its sign'governer is in aspect with him
        const governer = ZodiacHelper.getGoverner(z);
        const house = this.getPlanetHouse(planet);
        const aspect = house.observation.getPairedAspect(planet, governer);
        if (aspect != null)
          {this.addSupportBaseComment(
            aspect.getForce(),
            prefix + '.' + planet.getName() + '.' + house.nb
          );}
      }
    });
  }

  // Ascendant et Milieu du ciel avec leur signe zodiac de la révolution solaire
  genASMCZodiacObservation(prefix: string) {

    this.addBaseComment(prefix + '.AS.Zodiac.' + this.asZodiac.toString());
    this.addBaseComment(
      prefix +
        '.MC.Zodiac.' +
        this.getHouse(ZodiacHelper.MCHOUSEIDX).getZodiac().toString()
    );
  }

  //
  // Ascendant et Milieu du ciel de la révolution solaire par rapport
  // au thème annuel
  //
  genASMCInNatalHouseObservation(prefix: string, birthTheme: ZodiacTheme) {
    let house = birthTheme.getHouseByDegreePos(
      this.getHouse(ZodiacHelper.ASHOUSEIDX).getCuspide()
    );
    this.addBaseComment(prefix + '.AS.BHse.' + house.nb);
    house = birthTheme.getHouseByDegreePos(
      this.getHouse(ZodiacHelper.MCHOUSEIDX).getCuspide()
    );
    this.addBaseComment(prefix + '.MC.BHse.' + house.nb);
  }

  //Ref32p96..
  genHouseAspectFusion(prefix: string, birthTheme: ZodiacTheme) {
    const planets = Planet.getValues();

    planets.forEach((planet) => {
      if (!planet.isVirtual()) {
        const planetAspectList = this.getPlanetAspectList(planet);
        const birthPlanetAspectList = birthTheme.getPlanetAspectList(planet);
        planetAspectList.forEach((aspect) => {
          const planet1 = aspect.planet1;
          const planet2 = aspect.planet2;
          birthPlanetAspectList.forEach((birthAspect) => {
            if (birthAspect.isAspected2(planet1, planet2)) {
              //L'aspect de la RS ne joue que dans le sens du natal
              this.addSupportBaseComment(
                birthAspect.getForce(),
                birthAspect.getAspectNameHeader() +
                  '.' +
                  planet1.toString() +
                  '.' +
                  planet2.toString()
              );
            }
          });
        });
      }
    });
  }

  addPlanetHouseZodiacComment(planet: Planet) {
    if (!planet.isVirtual() && planet !== Planet.PLUTO) {
      const pZodiac = this.getPlanetZodiac(planet);
      if (pZodiac !== null)
        {this.addBaseComment(planet.toString() + '.' + pZodiac.toString());}
    }
  }

  genRSASMC2BirthTeme(prefix: string, position: number, birthTheme: ZodiacTheme) {
    const planets = Planet.getValues();
    planets.forEach((birthPlanet) => {
      if (!birthPlanet.isVirtual()) {
        const bpStr = birthPlanet.toString();
        const bpos = birthTheme.getPlanetD(birthPlanet);

        // Ref34p394 préconise une tolerance de 3 degré
        const tolerance =  birthPlanet.getAspectConjonctionOppositionTolerance(birthPlanet);
        let distance = CalcHelper.MinDistanceD(position, bpos);

        if (this.isInTolerance(distance, tolerance)) {
          this.addBaseComment(prefix +bpStr);
        }
        distance = CalcHelper.MinDistanceD(position, birthTheme.getBlackMoonD());
        if ( this.isInTolerance(distance, tolerance)) {
                this.addBaseComment(prefix+'Black.Moon');
        };
        distance = CalcHelper.MinDistanceD(position, birthTheme.getFortunePartD());
        if ( this.isInTolerance(distance, tolerance)) {
            this.addBaseComment(prefix+'Fortune.Part');
        };
        distance = CalcHelper.MinDistanceD(position, birthTheme.getNorthNodeD());
        if ( this.isInTolerance(distance, tolerance)) {
            this.addBaseComment(prefix+'North.Node');
        };
        distance = CalcHelper.MinDistanceD(position, birthTheme.getSouthNodeD());
        if ( this.isInTolerance(distance, tolerance)) {
            this.addBaseComment(prefix+'South.Node');
        };
      }
    });
  }

  genPlanetSuperposition(prefix: string, planet: Planet, birthTheme: ZodiacTheme) {
    const planets = Planet.getValues();
      if (!planet.isVirtual()) {
        const pStr = planet.toString();
        const planetPosition = this.getPlanetD(planet);
        planets.forEach((birthPlanet) => {
          if (!birthPlanet.isVirtual()) {
            const bpStr = birthPlanet.toString();
            const bpos = birthTheme.getPlanetD(birthPlanet);

            // Ref34p394 préconise une tolerance de 3 degré
            const tolerance = planet.getAspectConjonctionOppositionTolerance(birthPlanet);
            let distance = CalcHelper.MinDistanceD(planetPosition, bpos);

            if (this.isInTolerance(distance, tolerance)) {
              const house = birthTheme.getPlanetHouse(birthPlanet);

              if (house.nb===ZodiacHelper.ASHOUSEIDX) {
                console.log(prefix+'.Bck.' +pStr+'.AS');
                this.addBaseComment(prefix+'.Bck.' +pStr+'.AS');
              } ;
              if (house.nb===ZodiacHelper.MCHOUSEIDX) {
                 console.log(prefix+'.Bck.' +pStr+'.MC');
                this.addBaseComment(prefix+'.Bck.' +pStr+'.MC');
              }
              if (planet === birthPlanet && planet !== Planet.MARS) {
                // Planet confirm the birth planet sign
                const observation = house.observation;
                birthTheme.addPlanetHouseZodiacComment(birthPlanet);
                observation.addPlanetAspectComment(birthPlanet);
              } else {
                this.addBaseComment(
                  prefix +
                    '.Bck.' +
                    pStr +
                    '.' +
                    bpStr
                );
              }
            }
          }
        });
      }
  }


  genPlanetsSuperposition(prefix: string, birthTheme: ZodiacTheme) {
    this.genRSASMC2BirthTeme(
      prefix+'.Bck.AS.',
      this.getHouse(ZodiacHelper.ASHOUSEIDX).getCuspide(),
      birthTheme);
      this.genRSASMC2BirthTeme(
        prefix+'.Bck.MC.',
        this.getHouse(ZodiacHelper.MCHOUSEIDX).getCuspide(),
        birthTheme);
    const planets = Planet.getValues();

    for (let index = 0; index < planets.length; index++) {
      const planet = planets[index];
      if (!planet.isVirtual()) {
        this.genPlanetSuperposition(prefix,planet,birthTheme);
        if (planet === Planet.SATURN) {break;}
      }
    }
  }

  // Ref32p185..
  genAspectIfInTolerance(
    aspect: AspectBase,
    diff: number,
    tolerance: number,
    planetCurrAge: Planet,
    planetInBirthTheme: Planet
  ) {
    if (Math.abs(diff) <= tolerance) {
      if (planetCurrAge.ordinal() >= Planet.SATURN.ordinal()) {
        this.addBaseComment(
          aspect.getAspectNameHeader() +
            '.' +
            planetCurrAge.toString() +
            '.' +
            planetInBirthTheme.toString() +
            '&'
        );
      } else {
        const force = aspect.getForce();
        this.addSupportBaseComment(
          force,
          'Direction.' +
            planetCurrAge.toString() +
            '.' +
            planetInBirthTheme.toString()
        );
      }
    }
  }

  // Planet direction on natal theme
  genPlanetDirection(currAge: number) {
    const oneD = 1;
    const planets = Planet.getValues();
    for (let index1 = 0; index1 < planets.length; index1++) {
      const planet = planets[index1];
      if (planet===Planet.DC) {continue;}
      if (planet===Planet.FC) {continue;}
      const pos = this.getPlanetD(planet) + currAge;
      const planetOrd = planet.ordinal();
      for (let index2 = 0; index2 < planets.length; index2++) {
        const birthPlanet = planets[index2];
        if (birthPlanet.ordinal() <= planetOrd) {continue;}
        if (birthPlanet.isVirtual()) {continue;}
        const bpos = this.getPlanetD(birthPlanet);
        // Conjonction aspect
        let tolerance =
          planet.getAspectConjonctionOppositionTolerance(birthPlanet);
        const distance = this.aspectDiff(pos, 0, bpos);
        this.genAspectIfInTolerance(
          ConjonctionAspect.getInstance(),
          distance,
          tolerance,
          planet,
          birthPlanet
        );
        this.genAspectIfInTolerance(
          OppositionAspect.getInstance(),
          CalcHelper.MinDistanceD(Math.PI, distance),
          tolerance,
          planet,
          birthPlanet
        );
        tolerance = planet.getAspectSextileTolerance(birthPlanet);
        this.genAspectIfInTolerance(
          SextileAspect.getInstance(),
          CalcHelper.MinDistanceD(ZodiacTheme.SEXTILEPARTITION, distance),
          tolerance,
          planet,
          birthPlanet
        );
        tolerance = planet.getAspectTrigoneTolerance(birthPlanet);
        this.genAspectIfInTolerance(
          TrigoneAspect.getInstance(),
          CalcHelper.MinDistanceD(ZodiacTheme.TRIGONEPARTITION, distance),
          tolerance,
          planet,
          birthPlanet
        );
        tolerance = tolerance - oneD;
        this.genAspectIfInTolerance(
          SquareAspect.getInstance(),
          CalcHelper.MinDistanceD(90, distance),
          tolerance,
          planet,
          birthPlanet
        );
      }
    }
  }

  addPlanetXDistribution(
    forceIdx: number,
    state: number[],
    fromIdx: number,
    count: number,
    descrArr: string[],
    balancedKey: string
  ) {
    const mean = 10.0 / count;
    if (this.stateForceArr[forceIdx] === 10) {
      this.addSupportBaseComment(10, balancedKey);
    } else {
      for (let i = 0; i < count; i++) {
        if (state[i + fromIdx] > mean) {
          this.addSupportBaseComment(4, descrArr[i]);
        }
      }
    }
  }

  addAllPlanetHouseZodiacComment() {
    const planets = Planet.getValues();
    planets.forEach((planet) => {
      this.addPlanetHouseZodiacComment(planet);
    });
  }

  //Ref28bp329-330
  addPlanetDayTimeDistribution() {
    const descrArr = ['Planet.DayTime.Day', 'Planet.DayTime.Night'];
    this.addPlanetXDistribution(
      ZodiacTheme.DAYNIGHTFORCEIDX,
      this.earthState,
      ZodiacTheme.DAYIDX,
      2,
      descrArr,
      'Planet.DayTime.Balanced'
    );
  }

  //Ref28bp329-330
  addPlanetEastWestDistribution() {
    const descrArr = ['Planet.EW.East', 'Planet.EW.West'];
    this.addPlanetXDistribution(
      ZodiacTheme.EASTWESTFORCEIDX,
      this.earthState,
      ZodiacTheme.EASTIDX,
      2,
      descrArr,
      'Planet.EW.Balanced'
    );
  }

  //Ref28bp329-330
  addPlanetSignTypeDistribution() {
    const descrArr = [
      'Planet.House.Cardinal',
      'Planet.House.Fix',
      'Planet.House.Mutable',
    ];
    this.addPlanetXDistribution(
      ZodiacTheme.CARDINALFIXMUTABLEFORCEIDX,
      this.earthState,
      ZodiacTheme.CARDINALIDX,
      3,
      descrArr,
      'Planet.House.Balanced'
    );
  }

  getQuadranNb(index: number) {
    if (index===ZodiacTheme.QUADRANT1IDX) {return 1;}
    if (index===ZodiacTheme.QUADRANT2IDX) {return 2;}
    if (index===ZodiacTheme.QUADRANT3IDX) {return 3;}
    if (index===ZodiacTheme.QUADRANT4IDX) {return 4;}
    return 0;
  }

  // Ref28bp320-324
  addPlanetQuadrantDistribution() {
    const quadrants = [0, 0, 0, 0];
    const header = 'Planet.Quarter.';
    let footer = '';
    let count = 0;
    let force = 0;
    for (let i = 0; i < 4; i++) {
      const currForce = this.earthState[i + ZodiacTheme.QUADRANT1IDX];
      if (currForce >= 10) {
        count++;
        footer = '.' + this.getQuadranNb(i + ZodiacTheme.QUADRANT1IDX);
        force = currForce / 2;
        break;
      } else {
        if (currForce > 7) {
          count++;
          force += currForce;
          quadrants[count] = this.getQuadranNb(i + ZodiacTheme.QUADRANT1IDX);
          footer = '.' + quadrants[count];
          if (count===2 && force > 14) {
            // Ref8bp323
            if (quadrants[0]===4 && quadrants[1]===2) {
              // Confrontation
              force = 4;
            } else {
              force = 7;
            }
            break;
          }
        } else {
          if (currForce > 6) {
            count++;
            force += currForce;
            quadrants[count] = this.getQuadranNb(i + ZodiacTheme.QUADRANT1IDX);
            footer = '.' + this.getQuadranNb(i + ZodiacTheme.QUADRANT1IDX);
            if (count===3) {
              force = force / 2 - 1;
              break;
            }
          }
        }
      }
    }
    if (count===0) {
      // Equiforce
      count = 4;
      footer = '';
      force = 10;
    }
    this.addSupportBaseComment(force, header + count + footer);
  }

  //Ref28bp325
  addPlanetSeasonDistribution() {
    const descrArr = ['Planet.Season.SS', 'Planet.Season.AW'];
    this.addPlanetXDistribution(
      ZodiacTheme.SEASONFORCEIDX,
      this.skyState,
      ZodiacTheme.SPRINGSUMMERIDX,
      2,
      descrArr,
      'Planet.Season.Balanced'
    );
  }

  addPlanetYinYangDistribution() {
    const descrArr = ['Planet.Energy.Yang', 'Planet.Energy.Yin'];
    this.addPlanetXDistribution(
      ZodiacTheme.YINYANGFORCEIDX,
      this.skyState,
      ZodiacTheme.YANGIDX,
      2,
      descrArr,
      'Planet.Energy.Balanced'
    );
  }

  //Ref28bp327-328
  addPlanetGenreDistribution() {
    const descrArr = [
      'Planet.Sign.Cardinal',
      'Planet.Sign.Fix',
      'Planet.Sign.Mutable',
    ];
    this.addPlanetXDistribution(
      ZodiacTheme.CARDINALFIXMUTABLEFORCEIDX,
      this.skyState,
      ZodiacTheme.CARDINALIDX,
      3,
      descrArr,
      'Planet.Sign.Balanced'
    );
  }

  //Ref28bp327-328+330
  addPlanetElementDistribution() {
    const descrArr = [
      'Planet.Element.Fire',
      'Planet.Element.Earth',
      'Planet.Element.Air',
      'Planet.Element.Water',
    ];
    const elementForce = [];
    for (let i = 0; i < 4; i++) {
      elementForce.push((
        this.skyState[i + ZodiacTheme.FIREIDX] +
          this.earthState[i + ZodiacTheme.FIREIDX])
       / 2);
    }
    this.addPlanetXDistribution(
      ZodiacTheme.ELEMENTFORCEIDX,
      elementForce,
      0,
      4,
      descrArr,
      'Planet.Element.Balanced'
    );
  }

  commentOnPlanetDistribution() {
    this.addAllPlanetHouseZodiacComment();

    // Earth state
    this.addPlanetDayTimeDistribution();
    this.addPlanetEastWestDistribution();
    this.addPlanetSignTypeDistribution();
    this.addPlanetQuadrantDistribution();

    // Sky state
    this.addPlanetSeasonDistribution();
    this.addPlanetYinYangDistribution();
    this.addPlanetGenreDistribution();

    // Common to sky and Earth state
    this.addPlanetElementDistribution();
  }

  getSeasonIndex(zodiac: Zodiac) {
    const season = zodiac.season;
    let idx = ZodiacTheme.AUTUMNWINTERIDX;
    if (season===Season.SPRING || season===Season.SUMMER)
      {idx = ZodiacTheme.SPRINGSUMMERIDX;}
    return idx;
  }

  getGenreIndex(zodiac: Zodiac) {
    let idx = ZodiacTheme.YANGIDX;
    if (zodiac.isYin()) {idx = ZodiacTheme.YINIDX;}
    return idx;
  }

  getZodiacTypeIndex(zodiac: Zodiac) {
    if (zodiac.isFix()) {return ZodiacTheme.FIXIDX;}
    if (zodiac.isMutable()) {return ZodiacTheme.MUTABLEIDX;}
    return ZodiacTheme.CARDINALIDX;
  }

  getElementIndex(zodiac: Zodiac) {
    const element = zodiac.element;
    if (element === Element.FIRE) {return ZodiacTheme.FIREIDX;}
    if (element===Element.WATER) {return ZodiacTheme.WATERIDX;}
    if (element===Element.METAL) {return ZodiacTheme.AIRIDX;}
    return ZodiacTheme.EARTHIDX;
  }

  getDayNightIndex(house: House) {
    if (ZodiacHelper.isNightHouse(house.nb)) {return ZodiacTheme.NIGHTIDX;}
    return ZodiacTheme.DAYIDX;
  }

  getEastWestIndex(house: House) {
    if (ZodiacHelper.isEastHouse(house.nb)) {return ZodiacTheme.EASTIDX;}
    return ZodiacTheme.WESTIDX;
  }

  getHouseTypeIndex(house: House) {
    if (ZodiacHelper.isCardinal(house.nb)) {return ZodiacTheme.CARDINALIDX;}
    if (ZodiacHelper.isFix(house.nb)) {return ZodiacTheme.FIXIDX;}
    return ZodiacTheme.MUTABLEIDX;
  }

  getQuadrantIndex(house: House) {
    const nb = ZodiacHelper.getHouseQuadrantNb(house.nb);
    if (nb===1) {return ZodiacTheme.QUADRANT1IDX;}
    if (nb===2) {return ZodiacTheme.QUADRANT2IDX;}
    if (nb===3) {return ZodiacTheme.QUADRANT3IDX;}
    if (nb===4) {return ZodiacTheme.QUADRANT4IDX;}
    return 0;
  }

  // Assume force normalized with max=10
  isBalanced(state: number[], fromIdx: number, count: number) {
    const mean = 10.0 / count;
    let res = true;
    for (let i = 0; i < count; i++) {
      if (state[i + fromIdx] > mean + 1) {res = false;}
      if (state[i + fromIdx] < mean - 1) {res = false;}
    }
    return res;
  }

  override initPoint() {
    // Ref28p325 sky force
    this.skyState = ObjectHelper.newArray(11, 0);
    this.earthState = ObjectHelper.newArray(11, 0);

    const planets = Planet.getValues();
    planets.forEach((p) => {
      if (p.ordinal() <= Planet.AS_PLANET) {
        const z = this.getPlanetZodiac(p);
        const points = p.points;
        if (z != null) {
          this.skyState[this.getSeasonIndex(z)] += points;
          this.skyState[this.getGenreIndex(z)] += points;
          this.skyState[this.getZodiacTypeIndex(z)] += points;
          this.skyState[this.getElementIndex(z)] += points;
        }
        if (p.ordinal() < Planet.AS_PLANET) {
          const house = this.getPlanetHouse(p);
          this.earthState[this.getDayNightIndex(house)] += points;
          this.earthState[this.getEastWestIndex(house)] += points;
          this.earthState[this.getHouseTypeIndex(house)] += points;
          this.earthState[this.getQuadrantIndex(house)] += points;
        }
      }
    });
    // Normalize
    for (let i = 0; i < this.skyState.length; i++) {
      this.skyState[i] = (this.skyState[i] * 10) / 24;
    }
    for (let i = 0; i < this.earthState.length; i++) {
      this.earthState[i] = (this.earthState[i] * 10) / 20;
    }

    // Based on Ref28bp325 ...
    let force = 6;
    if (this.isBalanced(this.skyState, ZodiacTheme.SPRINGSUMMERIDX, 2)) {
      force = 10;
    } else {
      force = 4;
    }
    this.stateForceArr[ZodiacTheme.SEASONFORCEIDX] = force;
    this.incPoints(force);
    if (this.isBalanced(this.skyState, ZodiacTheme.YANGIDX, 2)) {
      force = 10;
    } else {
      force = 4;
    }
    this.stateForceArr[ZodiacTheme.YINYANGFORCEIDX] = force;
    this.incPoints(force);
    if (this.isBalanced(this.skyState, ZodiacTheme.CARDINALIDX, 3)) {
      force = 10;
    } else {
      force = 4;
    }
    this.stateForceArr[ZodiacTheme.HOUSETYOEFORCEIDX] = force;
    this.incPoints(force);
    const elementForce = [];
    for (let i = 0; i < 4; i++) {
      elementForce.push((
        this.skyState[i + ZodiacTheme.FIREIDX] +
          this.earthState[i + ZodiacTheme.FIREIDX]
      ) / 2);
    }
    if (this.isBalanced(elementForce, 0, 4)) {
      force = 10;
    } else {
      force = 6;
    }
    this.stateForceArr[ZodiacTheme.ELEMENTFORCEIDX] = force;
    this.incPoints(force);
    if (this.isBalanced(this.earthState, ZodiacTheme.DAYIDX, 2)) {
      force = 10;
    } else {
      force = 4;
    }
    this.stateForceArr[ZodiacTheme.DAYNIGHTFORCEIDX] = force;
    this.incPoints(force);
    if (this.isBalanced(this.earthState, ZodiacTheme.EASTIDX, 2)) {
      force = 10;
    } else {
      force = 6;
    }
    this.stateForceArr[ZodiacTheme.EASTWESTFORCEIDX] = force;
    this.incPoints(force);
    if (this.isBalanced(this.earthState, ZodiacTheme.CARDINALIDX, 3)) {
      force = 10;
    } else {
      force = 6;
    }
    this.stateForceArr[ZodiacTheme.CARDINALFIXMUTABLEFORCEIDX] = force;
    this.incPoints(force);
  }

  override comment() {
    super.comment();
    this.commentOnPlanetDistribution();
    for (let houseNb = 1; houseNb <= 12; houseNb++) {
      const house = this.getHouse(houseNb);
      const observation = house.observation;
      observation.comment();
    }
  }

  override convertRawProp2Prop(): void {
      super.convertRawProp2Prop();
      this.houseArr.forEach((house) => {
        const observation = house.observation;
        observation.convertRawProp2Prop();
      });
  }
}
