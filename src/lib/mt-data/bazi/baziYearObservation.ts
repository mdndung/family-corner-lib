import { BaziStructureHelper } from "../../helper/bazi-structureHelper";
import { BrancheHelper } from "../../helper/brancheHelper";
import { NagiaHelper } from "../../helper/nagiaHelper";
import { ObjectHelper } from "../../helper/objectHelper";
import { QiHelper } from "../../helper/qiHelper";
import { StringHelper } from "../../helper/stringHelper";
import { ElementLifeCycle } from "../feng-shui/elementLifeCycle";
import { ElementNEnergyRelation } from "../feng-shui/elementNEnergyRelation";
import { DataWithLog } from "../qi/dataWithLog";
import { QiType } from "../qi/qi-type";
import { HalacTheme } from "../yi-jing/halacTheme";
import { YiJing } from "../yi-jing/yijing";
import { Bazi } from "./bazi";
import { BaziStructure } from "./bazi-structure";
import { BaziPeriodObservation } from "./baziPeriodObservation";
import { LunarBase } from "./lunarBase";
import { SecondaryDeity } from "./secondaryDeity";

export class BaziYearObservation extends BaziPeriodObservation {
  yearAttr: any;

  constructor(bazi: Bazi) {
    super(bazi);
  }

  protected override getPilar (pilarChar: string) {
    if ( pilarChar==="Year") return this.yearAttr.pilar;
    return super.getPilar(pilarChar);
  }

  evalBaseYearPoint(currStudyYear: Bazi) {
    this.resetPoints();
    this.evalPeriodPoint(currStudyYear, 2);
    this.yearAttr = QiHelper.evalYearQi(
      this.lunar,
      currStudyYear,
      this.periodAttr.periodQi
    );
    const yearQi = this.yearAttr.yearQi;
    // Year Status
    this.incForce(yearQi.getForce(QiType.YEARSTATUSFORCE));
    this.incForce(yearQi.getForce(QiType.YEARBIRTHTRUNKCLASH));
    this.incForce(yearQi.getForce(QiType.YEARBIRTHBRANCHECLASH));
    this.incForce(yearQi.getForce(QiType.YEARCONTROLBIRTHELEMENT));
  }

  // Ref3p182 Year.DayMaster.DayForce.DO7K.Force.DRIR.Force.Hostile&"
  // Year.Pivot.deity.Hostile
  // Year.Pivot.YearElement.PivotElement
  commentOnYearDayMaster(currLunarYear: Bazi) {
    const DOT = ".";
    const pilarsAttr = this.lunar.pilarsAttr;
    const dayForce = this.baseAttr.dayForce;
    const do7KForce = this.baseAttr.do7KForce;
    const drIRForce = this.baseAttr.drIRForce;
    // Ref3p182.
    const pivotElements = pilarsAttr.elligiblePivotData.getValue();
    const yearElement = this.yearAttr.element;
    let temp = "";
    const tempFix =
      dayForce + ".DO7K." + do7KForce + ".DRIR." + drIRForce + DOT;
    for (let index = 0; index < pivotElements.length; index++) {
      const pivotElement = pivotElements[index];
      if (yearElement.isDestructive(pivotElement)) {
        // Ref3p182 Pivot.-.DO7K.+.DRIR.+.Hostile&"
        temp = "Year.Pivot." + tempFix + "Hostile";
        this.addSupportBaseComment(2, temp);
        temp = "Year.Pivot." + yearElement.getName() + DOT+pivotElement.getName();
        // Year.Pivot.YearElement.PivotElement
        this.addSupportBaseComment(2, temp);
      }
    }
  }


