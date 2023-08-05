import { SecondaryDeity } from "./secondaryDeity";

export class SecDeityRec {

  secDeity: SecondaryDeity ;
  count: number;
  force: number;

  constructor(secDeity: SecondaryDeity) {
    this.secDeity=secDeity; this.count=0; this.force=0;
  }

  incCount() {
    this.count++
  }

  isFavorable() {
    return this.secDeity.isFavorable()
  }

  addForce(force:number) {
    this.force+=force
  }

  getForce() {
    if ( this.isFavorable() ) return this.force;
    return -this.force
  }
}
