/* eslint-disable @typescript-eslint/naming-convention */
import { Direction } from './direction';
import { ElementNEnergy } from './elementNenergy';
import { EnumBaseClass } from '../enumBaseClass';


export class Trigram extends EnumBaseClass  {

  static  KAN= new Trigram('KAN',6,1, Direction.W,Direction.N, 271, 0,ElementNEnergy.WATERYANG,'345°-30°');
  static  KUN= new Trigram('KUN',8,2, Direction.N,Direction.SW, -1, -1,ElementNEnergy.EARTHYIN,'210°-255°');
  static  ZHEN= new Trigram('ZHEN',4,3, Direction.NE,Direction.E, 1, 90,ElementNEnergy.WOODYANG,'75°-120°');
  static  XUN= new Trigram('XUN',5,4, Direction.SW,Direction.SE, -1, -1,ElementNEnergy.WOODYIN,'120°-165°');
  static  QIAN= new Trigram('QIAN',1,6,Direction.S,Direction.NW, -1, -1,ElementNEnergy.METALYANG,'300°-345°');
  static  DUI= new Trigram('DUI',2,7, Direction.SE,Direction.W, 181, 270,ElementNEnergy.METALYIN,'255°-300°');
  static  GEN= new Trigram('GEN',7,8, Direction.NW,Direction.NE,-1,-1,ElementNEnergy.EARTHYANG,'30°-75°');
  static  LI= new Trigram('LI',3,9,Direction.E,Direction.S,91, 180,ElementNEnergy.FIREYIN,'165°-210°');

  tienThienNb: number;
  hauthienNb: number;
  directionHauThien: Direction;
  directionTienThien: Direction;
  solarTermFrom: number;
  solarTermTo: number;
  elementNEnergy: ElementNEnergy;
  waterDegreeDirection: string;

  constructor(
    name: string, tienThienNb: number, hauThienNb: number,
    directionTT: Direction,directionHauThien: Direction,
    solarTermFrom: number, solarTermTo: number,
    eNe: ElementNEnergy,waterDegreeDirection: string
,
    ) {
    super(name);
    this.tienThienNb=tienThienNb;
    this.hauthienNb=hauThienNb;
    this.directionHauThien=directionHauThien;
    this.directionTienThien=directionTT;
    this.solarTermFrom=solarTermFrom;
    this.solarTermTo=solarTermTo;
    this.elementNEnergy=eNe;
    this.waterDegreeDirection=waterDegreeDirection;
  }
  static getValues(): Trigram[] {
    return Trigram.KAN.getValues() as Trigram[];
  }

  override getClassName() {return 'Trigram';}

  getElement() { return this.elementNEnergy.element; }

  getEnergy() { return this.elementNEnergy.energy;}



}
