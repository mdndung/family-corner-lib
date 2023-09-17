import { BrancheHelper } from '../../helper/brancheHelper';
import { TuViHoroscope } from '../../horoscope/tuviHoroscope';
import { TuViPalace } from './tuviPalace';
import { TuViPalaceObservationBase } from './tuviPalaceObservationBase';
import { TuViRing } from './tuviRing';
import { Branche } from '../bazi/branche';
import { TuViStar } from './tuviStar';
import { TuViStarHelper } from '../../helper/tuviStarHelper';


export class TuViTaiBachObservation extends TuViPalaceObservationBase {
  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "TaiBach"
  }


  //
  override updateForce() {
    super.updateForce();
    this.updateForceFromObservation(this.getObservations(TuViRing.Menh));
    this.updateForceFromObservation(this.getThanObservations());
    this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
    this.updateForceFromObservation(this.getObservations(TuViRing.QuanLoc));
    this.updateForceFromObservation(this.getObservations(TuViRing.ThienDi));
  }

}
