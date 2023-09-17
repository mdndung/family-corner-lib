import { ObservationBase } from "./observationBase";


export class HalacObservation extends ObservationBase {

  constructor(genrePrefix: string) {
    super(genrePrefix);
  }

  getDestinHeader(): string {
    return "Halac"
  }


  override isAttrPresent(attrKey: string, params: string[]): boolean {
    switch (attrKey) {

      default:
        return super.isAttrPresent(attrKey, params);
    }
  }


  override comment() {
    super.comment();
    this.filterObservation(this.getDestinHeader(), false);
  }

}
