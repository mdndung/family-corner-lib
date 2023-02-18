/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';

export class QiType extends EnumBaseClass {

		// Convention: If possible Direction From to To
		// Ordered by Ref3 p178+x

  static  NONE=new QiType('NONE',false,'NONE');

  // Ref3 p179 Duoc Lenh
  // Ref7a p7.1
  static  MONTHBRANCHEDAYTRUNKLIFECYCLE=
            new QiType('MONTHBRANCHEDAYTRUNKLIFECYCLE',true,'DDL');
  // Ref 3 p179				Dac dia
	// Ref 7a p7.1,7.2
	// Ref 9 p150
	// Ref 10a p136
  static  EARTHDAYTRUNKSUPPORT = new QiType('EARTHDAYTRUNKSUPPORT',true,'DDD');
  // Ref3 p179				Duoc Sinh (Soutien par la croissance)
	// Ref 7a p7.1,7.2
	// Ref 9  p152
  static  GROWDAYTRUNKSUPPORT= new QiType('GROWDAYTRUNKSUPPORT',true,'DDS');
  // Ref 3 p 180				Duoc Tro giup (Soutien par les autres troncs)
	// Ref 7a p7.1,7.2
	// Ref 9  p152
  static  PILARDAYTRUNKSUPPORT= new QiType('PILARDAYTRUNKSUPPORT',true,'DDG');
  // Ref3 p180				Can ngay vuong sinh
	// Ref3 p69
  static  DAYSTATUS= new QiType('DAYSTATUS',true,'CN');
  // Ref8 p8 					Dung than
	// Ref3 p378
  static  PIVOT= new QiType('PIVOT',true,'DT');
  // Ref3 p382 				Hy than
	// Ref8 p8
  static  PIVOTSUPPORT= new QiType('PIVOTSUPPORT',true,'HT');
  // Ref8 p8 					Ki than
	// Ref3 p382
  static  PIVOTRESTRICT= new QiType('PIVOTRESTRICT',true,'KT');
  // Ref2 p350				Thuan/Nghich mua (Season) sinh
  static  BIRTHSEASONENERGY= new QiType('BIRTHSEASONENERGY',true,'MS');
  // Ref2 p356				Thuan/Nghich thoi (Solar term) sinh
  static  BIRTHWITHTIME= new QiType('BIRTHSOLARTERMENERGY',true,'TS');


  // Ref2 p366				Duoc theo				People => Theme
  /// JAVA KEY (Duplicated) DDT
  static  FOLLOWERTHEME= new QiType('FOLLOWERTHEME',false,'FOT');
  // Ref2 p343                Que tot hay xau
  // Theme sky and Earth trigram combinaison quality
  static  THEMESKYEARTHTRIGRAM= new QiType('THEMESKYEARTHTRIGRAM',false,'QTX');
  // Ref2 p364				Huu vien/Vo Vien		Other's Yao => Subject's
  static  THEMEOTHERSUBJECTYAO= new QiType('THEMEOTHERSUBJECTYAO',false,'HV');
  // Hop ly (Theme Element support destiny element)
  static  THEMECOMPATIBLE= new QiType('THEMECOMPATIBLE',false,'TCT');
  // Ref2 p48-49, Ref4 p23    Hoa Cong
  static  MONTHTHEMETRIGRAM= new QiType('MONTHTHEMETRIGRAM',false,'HC');
  // Ref2 p349				Dac thoi
  static  MONTHTHEMEBRANCHE= new QiType('MONTHTHEMEBRANCHE',false,'DDT');
  // Ref4 p23,24				Thien quyen khi
  static  YEARSKYTRIGRAM= new QiType('YEARSKYTRIGRAM',false,'TNK');
  // Ref4 p23,24				Dia quyen khi
  static  YEAREARTHTRIGRAM= new QiType('YEAREARTHTRIGRAM',false,'DNK');
  // Ref2 p306,362, Ref 4p63	Dac the
  static  YEARTHEMEELEMENT= new QiType('YEARTHEMEELEMENT',false,'DAT');
  // Ref4 p20, 66				Nap Giap
  static  YEARTRUNKTHEMESKYTRIGRAM= new QiType('YEARTRUNKTHEMESKYTRIGRAM',false,'NG');
  // Ref2 p361&380            Dang vi
  static  MONTHBRANCHEENERGY= new QiType('YEARTHEMEELEMENT',false,'DDV');

