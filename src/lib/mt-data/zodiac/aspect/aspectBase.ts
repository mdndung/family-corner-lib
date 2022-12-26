import { Planet } from '../planet';


export abstract class AspectBase {
     planet1: Planet= null;
     planet2: Planet= null ;

    constructor(  planet1: Planet,  planet2: Planet ) {
        this.planet1 = planet1 ;
        this.planet2 = planet2 ;
    }

    isAspected2( planet1: Planet,  planet2: Planet) {
        return ( this.planet1 === planet1 && this.planet2 === planet2 ) ||
                ( this.planet2 === planet1 && this.planet1 === planet2 );
    }

    isAspected1( planet: Planet) {
        return ( this.planet1===planet || this.planet2===planet );
    }


  isHostileAspectPlanet( planet: Planet) {
        return planet===Planet.MARS ||  planet===Planet.SATURN ||
         planet===Planet.URANUS ||  planet===Planet.PLUTO;
    }


    isAscpectHarmonic() {
        return ( !this.isHostilePlanetAspect() );
    }


    // TBDONE see later for more detailed rules
     isHostilePlanetAspect() {
        return this.isHostileAspectPlanet(this.planet1) || this.isHostileAspectPlanet(this.planet2);
    }


    isSameAspectType(otherAspect:AspectBase) {
      return this.getAspectNameHeader()===otherAspect.getAspectNameHeader();
    }

     toString() {
        return this.getAspectNameHeader() + ' ' + this.planet1.toString() +' - '+this.planet2.toString() ;
    }


    abstract getForce(): number ;

    abstract getAspectNameHeader(): string;

    abstract newInstance (  planet1: Planet,  planet2: Planet ): AspectBase;

}