  //Year.YearStatus.ClashTypePilarChar.-.NoQuy
 // Year.YearStatus.Pilar.SecDeity.NoQuy
  //Year.DeityGrpName.DayForce.pilar."Trunk.class"
  commentOnPilarClash(clashPilars: string[], prefix: string, isTrunk: boolean) {
    let pilarChars: string[] = [];
    if (clashPilars.length > 0) {
      const baseAttr = this.baseAttr;
      const yearAttr = this.yearAttr;
      const DOT = ".";
      const yDeity = yearAttr.deity;
      const yDeityBase = yDeity.getBaseGroup();
      const secDeiTies = this.lunar.pilarsAttr.secondaryDeityPilars;

      for (let pilarIdx = 0; pilarIdx < clashPilars.length; pilarIdx++) {
        const pilarStr = clashPilars[pilarIdx];
        const pilarChar = pilarStr.substring(pilarStr.length - 1);
        let temp = prefix + pilarStr + ".-" + this.noQuyNhanSuffix;
        //Year.YearStatus.ClashTypePilarChar.-.NoQuy
        this.addUpdatePtsBaseComment(temp);
        if (isTrunk) {
          //"Year.DO.-.D.Trunk.clash&": [-1,"=Ref8p272p7"],
          temp =
            "Year." +
            yDeityBase.getName() +
            DOT +
            baseAttr.dayForce +
            DOT +
            pilarChar +
            ".Trunk.clash";
          this.addUpdatePtsBaseComment(temp);
        }

        const clashPilarIdx = LunarBase.getPilarIdx(pilarChar);
        // secdeity info
        for (let index = 0; index < secDeiTies[clashPilarIdx].length; index++) {
          const secDeity = secDeiTies[clashPilarIdx][index];
          temp = prefix + pilarChar+DOT+ secDeity.getName() + this.noQuyNhanSuffix;
          // Year.-.Pilar.SecDeity.NoQuy
          this.addUpdatePtsBaseComment(temp);
          /*
          // Year.-.ClashType.SecDeity.NoQuy
          temp =
            prefix + pilarStr + DOT + secDeity.getName() + this.noQuyNhanSuffix;
          console.log("Check 11", temp);
          this.addUpdatePtsBaseComment(temp);
          */
        }

        ObjectHelper.pushIfNotExist(pilarChars, pilarChar);
      }
    }

    return pilarChars;
  }

  // Year.Pilar.Clash.Pilar.NoQuy
  // Year.Pivot.Pilar.Clash.Pilar.NoQuy
  // Year.Pilar.Clash.Pilar.Deity.NoQuy
  // Period.Year.Pilar.Clash.Pilar.NoQuy
  // Year.Pilar.Clash.Pilar.DecDeity.NoQuy
  commentOnBothPilarClash(
    trunkClashPilarNames: string[],
    brancheClashPilarNames: string[]
  ) {
    const periodPilar = this.periodAttr.pilar;
    const pilarsAttr = this.lunar.pilarsAttr;
    const DOT = ".";
    const secDeiTies = this.lunar.pilarsAttr.secondaryDeityPilars;
    let temp="";
    for (
      let branchePilarIdx = 0;
      branchePilarIdx < brancheClashPilarNames.length;
      branchePilarIdx++
    ) {
      const branchePilar = brancheClashPilarNames[branchePilarIdx];
      for (
        let trunkPilarIdx = 0;
        trunkPilarIdx < trunkClashPilarNames.length;
        trunkPilarIdx++
      ) {
        const trunkPilar = trunkClashPilarNames[trunkPilarIdx];
        if (branchePilar === trunkPilar) {
          temp = "Year.Pilar.Clash." + branchePilar + this.noQuyNhanSuffix;
          // Year.Pilar.Clash.Pilar.NoQuy
          this.addUpdatePtsBaseComment(temp);

          const pilar = this.getPilar(branchePilar);
          //Pivot info
          const nagiaElement = pilar.nagiaElement;
          if (pilarsAttr.isElligilePivotElement(nagiaElement)) {
            temp =
              "Year.Pivot.Pilar.Clash." + branchePilar + this.noQuyNhanSuffix;
            // Year.Pivot.Pilar.Clash.Pilar.NoQuy
            this.addUpdatePtsBaseComment(temp);
          }
          //Deity info
          const deity = this.lunar.getTrunkDeity(pilar.trunk);
          // Year.Pilar.Clash.Pilar.Deity.NoQuy
          temp =
            "Year.Pilar.Clash." +
            branchePilar +
            DOT +
            deity.getName() +
            this.noQuyNhanSuffix;
          this.addUpdatePtsBaseComment(temp);
          //Period clashed also?
          if (periodPilar.isPilarClashed(pilar)) {
            temp =
              "Period.Year.Pilar.Clash." + branchePilar + this.noQuyNhanSuffix;
            // Period.Year.Pilar.Clash.Pilar.NoQuy
            this.addUpdatePtsBaseComment(temp);
          }
          // Sec Deity
          const clashPilarIdx = LunarBase.getPilarIdx(branchePilar);
          // secdeity info
          for (let index = 0; index < secDeiTies[clashPilarIdx].length; index++) {
            const secDeity = secDeiTies[clashPilarIdx][index];
            temp = "Year.Pilar.Clash." + branchePilar + DOT + secDeity.getName() + this.noQuyNhanSuffix;
            // Year.Pilar.Clash.YMHD.DecDeity.NoQuy
            this.addUpdatePtsBaseComment(temp);
          }

        }
      }
    }
  }