  // Ref3 p62					Hop Hoa
  static  DAYCOMBINETRANSFORM= new QiType('DAYCOMBINETRANSFORM',true,'HH');
  // Ref3 p62					Hop khong hoa
  static  DAYCOMBINE= new QiType('DAYCOMBINE',true,'HKH');

  // Ref3 p47, p247           Ngu hop
  static  TRUNKCOMBINAISON= new QiType('TRUNKCOMBINAISON',true,'NGH');
  // Ref8 p32                 Can Tuong khac
  static  TRUNKCLASH= new QiType('TRUNKCLASH',true,'TUKH');
  // Ref3 p55, p253           Luc hop
  static  BRANCHCOMBINAISON= new QiType('BRANCHCOMBINAISON',true,'LH');
  // Ref3 p55, p253           Luc hop Khac
  static  BRANCHCOMBINAISONRESTRICT= new QiType('BRANCHCOMBINAISONRESTRICT',true,'LHK');
  // Ref3 p55, p253           Luc hop Sinh
  static BRANCHCOMBINAISONPLUS = new QiType('BRANCHCOMBINAISONPLUS',true,'LHS');
  // Ref3 p55, p253           Luc hop Khac ngay
  static  BRANCHCOMBINAISONRESTRICTDAY= new QiType('BRANCHCOMBINAISONRESTRICTDAY',true,'LHKD');
  // Ref3 p55, p253           Luc hop Sinh ngay
  static  BRANCHCOMBINAISONPLUSDAY= new QiType('BRANCHCOMBINAISONPLUSDAY',true,'LHSD');
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISON= new QiType('SEASONCOMBINAISON',true,'TAH');
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISONYHD= new QiType('SEASONCOMBINAISONYHD',true,'TAHYHD');
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISONMHD= new QiType('SEASONCOMBINAISONMHD',true,'TAHMHD');
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISONYMH= new QiType('SEASONCOMBINAISONYMH',true,'TAHYMH');
  // Ref3 p55					Tam hoi
  static  SEASONCOMBINAISONYMD= new QiType('SEASONCOMBINAISONYMD',true,'TAHYMD');
  // Ref8 p37					Ban Tam hoi
  static  MIDSEASONCOMBINAISON= new QiType('MIDSEASONCOMBINAISON',true,'BTAH');


// Ref3 p56					Tam hop
  static  COMBINATIONOF3= new QiType('COMBINATIONOF3',true,'THI');
  // Ref3 p56					Tam hop
  static  COMBINATIONOF3YHD= new QiType('COMBINATIONOF3YHD',true,'THIYHD');
  // Ref3 p56					Tam hop
  static  COMBINATIONOF3MHD= new QiType('COMBINATIONOF3MHD',true,'THIMHD');
  // Ref3 p56					Tam hop
  static  COMBINATIONOF3YMH= new QiType('COMBINATIONOF3YMH',true,'THIYMH');
  // Ref3 p56					Tam hop
  static  COMBINATIONOF3YMD= new QiType('COMBINATIONOF3YMD',true,'THIYMD');
  // Ref8 p37					Ban Tam hop
  static  MIDCOMBINATION= new QiType('MIDCOMBINATION',true,'BTHI');

  // Ref3 p257				Tuong hai
  static  BRANCHECLASH= new QiType('BRANCHECLASH',true,'TUH');


  isGeneralType: boolean ;
  key: string ;

  constructor(name: string, isGeneralType: boolean, key: string) {
    super(name);
    this.isGeneralType = isGeneralType;
    this.key = key;
  }

  override getClassName() {return 'Qi.Type';}

}
