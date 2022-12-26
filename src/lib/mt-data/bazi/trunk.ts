/* eslint-disable @typescript-eslint/naming-convention */
import { ElementNEnergy } from '../feng-shui/elementNenergy';
import { Trigram } from '../feng-shui/trigram';
import { EnumBaseClass } from '../enumBaseClass';
import { Energy } from '../feng-shui/energy';
import { Branche } from './branche';

export class Trunk extends EnumBaseClass {

  static  JIA= new Trunk('JIA',ElementNEnergy.WOODYANG,6, Trigram.QIAN);
  static  YI= new Trunk('YI',ElementNEnergy.WOODYIN,2, Trigram.KUN);
  static  BING= new Trunk('BING',ElementNEnergy.FIREYANG,8, Trigram.GEN);
  static  DING= new Trunk('DING',ElementNEnergy.FIREYIN,7, Trigram.DUI);
  static  WU= new Trunk('WU',ElementNEnergy.EARTHYANG,1, Trigram.KAN);
  static  JI= new Trunk('JI',ElementNEnergy.EARTHYIN,9, Trigram.LI);
  static  GENG= new Trunk('GENG',ElementNEnergy.METALYANG,3, Trigram.ZHEN);
  static  XIN= new Trunk('XIN',ElementNEnergy.METALYIN,4, Trigram.XUN);
  static  REN= new Trunk('REN',ElementNEnergy.WATERYANG,6, Trigram.QIAN);
  static  GUI= new Trunk('GUI',ElementNEnergy.WATERYIN,2, Trigram.KUN);

  static HOUR_TRUNK =  [
    Trunk.JIA, Trunk.BING, Trunk.WU, Trunk.GENG, Trunk.REN,
		     Trunk.JIA,Trunk.BING,Trunk.WU,Trunk.GENG,Trunk.REN
  ];

