/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { EnumBaseClass } from '../enumBaseClass';
import { Element } from '../feng-shui/element';
import { DataWithLog } from '../qi/dataWithLog';
import { Branche } from './branche';

export class BrancheRelation extends EnumBaseClass {
  static ELEMENTCLASH = new BrancheRelation('EC');
  // Clash. Opposite by center
  // Luc xung
  static CLASH = new BrancheRelation('C');
  // INJURY. Vertical direction
  // Luc Hai
  static INJURY = new BrancheRelation('I');
  // Punition.
  // Hinh
  static AGRESSIVE = new BrancheRelation('A'); // Tri the
  static DISRESPECFUL = new BrancheRelation('D'); // Vo an
  static SCANDALOUS = new BrancheRelation('S');
  static AUTOPUNITION = new BrancheRelation('T');
  //
  // DESTROY, See Re
  static DESTROY = new BrancheRelation('K');

  static TRANSFORMRESTRICT = new BrancheRelation('TS');
  // FAVORABLE relation
  // Group of 2 with transformation
  // Luc Hop hoa
  static TRANSFORMPLUS = new BrancheRelation('TF');
  // Part of Group of 3 (by Season or Direction) With transformation to the related direction's element
  // Tam hoi
  static SEASON = new BrancheRelation('SE');
  static MIDSEASON = new BrancheRelation('M'); // Ban Hoi
  // Part of Group of 3 to transform to an element
  // Tam hop hoa
  static COMBINATION = new BrancheRelation('B');
  static MIDCOMBINATION = new BrancheRelation('N');

  static ELEMENTFAVORABLE = new BrancheRelation('EF');

  static RELATIONARR = [
    [
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.TRANSFORMPLUS],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.SCANDALOUS],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.CLASH],
      [BrancheRelation.INJURY],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.DESTROY],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.ELEMENTFAVORABLE],
    ],

    [
      [BrancheRelation.TRANSFORMPLUS],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.DESTROY],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.INJURY],
      [BrancheRelation.CLASH, BrancheRelation.DISRESPECFUL],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.DISRESPECFUL],
      [BrancheRelation.ELEMENTCLASH],
    ],
    // TIGER
    [
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.AGRESSIVE],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.CLASH, BrancheRelation.AGRESSIVE],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.TRANSFORMPLUS, BrancheRelation.DESTROY],
    ],
    // RABBIT
    [
      [BrancheRelation.SCANDALOUS],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.INJURY],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.DESTROY],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.CLASH],
      [BrancheRelation.TRANSFORMPLUS],
      [BrancheRelation.COMBINATION],
    ],
    // DRAGON
    [
      [BrancheRelation.COMBINATION],
      [BrancheRelation.DESTROY],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.INJURY],
      [BrancheRelation.AUTOPUNITION],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.TRANSFORMPLUS],
      [BrancheRelation.CLASH],
      [BrancheRelation.ELEMENTCLASH],
    ],
    // TY/SNAKE
    [
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.INJURY, BrancheRelation.AGRESSIVE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTCLASH],
      [
        BrancheRelation.TRANSFORMPLUS,
        BrancheRelation.DESTROY,
        BrancheRelation.AGRESSIVE,
      ],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.CLASH],
    ],
    // HORSE/NGO
    [
      [BrancheRelation.CLASH],
      [BrancheRelation.INJURY],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.DESTROY],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.AUTOPUNITION],
      [BrancheRelation.TRANSFORMPLUS],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTFAVORABLE],
    ],
    // GOAT / MUI
    [
      [BrancheRelation.INJURY],
      [BrancheRelation.CLASH, BrancheRelation.DISRESPECFUL],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.TRANSFORMPLUS],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.DESTROY, BrancheRelation.DISRESPECFUL],
      [BrancheRelation.COMBINATION],
    ],
    // MONKEY/ THAN
    [
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.CLASH, BrancheRelation.AGRESSIVE],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.COMBINATION],
      [
        BrancheRelation.TRANSFORMPLUS,
        BrancheRelation.AGRESSIVE,
        BrancheRelation.DESTROY,
      ],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.INJURY],
    ],
    // COCK / DAU
    [
      [BrancheRelation.DESTROY],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.CLASH],
      [BrancheRelation.TRANSFORMPLUS],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.AUTOPUNITION],
      [BrancheRelation.INJURY],
      [BrancheRelation.ELEMENTCLASH],
    ],
    // DOG / TUAT
    [
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.DISRESPECFUL],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.TRANSFORMPLUS],
      [BrancheRelation.CLASH],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.DISRESPECFUL, BrancheRelation.DESTROY],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.INJURY],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTFAVORABLE],
    ],
    // PIG / HOI
    [
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.TRANSFORMPLUS, BrancheRelation.DESTROY],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.CLASH],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.COMBINATION],
      [BrancheRelation.INJURY],
      [BrancheRelation.ELEMENTFAVORABLE],
      [BrancheRelation.ELEMENTCLASH],
      [BrancheRelation.AUTOPUNITION],
    ],
  ];
  constructor(name: string) {
    super(name);
  }



  static isRelationPresent(br1: Branche, br2: Branche,relation: BrancheRelation ) {
    const br1br2RelArr=BrancheRelation.RELATIONARR[br1.ordinal()][br2.ordinal()];
for (let index = 0; index < br1br2RelArr.length; index++) {
  const brRel = br1br2RelArr[index];
    if ( brRel.isEqual(relation)) {return true;}
}
return false;
  }

  // Ref3p254
  static getComb3Element(branche: Branche) {
    let element = Element.WATER;
    switch (branche) {
      case Branche.SNAKE:
      case Branche.OX:
      case Branche.COCK:
        element = Element.METAL;
        break;
      case Branche.PIG:
      case Branche.RABBIT:
      case Branche.GOAT:
        element = Element.WOOD;
        break;
      case Branche.TIGER:
      case Branche.DOG:
      case Branche.HORSE:
        element = Element.FIRE;
        break;
      case Branche.RAT:
      case Branche.MONKEY:
      case Branche.DRAGON:
        element = Element.WATER;
        break;
    }
    return element;
  }

  // Ref3p254
  //Ref9p137
  static getCombinaisonResultElement(branche: Branche) {
    let element = BrancheRelation.getComb3Element(branche);
    return new DataWithLog(element,'Combination of 3 (san he)');
  }

  static getMidCombinaisonResultElement(branche: Branche) {
    let element = BrancheRelation.getComb3Element(branche);
    return new DataWithLog(element,'Mid Combination of 3 (san he)');
  }


  //REF3 P253
  //REF9 P140
  static getTransformResultElement(branche: Branche) {
    let element = Element.WATER;
    switch (branche) {
      case Branche.COCK:
      case Branche.DRAGON:
        element = Element.METAL;
        break;
      case Branche.TIGER:
      case Branche.PIG:
        element = Element.WOOD;
        break;
      case Branche.RABBIT:
      case Branche.DOG:
        element = Element.FIRE;
        break;
      case Branche.HORSE:
      case Branche.GOAT:
      case Branche.RAT:
      case Branche.OX:
        element = Element.EARTH;
        break;
      case Branche.SNAKE:
      case Branche.MONKEY:
        element = Element.WATER;
        break;
    }
    return new DataWithLog(element,'Combination of 2');
  }

  isFavorable() {
    return this.ordinal()>=BrancheRelation.TRANSFORMPLUS.ordinal();
  }
}
