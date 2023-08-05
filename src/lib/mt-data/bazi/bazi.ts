import { Console } from "console";
import { BaziHelper } from "../../helper/baziHelper";
import { BrancheHelper } from "../../helper/brancheHelper";
import { DateHelper } from "../../helper/dateHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { MyCalendar } from "../date/mycalendar";
import { Branche } from "./branche";
import { Lunar } from "./lunar";
import { LunarBase } from "./lunarBase";
import { SecondaryDeity } from "./secondaryDeity";
import { Trunk } from "./trunk";
import { Temporal } from "temporal-polyfill";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { ObjectHelper } from "../../helper/objectHelper";
import { NagiaHelper } from "../../helper/nagiaHelper";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { PeriodPilar } from "./periodPilar";
import { PilarBase } from "./pilarBase";

export class Bazi extends Lunar {
  static monthSectTermDate = [6, 4, 6, 5, 6, 6, 7, 8, 8, 8, 7, 7];
  locThanTrunks: Trunk[] = null;

  startPeriodDate: MyCalendar;
  periodPilar: PeriodPilar [] = [];
  menhPilar: PeriodPilar;

  constructor(
    birthDate: MyCalendar,
    isMan: boolean
  ) {
    super(birthDate, isMan);
    this.locThanTrunks = SecondaryDeity.evalLocThanTrunk(this, this);
  }

  getPeriodDateFromPeriondNb(periodNb: number) {
    const currPeriod = this.startPeriodDate.getCopy();
    currPeriod.add(Temporal.Duration.from({ years: periodNb * 10 }));
    return currPeriod;
  }

  getPeriodNb(fromDate: MyCalendar) {
    let res = 0;
    for (let index = 0; index < this.periodPilar.length; index++) {
      const currDate = this.periodPilar[index].date;
      if (currDate.afterDate(fromDate)) break;
      res = index;
    }
    return res;
  }

  evalPeriodData() {
    if (this.periodPilar.length > 0) return;
    const maxPeriod = 11;
    const dTrunk=this.pilars[LunarBase.DINDEX].trunk;
    this.startPeriodDate = BaziHelper.getStartPeriodDate(this);
    const direction = BaziHelper.getProgressSign(this);
    let trunk= this.getmTrunk().getEnumNextNElement(direction);
    let branche=this.getmBranche().getEnumNextNElement(direction)
    let deity = this.getTrunkDeity(dTrunk);
    let datePeriodNb = 0;
    this.periodPilar.push(new PeriodPilar(trunk, branche,deity,this.getPeriodDateFromPeriondNb(datePeriodNb)))
    for (let index = 1; index < maxPeriod; index++) {
      trunk = this.periodPilar[index - 1].trunk.getEnumNextNElement(direction);
      branche=this.periodPilar[index - 1].branche.getEnumNextNElement(direction);
      deity = this.getTrunkDeity(trunk);
      datePeriodNb++;
      this.periodPilar.push(new PeriodPilar(trunk, branche,deity,this.getPeriodDateFromPeriondNb(datePeriodNb)))
    }
  }



  getPeriodTrunkDeity(periodNb: number) {
    return this.periodPilar[periodNb].deity;
  }

  getPeriodPilar(periodNb: number) {
    return this.periodPilar[periodNb];
  }

  getPeriodNagiaElement(periodNb: number) {
    return this.getPeriodPilar(periodNb).getElement();
  }

  getPeriodLifeCycle(periodNb: number) {
    return this.periodPilar[periodNb].lifeCycle;
  }

  getPeriodTrunk(periodNb: number) {
    return this.periodPilar[periodNb].trunk;
  }

  getPeriodBranche(periodNb: number) {
    return this.periodPilar[periodNb].branche;
  }

