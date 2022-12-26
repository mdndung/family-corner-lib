
import { ObjectHelper } from '../../../helper/objectHelper';
import { Planet } from '../planet';
import { AspectBase } from './aspectBase';

export class ConjonctionAspect extends AspectBase {


  private static  instance: ConjonctionAspect = null ;

    constructor(  planet1: Planet,  planet2: Planet ) {
       super(planet1, planet2);
   }


   static getInstance(): AspectBase {
       if ( ObjectHelper.isNaN(ConjonctionAspect.instance) ) {
          ConjonctionAspect.instance =  new ConjonctionAspect(null ,null);
       }
       return ConjonctionAspect.instance;
   }

   newInstance(  planet1: Planet,  planet2: Planet ): AspectBase {
       return new ConjonctionAspect(planet1, planet2);
   }

   getForce(): number {
    if ( this.isAspected2(Planet.MOON,Planet.SUN) ) {return 5;}
    if ( this.isAspected2(Planet.MARS,Planet.URANUS) ) {return 3;}
   if ( this.isAspected2(Planet.JUPITER,Planet.URANUS) ) {return 4;}
   if ( this.isAspected2(Planet.JUPITER,Planet.PLUTO) ) {return 10;}
   if ( this.isAspected2(Planet.SATURN,Planet.PLUTO) ) {return 9;}
    return 8 ;
}

getAspectNameHeader() {
   return 'CONJ.ASPECT';
}

}
