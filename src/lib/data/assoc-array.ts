/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectHelper } from '../helper/objectHelper';

export class AssocArray {

    private dataArr: any[string] ;
    len: number ;

    constructor() {
      this.dataArr = [];
      this.len=0;
    }

    getDataArr(){
      return this.dataArr
    }
    
    get(key: string) {
        type keyType = keyof typeof this.dataArr;
        const attr = this.dataArr[key as keyType];
        return attr;
    }

    put(key: string, data: any): void {
        this.dataArr[key]=data;
        this.len++
    }


    pop(key: string): void {
      delete this.dataArr[key]
      // type keyType = keyof typeof this.dataArr;
      // Other solution this.dataArr[key as keyType]=undefined;
      this.len--
  }

    exist(key: string){
        return !ObjectHelper.isNaN(this.get(key));
    }

    lengh() {
      return this.dataArr.length;
    }
}
