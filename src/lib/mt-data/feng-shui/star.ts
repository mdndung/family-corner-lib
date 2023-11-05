import { ElementNEnergy } from './elementNenergy';
import { EnumBaseClass } from '../enumBaseClass';
import { Trigram } from './trigram';
import { Direction } from './direction';

export class Star extends EnumBaseClass {

    static ZERO = new Star('ZERO', null, null, null, null, false); // Not used theorically. Is there to allow matching ordinal with star number
    static TAN_LANG = new Star('TAN_LANG', Direction.N, Trigram.KUN, Trigram.KAN, ElementNEnergy.WATERYANG, true); // Tham lang
    static JU_MEN = new Star('JU_MEN', Direction.SW, Trigram.XUN, Trigram.KUN, ElementNEnergy.EARTHYIN, true); // Cu mon
    static LU_CUN = new Star('LU_CUN', Direction.E, Trigram.LI, Trigram.ZHEN, ElementNEnergy.WOODYANG, false); // Loc ton
    static WEN_QU = new Star('WEN_QU', Direction.SE, Trigram.DUI, Trigram.XUN, ElementNEnergy.WOODYIN, false); // Van khuc
    static LIAN_ZHEN = new Star('LIAN_ZHEN', null, null, null, ElementNEnergy.EARTHYANG, false); // Liem trinh
    static WU_QU = new Star('WU_QU', Direction.NW, Trigram.GEN, Trigram.QIAN, ElementNEnergy.METALYANG, true); // Vu khuc
    static PO_JUN = new Star('PO_JUN', Direction.W, Trigram.KAN, Trigram.DUI, ElementNEnergy.METALYIN, false); // Pha quan
    static ZUO_FU = new Star('ZUO_FU', Direction.NE, Trigram.ZHEN, Trigram.GEN, ElementNEnergy.EARTHYANG, true); // Ta phu
    static JOU_BI = new Star('JOU_BI', Direction.S, Trigram.QIAN, Trigram.LI, ElementNEnergy.FIREYIN, true); // Huu bat


      direction: Direction;
      trigramTienThien: Trigram;
      trigramHauThien: Trigram;
      elementNEnergy: ElementNEnergy;
      color: string;
    // Ref14 p161
      isFavorableStar: boolean;

    constructor(name: string, direction: Direction, trigramTienThien: Trigram, trigramHauThien: Trigram,
        elementNEnergy: ElementNEnergy, isFavorableStar: boolean) {
        super(name)
        this.direction = direction;
        this.trigramHauThien = trigramHauThien;
        this.trigramTienThien = trigramTienThien;
        this.elementNEnergy = elementNEnergy;
        if (null !== elementNEnergy) this.color = elementNEnergy.getViewColorName();
        this.isFavorableStar = isFavorableStar;
    }

    override getClassName() { return 'Star'; }


  static getValues(): Star[] {
    return Star.JOU_BI.getValues() as Star[];
  }

  override getViewColorName(): string {
    return this.elementNEnergy.getViewColorName()
  }


}