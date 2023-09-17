
import { BrancheHelper } from "../../helper/brancheHelper";
import { TrunkHelper } from "../../helper/trunkHelper";
import { TuViHoroscope } from "../../horoscope/tuviHoroscope";
import { ElementRelation } from "../feng-shui/element-relation";
import { Energy } from "../feng-shui/energy";
import { TuViPalace } from "./tuviPalace";
import { TuViPalaceObservationBase } from "./tuviPalaceObservationBase";
import { Element } from '../../mt-data/feng-shui/element';
import { TuViRing } from "./tuviRing";
import { Branche } from "../bazi/branche";
import { TuViStar } from "./tuviStar";
import { TuViStarHelper } from "../../helper/tuviStarHelper";
import { Trunk } from "../bazi/trunk";
import { BrancheRelation } from "../bazi/brancheRelation";
import { BaziHelper } from "../../helper/baziHelper";
import { Lunar } from "../bazi/lunar";

export class TuviMenhObservation extends TuViPalaceObservationBase {

  thanPalace: TuViPalace= null;
  thanPalaceObs: TuViPalaceObservationBase= null;


  constructor(palace: TuViPalace, tuviHoroscope: TuViHoroscope) {
    super(palace, tuviHoroscope);
  }


    // Ref17p59..Ref17p60
    getMenhThanRef17p59_60(menhOrThan:TuViPalaceObservationBase) {

      const elementTrunk = TrunkHelper.getTrunk(menhOrThan.getTuViElement(), Energy.YANG);
      const birthStartBranche = BrancheHelper.getStartMonthElementLifeCycle(elementTrunk);
      let palaceBrance = menhOrThan.palace.branche;
      const sign = elementTrunk.getEnergy()==Energy.YANG ? 1 : -1 ;
      if (palaceBrance===birthStartBranche.getEnumNextNElement(sign*TuViPalaceObservationBase.SINHDIA.ordinal())) return 10;
      if (palaceBrance===birthStartBranche.getEnumNextNElement(sign*TuViPalaceObservationBase.VUONGDIA.ordinal())) return 8;
      // Ref17p59P3+Ref17p60A
      if (palaceBrance===birthStartBranche.getEnumNextNElement(sign*TuViPalaceObservationBase.BAIDIA.ordinal())) return 2;

      if (palaceBrance===birthStartBranche.getEnumNextNElement(sign*TuViPalaceObservationBase.TUYETDIA.ordinal())) {
          return  this.hasMajorStarWithFavorableElement ? 6 : 1;
      }
      return 5;
  }


  evalOtherMenhThanStatusCase(menhOrThan: TuViPalaceObservationBase) {
      let count = 5;
      const palaceElement=menhOrThan.getPalaceElement();
      const tuViElement=menhOrThan.getTuViElement();
      if (null !==
        menhOrThan.getMainStarWithElementRelation4(
                      ElementRelation.GENERATED, palaceElement,
                      ElementRelation.GENERATE, tuViElement)) {
          // Ref17p60p6
          count = 10;
      }
      if ( (null !== menhOrThan.getMainStarWithElementRelation2(ElementRelation.GENERATE, palaceElement)) ||
              (null !== menhOrThan.getMainStarWithElementRelation2(ElementRelation.GENERATED, tuViElement)) ){
          //Ref17p60p7
          count -= 3;
      }
      if (null != menhOrThan.getMainStarWithElementRelation2(ElementRelation.RESTRICTED, palaceElement) ||
              null != menhOrThan.getMainStarWithElementRelation2(ElementRelation.RESTRICT, tuViElement)) {
          //Ref17p60p8
          count -= 5;
      }
      menhOrThan.palace.incPoints(count);
  }

  //Ref22p176 Ref18p139p2
   getMenhThanRef22p176_177() {
      let points = 0 ;
      const menhElement = this.getTuViElement();
      const cucElement = this.getTuViCucElement();
      const relation = BaziHelper.getRelation(cucElement,menhElement);
      switch (relation)  {
          case ElementRelation.GENERATE: points=10; break ;
          case ElementRelation.GENERATED: points=4; break ;
          case ElementRelation.ENFORCE: points=7; break ;
          case ElementRelation.RESTRICT: points=this.hasMajorStarWithFavorableElement ?4:2 ; break ;
          case ElementRelation.RESTRICTED: points=this.hasMajorStarWithFavorableElement ?9:7; break ;
      }
      return points ;
  }

