/* eslint-disable @typescript-eslint/naming-convention */
export class LunarBase {

  static PILARS_LEN = 4;
  static YINDEX=0;
  static MINDEX=1;
  static DINDEX=2;
  static HINDEX=3;
  static LINDEX=4;
  static  ymdhCharArr = [ 'Y', 'M', 'D', 'H' ] ;

  static getPilarLabel(index: number) {
    if (index===LunarBase.YINDEX) return "Label.Year";
    if (index===LunarBase.MINDEX) return "Label.Month";
    if (index===LunarBase.DINDEX) return "Label.Day";
    if (index===LunarBase.HINDEX) return "Label.Hour";
    return "n/a";
  }

  static getPilarShortLabel(index: number) {
    return LunarBase.ymdhCharArr[index];
  }

}
