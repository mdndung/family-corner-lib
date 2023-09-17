
import { PilarHelper } from "../../helper/pilarHelper";
import { QiHelper } from "../../helper/qiHelper";
import { QiType } from "../qi/qi-type";
import { Bazi } from "./bazi";
import { BaziObservationBase } from "./baziObservationBase";


export class BaziPeriodObservation extends BaziObservationBase {
  periodAttr: any = null ;

  constructor(bazi: Bazi) {
    super(bazi);
  }

  evalPeriodPoint(currStudyYear: Bazi, forceMultFactor?: number) {
    if (typeof forceMultFactor === "undefined") {
      forceMultFactor = 1;
    }
    this.resetPoints();
    this.periodAttr = QiHelper.evalPeriodQi(this.lunar, currStudyYear);
    const perQiRec = this.periodAttr.periodQi;

    // Period Status. Ref3p133
    this.incForce(
      forceMultFactor * perQiRec.getForce(QiType.PERIODSTATUSFORCE)
    );
    this.incForce(
      forceMultFactor * perQiRec.getForce(QiType.PERIODDAYELEMENTSTATUS)
    );
  }


   // To be override in period sub class
   override getPeriodNb() {
    return  this.periodAttr.periodNb ;
  }

   // Period non favorable
   override isBadPeriod (){
    return !this.periodAttr.perStatus.getValue().isFavorable();
  }

  protected override getPilar (pilarChar: string) {
    if ( pilarChar==="Period") return this.periodAttr.pilar
    return super.getPilar(pilarChar);
  }

      // Period Deity pivot element and birth pilar transformed to a bad
    // Check Val -1 or -2
    override isPDeityElemBadTransformed (params: string[]) {

      if ( params.length!==1 ) return false;
      const periodPilar = this.periodAttr.pilar;
      const periodTransformed = PilarHelper.getPeriodPilarTransformStatus(periodPilar, this.lunar);
      //console.log(" isPDeityElemBadTransformed ", params, periodTransformed )
      if ( periodTransformed === null ) return false ;
      const checkVal = +params[0]
      const trVal = periodTransformed.getValue();
      return checkVal===trVal

    }

  commentOnPeriod(currStudyYear: Bazi) {
    this.studyYear=currStudyYear;
    this.lunar.evalPeriodData();
    this.evalPeriodPoint(currStudyYear)
    this.filterObservation("Period.", true);
  }
}
