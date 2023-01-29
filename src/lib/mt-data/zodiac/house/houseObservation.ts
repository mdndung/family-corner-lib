/* eslint-disable @typescript-eslint/prefer-for-of */
import { AspectBase } from '../aspect/aspectBase';
import { Planet } from '../planet';
import { ZodiacObservationBase } from '../zodiacObservationBase';
import { ZodiacTheme } from '../zodiacTheme';
import { House } from './house';


export class HouseObservation extends ZodiacObservationBase {

     house: House= null;
     theme: ZodiacTheme= null;
     planetAspectList: AspectBase[]= null;
     planetList: Planet[]= null;

     constructor( house: House,  theme: ZodiacTheme) {
         super();
         this.house=house;
         this.theme=theme;
         this.planetAspectList=[];
         this.planetList=[];
     }

     override getName() {
      return this.house.getName();
    }

     getTheme() { return this.theme;}

     addAspect( aspect: AspectBase ) {
        this.planetAspectList.push(aspect);
        //It is assumed that aspect.planet1 belong to his house
        //Add it
        const planet1 = aspect.planet1;
        if ( !planet1.isVirtual() ) {this.planetList.push(planet1);}
    }

      getPairedAspect( planet1: Planet,  planet2: Planet ): AspectBase{
        if ( planet1 !== planet2 ) {
            for (let i = 0; i < this.planetAspectList.length; i++) {
                const aspect = this.planetAspectList[i];
                if (aspect.isAspected2(planet1, planet2)) {
                    return aspect;
                }
            }
        }
        return null ;
    }

    getHousePlanetNb() {
        return this.planetList.length;
    }

   hasNoPlanet() {
        return this.getHousePlanetNb()===0 ;
    }


    evalInitialPoints() {
        let degree = 10 ;
        if ( this.hasNoPlanet() ) {
            // No planet house. take the force of the governer
            const governer = this.house.getGoverner();
            degree = this.theme.getPlanetForce(governer);
            //Ref28p140 decrease force if next/prev house is in the same case
            if ( this.house.nextHouse.observation.hasNoPlanet() ) {
                degree-=2;
            }
            if ( this.house.prevHouse.observation.hasNoPlanet() ) {
                degree -= 2;
            }
            // and if the opposite house has some force
            if ( !this.house.getOppositeHouse().observation.hasNoPlanet() ) {
                degree-=2;
            }
        } else {
            degree = this.houseAspectForce();
            let count = 1 ;
            this.planetList.forEach(planet => {
                count++;
                degree += this.theme.getPlanetForce(planet);
            });
            degree = degree/count ;
        }
        this.incPoints(degree);
    }


    override initPoint() {
      super.initPoint();
      this.evalInitialPoints();
    }

    houseAspectForce() {
        let force = 0 ;
        this.planetAspectList.forEach(aspect => {
            force += aspect.getForce();
        });
        const size = this.planetAspectList.length;
        if ( size>0 ) {force = force/size ;}
        return force;
    }

    addHouseAspectComment(  aspect: AspectBase) {
            const planet1 = aspect.planet1;
            const planet2 = aspect.planet2;
            const force = aspect.getForce();
            // Planet aspect relation
            const aspectHeader = aspect.getAspectNameHeader();
            // Properties ared defined based on planet order
            if ( planet1.ordinal()<planet2.ordinal()) {
                this.addSupportBaseComment(force, aspectHeader + '.' + planet1.toString() + '.' + planet2.toString());
            } else {
                this.addSupportBaseComment(force, aspectHeader + '.' + planet2.toString() + '.' + planet1.toString());
            }
    }


     addHouseAllAspectComment( ) {
        this.planetAspectList.forEach(aspect => {
            this.addHouseAspectComment(aspect);
        });
    }

    addPlanetAspectComment( planet: Planet ) {
        this.planetAspectList.forEach(aspect => {
            if (aspect.isAspected1(planet) )
            {this.addHouseAspectComment(aspect);}
        });
    }


    addHouseGovernerAspectComment( ) {
        this.planetAspectList.forEach(aspect => {
            const planet1 = aspect.planet1;
            const governer1HouseNb = this.theme.getHouseGovernerNb(planet1);
            if ( governer1HouseNb>0 ) {
                 const planet2 = aspect.planet2;
                 const governer2HouseNb = this.theme.getHouseGovernerNb(planet2);
                if ( governer2HouseNb>0 && governer2HouseNb!==governer1HouseNb) {
                    let header = '' ;
                    let force = 0;
                    if ( aspect.isAscpectHarmonic() ) {
                        header = 'H.HASPECT';
                        force = 8;
                    } else {
                        header = 'D.HASPECT';
                        force = 5 ;
                    }
                    if ( governer1HouseNb<governer2HouseNb) {
                        this.addSupportBaseComment(force, header + '.' + governer1HouseNb + '.' + governer2HouseNb);
                    } else {
                        this.addSupportBaseComment(force, header + '.' + governer2HouseNb + '.' + governer1HouseNb);
                    }
                }
            }
        });
    }

    commentOnHousePlanetAspect() {
        this.addHouseAllAspectComment();
        this.addHouseGovernerAspectComment();
    }


    override comment() {
        super.comment();
        this.commentOnHousePlanetAspect();
    }


}
