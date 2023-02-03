import { QiHelper } from "../../helper/qiHelper";
import { ObservationBase } from "../../observations/observationBase";
import { QiTypeDataRec } from "../qi/qi-type-data-rec";
import { Bazi } from "./bazi";

export  class BaziObservationBase extends ObservationBase {

  // See to update it for each period
  currPeriodComplementForceFactor= 0.0;
  baseQiTypeData: QiTypeDataRec[];
  bazi: Bazi;

  constructor(bazi: Bazi) {
    super();
    this.bazi = bazi;
  }

  private evalInitialPoints() {
    this.baseQiTypeData=[];
    this.baseQiTypeData.push(QiHelper.getLunarQiForce(this.bazi));
  }

  private commentPrincipalDeityPilar() {

  }

  override initPoint() {
    super.initPoint();
    this.evalInitialPoints();
  }


  override adjustDegree(degree: number) {
    return degree + Math.round((10 - degree) * this.currPeriodComplementForceFactor);
  }

  override comment() {
    super.comment();

  }

}
