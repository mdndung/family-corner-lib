
import { ObjectHelper } from '../../../helper/objectHelper';
import { Planet } from '../planet';
import { AspectBase } from './aspectBase';

export class SextileAspect extends AspectBase {


  private static  instance: SextileAspect;

    constructor(  planet1: Planet,  planet2: Planet ) {
       super(planet1, planet2);
   }



   static getInstance(): AspectBase {
       if ( ObjectHelper.isNaN(SextileAspect.instance) ) {
        SextileAspect.instance = new SextileAspect(null,null);
       }
       return SextileAspect.instance;
   }

   getForce(): number {
    if ( this.isAspected2(Planet.SUN,Planet.MOON) ) {return 10;}
    if ( this.isAspected2(Planet.SUN,Planet.JUPITER) ) {return 9;}
    return 8 ;
   }

    getAspectNameHeader() {
       return 'ST.ASPECT';
   }


   newInstance(  planet1: Planet,  planet2: Planet ): AspectBase {
       return new SextileAspect(planet1, planet2);
   }
}
