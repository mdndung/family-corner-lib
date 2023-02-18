/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { MyCalendar } from '../date/mycalendar';
import { Trigram } from '../feng-shui/trigram';

import { Trunk } from './trunk';
import { Branche } from './branche';
import { TrunkHelper } from '../../helper/trunkHelper';
import { BrancheHelper } from '../../helper/brancheHelper';
import { ObjectHelper } from '../../helper/objectHelper';
import { Energy } from '../feng-shui/energy';
import { Temporal } from 'temporal-polyfill';
import { DateHelper } from '../../helper/dateHelper';
import { NagiaHelper } from '../../helper/nagiaHelper';
import { TrigramHelper } from '../../helper/trigramHelper';
import { PilarsAttr } from './pilarsAttr';
import { LunarBase } from './lunarBase';
import { SecondaryDeity } from './secondaryDeity';

export class Lunar {

  static YearStartMonthTrunk = [
    Trunk.BING, Trunk.WU, Trunk.GENG, Trunk.REN, Trunk.JIA,
		Trunk.BING,Trunk.WU,Trunk.GENG,Trunk.REN,Trunk.JIA
  ];

  birthDate: MyCalendar;
  birthDateWith23HAdaptation: MyCalendar;
  isMan: boolean ;

  trunkArr: Trunk[] = null ;
  brancheArr: Branche[] = null ;

  yinCount = 0 ;
  yangCount =  0 ;

  pilarsAttr: PilarsAttr = null ;


  constructor(birthDate: MyCalendar, isMan: boolean, trArr?: Trunk[], brArr?: Branche[]) {
    if ( typeof trArr === 'undefined') {
      trArr = null;
    }
    if ( typeof brArr === 'undefined') {
      brArr = null;
    }
    this.trunkArr=trArr;
    this.brancheArr=brArr;
    // Make a clone copy
    this.birthDate = birthDate.getCopy();
    this.birthDateWith23HAdaptation =
        DateHelper.getMyCalendarAfterAddDuration
          (birthDate,Temporal.Duration.from({hours:1}));
    this.isMan = isMan;

    this.init();
  }

  getDayMasterElement() {
    if ( this.pilarsAttr===null ) return  this.trunkArr[LunarBase.DINDEX].getElement();
    return  this.pilarsAttr.trunkEE[LunarBase.DINDEX].getValue().element;
  }

  getYearStartMonth() {
    return Lunar.YearStartMonthTrunk[this.trunkArr[LunarBase.YINDEX].ordinal()];
  }

  getReplaceTrigram5(trigram: Trigram, year: number, isYang: boolean) {
    let res = trigram;
    if ((ObjectHelper.isNaN(res))|| ( res.hauthienNb===5 ) ) {
      const period = Math.trunc((( year - 64 ) % 180 )/60);
      let replaceTrigramNb = 8;
      if ( period===0 ) {
        if ( this.isMan ) {
          replaceTrigramNb = 8 ;
        } else {
          replaceTrigramNb = 2 ;
        }
      } else {
        if ( period===1 ) {
          if ( this.isMan ) {
            if ( isYang ) {
              replaceTrigramNb = 8 ;
            } else {
              replaceTrigramNb = 2 ;
            }
          } else {
            if ( isYang ) {
              replaceTrigramNb = 2 ;
            } else {
              replaceTrigramNb = 8 ;
            }
          }
        } else {
          if ( this.isMan ) {
            replaceTrigramNb = 9;
          } else {
            replaceTrigramNb = 7 ;
          }
        }
      }
      res = this.getTrigram(replaceTrigramNb);
    }
    return res ;
  }

  getSkyEarthTrigram() {
    const yinTrigramNb = this.evalTrigramnb( this.yinCount,30);
    const yinTrigram = this.getTrigram(yinTrigramNb);
    const yangTrigramNb = this.evalTrigramnb( this.yangCount,25);
    const yangTrigram = this.getTrigram(yangTrigramNb);


    let skyTriGram;
    let earthTrigram;
    const isTrunkYearYang = this.trunkArr[LunarBase.YINDEX].getEnergy().isEqual(Energy.YANG);
    if ( isTrunkYearYang )  {
      if( this.isMan ) {
        skyTriGram = yangTrigram;  earthTrigram = yinTrigram;
      } else {
        skyTriGram = yinTrigram;  earthTrigram = yangTrigram;
      }
    } else {
      if( this.isMan ) {
        skyTriGram = yinTrigram;  earthTrigram = yangTrigram;
      } else {
        skyTriGram = yangTrigram;  earthTrigram = yinTrigram;
      }
    }
    const year = DateHelper.getSolarYear(this.birthDateWith23HAdaptation);
    skyTriGram = this.getReplaceTrigram5(skyTriGram, year, isTrunkYearYang);
    earthTrigram = this.getReplaceTrigram5(earthTrigram, year, isTrunkYearYang);
    if (ObjectHelper.isNaN(yangTrigram) ) {
      console.log('yangTrigram null',yangTrigramNb);
    }
    if (ObjectHelper.isNaN(yinTrigram) ) {
      console.log('yinTrigram null',yinTrigramNb);
    }
    return {skyTriGram, earthTrigram} ;
  }


