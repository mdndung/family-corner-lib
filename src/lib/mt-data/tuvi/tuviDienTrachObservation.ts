import { BrancheHelper } from '../../helper/brancheHelper';
import { TuViHoroscope } from '../../horoscope/tuviHoroscope';
import { TuViPalace } from './tuviPalace';
import { TuViPalaceObservationBase } from './tuviPalaceObservationBase';
import { Branche } from '../bazi/branche';
import { TuViStar } from './tuviStar';
import { TuViStarHelper } from '../../helper/tuviStarHelper';

export class TuViDienTrachObservation extends TuViPalaceObservationBase {

  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "DienTrach"
  }

}
