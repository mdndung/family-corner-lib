import { Direction } from "../mt-data/feng-shui/direction";
import { Star } from "../mt-data/feng-shui/star";

export class StarHelper {

    static  FLYINGSTARDIRECTION : Direction[] = [ 
        Direction.NW, Direction.W, Direction.NE, Direction.S, Direction.N, 
        Direction.SW, Direction.E, Direction.SE ];


    static getStar(starNb: number): Star {
        const stars = Star.getValues()
        return stars[starNb];
    }

    static nextStarNb( from: number,  inc: number) {
		let res = from ;
		if (inc>0) {
            for (let i = 0; i <inc; i++) {
	 			res ++;
	 			if ( res==10 ) res = 1 ;
	 		}			
		} else {
	 		for ( let i=0; i<(-inc); i++) {
	 			res --;
	 			if ( res==0 ) res = 9 ;
	 		}
		}
		return res ;
	}
}
