/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';

export class QiType extends EnumBaseClass {

		// Convention: If possible Direction From to To
		// Ordered by Ref3 p178+x

  static  NONE=new QiType('NONE',false);

  // Ref3 p179 Duoc Lenh
  // Ref7a p7.1
  static  MONTHBRANCHEDAYTRUNKLIFECYCLE=
            new QiType('DDL',true);
  // Ref 3 p179				Dac dia
	// Ref 7a p7.1,7.2
	// Ref 9 p150
	// Ref 10a p136
  static  EARTHDAYTRUNKSUPPORT = new QiType('DDD',true);
  // Ref3 p179				Duoc Sinh (Soutien par la croissance)
	// Ref 7a p7.1,7.2
	// Ref 9  p152
  static  GROWDAYTRUNKSUPPORT= new QiType('DDS',true);
  // Ref 3 p 180				Duoc Tro giup (Soutien par les autres troncs)
	// Ref 7a p7.1,7.2
	// Ref 9  p152
  static  PILARDAYTRUNKSUPPORT= new QiType('DDG',true);
  // Ref3 p180				Can ngay vuong sinh
	// Ref3 p69
  static  DAYSTATUS= new QiType('CN',true);
  // Ref8 p8 					Dung than
	// Ref3 p378
  static  PIVOT= new QiType('DT',true);
  static  PIVOTCOUNT= new QiType('DTC',true);
  // Ref3 p382 				Hy than
	// Ref8 p8
  static  PIVOTSUPPORT= new QiType('HT',true);
  // Ref8 p8 					Ki than
	// Ref3 p382
  static  PIVOTRESTRICT= new QiType('KT',true);
  // Ref2 p350				Thuan/Nghich mua (Season) sinh
  static  BIRTHSEASONENERGY= new QiType('MS',true);
  // Ref2 p356				Thuan/Nghich thoi (Solar term) sinh
  static  BIRTHWITHTIME= new QiType('TS',true);


  // Ref2 p366				Duoc theo				People => Theme
  /// JAVA KEY (Duplicated) DDT
  static  FOLLOWERTHEME= new QiType('FOT',false);
  // Ref2 p343                Que tot hay xau
  // Theme sky and Earth trigram combinaison quality
  static  THEMESKYEARTHTRIGRAM= new QiType('QTX',false);
  // Ref2 p364				Huu vien/Vo Vien		Other's Yao => Subject's
  static  THEMEOTHERSUBJECTYAO= new QiType('HV',false);
  // Hop ly (Theme Element support destiny element)
  static  THEMECOMPATIBLE= new QiType('TCT',false);
  // Ref2 p48-49, Ref4 p23    Hoa Cong
  static  MONTHTHEMETRIGRAM= new QiType('HC',false);
  // Ref2 p349				Dac thoi
  static  MONTHTHEMEBRANCHE= new QiType('DDT',false);
  // Ref4 p23,24				Thien quyen khi
  static  YEARSKYTRIGRAM= new QiType('TNK',false);
  // Ref4 p23,24				Dia quyen khi
  static  YEAREARTHTRIGRAM= new QiType('DNK',false);
  // Ref2 p306,362, Ref 4p63	Dac the
  static  YEARTHEMEELEMENT= new QiType('DAT',false);
  // Ref4 p20, 66				Nap Giap
  static  YEARTRUNKTHEMESKYTRIGRAM= new QiType('NG',false);
  // Ref2 p361&380            Dang vi
  static  MONTHBRANCHEENERGY= new QiType('DDV',false);

  // Ref3 p62					Hop Hoa
  static  DAYCOMBINETRANSFORM= new QiType('HH',true);
  // Ref3 p62					Hop khong hoa
  //static  DAYCOMBINE= new QiType('DAYCOMBINE',true,'HKH');

