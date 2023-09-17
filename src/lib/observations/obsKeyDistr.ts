import { AssocArray } from '../data/assoc-array';
import { ObjectHelper } from '../helper/objectHelper';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { ObsPeriod } from './obsPeriod';

export class ObsKeyDistr {
  private distr: AssocArray[] = null; // Observed keys at an ObsTime Time
  private obsDate: MyCalendar[] = null; // an ObsTime Time

  constructor() {
    this.obsDate = [];
    this.distr = [];
  }

  clearSession(atPeriod: ObsPeriod, atDate: MyCalendar) {
    const pOrd = atPeriod.ordinal();
    this.distr[pOrd] = new AssocArray();
    this.obsDate[pOrd] = atDate;
  }

  getObsKeys(atPeriod: ObsPeriod) {
    const pOrd = atPeriod.ordinal();
    return this.distr[pOrd];
  }

  getObsDate(atPeriod: ObsPeriod) {
    const pOrd = atPeriod.ordinal();
    return this.obsDate[pOrd];
  }

  put(atPeriod: ObsPeriod, key: string, data: any) {
    const pOrd = atPeriod.ordinal();

    if (ObjectHelper.isNaN(this.distr[pOrd])) {
      this.distr[pOrd] = new AssocArray();
    }
    this.distr[pOrd].put(key, data);
    //console.log("PUT key ", key,  atPeriod, data, this.distr[pOrd].get(key) )
  }

  get(atPeriod: ObsPeriod, key: string) {
    const pOrd = atPeriod.ordinal();
    if (!ObjectHelper.isNaN(this.distr[pOrd])) {
      return this.distr[pOrd].get(key);
    }
    return null;
  }
}
