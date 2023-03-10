import { ObjectHelper } from "../../helper/objectHelper";

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
    if (typeof detail === "undefined") {
      detail = "";
    } else {
      detail = '<li>'+detail+' = '+ value +'</li>';
    }
    this.init(value, detail);
  }

  init(value: any, detail: string) {
    this.value = value;
    this.detail = detail;
  }

  addData(data: any, detail?: string) {
    if (data !== null) {
      if (typeof detail === "undefined") detail = "";
      let force = 0;
      let tempDetail = "";
      if (data instanceof DataWithLog) {
        force = data.getValue();
        tempDetail = data.getDetail();
      } else {
        if (typeof data === "number") {
          force = data;
        }
      }
      const currValue = this.getValue();
      let prefix = detail;
      this.value += force;
      this.detail += "<li>" + prefix;
      if (currValue !== 0) {
        if (force !== 0) {
          this.detail += currValue;
        }
      }
      if (force !== 0) {
        this.detail += " + " + force;
      }
      this.detail += " = " + this.value;
      if (tempDetail.length > 0) {
        this.detail += "<ol>" + tempDetail + "</ol>";
      }
      this.detail += "</li>";
    }
  }

  addValue(force: number, detail: string, subDetail?: string) {
    if (typeof subDetail === "undefined") {
      subDetail = "";
    } else {
      subDetail = '<ol>'+subDetail+'</ol>';
    }
    if (force !== 0) {
      if (this.value === null) this.value = 0;
      const currValue = this.getValue();
      this.value += force;
      this.detail +=
        "<li>" +
        detail +
        ": " +
        currValue +
        " + " +
        force +
        " = " +
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
