import { ZodiacHelper } from '../../../helper/zodiacHelper';
import { Planet } from '../planet';
import { ZodiacTheme } from '../zodiacTheme';
import { House } from './house';
import { HouseObservation } from './houseObservation';

export class House1Observation extends HouseObservation {

    constructor(house: House, theme: ZodiacTheme) {
        super(house, theme);
    }

    commentOnHousePlanet() {
        if (this.house.contains(Planet.SUN)) {
            //Ref28p§84
            this.addSupportBaseComment(8, 'Ref28p184p1');
        }
    }

    commentOnThemeObservations() {
        const theme = this.theme;
        const z = theme.getBlackMoonZodiac();
        let h = theme.getBlackMoonHouse();
        this.addBaseComment('Black.Moon.' + z.toString());
        this.addBaseComment('Black.Moon.' + h.nb );
        const f = theme.getFortunePartD();
        h = theme.getHouseByDegreePos(f);
        this.addBaseComment('Fortune.Part.' + h.nb);
    }


    commentAllHousePlanetComment() {
            const planets = Planet.getValues();
            planets.forEach(planet => {
                if (!planet.isVirtual()) {
                    const key = planet.toString() + '.' + this.theme.getPlanetZodiac(planet).toString();
                    this.addBaseComment(key);
                }
            });
    }

    override comment() {
        super.comment();
        this.commentAllHousePlanetComment();
        // Specific for this house
        this.commentOnHousePlanet();
        this.commentOnThemeObservations();
    }

}
