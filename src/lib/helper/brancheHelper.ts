/* eslint-disable @typescript-eslint/naming-convention */
import { Branche } from '../mt-data/bazi/branche';
import { BrancheRelation } from '../mt-data/bazi/brancheRelation';
import { Trunk } from '../mt-data/bazi/trunk';
import { MyCalendar } from '../mt-data/date/mycalendar';
import { TuViPalace } from '../mt-data/tuvi/tuviPalace';
import { DateHelper } from './dateHelper';

export class BrancheHelper {


  // Order is force decreasing . See Ref3p342
  static HIDDEN_TRUNK = [
    [Trunk.GUI],
    [Trunk.JI, Trunk.GUI, Trunk.XIN],
    [Trunk.JIA,Trunk.BING, Trunk.WU],
    [Trunk.YI],
    [Trunk.WU, Trunk.YI,Trunk.GUI],
    [Trunk.BING,Trunk.GENG, Trunk.WU],
    [Trunk.DING, Trunk.JI],
    [Trunk.JI, Trunk.DING,Trunk.YI],
    [Trunk.GENG, Trunk.WU,Trunk.REN],
    [Trunk.XIN],
    [Trunk.WU, Trunk.XIN,Trunk.DING],
    [Trunk.REN,Trunk.JIA]
  ];

  static getYearBranche( cYear: number ) {
    while (cYear<=0 ) {cYear+=12;}
    return Branche.RAT.getEnum((cYear-1)%12) as Branche;
  }


  static getMonthBranche(monthIndexBase1: number) {
    const monthIndexBase0 = monthIndexBase1-1;
    return Branche.TIGER.getEnumNextNElement(monthIndexBase0) as Branche;
  }

  static getDayBranche(mDate: MyCalendar) {
    const idx = DateHelper.reference19850724JIARATDateDiff(mDate);
    return Branche.RAT.getEnumNextNElement(idx) as Branche;
  }

  static getHourBranche(hour0_23: number) {
    let hIdx=0;
    if ( hour0_23!==0 &&hour0_23!==23) {
      hIdx = Math.trunc((hour0_23+1)/2);
    }
    return Branche.RAT.getEnumNextNElement(hIdx) as Branche;
  }

  static isRatHorse(branche: Branche) {
		return branche===Branche.RAT || branche===Branche.HORSE ;
	}

  static isOxGoat(branche: Branche) {
		return branche===Branche.OX || branche===Branche.GOAT ;
	}

  static isRatPig(branche: Branche) {
		return branche===Branche.RAT || branche===Branche.PIG ;
	}

  static isSnakePig(branche: Branche) {
		return branche===Branche.SNAKE || branche===Branche.PIG ;
	}

  static isRabbitSnake(branche: Branche) {
		return branche===Branche.SNAKE || branche===Branche.RABBIT ;
	}


  static isHorseDog(branche: Branche) {
		return branche===Branche.HORSE || branche===Branche.DOG ;
	}

  static isGoatMonkey(branche: Branche) {
		return branche===Branche.GOAT || branche===Branche.MONKEY ;
	}

  static isRabbitCock(branche: Branche) {
		return branche===Branche.RABBIT || branche===Branche.COCK ;
	}

  static isRabbitHorse(branche: Branche) {
		return branche===Branche.RABBIT || branche===Branche.HORSE ;
	}


  static isTigerMonkey(branche: Branche) {
		return branche===Branche.TIGER || branche===Branche.MONKEY ;
	}

  static isTigerDog(branche: Branche) {
		return branche===Branche.TIGER || branche===Branche.DOG ;
	}

  static isTuSinh(branche: Branche) {
		return branche===Branche.TIGER || branche===Branche.MONKEY ||
    branche===Branche.SNAKE|| branche===Branche.PIG;
	}



  static isPigGoat(branche: Branche) {
		return branche===Branche.PIG || branche===Branche.GOAT ;
	}

