/* eslint-disable @typescript-eslint/naming-convention */
import { ElementNEnergy } from './elementNenergy';
import { EnumBaseClass } from '../enumBaseClass';

export class Direction extends EnumBaseClass {

  static N = new Direction('N', 337.5, 22.5, true, ElementNEnergy.WATERYIN, 10);

  static N1 = new Direction('N1', 337.5, 352.5, true, ElementNEnergy.WATERYANG, 11);
  static N2 = new Direction('N2', 352.5, 7.5, true, ElementNEnergy.WATERYANG, 12);
  static N3 = new Direction('N3', 7.5, 22.5, true, ElementNEnergy.WATERYIN, 13);

  static NE = new Direction('NE', 22.5, 67.5, false, ElementNEnergy.EARTHYIN, 80);

  static NE1 = new Direction('NE1', 22.5, 37.5, false, ElementNEnergy.EARTHYIN, 81);
  static NE2 = new Direction('NE2', 37.5, 52.5, false, ElementNEnergy.EARTHYIN, 82);
  static NE3 = new Direction('NE3', 52.5, 67.5, false, ElementNEnergy.WOODYANG, 83);

  static E = new Direction('E', 67.5, 112.5, true, ElementNEnergy.WOODYIN, 30);

  static E1 = new Direction('E1', 67.5, 82.5, true, ElementNEnergy.WOODYANG, 31);
  static E2 = new Direction('E2', 82.5, 97.5, true, ElementNEnergy.WOODYIN, 32);
  static E3 = new Direction('E3', 97.5, 112.5, true, ElementNEnergy.WOODYIN, 33);

  static SE = new Direction('SE', 112.5, 157.5, true, ElementNEnergy.WOODYANG, 90);

  static SE1 = new Direction('SE1', 112.5, 127.5, true, ElementNEnergy.EARTHYANG, 91);
  static SE2 = new Direction('SE2', 127.5, 142.5, true, ElementNEnergy.WOODYIN, 92);
  static SE3 = new Direction('SE3', 142.5, 157.5, true, ElementNEnergy.FIREYIN, 93);

  static S = new Direction('S', 157.5, 202.5, true, ElementNEnergy.FIREYANG, 40);

  static S1 = new Direction('S1', 157.5, 172.5, true, ElementNEnergy.FIREYIN, 41);
  static S2 = new Direction('S2', 172.5, 187.5, true, ElementNEnergy.FIREYANG, 42);
  static S3 = new Direction('S3', 187.5, 202.5, true, ElementNEnergy.FIREYIN, 43);

  static SW = new Direction('SW', 202.5, 247.5, false, ElementNEnergy.EARTHYANG, 20);

  static SW1 = new Direction('SW1', 202.5, 217.5, false, ElementNEnergy.EARTHYIN, 21);
  static SW2 = new Direction('SW2', 217.5, 232.5, false, ElementNEnergy.EARTHYANG, 22);
  static SW3 = new Direction('SW3', 232.5, 247.5, false, ElementNEnergy.METALYANG, 23);

  static W = new Direction('W', 247.5, 292.5, false, ElementNEnergy.METALYANG, 70);

  static W1 = new Direction('W1', 247.5, 262.5, false, ElementNEnergy.METALYIN, 71);
  static W2 = new Direction('W2', 262.5, 277.5, false, ElementNEnergy.METALYIN, 72);
  static W3 = new Direction('W3', 277.5, 292.5, false, ElementNEnergy.METALYIN, 73);

  static NW = new Direction('NW', 292.5, 337.5, false, ElementNEnergy.METALYIN, 60);

  static NW1 = new Direction('NW1', 292.5, 307.5, false, ElementNEnergy.EARTHYANG, 61);
  static NW2 = new Direction('NW2', 307.5, 322.5, false, ElementNEnergy.METALYANG, 62);
  static NW3 = new Direction('NW3', 322.5, 337.5, false, ElementNEnergy.WATERYIN, 63);


  static EARTH_ORDER = 1;
  static MAN_ORDER = 2;
  static SKY_ORDER = 3;

  from: number;
  to: number;
  eastHouse: boolean;
  elementNEnergy: ElementNEnergy;
  directionNbAndSkyManEarthNumber: number;