   evalMenhThanStatus(menhOrThan: TuViPalaceObservationBase) {
      let points = this.getMenhThanRef17p59_60(menhOrThan);
      menhOrThan.palace.incPoints(points);
      points = this.getMenhThanRef22p176_177();
      menhOrThan.palace.incPoints(points);
  }

   propagateMenhPoints( point:number, ringArr:TuViRing[]){
      // Ref22p217p2 Propagate to Palace Than
      let currPalace = this.thanPalace;
      currPalace.incPoints(point);
      //Ref22p217p3
      ringArr.forEach(ring => {
          currPalace = this.palace.getRingPalace(ring);
          if ( ! currPalace.isThan ) {
            currPalace.incPoints(point);
          }
      })
  }

  // Max is 10
  static thuanLyringArr =  [TuViRing.PhucDuc, TuViRing.QuanLoc,
          TuViRing.ThienDi,TuViRing.TaiBach,TuViRing.PhuThe];

   evalThuanLy(menhOrThan: TuViPalaceObservationBase) {
      const birthYearEnergy = menhOrThan.getLunarYearBranche().getEnergy();
      let point = 2;
      //Ref22p216 -217 Only important with Menh or Than
      if (birthYearEnergy===this.palace.branche.getEnergy()) {
          // Ref17p59p2a thuan ly
          point = 9;
      } else {
          // Ref17p59p2b nghich ly
          point = 4;
      }
      this.palace.incPoints(point);

      if ( menhOrThan===this ) {
        this.propagateMenhPoints(point, TuviMenhObservation.thuanLyringArr);
      }
  }

  static birthEnergyCompatibilityringArr =  [
          TuViRing.PhucDuc, TuViRing.QuanLoc,
          TuViRing.ThienDi,TuViRing.TaiBach,TuViRing.PhuThe];

  evalBirthYearEnergy(menhOrThan: TuViPalaceObservationBase) {
      let point = 3;
      const birthYearEnergy = menhOrThan.getLunarYearBranche().getEnergy();
      //Ref22p216 -217 Only important with Menh or Than
      if (birthYearEnergy.isYang()===this.isMan() ) {
          point = 7;
      } else {
          point = 5;
      }
      menhOrThan.palace.incPoints(point);
      if ( menhOrThan===this ) {
        this.propagateMenhPoints(point,TuviMenhObservation.birthEnergyCompatibilityringArr);
      }

  }

genRef13p86ForThan(thanObs: TuViPalaceObservationBase) {
          let genKeyRef13p86p1 = false;
          let genKeyRef13p86p2 = false;
          // Ref13p86p1
          if (BrancheHelper.isSnakeHorse(thanObs.palace.branche)) {
              // Ref13p86p1
              genKeyRef13p86p1 = true;
          } else {
              if ((thanObs.palace.branche===Branche.PIG) && thanObs.hasNoGoodChinhTinh()) {
                  genKeyRef13p86p1 = true;
              } else {
                  if (BrancheHelper.isTigerMonkeyPig(thanObs.palace.branche)) {
                      const starSet = [
                              TuViStar.THIENMA,
                              TuViStar.HOATINH,
                              TuViStar.LINHTINH,
                              TuViStar.THIENHINH,
                              TuViStar.DIAKIEP
                      ];
                      genKeyRef13p86p1 = thanObs.hasSupportStars0(starSet);
                  }
              }
          }

          // Ref13p86p2
          const palaceElement = thanObs.getPalaceElement();
          if (palaceElement===Element.EARTH || thanObs.palace.branche===Branche.PIG) {
              genKeyRef13p86p2 =
              thanObs.getTuViElement()===Element.EARTH &&
              thanObs.hasSupportStars(TuViStarHelper.SINHVUONGTAHUU, 3);
          }
          if (genKeyRef13p86p2) {
            thanObs.addBaseComment("Ref13p86p2");
          } else {
              if (genKeyRef13p86p1) {
                  if (thanObs.palace.getNote() <= TuViPalace.GOODNOTESREFERENCE) {
                    thanObs.addBaseComment("Ref13p86p1a");
                  } else {
                    thanObs.addBaseComment("Ref13p86p1b");
                  }
              }
          }
  }

   genRef13p86p3() {
      if (this.hasStar(TuViStar.TRIETKHONG) &&
      this.thanPalaceObs.hasStar(TuViStar.TRIETKHONG) &&
      this.hasNoGoodChinhTinh()
              ) {
          this.addBaseComment("Ref13p86p3");
      }
  }

