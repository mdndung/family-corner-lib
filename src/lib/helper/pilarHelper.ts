import { Bazi } from "../mt-data/bazi/bazi";
import { LunarBase } from "../mt-data/bazi/lunarBase";
import { PeriodPilar } from "../mt-data/bazi/periodPilar";
import { PilarBase } from "../mt-data/bazi/pilarBase";
import { DataWithLog } from "../mt-data/qi/dataWithLog";
import { ObjectHelper } from "./objectHelper";
import { TrunkHelper } from "./trunkHelper";

export class PilarHelper {

  //Ref8p267p5
  static getPilarQiTransformStatus(
    checkPilar: PilarBase,
    bazi: Bazi,
    header: string
  ) {
    const pilarsAttr = bazi.pilarsAttr;
    const pivotHostileElements = pilarsAttr.pivotHostileElements;
    const pivotCompatibleElements = pilarsAttr.elligiblePivotData.getValue();
    const pilarElement = checkPilar.nagiaElement;
    if (pilarElement.isCompatible(pivotHostileElements)) {
      return new DataWithLog(
        -1,
        header + " is a pivot compatible element " + pilarElement
      );
    }
    for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
      const pilar = bazi.getPilar(pilarIdx);
      const trElement = TrunkHelper.getPilarTrunkTransformedElement(
        checkPilar,
        pilar
      );
      if (trElement !== null) {
        if (trElement.isCompatible(pivotCompatibleElements)) {
          return new DataWithLog(
            -1,
            header + " Transformed to a pivot compatible element " + trElement
          );
        }
      }
    }
    return new DataWithLog(1, header + " No transformation");
  }

  ////Ref8p267p6
  static getPivotCompatibleClashStatus(
    checkPilar: PilarBase,
    bazi: Bazi,
    header: string
  ) {
    const pilarsAttr = bazi.pilarsAttr;
    const pivotCompatibleElements = pilarsAttr.elligiblePivotData.getValue();
    const pilarElement = checkPilar.nagiaElement;
    for (let ElementIdx = 0; ElementIdx < pivotCompatibleElements.length; ElementIdx++) {
      const element = pivotCompatibleElements[ElementIdx];
      if ( pilarElement.isDestructive(element)) {
        return new DataWithLog(
          -2,
          header + " is Hostile to Pivot Element " + element
        );
      }
    }
    return null;
  }

   //Ref8p267p7
   // Period Deity pivot element and birth pilar transformed to a bad status
   static getPeriodPilarTransformStatus(
    periodPilar: PilarBase,
    bazi: Bazi
  ) {
    const pilarsAttr = bazi.pilarsAttr;
    const pivotHostileElements = pilarsAttr.pivotHostileElements;
    const pivotCompatibleElements = pilarsAttr.elligiblePivotData.getValue();
    if ( ObjectHelper.hasItem(pivotCompatibleElements,periodPilar.trunk.getElement())) {
      // Period pilar element is a (compatible) pivot
      for (let pilarIdx = 0; pilarIdx < LunarBase.PILARS_LEN; pilarIdx++) {
        const pilar = bazi.getPilar(pilarIdx);
        const trElement = TrunkHelper.getPilarTrunkTransformedElement(
          periodPilar,
          pilar
        );
        if (trElement !== null) {
            if ( ObjectHelper.hasItem(pivotHostileElements,trElement) ) {
              return new DataWithLog(
                -2,
              pilar.trunk.getElement()+" pivot Element transformed to hostile pivot element" + trElement
              );
            } else {
              return new DataWithLog(
                -1,
                pilar.trunk.getElement()+" pivot Element transformed neutral element" + trElement
              )
            }
          }
        }
    }
    return null;
  }

}
