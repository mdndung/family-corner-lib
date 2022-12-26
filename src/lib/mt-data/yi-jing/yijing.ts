/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */

import { BaziHelper } from '../../helper/baziHelper';
import { TrigramHelper } from '../../helper/trigramHelper';
import { Energy } from '../feng-shui/energy';
import { Trigram } from '../feng-shui/trigram';
import { QiTypeDataRec } from '../qi/qi-type-data-rec';

export class YiJing {

  hexaArr?: Energy[]= null;
  posND?: number= null;
  earthTrigram?: Trigram= null;
  skyTrigram?: Trigram= null;
  isPrincipalTheme?: boolean= null;
  qiTypeForce?: QiTypeDataRec= null;

  private myYaoPos?: number = -1;
  private heYaoPos?: number = -1;

  static hexaOrder = [
		[9,56,11,30,55,10,61,12],
		[16,49,50,29,52,51,62,15],
		[27,26,25,28,53,64,63,14],
		[46,5,36,33,34,23,24,35],
		[47,4,37,2,1,22,3,48],
		[58,59,32,31,54,57,60,13],
		[45,6,39,40,19,20,17,18],
		[44,7,38,43,8,21,42,41],
	];



  static getInstanceFromHexaArr(hexaArr: Energy[], ndPos: number) {
    const instance = new YiJing();
    instance.hexaArr=hexaArr;
    instance.posND=ndPos;
    instance.initSkyEarth();
    instance.isPrincipalTheme=true;
    return instance;
  }

  static getInstanceFromSkyEarth(earthTrigram: Trigram,skyTrigram: Trigram,ndPos: number) {
    const instance = new YiJing();
    instance.earthTrigram=earthTrigram;
    instance.posND=ndPos;
    instance.skyTrigram=skyTrigram;
    instance.isPrincipalTheme=true;
    instance.initEnergy();
    return instance;
  }

  private initEnergy() {
    this.hexaArr = [];
     let monogram = TrigramHelper.getMonogram(this.earthTrigram?.hauthienNb);
    for (let index = 0; index < monogram.length; index++) {
      this.hexaArr.push(monogram[index]);
    }
    monogram = TrigramHelper.getMonogram(this.skyTrigram?.hauthienNb);
    for (let index = 0; index < monogram.length; index++) {
      this.hexaArr.push(monogram[index]);
    }
  }

  private initSkyEarth() {
    const tArr: Energy[] = [];

    for (let index = 0; index < 3; index++) {
      tArr.push(this.hexaArr?.[index]);
    }
    this.earthTrigram = TrigramHelper.getTrigramByEnergy(tArr as Energy[]);

    for (let index = 3; index < 6; index++) {
      tArr[index-3]=(this.hexaArr?.[index]);
    }
    this.skyTrigram = TrigramHelper.getTrigramByEnergy(tArr as Energy[]);
  }

  // Group number. 0 == Group Qian, 1==Group KAN, ...
  getGroupNb() {
    const nb= Math.trunc(((this.getHexaOrdinal()-1)/8));
    return nb;
  }

  // YiJing group start order (1 for Group Qian, 9 for group KAN, ..
  private getGroupStartOrder(){
    return (this.getGroupNb())*8+1;
  }

  getMyYaoPos(){
    if ( this.myYaoPos===-1 ) {
      this.evalYaoPos();
    }
    return this.myYaoPos;
  }

  setMyYaoPos(pos: number){
    this.myYaoPos=pos ;
  }

  getHeYaoPos(){
    if ( this.heYaoPos===-1 ) {
      this.heYaoPos = Math.trunc((this.getMyYaoPos()+3)%6);
    }
    return this.heYaoPos;
  }

   evalYaoPos() {

		const diffPos = this.getHexaOrdinal()-this.getGroupStartOrder();
		this.myYaoPos = 0 ;
		if ( diffPos < 6 ) {
			this.myYaoPos = (5 +diffPos)%6;
		} else {
			if (diffPos===6 ) {
				this.myYaoPos = 3;
			} else {
				this.myYaoPos = 2 ;
			}
		}
    this.heYaoPos= (this.myYaoPos+3)%6;
  }

  getHexaOrdinal() {
    return YiJing.hexaOrder[this.skyTrigram.ordinal()][this.earthTrigram.ordinal()];
  }

  getEnergyCount( energy: Energy) {
    let count = 0 ;
    for (let index = 0; index<this.hexaArr?.length; index++) {
      if ( energy.isEqual(this.hexaArr?.[index]) ) {
        count++;
      }
    }
    return count ;
  }

  getSecondaryThemeInstance( ) {
    const b: Energy[]=[...this.hexaArr];
    for (let index = 0; index<this.hexaArr?.length; index++) {
      b[(index+3)%6] = this.hexaArr[index];
    }
    const secNdPos = Math.trunc((this.posND+3)%6);
    b[secNdPos]=this.hexaArr[this.posND].getOpposite();
    const res = YiJing.getInstanceFromHexaArr(b,secNdPos);
    res.isPrincipalTheme=false;
    return res ;
  }

  // Ref2p65
  private getEnergyAge(energy: Energy) {
    if ( Energy.YIN.isEqual(energy)) {return 6;}
    return 9;
  }

  getPeriod(startAge: number) {
    const res = [];
    let currAge = startAge;
    res[0]=startAge;
    for (let index = 0; index<6; index++) {
			currAge += this.getEnergyAge(this.hexaArr[(index+this.posND)%6]);
			res[index+1] = currAge;
    }
    return res ;
  }

  getElement() { return this.earthTrigram.getElement(); }

  getComplement(): YiJing {
		let resPosND = 0 ;
	  const t: Energy[] = [];

    t.push(this.hexaArr[1]);
    t.push(this.hexaArr[2]);
    t.push(this.hexaArr[3]);
    t.push(this.hexaArr[2]);
    t.push(this.hexaArr[3]);
    t.push(this.hexaArr[4]);

		switch (this.posND){
		case 0: resPosND = 0 ; break ;
		case 2: case 3: case 4:resPosND = this.posND+1 ; break ;
		case 5: resPosND=5; break;
		}
		const res = YiJing.getInstanceFromHexaArr(t,resPosND);

		return res ;
  }


  detailsToString() {
		const res = ' ND ' + this.posND +' '+BaziHelper.energyArrToString(this.hexaArr);
    return res ;
	}


  toString() {
    const yiChingNb = BaziHelper.getYiChingIndex(this.skyTrigram, this.earthTrigram);
    const hexaNb = this.getHexaOrdinal();
    return 'Hexa.'+hexaNb + ' '+ 'YiChing.'+yiChingNb +
           ' YAO POS ' + (this.myYaoPos+1) +' '+ (this.heYaoPos+1) +
           ' ' + this.skyTrigram.getFullName()+'/'+this.earthTrigram.getFullName()+
           ' ' + this.detailsToString() ;
  }
}
