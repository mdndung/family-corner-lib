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
import { PilarBase } from './pilarBase';
import { BaziHelper } from '../../helper/baziHelper';

export class Lunar {

  static YearStartMonthTrunk = [
    Trunk.BING, Trunk.WU, Trunk.GENG, Trunk.REN, Trunk.JIA,
		Trunk.BING,Trunk.WU,Trunk.GENG,Trunk.REN,Trunk.JIA
  ];

  birthDate: MyCalendar;
  birthDateWith23HAdaptation: MyCalendar;
  isMan: boolean ;

  pilars: PilarBase[] = null ;
  yinCount = 0 ;
  yangCount =  0 ;

  pilarsAttr: PilarsAttr = null ;


  constructor(birthDate: MyCalendar, isMan: boolean) {

    // Make a clone copy
    this.birthDate = birthDate.getCopy();
    this.birthDateWith23HAdaptation =
        DateHelper.getMyCalendarAfterAddDuration
          (birthDate,Temporal.Duration.from({hours:1}));
    this.isMan = isMan;

    this.init();
  }

  getGenrePrefix(isMan?: boolean) {
    if ( typeof isMan === 'undefined' ) isMan=this.isMan;
    let currGenre = "F.";
    if ( isMan ) currGenre = "M.";
    return currGenre;
  }

  getDayMasterElement() {
    if ( this.pilarsAttr===null ) return  this.pilars[LunarBase.DINDEX].trunk.getElement();
    return  this.pilarsAttr.trunkEE[LunarBase.DINDEX].getValue().element;
  }

  getYearStartMonth() {
    return Lunar.YearStartMonthTrunk[this.pilars[LunarBase.YINDEX].trunk.ordinal()];
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
    const isTrunkYearYang = this.pilars[LunarBase.YINDEX].trunk.getEnergy().isEqual(Energy.YANG);
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
    let trunk =
      TrunkHelper.getHourTrunk
        (this.pilars[LunarBase.DINDEX].trunk,this.birthDate.getHour());
    let branche=
      BrancheHelper.getHourBranche(this.birthDate.getHour());
    this.pilars[LunarBase.HINDEX] = new PilarBase(trunk, branche)

  }


  initTrunkBranche() {

    if ( this.pilars===null ) {
      this.pilars = ObjectHelper.newArray(LunarBase.PILARS_LEN,null)

      let [cycle, year, month, leap, day] = this.birthDate.chineseDate.get();
      month = Math.abs(month);
      const cYear = cycle*60+year;
      let trunk=TrunkHelper.getYearTrunk(cYear);
      let branche=BrancheHelper.getYearBranche(cYear);
      this.pilars[LunarBase.YINDEX] = new PilarBase(trunk,branche);

      trunk=TrunkHelper.getMonthTrunk(this.pilars[LunarBase.YINDEX].trunk,month);
      branche=BrancheHelper.getMonthBranche(month);
      this.pilars[LunarBase.MINDEX] = new PilarBase(trunk,branche);

      trunk=TrunkHelper.getDayTrunk(this.birthDate);
      branche=BrancheHelper.getDayBranche(this.birthDate);
      this.pilars[LunarBase.DINDEX] = new PilarBase(trunk,branche);

      this.initHLTrunkBranche();
    }
  }

  getTrunkDeity(trunk: Trunk) {
    return BaziHelper.eNeTrunkRelation(trunk, this.getdTrunk());
  }

  initPilarDeity () {
    for (let index = 0; index < this.pilars.length; index++) {
      const deity = this.getTrunkDeity(this.pilars[index].trunk);
      this.pilars[index].deity=deity
    }

  }


  init() {
    this.initTrunkBranche();
    this.initPilarDeity();
    this.initYinYangCount();
    this.pilarsAttr=new PilarsAttr(this);
  }

  gethIdx() { return LunarBase.HINDEX };
  getdIdx() { return LunarBase.DINDEX };
  getmIdx() { return LunarBase.MINDEX };
  getyIdx() { return LunarBase.YINDEX };

  getTrunk(trunNb:number) {
    return this.pilars[trunNb].trunk
  }

  gethTrunk() {
    return this.pilars[LunarBase.HINDEX].trunk;
  }

  getdTrunk() {
    return this.pilars[LunarBase.DINDEX].trunk;
  }

  getmTrunk() {
    return this.pilars[LunarBase.MINDEX].trunk;
  }

  getyTrunk() {
    return this.pilars[LunarBase.YINDEX].trunk;
  }

  getPilar( index: number ) {
		return this.pilars[index];
	}

  getPilars( ) {
		return this.pilars;
	}


  getPilarByName( pilarName: string ) {
    const checkPilarIdx = LunarBase.getPilarIdx(pilarName);
    return this.getPilar(checkPilarIdx)	}


  getPilarElement( index: number ) {
		return this.getPilar(index).nagiaElement;
	}


  getdElement() {
    return this.getPilarElement(LunarBase.DINDEX);
  }

  getyElement() {
    return this.getPilarElement(LunarBase.YINDEX);
  }

  getmElement() {
    return this.getPilarElement(LunarBase.MINDEX);
  }

  getyBranche() {
    return this.getyPilar().branche;
  }

  getyPilar() {
    return this.pilars[LunarBase.YINDEX];
  }

  getmBranche() {
    return this.pilars[LunarBase.MINDEX].branche;
  }

  getdBranche() {
    return this.pilars[LunarBase.DINDEX].branche;
  }

  gethBranche() {
    return this.pilars[LunarBase.HINDEX].branche;
  }

  toString() {
    let res = '';
    for (let index = 0; index < LunarBase.LINDEX; index++) {
      res += ' ( ' + this.pilars[index].toString() + ' ) ' ;
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
      this.incYinOrYangCount( this.pilars[index].trunk.hadoNb ) ;
      this.incYinOrYangCount( this.pilars[index].branche.earthNb1 ) ;
      this.incYinOrYangCount( this.pilars[index].branche.earthNb2 ) ;
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


  get3PlusSameBranche() {
    let count = 0;
    for (let index1 = 0; index1 < LunarBase.PILARS_LEN-2; index1++) {
      count=0;
      const currBranche = this.pilars[index1].branche;
      for (let index = index1+1; index < LunarBase.PILARS_LEN; index++) {
        if (this.pilars[index].branche===currBranche) {
          count++
          if ( count>=2 ) return currBranche
        }
      }
    }


    return null;
  }
}
