
import { BaziHelper } from "../../helper/baziHelper";
import { BrancheHelper } from "../../helper/brancheHelper";
import { NagiaHelper } from "../../helper/nagiaHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { Branche } from "../bazi/branche";
import { Trunk } from "../bazi/trunk";
import { MyCalendar } from "../date/mycalendar";
import { Element } from "../feng-shui/element";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { SecDeityAttr } from "./SecDeityAttr";
import { BrancheRelation } from "./brancheRelation";
import { SecondaryDeity } from "./secondaryDeity";

export class PilarBase  {

    //Ref8p32
    static TRUNK_HOSTILE = [
      [Trunk.GENG,Trunk.BING],
      [Trunk.XIN,Trunk.JI],
      [Trunk.REN,Trunk.WU],
      [Trunk.GUI,Trunk.JI],
      [Trunk.JIA,Trunk.GENG],
      [Trunk.YI,Trunk.XIN],
      [Trunk.BING,Trunk.REN],
      [Trunk.DING,Trunk.GUI],
      [Trunk.WU,Trunk.JIA],
      [Trunk.JI,Trunk.YI],
    ]

  trunk: Trunk;
  branche: Branche;
  nagiaElement: Element;
  lifeCycle: ElementLifeCycle;
  deity: ElementNEnergyRelation;
  secDeityAttr: SecDeityAttr = null;

  constructor(trunk: Trunk, branche: Branche) {
    this.trunk= trunk; this.branche= branche;
    this.nagiaElement=NagiaHelper.getNagiaElement(trunk, branche);
    this.lifeCycle=BaziHelper.elementLifeCycle(trunk, branche);
  }


  toString() {
    return this.trunk.getName()+' '+ this.branche.getName() ;
  }

  getSecDeityAttr() {
    if ( this.secDeityAttr===null ) {
      this.secDeityAttr=new SecDeityAttr();
      SecondaryDeity.evalPilarSecDeity(this.secDeityAttr,this.trunk, this.branche,null)
    }
    return this.secDeityAttr
  }

  getNagiaIndex () {
    return NagiaHelper.getNagiaIdx(this.trunk,this.branche);
  }


  isTrunkClashed ( pilar: PilarBase ) {
    const ord1=this.trunk.ordinal();
    const trunk2 = pilar.trunk;
    const ord2=trunk2.ordinal();
    return ObjectHelper.hasItem(PilarBase.TRUNK_HOSTILE[ord1],trunk2) ||
    ObjectHelper.hasItem(PilarBase.TRUNK_HOSTILE[ord2],trunk2)
  }

  isTrunkCompatible (pilar: PilarBase ) {
    return this.trunk.isCompatibleTrunk(pilar.trunk)
  }

  isBrancheCompatible (pilar: PilarBase ) {
    return BrancheHelper.getMainRelation(
      this.branche,
      pilar.branche
    ).isFavorable()
  }

  isCompatible (pilar: PilarBase ) {
    return this.isTrunkCompatible(pilar) && this.isBrancheCompatible(pilar)
  }

  isBrancheClashed ( pilar: PilarBase ) {
    for (let index = 0; index < BrancheRelation.CLASHEDRELATION.length; index++) {
     const clashRelation = BrancheRelation.CLASHEDRELATION[index];
     if (  BrancheRelation.isRelationPresent(
       this.branche,
       pilar.branche,
       clashRelation
       )) { return true ;}
    }
     return false ;
   }

   isTrunkBrancheClashed(pilar: PilarBase) {
    return this.isTrunkClashed(pilar) && this.isBrancheClashed(pilar);
   }

   isBrancheWeakenedByTrunk() {
    const trunkElement = this.trunk.getElement();
    const brancheElement = this.branche.getElement();
    return brancheElement.isLostForceRelation(trunkElement)
   }


   isPilarClashed(pilar: PilarBase) {
    return this.isTrunkClashed(pilar) || this.isBrancheClashed(pilar);
   }

   isNotClashed(pilar: PilarBase) {
    return ! this.isPilarClashed(pilar) ;
   }


   getEnergy() {
    // Assume trunk, branche has same energy
    return this.trunk.elementNEnergy.energy;
   }

   getElement() {
    return this.nagiaElement
   }
}
