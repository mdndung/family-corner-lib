import { EnumBaseClass } from '../enumBaseClass';

export class QIPhase extends EnumBaseClass {

    static SHA_QI= new QIPhase("SHA_QI",-90); 
    static SI_QI= new QIPhase("SI_QI",-80); 
    static SHUA_QI= new QIPhase("SHUA_QI",-70); 
    static SHUAI_QI= new QIPhase("SHUAI_QI",-60);
    static TUI_QI= new QIPhase("TUI_QI",0); 
    static ZUO_QI= new QIPhase("ZUO_QI",60); 
    static SHENG_QI= new QIPhase("SHENG_QI",70);
    static  WANG_QI= new QIPhase("WANG_QI",90) ;
 	// Use it to prefix property key instead of class name
	// Reason: Class can change name
	//
  
    private degree : number;

    constructor(name: string, degree:number) {
      super(name);
      this.degree = degree
    }


  override getClassName() {return 'QIPhase';}

  static getValues(): QIPhase[] {
    return QIPhase.WANG_QI.getValues() as QIPhase[];
  }

}