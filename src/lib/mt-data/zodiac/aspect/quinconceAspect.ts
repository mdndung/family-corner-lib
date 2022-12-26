import { ObjectHelper } from '../../../helper/objectHelper';
import { Planet } from '../planet';
import { AspectBase } from './aspectBase';

export class QuinconceAspect extends AspectBase {
  private static instance: QuinconceAspect;

  constructor(planet1: Planet, planet2: Planet) {
    super(planet1, planet2);
  }

  static getInstance(): AspectBase {
    if (ObjectHelper.isNaN(QuinconceAspect.instance) == null) {
      QuinconceAspect.instance = new QuinconceAspect(null, null);
    }
    return QuinconceAspect.instance;
  }
  getForce(): number {
    return 5;
  }

  getAspectNameHeader() {
    return 'OSQ.ASPECT';
  }

  newInstance(planet1: Planet, planet2: Planet): AspectBase {
    return new QuinconceAspect(planet1, planet2);
  }
}