  static isCockPig(branche: Branche) {
		return branche===Branche.PIG || branche===Branche.COCK ;
	}

  static isOxHorse(branche: Branche) {
		return branche===Branche.OX || branche===Branche.HORSE ;
	}

  static isSnakeOx(branche: Branche) {
		return branche===Branche.SNAKE || branche===Branche.OX ;
	}

  static isTigerRabbit(branche: Branche) {
		return branche===Branche.TIGER || branche===Branche.RABBIT ;
	}

  static isSnakeHorse(branche: Branche) {
		return branche===Branche.SNAKE || branche===Branche.HORSE ;
	}
  static isDragonDog(branche: Branche) {
		return branche===Branche.DRAGON || branche===Branche.DOG ;
	}
  static isDragonSnake(branche: Branche) {
		return branche===Branche.DRAGON || branche===Branche.SNAKE ;
	}



  static isTigerHorseMonkey(branche: Branche) {
		return BrancheHelper.isTigerMonkey(branche) ||  branche===Branche.HORSE  ;
	}


  static isOxDragonGoatDog(branche: Branche) {
		return BrancheHelper.isOxGoat(branche) || BrancheHelper.isDragonDog(branche) ;
	}

  static isOxRabbitGoatCock(branche: Branche) {
		return BrancheHelper.isOxGoat(branche) || BrancheHelper.isRabbitCock(branche) ;
  }

  static isRatOxHorseGoat(branche: Branche) {
		return BrancheHelper.isOxGoat(branche) || BrancheHelper.isRatHorse(branche) ;
	}

  static isMonkeyRatDragon(branche: Branche) {
		return branche===Branche.MONKEY || branche===Branche.RAT || branche===Branche.DRAGON;
	}

  static isRatDogPig(branche: Branche) {
		return branche===Branche.RAT || branche===Branche.DOG || branche===Branche.PIG;
	}


  static isDragonSnakeHorse(branche: Branche) {
		return branche===Branche.SNAKE || branche===Branche.HORSE || branche===Branche.DRAGON;
	}


  static isSnakeCockPig(branche: Branche) {
		return branche===Branche.SNAKE || branche===Branche.COCK ||  branche===Branche.PIG;
	}

  static isSnakeHorseGoat(branche: Branche) {
		return branche===Branche.SNAKE || branche===Branche.HORSE ||  branche===Branche.GOAT;
	}

  static isSnakePigRabbitCock(branche: Branche) {
		return branche===Branche.SNAKE || branche===Branche.PIG
           ||  branche===Branche.RABBIT||  branche===Branche.COCK;
	}



  static isRatHorsePig(branche: Branche) {
		return branche===Branche.RAT || branche===Branche.HORSE ||  branche===Branche.PIG;
	}


  static isRatOxPig(branche: Branche) {
		return branche===Branche.RAT || branche===Branche.OX ||  branche===Branche.PIG;
	}

  static isDragonSnakeDog(branche: Branche) {
		return branche===Branche.DRAGON || branche===Branche.SNAKE ||  branche===Branche.DOG;
	}


  static isCockDogPig(branche: Branche) {
		return branche===Branche.COCK || branche===Branche.DOG ||  branche===Branche.PIG;
	}

  static isRabbitDragonSnake(branche: Branche) {
		return branche===Branche.RABBIT|| branche===Branche.DRAGON ||  branche===Branche.SNAKE;
	}

  static isOxSnakeGoatPig(branche: Branche) {
		return branche===Branche.OX|| branche===Branche.SNAKE ||  branche===Branche.GOAT ||  branche===Branche.PIG;
	}

  static isTigerToHorse(branche: Branche) {
		const ord = branche.ordinal();
		return ord>=Branche.TIGER.ordinal() && ord<=Branche.HORSE.ordinal() ;
	}

