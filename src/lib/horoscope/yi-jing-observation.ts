
import { BaziHelper } from '../helper/baziHelper';
import { ObjectHelper } from '../helper/objectHelper';
import { QiHelper } from '../helper/qiHelper';
import { TrunkHelper } from '../helper/trunkHelper';
import { Branche } from '../mt-data/bazi/branche';
import { Lunar } from '../mt-data/bazi/lunar';
import { LunarBase } from '../mt-data/bazi/lunarBase';
import { SecondaryDeity } from '../mt-data/bazi/secondaryDeity';
import { Trunk } from '../mt-data/bazi/trunk';
import { ElementRelation } from '../mt-data/feng-shui/element-relation';
import { ElementNEnergy } from '../mt-data/feng-shui/elementNenergy';
import { ElementNEnergyRelation } from '../mt-data/feng-shui/elementNEnergyRelation';
import { Energy } from '../mt-data/feng-shui/energy';
import { Trigram } from '../mt-data/feng-shui/trigram';
import { QiForce } from '../mt-data/qi/qi-force';
import { QiType } from '../mt-data/qi/qi-type';
import { QiTypeDataRec } from '../mt-data/qi/qi-type-data-rec';
import { YiJing } from '../mt-data/yi-jing/yijing';

export class YiJingObservation {
  currYiJing?: YiJing = null ;
  qiTypeData?: QiTypeDataRec = null;
  lunar: Lunar= null;
  isFavorable = false;
  pivotRelationSet: ElementNEnergyRelation[]= null;
  selectedPivotENE: ElementNEnergy = null;
  secondaryDeityPilar: SecondaryDeity[][]= null;
  locThanTrunk: Trunk[]= null;
  favorableCount: number= null;
  totalCount: number= null;
  favorableForce: number= null;
  currBaseForce: QiTypeDataRec= null;

