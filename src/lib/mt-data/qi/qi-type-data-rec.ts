import { MessageHelper } from "../../helper/messageHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { QiHelper } from "../../helper/qiHelper";
import { DataWithLog } from "./dataWithLog";
import { QiForce } from "./qi-force";
import { QiType } from "./qi-type";

export class QiTypeDataRec {
  qiTypeForceArr: DataWithLog[];

  constructor() {
    this.qiTypeForceArr = ObjectHelper.newArray(
      QiType.NONE.getValues().length,
      null
    );
  }

  getIndex(qiType: QiType) {
    return qiType.ordinal();
  }


  addQiTypeForce(qiType: QiType, force: DataWithLog, detail?: string) {
    if (force !== null) {
      if ( typeof detail==='undefined' ) { detail = ''+qiType}
      if (this.qiTypeForceArr[this.getIndex(qiType)] === null) {
        this.qiTypeForceArr[this.getIndex(qiType)] = force;
      } else {
        this.qiTypeForceArr[this.getIndex(qiType)].addData(force,detail);
      }
    }
  }

  getData(qiType: QiType) {
    return this.qiTypeForceArr[this.getIndex(qiType)];
  }

  getQiForce(qiType: QiType) {
    const cIdx = this.getIndex(qiType);
    if (this.qiTypeForceArr[cIdx] === null) {
      return QiForce.NONE;
    }
    let res = this.qiTypeForceArr[cIdx].getValue();
    if ( res instanceof QiForce ) return res ;
    return QiForce.getQiForce(res);
  }

  getForce(qiType: QiType) {
    const cIdx = this.getIndex(qiType);
    if (this.qiTypeForceArr[cIdx] === null) {
      return 0;
    }
    let res = this.qiTypeForceArr[cIdx].getValue();
    if ( res instanceof QiForce ) return res.force ;
    return res ;
  }

  isForceGEThan(qiType: QiType, force: number) {
    return this.getForce(qiType) >= force;
  }

  isFavorable(qiType: QiType) {
    return this.isForceGEThan(qiType, QiForce.FAVORABLEFORCE);
  }

  isHostile(qiType: QiType) {
    return this.getForce(qiType) <= QiForce.HOSTILE.force;
  }

  hasStrongForce(qiType: QiType) {
    return this.isForceGEThan(qiType, QiForce.STRONGFORCE);
  }

  getQiTypeDirection(qiType: QiType, reverse?: number) {
    if (typeof reverse === "undefined") reverse = 1;
    const data = this.getData(qiType);
    if (data !== null) {
      let val = 0;
      const force = data.getValue();
      let detail = "";
      if (force !== null) {
        if (force >= QiForce.FAVORABLEFORCE) {
          val = 1;
        } else {
            val = -1;
        }
        val = val * reverse;
        if (val != 0) {
          detail = qiType + ": ";
          if (val > 0) {
            detail += MessageHelper.getMessage("Label.Favorable");
          } else {
            detail += MessageHelper.getMessage("Label.Hostile");
          }
          return new DataWithLog(val,detail);
        }
      }
    }
    return null;
  }
}