  static guaOmenValue: number[][] = [
    // GUA 0 Never used
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // GUA 1
    [60, 70, 60, 70, -70, -60, -70, 70, 80, -80, 80, -90, 90, 60, 90, -60, 70, -70, 70, -60, -90, 80, -90, 60, -60, 80, -60, 90, -80, 70, -80, 80],
    // GUA 2
    [-90, -80, -90, -90, 90, 80, 90, -80, -60, 70, -60, 60, -70, -90, -70, 80, -80, 90, -80, 80, 60, -60, 60, -90, 80, -60, 80, -70, 70, -80, 70, -60],
    // GUA 3
    [80, 90, 80, 90, -80, -90, -80, 90, 60, -70, 60, -60, 70, 80, 70, -90, 90, -80, 90, -90, -60, 60, -60, 80, -90, 60, -90, 70, -70, 90, -70, 60],
    // GUA 4
    [90, 80, 90, 90, -90, -80, -90, 80, 70, -60, 70, -70, 60, 90, 60, -80, 80, -90, 80, -80, -70, 70, -70, 90, -80, 70, -80, 60, -60, 80, -60, 70],
    // GUA 5 Never used
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // GUA 6
    [-80, -90, -80, -80, 80, 90, 80, -90, -70, 60, -70, 70, -60, -80, -60, 90, -90, 80, -90, 90, 70, -70, 70, -80, 90, -70, 90, -60, 60, -90, 60, -70],
    // GUA 7
    [-60, -70, -60, -70, 70, 60, 70, -70, -90, 90, -90, 80, -80, -60, -80, 60, -70, 70, -70, 60, 80, -90, 80, -60, 60, -90, 60, -80, 90, -70, 90, -90],
    // GUA 8
    [-70, -60, -70, -70, 60, 70, 60, -60, -80, 80, -80, 90, -90, -70, -90, 70, -60, 60, -60, 70, 90, -80, 90, -70, 70, -80, 70, -90, 80, -60, 80, -80],
    // GUA 9 
    [70, 60, 70, 70, -60, -70, -60, 60, 90, -90, 90, -80, 80, 70, 80, -70, 60, -60, 60, -70, -80, 90, -80, 70, -70, 90, -70, 80, -90, 60, -90, 90],
  ];

  public static normalizeAngle(degree: number): number {
    while (degree < 0)
      degree = degree + 360;
    return degree % 360;
  }

   static  isDirectionSouth( degree: number): boolean{
		return (degree >= Direction.S.from)
				&& (degree <= Direction.S.to);
	}

	 static  isDirectionNorth( degree: number): boolean {
		return (degree >= Direction.N.from)
				|| (degree <= Direction.N.to);
	}
  constructor(
    name: string, from: number, to: number, eastHouse: boolean,
    eNe: ElementNEnergy, order: number) {
    super(name);
    this.from = from;
    this.to = to;
    this.eastHouse = eastHouse;
    this.elementNEnergy = eNe;
    this.directionNbAndSkyManEarthNumber = order;
  }

  override getClassName() { return 'Direction'; }

  static getValues(): Direction[] {
    return Direction.S.getValues() as Direction[];
  }

  override getViewColorName() {
    return this.elementNEnergy.getViewColorName();
  }


  public getMiddleAngle(): number {
    let res = 0;
    if (this.to > this.from) {
      res = (this.to + this.from) / 2;
    } else {
      res = 0;
    }
    return res;
  }


  getOmenValue(gua: number): number {
    return Direction.guaOmenValue[gua][this.ordinal()];
  }


  getAngle(): number {
    let res = 0;
    if (this.to > this.from) {
      res = this.to - this.from;
    } else {
      res = (360 - this.from) + this.to;
    }
    return res;
  }

  getMainDirection(): Direction {
    const directions = Direction.getValues()
    let d = this.getNextNElement(directions, 0) as Direction;
    while (d.getAngle() == 15.0) {
      d = d.getNextNElement(directions, -1) as Direction;
    }
    return d;
  }

  getDegreeMainDirection(degree: number): Direction {
    let mDegree = Direction.normalizeAngle(degree);
    const directions = Direction.getValues()
    for (let index = 0; index < directions.length; index++) {
      const dir = directions[index];
      if (dir.getAngle() > 15.0) {
        if (dir.from < dir.to) {
          if (mDegree >= dir.from && mDegree <= dir.to) {
            return dir;
          }
        } else {
          // North case
          if (mDegree >= dir.from || mDegree <= dir.to) {
            return dir;
          }
        }
      }
    }
    // Never happened
    return null;
  }

  // Return the direction order (Dia nguyen Long, Nhan nguyen Long and Thien Nguyen Long
  getSkyManEarthNumber() {
    return this.directionNbAndSkyManEarthNumber % 10;
  }

  isDirect(starNb: number, period: number) {

    const isEarthGroup = this.getSkyManEarthNumber() === Direction.EARTH_ORDER;
    let res = false;
    if (starNb != 5) {
      if (isEarthGroup) {
        res = starNb % 2 == 1;
      } else {
        res = starNb % 2 == 0;
      }
    } else {
      if (period % 2 == 1) {
        res = isEarthGroup;
      } else {
        res = !isEarthGroup;
      }
    }
    return res;
  }


}
