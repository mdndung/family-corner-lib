
import { BaziHelper } from '../helper/baziHelper';
import { ObjectHelper } from '../helper/objectHelper';
import { PivotHelper } from '../helper/pivot-helper';
import { QiHelper } from '../helper/qiHelper';
import { TrunkHelper } from '../helper/trunkHelper';
import { SecDeityAttr } from '../mt-data/bazi/SecDeityAttr';
import { Branche } from '../mt-data/bazi/branche';
import { Lunar } from '../mt-data/bazi/lunar';
import { LunarBase } from '../mt-data/bazi/lunarBase';
import { SecondaryDeity } from '../mt-data/bazi/secondaryDeity';
import { Trunk } from '../mt-data/bazi/trunk';
import { ElementRelation } from '../mt-data/feng-shui/element-relation';
import { Energy } from '../mt-data/feng-shui/energy';
import { Trigram } from '../mt-data/feng-shui/trigram';
import { DataWithLog } from '../mt-data/qi/dataWithLog';
import { QiForce } from '../mt-data/qi/qi-force';
import { QiType } from '../mt-data/qi/qi-type';
import { QiTypeDataRec } from '../mt-data/qi/qi-type-data-rec';
import { YiJing } from '../mt-data/yi-jing/yijing';

export class YiJingAttr {
  currYiJing?: YiJing = null ;
  qiTypeData?: QiTypeDataRec = null;
  lunar: Lunar= null;
  isFavorable = false;
  secDeitiesAttr: SecDeityAttr[]= null;
  locThanTrunk: Trunk[]= null;
  favorableCount: number= null;
  totalCount: number= null;
  favorableForce: number= null;
  currBaseForce: QiTypeDataRec= null;

  constructor(lunar: Lunar, yiJing: YiJing, baseQiForce: QiTypeDataRec) {
    this.lunar = lunar;
    this.currYiJing=yiJing;
    this.secDeitiesAttr=SecondaryDeity.evalSecondaryDeity(lunar,lunar);
    this.locThanTrunk=SecondaryDeity.evalLocThanTrunk(lunar,lunar);
    this.initThemeQiForce(baseQiForce);
    this.evalFavorable();
  }

   getBirthSeasonTriGramForce() {
    const bMonthTrigram = QiHelper.getBirthMonthTrigram(this.lunar);
    const bDate = this.lunar.birthDate;
    let force = 0;
    let trigram: Trigram = null;
    const mTrunk = TrunkHelper.getMonthTrunk(
      this.lunar.pilars[LunarBase.YINDEX].trunk,
      bDate.getChineseMonth()
    );
    switch (mTrunk) {
      case Trunk.WU:
        trigram = Trigram.KAN;
        break;
      case Trunk.GENG:
        trigram = Trigram.ZHEN;
        break;
      case Trunk.JI:
        trigram = Trigram.LI;
        break;
      case Trunk.DING:
        trigram = Trigram.DUI;
        break;
    }

    if (trigram !== null) {
      force = QiForce.FAVORABLE.force;
    } else {
      if (QiHelper.hasHoaCong(this.currYiJing, bMonthTrigram)) {
        force = QiForce.FAVORABLE.force;
      }
    }
    return force;
  }

  //Ref4 p23,24
   getYearTrigramStatus(baseTrigram: Trigram) {
    if ( baseTrigram===null ) {
      console.log("getYearTrigramStatus baseTrigram null")
      return 0 
    }
    const trigram = this.lunar.getyTrunk().trigram;
    let force = 0;
    if (baseTrigram.isEqual(trigram)) {
      force = QiForce.FAVORABLE.force;
    }
    return force;
  }

  //Ref 2p342
   getSkyEarthTrigramStatus() {
    const force =
      QiHelper.Trigram2TrigramForce[this.currYiJing.skyTrigram.ordinal()][
        this.currYiJing.earthTrigram.ordinal()
      ].force;
    return force;
  }

   getBrancheMonthPeriod() {
    const branche =
      QiHelper.BranchePeriodMonth[this.currYiJing.skyTrigram.ordinal()][
        this.currYiJing.earthTrigram.ordinal()
      ];
    return branche;
  }

