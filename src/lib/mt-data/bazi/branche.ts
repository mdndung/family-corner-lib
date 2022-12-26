/* eslint-disable @typescript-eslint/naming-convention */
import { ElementNEnergy } from '../feng-shui/elementNenergy';
import { Trigram } from '../feng-shui/trigram';
import { Season } from './season';
import { EnumBaseClass } from '../enumBaseClass';
import { Energy } from '../feng-shui/energy';
import { Trunk } from './trunk';

export class Branche extends EnumBaseClass {

  static  RAT= new Branche('RAT',ElementNEnergy.WATERYANG,1,6,8, Trigram.KAN, Season.WINTER,'23-01');
  static  OX= new Branche('OX',ElementNEnergy.EARTHYIN,5,10,5, Trigram.GEN, Season.WINTER,'01-03');
  static  TIGER= new Branche('TIGER',ElementNEnergy.WOODYANG,3,8,2, Trigram.GEN, Season.SPRING,'03-05');
  static  RABBIT= new Branche('RABBIT',ElementNEnergy.WOODYIN,3,8,8, Trigram.ZHEN, Season.SPRING,'05-07');
  static  DRAGON= new Branche('DRAGON',ElementNEnergy.EARTHYANG,5,10,5, Trigram.XUN, Season.SPRING,'07-09');
  static  SNAKE= new Branche('SNAKE',ElementNEnergy.FIREYIN,2,7,2, Trigram.XUN, Season.SUMMER,'09-11');
  static  HORSE= new Branche('HORSE',ElementNEnergy.FIREYANG,2,7,8, Trigram.LI, Season.SUMMER,'11-13');
  static  GOAT= new Branche('GOAT',ElementNEnergy.EARTHYIN,5,10,5, Trigram.KUN, Season.SUMMER,'13-15');
  static  MONKEY= new Branche('MONKEY',ElementNEnergy.METALYANG,4,9,2, Trigram.KUN, Season.AUTUMN,'15-17');
  static  COCK= new Branche('COCK',ElementNEnergy.METALYIN,4,9,8, Trigram.DUI, Season.AUTUMN,'17-19');
  static  DOG= new Branche('DOG',ElementNEnergy.EARTHYANG,5,10,5, Trigram.QIAN, Season.AUTUMN,'19-21');
  static  PIG= new Branche('PIG',ElementNEnergy.WATERYIN,1,6,2, Trigram.QIAN, Season.WINTER,'21-23');


  elementNEnergy: ElementNEnergy;
  earthNb1: number;
  earthNb2: number;
  januaryStarNb: number;
  trigram: Trigram;
  season: Season;
  hourRange: string;


  constructor(name: string, eNe: ElementNEnergy, earthNb1: number,
    earthNb2: number, januaryStarNb: number,
    trigram: Trigram, season: Season,hourRange: string) {
    super(name);
    this.elementNEnergy=eNe;
    this.earthNb1=earthNb1;
    this.earthNb2=earthNb2;
    this.januaryStarNb=januaryStarNb;
    this.trigram=trigram;
    this.season=season;
    this.hourRange=hourRange;
  }

  static getValues(): Branche[] {
    return Branche.RAT.getValues() as Branche[];
  }

  override getClassName() {return 'Branche';}

  getEnergy() { return this.elementNEnergy.energy; }

  getElement(){
    return this.elementNEnergy.element;
  }


  getHourEnergy() {
    let res = Energy.YIN;
    // TY SUU DAN MAO THIN TY'hour is Yang
    if ( this.ordinal()<= Branche.SNAKE.ordinal() ) {
      res = Energy.YANG;
    }
    return res ;
  }


}
