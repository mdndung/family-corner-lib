import { ObjectHelper } from '../../helper/objectHelper';
import { PropertyHelper } from '../../helper/PropertyHelper';
import { ObservationBase } from '../../observations/observationBase';
import { ZodiacTheme } from './zodiacTheme';

export abstract class ZodiacObservationBase extends ObservationBase {

   constructor() {
      super();
   }

   abstract getTheme(): ZodiacTheme;

}
