import { ObjectHelper } from "../../helper/objectHelper";
import { EnumBaseClass } from "../enumBaseClass";

export class DataWithLog {
  static PILARS_NAME = [" Year ", " Month ", " Day ", " Hour "];

  value: any;
  detail: string;

  static currLog: DataWithLog = new DataWithLog();

  static resetCurrLog() {
    DataWithLog.currLog.setValue(false,'');
  }

  static setCurrLog(value: any, detail: string) {
    DataWithLog.currLog.setValue(value,detail);
  }

  static newDataArray(len: number, initValue?: any) {
    if (typeof initValue === "undefined") initValue = null;
    let res = ObjectHelper.newArray(len, null);
    for (let index = 0; index < len; index++) {
      res[index] = new DataWithLog(initValue);
    }
    return res;
  }

  static getHeader( prefix: string, pilarIdx: number) {
    return prefix + DataWithLog.PILARS_NAME[pilarIdx];
  }

  static getPilarHeader( pilarIdx: number) {
    return DataWithLog.getHeader('Pilar' ,pilarIdx);
  }

  static getTrunkHeader( pilarIdx: number) {
    return DataWithLog.getHeader('Trunk' ,pilarIdx);

  }

  static getBrancheHeader( pilarIdx: number) {
    return DataWithLog.getHeader('Branche' ,pilarIdx);

  }

  constructor(value?: any, detail?: string) {
    if (typeof value === "undefined") value = null;
    this.value=value;
    if (typeof detail === "undefined") {
      this.detail = "";
    } else {
      if ( !detail.startsWith('<') ) {
        if ( ObjectHelper.isNaN(value) ) value = '';
        detail = '<li>'+detail+' = '+ value +'</li>';
      }
      this.detail=detail;
    }
  }

  addData(data: any, detail?: string, subDetail?: string) {
    if (data !== null) {
      if (typeof detail === "undefined") detail = "";
      if (typeof subDetail === "undefined") {
        subDetail = "";
      } else {
        subDetail = '<ol>'+subDetail+'</ol>';
      }
      let force = 0;
      if (data instanceof DataWithLog) {
        force = data.getValue();
        subDetail += data.getDetail();
      } else {
        if (typeof data === "number") {
          force = data;
        }
      }
      this.addValue(force,detail,subDetail);
    }
  }

  getForceWithSign(force:number) {
    let sign ='+';
    if ( force<0 ) sign='';
    return sign+force;
  }

  addValue(force: number, detail: string, subDetail?: string) {
    if (typeof subDetail === "undefined") {
      subDetail = "";
    } else {
      if ( detail.length!==0 ) {
        subDetail = '<ol>'+subDetail+'</ol>';
      }
    }
    if (this.value === null) this.value = 0;
    if (force !== 0) {
      const currValue = this.getValue();
      this.value += force;
      if ( currValue===0 ) {
        this.detail = detail ;
      } else {
      if ( detail.length===0 ) {
        detail = subDetail ;
        subDetail='';
      }
    }
      this.detail +=
        "<li>" + currValue + " + (<ol>" +
        detail +
        "</ol>: " + this.getForceWithSign(force)+
        ") = " +
        this.value +
        subDetail+
        " </li>" ;
    }
  }

  updateValue(value: any, detail: string, subDetail?: string) {
    if (typeof subDetail === "undefined") {
      subDetail = "";
    } else {
      subDetail = '<ol>'+subDetail+'</ol>';
    }
    this.value = value;
    this.detail += "<li>" + detail + " = " + value + subDetail+"</li>";
  }

  setValue(value: any, detail: string) {
    this.value = value;
    this.detail = "<li>" + detail + " = " + value + " </li>";
  }

  getValue() {
    if (this.value === null) this.value = 0;
    return this.value;
  }

  getDetail() {
    return this.detail;
  }
}
