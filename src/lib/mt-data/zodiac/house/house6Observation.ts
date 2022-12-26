
import { ZodiacTheme } from '../zodiacTheme';
import { House } from './house';
import { HouseObservation } from './houseObservation';

export class House6Observation extends HouseObservation {

    constructor(house: House, theme: ZodiacTheme) {
        super(house, theme);
    }

    commentOnAxe() {
        if (!this.isFavorable()) {
            const h4Zodiac = this.house.getZodiac();
            const h12Zodiac = this.theme.getHouse(12).getZodiac();
            let reference = 'House6Axe.';
            if (h4Zodiac.ordinal() > h12Zodiac.ordinal()) {
                reference += h12Zodiac + '.' + h4Zodiac;
            } else {
                reference += h4Zodiac + '.' + h12Zodiac;
            }
            this.addBaseComment(reference);
        }
    }

    override comment() {
        super.comment();
        this.commentOnAxe();
    }
}