  // Ref3 p47, p247           Ngu hop
  //static  TRUNKCOMBINAISON= new QiType('TRUNKCOMBINAISON',true,'NGH');
  // Ref8 p32                 Can Tuong khac
  //static  TRUNKCLASH= new QiType('TRUNKCLASH',true,'TUKH');
  // Ref3 p55, p253           Luc hop
  //static  BRANCHCOMBINAISON= new QiType('BRANCHCOMBINAISON',true,'LH');
  // Ref3 p55, p253           Luc hop Khac
  //static  BRANCHCOMBINAISONRESTRICT= new QiType('BRANCHCOMBINAISONRESTRICT',true,'LHK');
  // Ref3 p55, p253           Luc hop Sinh
  //static BRANCHCOMBINAISONPLUS = new QiType('BRANCHCOMBINAISONPLUS',true,'LHS');
  // Ref3 p55, p253           Luc hop Khac ngay
  //static  BRANCHCOMBINAISONRESTRICTDAY= new QiType('BRANCHCOMBINAISONRESTRICTDAY',true,'LHKD');
  // Ref3 p55, p253           Luc hop Sinh ngay
  //static  BRANCHCOMBINAISONPLUSDAY= new QiType('BRANCHCOMBINAISONPLUSDAY',true,'LHSD');
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISON= new QiType('TAH',true);
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISONYHD= new QiType('TAHYHD',true);
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISONMHD= new QiType('TAHMHD',true);
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISONYMH= new QiType('TAHYMH',true);
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISONYMD= new QiType('TAHYMD',true);
  // Ref8 p37					Ban Tam hoi
  static  MIDSEASONCOMBINAISON= new QiType('BTAH',true);


// Ref3 p56					Tam hop
  static  COMBINATIONOF3= new QiType('THI',true);
  // Ref3 p56					Tam hop
  static  COMBINATIONOF3YHD= new QiType('THIYHD',true);
  // Ref3 p56					Tam hop
  static  COMBINATIONOF3MHD= new QiType('THIMHD',true);
  // Ref3 p56					Tam hop
  static  COMBINATIONOF3YMH= new QiType('THIYMH',true);
  // Ref3 p56					Tam hop
  static  COMBINATIONOF3YMD= new QiType('THIYMD',true);
  // Ref8 p37					Ban Tam hop
  static  MIDCOMBINATION= new QiType('BTHI',true);

  // Ref3 p257				Tuong hai
  static  BRANCHECLASH= new QiType('TUH',true);

  // Evaluation purpose
  static  DO7K2RWFLEVERAGE= new QiType('DO7KRWF',false);
  static  DRIR2RWFLEVERAGE= new QiType('DRIRRWF',false);
  static  DWIWCOUNT= new QiType('DWIW',false);
  static  HOEGCOUNT= new QiType('HOEG',false);

  static  PERIODMENHELEMENTSTATUS= new QiType('PELMSTAT',false);
  static  PERIODYEARELEMENTSTATUS= new QiType('PELYSTAT',false);
  static  PERIODDAYELEMENTSTATUS= new QiType('PELDSTAT',false);
  static  PERIODTRUNKSTATUS= new QiType('PTSTAT',false);
  static  PERIODBRANCHESTATUS= new QiType('PBSTAT',false);
  static  PERIODSTATUSFORCE= new QiType('PSTATF',false);
  static  PERIODSTATUS= new QiType('PSTAT',false);


  static  YEARBIRTHTRUNKCLASH= new QiType('YBTC',false);
  static  YEARBIRTHBRANCHECLASH= new QiType('YBBC',false);
  static  YEARCONTROLBIRTHELEMENT= new QiType('YCB',false);
  static  BIRTHCONTROLYEARELEMENT= new QiType('BCYE',false);
  static  YEARSTATUS= new QiType('YSTAT',false);
  static  YEARSTATUSFORCE= new QiType('YSTATF',false);
  static  YEARTAMTAI= new QiType('YTT',false);

  isGeneralType: boolean ;

  constructor(name: string, isGeneralType: boolean) {
    super(name);
    this.isGeneralType = isGeneralType;
  }

  static getQiTypeByName(name:string) {
    return QiType.BIRTHCONTROLYEARELEMENT.getEnumByName(name) as QiType
  }

  override getClassName() {return 'Qi.Type';}

}