  initHLTrunkBranche(){
    this.trunkArr[LunarBase.HINDEX]=
      TrunkHelper.getHourTrunk
        (this.trunkArr[LunarBase.DINDEX],this.birthDate.getHour());
    this.brancheArr[LunarBase.HINDEX]=
      BrancheHelper.getHourBranche(this.birthDate.getHour());

    // Life trunk and branch
    let index = this.brancheArr[LunarBase.MINDEX].ordinal() - 2 ;

    const lifeBranche = Branche.RAT.getEnumNextNElement(-index) ;
    index = Branche.RAT.ordinal()- this.brancheArr[LunarBase.HINDEX].ordinal();
    this.brancheArr[LunarBase.LINDEX] = lifeBranche.getEnumNextNElement(index);
    const mOrd = this.trunkArr[LunarBase.MINDEX].ordinal();
    this.trunkArr[LunarBase.LINDEX]=
      this.getYearStartMonth().getEnumNextNElement(mOrd);
  }


  initTrunkBranche() {
    if ( this.trunkArr===null ) {
      this.trunkArr =  new Array(LunarBase.PILARS_LEN);
      this.brancheArr =   new Array(LunarBase.PILARS_LEN);

      let [cycle, year, month, leap, day] = this.birthDate.chineseDate.get();
      month = Math.abs(month);
      const cYear = cycle*60+year;
      this.trunkArr[LunarBase.YINDEX]=TrunkHelper.getYearTrunk(cYear);
      this.brancheArr[LunarBase.YINDEX]=BrancheHelper.getYearBranche(cYear);

      this.trunkArr[LunarBase.MINDEX]=TrunkHelper.getMonthTrunk(this.trunkArr[LunarBase.YINDEX],month);
      this.brancheArr[LunarBase.MINDEX]=BrancheHelper.getMonthBranche(month);

      this.trunkArr[LunarBase.DINDEX]=TrunkHelper.getDayTrunk(this.birthDate);
      this.brancheArr[LunarBase.DINDEX]=BrancheHelper.getDayBranche(this.birthDate);

      this.initHLTrunkBranche();
    }
  }



  init() {
    this.initTrunkBranche();
    this.initYinYangCount();
    this.pilarsAttr=new PilarsAttr(this);

  }

  gethIdx() { return LunarBase.HINDEX };
  getdIdx() { return LunarBase.DINDEX };
  getmIdx() { return LunarBase.MINDEX };
  getyIdx() { return LunarBase.YINDEX };
  getlIdx() { return LunarBase.LINDEX };

  getTrunk(trunNb:number) {
    return
  }

  gethTrunk() {
    return this.trunkArr[LunarBase.HINDEX] as Trunk;
  }

  getdTrunk() {
    return this.trunkArr[LunarBase.DINDEX] as Trunk;
  }

  getmTrunk() {
    return this.trunkArr[LunarBase.MINDEX] as Trunk;
  }

  getyTrunk() {
    return this.trunkArr[LunarBase.YINDEX] as Trunk;
  }


   getPilarElement( index: number ) {
		return NagiaHelper.getNagiaElement(this.trunkArr[index],this.brancheArr[index]);
	}

  getyElement() {
    return this.getPilarElement(LunarBase.YINDEX);
  }

  getmElement() {
    return this.getPilarElement(LunarBase.MINDEX);
  }

  getyBranche() {
    return this.brancheArr[LunarBase.YINDEX] as Branche;
  }

  getmBranche() {
    return this.brancheArr[LunarBase.MINDEX] as Branche;
  }

  getdBranche() {
    return this.brancheArr[LunarBase.DINDEX] as Branche;
  }

  gethBranche() {
    return this.brancheArr[LunarBase.HINDEX] as Branche;
  }

  toString() {
    let res = '';
    for (let index = 0; index <= LunarBase.LINDEX; index++) {
      res += ' ( ' + this.trunkArr[index].getName()+' '+ this.brancheArr[index].getName()+ ' ) ' ;
    }
    return res;
  }


  private incYinOrYangCount(inc: number) {
    if (inc%2===0 ) {
      this.yinCount+=inc;
    } else {
      this.yangCount+=inc;
    }
  }

  private initYinYangCount() {
    this.yinCount = 0 ;
    this.yangCount = 0 ;
    for (let index = 0; index < LunarBase.LINDEX; index++) {
      this.incYinOrYangCount( this.trunkArr[index].hadoNb ) ;
      this.incYinOrYangCount( this.brancheArr[index].earthNb1 ) ;
      this.incYinOrYangCount( this.brancheArr[index].earthNb2 ) ;
    }
  }

  private evalTrigramnb( idx: number , max: number) {
    let nb = idx;
    if ( nb>= max ) { nb = nb-max; }
    if ( nb>=10 ) {
      const i=nb % 10 ;
      if ( i===0 ) {
        nb = Math.trunc(nb/10);
      } else {
        nb = i ;
      }
    }
    return nb ;
  }

  private getTrigram( nb: number) {
    if ( nb===5 ) {
      return null ;
    } else {
      return TrigramHelper.getTrigramGua(nb);
    }
  }
}
