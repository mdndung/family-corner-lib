/* eslint-disable @typescript-eslint/naming-convention */
import { ElementNEnergy } from './elementNenergy';
import { EnumBaseClass } from '../enumBaseClass';

export class Direction extends EnumBaseClass {

  static  N= new Direction('N',337.5, 22.5,true,ElementNEnergy.WATERYIN,10);

  static  N1= new Direction('N1',337.5, 352.5,true,ElementNEnergy.WATERYANG,11);
  static  N2= new Direction('N2',352.5, 7.5, true,ElementNEnergy.WATERYANG,12);
  static  N3= new Direction('N3',7.5, 22.5, true,ElementNEnergy.WATERYIN,13);

  static  NE= new Direction('NE',22.5, 67.5,false,ElementNEnergy.EARTHYIN,80);

  static  NE1= new Direction('NE1',22.5, 37.5,false,ElementNEnergy.EARTHYIN,81);
  static  NE2= new Direction('NE2',37.5, 52.5,false,ElementNEnergy.EARTHYIN,82);
  static  NE3= new Direction('NE3',52.5, 67.5,false,ElementNEnergy.WOODYANG,83);

  static  E= new Direction('E',67.5, 112.5,true,ElementNEnergy.WOODYIN,30);

  static  E1= new Direction('E1',67.5, 82.5,true,ElementNEnergy.WOODYANG,31);
  static  E2= new Direction('E2',82.5, 97.5,true,ElementNEnergy.WOODYIN,32);
  static  E3= new Direction('E3',97.5, 112.5,true,ElementNEnergy.WOODYIN,33);

  static  SE= new Direction('SE',112.5, 157.5,true,ElementNEnergy.WOODYANG,90);

  static  SE1= new Direction('SE1',112.5, 127.5,true,ElementNEnergy.EARTHYANG,91);
  static  SE2= new Direction('SE2',127.5, 142.5,true,ElementNEnergy.WOODYIN,92);
  static  SE3= new Direction('SE3',142.5, 157.5,true,ElementNEnergy.FIREYIN,93);

  static  S= new Direction('S',157.5, 202.5,true,ElementNEnergy.FIREYANG,40);

  static  S1= new Direction('S1',157.5, 172.5, true,ElementNEnergy.FIREYIN,41);
  static  S2= new Direction('S2',172.5, 187.5, true,ElementNEnergy.FIREYANG,42);
  static  S3= new Direction('S3',187.5, 202.5,true,ElementNEnergy.FIREYIN,43);

  static  SW= new Direction('SW',202.5, 247.5,false,ElementNEnergy.EARTHYANG,20);

  static  SW1= new Direction('SW1',202.5, 217.5,false,ElementNEnergy.EARTHYIN,21);
  static  SW2= new Direction('SW2',217.5, 232.5,false,ElementNEnergy.EARTHYANG,22);
  static  SW3= new Direction('SW3',232.5, 247.5,false,ElementNEnergy.METALYANG,23);

  static  W= new Direction('W',247.5, 292.5,false,ElementNEnergy.METALYANG,70);

  static  W1= new Direction('W1',247.5, 262.5,false,ElementNEnergy.METALYIN,71);
  static  W2= new Direction('W2',262.5, 277.5,false,ElementNEnergy.METALYIN,72);
  static  W3= new Direction('W3',277.5, 292.5,false,ElementNEnergy.METALYIN,73);

  static  NW= new Direction('NW',292.5, 337.5,false,ElementNEnergy.METALYIN,60);

  static  NW1= new Direction('NW1',292.5, 307.5, false,ElementNEnergy.EARTHYANG,61);
  static  NW2= new Direction('NW2',307.5, 322.5,false,ElementNEnergy.METALYANG,62);
  static  NW3= new Direction('NW3',322.5, 337.5,false,ElementNEnergy.WATERYIN,63);


  from: number;
  to: number;
  eastHouse: boolean;
  elementNEnergy: ElementNEnergy;
  directionNbAndSkyManEarthNumber: number;


  constructor(
    name: string, from: number, to: number, eastHouse: boolean,
    eNe: ElementNEnergy, order: number) {
    super(name);
    this.from=from;
    this.to=to;
    this.eastHouse=eastHouse;
    this.elementNEnergy=eNe;
    this.directionNbAndSkyManEarthNumber=order;
  }

  override getClassName() {return 'Direction';}

  override getViewColorName() {
    return this.elementNEnergy.getViewColorName();
  }
}
