
import { ObjectHelper } from '../../../helper/objectHelper';
import { ZodiacHelper } from '../../../helper/zodiacHelper';
import { Planet } from '../planet';
import { ZodiacTheme } from '../zodiacTheme';
import { HouseObservation } from './houseObservation';

export class House {

  nb: number= null;
  start: number= null;
  end: number= null;
  theme: ZodiacTheme= null;
  planets: Planet[]= null;
  prevHouse: House= null;
  nextHouse: House= null;
  observation: HouseObservation= null;

  constructor(nb: number, start: number, end: number, theme: ZodiacTheme) {
    this.nb = nb;
    this.start = start;
    if (end < start) {end = 360.0 + end;}
    this.end = end;
    this.theme=theme;
    this.observation = ZodiacHelper.getHouseObservation(theme, this);
    this.planets = [];
  }

  getName() {
    return 'House nb '+this.nb + ' '+ this.theme.birthZodiac+ ' '+ this.start + '-'+ this.end ;
  }

  isinHouse(degree: number) {
    return this.getCuspide() <= degree && degree < this.end;
  }

  addPlanet(p: Planet) {
    if (ObjectHelper.isNaN(p)) {return;}
    if (p.isVirtual()) {return;}
    ObjectHelper.pushIfNotExist(this.planets, p);
  }

  getCuspide() {
    return this.start;
  }

  getZodiac() {
    return ZodiacHelper.getZodiac(this.getCuspide());
  }

  contains(planet: Planet) {
    return ObjectHelper.hasItem(this.planets, planet);
  }

  getGoverner() {
    return  ZodiacHelper.getGoverner(this.getZodiac());
  }


  getOppositeHouse() {
    let opNb =Math.trunc(( this.nb + 6 ) %12) ;
    if ( opNb===0 ) {opNb = 12 ;}
    return this.theme.getHouse(opNb);
}

}
