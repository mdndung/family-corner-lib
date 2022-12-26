import { MyCalendar } from '../mt-data/date/mycalendar';


export class FengShuiHelper {

  static guaSolarYear(year: number, month: number, day: number) {
      let solarYear = year;
      if (MyCalendar.JANUARY===month) {
        solarYear -= 1 ;
      } else {
        if (MyCalendar.FEBRUARY===month) {
          if (day<5 ) {solarYear -= 1 ;}
        }
      }
      return solarYear;
  }

   static  numberReduction( n: number) {
		let i = n;

		while ( i<=0 ) {
			i = i + 10;
		}
		while (i >= 10) {
			i = Math.trunc(i % 10 + i / 10);
		}
		return i;
	}

  static yearReduction( year: number) {
	  let gua = Math.trunc(year / 1000); // gua = 1
		let temp = Math.trunc(year % 1000); // temp = 954
		gua += Math.trunc(temp / 100); // gua = 1 + 9 = 10
		temp = Math.trunc(temp % 100); // temp = 54
		gua += Math.trunc(temp / 10); // gua = 10 + 5 = 15
		gua += Math.trunc(temp % 10); // gua = 15 + 4 = 19
		gua = FengShuiHelper.numberReduction(gua) ;
		return gua;
	}

  static evalGua(birthDate: MyCalendar, genreMan: boolean) {

    const year = FengShuiHelper.guaSolarYear(birthDate.getYear(), birthDate.getMonth(),birthDate.getDay());
    let gua = FengShuiHelper.yearReduction(year) ;
    if ( genreMan ) {
			gua = 11 - gua;
		} else {
			gua += 4;
		}
    gua = FengShuiHelper.numberReduction(gua);
    if ( 5===gua ) {
			if (genreMan) {
				gua = 2;
			} else {
				gua=8;
			}
		}
		return gua;
  }
}
