/* eslint-disable @typescript-eslint/naming-convention */
export class CalcHelper {

   static  PI180 = 180.0/Math.PI;

   static  RFromD( d: number) { return d/CalcHelper.PI180; }

   static  MinDistanceD( deg1: number,  deg2: number) {
      const i = Math.abs(deg2-deg1);
      if (i<180.0) {return i;}
      return 180-i;
   }

}
