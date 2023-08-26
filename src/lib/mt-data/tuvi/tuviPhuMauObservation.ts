import { BrancheHelper } from "../../helper/brancheHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ElementRelation } from "../feng-shui/element-relation";
import { Energy } from "../feng-shui/energy";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Element } from '../../mt-data/feng-shui/element';
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";


export class TuViPhuMauObservation extends TuViPalaceObservationBase {


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "PhuMau"
  }

// Update force based on force of Palaces:  PhucDuc
//
override updateForce() {
    super.updateForce();
    this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
}


// Usage MotherDeadBeforeFather
checkMotherDeadBeforeFather(): boolean {
  const nhat=TuViStar.THAIDUONG
  const nhatBranche=nhat.getPalace().branche
  const nguyet=TuViStar.THAIDUONG
  const nguyetBranche=nguyet.getPalace().branche
  const isDayBorn =  this.isBornInDay();
  if ( nhatBranche===nguyetBranche ) {
    const observation = nhat.getPalace().palaceObservation
    return observation.hasTuanTrietKhong === !isDayBorn
  } else {
    const starMap = this.tuviHoroscope.tuviPalaceStarMap
    if (starMap.isThaiDuongFavorable&&starMap.isThaiAmFavorable) {
      return !isDayBorn
    } else {
      return starMap.isThaiDuongFavorable
    }
  }

}

override isAttrPresent( attrKey: string, params: string[]): boolean {
  switch (attrKey) {
    case "MotherDeadBeforeFather":
      return this.checkMotherDeadBeforeFather();
    default:
        return super.isAttrPresent(attrKey,params)
    }
    return false;
  }

}
