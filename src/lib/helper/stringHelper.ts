
export class StringHelper {

  static NL = '\n';

  static bool2Str(b: boolean) {
    if ( b ) {return '+';}
    return '-';
  }

  static number2Str(count: number, plusValue?: number) {
    if ( typeof plusValue === 'undefined' ) plusValue=0;
    if ( count===0 ) {return '0';}
    if ( count>=plusValue ) {return '+';}
    return '-';
  }


}