  // Ref3p389-390
	static  pivotBranche = [
		// JIA
		[  // RAT ->
			[ Trunk.GENG, Trunk.DING, Trunk.BING ],
			[ Trunk.GENG, Trunk.DING, Trunk.BING ],

			[ Trunk.BING, Trunk.GUI ],
			[ Trunk.GENG, Trunk.BING, Trunk.DING, Trunk.WU, Trunk.JI ],
			[ Trunk.GENG, Trunk.DING, Trunk.REN ],
			[ Trunk.GUI, Trunk.DING, Trunk.GENG],
			[ Trunk.DING, Trunk.GUI, Trunk.GENG],
			[ Trunk.DING, Trunk.GUI, Trunk.GENG],
			[ Trunk.DING, Trunk.GENG, Trunk.REN ],
			[ Trunk.GENG, Trunk.DING, Trunk.BING ],
			[ Trunk.GENG, Trunk.JIA, Trunk.DING,  Trunk.REN, Trunk.GUI ],
			[ Trunk.WU, Trunk.DING, Trunk.BING, Trunk.GENG  ],
		],
		// YI
		[  // RAT ->
			[ Trunk.BING ],
			[ Trunk.BING ],

			[ Trunk.GUI, Trunk.BING ],
			[ Trunk.GUI, Trunk.BING ],
			[ Trunk.BING, Trunk.GUI, Trunk.WU],
			[ Trunk.GUI],
			[ Trunk.BING, Trunk.GUI],
			[ Trunk.BING, Trunk.GUI],
			[ Trunk.GUI, Trunk.BING, Trunk.JI ],
			[ Trunk.BING, Trunk.GUI, Trunk.DING],
			[ Trunk.XIN, Trunk.GUI ],
			[ Trunk.WU, Trunk.BING ],
		],
		// BING
		[  // RAT ->
			[ Trunk.WU, Trunk.REN, Trunk.JI ],
			[ Trunk.JIA, Trunk.REN ],

			[ Trunk.GENG, Trunk.REN ],
			[ Trunk.JI, Trunk.REN ],
			[ Trunk.JIA, Trunk.REN ],
			[ Trunk.GENG, Trunk.REN, Trunk.GUI],
			[ Trunk.GUI, Trunk.REN],
			[ Trunk.GENG, Trunk.REN],
			[ Trunk.GUI, Trunk.REN],
			[ Trunk.GUI, Trunk.REN ],
			[ Trunk.REN, Trunk.JIA],
			[ Trunk.WU, Trunk.JIA, Trunk.GENG, Trunk.REN],
		],
		// DING
		[  // RAT ->
			[ Trunk.GENG, Trunk.JIA ],
			[ Trunk.GENG, Trunk.JIA ],

			[ Trunk.GENG, Trunk.JIA  ],
			[ Trunk.JIA, Trunk.GENG ],
			[ Trunk.GENG, Trunk.JIA  ],
			[ Trunk.GENG, Trunk.JIA ],
			[ Trunk.GENG, Trunk.JIA ],
			[ Trunk.GENG, Trunk.REN, Trunk.GUI],
			[ Trunk.REN, Trunk.JIA, Trunk.GENG],
			[ Trunk.GENG, Trunk.JIA, Trunk.BING, Trunk.WU ],
			[Trunk.GENG, Trunk.JIA, Trunk.WU ],
			[ Trunk.GENG, Trunk.JIA],
		],
		// WU
		[  // RAT ->
			[ Trunk.JIA, Trunk.BING ],
			[ Trunk.JIA, Trunk.BING ],

			[ Trunk.JIA, Trunk.BING, Trunk.GUI ],
			[ Trunk.JIA, Trunk.BING, Trunk.GUI ],
			[ Trunk.BING, Trunk.JIA, Trunk.GUI ],
			[ Trunk.BING, Trunk.JIA, Trunk.GUI],
			[ Trunk.GENG, Trunk.REN, Trunk.BING],
			[Trunk.BING, Trunk.GUI, Trunk.JIA ],
			[Trunk.GUI, Trunk.BING, Trunk.JIA ],
			[Trunk.GUI, Trunk.BING],
			[Trunk.BING, Trunk.JIA, Trunk.GUI ],
			[Trunk.BING,Trunk.JIA ],
		],
		// JI
		[  // RAT ->
			[ Trunk.JIA, Trunk.BING, Trunk.WU ],
			[ Trunk.JIA, Trunk.BING, Trunk.WU  ],

			[ Trunk.GENG, Trunk.BING, Trunk.JIA ],
			[ Trunk.GUI, Trunk.JIA, Trunk.BING ],
			[ Trunk.GUI, Trunk.BING, Trunk.JIA ],
			[ Trunk.BING, Trunk.GUI],
			[ Trunk.BING, Trunk.GUI],
			[Trunk.BING, Trunk.GUI ],
			[Trunk.GUI, Trunk.BING ],
			[Trunk.GUI, Trunk.BING  ],
			[Trunk.BING, Trunk.JIA, Trunk.GUI ],
			[Trunk.JIA, Trunk.BING, Trunk.WU ],
		],
		// GENG
		[  // RAT ->
			[ Trunk.JIA, Trunk.DING, Trunk.BING ],
			[ Trunk.DING, Trunk.BING, Trunk.JIA ],

			[ Trunk.JIA, Trunk.REN, Trunk.WU, Trunk.BING, Trunk.DING ],
			[ Trunk.JIA, Trunk.GENG, Trunk.DING, Trunk.BING ],
			[ Trunk.DING, Trunk.JIA, Trunk.REN, Trunk.GUI ],
			[ Trunk.WU, Trunk.GENG, Trunk.BING, Trunk.DING],
			[ Trunk.REN, Trunk.GUI],
			[Trunk.JIA, Trunk.DING  ],
			[Trunk.JIA, Trunk.DING ],
			[ Trunk.JIA, Trunk.DING, Trunk.BING ],
			[ Trunk.REN, Trunk.JIA],
			[ Trunk.BING, Trunk.DING],
		],
		// XIN
		[  // RAT ->
			[ Trunk.WU, Trunk.BING, Trunk.REN, Trunk.JIA ],
			[ Trunk.REN, Trunk.BING, Trunk.WU, Trunk.JI ],

			[ Trunk.REN, Trunk.JI, Trunk.GENG ],
			[ Trunk.JIA, Trunk.REN ],
			[  Trunk.JIA, Trunk.REN],
			[ Trunk.JIA, Trunk.REN, Trunk.GUI],
			[ Trunk.JI, Trunk.REN, Trunk.GUI],
			[ Trunk.GENG, Trunk.REN, Trunk.JIA],
			[ Trunk.REN, Trunk.JIA, Trunk.GENG],
			[ Trunk.JIA, Trunk.REN ],
			[Trunk.JIA, Trunk.REN ],
			[Trunk.BING, Trunk.REN ],
		],
		// REN
		[  // RAT ->
			[Trunk.BING,Trunk.WU  ],
			[Trunk.DING, Trunk.BING, Trunk.JIA  ],

			[Trunk.BING, Trunk.GENG, Trunk.WU  ],
			[Trunk.XIN, Trunk.WU, Trunk.GENG  ],
			[Trunk.GENG, Trunk.JIA  ],
			[Trunk.XIN, Trunk.REN, Trunk.GENG, Trunk.GUI ],
			[Trunk.GENG, Trunk.GUI, Trunk.XIN ],
			[Trunk.JIA, Trunk.XIN ],
			[Trunk.DING, Trunk.WU ],
			[ Trunk.GENG, Trunk.JIA ],
			[ Trunk.BING, Trunk.JIA],
			[Trunk.BING,Trunk.WU, Trunk.GENG ],
		],
		// GUI
		[  // RAT ->
			[Trunk.XIN, Trunk.BING  ],
			[ Trunk.DING, Trunk.BING ],

			[Trunk.BING, Trunk.XIN  ],
			[Trunk.XIN, Trunk.GENG  ],
			[ Trunk.XIN, Trunk.BING, Trunk.JIA ],
			[ Trunk.XIN],
			[ Trunk.REN, Trunk.GENG, Trunk.GUI],
			[Trunk.XIN, Trunk.GENG, Trunk.REN, Trunk.GUI ],
			[Trunk.DING ],
			[Trunk.BING, Trunk.XIN  ],
			[Trunk.JIA, Trunk.XIN, Trunk.REN, Trunk.GUI ],
			[Trunk.XIN, Trunk.GENG, Trunk.WU, Trunk.DING ],
		],
	];

  elementNEnergy: ElementNEnergy= null;
  hadoNb: number= null;
  trigram: Trigram= null;


  constructor(name: string, eNe: ElementNEnergy, hadoNb: number, trigram: Trigram) {
    super(name);
    this.elementNEnergy=eNe;
    this.hadoNb=hadoNb;
    this.trigram=trigram;
  }


  static getValues(): Trunk[] {
    return Trunk.JIA.getValues() as Trunk[];
  }



  override getClassName() {return 'Trunk';}

  getEnergy(){
    return this.elementNEnergy.energy as Energy;
  }

  getElement(){
    return this.elementNEnergy.element;
  }


 getPivot(branche: Branche) {
		return Trunk.pivotBranche[this.ordinal()][branche.ordinal()];
	}


}