   override updateForce() {
      super.updateForce();
      this.updateForceFromObservation(this.getObservations(TuViRing.PhucDuc));
  }

  convertToPoint( force: number) {
      return 5 + (force / 10);
  }

  // Update Primary star relation
  // Non primary star's force is already include in current force
  //
   upDatePointsRef17p40() {
      let supportForce = 0.0;
      if (this.palace.chinhTinhCount > 0) {
          supportForce = this.palace.getPrimaryStarElementSupportForce(this.getTuViElement());
      } else {
          const oppositePalace = this.palace.getOppositePalace();
          if (null!=oppositePalace&&oppositePalace.chinhTinhCount > 0) {
              supportForce = oppositePalace.getPrimaryStarElementSupportForce(this.getTuViElement());
          }
      }
      if (supportForce != 0) {
          const points = this.convertToPoint(supportForce);
          this.incPoints(points);
      }

  }


   updPointRef17p39() {
          let supportForce = 0.0;
          let tuViSummary=this.tuviHoroscope;
          if (tuViSummary.isBirthYearMonthEnergyCompatible) {
              supportForce = 5.0;
          }
          if (tuViSummary.isBirthDayHourEnergyCompatible) {
              supportForce += supportForce * 2 + 5.0;
          }
          this.incPoints(this.convertToPoint(supportForce));
          supportForce = 0.0;
          if (tuViSummary.isBirthYearMonthElementCompatible) {
              supportForce = 5.0;
          }
          if (tuViSummary.isBirthDayHourElementCompatible) {
              supportForce += supportForce * 2 + 5.0;
          }
          this.incPoints(this.convertToPoint(supportForce));

          if (tuViSummary.isYearMonthTrunkCombibed) {
              this.incPoints(6);
          }
          if (tuViSummary.isYearDestroyMonthTrunk) {
              this.incPoints(4);
          }
          if (tuViSummary.isDayHourTrunkCombibed) {
              this.incPoints(6);
          }
          if (tuViSummary.isDayDestroyHourTrunk) {
              this.incPoints(4);
          }

          if (tuViSummary.isYearMonthBrancheCombibed) {
              this.incPoints(6);
          }
          if (tuViSummary.isYearDestroyMonthBranche) {
              this.incPoints(4);
          }
          if (tuViSummary.isDayHourBrancheCombibed) {
              this.incPoints(6);
          }
          if (tuViSummary.isDayDestroyHourBranche) {
              this.incPoints(4);
          }

          if (tuViSummary.isTuViNPalaceElementCompatible) {
              this.incPoints(6);
          } else {
              this.incPoints(4);
          }

          if (tuViSummary.isYearNPalaceEnergyCompatible) {
              this.incPoints(6);
          } else {
              this.incPoints(4);
          }
  }

  //Ref22p216 -217 Only important with Menh or Than
  evalAddMenhThanPoints(menhOrThan: TuViPalaceObservationBase) {
    this.evalThuanLy(menhOrThan);
    this.evalBirthYearEnergy(menhOrThan);
    this.evalMenhThanStatus(menhOrThan);
    this.evalOtherMenhThanStatusCase(menhOrThan);
}


commentMenh() {

  this.updPointRef17p39();
  this.upDatePointsRef17p40();

    if (this.hasNoChinhTinh()) {
    } else {
        // ThienPhu Ring
        this.genRef20p151c7a();
    }
    this.genRef13p86p3();

}

commentMenhOnThan(than: TuViPalaceObservationBase) {
  this.genRef13p86ForThan(than);
}

override initComment() {
    super.initComment();
    this.thanPalace=this.getThanPalace();
    this.thanPalaceObs = this.thanPalace.palaceObservation;
  }

    getHeaderSuffix(): string {
      return "Menh"
    }

