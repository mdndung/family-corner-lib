import { ElementNEnergy } from './elementNenergy';
import { EnumBaseClass } from '../enumBaseClass';
import { Trigram } from './trigram';
import { Direction } from './direction';
import { Star } from './star';
import { Trunk } from '../bazi/trunk';
import { Branche } from '../bazi/branche';
import { MountainType } from './mountainType';

export class Mountain extends EnumBaseClass {

    static REN = new Mountain('REN', ElementNEnergy.WATERYANG, Trigram.LI, Trigram.KUN, Trigram.KAN, Direction.N1, Direction.S1, Star.JU_MEN, 1, Trunk.YI, Branche.PIG, MountainType.TRUNK); // NHAM
    static ZI = new Mountain('ZI', ElementNEnergy.WATERYANG, Trigram.KAN, Trigram.KUN, Trigram.KAN, Direction.N2, Direction.S2, Star.TAN_LANG, 2, Trunk.JIA, Branche.RAT, MountainType.BRANCHE); // TY
    static GUI = new Mountain('GUI', ElementNEnergy.WATERYIN, Trigram.KAN, Trigram.KUN, Trigram.KAN, Direction.N3, Direction.S3, Star.TAN_LANG, 3, Trunk.JIA, Branche.RAT, MountainType.TRUNK);// QUY

    static CHOU = new Mountain('CHOU', ElementNEnergy.EARTHYIN, Trigram.DUI, Trigram.ZHEN, Trigram.GEN, Direction.NE1, Direction.SW1, Star.PO_JUN, 1, Trunk.YI, Branche.OX, MountainType.BRANCHE); // SUU
    static GEN = new Mountain('GEN', ElementNEnergy.EARTHYANG, Trigram.GEN, Trigram.ZHEN, Trigram.GEN, Direction.NE2, Direction.SW2, Star.PO_JUN, 2, Trunk.YI, Branche.OX, MountainType.TRIGRAM); // CAN
    static YIN = new Mountain('YIN', ElementNEnergy.WOODYANG, Trigram.LI, Trigram.ZHEN, Trigram.GEN, Direction.NE3, Direction.SW3, Star.ZUO_FU, 3, Trunk.JIA, Branche.TIGER, MountainType.BRANCHE); // DAN

    static JIA = new Mountain('JIA', ElementNEnergy.WOODYANG, Trigram.QIAN, Trigram.LI, Trigram.ZHEN, Direction.E1, Direction.W1, Star.TAN_LANG, 1, Trunk.JIA, Branche.TIGER, MountainType.TRUNK); // GIAP
    static MAO = new Mountain('MAO', ElementNEnergy.WOODYIN, Trigram.ZHEN, Trigram.LI, Trigram.ZHEN, Direction.E2, Direction.W2, Star.JU_MEN, 2, Trunk.YI, Branche.RABBIT, MountainType.BRANCHE); // MAO
    static YI = new Mountain('YI', ElementNEnergy.WOODYIN, Trigram.KUN, Trigram.LI, Trigram.ZHEN, Direction.E3, Direction.W3, Star.JU_MEN, 3, Trunk.YI, Branche.RABBIT, MountainType.TRUNK); // AT

    static CHEN = new Mountain('CHEN', ElementNEnergy.EARTHYANG, Trigram.KAN, Trigram.DUI, Trigram.XUN, Direction.SE1, Direction.NW1, Star.WU_QU, 1, Trunk.JIA, Branche.DRAGON, MountainType.BRANCHE); // THIN
    static XUN = new Mountain('XUN', ElementNEnergy.WOODYIN, Trigram.XUN, Trigram.DUI, Trigram.XUN, Direction.SE2, Direction.NW2, Star.WU_QU, 2, Trunk.JIA, Branche.DRAGON, MountainType.TRIGRAM); // TON
    static SI = new Mountain('SI', ElementNEnergy.FIREYIN, Trigram.DUI, Trigram.DUI, Trigram.XUN, Direction.SE3, Direction.NW3, Star.WU_QU, 3, Trunk.YI, Branche.SNAKE, MountainType.BRANCHE);// TY

    static BING = new Mountain('BING', ElementNEnergy.FIREYANG, Trigram.GEN, Trigram.QIAN, Trigram.LI, Direction.S1, Direction.N1, Star.PO_JUN, 1, Trunk.YI, Branche.SNAKE, MountainType.TRUNK); // BINH
    static WU = new Mountain('WU', ElementNEnergy.FIREYANG, Trigram.LI, 
    Trigram.QIAN, Trigram.LI, Direction.S2, Direction.N2, Star.ZUO_FU, 2, Trunk.JIA, Branche.HORSE, MountainType.BRANCHE);// NGO
    static DING = new Mountain('DING', ElementNEnergy.FIREYIN, Trigram.DUI, Trigram.QIAN, Trigram.LI, Direction.S3, Direction.N3, Star.ZUO_FU, 3, Trunk.JIA, Branche.HORSE, MountainType.TRUNK);// DING

