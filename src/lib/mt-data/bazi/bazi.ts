import { Console } from 'console';
import { BaziHelper } from '../../helper/baziHelper';
import { BrancheHelper } from '../../helper/brancheHelper';
import { DateHelper } from '../../helper/dateHelper';
import { TrunkHelper } from '../../helper/trunkHelper';
import { MyCalendar } from '../date/mycalendar';
import { Branche } from './branche';
import { Lunar } from './lunar';
import { LunarBase } from './lunarBase';
import { SecondaryDeity } from './secondaryDeity';
import { Trunk } from './trunk';
import { Temporal } from 'temporal-polyfill';
import { ElementLifeCycle } from '../feng-shui/elementLifeCycle';
import { ObjectHelper } from '../../helper/objectHelper';
import { NagiaHelper } from '../../helper/nagiaHelper';
import { QiForce } from '../qi/qi-force';
import { DataWithLog } from '../qi/dataWithLog';
import { QiHelper } from '../../helper/qiHelper';

export class Bazi extends Lunar {

  static monthSectTermDate = [6,4,6,5,6,6,7,8,8,8,7,7 ];
  locThanTrunks: Trunk[]= null;

  startPeriodDate: MyCalendar;
  periodTrunkArr: Trunk[] = [];
  periodBrancheArr: Branche[] = [];
  periodDate: MyCalendar[] = [];

  constructor(birthDate: MyCalendar, isMan: boolean, trArr?: Trunk[], brArr?: Branche[]) {
    super(birthDate, isMan, trArr, brArr);
    this.locThanTrunks=SecondaryDeity.evalLocThanTrunk(this,this);
  }

  getPeriodDateFromPeriondNb(periodNb: number) {
    const currPeriod = this.startPeriodDate.getCopy();
    currPeriod.add(Temporal.Duration.from({ years: periodNb * 10 }));
    return currPeriod;
  }

  getPeriodNb(fromDate: MyCalendar) {
    let res = 0 ;
    for (let index = 0; index < this.periodDate.length; index++) {
      const currDate = this.periodDate[index];
      if ( currDate.afterDate(fromDate) ) break ;
      res = index;
    }
    return res;
  }

  evalPeriodData() {
    if ( this.periodTrunkArr.length>0 ) return ;
    const maxPeriod=11;
    this.startPeriodDate = BaziHelper.getStartPeriodDate(this);
    const direction = BaziHelper.getProgressSign(this);

    this.periodTrunkArr.push(
      this.getmTrunk().getEnumNextNElement(direction)
    );
    this.periodBrancheArr.push(
      this.getmBranche().getEnumNextNElement(direction)
    );
    let datePeriodNb = 0;
    this.periodDate.push(this.getPeriodDateFromPeriondNb(datePeriodNb));
    for (let index = 1; index < maxPeriod; index++) {
      this.periodTrunkArr.push(
        this.periodTrunkArr[index - 1].getEnumNextNElement(direction)
      );
      this.periodBrancheArr.push(
        this.periodBrancheArr[index - 1].getEnumNextNElement(direction)
      );
      datePeriodNb++;
      this.periodDate.push(this.getPeriodDateFromPeriondNb(datePeriodNb));
    }
  }


  getTrunkDeity(trunk: Trunk) {
    return BaziHelper.eNeTrunkRelation(
      trunk,
      this.getdTrunk()
    );
  }

  getPeriodLifeCyle(periodNb: number) {
    const pTrunk = this.periodTrunkArr[periodNb];
    const pBranche= this.periodBrancheArr[periodNb];
    return BaziHelper.elementLifeCycle( pTrunk, pBranche)
  }

  getPeriodTrunkEnE(periodNb: number) {
    return this.getPeriodTrunk(periodNb).elementNEnergy
  }

  getPeriodBrancheEnE(periodNb: number) {
    const pBranche = this.periodBrancheArr[periodNb];
    return pBranche.elementNEnergy
  }

  getPeriodElement(periodNb: number) {
    const pTrunk = this.periodTrunkArr[periodNb];
    const pBranche= this.periodBrancheArr[periodNb];
    return NagiaHelper.getNagiaElement(pTrunk,pBranche);
  }

  getPeriodTrunkDeity(periodNb: number) {
    return this.getTrunkDeity(this.periodTrunkArr[periodNb])
  }

