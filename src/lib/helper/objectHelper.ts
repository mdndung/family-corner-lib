export class ObjectHelper {

  static isNaN(object: any) {
    if ( undefined === object ) {return true;}
    if ( null === object ) {return true;}
    return false;
  }

  /*
  // Do not copy property. Must be explitely done by each class
  static cloneObject(object: any) {
    return structuredClone(object);
  }
 */


  static newArray(numrows: number, initial: any) {
    const arr = [];
    for (let i = 0; i < numrows; ++i) {
        arr[i] =  initial;
    }
    return arr;
  }

  static newMatrix(numrows: number, numcols: number, initial: any) {
    const arr = [];
    for (let i = 0; i < numrows; ++i) {
        const columns = [];
        for (let j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
  }

  static arrLen(arr: any[]) {
    let size = 0;
    for (const key in arr) {
        if (arr.hasOwnProperty(key)) {size++;}
    }
    return size;
  }

  static findIndex(arr: any[],item: any) {
    return arr.findIndex((aItem: any)=>aItem===item);
  }

  static hasItem(arr: any[],item: any) {
    if ( ObjectHelper.isNaN(item) ) {return false;}
    const index=ObjectHelper.findIndex(arr,item);
    return index>=0 ;
  }

  static pushIfNotExist(arr: any[],item: any) {
    if ( ObjectHelper.isNaN(item) ) {return ;}
    const index=ObjectHelper.findIndex(arr,item);
    if ( index===-1 ) {
      arr.push(item);
    }
  }

  static popIfExist(arr: any[],item: any) {
    if ( ObjectHelper.isNaN(item) ) {return ;}
    const index=ObjectHelper.findIndex(arr,item);
    if ( index>-1 ) {
      arr.splice(index,1);
    }
  }

  static sortNumber(arr: any[],asc: boolean) {
    let sortResult = -1;
    if ( !asc ) sortResult = 1 ;
    arr.sort((a , b) => {
        if (a<b ) {
          return sortResult;
        }
        return 0;
    });
  }


  static sortWithCompareTo(arr: any[],asc: boolean) {
    let sortResult = -1;
    if ( !asc ) sortResult = 1 ;
    arr.sort((a , b) => {
        if ( a.compareTo(b)==-1 ) {
          return sortResult;
        }
        return 0;
    });
  }
}
