import { QiForce } from "../mt-data/qi/qi-force";

export class StringHelper {

  static NL = '\n';

  static bool2Str(b: boolean) {
    if ( b ) {return '+';}
    return '-';
  }

  static  qiForce2Str(qiForce:QiForce, zeroValue?: string) {
    if ( typeof zeroValue==='undefined') zeroValue='0';
    if ( qiForce===QiForce.NONE) {return '0';}
    if ( qiForce.isFavorable()) {return '+';}
    return '-';
  }



  static number2Str(count: number, plusValue?: number) {
    if ( typeof plusValue === 'undefined' ) plusValue=0;
    if ( count===0 ) {return '0';}
    if ( count>=plusValue ) {return '+';}
    return '-';
  }

}
