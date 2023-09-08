import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";


export class TuViPhuTheObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "PhuThe"
  }


// Update force based on force of Palaces: Menh, Than, PhucDuc or presence of good stars
//
override updateForce() {
    // Assume final pass
    super.updateForce();
    this.updateForceFromObservation(this.getObservations(TuViRing.Menh));
    this.updateForceFromObservation(this.getThanObservations());
    this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
}

commentPhuThe() {
    this.genThienDiaInfluence();
}


override comment() {
    super.comment();
    this.commentPhuThe();
}

}