  constructor(lunar: Lunar, yiJing: YiJing, baseQiForce: QiTypeDataRec) {
    this.lunar = lunar;
    this.currYiJing=yiJing;
    this.secondaryDeityPilar=SecondaryDeity.evalSecondaryDeity(lunar,lunar);
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
      this.lunar.trunkArr[LunarBase.YINDEX],
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

  addPivotStrongEECase(lunar: Lunar, ee: ElementNEnergy){
    const dayTrunk = lunar.getdTrunk();
    const trunkArr=lunar.trunkArr;
    const brancheArr=lunar.brancheArr;
    for (let i = 0; i < LunarBase.PILARS_LEN; i++) {
        if (trunkArr[i].elementNEnergy === ee) {
          ObjectHelper.pushIfNotExist(
            this.pivotRelationSet,
            BaziHelper.getEnNRelation(ee,dayTrunk.elementNEnergy));
        }
        if (brancheArr[i].elementNEnergy === ee) {
          ObjectHelper.pushIfNotExist(
            this.pivotRelationSet,
            BaziHelper.getEnNRelation(ee,dayTrunk.elementNEnergy));
        }
    }
  }

  existsecDeity( deity: SecondaryDeity) {
    for (let i = 0; i < LunarBase.PILARS_LEN; i++) {
      const index=ObjectHelper.findIndex(this.secondaryDeityPilar[i],deity);
      if (index>=0) {return true;}
    }
    return false;
  }



  // REF 7a page 97 p7.1: MONTHBRANCHEDAYTRUNKLIFECYCLE (Dụng thần)
  //
  preparePivotData(lunar: Lunar) {
    const dayTrunk = lunar.getdTrunk();
    const pilarsAttr=lunar.pilarsAttr;
    const dayPilarForce = BaziHelper.getDayPilarForce(lunar);
    const trunkPilarElement = pilarsAttr.trunkEE;
    const FAVORABLE_LIMIT = 5; // Ref8 p768 give 4 and is not favorable
    this.pivotRelationSet=[];
    // The minimum force (%) from which it is considerd as strong Ref8p460
    if ( dayPilarForce>BaziHelper.MIN_PIVOT_ELEMENT_FORCE ) {
        this.addPivotStrongEECase(lunar,trunkPilarElement[LunarBase.DINDEX].getValue()) ;
    }

    if (this.existsecDeity(SecondaryDeity.KIMTHAN)) {
        // Pivot must be first on Fire Yang pilar
        this.addPivotStrongEECase(lunar,ElementNEnergy.FIREYANG);
        if (this.pivotRelationSet.length===0) {
            // Other wise Pivot must be on Fire Yin pilar
            this.addPivotStrongEECase(lunar,ElementNEnergy.FIREYIN);
        }
    }
    const addIfNonNull = ObjectHelper.pushIfNotExist;
    if (this.pivotRelationSet.length===0) {
        // Check if there is an element force null
        const generatedCount = this.lunar.pilarsAttr.getGeneratedDeityCase();
        if (this.qiTypeData.isFavorable(QiType.DAYSTATUS)) {
                // Add the element found in tab from ref 3 page 389
                dayTrunk.getPivot(lunar.getmBranche()).forEach(trunkPivot => {
                  const ee = trunkPivot.elementNEnergy;
                  addIfNonNull(this.pivotRelationSet,
                    BaziHelper.getEnNRelation(ee,lunar.getdTrunk().elementNEnergy));
                });

                if (generatedCount > FAVORABLE_LIMIT) {
                    // Ref8 p484 case 1
                    addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.RC);
                    addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.RE);
                } else {
                  let relationCount =
                    pilarsAttr.eerCount[ElementNEnergyRelation.RE.ordinal()]+
                    pilarsAttr.eerCount[ElementNEnergyRelation.RC.ordinal()];
                  const isDayStatusStrong = this.qiTypeData.hasStrongForce(QiType.DAYSTATUS);
                    if (isDayStatusStrong &&
                            (generatedCount > 0) &&
                            (relationCount !== 0)
                    ) {
                        // Ref8 p484-485 case 3
                        addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.RDC);
                        addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.RDE);
                    } else {
                      relationCount =
                    pilarsAttr.eerCount[ElementNEnergyRelation.EE.ordinal()]+
                    pilarsAttr.eerCount[ElementNEnergyRelation.EC.ordinal()];
                        if (relationCount> FAVORABLE_LIMIT) {

                            if (isDayStatusStrong) {
                                // Ref8 p484-485 case 3, case 5
                                addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.RDC);
                                addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.RDE);
                            } else {
                                // Ref8 p484-485 case 4 case 2
                                addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.GC);
                                addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.GE);
                            }
                        } else {
                            // Ref8 p484-485 case 6
                            addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.RC);
                            addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.RE);
                        }
                    }
                }
            } else {
                const restrictCaseCount =
                pilarsAttr.eerCount[ElementNEnergyRelation.GE.ordinal()]+
                pilarsAttr.eerCount[ElementNEnergyRelation.GC.ordinal()]+
                pilarsAttr.eerCount[ElementNEnergyRelation.RE.ordinal()]+
                pilarsAttr.eerCount[ElementNEnergyRelation.RC.ordinal()]+
                pilarsAttr.eerCount[ElementNEnergyRelation.RDC.ordinal()]+
                pilarsAttr.eerCount[ElementNEnergyRelation.RDE.ordinal()];
                const RESTRICT_LIMIT=9;
                if (restrictCaseCount > RESTRICT_LIMIT) {
                    if ( generatedCount >0 ) {
                        // Ref3 p99 Cas 1 p182
                        addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.GC);
                        addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.GE);
                    } else {
                        // Ref3 p99 Cas 2
                        addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.EC);
                        addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.EE);
                    }
                } else {
                    //
                    addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.GC);
                    addIfNonNull(this.pivotRelationSet, ElementNEnergyRelation.GE);
                }
        }
    }

  }

  evalPivotForce( lunar: Lunar, currPilarIdx: number, relationSet: ElementNEnergyRelation[]) {
    let selectEE: ElementNEnergy = null;
    let selectedRelation: ElementNEnergyRelation = null;
    const pilarsAttr=lunar.pilarsAttr;
    // Doing iteratively.
    const trunkRelationArr = pilarsAttr.trunkRelation;
    const brancheTrunkRelationArr =pilarsAttr.brancheTrunkRelation;
   const eeForceArr = pilarsAttr.elementNEnergyForce;
    const trunkEEArr = pilarsAttr.trunkEE;
    const brancheEEArr = pilarsAttr.brancheEE;
    let diffDayPilarForce = 1000 ;
    const dayPilarForce = eeForceArr[trunkEEArr[LunarBase.DINDEX].getValue().ordinal()].getValue();
    let relation = trunkRelationArr[currPilarIdx][LunarBase.DINDEX];
    //
    let force = 0 ;
    let currEE = trunkEEArr[currPilarIdx].getValue();
    let currEEForce = eeForceArr[currEE.ordinal()].getValue();

    relationSet.forEach(checkRelation => {
        let currdiffDayForce;
        if ((relation === checkRelation)) {
            currdiffDayForce = Math.abs(currEEForce-dayPilarForce);
           if ( currdiffDayForce<diffDayPilarForce) {
                selectEE = currEE;
                selectedRelation = relation;
                diffDayPilarForce= currdiffDayForce;
            }
           force++;
        }
        relation = brancheTrunkRelationArr[currPilarIdx][LunarBase.DINDEX];
        if (relation === checkRelation) {
            currEE = brancheEEArr[currPilarIdx].getValue();
            currEEForce = eeForceArr[currEE.ordinal()].getValue();
            currdiffDayForce = Math.abs(currEEForce-dayPilarForce);
           if ( currdiffDayForce<diffDayPilarForce) {
                selectEE = currEE;
                selectedRelation = relation;
                diffDayPilarForce= currdiffDayForce;
            }
            force++;
        }
    });
    if ( selectEE===null ) {
      force++;
    }
    return {force, selectEE, index:currPilarIdx};
}

  getPivotForce(lunar: Lunar) {
    this.selectedPivotENE=null;
    let currPivotForce = this.evalPivotForce(lunar, LunarBase.MINDEX,this.pivotRelationSet);
    if ( currPivotForce.force===0 ) {
      currPivotForce = this.evalPivotForce(lunar, LunarBase.HINDEX,this.pivotRelationSet);
    }
    if ( currPivotForce.force===0 ) {
      currPivotForce = this.evalPivotForce(lunar, LunarBase.YINDEX,this.pivotRelationSet);
    }
    if ( currPivotForce.force===0 ) {
      ObjectHelper.pushIfNotExist(this.pivotRelationSet, ElementNEnergyRelation.RDC);
      currPivotForce = this.evalPivotForce(lunar, LunarBase.MINDEX,this.pivotRelationSet);
    }
    if ( currPivotForce.force===0 ) {
      currPivotForce = this.evalPivotForce(lunar, LunarBase.MINDEX,this.pivotRelationSet);
    }
    if ( currPivotForce.force!==0 ) {
      this.selectedPivotENE = currPivotForce.selectEE;
    }

    return currPivotForce.force;
  }


  private addQiTypeForce(qiType: QiType, currForce: number) {
    let force =  currForce;
    const baseForce = this.currBaseForce.getForce(qiType);
    if ( baseForce!==0 ) {
      force = Math.trunc((force+baseForce)/2);
    }
    this.qiTypeData.addQiTypeForce(qiType,force);
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
      baseForceData.getForce(QiType.BIRTHSEASONENERGY)
    );
    this.qiTypeData.addQiTypeForce(
      QiType.BIRTHSOLARTERMENERGY,
      baseForceData.getForce(QiType.BIRTHSOLARTERMENERGY)
    );
    this.qiTypeData.addQiTypeForce(
      QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE,
      baseForceData.getForce(QiType.MONTHBRANCHEDAYTRUNKLIFECYCLE)
    );
    this.qiTypeData.addQiTypeForce(
      QiType.EARTHDAYTRUNKSUPPORT,
      baseForceData.getForce(QiType.EARTHDAYTRUNKSUPPORT)
    );
    this.qiTypeData.addQiTypeForce(
      QiType.DAYSTATUS,
      baseForceData.getForce(QiType.DAYSTATUS)
    );

    this.preparePivotData(this.lunar);
    force = this.getPivotForce(this.lunar);

    this.addQiTypeForce(QiType.PIVOT, force);


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

    //this.qiTypeData.log();

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

    //console.log('isFavorable count ', this.favorableCount, this.totalCount, this.isFavorable);
  }
}
