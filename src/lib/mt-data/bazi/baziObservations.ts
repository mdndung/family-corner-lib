import { BaziStructureHelper } from "../../helper/bazi-structureHelper";
import { BaziHelper } from "../../helper/baziHelper";
import { BrancheHelper } from "../../helper/brancheHelper";
import { NagiaHelper } from "../../helper/nagiaHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { QiHelper } from "../../helper/qiHelper";
import { StringHelper } from "../../helper/stringHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { BaziHoroscope } from "../../horoscope/baziHoroscope";
import { ObservationBase } from "../../observations/observationBase";
import { Element } from "../feng-shui/element";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { DataWithLog } from "../qi/dataWithLog";
import { QiForce } from "../qi/qi-force";
import { QiType } from "../qi/qi-type";
import { QiTypeDataRec } from "../qi/qi-type-data-rec";
import { HalacTheme } from "../yi-jing/halacTheme";
import { YiJing } from "../yi-jing/yijing";
import { Bazi } from "./bazi";
import { BaziStructure } from "./bazi-structure";
import { BaziYearObservation } from "./baziYearObservation";
import { CombAttr } from "./combinationList";
import { LunarBase } from "./lunarBase";
import { SecondaryDeity } from "./secondaryDeity";

export class BaziObservation extends BaziYearObservation {
  // See to update it for each period

  constructor(bazi: Bazi) {
    super(bazi);
  }

}