  static isMonkeyToRat(branche: Branche) {
		const ord = branche.ordinal();
		return ord>=Branche.MONKEY.ordinal() && ord<=Branche.PIG.ordinal() || ord===Branche.RAT.ordinal() ;
	}

  static isMonkeyToPig(branche: Branche) {
		const ord = branche.ordinal();
		return ord>=Branche.MONKEY.ordinal() && ord<=Branche.PIG.ordinal()  ;
	}


  static isRatPigOx(branche: Branche) {
		return branche===Branche.RAT || branche===Branche.PIG ||  branche===Branche.OX;
	}

  static isRabbitDragonSnakeHorse(branche: Branche) {
		return branche===Branche.RABBIT|| branche===Branche.DRAGON ||  branche===Branche.SNAKE||  branche===Branche.HORSE;
	}

  static isMonkeyDogRat(branche: Branche) {
		return branche===Branche.DOG || branche===Branche.MONKEY ||  branche===Branche.RAT;
	}

  static isTigerMonkeyPig(branche: Branche) {
		return branche===Branche.TIGER || branche===Branche.MONKEY ||  branche===Branche.PIG;
	}


  static isRatDogCockPig(branche: Branche) {
		return branche===Branche.RAT || branche===Branche.DOG ||  branche===Branche.COCK ||  branche===Branche.PIG;
	}
  static isRatHorseSnakePig(branche: Branche) {
		return BrancheHelper.isRatHorse(branche) || BrancheHelper.isSnakePig(branche) ;
	}
  static isRatHorseTigerMonkey(branche: Branche) {
		return BrancheHelper.isRatHorse(branche) || BrancheHelper.isTigerMonkey(branche) ;
	}
  static isRatHorseRabbitCock(branche: Branche) {
		return BrancheHelper.isRatHorse(branche) || BrancheHelper.isRabbitCock(branche) ;
	}


   static  getStartMonthElementLifeCycle( trunk: Trunk) {
    let res = Branche.COCK;

    switch (trunk) {
        case Trunk.JIA:
            res = Branche.PIG;
            break;
        case Trunk.YI:
            res = Branche.HORSE;
            break;

        case Trunk.BING:
        case Trunk.WU:
            res = Branche.TIGER;
            break;

        case Trunk.DING:
        case Trunk.JI:
            res = Branche.COCK;
            break;

        case Trunk.GENG:
            res = Branche.SNAKE;
            break;
        case Trunk.XIN:
            res = Branche.RAT;
            break;

        case Trunk.REN:
            res = Branche.MONKEY;
            break;
        case Trunk.GUI:
            res = Branche.RABBIT;
            break;

    }
    return res;
}

	// Ref17p141
	static isNhatFavorableBranche(branche: Branche) {
		return branche.ordinal()>=Branche.TIGER.ordinal() &&  branche.ordinal()<=Branche.HORSE.ordinal() ;
	}

  	// Ref17p141
    static isNguyetBranche(branche: Branche) {
		return branche===Branche.RAT ||
    branche.ordinal()>=Branche.MONKEY.ordinal() &&  branche.ordinal()<=Branche.PIG.ordinal() ;
	}

  	//
	static isDayBorn(branche: Branche) {
		return branche.ordinal()>Branche.TIGER.ordinal() &&  branche.ordinal()<=Branche.MONKEY.ordinal() ;
	}


  static getUniqueRelation(brancheRow: Branche, brancheCol: Branche) {
    if (
      BrancheRelation.RELATIONARR[brancheRow.ordinal()][
        brancheCol.ordinal()
      ].length===1
    ) {
      return BrancheRelation.RELATIONARR[brancheRow.ordinal()][
        brancheCol.ordinal()
      ][0];
    }
    return null;
  }


