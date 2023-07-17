
import { BaziHelper } from "../../helper/baziHelper";
import { NagiaHelper } from "../../helper/nagiaHelper";
import { Branche } from "./branche";
import { Trunk } from "./trunk";
import { MyCalendar } from "../date/mycalendar";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { PilarBase } from "./pilarBase";

export class PeriodPilar extends PilarBase {

  date: MyCalendar;

  constructor(trunk: Trunk, branche: Branche, deity: ElementNEnergyRelation, date: MyCalendar) {
    super(trunk,branche);
    this.deity=deity; this.date=date;
  }



}
