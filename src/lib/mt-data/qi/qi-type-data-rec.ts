
import { QiForce } from './qi-force';
import { QiType } from './qi-type';

export class QiTypeDataRec {
  qiTypeArr: string[];
  qiTypeForceArr: number[];

  constructor() {
    this.qiTypeArr = [];
    this.qiTypeForceArr = [];
  }

  getIndex(qiType: QiType) {
    const name = qiType.getName();
    let cIdx = this.qiTypeArr.indexOf(name);
    if (cIdx === -1) {
      cIdx = this.qiTypeArr.length;
      this.qiTypeArr.push(name);
      this.qiTypeForceArr.push(0);
    }
    return cIdx;
  }

  addQiTypeForce(qiType: QiType, force: number) {
      const cIdx = this.getIndex(qiType);
      this.qiTypeForceArr[cIdx] += force;
  }

  getForce(qiType: QiType) {
    const name = qiType.getName();
    const cIdx = this.qiTypeArr.indexOf(name);
    if (cIdx === -1) {
      return 0;
    }
    return this.qiTypeForceArr[cIdx];
  }

  isForceGEThan(qiType: QiType, force: number) {
    return this.getForce(qiType)>=force;
  }

  isFavorable(qiType: QiType) {
    return this.isForceGEThan(qiType, QiForce.FAVORABLEFORCE);
  }

  isHostile(qiType: QiType) {
    return this.getForce(qiType)<=QiForce.HOSTILE.force
  }

  hasStrongForce(qiType: QiType) {
    return this.isForceGEThan(qiType, QiForce.STRONGFORCE);
  }

  getQiTypeDirection(qiType: QiType) {
    let val = 0;
    const force = this.getForce(qiType);
    if ( force>=QiForce.FAVORABLEFORCE) {
       val = 1 ;
    } else {
      if ( force<0) {
        val = -1 ;
      }
    }
    return val;
  }

  log() {
    for (let index = 0; index < this.qiTypeArr.length; index++) {
      console.log('Status', this.qiTypeArr[index], 'Force ', this.qiTypeForceArr[index]);

    }
  }

}
