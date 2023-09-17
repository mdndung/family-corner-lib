import { BrancheHelper } from "../../helper/brancheHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ElementRelation } from "../feng-shui/element-relation";
import { Energy } from "../feng-shui/energy";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { TuviMenhObservation } from "./tuviMenhObservation";
import { Element } from "../feng-shui/element";
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";
import { Trunk } from "../bazi/trunk";
import { BrancheRelation } from "../bazi/brancheRelation";
import { TuViHelper } from "../../helper/tuviHelper";

export class TuViNoBocObservation extends TuViPalaceObservationBase {
  menhObservation: TuViPalaceObservationBase = null;

  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }
  getHeaderSuffix(): string {
    return "NoBoc";
  }

}
