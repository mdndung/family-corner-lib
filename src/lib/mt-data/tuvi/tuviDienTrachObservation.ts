
import { TuViHoroscope } from '../../horoscope/tuviHoroscope';
import { TuViPalace } from './tuviPalace';
import { TuViPalaceObservationBase } from './tuviPalaceObservationBase';


export class TuViDienTrachObservation extends TuViPalaceObservationBase {

  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }

  getHeaderSuffix(): string {
    return "DienTrach"
  }

}