  getPeriodTrunk(periodNb: number) {
    return this.periodTrunkArr[periodNb]
  }

  getPeriodBranche(periodNb: number) {
    return this.periodBrancheArr[periodNb]
  }

  //Ref3p280
  isFavorableLifeCycle (periodnb: number, lifeCycle:ElementLifeCycle) {
    let avoidLifeCycles : ElementLifeCycle[] = [];
    switch (periodnb) {
      case 0: case 1:
        avoidLifeCycles = [
          ElementLifeCycle.TOMB, // Suy
          ElementLifeCycle.SICKNESS, // Bệnh
          ElementLifeCycle.DEATH, // Tử
          ElementLifeCycle.REPOSE, // Tuyệt
          ElementLifeCycle.AGING // Suy
        ];
        break;
        case 3: case 3: case 4: case 5:
            avoidLifeCycles = [
              ElementLifeCycle.SICKNESS, // Bệnh
              ElementLifeCycle.DEATH, // Tử
              ElementLifeCycle.WOMB,  // Thai
              ElementLifeCycle.REPOSE, // Tuyệt
              ElementLifeCycle.AGING // Suy
            ];
            break;
      default:
        avoidLifeCycles = [ElementLifeCycle.BIRTH, ElementLifeCycle.PROSPERITY];
        break;
    }
    return !ObjectHelper.hasItem(avoidLifeCycles,lifeCycle) ;
  }

  override initTrunkBranche() {
    if ( this.trunkArr===null ) {
      this.trunkArr =  new Array(LunarBase.PILARS_LEN);
      this.brancheArr =   new Array(LunarBase.PILARS_LEN);
      const baziNb = DateHelper.getSolarYear(this.birthDate)%60;
      const trunkNb = Math.trunc(baziNb%10)-3;
      const brancheNb = Math.trunc( baziNb % 12) -3;


      this.trunkArr[LunarBase.YINDEX]=TrunkHelper.getYearTrunk(trunkNb);
      this.brancheArr[LunarBase.YINDEX]=BrancheHelper.getYearBranche(brancheNb);

      let someIdx  = this.getMonthIdx();

      this.trunkArr[LunarBase.MINDEX]=
        this.getYearStartMonth().getEnumNextNElement(someIdx-1);
      this.brancheArr[LunarBase.MINDEX]=BrancheHelper.getMonthBranche(someIdx);

      someIdx = DateHelper.reference19850724JIARATDateDiff(this.birthDateWith23HAdaptation);
      this.trunkArr[LunarBase.DINDEX]=Trunk.JIA.getEnumNextNElement(someIdx);
      this.brancheArr[LunarBase.DINDEX]=Branche.RAT.getEnumNextNElement(someIdx);
      this.initHLTrunkBranche();
    }
  }

  override getPilarElement(index: number) {
			return this.brancheArr[index].getElement();
	}
  private getMonthIdx() {
    const gYear = this.birthDate.getYear();

    const gDate = this.birthDate.getDay();
    const gMonth = this.birthDate.getMonth();
    const cMonth = this.birthDate.getChineseMonth();
    const sectTerm= Bazi.monthSectTermDate[gMonth-1] ;

    let resIdx = 0 ;
    if (gDate===sectTerm) {
      // Check limit month change
      if ( gMonth===1 ) {
        resIdx = 12 ;
      } else {
        if ( (gMonth-1) > cMonth ) {
          if ( gMonth===11 || gMonth===7 ) {
            resIdx = gMonth-2;
          } else {
            resIdx = gMonth-1;
          }
        } else {
          if ( gMonth===2 ) {
            resIdx = 12 ;
          } else {
            if ( gMonth===11 || gMonth===7 || gMonth===10 ) {
              resIdx = gMonth-2;
            } else {
              resIdx = gMonth-1;
            }
          }
        }
      }
    } else {
      if ( gDate>sectTerm ) {
				if ( gMonth===1 ) {
					resIdx = 12;
				} else {
					resIdx = gMonth-1;
				}
			} else {
				if ( gMonth===1 ) {
					resIdx = 11;
				} else {
					if ( gMonth===2 ) {
						resIdx = 12;
					} else {
						resIdx = gMonth-2;
					}
				}
			}
    }
    return resIdx;
  }



}