  // Ref2 p349
   getBirthMonthThemeBrancheStatus(birthMBranche: Branche) {
    let force = 0;
    const periodMonthBranche = this.getBrancheMonthPeriod();
    if (periodMonthBranche.isEqual(birthMBranche)) {
      force = QiForce.FAVORABLE.force;
    } else {
      if (periodMonthBranche.season.isEqual(birthMBranche.season)) {
        force = QiForce.MEDIUM.force;
      }
    }
    return force;
  }

   getMonthBrancheEnergyStatus(birthMBranche: Branche) {
    let force = 0;
    let isDangVi = false;
    if (this.currYiJing.isPrincipalTheme) {
      isDangVi =
        birthMBranche.getEnergy() === this.currYiJing.hexaArr[this.currYiJing.posND];
    } else {
      isDangVi =
        birthMBranche.getEnergy() === this.currYiJing.hexaArr[this.currYiJing.getHeYaoPos()];
    }
    if (!isDangVi) {
      isDangVi =
        this.currYiJing.hexaArr[1] === Energy.YIN &&
        this.currYiJing.hexaArr[4] === Energy.YANG;
    }
    if (isDangVi) {force = QiForce.FAVORABLE.force;}

    return force;
  }

  // Ref 6 p262
  // Assume that the result affects on the receiver
   getReceiverElementRelationStatus(receiver: ElementRelation) {
    let res = QiForce.NONE;
    switch (receiver) {
      case ElementRelation.GENERATED:
      case ElementRelation.RESTRICT:
      case ElementRelation.ENFORCE:
        res = QiForce.FAVORABLE;
        break;
      case ElementRelation.NEUTRAL:
        res = QiForce.MEDIUM;
        break;
      case ElementRelation.RESTRICTED:
      case ElementRelation.GENERATE:
        res = QiForce.HOSTILE;
        break;
    }
    return res;
  }

   getYearThemeElementStatus() {
    const force = this.getReceiverElementRelationStatus(
      BaziHelper.getRelation(this.lunar
        .getyElement(),this.currYiJing.earthTrigram.getElement())
    ).force;

    return force;
  }

  // Ref 2p364: THEMEOTHERSUBJECTYAO
   getOtherSupportSubjectYaoStatus() {
    let force = 0;
    const heYaoNDPos = (this.currYiJing.posND + 3) % 6;
    if (
      this.currYiJing.hexaArr[this.currYiJing.posND] !== this.currYiJing.hexaArr[heYaoNDPos]
    ) {
      // He Yao support ND Yao
      // Check position
      switch (this.currYiJing.posND) {
        case 0:
        case 1:
        case 4:
        case 3:
          force = QiForce.FAVORABLE.force;
          break;
        case 2:
          force = QiForce.MEDIUM.force;
          break;
      }
    }
    return force;
  }

   getThemeFollowerStatus() {
    let force = 0;
    const themeNb = this.currYiJing.getHexaOrdinal();
    if (
      themeNb === 50 ||
      themeNb === 16 ||
      themeNb === 62 ||
      themeNb === 26 ||
      themeNb === 56 ||
      themeNb === 34
    ) {
      force = QiForce.FAVORABLE.force;
    } else {
      if (themeNb === 2 || themeNb === 48 || themeNb === 54) {
        force = QiForce.HOSTILE.force;
      }
    }
    return force;
  }

  // Nap Giap when birth trunk trigram is same as one of the sky trigram
  // Ref 4 p20 YEARTRUNKTHEMESKYTRIGRAM
 getBirthYearThemeSkyTrigramStatus() {
    const trunk = this.lunar.getyTrunk();
    let force = 0;
    if (trunk.trigram === this.currYiJing.skyTrigram) {
      force = QiForce.FAVORABLE.force;
    }
    return force;
  }

 getThemeCompatibleStatus() {
    let force = 0;
    const themeElement = this.currYiJing.getElement();
    force = BaziHelper.getRelation(themeElement,this.lunar.getyElement()).getForce();
    if (force === 0) {
      force = BaziHelper.getRelation(themeElement
        ,this.lunar.getyTrunk().getElement())
        .getForce();
    }
    if (force === 0) {
      force = BaziHelper.getRelation(themeElement,this.lunar.getmElement()).getForce();
    }
    return force;
  }

  private addQiTypeForce(qiType: QiType, currForce: number) {
    let force =  currForce;
    const baseForce = this.currBaseForce.getForce(qiType);
    if ( baseForce!==0 ) {
      force = Math.trunc((force+baseForce)/2);
    }
    this.qiTypeData.addQiTypeForce(qiType,new DataWithLog(force));
  }

