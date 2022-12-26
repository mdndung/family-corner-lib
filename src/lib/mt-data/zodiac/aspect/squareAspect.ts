import { ObjectHelper } from '../../../helper/objectHelper';
import { Planet } from '../planet';
import { AspectBase } from './aspectBase';

export class SquareAspect extends AspectBase {
  private static instance: SquareAspect;

  constructor(planet1: Planet, planet2: Planet) {
    super(planet1, planet2);
  }

  static getInstance(): AspectBase {
    if (ObjectHelper.isNaN(SquareAspect.instance)) {
      SquareAspect.instance = new SquareAspect(null, null);
    }
    return SquareAspect.instance;
  }

  getForce(): number {
    return 3;
  }

  getAspectNameHeader() {
    return 'OSQ.ASPECT';
  }

  newInstance(planet1: Planet, planet2: Planet): AspectBase {
    return new SquareAspect(planet1, planet2);
  }
}
