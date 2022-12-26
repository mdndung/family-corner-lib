import { ObjectHelper } from '../../../helper/objectHelper';
import { Planet } from '../planet';
import { AspectBase } from './aspectBase';

export class OppositionAspect extends AspectBase {
  private static instance: OppositionAspect;

  constructor(planet1: Planet, planet2: Planet) {
    super(planet1, planet2);
  }

  static getInstance(): AspectBase {
    if (ObjectHelper.isNaN(OppositionAspect.instance)) {
      OppositionAspect.instance = new OppositionAspect(null, null);
    }
    return OppositionAspect.instance;
  }

  newInstance(planet1: Planet, planet2: Planet): AspectBase {
    return new OppositionAspect(planet1, planet2);
  }

  getForce(): number {
    return 5;
  }

  getAspectNameHeader() {
    return 'OSQ.ASPECT';
  }
}