  override comment() {
    super.comment();
    this.evalMenhStarElementEnergyCompatibility();
    this.evalAddMenhThanPoints(this);
    const isSameMenhThanPalace = this.palace===this.thanPalace;
    if ( !isSameMenhThanPalace) {
      this.evalAddMenhThanPoints(this.thanPalaceObs);
    }
    this.commentMenhOnThan(this.thanPalaceObs);
    this.commentMenh();
    this.filterObservation("TuVi.Base", false);
}



checkThuongCach() {
  let res = false ;
  const hasSupportStars = this.hasSupportStars(
    TuViStarHelper.XUONGKHUCTHUONGCACH,
    5
  );
  if (hasSupportStars) {
    if (this.hasGoodDiaStars(TuViStarHelper.TUPHUVUTUONG, 3)) {
      res = true ;
    }
    if (!res&& this.hasGoodDiaStars(TuViStarHelper.CONGUYETDONGLUONG, 3)) {
        res = true ;
    }
    if (!res&& this.hasGoodDiaStars(TuViStarHelper.CUNHAT,2)) {
        res = true ;
    }
    if (!res&& this.hasGoodDiaStars(TuViStarHelper.NHATLOC,2)) {
      res = true ;
   }

  }
  return res
}

checkTrungCach() {
  let starArr;
  let res = false ;
  if (this.hasStars(TuViStarHelper.CODONGLUONG, 2)) {
    if (this.hasSupportStars(TuViStarHelper.TAHUUQUANGQUYPHUC, 2)) {
      if (this.hasStar(TuViStar.NGUYETDUC)) {
        res = true
      }
      if (this.hasStar(TuViStar.THAIAM)) {
        res = true
      }
    }
    starArr = [
      TuViStar.TAPHU,
      TuViStar.HUUBAT,
      TuViStar.MO,
      TuViStar.HOAQUYEN,
      TuViStar.THIENKHOI,
      TuViStar.THIENVIET,
      TuViStar.VANXUONG,
      TuViStar.VANKHUC,
      TuViStar.TAUTHU,
    ];
    if (this.hasSupportStars(starArr, 1)) {
      if (this.hasStar(TuViStar.NGUYETDUC)) {
        res = true
      }
      if (this.hasStar(TuViStar.THAIAM)) {
        res = true
      }
    }

    if (this.hasSupportStars(TuViStarHelper.TAHUUXUONGKHUC, 1)) {
      if (this.hasStar(TuViStar.NGUYETDUC)) {
        res = true
      }
      if (this.hasStar(TuViStar.THAIAM)) {
        res = true
      }
    }

    if (this.hasSupportStars(TuViStarHelper.TAHUUXUONGKHUCTHAICAO, 1)) {
      res = true
    }
    starArr = [
      TuViStar.TUONGQUAN,
      TuViStar.QUOCAN,
      TuViStar.LONGDUC,
      TuViStar.PHUONGCAC,
      TuViStar.THIENHINH,
      TuViStar.THIENRIEU,
      TuViStar.HONGLOAN,
      TuViStar.DAOHOA,
    ];
    if (this.hasSupportStars(starArr, 1)) {
      res = true
    }
  }
  if (this.hasStars(TuViStarHelper.TUPHUVUTUONG, 3)) {
    starArr = [
      TuViStar.LONGDUC,
      TuViStar.PHUONGCAC,
      TuViStar.TAPHU,
      TuViStar.HUUBAT,
      TuViStar.THIENHINH,
      TuViStar.THIENRIEU,
    ];
    if (this.hasSupportStars(starArr, 1)) {
      res = true
    }
  }
  if (this.hasStar(TuViStar.THIENCO)) {
    if (this.hasSupportStars(TuViStarHelper.HONGRIEUDAOTHU, 1)) {
      res = true
    }
    if (this.hasSupportStars0(TuViStarHelper.HONGTHU)) {
      res = true
    }
  }
  if (this.hasAllStars(TuViStarHelper.SATPHALIEMTHAM)) {
    if (this.hasSupportStars(TuViStarHelper.HONGDAOTHUDUCCAC, 1)) {
      res = true
    }
    if (
      this.hasStarWithStatusArr(
        TuViStarHelper.TAHUUQUYENLOCNHATNGUYET,
        TuViStar.HAMDIA,
        1
      )
    ) {
      res = true
    }
  }

  if (this.hasStar(TuViStar.THIENTUONG)) {
    if (this.hasSupportStars0(TuViStarHelper.PHUFTABUUTUONGQUOC)) {
      res = true
    }
  }
  return res ;
}


override isAttrPresent( attrKey: string, params: string[]): boolean {
  switch (attrKey) {
    case "ThuongCach":
      return this.checkThuongCach();
    case "TrungCach":
        return this.checkTrungCach();
    default:
        return super.isAttrPresent(attrKey,params)
    }
    return false;
  }


}
