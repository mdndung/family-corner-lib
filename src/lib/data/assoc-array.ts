/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectHelper } from '../helper/objectHelper';

export class AssocArray {

    dataArr: any[] ;

    constructor() {
      this.dataArr = [];
    }

    get(key: string) {
        type keyType = keyof typeof this.dataArr;
        const attr = this.dataArr[key as keyType];
        return attr;
    }

    put(key: string, data: any): void {
        type keyType = keyof typeof this.dataArr;
        this.dataArr[key as keyType]=data;
    }


    pop(key: string): void {
      type keyType = keyof typeof this.dataArr;
      this.dataArr[key as keyType]=[];
  }

    exist(key: string){
        return !ObjectHelper.isNaN(this.get(key));
    }

    lengh() {
      return this.dataArr.length;
    }
}