    static WEI = new Mountain('WEI', ElementNEnergy.EARTHYIN, Trigram.ZHEN, Trigram.XUN, Trigram.KUN, Direction.SW1, Direction.NE1, Star.JU_MEN, 1, Trunk.YI, Branche.GOAT, MountainType.BRANCHE); // MUI
    static KUN = new Mountain('KUN', ElementNEnergy.EARTHYIN, Trigram.KUN, Trigram.XUN, Trigram.KUN, Direction.SW2, Direction.NE2, Star.JU_MEN, 2, Trunk.YI, Branche.GOAT, MountainType.TRIGRAM); // KHON
    static SHEN = new Mountain('SHEN', ElementNEnergy.METALYANG, Trigram.KAN, Trigram.XUN, Trigram.KUN, Direction.SW3, Direction.NE3, Star.TAN_LANG, 3, Trunk.JIA, Branche.MONKEY, MountainType.BRANCHE);// THAN

    static GENG = new Mountain('GENG', ElementNEnergy.METALYANG, Trigram.ZHEN, Trigram.KAN, Trigram.DUI, Direction.W1, Direction.E1, Star.ZUO_FU, 1, Trunk.JIA, Branche.MONKEY, MountainType.TRUNK); // CANH
    static YOU = new Mountain('YOU', ElementNEnergy.METALYIN, Trigram.DUI, Trigram.KAN, Trigram.DUI, Direction.W2, Direction.E2, Star.PO_JUN, 2, Trunk.YI, Branche.COCK, MountainType.BRANCHE); // DAU
    static XIN = new Mountain('XIN', ElementNEnergy.METALYIN, Trigram.XUN, Trigram.KAN, Trigram.DUI, Direction.W3, Direction.E3, Star.PO_JUN, 3, Trunk.YI, Branche.COCK, MountainType.TRUNK);// TAN

    static XU = new Mountain('XU', ElementNEnergy.EARTHYANG, Trigram.LI, Trigram.GEN, Trigram.QIAN, Direction.NW1, Direction.SE1, Star.WU_QU, 1, Trunk.JIA, Branche.DOG, MountainType.BRANCHE); // TUAT
    static QIAN = new Mountain('QIAN', ElementNEnergy.METALYANG, Trigram.QIAN, Trigram.GEN, Trigram.QIAN, Direction.NW2, Direction.SE2, Star.WU_QU, 2, Trunk.JIA, Branche.DOG, MountainType.TRIGRAM); // KIEN
    static HAI = new Mountain('HAI', ElementNEnergy.WATERYIN, Trigram.ZHEN, Trigram.GEN, Trigram.QIAN, Direction.NW3, Direction.SE3, Star.WU_QU, 3, Trunk.YI, Branche.PIG, MountainType.BRANCHE);// HOI


    tienThienTrigram: Trigram;
    hauThienTrigram: Trigram;
    najiaTrigram: Trigram; // Ref14 p155
    mountainDirection: Direction;
    faceDirection: Direction;
    onLimitReplacementstar: Star;
    posJiKing: number;
    partitionTrunk: Trunk;
    partitionBranche: Branche;
    mountainType: MountainType;
    moutainEnE: ElementNEnergy;

    constructor(
        name: string,
        moutainEnE: ElementNEnergy, najiaTrigram: Trigram, tienThienTrigram: Trigram,
        hauThienTrigram: Trigram,
        mountainDirection: Direction, faceDirection: Direction, star: Star, pos: number,
        trunk: Trunk, branche: Branche, mountainType: MountainType) {
        super(name);
        this.moutainEnE = moutainEnE;
        this.hauThienTrigram = hauThienTrigram;
        this.tienThienTrigram = tienThienTrigram;
        this.mountainDirection = mountainDirection;
        this.faceDirection = faceDirection;
        this.onLimitReplacementstar = star;
        this.posJiKing = pos;
        this.partitionTrunk = trunk;
        this.partitionBranche = branche;
        this.mountainType = mountainType;
        this.najiaTrigram = najiaTrigram;
    }

    static getValues(): Mountain[] {
        return Mountain.REN.getValues() as Mountain[];
      }

    override getClassName() { return 'Mountain'; }

    override getViewColorName() {
        return this.moutainEnE.getViewColorName();
      }
    
}