import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ElementRelation } from "../feng-shui/element-relation";
import { Energy } from "../feng-shui/energy";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";

export class TuViPhucDucObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "PhucDuc"
  }

  // Force String depend on palace type and note
  override evalForceString() {
        let res = "&+.+";
        const note = this.palace.getNote();
        if (note <= 80) res = "&+";
        if (note <= 60) res = "&+.-";
        if (note <= 50) res = "&-";
        if (note <= 40) res = "&-.-";
        return "&+.+";
  }

    override isFavorable() {
        return this.palace.getNote() > 50;
    }

    ;
}
