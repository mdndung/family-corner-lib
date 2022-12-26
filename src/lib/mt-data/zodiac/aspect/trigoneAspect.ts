import { ObjectHelper } from '../../../helper/objectHelper';
import { Planet } from '../planet';
import { AspectBase } from './aspectBase';

export class TrigoneAspect extends AspectBase {

  private static instance: TrigoneAspect = null;

  constructor(planet1: Planet, planet2: Planet) {
    super(planet1, planet2);
  }

  static getInstance(): AspectBase {
    if (ObjectHelper.isNaN(TrigoneAspect.instance)) {
      TrigoneAspect.instance = new TrigoneAspect(null, null);
    }
    return TrigoneAspect.instance;
  }

  getForce(): number {
    if (this.isAspected2(Planet.SUN, Planet.MOON)) {
      return 10;
    }
    if (this.isAspected2(Planet.SUN, Planet.JUPITER)) {
      return 9;
    }
    if (this.isAspected2(Planet.VENUS, Planet.JUPITER)) {
      return 9;
    }
    return 8;
  }

  getAspectNameHeader() {
    return 'ST.ASPECT';
  }

  newInstance(planet1: Planet, planet2: Planet): AspectBase {
    return new TrigoneAspect(planet1, planet2);
  }
}
