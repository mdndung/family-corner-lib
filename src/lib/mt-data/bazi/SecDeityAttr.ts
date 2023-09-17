import { SecDeityRec } from "./SecDeityRec";
import { SecondaryDeity } from "./secondaryDeity";

export class SecDeityAttr {

  secDeityRecArr: SecDeityRec [];

  constructor() {
    this.secDeityRecArr=[];
  }

  getSecDeityRec () { return this.secDeityRecArr };

  findRec (secDeity: SecondaryDeity) {
    for (let index = 0; index < this.secDeityRecArr.length; index++) {
      const element = this.secDeityRecArr[index];
      if ( element.secDeity===secDeity ) return element
    }
    return null
  }

  findCreateIfNotFound ( secDeity: SecondaryDeity ) {
    let secDeityRec =  this.findRec(secDeity);
    if ( secDeityRec===null ) {
      secDeityRec = new SecDeityRec(secDeity);
      this.secDeityRecArr.push(secDeityRec)
    }
    return secDeityRec;
  }

  add (secDeity: SecondaryDeity) {
    if ( secDeity===null ) return ;
    let secDeityRec = this.findCreateIfNotFound(secDeity);
    secDeityRec.incCount();
  }

}