  //Ref3p280
  isFavorableLifeCycle(periodnb: number,lifeCycle: ElementLifeCycle) {
    let avoidLifeCycles: ElementLifeCycle[] = [];
    switch (periodnb) {
      case 0:
      case 1:
        avoidLifeCycles = [
          ElementLifeCycle.TOMB, // Mo
          ElementLifeCycle.SICKNESS, // Bệnh
          ElementLifeCycle.DEATH, // Tử
          ElementLifeCycle.REPOSE, // Tuyệt
          ElementLifeCycle.AGING, // Suy
        ];
        break;
      case 2:
      case 3:
      case 4:
      case 5:
        avoidLifeCycles = [
          ElementLifeCycle.SICKNESS, // Bệnh
          ElementLifeCycle.DEATH, // Tử
          ElementLifeCycle.WOMB, // Thai
          ElementLifeCycle.REPOSE, // Tuyệt
          ElementLifeCycle.AGING, // Suy
        ];
        break;
      default:
        avoidLifeCycles = [ElementLifeCycle.BIRTH];
        break;
    }
    return !ObjectHelper.hasItem(avoidLifeCycles, lifeCycle);
  }

  override initTrunkBranche() {
    if (this.pilars === null) {
      this.pilars = [];

      const baziNb = DateHelper.getSolarYear(this.birthDate) % 60;
      const trunkNb = Math.trunc(baziNb % 10) - 3;
      const brancheNb = Math.trunc(baziNb % 12) - 3;

      let trunk = TrunkHelper.getYearTrunk(trunkNb);
      let branche = BrancheHelper.getYearBranche(brancheNb);
      this.pilars[LunarBase.YINDEX] = new PilarBase(trunk,branche);

      let someIdx = this.getMonthIdx();

      trunk =this.getYearStartMonth().getEnumNextNElement(someIdx - 1);
      branche = BrancheHelper.getMonthBranche(someIdx);
      this.pilars[LunarBase.MINDEX] = new PilarBase(trunk,branche);

      someIdx = DateHelper.reference19850724JIARATDateDiff(
        this.birthDateWith23HAdaptation
      );
      trunk = Trunk.JIA.getEnumNextNElement(someIdx);
      branche =  Branche.RAT.getEnumNextNElement(someIdx);
      this.pilars[LunarBase.DINDEX] = new PilarBase(trunk,branche);

      this.initHLTrunkBranche();

      //Menh Branch
      let idx = this.pilars[LunarBase.MINDEX].branche.ordinal() - 2; // -2 because of 12 branches and reverse
      let menhBranche = Branche.RAT.getEnumNextNElement(-idx);
      idx =
        Branche.RABBIT.ordinal() - this.pilars[LunarBase.HINDEX].branche.ordinal();
      menhBranche = menhBranche.getEnumNextNElement(idx);
      const menhTrunk = TrunkHelper.getAnnualStartMonth(
        this.getyTrunk()
      ).getEnumNextNElement(this.pilars[LunarBase.MINDEX].trunk.ordinal());
      const deity = this.getTrunkDeity(menhTrunk);
      this.menhPilar=new PeriodPilar(menhTrunk, menhBranche,deity,this.birthDate);

    }
  }

  override getPilarElement(index: number) {
    return this.pilars[index].branche.getElement();
  }

  private getMonthIdx() {
    const gYear = this.birthDate.getYear();

    const gDate = this.birthDate.getDay();
    const gMonth = this.birthDate.getMonth();
    const cMonth = this.birthDate.getChineseMonth();
    const sectTerm = Bazi.monthSectTermDate[gMonth - 1];

    let resIdx = 0;
    if (gDate === sectTerm) {
      // Check limit month change
      if (gMonth === 1) {
        resIdx = 12;
      } else {
        if (gMonth - 1 > cMonth) {
          if (gMonth === 11 || gMonth === 7) {
            resIdx = gMonth - 2;
          } else {
            resIdx = gMonth - 1;
          }
        } else {
          if (gMonth === 2) {
            resIdx = 12;
          } else {
            if (gMonth === 11 || gMonth === 7 || gMonth === 10) {
              resIdx = gMonth - 2;
            } else {
              resIdx = gMonth - 1;
            }
          }
        }
      }
    } else {
      if (gDate > sectTerm) {
        if (gMonth === 1) {
          resIdx = 12;
        } else {
          resIdx = gMonth - 1;
        }
      } else {
        if (gMonth === 1) {
          resIdx = 11;
        } else {
          if (gMonth === 2) {
            resIdx = 12;
          } else {
            resIdx = gMonth - 2;
          }
        }
      }
    }
    return resIdx;
  }

}