  initThemeQiForce(baseForceData: QiTypeDataRec) {

    this.qiTypeData = new QiTypeDataRec();
    this.currBaseForce =  baseForceData;

    let force = this.getBirthSeasonTriGramForce();
    this.addQiTypeForce(QiType.MONTHTHEMETRIGRAM, force);
    force = this.getYearTrigramStatus(this.currYiJing.skyTrigram);
    this.addQiTypeForce(QiType.YEARSKYTRIGRAM, force);
    force = this.getYearTrigramStatus(this.currYiJing.earthTrigram);
    this.addQiTypeForce(QiType.YEAREARTHTRIGRAM, force);
    force = this.getSkyEarthTrigramStatus();
    this.addQiTypeForce(QiType.THEMESKYEARTHTRIGRAM, force);
    const mBranche = this.lunar.getmBranche();
    force = this.getBirthMonthThemeBrancheStatus(mBranche);
    this.addQiTypeForce(QiType.MONTHTHEMEBRANCHE, force);
    force = this.getMonthBrancheEnergyStatus(mBranche);
    this.addQiTypeForce(QiType.MONTHBRANCHEENERGY, force);
    force = this.getYearThemeElementStatus();
    this.addQiTypeForce(QiType.YEARTHEMEELEMENT, force);
    force = this.getOtherSupportSubjectYaoStatus();
    this.addQiTypeForce(QiType.THEMEOTHERSUBJECTYAO, force);
    force = this.getThemeFollowerStatus();
    this.addQiTypeForce(QiType.FOLLOWERTHEME, force);
    force = this.getBirthYearThemeSkyTrigramStatus();
    this.addQiTypeForce(QiType.YEARTRUNKTHEMESKYTRIGRAM, force);
    force = this.getThemeCompatibleStatus();
    this.addQiTypeForce(QiType.THEMECOMPATIBLE, force);

    // From base
    this.qiTypeData.addQiTypeForce(
      QiType.BIRTHSEASONENERGY,
      baseForceData.getData(QiType.BIRTHSEASONENERGY)
    );
    this.qiTypeData.addQiTypeForce(
      QiType.BIRTHWITHTIME,
      baseForceData.getData(QiType.BIRTHWITHTIME)
    );
    this.qiTypeData.addQiTypeForce(
      QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE,
      baseForceData.getData(QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE)
    );
    this.qiTypeData.addQiTypeForce(
      QiType.EARTHDAYTRUNKSUPPORT,
      baseForceData.getData(QiType.EARTHDAYTRUNKSUPPORT)
    );
    this.qiTypeData.addQiTypeForce(
      QiType.DAYSTATUS,
      baseForceData.getData(QiType.DAYSTATUS)
    );

    // Use pilarsAttr
    const currPivotForceAttr = PivotHelper.getElligiblePivotAttr(this.lunar);
    this.addQiTypeForce(QiType.PIVOT, currPivotForceAttr.matchCount);


  }


  private countQiType(qiType: QiType) {
    if (this.qiTypeData.isForceGEThan (qiType,this.favorableForce) ) {
       this.favorableCount++ ;
    }
    this.totalCount++;
  }


  private evalFavorable() {
    this.favorableCount = 0 ;
    this.totalCount = 0 ;
    this.favorableForce = QiForce.MEDIUM.force;

    // Period theme / Que tot hay xau
    this.countQiType(QiType.THEMESKYEARTHTRIGRAM) ;

    // Hoa cong
    this.countQiType(QiType.MONTHTHEMETRIGRAM) ;

    // Thien nguyen khi
    this.countQiType(QiType.YEARSKYTRIGRAM) ;

    // Dia nguyen khi
    this.countQiType(QiType.YEAREARTHTRIGRAM) ;

    // Duoc lenh
    this.countQiType(QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE) ;

    // Dac dia
    this.countQiType(QiType.EARTHDAYTRUNKSUPPORT) ;

    // Nap giap
    this.countQiType(QiType.YEARTRUNKTHEMESKYTRIGRAM) ;

      // Day Status
    this.countQiType(QiType.DAYSTATUS) ;

      // Pivot
    this.countQiType(QiType.PIVOT) ;

    this.isFavorable =(this.favorableCount * 2 > this.totalCount) ;
  }
}