  static isSameCombination( branche1: Branche,  branche2: Branche,  branche3: Branche) {
		if ( branche1!==branche2 && branche1!==branche3 && branche3!==branche2) {
			return BrancheHelper.getUniqueRelation(branche1, branche2)===BrancheRelation.COMBINATION &&
      BrancheHelper.getUniqueRelation(branche1, branche3)===BrancheRelation.COMBINATION &&
      BrancheHelper.getUniqueRelation(branche2, branche3)=== BrancheRelation.COMBINATION
				 ;
		} else {
			return false ;
		}
	}


  static getBrancheRelation( brancheRow: Branche,  brancheCol: Branche) {
    return BrancheRelation.RELATIONARR[brancheRow.ordinal()][brancheCol.ordinal()];
  }

  static getHiddenTrunk(branche: Branche) {
    return BrancheHelper.HIDDEN_TRUNK[branche.ordinal()];
  }

  // Ref17p292
 static isBadYearAgeNPeriod( birthBranche: Branche,  periodBranche: Branche) {
  return birthBranche===Branche.RAT && (periodBranche===Branche.TIGER || periodBranche===Branche.MONKEY ) ||
                  birthBranche===Branche.OX && (periodBranche===Branche.OX || periodBranche===Branche.HORSE ) ||
                  birthBranche===Branche.HORSE && (periodBranche===Branche.OX || periodBranche===Branche.HORSE ) ||
                  birthBranche===Branche.TIGER && (periodBranche===Branche.SNAKE || periodBranche===Branche.PIG ) ||
                  birthBranche===Branche.RABBIT && (periodBranche===Branche.SNAKE || periodBranche===Branche.PIG ) ||
                  birthBranche===Branche.GOAT && (periodBranche==Branche.COCK || periodBranche===Branche.PIG ) ||
                  birthBranche===Branche.MONKEY && (periodBranche===Branche.HORSE) ||
                  birthBranche===Branche.DOG && (periodBranche===Branche.SNAKE ) ||
  birthBranche===Branche.DRAGON && (periodBranche===Branche.DRAGON || periodBranche===Branche.DOG )||
  birthBranche===Branche.SNAKE && (periodBranche===Branche.SNAKE ) ||
                  birthBranche===Branche.DOG && (periodBranche===Branche.DOG || periodBranche===Branche.DRAGON )
  ;
}

// Ref17p292
static isClashYearAgeNPeriod(birthBranche: Branche,  periodBranche: Branche, palace: TuViPalace) {
  return birthBranche==Branche.RAT && (periodBranche==Branche.RAT || periodBranche==Branche.HORSE ) ||
                  birthBranche===Branche.TIGER && (periodBranche===Branche.TIGER || periodBranche===Branche.MONKEY ) ||
                  birthBranche===Branche.RABBIT && (periodBranche===Branche.TIGER || periodBranche===Branche.MONKEY ) ||
                  birthBranche===Branche.TIGER && (periodBranche===Branche.RABBIT || periodBranche===Branche.COCK ) ||
                  birthBranche===Branche.RABBIT && (periodBranche===Branche.RABBIT || periodBranche===Branche.COCK ) ||
                  birthBranche===Branche.DRAGON && (periodBranche===Branche.DRAGON || periodBranche===Branche.DOG ) ||
                  (palace.isThan)&&(birthBranche===Branche.DRAGON ||birthBranche===Branche.SNAKE||birthBranche===Branche.DOG  ) ||
                  birthBranche===Branche.SNAKE && (periodBranche===Branche.SNAKE || periodBranche===Branche.PIG ) ||
                  birthBranche===Branche.MONKEY && (periodBranche===Branche.MONKEY || periodBranche===Branche.TIGER ) ||
                  birthBranche===Branche.COCK && (periodBranche===Branche.COCK || periodBranche===Branche.RABBIT ) ||
                  birthBranche===Branche.DOG && (periodBranche===Branche.DOG || periodBranche===Branche.DRAGON ) ||
                  birthBranche===Branche.PIG && (periodBranche===Branche.PIG || periodBranche===Branche.SNAKE )
          ;
}

}