  // Year.YearStatus
  //Year.YearStatus.TrunkClashType.NoQuy
  //Year.YearStatus.BrancheClashType.NoQuy
  // Year.YCB.YearElement-  Ref3p558p18,19..22
  commentOnQiYear(currStudyYear: Bazi) {
    const pilarsAttr = this.lunar.pilarsAttr;
    const statusSuffix = pilarsAttr.getPivotElementStatus(
      this.yearAttr.element
    );
    let yPrefix = "Year." + statusSuffix;
    const DOT = ".";
    //Year.YearStatus
    this.addUpdatePtsBaseComment(yPrefix);
    if (statusSuffix === "-") {
      yPrefix += DOT;
      //Year.YearStatus.BrancheClashType.
      const bPilarClash = this.commentOnPilarClash(
        this.yearAttr.branchePilarClash,
        yPrefix,
        false
      );
      const tPilarClash = this.commentOnPilarClash(
        this.yearAttr.trunkPilarClash,
        yPrefix,
        true
      );
      this.commentOnBothPilarClash(tPilarClash, bPilarClash);

      const yearQi = this.yearAttr.yearQi;
      const yElement = currStudyYear.getdTrunk().getElement();
      let force = yearQi.getForce(QiType.YEARCONTROLBIRTHELEMENT);
      if (force !== 0) {
        let forceSuffix = StringHelper.number2Str(
          yearQi.getForce(QiType.YEARCONTROLBIRTHELEMENT)
        );
        let temp =
          yPrefix +
          QiType.YEARCONTROLBIRTHELEMENT.getName() +
          DOT +
          yElement.getName() +
          DOT +
          forceSuffix;
        // Year.YCB.YearElement-  Ref3p558p18,19..
        this.addUpdatePtsBaseComment(temp);
      }
    }
  }

  //Year.Ref8p272p9
  // Year.Ref8p276p35
  //Year.Ref8p273p10
  //Year.Ref8p276p36
  commentOnYearPilar(currStudyYear: Bazi) {
    const studyYearTrunk = currStudyYear.getyTrunk();
    const studyYearBranche = currStudyYear.getyBranche();
    const birthYearTrunk = this.lunar.getyTrunk();
    const birthYearBranche = this.lunar.getyBranche();
    let temp = "";
    if (
      studyYearTrunk === birthYearTrunk &&
      studyYearBranche === birthYearBranche
    ) {
      temp = "Year.Ref8p272p9";
      this.addUpdatePtsBaseComment(temp);
    }
    if (studyYearTrunk.isCompatibleTrunk(birthYearTrunk)) {
      temp = "Year.Ref8p276p35";
      this.addUpdatePtsBaseComment(temp);
      if (
        BrancheHelper.getMainRelation(
          studyYearBranche,
          birthYearBranche
        ).isFavorable()
      ) {
        temp = "Year.Ref8p273p10";
        this.addUpdatePtsBaseComment(temp);
      }
    }

  }

  commentOnYearTamTai(currStudyYear: Bazi) {
    const yearQiRec = this.yearAttr.yearQi;
    let qiData = yearQiRec.getData(QiType.YEARTAMTAI);
    if (qiData !== null) {
      // Tam Tai. Ref2p331
      const pilars = this.lunar.pilars;
      const DOT = ".";
      let nagiaIndex = pilars[LunarBase.YINDEX].getNagiaIndex();
      const birthNagiaTrigram = NagiaHelper.getNagiaTrigram(nagiaIndex);
      nagiaIndex = currStudyYear.pilars[LunarBase.YINDEX].getNagiaIndex();
      const yearNagiaTrigram = NagiaHelper.getNagiaTrigram(nagiaIndex);
      let theme = YiJing.getInstanceFromSkyEarth(
        birthNagiaTrigram,
        yearNagiaTrigram,
        HalacTheme.getNDPos(this.lunar, birthNagiaTrigram, yearNagiaTrigram)
      );
      const yaoPos = theme.getMyYaoPos() + 1;
      const temp = "Halac." + theme.getHexaOrdinal() + DOT + yaoPos + ".yao";
      this.addUpdatePtsBaseComment(temp);
    }
  }

  commentOnYear(currStudyYear: Bazi) {

    this.studyYear=currStudyYear;
    this.lunar.evalPeriodData();
    this.evalBaseYearPoint(currStudyYear);
    this.evalCurrAttr(currStudyYear);
    this.commentOnYearPilar(currStudyYear);
    this.commentOnQiYear(currStudyYear);
    this.commentOnPeriodOrYear("Year.", this.yearAttr);
    this.commentOnYearTamTai(currStudyYear);
  }
}
