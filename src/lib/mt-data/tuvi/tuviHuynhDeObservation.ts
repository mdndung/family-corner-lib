import { BrancheHelper } from "../../helper/brancheHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ElementRelation } from "../feng-shui/element-relation";
import { Energy } from "../feng-shui/energy";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Element } from '../feng-shui/element';
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";
import { Trunk } from "../bazi/trunk";
import { BrancheRelation } from "../bazi/brancheRelation";

export class TuViHuynhDeObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "HuynhDe"
  }

// Update force based on force of Palaces:  PhucDuc
//
override updateForce() {
    super.updateForce();
    this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
}

}
