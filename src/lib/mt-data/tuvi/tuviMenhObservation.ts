
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

  // Ref17p61p11_12
   genMenh2ThanInfluence() {
    const note = this.palace.generalNote;
      if (note > TuViPalace.GOODNOTESREFERENCE) {
          if (this.thanPalace.generalNote > TuViPalace.GOODNOTESREFERENCE) {
              this.addSupportBaseComment(8, "Ref17p61p11");
              if (note< this.thanPalace.generalNote) {
                  this.addBaseComment("Ref17p61p14");
              }
          } else {
              this.addSupportBaseComment(5, "Ref17p61p12");
          }
      } else {
          if (this.thanPalace.generalNote > TuViPalace.GOODNOTESREFERENCE) {
              this.addSupportBaseComment(10, "Ref17p61p13");
          }
      }
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

   genRef17p60p11_p13() {
      // Ref17p60p11-p13
      let temp = "";
      let tempNote = 6;
      if (this.palace.getNote() > TuViPalace.GOODNOTESREFERENCE) {
          temp = "GoodMenh.";
          tempNote+=3;
      } else {
          temp = "BadMenh.";
          tempNote-=3;
      }
      if (this.thanPalace.getNote() > TuViPalace.GOODNOTESREFERENCE) {
          temp += "GoodThan";
          tempNote+=1;
      } else {
          temp += "BadThan";
          tempNote-=1;
      }
      this.addSupportBaseComment(tempNote,temp);
  }

   genRef17p61p14() {
      // Ref17p61p14
      if (this.palace.goodActiveChinhTinhCount > 0 &&
              this.palace.goodActiveChinhTinhCount < this.thanPalace.goodActiveChinhTinhCount) {
          this.addSupportBaseComment(7, "Ref17p61p14");
      }
  }


   genRef17p61p15ForThan(than: TuViPalaceObservationBase) {
          if (than.palace.chinhTinhCount===0) {
              // Ref17p61p15a
              if (than.isPartOfTuMo) {
                than.addSupportBaseComment(3, "Ref17p61p15a1");
                  if (than.hasTuanTrietKhong || than.hasFavorableStars()) {
                    than.addSupportBaseComment(7, "Ref17p61p15a2");
                  }
              }
              // Ref17p61p15b
              if (BrancheHelper.isRatHorse(than.palace.branche) ) {
                  if (than.hasHostileStars()) {
                    than.addSupportBaseComment(3, "Ref17p61p15a1");
                      if (than.hasStar(TuViStar.HOALOC)) {
                        than.addSupportBaseComment(6, "Ref17p61p15b1");
                      } else {
                        than.addSupportBaseComment(7, "Ref17p61p15b2");
                      }
                  }
              }
          }
  }


   genRef17p61p16N17() {
      if (this.hasStar(TuViStar.TUANKHONG) && this.thanPalaceObs.hasStar(TuViStar.TRIETKHONG)) {
          if (this.hasSupportStars0(TuViStarHelper.CONGUYETDONGLUONG) ||
                  this.thanPalaceObs.hasSupportStars0(TuViStarHelper.CONGUYETDONGLUONG)) {
              this.addSupportBaseComment(8, "Ref17p61p16");
          }
      } else {
          if (this.hasStar(TuViStar.TRIETKHONG) && this.thanPalaceObs.hasStar(TuViStar.TUANKHONG)) {
              if (this.palace.chinhTinhCount===0) {
                  this.addSupportBaseComment(8, "Ref17p61p17");
              }
          }
      }
  }

   genRef17p61p18() {
      if (this.hasStar(TuViStar.DIAKHONG) && this.thanPalaceObs.hasStar(TuViStar.DIAKIEP)) {
          this.addSupportBaseComment(7, "Ref17p61p18a");
          if (this.palace.chinhTinhCount===0) {
              if (this.hasSupportStars0(TuViStarHelper.DAITIEUHAO)) {
                  this.addSupportBaseComment(8, "Ref17p61p18b");
              }
              if (this.hasAllStars(TuViStarHelper.DONGLUONGPHA) ||
              this.thanPalaceObs.hasAllStars(TuViStarHelper.DONGLUONGPHA)) {
                  this.addSupportBaseComment(3, "Ref17p61p18c");
              }
          }
      }
  }

   genRef17p62p19() {
      if (this.hasStar(TuViStar.DIAKIEP) && this.thanPalaceObs.hasStar(TuViStar.DIAKHONG)) {
          this.addSupportBaseComment(4, "Ref17p62p19a");
          if (this.palace.chinhTinhCount===0) {
              if (this.hasAllStars(TuViStarHelper.HONGDAO) || this.hasSatTinh) {
                  this.addSupportBaseComment(1, "Ref17p62p19b");
              } else {
                  this.addSupportBaseComment(4, "Ref17p62p19c");
              }
          }
          if (this.hasStars(TuViStarHelper.TUNHATNGUYET,1)) {
              this.addSupportBaseComment(6, "Ref17p62p19d");
          }
      }
  }

   genRef17p60p4N5() {
    const yBranche=this.getyBranche();
      if (this.isMan()) {
          if (BrancheHelper.isRatOxHorseGoat(yBranche)) {
              this.addBaseComment("Ref17p60p4");
          }
      } else {
          if (this.isPartOfTuMo) {
              this.addBaseComment("Ref17p60p5a");
          } else {
              if (yBranche===Branche.COCK) {
                  this.addBaseComment("Ref17p60p5b");
              } else {
                  if (yBranche===Branche.RAT || yBranche===Branche.HORSE) {
                      this.addBaseComment("Ref17p60p5c");
                  }
              }
          }

      }
  }

   genRef17p60p9() {
      if ((this.palace.getNote() > TuViPalace.GOODNOTESREFERENCE) &&
              (this.palace.baiTinhCount + this.palace.satTinhCount > TuViPalace.AVAILSTARNBCOUNT)) {
          this.addBaseComment("Ref17p60p9");
      }
  }



   genRef17p60p10() {
      if (this.palace.chinhTinhCount==0) {
          this.addBaseComment("Ref17p60p10a");
          if ((!this.hasTuanTrietKhong) &&
                  (!this.hasSupportStars2(
                          TuViStar.THIENKHONG,
                          TuViStar.DIAKHONG))) {
              if (!this.isGoodStarsFavorable) {
                  this.addBaseComment("Ref17p60p10b");
              }
          }


      }
  }

   genRef17p63p5() {
      if (this.hasManyGoodStars) {
          this.addSupportBaseComment(8, "Ref17p63p5");
      }

  }

   genRef17p63p6() {
      if (this.hasTuanTrietKhong) {
          this.addSupportBaseComment(3, "Ref17p63p6");
      }
  }

   genRef17p63p7() {
//		if ( this.palace.getGoodBadChinhTinhBalanceForce()<0 && (this.hasSupportStars0(TuViStar.KHONGKIEP)))  {
      if (this.hasHostileStars() && (this.hasSupportStars(TuViStarHelper.KHONGKIEP, 1))) {
          this.addSupportBaseComment(3, "Ref17p63p7");
      }
  }

   genRef17p63p8() {
      if (BrancheHelper.isRabbitCock(this.palace.branche)) {
          if (this.hasStars([TuViStar.TU, TuViStar.THAMLANG],2)) {
              this.addSupportBaseComment(3, "Ref17p63p8");
          }
      }
  }

   genRef17p63p9_11( status: number) {
      if (this.isMan()) {
          if (status >= TuViStar.BINHDIA) {
              if (this.hasManyGoodStars) {
                  this.addSupportBaseComment(9, "Ref17p63p9");
              }
              if (this.hasManyGoodSupportStars())
                  this.addSupportBaseComment(8, "Ref17p63p10");
          }
          if (this.hasTuanTrietKhong) {
              this.addSupportBaseComment(6, "Ref17p63p11");
          }
          // Skip 12?
          if (this.hasStar(TuViStar.THAMLANG)) {
              this.addSupportBaseComment(3, "Ref17p63p13");
          }
      }
  }

   genRef17p64p1_3() {
      if (!this.isMan()) {
          if (this.hasManyGoodStars) {
              this.addSupportBaseComment(8, "Ref17p64p1");
          }
          if (this.hasTuanTrietKhong) {
              this.addSupportBaseComment(3, "Ref17p64p2");
          }
          if (this.hasHostileStars()) {
              this.addSupportBaseComment(4, "Ref17p64p3");
          }
      }
  }

   genRef17p64p6() {
      if (this.palace.branche===Branche.HORSE) {
          if (!this.hasAllStars(TuViStarHelper.KINHDA)) {
              if (TrunkHelper.isJiaDingJi(this.getyTrunk())) {
                  this.addSupportBaseComment(9, "Ref17p64p6a");
              } else {
                  this.addSupportBaseComment(8, "Ref17p64p6b");
              }
          }
      }
  }

   genRef17p64p7() {
      if (this.isMan()) {
          if (this.palace.branche===Branche.PIG) {
              if (TrunkHelper.isRenJia(this.getyTrunk())) {
                  this.addSupportBaseComment(9, "Ref17p64p7a");
              } else {
                  this.addSupportBaseComment(7, "Ref17p64p7c");
              }
          }
      } else {
          if (this.palace.branche===Branche.TIGER) {
            if (TrunkHelper.isRenJia(this.getyTrunk())) {
                  this.addSupportBaseComment(8, "Ref17p64p7b");
              } else {
                  this.addSupportBaseComment(7, "Ref17p64p7c");
              }
          }
      }
  }

   genRef17p64p8() {
      if (this.palace.branche===Branche.TIGER && this.thanPalaceObs.hasAllStars(TuViStarHelper.TUPHUR)) {
          if (this.getyTrunk()===Trunk.JIA) {
              this.addSupportBaseComment(9, "Ref17p64p8a");
          } else {
              this.addSupportBaseComment(8, "Ref17p64p8b");
          }
      }
  }

   genRef17p65p1() {
      if (this.hasSupportStars0(TuViStarHelper.TAHUU)) {
          this.addSupportBaseComment(8, "Ref17p65p1");
      }
  }

   genRef17p65p4() {
      if (this.hasSupportStars(TuViStarHelper.TUPHURKHOAQUYENHINHANHONGKHOI, 8)) {
          if (this.thanPalaceObs.hasSupportStars(TuViStarHelper.TUPHURKHOAQUYENHINHANHONGKHOI, 8)) {
              this.addSupportBaseComment(10, "Ref17p65p4");
          }
      }
  }

   genRef17p65Other() {
      this.genRef17p65p1();
      if (this.hasStar(TuViStar.KINHDUONG)) {
          this.addSupportBaseComment(8, "Ref17p65p2");
      }
      if (this.hasSupportStars0(TuViStarHelper.TUPHUVUTUONGTAHUULONGPHUONGKHOAQUYENLOCAN)) {
          this.addSupportBaseComment(10, "Ref17p65p3a");
          if (this.hasSupportStars0(TuViStarHelper.KIEPKINH)) {
              this.addSupportBaseComment(5, "Ref17p65p3b");
          }
      }
      const branche = this.palace.branche;
      if (this.palace.branche===Branche.TIGER && this.hasStar(TuViStar.THIENPHUR) &&
              this.hasSupportStars0(TuViStarHelper.KYQUYEN)) {
          this.addSupportBaseComment(9, "Ref17p65p5");
      }
      if ((this.hasStar(TuViStar.THIENTUONG))) {
          if (this.thanPalaceObs.hasStar(TuViStar.PHAQUAN))
              if (this.thanPalaceObs.hasSupportStars(TuViStarHelper.KINHVUONG, 2)) {
                  this.addSupportBaseComment(6, "Ref17p65p6");
              }
      }
      if ((this.palace.branche===Branche.SNAKE || branche===Branche.PIG) && this.hasStar(TuViStar.THATSAT)) {
          if (this.hasTuanTrietKhong) {
              this.addSupportBaseComment(4, "Ref17p65p8");
          } else {
              this.addSupportBaseComment(8, "Ref17p65p7");
              if (this.hasStar(TuViStar.HOAQUYEN)) {
                  this.addSupportBaseComment(9, "Ref17p65p9");
              }
          }
      }
  }

   genRef17p66p1( status: number) {
      if (status===TuViStar.MIEUDIA || status===TuViStar.DACDIA) {
          this.addSupportBaseComment(7, "Ref17p66p1");
      }
  }

   genRef17p66p2() {
      if (this.hasSupportStars0(TuViStarHelper.KINHDA)) {
          this.addSupportBaseComment(7, "Ref17p66p2");
      }
  }

   genRef17p66p4() {
      if (this.isPartOfTuMo) {
          this.addSupportBaseComment(3, "Ref17p66p4");
      }
  }

   genRef17p66p5() {
      if (BrancheHelper.isOxDragonGoatDog(this.palace.branche)) {
          if (this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(9, "Ref17p66p5");
          }
      }
  }


   genRef17p66( status: number) {
    this.genRef17p66p1(status);
    this.genRef17p66p2();
    this.genRef17p66p4();
    this.genRef17p66p5();
    const branche = this.palace.branche;
      if (this.palace.branche===Branche.OX) {
          if (this.hasStar(TuViStar.PHAQUAN)) {
              if (!this.hasSupportStars(TuViStarHelper.TAHUU, 1)) {
                  if (this.hasHostileStars()) {
                      this.addSupportBaseComment(3, "Ref17p66p6");
                  }
              }
          }

      }
      if (BrancheHelper.isRabbitCock(this.palace.branche)) {
          if (this.hasSupportStars0(TuViStarHelper.KHONGKIEP)) {
              this.addBaseComment("Ref17p66p7");
          }
      }
//	NOT FOUND	if ( (hasKiepStar())
//				&& this.hasStar(TuViStar.DAKHONGKIEP,3)) {
//				this.addSupportBaseComment("Ref17p66p8");
//		}
      if (this.hasAllStars(TuViStarHelper.DAKHONGKIEP)) {
          this.addSupportBaseComment(3, "Ref17p66p8");
      }
      if (this.hasSupportStars0(TuViStarHelper.XUONGKHUC)) {
          this.addSupportBaseComment(8, "Ref17p66p9");
      }
  }

   genRef17p67() {
      if (this.hasAllStars(TuViStarHelper.TAHUU)) {
          this.addSupportBaseComment(8, "Ref17p67p1");
      }
      if (this.hasSupportStars0(TuViStarHelper.KHOAQUYENLOC)) {
          if (this.hasSupportStars0(TuViStarHelper.KINHDAKHONGKIEP)) {
              this.addSupportBaseComment(3, "Ref17p67p2b");
          } else {
              this.addSupportBaseComment(7, "Ref17p67p2a");
          }
      }
      if (BrancheHelper.isRatHorse(this.palace.branche)) {
// NOT FOUND			if ( this.hasSupportStars0(TuViStar.KHOAQUYENLOC,3)) {
          if (this.hasSupportStars(TuViStarHelper.KHOAQUYENLOC, 2)) {
              this.addSupportBaseComment(8, "Ref17p67p3");
          }
      }
      if (this.hasSupportStars0(TuViStarHelper.LOCQUYEN)) {
          if (this.hasSupportStars0(TuViStarHelper.KINHDA)) {
              this.addSupportBaseComment(4, "Ref17p67p4");
          } else {
              this.addSupportBaseComment(7, "Ref17p67p4");
          }
      }
      if (this.hasStar(TuViStar.HOALOC)) {
          if (this.hasSupportStars0(TuViStarHelper.TAHUU)) {
              this.addSupportBaseComment(9, "Ref17p67p5");
          }
      }
  }


   genTuviStar() {
      if (this.hasStar(TuViStar.TUVI)) {
          const status = TuViStar.TUVI.diaStatus;

          this.addBaseComment("TuVi.DiaStatus." + status);
          this.genRef17p64p6();
          this.genRef17p64p8();
          //
          this.genRef17p63p5();
          this.genRef17p63p6();
          this.genRef17p63p7();
          this.genRef17p63p8();
          this.genRef17p63p9_11(status);
          this.genRef17p64p1_3();
          this.genRef17p64p7();
          this.genRef17p65Other();
          this.genRef17p66(status);
          this.genRef17p67();
          this.genRef17p108p7(TuViStar.THATSAT);
      }
  }

   genRef17p67p8_p68p1_2( status: number) {

      if (status >= TuViStar.DACDIA) {

          if (this.hasFavorableStars()) {
              if (this.hasSupportStars0(TuViStarHelper.TUPHURXUONGKHUCTAHUUKHOAQUYENLOC)) {
                  this.addSupportBaseComment(9, "Ref17p67p8b");
              } else {
                  this.addSupportBaseComment(7, "Ref17p67p8a");
              }
          } else {
              if (this.hasManyBadStars ||
                this.hasAllStars([TuViStar.HOAKY, TuViStar.THIENHINH])) {
                  this.addBaseComment("Ref17p68p2");
              } else {
                  this.addBaseComment("Ref17p67p8a");
              }
          }
          if (status===TuViStar.DACDIA && this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
              this.addSupportBaseComment(6, "Ref17p68p1");
          }
      }
  }

   genRef17p68p3_10( status: number) {
      if (status===TuViStar.HAMDIA) {
          if (this.hasHostileStars() || this.hasAllStars(TuViStarHelper.KYHINH)) {
              this.addSupportBaseComment(2, "Ref17p68p3");
          }
          if (BrancheHelper.isSnakePig(this.palace.branche)) {
              if (this.hasStar(TuViStar.HOAKY)) {
                  // Use Ref17p68p3b to decrease hostility effect/influence
                  this.addSupportBaseComment(8, "Ref17p68p3b");
              }
              if (this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
                  if (this.getyTrunk()===Trunk.BING) {
                      this.incPoints(3);
                  } else {
                      this.incPoints(4);
                  }
              }
          } else {
              if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                  if (this.hasSupportStars(TuViStarHelper.HOALINH, 2)) {
                      this.addSupportBaseComment(3, "Ref17p68p5");
                  }
              }
          }
          if (!this.isMan()) {
              //NOT FOUND					if ( hasManyBadStars ) {
//				if ( hasHostileStars() ) {
              this.addSupportBaseComment(5, "Ref17p68p10a");
              if (this.hasCombinedSatTinh) {
                  this.addSupportBaseComment(4, "Ref17p68p10b");
              }
          }
      } else {
          if (this.isMan()) {
              if (status===TuViStar.DACDIA && this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
                  this.addSupportBaseComment(9, "Ref17p68p7");
              }
          } else {
              this.addSupportBaseComment(7, "Ref17p68p9");
              if (this.hasFavorableStars()) {
                  this.incPoints(9);
              }
          }
      }
  }

   genRef17p69p4( status: number) {
      if (status===TuViStar.HAMDIA && (
              this.hasStar(TuViStar.HOATINH) || this.hasStar(TuViStar.PHAQUAN) && this.hasStar(TuViStar.COTHAN))) {
          this.addSupportBaseComment(2, "Ref17p69p4");
      }
  }

   genRef17p69(status: number) {
      if (BrancheHelper.isGoatMonkey(this.palace.branche)) {
          if (this.hasManyGoodStars && !this.hasSatTinh) {
              this.addSupportBaseComment(9, "Ref17p69p3");
          }
      }
      this.genRef17p69p4(status);
      if (this.hasStar(TuViStar.VANKHUC)) {
          this.addSupportBaseComment(5, "Ref17p69p5");
      }
      if (BrancheHelper.isRabbitCock(this.palace.branche)) {
          if (this.hasSatTinh) {
              this.addSupportBaseComment(5, "Ref17p69p6");
          }
          if (this.hasSupportStars0(TuViStarHelper.KIEPHINH)) {
              this.addSupportBaseComment(5, "Ref17p69p7");
          }
      }
      if (BrancheHelper.isRatPig(this.palace.branche)) {
          if (this.hasSatTinh) {
              this.addSupportBaseComment(4, "Ref17p69p8");
          }
      }
      if (this.hasSupportStars(TuViStarHelper.KINHDAHOALINH, 4)) {
          this.addSupportBaseComment(3, "Ref17p69p9");
          if (status===TuViStar.HAMDIA) {
              this.addSupportBaseComment(3, "Ref17p70p1");
          }
      }
  }

   genRef17p70p2_3() {
      if (this.hasStar(TuViStar.BACHHO) || this.hasOppositePalaceStar(TuViStar.BACHHO)) {
          this.addSupportBaseComment(3, "Ref17p70p2");
      }
      if (this.hasStar(TuViStar.TUONGQUAN) || this.hasOppositePalaceStar(TuViStar.TUONGQUAN)) {
          this.addSupportBaseComment(7, "Ref17p70p3");
      }
  }


   genLiemTrinhStar() {
      if (this.hasStar(TuViStar.LIEMTRINH)) {
          const status = TuViStar.LIEMTRINH.diaStatus;
          this.addBaseComment("LiemTrinh.DiaStatus." + status);
          this.genRef17p67p8_p68p1_2(status);
          this.genRef17p68p3_10(status);
          this.genRef17p69(status);
          this.genRef17p70p2_3();
      }
  }


   genRef17p70p4_9(status: number) {
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(7, "Ref17p70p4");
          if (status===TuViStar.DACDIA && BrancheHelper.isSnakePig(this.palace.branche)) {
              this.addSupportBaseComment(5, "Ref17p70p5");
              if (TrunkHelper.isDingGeng(this.getyTrunk())) {
                  this.addSupportBaseComment(4, "Ref17p70p6");
              }
          }

          if (this.hasManyGoodStars && this.hasSupportStars0(TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC)) {
              this.addSupportBaseComment(9, "Ref17p70p7");
          } else {
              this.addSupportBaseComment(6, "Ref17p70p8");
              if (this.hasCombinedSatTinh) {
                  this.addSupportBaseComment(4, "Ref17p70p8");
              }
          }
      } else {
          this.addSupportBaseComment(4, "Ref17p70p9");
      }
  }

   genRef17p71(status: number) {
      if (status===TuViStar.HAMDIA) {
          if (BrancheHelper.isOxDragonGoatDog(this.palace.branche)) {
              this.addSupportBaseComment(4, "Ref17p71p1");
          }
          if (this.palace.branche===Branche.HORSE) {
              this.addBaseComment("Ref17p71p2");
          }
          if (BrancheHelper.isHorseDog(this.palace.branche)) {
              if (this.getyTrunk()===Trunk.DING) {
                  this.addSupportBaseComment(7, "Ref17p71p3");
              }
          }

          if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC)) {
              this.addSupportBaseComment(8, "Ref17p71p4");
          } else {
              if (this.hasCombinedSatTinh ||this.hasSupportStars0(TuViStarHelper.KYHINH)) {
                  this.addSupportBaseComment(2, "Ref17p71p5");
              }
          }
          if (!this.isMan()) {
              this.addSupportBaseComment(5, "Ref17p71p12a");
              if (this.hasCombinedSatTinh) {
                  this.incPoints(3);
              }
              if (BrancheHelper.isSnakePig(this.palace.branche)) {
                  this.addSupportBaseComment(6, "Ref17p71p11");
              }
          }
      } else {
          if (!this.isMan()) {
              this.addSupportBaseComment(7, "Ref17p71p8");
              this.addSupportBaseComment(7, "Ref17p71p10");
              if (this.hasHostileStars()) {
                  this.incPoints(9);
              }
              if (BrancheHelper.isSnakePig(this.palace.branche)) {
                  if (status===TuViStar.DACDIA) {
                      this.addSupportBaseComment(4, "Ref17p71p9");
                      this.addSupportBaseComment(6, "Ref17p71p11");
                  }
              }
          }
      }

  }

   genRef17p72() {
      this.addSupportBaseComment(5, "Ref17p72p1");
      if (this.hasManyGoodStars) {
          this.addSupportBaseComment(7, "Ref17p72p2");
      }
      if (this.palace.branche===Branche.DOG) {
          if (this.getyTrunk()===Trunk.DING) {
              this.addSupportBaseComment(9, "Ref17p72p3");
          } else {
              this.incPoints(4);
          }
      }
      if ((BrancheHelper.isTigerMonkey(this.palace.branche)) && this.hasStar(TuViStar.THIENLUONG)) {
          this.addSupportBaseComment(9, "Ref17p72p4");
      }
      if (this.hasStar(TuViStar.THIENLUONG)) {
          if ( this.hasSupportStars0(TuViStarHelper.KHOIQUYEN) &&
          this.hasSupportStars0(TuViStarHelper.LINHKY) &&
          this.hasSupportStars0(TuViStarHelper.LOCTONHOALOC)) {
              this.addSupportBaseComment(7, "Ref17p72p5");
          }
      }
      if (this.hasStar(TuViStar.NGUYETDUC)) {
          if (this.palace.branche===Branche.HORSE) {
              if ( this.hasCombinedSatTinh) {
                  this.addSupportBaseComment(7, "Ref17p72p6");
              } else {
                  this.addSupportBaseComment(7, "Ref17p72p7");
              }
          }
          if (this.palace.branche===Branche.RAT) {
              this.addSupportBaseComment(8, "Ref17p72p8");
              if (! this.isMan()) {
                  //NOT FOUND				if ( this.hasSupportStars0(TuViStar.HOKHOCRIEUTANG,2)) {
                  if ( this.hasSupportStars(TuViStarHelper.HOKHOCRIEUTANG, 1)) {
                      this.addSupportBaseComment(3, "Ref17p72p8");
                  }
              }

          }
      }
  }

   genThienDongStar() {
      if (this.hasStar(TuViStar.THIENDONG)) {
          const status = TuViStar.THIENDONG.diaStatus;
          this.genRef17p70p4_9(status);
          this.genRef17p71(status);
          this.genRef17p72();

          this.genRef17p106p3_5(status, TuViStar.THIENLUONG);
      }
  }

   genRef17p73(status: number) {
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(7, "Ref17p73p3");

          if ( this.hasManyGoodStars &&
            this.hasSupportStars0(TuViStarHelper.TUPHURTHAMKHOIVIETXUONGKHUCTAHUUKHOAQUYENLOC)) {
              this.incPoints(9);
          }

          if (status===TuViStar.MIEUDIA && BrancheHelper.isOxGoat(this.palace.branche)) {
              this.addSupportBaseComment(7, "Ref17p73p4");
          }
          if (status===TuViStar.DACDIA) {
              if (this.palace.branche===Branche.RABBIT) {
                  this.addSupportBaseComment(3, "Ref17p73p5");
              }
              if (this.palace.branche===Branche.COCK) {
                  this.addBaseComment("Ref17p73p6");
              }
          }
      }
  }

   genRef17p74(status: number) {
      if (status >= TuViStar.DACDIA) {
          if (this.hasCombinedSatTinh) {
              this.addSupportBaseComment(6, "Ref17p74p1");
          }
          if (this.isMan() && this.hasManyGoodStars) {
              this.addSupportBaseComment(9, "Ref17p74p5");
              this.addBaseComment("Ref17p74p6");
          }
          if (this.hasAllStars(TuViStarHelper.XUONGKHUC)) {
              this.addSupportBaseComment(7, "Ref17p74p7");
          }
          if (!this.isMan()) {
              this.addSupportBaseComment(8, "Ref17p74p8");
              if (this.hasFavorableStars()) {
                  this.incPoints(9);
              }
          }
      } else {
          this.addSupportBaseComment(3, "Ref17p74p2");
          if (this.hasFavorableStars() || this.hasStars(TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC, 6)) {
              this.addSupportBaseComment(6, "Ref17p74p3");
          } else {
              if (this.hasHostileStars() || this.hasStars(TuViStarHelper.SATHINHKY,1)) {
                  this.addSupportBaseComment(2, "Ref17p74p4");
              }
          }
          if (!this.isMan()) {
              this.addSupportBaseComment(3, "Ref17p74p9");
              if (this.hasHostileStars()) {
                  this.incPoints(3);
              }
          }
      }
  }

   genRef17p75(status: number) {
      this.addBaseComment("Ref17p75p1");
      if (this.hasFavorableStars()) {
          this.addSupportBaseComment(9, "Ref17p75p2");
      }
      if (status===TuViStar.HAMDIA) {
          this.addBaseComment("Ref17p75p3");
      }
      if (this.hasStar(TuViStar.PHAQUAN)) {
          if (BrancheHelper.isSnakePig(this.palace.branche)) {
              this.addSupportBaseComment(4, "Ref17p75p4_5");
          }
          this.addSupportBaseComment(4, "Ref17p75p6");
          if (this.hasStars(TuViStarHelper.XUONGKHUC,1)) {
              this.addSupportBaseComment(7, "Ref17p75p7");
          }
      }
      if (this.palace.branche===Branche.PIG) {
          if (TrunkHelper.isJiaDingRen(this.getyTrunk()) && this.hasStar(TuViStar.HOATINH)) {
              this.addSupportBaseComment(8, "Ref17p75p8");
          } else {
              if (this.hasStar(TuViStar.PHAQUAN) &&
                      (this.hasSupportStarWithTransform(TuViStar.THAIAM) ||
                      this.hasSupportStarWithTransform(TuViStar.NGUYETDUC))
                      && this.hasSupportStars0([TuViStar.THAMLANG])) {
                  this.addSupportBaseComment(3, "Ref17p75p8");
              }
          }
      }
  }

   genRef17p76(status: number) {
      if (BrancheHelper.isOxGoat(this.palace.branche)) {
          if (this.hasStar(TuViStar.THAMLANG)) {
              if ((this.hasKiepStar()) && this.hasCombinedSatTinh) {
                  this.addSupportBaseComment(3, "Ref17p76p1");
              } else {
                  this.addSupportBaseComment(8, "Ref17p76p1");
              }
          }
      }
      if (this.palace.branche===Branche.RABBIT) {
          if (this.hasStar(TuViStar.THATSAT) ||
          this.hasAllStars(TuViStarHelper.LIEMPHA)) {
              this.addSupportBaseComment(3, "Ref17p76p2");
          }

      }
      if (status >= TuViStar.DACDIA) {
          if (this.hasStar(TuViStar.VANKHUC)) {
              this.addSupportBaseComment(8, "Ref17p76p4");
          }
          if (status >= TuViStar.VUONGDIA && (this.hasStars(TuViStarHelper.KHOIVIET,1))) {
              this.addSupportBaseComment(8, "Ref17p76p5");
          }
          if (this.hasSupportStars([TuViStar.LOCTON, TuViStar.THIENMA],1)) {
              this.addSupportBaseComment(8, "Ref17p76p6a");
          }
          if (this.hasStar(TuViStar.LOCTON) && (
                  this.hasStar(TuViStar.THIENMA) ||
                  this.hasOppositePalaceStar(TuViStar.THIENMA))) {
              this.addSupportBaseComment(8, "Ref17p76p6b");
          }
          if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
              if (this.hasSupportStars(TuViStarHelper.LOCQUYEN, 2)) {
                  this.addSupportBaseComment(8, "Ref17p76p7");
              }
          }
      } else {
          if (this.hasSupportStars0(TuViStarHelper.KINHDAQUA)) {
              this.addSupportBaseComment(3, "Ref17p76p3");
          }
          if (this.hasStar(TuViStar.KIEPSAT) && this.hasOppositePalaceStar(TuViStar.KINHDUONG)) {
              this.addSupportBaseComment(2, "Ref17p76p8");
          }
      }

  }

   genVuKhucStar() {
      if (this.hasStar(TuViStar.VUKHUC)) {
          const status = TuViStar.VUKHUC.diaStatus;
          this.genRef17p66p1(status);
          this.genRef17p66p2();
          this.genRef17p73(status);
          this.genRef17p74(status);
          this.genRef17p75(status);
          this.genRef17p76(status);
          this.genRef17p90p4(status);
      }
  }

   genRef17p77_78(status: number) {
      if (this.isBornInDay()) {
          this.incPoints(7);
      } else {
          this.incPoints(4);
      }
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(8, "Ref17p77p1");
          if (this.hasFavorableStars() && this.hasSupportStars0(TuViStarHelper.XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHY)) {
              this.addSupportBaseComment(9, "Ref17p77p4");
          }
          if (this.hasTuanTrietKhong) {
              if (status >= TuViStar.VUONGDIA) {
                  this.addSupportBaseComment(3, "Ref17p77p5");
              } else {
                  // Dac Dia case
                  this.addSupportBaseComment(7, "Ref17p77p6");
              }
          } else {
              if (status===TuViStar.DACDIA) {
                  this.addSupportBaseComment(6, "Ref17p77p7");
              }
          }
          if (this.hasSupportStars0(TuViStarHelper.KHONGKIEPDAKINHKYRIEUHINH)) {
              this.addSupportBaseComment(3, "Ref17p77p8");
          }
          if (status===TuViStar.DACDIA) {
              if (this.hasStar(TuViStar.HOAKY)) {
                  // no of those star excep HOAKY
                  if (this.hasSupportStars0(TuViStarHelper.KHONGKIEPDAKINHKYRIEUHINH)) {
                      this.addSupportBaseComment(9, "Ref17p77p9");
                  }
              }
          }
      } else {
          if (status===TuViStar.HAMDIA) {
              this.addBaseComment("Ref17p77p10");
              if (BrancheHelper.isRatPig(this.palace.branche)) {
                  this.addSupportBaseComment(8, "Ref17p78p1");
              }
              if (BrancheHelper.isMonkeyDogRat(this.palace.branche)) {
                  this.addSupportBaseComment(6, "Ref17p78p2");
              }
              if (this.hasFavorableStars()) {
                  if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHYHOA)) {
                      this.addSupportBaseComment(8, "Ref17p78p3");
                  }
              }
              if (this.hasTuanTrietKhong) {
                  this.addSupportBaseComment(7, "Ref17p78p4");
              }
              if (this.hasHostileStars()) {
                  if (this.hasSupportStars(TuViStarHelper.KHONGKIEPDAKINHKYRIEUHINH, 4)) {
                      this.addSupportBaseComment(2, "Ref17p78p5");
                  }
              }
          }
          if (this.hasStar(TuViStar.THIENHINH)) {
              this.addSupportBaseComment(3, "Ref17p78p6");
          }
      }
      if (this.isMan()) {
          if (status >= TuViStar.DACDIA) {
              if (this.hasFavorableStars()) {
                  this.addSupportBaseComment(9, "Ref17p78p7");
              }
          } else {
              if (status===TuViStar.HAMDIA) {
//NOT FOUND					if ( hasManyBadStars ) {
//					if ( hasHostileStars() ) {
                  if (this.hasCombinedSatTinh) {
                      this.addSupportBaseComment(2, "Ref17p78p8");
                  }
              }
          }
      } else {
          if (status >= TuViStar.DACDIA) {
              this.addSupportBaseComment(9, "Ref17p78p9");
          } else {
              if (status===TuViStar.HAMDIA) {
                  this.addBaseComment("Ref17p78p10");
//NOT FOUND						if ( hasManyBadStars ) {
//					if ( hasHostileStars() ) {
                  if (this.hasCombinedSatTinh) {
                      this.addSupportBaseComment(2, "Ref17p78p12");
                  }
              }
          }
      }
  }

   genRef17p79(status: number) {
      switch (this.palace.branche) {
          case Branche.RABBIT:
              this.addSupportBaseComment(8, "Ref17p79p1");
              break;
          case Branche.HORSE:
              if (TrunkHelper.isGengXinJi(this.getyTrunk())) {
                  this.addSupportBaseComment(9, "Ref17p79p2a");
              } else {
                  this.addSupportBaseComment(7, "Ref17p79p2b");
              }
              break;
          case Branche.RAT:
              if (TrunkHelper.isBinhDing(this.getyTrunk())) {
                  this.addSupportBaseComment(7, "Ref17p79p3a");
              } else {
                  this.addSupportBaseComment(6, "Ref17p79p3b");
              }
              break;
          case Branche.MONKEY:
              this.addSupportBaseComment(4, "Ref17p79p4");
              break;
          default:
      }
      if (!this.isMan()) {
          if (status >= TuViStar.DACDIA) {
              this.addSupportBaseComment(8, "Ref17p79p5");
          }
      }
  }

   genRef17p80p1_7() {
      let count = 0;
      let points = 6;
      if ( this.hasOppositePalaceStar(TuViStar.THAIDUONG) ||
      this.hasRelationPalaceStar(TuViStar.THAIDUONG, BrancheRelation.COMBINATION)) {
          count++;
      }
      if ( this.hasOppositePalaceStar(TuViStar.THAIAM) ||
      this.hasRelationPalaceStar(TuViStar.THAIAM, BrancheRelation.COMBINATION)) {
          count++;
      }
      if (this.hasStar(TuViStar.THAIDUONG) || this.hasStar(TuViStar.THAIAM)) count++;
      if (count >= 2) {
          points = 9;
      }
      this.addSupportBaseComment(points, "Ref17p80p1");
  }

   genRef17p80p8() {
      if (this.hasStar(TuViStar.THAIAM)) {
          if ( this.hasManyBadStars) {
              this.addBaseComment("Ref17p80p8");
          }
      }
  }

   genRef17p81(status: number) {

      if (this.hasStar(TuViStar.THAIAM)) {
          if (BrancheHelper.isOxGoat(this.palace.branche)) {
              if (this.hasSatTinh && status != TuViStar.HAMDIA) {
                  if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCQUYQUANGTHAITOAKHOIHONG)) {
                      this.addSupportBaseComment(8, "Ref17p81p1");
                  }
              }
              if (this.hasManyGoodStars) {
                  if (this.hasStar(TuViStar.TUANKHONG) &&
                  this.hasSupportStars(TuViStarHelper.XUONGKHUCQUANGQUY, 4)) {
                      this.addSupportBaseComment(9, "Ref17p81p2");
                  }
              }
          }
          if (this.hasSupportStars0(TuViStarHelper.KHOALOC)) {
              this.addSupportBaseComment(8, "Ref17p81p3");
          }
      }
  }

   genRef17p81p4_5( oppositeStar:TuViStar) {
      if (this.palace.branche===Branche.DRAGON) {
          if (this.hasOppositePalaceStar(oppositeStar)) {
              this.addSupportBaseComment(8, "Ref17p81p4");
              if (this.hasSupportStars0(TuViStarHelper.XUONGTUELOCQUYENPHUCCAOTAHUU)) {
                  this.addSupportBaseComment(8, "Ref17p81p6");
              }
          }
      }
      if (this.palace.branche===Branche.DOG) {
          if (this.hasOppositePalaceStar(oppositeStar)) {
              if (this.hasTuanTrietKhong || this.hasStar(TuViStar.THIENKHONG)) {
                  this.addSupportBaseComment(8, "Ref17p81p5");
              } else {
                  this.incPoints(3);
              }
          }
      }
  }

   genRef17p82p1_2(status: number) {
      if (status===TuViStar.HAMDIA) {
          if (this.hasCombinedSatTinh) {
              this.addSupportBaseComment(3, "Ref17p82p1");
          }
          if (this.hasSupportStars0(TuViStarHelper.RIEUKYDAKYKIEPHINH)) {
              this.addSupportBaseComment(2, "Ref17p82p2");
          }
      }
  }

   genRef17p82p3() {
      if (BrancheHelper.isOxGoat(this.palace.branche)) {
          if (this.hasPrevNextStar(TuViStar.THAIDUONG) && this.hasPrevNextStar(TuViStar.THAIAM)) {
              this.addSupportBaseComment(8, "Ref17p82p3");
          }
      }
  }

   genRef17p82p4() {
      if (this.hasOppositePalaceStar(TuViStar.CUMON)) {
          if (this.palace.branche===Branche.PIG) {
              this.addBaseComment("Ref17p82p4");
          }
      }
  }

   genRef17p82p6() {
      if (this.palace.branche===Branche.SNAKE) {
          this.incPoints(8);
          if (this.hasSupportStars0(TuViStarHelper.LOCMASINHTAHUU)) {
              this.addBaseComment("Ref17p82p5a");
          }
          if (this.hasSupportStars0(TuViStarHelper.TUONGQUANGHINHBINH)) {
              this.addBaseComment("Ref17p82p5b");
          }
      }
  }

   genRef17p82p7() {
      if (this.palace.branche===Branche.PIG) {
          if (this.hasSupportStars0(TuViStarHelper.KHOAQUYENLOCTAHUUKHOIHONG)) {
              this.addSupportBaseComment(7, "Ref17p82p6a");
          }
          if (this.hasSupportStars0(TuViStarHelper.PHUONGLONGCAIHO)) {
              this.addSupportBaseComment(8, "Ref17p82p6b");
          }
      }
  }

   genRef17p83p1_2( status: number) {
      if (status===TuViStar.HAMDIA) {
          if (this.hasCombinedSatTinh) {
              this.addSupportBaseComment(4, "Ref17p83p1");
          }
      }
      if (this.hasStar(TuViStar.HOAKY)) {
          this.addSupportBaseComment(4, "Ref17p83p2");
      }
  }

   genThaiDuongStar() {
      if (this.hasStar(TuViStar.THAIDUONG)) {
          const status = TuViStar.THAIDUONG.diaStatus;
          this.genRef17p77_78(status);
          this.genRef17p79(status);
          this.genRef17p80p8();
          this.genRef17p81(status);
          this.genRef17p81p4_5(TuViStar.THAIAM);
          this.genRef17p82p1_2(status);
          this.genRef17p82p4();

          this.genRef17p82p6();
          this.genRef17p82p7();
          this.genRef17p83p1_2(status);
      }
      this.genRef17p80p1_7();
  }

   genRef17p83p3_10( status: number) {
      if (status >= TuViStar.DACDIA) {
          if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCHAO)) {
              this.addSupportBaseComment(9, "Ref17p83p3");
          }
          if (this.hasSupportStars0(TuViStarHelper.TAHUULOCHINHYQUANGQUY)) {
              this.addSupportBaseComment(6, "Ref17p83p4");
          }
          if (this.hasSupportStars0(TuViStarHelper.TAHUULINHHINH)) {
              this.addSupportBaseComment(6, "Ref17p83p5");
          }
          if (status===TuViStar.MIEUDIA) {
              if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                  if (this.hasSupportStars0(TuViStarHelper.DAITIEUHAO)) {
                      this.addSupportBaseComment(9, "Ref17p83p6");
                  }
              }
          }
          if (status===TuViStar.DACDIA) {
              if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCVAN)) {
                  this.addSupportBaseComment(8, "Ref17p83p7a");
                  if (TrunkHelper.isBinhDingYi(this.getyTrunk())) {
                      this.addSupportBaseComment(9, "Ref17p83p7b");
                  }
              }
          }
          if (this.hasTuanTrietKhong) {
              this.addSupportBaseComment(3, "Ref17p83p8");
          }
      } else {
          if (status===TuViStar.HAMDIA) {
              if (this.hasTuanTrietKhong) {
                  this.addSupportBaseComment(3, "Ref17p83p9");
              }
              if (this.hasHostileStars() && this.hasAllStars(TuViStarHelper.KYHINH)) {
                  this.addSupportBaseComment(2, "Ref17p83p10");
              }
          }
      }
  }

   genRef17p84(status: number) {
      if (this.isMan()) {
          if (status >= TuViStar.DACDIA) {
              if (this.hasManyGoodStars) {
                  this.addSupportBaseComment(9, "Ref17p84p1");
              }
              if (BrancheHelper.isDragonDog(this.palace.branche)) {
                  this.addSupportBaseComment(6, "Ref17p84p2");
              }
               if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                  if (this.hasSupportStars0(TuViStarHelper.DAITIEUHAO)) {
                      this.addSupportBaseComment(7, "Ref17p84p3");
                  }
              }
          } else {
              if (this.hasHostileStars()) {
                  this.addSupportBaseComment(2, "Ref17p84p4");
              }
          }
      } else {
          if (status >= TuViStar.DACDIA) {
              this.addSupportBaseComment(8, "Ref17p84p5a");
              if (this.hasManyGoodStars) {
                  this.addSupportBaseComment(9, "Ref17p84p5b");
              }
              if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                  this.addBaseComment("Ref17p84p6");
              }
          } else {
              if (status===TuViStar.HAMDIA) {
                  this.addSupportBaseComment(3, "Ref17p84p7a");
                  if (this.hasManyBadStars) {
                      this.addSupportBaseComment(2, "Ref17p84p7b");
                  }
              }
          }
      }
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(7, "Ref17p84p8");
//NOT FOUND			if ( hasManyBadStars ) {
//			if ( hasHostileStars() ) {
          if (this.hasCombinedSatTinh) {
              this.addSupportBaseComment(3, "Ref17p84p9a");
          }
      } else {
          if (status===TuViStar.HAMDIA) {
              //NOT FOUND			if ( hasManyBadStars ) {

              //if ( hasHostileStars() ) {
              if (this.hasCombinedSatTinh) {
                  this.addSupportBaseComment(3, "Ref17p84p9b");
              }
          }
      }
      if (BrancheHelper.isDragonDog(this.palace.branche)) {
          if (this.hasStar(TuViStar.THIENLUONG)) {
              this.addSupportBaseComment(8, "Ref17p84p10a");
              if (this.hasCombinedSatTinh ||
                this.hasTuanTrietKhong) {
                  this.addSupportBaseComment(3, "Ref17p84p10b");
              }
          }
      }
  }

   genRef17p85() {
      if (BrancheHelper.isDragonDog(this.palace.branche)) {
          if (this.hasStar(TuViStar.THIENLUONG)) {
              this.addSupportBaseComment(7, "Ref17p85p1");
              if (this.hasFavorableStars()) {
                  this.addSupportBaseComment(8, "Ref17p85p2");
              }
              if (this.hasSupportStars(TuViStarHelper.KINHDAHOALINH, 1) &&
              this.hasOppositePalaceStar(TuViStar.THIENTUONG)) {
                  this.addBaseComment("Ref17p85p3");
              }

          }
      }
      if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
          if (this.hasStar(TuViStar.NGUYETDUC)) {
              if (this.hasStars(TuViStarHelper.XUONGRIEU,1)) {
                  this.addBaseComment("Ref17p85p4");
              }
          }
      }

      if (this.hasSupportStars0(TuViStarHelper.CONGUYETDONGLUONG)) {
          this.addBaseComment("Ref17p85p5");
      }

      if (this.hasStar(TuViStar.THIENLUONG) && this.hasTuanTrietKhong) {
          this.addBaseComment("Ref17p85p6");
      }
  }

   genThienCoStar() {
      if (this.hasStar(TuViStar.THIENCO)) {
          const status = TuViStar.THIENCO.diaStatus;
          this.genRef17p83p3_10(status);
          this.genRef17p84(status);
          this.genRef17p85();
      }
  }

   genRef17p85p7_8() {
      if (this.hasTuanTrietKhong || this.hasSupportStars0(TuViStarHelper.KHONGKIEP)) {
          this.addSupportBaseComment(3, "Ref17p85p7");
      }
      if (this.hasCombinedSatTinh) {
          this.addSupportBaseComment(4, "Ref17p85p8");
      }
  }

   genRef17p86() {

      if (this.isMan()) {
          if (this.hasFavorableStars() &&
          this.hasSupportStars0(TuViStarHelper.TUTUONGXUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC)) {
              this.addSupportBaseComment(8, "Ref17p86p1");
          }
          if (this.hasTuanTrietKhong || this.hasSupportStars0(TuViStarHelper.KHONGKIEP)) {
              this.addSupportBaseComment(3, "Ref17p86p2");
          }
          this.addSupportBaseComment(7, "Ref17p86p6");
      } else {
          if (this.hasFavorableStars()) {
              this.addSupportBaseComment(7, "Ref17p86p3");
          }
          if (this.hasTuanTrietKhong || this.hasSupportStars0(TuViStarHelper.NHIKHONGKIEP)) {
              this.addSupportBaseComment(3, "Ref17p86p4");
          }
      }
      this.addSupportBaseComment(7, "Ref17p86p5");
      if (this.palace.branche===Branche.DOG && this.hasFavorableStars()) {
          this.addSupportBaseComment(8, "Ref17p86p7");
          if (TrunkHelper.isJiaJi(this.getyTrunk())) {
              if (!(this.hasCombinedSatTinh)) {
                  this.addSupportBaseComment(8, "Ref17p86p8");
              }
          }
      }
  }

   genRef17p87() {
      if (this.palace.branche===Branche.RAT) {
          if (this.hasStar(TuViStar.VUKHUC)) {
              if (TrunkHelper.isRenGeng(this.getyTrunk()) ) {
                  this.addSupportBaseComment(7, "Ref17p87p1");
              } else {
                  this.addSupportBaseComment(4, "Ref17p87p1");
              }
          }
      }

      if (BrancheHelper.isHorseDog(this.palace.branche)) {
          if (this.hasSupportStars0([TuViStar.THIENTUONG])) {
              this.addSupportBaseComment(7, "Ref17p87p2");
              if (this.getyTrunk()===Trunk.JIA) {
                  this.incPoints(8);
              }
          }
      }

      if (this.hasSupportStars0([TuViStar.THIENLUONG]) && this.hasOppositePalaceStar(TuViStar.THIENTUONG)) {
          this.addSupportBaseComment(9, "Ref17p87p3");
      }
      if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCTAHUU)) {
          this.addSupportBaseComment(9, "Ref17p87p4");
      }
      if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCLOC)) {
          this.addSupportBaseComment(8, "Ref17p87p5");
      }
  }

   genRef17p87p6() {
      if (this.hasSupportStars0(TuViStarHelper.PHUTUONG)) {
          this.addSupportBaseComment(8, "Ref17p87p6");
      }
  }

   genThienPhurStar() {
      if (this.hasStar(TuViStar.THIENPHUR)) {
        this.genRef17p65p1();
        this.genRef17p85p7_8();
        this.genRef17p86();
        this.genRef17p86p9();
        this.genRef17p87();
      }
  }

   genRef17p88(status: number) {
      if (this.isBornInNight()) {
          this.incPoints(8);
      } else {
          this.incPoints(4);
      }

      if (status >= TuViStar.DACDIA) {
          if (this.hasSupportStars(TuViStarHelper.XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHY, 6)) {
              this.addSupportBaseComment(9, "Ref17p88p3");
          }
          if (this.hasTuanTrietKhong) {
              if (status >= TuViStar.VUONGDIA) {
                  this.addSupportBaseComment(3, "Ref17p88p4");
              } else {
                  this.addSupportBaseComment(6, "Ref17p88p5");
              }
          } else {
              this.addSupportBaseComment(6, "Ref17p88p6");
          }
          if (this.hasHostileStars()) {
              if (this.hasCombinedSatTinh && this.hasSupportStars(TuViStarHelper.KYRIEUHINH, 2)) {
                  this.addSupportBaseComment(3, "Ref17p88p7");
              }
          }
          if (status===TuViStar.DACDIA) {
              if (this.hasStar(TuViStar.HOAKY) && !this.hasCombinedSatTinh) {
                  this.addSupportBaseComment(7, "Ref17p88p8");
              }
          }
          //if ( status===TuViStar.MIEUDIA ) {
          if (BrancheHelper.isRabbitSnake(this.palace.branche)) {
              this.addSupportBaseComment(7, "Ref17p88p10");
          }
          //}
      } else {
          if (status===TuViStar.HAMDIA) {
              this.addSupportBaseComment(3, "Ref17p88p9");
          }
          if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCTAHUUKHOAQUYENLOCDAOHONGHY)) {
              this.addSupportBaseComment(8, "Ref17p88p11");
          }
          if (this.hasTuanTrietKhong) {
              this.addSupportBaseComment(7, "Ref17p88p12");
          }
          if (this.hasHostileStars()) {
              if (this.hasCombinedSatTinh && this.hasSupportStars(TuViStarHelper.KYRIEUHINH, 2)) {
                  this.addSupportBaseComment(3, "Ref17p88p13");
              }
          }
      }
  }

   genRef17p89(status: number) {
      if (this.isMan()) {
          if (status >= TuViStar.DACDIA) {
              if (this.hasTuanTrietKhong) {
                  if (this.hasFavorableStars()) {
                      this.addSupportBaseComment(9, "Ref17p89p1");
                  }
              }
          } else {
              if (status===TuViStar.HAMDIA) {
//					if ( hasHostileStars() ) {
                  if (this.hasHostileStars()) {
                      this.addSupportBaseComment(4, "Ref17p89p2");
                  }
              }
          }
          if (this.palace.branche===Branche.MONKEY) {
              this.addBaseComment("Ref17p89p3");
          }
      } else {
          if (status >= TuViStar.DACDIA) {
              this.addSupportBaseComment(8, "Ref17p89p4");
              if (this.hasFavorableStars()) {
                  this.addSupportBaseComment(9, "Ref17p89p4");
              }
              if (status >= TuViStar.VUONGDIA) {
                  if (this.hasTuanTrietKhong) {
                      this.addSupportBaseComment(4, "Ref17p89p5");
                  }
              }
          } else {
              this.addSupportBaseComment(4, "Ref17p89p5");
              this.addSupportBaseComment(4, "Ref17p89p6");
              if (this.hasManyBadStars) {
                  this.incPoints(2);
              }
          }
      }
      if (this.palace.branche===Branche.PIG) {
          this.addSupportBaseComment(9, "Ref17p89p7");
      }
  }

   genRef17p90(status: number) {
      if (this.palace.branche===Branche.RAT) {
          if (TrunkHelper.isBinhDing(this.getyTrunk())) {
              this.addSupportBaseComment(9, "Ref17p90p2");
          } else {
              this.addSupportBaseComment(8, "Ref17p90p1");
          }
      }
      if (!this.isMan()) {
          if (status===TuViStar.HAMDIA) {
              if (this.hasSupportStars0([TuViStar.THIENLUONG])) {
                  this.addSupportBaseComment(3, "Ref17p90p3");
              }
          }
      }
      if (this.hasSupportStars0(TuViStarHelper.KINHDA)) {
          this.addSupportBaseComment(4, "Ref17p90p5");
          if (status===TuViStar.HAMDIA) {
              this.incPoints(3);
          }
      }
  }

   genRef17p90p4(status: number) {

      if (status >= TuViStar.DACDIA) {
          if (this.hasStar(TuViStar.LOCTON)) {
              if (this.hasSupportStars0(TuViStarHelper.TAHUU)) {
                  this.addSupportBaseComment(8, "Ref17p90p4");
              }
          }
      }
  }

   genThaiAmStar() {
      if (this.hasStar(TuViStar.THAIAM)) {
          const status = TuViStar.THAIAM.diaStatus;
          this.genRef17p81p4_5(TuViStar.THAIDUONG);
          // Done on THAIDUONG genRef17p82(status);
          this.genRef17p88(status);
          this.genRef17p89(status);
          this.genRef17p90(status);
          this.genRef17p90p4(status);
          this.genRef17p106p1(status, TuViStar.THIENLUONG);
      }
  }

   genRef17p90p6p91(status: number) {
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(8, "Ref17p90p6");
          if (!this.isMan()) {
              this.addBaseComment("Ref17p91p11a");
          }
          if (status===TuViStar.MIEUDIA) {
              this.addSupportBaseComment(6, "Ref17p90p7");
          }

          if (this.hasFavorableStars()) {
              if (this.hasSupportStars0(TuViStarHelper.KHOAQUYENLOCTAHUU) ||
                      TuViStar.HOATINH.diaStatus===TuViStar.DACDIA) {
                  this.addSupportBaseComment(9, "Ref17p91p1");
              }
              if (this.isMan()) {
                  this.addSupportBaseComment(8, "Ref17p91p9");
              } else {
                  this.addSupportBaseComment(9, "Ref17p91p11b");
              }
          }
          if (status===TuViStar.VUONGDIA && this.hasSupportStars0([TuViStar.HOAKY])) {
              this.addSupportBaseComment(7, "Ref17p91p2");
          }
      } else {
          if (status===TuViStar.HAMDIA) {
              this.addSupportBaseComment(4, "Ref17p91p3");
              if (BrancheHelper.isRatHorseSnakePig(this.palace.branche)) {
                  this.addSupportBaseComment(4, "Ref17p91p4");
                  if (BrancheHelper.isRatHorse(this.palace.branche)) {
                      this.addSupportBaseComment(4, "Ref17p91p5");
                  }
              }
              if (BrancheHelper.isRabbitCock(this.palace.branche)) {
                  this.addSupportBaseComment(3, "Ref17p91p6");
              }
              if (this.hasHostileStars() || this.hasAllStars(TuViStarHelper.KYHINH)) {
                  if (this.hasAllStars(TuViStarHelper.KYHINH)) {
                      this.addSupportBaseComment(3, "Ref17p91p7");
                  }
                  if (this.isMan()) this.addSupportBaseComment(3, "Ref17p91p10");
              }
          }
      }
      if (this.hasAllStars(TuViStarHelper.KYRIEU)) {
          this.addSupportBaseComment(3, "Ref17p91p8");
      }
  }

  //
   genRef17p92_94(status: number) {
      if (status >= TuViStar.DACDIA) {
          if (status===TuViStar.MIEUDIA) {
              this.addSupportBaseComment(7, "Ref17p92p4");
          }
      } else {
          if (status===TuViStar.HAMDIA) {
              this.addSupportBaseComment(4, "Ref17p92p5");
              if (!this.isMan()) {
                  this.addSupportBaseComment(4, "Ref17p92p1");
                  if (BrancheHelper.isRatHorseSnakePig(this.palace.branche)) {
                      this.addSupportBaseComment(3, "Ref17p92p2");
                  }
                  if (this.hasHostileStars()) {
                      this.addSupportBaseComment(2, "Ref17p92p3");
                  }
              }
              if (BrancheHelper.isSnakePig(this.palace.branche)) {
                  this.addSupportBaseComment(4, "Ref17p92p7");
              }
          }
      }
      const yBranche = this.getyBranche();
      const branche = this.palace.branche;
      if ((BrancheHelper.isMonkeyRatDragon(yBranche) && branche===Branche.RAT) ||
              (BrancheHelper.isTigerDog(yBranche)&& branche===Branche.HORSE) ||
              (BrancheHelper.isPigGoat(yBranche) && branche===Branche.RABBIT) ||
              (BrancheHelper.isSnakeOx(yBranche) && branche===Branche.COCK)) {
          this.addSupportBaseComment(4, "Ref17p92p6");
      }
      if (this.hasStar(TuViStar.VUKHUC)) {
          if (BrancheHelper.isOxGoat(branche)) {
              this.addBaseComment("Ref17p92p8");
              if (this.hasHostileStars()) {
                  this.addSupportBaseComment(3, "Ref17p93p4");
              }
          }
          if (this.hasSupportStars0([TuViStar.PHAQUAN]) && this.hasHostileStars()) {
              this.addSupportBaseComment(3, "Ref17p93p5");
          }
          if (BrancheHelper.isTuSinh(branche) || this.isPartOfTuMo) {
              if (this.hasSupportStars0([TuViStar.PHAQUAN, TuViStar.THATSAT])) {
                  this.addSupportBaseComment(6, "Ref17p93p6");
              }
          }
      }
      if (this.hasStar(TuViStar.LIEMTRINH)) {
          this.addSupportBaseComment(4, "Ref17p93p7");
          if (BrancheHelper.isTigerMonkey(this.palace.branche) && this.hasStar(TuViStar.VANXUONG)) {
              this.addSupportBaseComment(4, "Ref17p93p8");
          }
          if (this.hasAllStars(TuViStarHelper.LINHTUYET)) {
              this.addSupportBaseComment(4, "Ref17p94p1a");
          }

          if (this.hasSupportStars0(TuViStarHelper.KINHKIEPKHONGHUMA)) {
              this.addSupportBaseComment(3, "Ref17p94p1b");
          }
      }
      if (BrancheHelper.isRatPig(this.palace.branche)) {
          if (this.hasAllStars(TuViStarHelper.KINHDA)) {
              this.addSupportBaseComment(3, "Ref17p94p5");
          }
      }
      if ((this.palace.branche===Branche.TIGER)) {
          if (this.hasStar(TuViStar.DALA)) {
              this.addSupportBaseComment(4, "Ref17p94p6");
          }
      }
      if (this.isPartOfTuMo) {
          if (this.hasHoaLinhStar() ||
          this.hasSupportStars0(TuViStarHelper.HOALINH)) {
              this.addSupportBaseComment(8, "Ref17p94p7");
          }
      }
  }

   genRef17p95(status: number) {
      if (status >= TuViStar.VUONGDIA) {
          if (this.hasStar(TuViStar.HOATINH)) {
              this.addSupportBaseComment(8, "Ref17p95p1");
          }
          if (this.hasStar(TuViStar.LINHTINH)) {
              this.addSupportBaseComment(7, "Ref17p95p2");
              if (TrunkHelper.isWuJi(this.getyTrunk())) {
                  this.incPoints(9);
              }
          }
          if (this.hasSupportStars0(TuViStarHelper.KINHDAKHONGKIEP)) {
              this.addSupportBaseComment(3, "Ref17p95p3");
          }
          if (this.hasStar(TuViStar.HOAKY) || this.hasOppositePalaceStar(TuViStar.HOAKY)) {
              this.addBaseComment("Ref17p95p7");
          }
      }
      if (BrancheHelper.isRatPig(this.palace.branche)) {
          if (this.hasPrevNextStars(TuViStarHelper.TuSatTinhList, 2)) {
              this.addSupportBaseComment(3, "Ref17p95p5");
          }
          if (this.hasSupportStars0(TuViStarHelper.QUYENVUONG)) {
              this.addSupportBaseComment(8, "Ref17p95p6");
              if (TrunkHelper.isJiaJi(this.getyTrunk())) {
                  this.incPoints(9);
              }
          }
      }
      if (BrancheHelper.isRabbitCock(this.palace.branche)) {
          this.addBaseComment("Ref17p95p8a");
          if (this.hasSupportStars0(TuViStarHelper.KIEPKY)) {
              this.addBaseComment("Ref17p95p8b");
          }
      }

  }


   genRef17p96(status: number) {
      if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
          if (this.hasStar(TuViStar.TRANGSINH) && this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(9, "Ref17p96p1");
          }
      }
      if (!this.isMan() && status===TuViStar.HAMDIA && this.hasStar(TuViStar.DAOHOA)) {
          if (!this.hasTuanTrietKhong) {
              this.addSupportBaseComment(4, "Ref17p96p2a");
          } else {
              this.addSupportBaseComment(7, "Ref17p96p2b");
          }
      }
      if (this.palace.branche===Branche.RAT) {
          if (!this.hasTuanTrietKhong) {
              this.addSupportBaseComment(3, "Ref17p96p3a");
          } else {
              this.addSupportBaseComment(7, "Ref17p96p3b");
          }
      }
  }

   genThamLangStar() {
      if (this.hasStar(TuViStar.THAMLANG)) {
          const status= TuViStar.THAMLANG.diaStatus;
          this.genRef17p90p6p91(status);
          this.genRef17p92_94(status);
          this.genRef17p95(status);
          this.genRef17p96(status);
          this.genRef17p111p10();
      }
  }

   genRef17p96p97(status: number) {
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(8, "Ref17p96p4");
          if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC)) {
              this.incPoints(9);
          }
          if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCKHOIVIETKHOATUEHINH)) {
              this.addSupportBaseComment(8, "Ref17p96p5");
          }
          if (this.hasSupportStars0(TuViStarHelper.HOKHOCTANGHUPHUF)) {
              this.addSupportBaseComment(8, "Ref17p96p6Ref20p149p4");
          }
          if (BrancheHelper.isRatHorse(this.palace.branche)) {
              this.addSupportBaseComment(6, "Ref17p96p7a");
              if (this.hasStar(TuViStar.HOALOC) || this.hasTuanTrietKhong || this.hasAllStars(TuViStarHelper.DAITIEUHAO)) {
                  this.addSupportBaseComment(9, "Ref17p96p7bRef20p149p6");
              } else {
                  if (this.hasStar(TuViStar.LOCTON)) {
                      this.addSupportBaseComment(5, "Ref17p96p7c");
                  }
              }
          }
          if (this.hasCombinedSatTinh || this.hasHostileStars()) {
              this.addSupportBaseComment(4, "Ref17p96p8");
          }
          if (this.isMan()) {
              if (this.hasManyGoodSupportStars()) {
                  this.addSupportBaseComment(8, "Ref17p97p9");
              }
          }
      } else {
          let genp1 = true;
          const yTrunk = this.getyTrunk();
          if (BrancheHelper.isDragonDog(this.palace.branche)) {
              if (TrunkHelper.isGuiXin(this.getyTrunk())) {
                  this.addSupportBaseComment(7, "Ref17p97p2");
                  genp1 = false;
              } else {
                if (TrunkHelper.isDingGeng(this.getyTrunk())) {
                      this.addSupportBaseComment(3, "Ref17p97p3");
                  }
              }
          } else {
            if (BrancheHelper.isOxGoat(this.palace.branche)) {
                if (TrunkHelper.isYiXinBing(this.getyTrunk())) {
                      this.addSupportBaseComment(7, "Ref17p97p4");
                      genp1 = false;
                  }
              }
          }

          if (this.hasManyGoodSupportStars() ||
          this.hasSupportStars(TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC, 6)
                  ) {
              this.addSupportBaseComment(8, "Ref17p97p5");
              genp1 = false;
          }

          if (genp1) {
              this.addSupportBaseComment(3, "Ref17p97p1");
          }
          if (this.hasSupportStars0(TuViStarHelper.LOCTUE)) {
              this.addBaseComment("Ref17p97p6");
          }
          if (this.hasCombinedSatTinh || this.hasHostileStars()) {
              this.addSupportBaseComment(2, "Ref17p97p7");
          }
          if (this.isMan()) {
//					if ( hasHostileStars() ) {
              if (this.hasCombinedSatTinh) {
                  this.addBaseComment("Ref17p97p10");
              }
          }

      }
      if (this.hasStar(TuViStar.HOAKY)) {
          this.addSupportBaseComment(3, "Ref17p97p8");
      }
  }

   genRef17p98(status: number) {
      if (status >= TuViStar.DACDIA) {
          if (status===TuViStar.MIEUDIA || status===TuViStar.DACDIA) {
              if (!this.isMan()) {
                  this.addSupportBaseComment(7, "Ref17p98p1");
                  if (this.hasManyGoodSupportStars()) {
                      this.incPoints(9);
                  }
              }
          }
      } else {
          if (status===TuViStar.HAMDIA) {
              if (!this.isMan()) {
                  this.addSupportBaseComment(3, "Ref17p98p2");
                  this.addSupportBaseComment(5, "Ref17p98p3");
//					if ( hasHostileStars() ) {
                  if (this.hasCombinedSatTinh) {
                      this.addSupportBaseComment(3, "Ref17p98p4");
                  }
              }
          }
      }
      if (this.hasStar(TuViStar.THAIDUONG)) {
          this.addSupportBaseComment(7, "Ref17p98p7");
          if (this.palace.branche===Branche.TIGER) {
              this.addSupportBaseComment(7, "Ref17p98p8");
          }
          if (this.palace.branche===Branche.MONKEY) {
              this.addSupportBaseComment(7, "Ref17p98p9");
          }
          if (this.palace.isThan) {
              this.addSupportBaseComment(6, "Ref17p98p10");
          }
      }
  }

   genRef17p99() {
    if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
          if (this.hasStar(TuViStar.THAIDUONG)) {
              if (this.hasStar(TuViStar.LOCTON)) {
                  if (this.hasSupportStars(TuViStarHelper.CACQUYEN, 1)) {
                      this.addSupportBaseComment(8, "Ref17p99p2b");
                  } else {
                      this.addSupportBaseComment(3, "Ref17p99p2a");
                  }
              }
          }
      }

      if (this.hasStar(TuViStar.THIENCO)) {
          if (this.palace.branche===Branche.TIGER) {
              this.addBaseComment("Ref17p99p4");
              this.addBaseComment("Ref17p99p5");
          }
          if (BrancheHelper.isRabbitCock(this.palace.branche)) {
              this.addSupportBaseComment(7, "Ref17p99p6");
              if (TrunkHelper.isYiXinJiBing(this.getyTrunk())) {
                  this.incPoints(9);
              }

              if (this.palace.branche===Branche.COCK) {
                  this.addSupportBaseComment(6, "Ref17p99p7");
                  if (this.hasManyGoodSupportStars() || this.hasSupportStars0(TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC)) {
                      this.incPoints(8);
                  }
              }
          }
      }
  }

   genRef17p100() {
    const yTrunk = this.getyTrunk();
      if (this.hasStar(TuViStar.THIENCO)) {
          if (!this.isMan()) {
            if (TrunkHelper.isYiXin(yTrunk)) {
                  this.addSupportBaseComment(7, "Ref17p100p1");
                  if (!this.hasTuanTrietKhong) {
                      this.incPoints(9);
                  }
              }
          }
          if (this.hasStar(TuViStar.LOCTON)) {
              this.addSupportBaseComment(4, "Ref17p100p2");
          }
          if (this.hasHaoStar()) {
              this.addSupportBaseComment(8, "Ref17p100p3");
          }
      }
      if (this.isPartOfTuMo) {
          if (this.hasSupportStars0(TuViStarHelper.KINHKY)) {
            if (TrunkHelper.isBingXin(yTrunk)) {
                  this.addSupportBaseComment(3, "Ref17p100p4");
              }
          }
      }
      if (BrancheHelper.isDragonDog(this.palace.branche)) {
          if (this.hasSupportStars0(TuViStarHelper.LAVONG)) {
              if (this.hasSupportStars0([TuViStar.HOAKHOA])) {
                  this.addBaseComment("Ref17p100p5");
              }
          }
      }
      if (yTrunk===Trunk.XIN) {
          if (this.isPartOfTuMo) {
              this.addSupportBaseComment(7, "Ref17p100p6");
              if (this.hasSupportStars0(TuViStarHelper.TAHUU)) {
                  this.incPoints(8);
              }
          }

      }


  }

   genRef17p101() {

      if (this.hasSupportStars0(TuViStarHelper.KINHDAHOALINH)) {
          this.addSupportBaseComment(3, "Ref17p101p1");
          if (this.hasHostileStars()) {
              this.addSupportBaseComment(2, "Ref17p101p4");
          }
      }
      this.genRef17p101p2();
      if (this.hasSupportStars0(TuViStarHelper.HOALINH)) {
          this.addSupportBaseComment(2, "Ref17p101p3");
      }
      if (BrancheHelper.isRatPig(this.palace.branche)) {
          if (this.hasStar(TuViStar.LOCTON)) {
              if (this.hasSupportStars0([TuViStar.HOAQUYEN])) {
                  this.addSupportBaseComment(3, "Ref17p101p5");
              }
          }
      }
      if (BrancheHelper.isRatHorse(this.palace.branche)) {
          if (this.hasSupportStars0(TuViStarHelper.KHOAQUYENLOCCU)) {
              this.addSupportBaseComment(8, "Ref17p101p6");
          }
      }
      if (this.palace.branche===Branche.DRAGON) {
          if (this.hasStar(TuViStar.HOAKY)) {
              if (this.getyTrunk()===Trunk.XIN) {
                  this.addSupportBaseComment(8, "Ref17p101p7");
              }

          }
      }
  }

   genCuMonStar() {
      if (this.hasStar(TuViStar.CUMON)) {
          const status = TuViStar.CUMON.diaStatus;
          this.genRef17p96p97(status);
          this.genRef17p98(status);
          this.genRef17p99();
          this.genRef17p100();
          this.genRef17p101();
      }
  }

   genRef17p102(status: number) {
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(8, "Ref17p102p1");
          if (this.hasManyGoodSupportStars() || this.hasSupportStars0(TuViStarHelper.TUPHURXUONGKHUCTAHUUKHOAQUYENLOC)) {
              this.addSupportBaseComment(9, "Ref17p102p3");
          }
          if (status===TuViStar.VUONGDIA && this.hasSupportStars0(TuViStarHelper.KINHDA)) {
              this.addSupportBaseComment(7, "Ref17p102p4");
          }
          if (this.hasHostileStars() || this.hasCombinedSatTinh) {
              this.addSupportBaseComment(5, "Ref17p102p5");
          }
      } else {
          this.addSupportBaseComment(4, "Ref17p102p2");
          if (this.hasHostileStars() || this.hasCombinedSatTinh) {
              this.addSupportBaseComment(3, "Ref17p102p6");
          }
      }
      if (this.hasTuanTrietKhong) {
          this.addSupportBaseComment(2, "Ref17p102p7");
      }
      if (this.hasStar(TuViStar.THIENHINH)) {
          this.addSupportBaseComment(3, "Ref17p102p8");
      }
      if (this.hasTuanTrietKhong && this.isMan()) {
          this.addSupportBaseComment(3, "Ref17p102p9");
      }
  }

   genRef17p103(status: number) {
      if (!this.isMan()) {
          if (status >= TuViStar.DACDIA) {
              this.addSupportBaseComment(8, "Ref17p103p1");
          } else {
              if (status===TuViStar.HAMDIA) {
                  this.addSupportBaseComment(4, "Ref17p103p2");
              }
              if (this.hasHostileStars()) {
                  this.addSupportBaseComment(2, "Ref17p103p3");
              }
          }
          if (BrancheHelper.isDragonDog(this.palace.branche)) {
            this.incPoints(8);
          }
          this.addSupportBaseComment(6, "Ref17p103p6");
          this.addSupportBaseComment(7, "Ref17p103p7");
          if (this.hasStar(TuViStar.HONGLOAN)) {
              this.addSupportBaseComment(7, "Ref17p103p9");
          }
          if (this.hasSupportStars0(TuViStarHelper.CAIDAOKHUCMOC)) {
              this.addSupportBaseComment(7, "Ref17p103p10");
          }
      }
      if (BrancheHelper.isRabbitHorse(this.palace.branche)) {
          if (this.hasPrevNextStar(TuViStar.KINHDUONG)) {
              this.addSupportBaseComment(4, "Ref17p103p8");
          }
      }
  }

   genThienTuongStar() {
      if (this.hasStar(TuViStar.THIENTUONG)) {
          const status= TuViStar.THIENTUONG.diaStatus;
          this.genRef17p102(status);
          this.genRef17p103(status);
      }
  }

   genRef17p104(status: number) {
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(7, "Ref17p104p1");
          if (this.hasManyGoodSupportStars() || this.hasSupportStars0(TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOC)) {
              this.addSupportBaseComment(9, "Ref17p104p5");
          }
          let starSet =[
                  TuViStar.VANXUONG,
                  TuViStar.VANKHUC,
                  TuViStar.TAPHU,
                  TuViStar.HUUBAT,
                  TuViStar.THAITUE
          ];
          if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCTAHUUTUE)) {
              this.addSupportBaseComment(8, "Ref17p104p6");
          }
          if (this.hasTuanTrietKhong) {
              this.addSupportBaseComment(3, "Ref17p104p7");
          }
      } else {
          if (status===TuViStar.HAMDIA) {
              this.addSupportBaseComment(4, "Ref17p104p2");
              if (BrancheHelper.isSnakeCockPig(this.palace.branche)) {
                  if (this.palace.branche===Branche.COCK) {
                      this.addSupportBaseComment(4, "Ref17p104p3");
                  }
                  this.addSupportBaseComment(4, "Ref17p104p4");
              }
              if (this.hasHostileStars() || this.hasSupportStars0(TuViStarHelper.HOALINH)) {
                  this.addSupportBaseComment(2, "Ref17p104p8");
              }

          }
      }
  }

   genRef17p105(status: number) {
      if (status >= TuViStar.DACDIA) {
          if (!this.isMan()) {
              if (this.hasTuanTrietKhong) {
                  this.addSupportBaseComment(3, "Ref17p105p3");
              } else {
                  this.addSupportBaseComment(8, "Ref17p105p2");
              }
          }
      } else {
          if (this.isMan()) {
              this.addSupportBaseComment(3, "Ref17p105p1");
          } else {
              this.addSupportBaseComment(3, "Ref17p105p4");
              this.addSupportBaseComment(3, "Ref17p105p5");
          }
      }
      if (this.palace.branche===Branche.HORSE) {
          this.addSupportBaseComment(7, "Ref17p105p6");
          if (TrunkHelper.isDingJiGui(this.getyTrunk())) {
              this.incPoints(8);
          }
      }
      if (this.palace.branche===Branche.RABBIT && this.hasStar(TuViStar.THAIDUONG)) {
          this.addSupportBaseComment(9, "Ref17p105p7");
      }
      if (this.palace.branche===Branche.RAT && this.hasDirectSupportStar(TuViStar.THAIDUONG) &&
      this.hasSupportStars0(TuViStarHelper.XUONGLOC)) {
          this.addSupportBaseComment(9, "Ref17p105p8");
      }
  }

  isRatToHorse (branche: Branche) {
		const  ord = branche.ordinal();
		return ord>=Branche.RAT.ordinal() && ord<=Branche.HORSE.ordinal() ;
	}

   genRef17p106(status: number) {
    this.genRef17p106p1(status, TuViStar.NGUYETDUC);
    const branche = this.palace.branche;

    if (this.isRatToHorse(this.palace.branche)) {
          if (this.hasSupportStars0(TuViStarHelper.LINHNGUYET)) {
              this.addSupportBaseComment(8, "Ref17p106p2");
          }
      }
      this.genRef17p106p3_5(status, TuViStar.THIENDONG);

      if (status===TuViStar.MIEUDIA) {
          if (this.hasStar(TuViStar.VANXUONG)) {
              this.addSupportBaseComment(8, "Ref17p106p6");
          }
      }
      if (branche===Branche.SNAKE) {
          if (this.hasHaoStar() || this.hasHostileStars()) {
              this.addSupportBaseComment(3, "Ref17p106p7");
          }
      }

      if (this.hasDirectSupportStar(TuViStar.THIENMA)) {
        if (BrancheHelper.isRatPig(branche)) {
              this.addSupportBaseComment(4, "Ref17p106p8");
          }

          if (!this.isMan()) {
              if (branche===Branche.SNAKE || branche===Branche.PIG) {
                  this.addSupportBaseComment(4, "Ref17p106p9");
              }
          }
      }

  }

   genRef17p106p3_5(status: number, otherStar: TuViStar) {
    if (BrancheHelper.isRatPig(this.palace.branche)) {
          this.addBaseComment("Ref17p106p3");
      }
      if (status >= TuViStar.DACDIA || this.hasStar(otherStar)) {
          this.addSupportBaseComment(8, "Ref17p106p4");
      }
      if (this.hasStar(otherStar)) {
          if (this.hasSupportStars0(TuViStarHelper.COTHAIAM)) {
              this.addSupportBaseComment(8, "Ref17p106p5");
          }
      }
  }

   genRef17p106p1(status: number,  checkStar: TuViStar) {
      if (status===TuViStar.HAMDIA) {
          if (this.hasDirectSupportStar(checkStar)) {
              this.addSupportBaseComment(4, "Ref17p106p1");
          }
      }
  }

   genRef17p135p5() {
    if (BrancheHelper.isRatHorse(this.palace.branche)) {
          if (this.hasSupportStars0(TuViStarHelper.LOCTONHOALOC)) {
              this.addSupportBaseComment(9, "Ref17p135p5");
          }
      }
  }

   genThienLuongStar() {
      if (this.hasStar(TuViStar.THIENLUONG)) {
          const status= TuViStar.THIENLUONG.diaStatus;
          this.genRef17p104(status);
          this.genRef17p105(status);
          this.genRef17p106(status);
          this.genRef17p135p5();
      }
  }

   genRef17p107(status: number) {
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(6, "Ref17p107p1");
          if (status===TuViStar.MIEUDIA) {
            if (TrunkHelper.isJiaGengJiDing(this.getyTrunk())) {
                  this.addSupportBaseComment(8, "Ref17p107p2");
              }
          }
          if (this.hasManyGoodSupportStars() ||
          this.hasSupportStars0(TuViStarHelper.TUTUONGXUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCMAKINH)) {
              this.addSupportBaseComment(10, "Ref17p107p3");
          } else {
              if (this.hasCombinedSatTinh || this.hasHostileStars()) {
                  this.addSupportBaseComment(3, "Ref17p107p4");
              }
          }

      } else {
          if (status===TuViStar.HAMDIA) {
            if (TrunkHelper.isJiXin(this.getyTrunk())) {
                  this.addSupportBaseComment(8, "Ref17p107p6");
              } else {
                  this.addSupportBaseComment(4, "Ref17p107p5");
              }
              if (this.hasCombinedSatTinh || this.hasHostileStars()) {
                  this.addSupportBaseComment(4, "Ref17p107p7");
              }
              if (this.hasStar(TuViStar.THIENHINH)) {
                  this.addSupportBaseComment(3, "Ref17p107p8");
              }
          }
      }
  }

   genRef17p108p7( checkStar: TuViStar) {
      if (this.palace.branche===Branche.SNAKE && this.hasStar(checkStar)) {
          this.addSupportBaseComment(8, "Ref17p108p7a");
          if (this.hasSupportStars0(TuViStarHelper.HOATUYET)) {
              this.addSupportBaseComment(8, "Ref17p108p7b");
          }
      }
  }

   genRef17p108(status: number) {
      if (this.isMan()) {
          if (status >= TuViStar.DACDIA) {
              if (this.hasManyGoodSupportStars()) {
                  this.addSupportBaseComment(7, "Ref17p108p1");
              }
              if (this.hasStar(TuViStar.THIENHINH)) {
                  this.addSupportBaseComment(7, "Ref17p108p2");
              }
          } else {
              if (status===TuViStar.HAMDIA) {
                  this.addSupportBaseComment(3, "Ref17p108p3");
              }
          }
      } else {
          if (status >= TuViStar.DACDIA) {
              this.addSupportBaseComment(7, "Ref17p108p4");
              if (this.hasManyGoodSupportStars()) {
                  this.incPoints(8);
              }
          } else {
              if (status===TuViStar.HAMDIA) {
                  this.addSupportBaseComment(4, "Ref17p108p5");
                  if (this.hasManyGoodSupportStars()) {
                      this.incPoints(2);
                  }
              }
          }
      }
      if (BrancheHelper.isRatHorseTigerMonkey(this.palace.branche)) {
          this.addSupportBaseComment(8, "Ref17p108p6");
      }
      this.genRef17p108p7(TuViStar.TUVI);
  }

   genRef17p109p1_2() {
    if (BrancheHelper.isOxGoat(this.palace.branche)) {
          if (this.hasAllStars(TuViStarHelper.LIEMSAT)) {
              this.addSupportBaseComment(2, "Ref17p109p1");
              if (this.isMan()) {
                if (TrunkHelper.isJiYi(this.getyTrunk())) {
                      this.addSupportBaseComment(8, "Ref17p109p2a");
                  } else {
                      this.addSupportBaseComment(7, "Ref17p109p2b");
                  }
              }
          }
      }
  }

   genRef17p109(status: number) {
    this.genRef17p109p1_2();
      if (status===TuViStar.HAMDIA) {
          this.addSupportBaseComment(4, "Ref17p109p3");
      }
      const yTrunk=this.getyTrunk();
      if (!this.isMan()) {
        if (TrunkHelper.isDingXin(yTrunk)) {
              if (this.hasSupportStars0(TuViStarHelper.THAMPHA) &&
              this.hasDirectSupportStar(TuViStar.VANXUONG)) {
                  this.addSupportBaseComment(3, "Ref17p109p4");
              }
          }
      }
      if (this.hasSupportStars0(TuViStarHelper.KINHDAHOALINH)) {
          this.addSupportBaseComment(3, "Ref17p109p5");
      }
      if (this.palace.branche===Branche.HORSE) {
          if (this.hasCombinedSatTinh || this.hasStar(TuViStar.KINHDUONG)) {
              this.addSupportBaseComment(2, "Ref17p109p6a");
              if (yTrunk===Trunk.BING || yTrunk===Trunk.WU) {
                  this.addSupportBaseComment(2, "Ref17p109p6b");
              } else {
                  if (yTrunk===Trunk.JIA || yTrunk===Trunk.JI) {
                      this.addSupportBaseComment(9, "Ref17p109p6c");
                  }
              }
          }
      }
      if (this.hasStar(TuViStar.TUYET)) {
          if (this.hasSupportStars0(TuViStarHelper.KINHDA)) {
              this.addSupportBaseComment(2, "Ref17p109p7");
          }
      }
      if (status===TuViStar.HAMDIA) {
          if (this.hasSupportStars0(TuViStarHelper.HOAKINH)) {
              this.addSupportBaseComment(4, "Ref17p109p8");
          }
      }
      const branche = this.palace.branche;
      if (branche===Branche.HORSE || branche===Branche.RAT) {
          if (this.isMan()) {
              this.addSupportBaseComment(7, "Ref17p109p9a");
          }
          if (this.hasSupportStars0(TuViStarHelper.KIEPRIEUSAT)) {
              this.addSupportBaseComment(4, "Ref17p109p9b");
          }
      }
  }

   genRef17p110p2(status: number, checkStar: TuViStar) {
      if (status >= TuViStar.DACDIA) {
          if (this.hasDirectSupportStar(checkStar)) {
              this.addSupportBaseComment(7, "Ref17p110p2");
          }
      }
  }

   genRef17p110p1(status: number) {
      if (status >= TuViStar.DACDIA) {
          if (this.hasStar(TuViStar.THIENHINH)) {
              this.addSupportBaseComment(8, "Ref17p110p1");
          }
      }
  }

   genThatSatStar() {
      if (this.hasStar(TuViStar.THATSAT)) {
          const status = TuViStar.THATSAT.diaStatus;
          this.genRef17p107(status);
          this.genRef17p108(status);
          this.genRef17p109(status);
          this.genRef17p110p1(status);
          this.genRef17p110p2(status, TuViStar.THIENHINH);
          if (this.palace.branche===Branche.MONKEY) {
              this.addSupportBaseComment(2, "Ref17p110p3");
          }
          this.genRef17p112p1();
      }
  }

   genRef17p110(status: number) {
    const yTrunk = this.getyTrunk();
    const branche = this.palace.branche;
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(8, "Ref17p110p4");
          if (status===TuViStar.MIEUDIA) {
              this.addBaseComment("Ref17p110p5");
              if (TrunkHelper.isDingJiGui(yTrunk)) {
                  this.addSupportBaseComment(8, "Ref17p110p8");
              } else {
                if (TrunkHelper.isBingWu(this.getyTrunk())) {
                      this.addSupportBaseComment(6, "Ref17p110p9");
                  }
              }
          }
          if (status===TuViStar.DACDIA) {
              this.addBaseComment("Ref17p110p6");
          }
          this.addBaseComment("Ref17p110p7");
          if (this.hasManyGoodSupportStars() ||
          this.hasSupportStars0(TuViStarHelper.XUONGKHUCTAHUUKHOAQUYENLOCKINHDAKHONGKIEP)) {
              this.addSupportBaseComment(9, "Ref17p110p10");
          }
          if (this.hasHostileStars() || this.hasSupportStars0(TuViStarHelper.HAOHOKYHINH)) {
              this.addSupportBaseComment(4, "Ref17p110p11");
          }
      } else {
          if (status===TuViStar.HAMDIA) {
              this.addSupportBaseComment(4, "Ref17p110p12");
              if (TrunkHelper.isYiXinGui(yTrunk) &&
              BrancheHelper.isRabbitCock(branche) ||
              TrunkHelper.isJiaGengJiDing(yTrunk) &&
              BrancheHelper.isTigerMonkey(branche) ||
              yTrunk===Trunk.WU && BrancheHelper.isSnakePig(branche)) {
                  this.addSupportBaseComment(7, "Ref17p110p13");
              }
          }
      }
  }

   genRef17p111(status: number) {
      if (status >= TuViStar.DACDIA) {
          if (this.isMan()) {
              if (this.hasManyGoodSupportStars()) {
                  this.addSupportBaseComment(8, "Ref17p111p3");
              }
          } else {
              this.addSupportBaseComment(6, "Ref17p111p5a");
              if (this.hasManyGoodSupportStars()) {
                  this.addSupportBaseComment(8, "Ref17p111p5b");
              }
          }
      } else {
          if (status===TuViStar.HAMDIA) {
              if (this.hasSupportStars0(TuViStarHelper.KINHDAKHONGKIEP)) {
                  this.addSupportBaseComment(6, "Ref17p111p1");
              }

              if (this.hasCombinedSatTinh || this.hasHostileStars() ||
              this.hasSupportStars0(TuViStarHelper.HAOHOKYHINH)) {
                  this.addSupportBaseComment(2, "Ref17p111p2");
              }
              if (this.isMan()) {
                  if (this.hasHostileStars()) {
                      this.addSupportBaseComment(2, "Ref17p111p4");
                  }
              } else {
                  this.addSupportBaseComment(3, "Ref17p111p6");
                  if (this.hasHostileStars()) {
                      this.incPoints(3);
                  }
              }
          }
      }
      const branche = this.palace.branche;
      if (BrancheHelper.isRatHorseTigerMonkey(branche)|| BrancheHelper.isDragonDog(branche)) {
          if (this.palace.goodActiveChinhTinhCount===1) {
              this.addSupportBaseComment(4, "Ref17p111p7");
          }
      }
      if (BrancheHelper.isRatHorse(branche)) {
          this.addSupportBaseComment(8, "Ref17p111p8");
          this.addBaseComment("Ref17p111p9");
      }
      this.genRef17p111p10();
  }

   genRef17p111p10() {
      if (this.hasSupportStars0(TuViStarHelper.LOCMA)) {
          this.addSupportBaseComment(4, "Ref17p111p10");
          if (this.hasSupportStars0([TuViStar.THIENHINH])) {
              this.addSupportBaseComment(4, "Ref17p111p11");
          }
      }
  }

   genRef17p112p1() {
      if (this.hasSupportStars0(TuViStarHelper.HOAHAO)) {
          this.addSupportBaseComment(3, "Ref17p112p1a");
          if (this.hasSupportStars0(TuViStarHelper.HINHVIET)) {
              this.addSupportBaseComment(2, "Ref17p112p1b");
          }
      }
  }

   genRef17p112() {
    const branche = this.palace.branche;
    const yTrunk = this.getyTrunk();
      if (BrancheHelper.isRabbitCock(branche)) {
          if (this.hasStar(TuViStar.KINHDUONG)) {
              if (this.hasSupportStars0(TuViStarHelper.TAHUU)) {
                  this.addSupportBaseComment(3, "Ref17p112p2");
              }
          }
      }
      if (this.hasSupportStars0(TuViStarHelper.HOALINH)) {
          this.addSupportBaseComment(4, "Ref17p112p3");
      }
      if (BrancheHelper.isTigerMonkey(branche)) {
          if (TrunkHelper.isDingXin(yTrunk)) {
              if (this.hasSupportStars0(TuViStarHelper.HOAVIET)) {
                  this.addSupportBaseComment(7, "Ref17p112p4a");
              }
          } else {
              this.addSupportBaseComment(6, "Ref17p112p4b");
          }
      }
      if (this.palace.branche===Branche.HORSE) {
          if (this.hasSupportStars0(TuViStarHelper.NHATLOC)) {
              this.addSupportBaseComment(6, "Ref17p112p5b");
          } else {
              this.addSupportBaseComment(4, "Ref17p112p5a");
          }
      }
      if (BrancheHelper.isDragonDog(branche)) {
          if (this.hasAllStars(TuViStarHelper.KHOATUAN)) {
              this.addSupportBaseComment(7, "Ref17p112p6b");
          } else {
              this.addSupportBaseComment(4, "Ref17p112p6a");
          }
      }
      if (this.isPartOfTuMo) {
          this.addSupportBaseComment(7, "Ref17p112p7");
          if (this.hasSupportStars0(TuViStarHelper.HINHLOC)) {
              this.incPoints(9);
          }
      }
  }

   genPhaQuanStar() {
      if (this.hasStar(TuViStar.PHAQUAN)) {
          const status = TuViStar.PHAQUAN.diaStatus;
          this.genRef17p66p2();
          this.genRef17p66p4();
          this.genRef17p66p5();
          this.genRef17p69p4(status);
          this.genRef17p110(status);
          this.genRef17p111(status);
          this.genRef17p112p1();
          this.genRef17p112();
      }
  }

   genRef17XUONGKHUC(status: number,  otherStar: TuViStar) {
      if (!this.hasStar(otherStar)) return;
      const yTrunk = this.getyTrunk();
      const branche = this.palace.branche;
      if (status >= TuViStar.DACDIA) {
          this.addSupportBaseComment(8, "Ref17p115p1");
          if (status===TuViStar.DACDIA) {
              this.addSupportBaseComment(8, "Ref17p113p1");
              if (this.hasManyGoodSupportStars() || this.hasSupportStars0(TuViStarHelper.TUPHURKHOIVIETTAHUUKHOAQUYENLOC)) {
                  this.addSupportBaseComment(9, "Ref17p113p2");
              }
              if (this.hasSupportStars0(TuViStarHelper.DONGLUONG)) {
                  if (this.hasTuanTrietKhong || this.hasCombinedSatTinh) {
                      this.addSupportBaseComment(4, "Ref17p113p3b");
                  } else {
                      this.addSupportBaseComment(7, "Ref17p113p3a");
                  }
              }
              if (!this.isMan()) {
                  this.addSupportBaseComment(7, "Ref17p114p4");
              }
              if (this.hasDirectSupportStar(TuViStar.THIENLUONG)) {
                  this.addSupportBaseComment(8, "Ref17p115p8");
              }
              if (this.hasSupportStars0(TuViStarHelper.LOCCO)) {
                  this.addSupportBaseComment(6, "Ref17p116p1");
              }
              if (this.hasStar(TuViStar.LOCTON)) {
                  this.addSupportBaseComment(7, "Ref17p116p3");
              }

          }
      } else {
          if (status===TuViStar.HAMDIA) {
              this.addSupportBaseComment(6, "Ref17p113p6");
              if (this.hasHostileStars() || this.hasCombinedSatTinh) {
                  this.addSupportBaseComment(4, "Ref17p113p7");
                  if (!this.isMan()) {
                      this.addSupportBaseComment(4, "Ref17p114p7");
                  }
              }
              if (!this.isMan()) {
                  this.addSupportBaseComment(4, "Ref17p114p6");
              }
          }
      }
      if (this.hasSupportStars0(TuViStarHelper.PHUONGLONGTUETHU)) {
          this.addSupportBaseComment(7, "Ref17p114p1");
      }
      if (!this.isMan()) {
          if (this.hasStar(TuViStar.THIENRIEU)) {
              this.addSupportBaseComment(4, "Ref17p114p8");
          }
          if (yTrunk===Trunk.JIA) {
              if (BrancheHelper.isOxGoat(branche)) {
                  if (this.hasSupportStars0(TuViStarHelper.LOCHONG)) {
                      this.addSupportBaseComment(8, "Ref17p116p4");
                  }
              }
          }
      }
      if (BrancheHelper.isSnakePig(branche)) {
          if (this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(8, "Ref17p115p4");
          }
          if (this.hasStar(TuViStar.LIEMTRINH)) {
              this.addSupportBaseComment(4, "Ref17p115p5");
          }
      }
      if ((status===TuViStar.DACDIA || status===TuViStar.HAMDIA) && this.hasStar(TuViStar.PHAQUAN)) {
          this.addSupportBaseComment(3, "Ref17p115p6");
      }
      if (BrancheHelper.isTigerRabbit(branche)) {
          if (this.hasStar(TuViStar.PHAQUAN)) {
              if (this.hasCombinedSatTinh || this.hasDirectSupportStar(TuViStar.KINHDUONG)) {
                  this.addSupportBaseComment(3, "Ref17p115p7");
              }
          }
      }
      if (BrancheHelper.isOxRabbitGoatCock(branche) || BrancheHelper.isSnakePig(branche)) {
          if (this.hasStar(TuViStar.LIEMTRINH)) {
              this.addSupportBaseComment(3, "Ref17p116p5");
          }
      }
      this.genRef17p116p6();

  }


   genRef17XUONG(status: number) {
      if (status===TuViStar.DACDIA) {
          if (this.hasStar(TuViStar.TAPHU)) {
              this.addSupportBaseComment(7, "Ref17p116p7");
          }
      }
  }

   genVanXuongStar() {
      if (this.hasStar(TuViStar.VANXUONG)) {
          const status= TuViStar.VANXUONG.diaStatus;
          this.genRef17XUONGKHUC(status, TuViStar.VANKHUC);
          this.genRef17XUONG(status);
      }
      this.genXuongKhucNextPrev(TuViStar.VANXUONG);
  }

   genRef17KHUC(status: number) {
      if (status===TuViStar.DACDIA) {
          if (this.hasStar(TuViStar.VUKHUC)) {
              this.addSupportBaseComment(7, "Ref17p113p4a");
              if (this.getyTrunk()===Trunk.JIA) {
                  this.addSupportBaseComment(9, "Ref17p113p4b");
              }
          }
          if (this.hasSupportStars0(TuViStarHelper.THAMHOA)) {
              this.addSupportBaseComment(8, "Ref17p113p5");
          }
      }
  }

   genXuongKhucNextPrev( star: TuViStar) {
      if (this.hasPrevNextStar(star)) {
          this.addSupportBaseComment(7, "Ref17p116p9");
          this.addBaseComment("Ref17p117p1");
          if (this.hasStarWithStatus(TuViStar.THAIDUONG, TuViStar.DACDIA)) {
              this.addSupportBaseComment(7, "Ref17p117p2");
          }
      }
  }

   genVanKhucStar() {
      if (this.hasStar(TuViStar.VANKHUC)) {
          const status = TuViStar.VANKHUC.diaStatus;
          this.genRef17XUONGKHUC(status, TuViStar.VANXUONG);
          this.genRef17KHUC(status);
      }
      this.genXuongKhucNextPrev(TuViStar.VANKHUC);
  }

   genKhoiViet() {
      this.addBaseComment("Ref17p117p5");

      if (this.hasManyGoodSupportStars()) {
          if (this.hasSupportStars0(TuViStarHelper.TUPHURXUONGKHUCTAHUUKHOAQUYENLOC)) {
              this.addSupportBaseComment(8, "Ref17p117p6");
          }
          if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCKHOTUETHU)) {
              this.addSupportBaseComment(8, "Ref17p118p6");
          }
      }
      if (this.hasTuanTrietKhong || this.hasHostileStars() || this.hasCombinedSatTinh) {
          this.addSupportBaseComment(4, "Ref17p117p7");
      }
      if (this.isMan()) {
          if (this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(8, "Ref17p118p1");
          }
          if (this.hasHostileStars()) {
              this.addSupportBaseComment(4, "Ref17p118p2");
          }
      } else {
          if (this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(8, "Ref17p118p3");
          }
          if (this.hasTuanTrietKhong || this.hasHostileStars()) {
              this.addSupportBaseComment(3, "Ref17p118p4");
          }
      }

      if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCLOC) && (!this.hasCombinedSatTinh) &&
              !(this.hasSupportStars0(TuViStarHelper.KYHINH))) {
          this.addSupportBaseComment(9, "Ref17p118p9");
      }
  }

   genKhoiVietNextPrev( star: TuViStar) {
      if (this.hasPrevNextStar(star)) {
          this.addSupportBaseComment(8, "Ref17p119p3");
          if (this.hasPrevNextStar(TuViStar.LOCTON)) {
              this.addSupportBaseComment(9, "Ref17p119p4");
          }

      }
  }


   genThienKhoiStar() {
      if (this.hasStar(TuViStar.THIENKHOI)) {
        this.genKhoiViet();
          if (this.palace.branche===Branche.HORSE && this.hasStar(TuViStar.TUVI)) {
              this.addSupportBaseComment(8, "Ref17p119p2");
          }
      }
      this.genKhoiVietNextPrev(TuViStar.THIENKHOI);
  }

   genThienVietStar() {
      if (this.hasStar(TuViStar.THIENVIET)) {
        this.genKhoiViet();
      }
      this.genKhoiVietNextPrev(TuViStar.THIENVIET);
  }

   genRef121p5_6( star: TuViStar) {
      if (this.hasOppositePalaceStar(star)) {
          if (this.hasSupportStars0(TuViStarHelper.KIEPKHONGTUE)) {
              this.addSupportBaseComment(4, "Ref17p121p6");
          } else {
              this.addSupportBaseComment(8, "Ref17p121p5");
          }
      }
  }

   genLocTonStar() {
      if (this.hasStar(TuViStar.LOCTON)) {


          if (this.hasSupportStars0(TuViStarHelper.TUPHUXUONGKHOIVIETMA)) {
              this.addSupportBaseComment(9, "Ref17p119p6");
          }

          if (this.hasSupportStars0(TuViStarHelper.QUANGQUYQUANPHUCRIEUY)) {
              this.addSupportBaseComment(8, "Ref17p119p7");
          }
          if (this.hasHostileStars() || this.hasSupportStars0(TuViStarHelper.KHONGKIEPHAOKYTUE)) {
              this.addSupportBaseComment(4, "Ref17p119p8");
              this.addBaseComment("Ref17p120p2_4");
          }
          this.genRef17p120p8();
          if (this.hasDirectSupportStar(TuViStar.PHAQUAN)) {
              this.addSupportBaseComment(4, "Ref17p121p1");
          }

          if (this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(8, "Ref17p119p5");

              if (this.palace.branche===Branche.PIG) {
                  this.addSupportBaseComment(8, "Ref17p120p5");
              }
              if (this.hasStar(TuViStar.HOALOC)) {
                  this.addSupportBaseComment(7, "Ref17p121p2");
              }
              if (this.hasSupportStars0([TuViStar.HOALOC])) {
                  this.addSupportBaseComment(8, "Ref17p121p3");
              }
          }
          this.genRef121p5_6(TuViStar.THIENMA);
          this.genRef17p135p7_8(TuViStar.HOALOC);
          this.genRef17p136p2_3(TuViStar.HOALOC);
      } else {
          if (this.hasSupportStarWithTransform(TuViStar.LOCTON) && this.hasStar(TuViStar.HOALOC)) {
              if (this.hasManyGoodSupportStars()) {
                  this.addSupportBaseComment(8, "Ref17p121p4");

              }
          }
      }
  }

   genTaPhuHuBatStar( otherStar: TuViStar) {
      if (this.hasManyGoodSupportStars()) {
          this.addSupportBaseComment(8, "Ref17p122p1");
          if (this.isMan()) {
              this.addBaseComment("Ref17p122p6");
          } else {
              this.addBaseComment("Ref17p122p8");
          }
      }
      if (this.hasSupportStars0(TuViStarHelper.TUPHURXUONGKHUCTAHUUKHOAQUYENLOC)) {
          this.addSupportBaseComment(9, "Ref17p122p2");
          this.addBaseComment("Ref17p122p5");
      }

      if (this.hasSupportStars0(TuViStarHelper.CONGUYETDONGLUONGTAHUU)) {
          this.addSupportBaseComment(7, "Ref17p122p3");
      }
      if (this.hasHostileStars() || this.hasCombinedSatTinh) {
          this.addSupportBaseComment(3, "Ref17p122p4");
          this.addBaseComment("Ref17p122p5");
          if (this.isMan()) {
              this.addBaseComment("Ref17p122p7");
          } else {
              this.addBaseComment("Ref17p122p9");
          }
      }
      if (this.hasStar(otherStar)) {
          if (this.hasManyGoodSupportStars() || this.hasSupportStars0(TuViStarHelper.KHOAQUYENLOC)) {
              this.addSupportBaseComment(8, "Ref17p123p2");
          }
          this.addSupportBaseComment(8, "Ref17p123p7");
          if (this.palace.branche===Branche.DOG) {
              this.incPoints(9);
          }
      }

  }


   genTaHuuNextPrev() {
      if (this.hasPrevNextStar(TuViStar.TAPHU) && this.hasPrevNextStar(TuViStar.HUUBAT)) {
          this.addSupportBaseComment(8, "Ref17p124p1");
          if (this.hasStar(TuViStar.TUVI)) {
              this.addSupportBaseComment(8, "Ref17p124p2");
          }
      }
  }


   genTaPhuStar() {
      if (this.hasStar(TuViStar.TAPHU)) {
        this.genTaPhuHuBatStar(TuViStar.HUUBAT);
      }
      this.genTaHuuNextPrev();
  }

   genHuuBatStar() {
      if (this.hasStar(TuViStar.HUUBAT)) {
        const branche = this.palace.branche;
        this.genTaPhuHuBatStar(TuViStar.TAPHU);
          if (this.hasStar(TuViStar.THIENTUONG)) {
              this.addSupportBaseComment(4, "Ref17p123p8a");
              if (BrancheHelper.isSnakePig(branche)) {
                  this.addBaseComment("Ref17p123p8b");
              }
              if (BrancheHelper.isRabbitCock(branche)) {
                  this.addBaseComment("Ref17p123p8c");
              }
          }
      }
      this.genTaHuuNextPrev();
  }

   genKinhDuongStar() {
      if (this.hasStar(TuViStar.KINHDUONG)) {
          const status = TuViStar.KINHDUONG.diaStatus;
          if (status===TuViStar.DACDIA) {
              this.addSupportBaseComment(7, "Ref17p124p4");
              if (this.isMan()) {
                  if (this.hasStarWithStatus(TuViStar.TUVI, TuViStar.DACDIA) ||
                          this.hasStarWithStatus(TuViStar.THIENPHUR, TuViStar.DACDIA)) {
                      this.addSupportBaseComment(7, "Ref17p125p2");
                  }
              } else {
                  this.addSupportBaseComment(8, "Ref17p125p4");
              }
          } else {
              this.addSupportBaseComment(4, "Ref17p124p5");
              if (this.isMan()) {
                  if ((!this.hasTuanTrietKhong) ||
                          this.hasManyGoodSupportStars()) {
                      this.addSupportBaseComment(3, "Ref17p125p3a");
                       const starSet = [
                              TuViStar.DALA, TuViStar.HOATINH, TuViStar.LINHTINH,
                              TuViStar.KIEPSAT, TuViStar.DIAKIEP, TuViStar.THATSAT
                      ];
                      if (this.hasSupportStars0(starSet)) {
                          this.incPoints(1);
                      }
                  }
              } else {
                  this.addSupportBaseComment(4, "Ref17p125p5");
              }
          }
          const branche = this.palace.branche;
          if (BrancheHelper.isTigerMonkey(branche)) {
              this.addSupportBaseComment(4, "Ref17p124p6a");
              if (this.hasManyGoodStars) {
                  this.addBaseComment("Ref17p124p6b");
              }
          }
          if (BrancheHelper.isRabbitCock(branche)) {
              this.addSupportBaseComment(4, "Ref17p124p7");
          }
          if (this.hasAllStars(TuViStarHelper.NHATNGUYET)) {
              this.addSupportBaseComment(4, "Ref17p124p8");
          }
          if (this.hasStars(TuViStarHelper.CULIEMKY, 2)) {
              this.addSupportBaseComment(4, "Ref17p124p9");
              if (BrancheHelper.isDragonDog(this.getyBranche()) ) {
                  this.incPoints(3);
              }
          }
          if (this.isMan()) {
              this.addSupportBaseComment(7, "Ref17p125p1");
          }
          if (this.isPartOfTuMo) {
              if (this.hasManyGoodSupportStars()) {
                  this.addSupportBaseComment(8, "Ref17p125p6");
                  if (BrancheHelper.isOxDragonGoatDog(branche)) {
                      this.incPoints(10);
                  }
              }
          }

          if (BrancheHelper.isRatHorseRabbitCock(branche)) {
              this.addSupportBaseComment(4, "Ref17p125p7");
          }
          if (this.hasSatTinh || this.hasSupportStars0(TuViStarHelper.SATHINH)) {
              if (this.palace.branche===Branche.HORSE) {
                  this.addSupportBaseComment(3, "Ref17p125p8");
              }
          } else {

              if (this.hasManyGoodSupportStars() || this.hasSupportStars(TuViStarHelper.KHOAQUYENLOCMA, 1)) {
                  if (this.getyTrunk()===Trunk.BING || this.getyBranche()===Branche.DOG) {
                      this.addSupportBaseComment(8, "Ref17p126p1a");
                  } else {
                      this.addSupportBaseComment(3, "Ref17p126p1b");
                  }
              }
          }

          if (this.hasAllStars([TuViStar.THIENDONG, TuViStar.THAIAM]) &&
                  this.hasSupportStars0([TuViStar.PHUONGCAC, TuViStar.GIAITHAN])) {
              if (BrancheHelper.isRatHorse(branche)) {
                  if (this.getyBranche()===Branche.HORSE) {
                      this.addSupportBaseComment(9, "Ref17p126p2");
                  } else {
                      this.addSupportBaseComment(7, "Ref17p126p2");
                  }
              }
          }
          if (this.hasPrevNextStars(TuViStarHelper.LIEMTUONG, 2)) {
              this.addSupportBaseComment(3, "Ref17p126p3");
          }
          if (this.isPartOfTuMo) {
              if (this.hasAllStars(TuViStarHelper.VUTHAMHOA)) {
                  this.addSupportBaseComment(9, "Ref17p126p4");
              }
          }
          if (this.hasSupportStars0(TuViStarHelper.KINHDAHOALINH)) {
              if (this.hasFavorableStars()) {
                  this.addSupportBaseComment(6, "Ref17p127p1a");
              } else {
                  if (this.hasHostileStars()) this.addSupportBaseComment(2, "Ref17p127p1b");
              }
          }
          if (this.hasKiepStar()) {
              this.addSupportBaseComment(4, "Ref17p127p2");
          }
          if (this.hasSupportStars0(TuViStarHelper.HUTUEKHACH)) {
              this.addSupportBaseComment(3, "Ref17p127p5");
          }
          if (this.hasStar(TuViStar.LUCSI)) {
              this.addSupportBaseComment(7, "Ref17p127p6");
          }
      }
  }

   genDalaStar() {
      if (this.hasStar(TuViStar.DALA)) {
          const status = TuViStar.DALA.diaStatus;
          if (status===TuViStar.DACDIA) {
              this.addBaseComment("Ref17p128p1");
          } else {
              if (status===TuViStar.HAMDIA) {
                  this.addSupportBaseComment(3, "Ref17p128p2");
                  if (this.hasHostileStars() || this.hasSupportStars0(TuViStarHelper.HOAKINHKHONGKIEPKYHINH)) {
                      this.addSupportBaseComment(3, "Ref17p128p3");
                  }
              }
          }

      }
  }

   genHoaLinhTinhStar(status: number,  otherStar:TuViStar) {
      if (status===TuViStar.DACDIA) {
          this.addSupportBaseComment(6, "Ref17p128p4");
          if (BrancheHelper.isTigerRabbit(this.getyBranche()) ||
          BrancheHelper.isSnakeHorse(this.getyBranche())) {
              if (this.hasManyGoodSupportStars()) {
                  this.incPoints(9);
              }
          }
          if (this.hasStarWithStatus(otherStar, TuViStar.DACDIA)) {
              this.addBaseComment("Ref17p129p7");
          }
      }
      if (status===TuViStar.HAMDIA) {
          this.addSupportBaseComment(3, "Ref17p128p7");
      }
      if (this.isPartOfTuMo && this.hasAllStars([TuViStar.THAMLANG, TuViStar.VUKHUC])) {
          this.addSupportBaseComment(9, "Ref17p129p1");
      }
      if (BrancheHelper.isOxGoat(this.palace.branche)) {
          if (this.hasAllStars(TuViStarHelper.THAMVUVIET)) {
              this.addSupportBaseComment(7, "Ref17p130p1a");
              if (this.hasDirectSupportStar(TuViStar.KIEPSAT) ||
                      this.hasDirectSupportStar(TuViStar.DIAKIEP)) {
                  this.addSupportBaseComment(3, "Ref17p130p1b");
              }
          }
      }
  }

   genHoaTinhStar() {
      if (this.hasStar(TuViStar.HOATINH)) {
          const status = TuViStar.HOATINH.diaStatus;
          this.genHoaLinhTinhStar(status, TuViStar.LINHTINH);
          if (status===TuViStar.DACDIA) {
              if (this.hasDirectSupportStar(TuViStar.LINHTINH)) {
                  this.addSupportBaseComment(9, "Ref17p129p7");
              }
          }
          if (this.palace.branche===Branche.PIG && this.hasStar(TuViStar.TUYET)) {
              if (this.hasSupportStars0(TuViStarHelper.THAMHINH)) {
                  this.addSupportBaseComment(8, "Ref17p130p4");
              }
          }
      }
  }

   genLinhTinhStar() {
      if (this.hasStar(TuViStar.LINHTINH)) {
          const status = TuViStar.LINHTINH.diaStatus;
          this.genHoaLinhTinhStar(status, TuViStar.HOATINH);
          if (this.hasStar(TuViStar.THIENMA)) {
              if (this.hasSupportStars0(TuViStarHelper.KINHDA)) {
                  this.addSupportBaseComment(4, "Ref17p130p5");
              }
          }
      }
  }

   genDiaKiepDiaKhongStar(status: number,  otherStar:TuViStar) {
      if (status===TuViStar.DACDIA) {
          this.addBaseComment("Ref17p130p6");
          if (this.hasStarWithStatus(TuViStar.TUVI, status) ||
                  this.hasStarWithStatus(TuViStar.THIENPHUR, status)) {
              this.addSupportBaseComment(3, "Ref17p131p2");
          }
          this.addBaseComment("Ref17p131p6");
      }
      if (status===TuViStar.HAMDIA) {
          this.addSupportBaseComment(4, "Ref17p130p7");
          if (this.hasStarWithStatus(TuViStar.TUVI, status) ||
                  this.hasStarWithStatus(TuViStar.THIENPHUR, status)) {
              this.addSupportBaseComment(3, "Ref17p131p3");
          }
          if (this.isMan()) {
              this.addSupportBaseComment(5, "Ref17p131p7a");
              if (this.hasHostileStars()) {
                  this.addSupportBaseComment(4, "Ref17p131p7b");
              }
          } else {
              this.addBaseComment("Ref17p131p9");
          }
          this.addSupportBaseComment(3, "Ref17p132p3");
      }
      this.addBaseComment("Ref17p131p1");
      if (!this.isMan()) {
          if (this.hasSupportStars0(TuViStarHelper.HONGDAO)) {
              this.addSupportBaseComment(4, "Ref17p131p10");
          }
      }
      if (BrancheHelper.isSnakePig(this.palace.branche)) {
          if (this.hasStar(otherStar)) {
              this.addBaseComment("Ref17p132p2");
          }
          if (this.hasAllStars(TuViStarHelper.TUONGMAKHOA)) {
              this.addSupportBaseComment(8, "Ref17p132p8");
          }
      }
      if (this.hasStar(otherStar) && this.hasStars(TuViStarHelper.DAOHONGDALINH, 3)) {
          this.addSupportBaseComment(4, "Ref17p133p2");
      }

  }

   genDiaKiepStar() {
      if (this.hasStar(TuViStar.DIAKIEP)) {
          const status = TuViStar.DIAKIEP.diaStatus;
          this.genDiaKiepDiaKhongStar(status, TuViStar.DIAKHONG);
          if (this.hasStar(TuViStar.THIENCO) && this.hasSupportStars0([TuViStar.HOATINH])) {
              this.addSupportBaseComment(4, "Ref17p132p7");
          }
          if (this.hasStar(TuViStar.THAMLANG)) {
              this.addSupportBaseComment(4, "Ref17p132p8");
          }
          if (this.hasSupportStars0(TuViStarHelper.KINHKIEPKHONGHUMA)) {
              this.addSupportBaseComment(4, "Ref17p133p1");
          }
      }
  }

   genDiaKhongStar() {
      if (this.hasStar(TuViStar.DIAKHONG)) {
          const status = TuViStar.DIAKHONG.diaStatus;
          this.genDiaKiepDiaKhongStar(status, TuViStar.DIAKIEP);
      }
  }

   genRef17p135p7_8( addStar: TuViStar) {
      if (this.isMan()) {
          if (BrancheHelper.isTigerRabbit(this.palace.branche)) {
              if (this.hasSupportStars0(TuViStarHelper.TUKHUC)) {
                  this.addSupportBaseComment(8, "Ref17p135p7");
                  if (this.hasSupportStars0([addStar])) {
                      this.addSupportBaseComment(6, "Ref17p135p8");
                      if (TrunkHelper.isDingJi(this.getyTrunk())) {
                          this.incPoints(8);
                      }
                  }
              }
          }
      }

  }

   genRef17p136p2_3( otherStar: TuViStar) {
      if (this.hasSupportStars0(TuViStarHelper.COLUONG)) {
          this.addSupportBaseComment(7, "Ref17p136p2");
          if (this.hasDirectSupportStar(otherStar)) {
              this.addSupportBaseComment(8, "Ref17p136p3");
          }
      }
  }

   genRef17p136p5_7( otherStar: TuViStar) {
      if (this.hasDirectSupportStar(otherStar)) {
          this.addSupportBaseComment(6, "Ref17p136p5");
          if (this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(8, "Ref17p136p6");
          } else {
              if (this.hasHostileStars()) {
                  this.addSupportBaseComment(4, "Ref17p136p7");
              }
          }
      }
  }

   genHoaLocStar() {
      if (this.hasStar(TuViStar.HOALOC)) {

          const status = TuViStar.HOALOC.diaStatus;
          this.addBaseComment("Ref17p133p3");
          if (this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(8, "Ref17p133p4");
          }
          if (this.hasHaoStar() || this.hasCombinedSatTinh) {
              this.addSupportBaseComment(3, "Ref17p133p5");
          }
          if (this.isPartOfTuMo) {
              if (this.hasStars(TuViStarHelper.THAMVU,1)) {
                  this.addSupportBaseComment(8, "Ref17p135p3");
              }
          }
          if (status===TuViStar.DACDIA) {
              this.addBaseComment("Ref17p135p4");
          }
          this. genRef17p135p7_8(TuViStar.LOCTON);
          if (this.hasStarWithStatus(TuViStar.THIENLUONG, TuViStar.MIEUDIA)) {
              this.addSupportBaseComment(7, "Ref17p136p1");
          }
          this.genRef17p136p2_3(TuViStar.LOCTON);
          this.genRef17p136p5_7(TuViStar.HOAQUYEN);
          this.genRef17p137p1(TuViStar.HOAQUYEN);
      }
  }

   genHoaQuyenStar() {
      if (this.hasStar(TuViStar.HOAQUYEN)) {
          this.addBaseComment("Ref17p133p6");
          if (this.hasStar(TuViStar.TUVI) && this.hasStar(TuViStar.THIENPHUR)) {
              this.addSupportBaseComment(8, "Ref17p133p7");
          }
          if (this.hasSupportStars0(TuViStarHelper.CUKHUC)) {
              this.addSupportBaseComment(7, "Ref17p133p8");
          }
          if (this.hasCombinedSatTinh) {
              this.addSupportBaseComment(3, "Ref17p133p9");
          }
          if (this.hasTuanTrietKhong) {
              this.addSupportBaseComment(4, "Ref17p133p10");
          }
          this.genRef17p136p5_7(TuViStar.HOALOC);
          if (this.hasStar(TuViStar.THIENKHOC)) {
              this.addSupportBaseComment(8, "Ref17p136p8");
              if (BrancheHelper.isRatHorse(this.palace.branche)) {
                  this.incPoints(9);
              }
          }
      }
  }

   genRef17p137p1( otherStar: TuViStar) {
      if (this.hasDirectSupportStar(otherStar)) {
          if (this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(8, "Ref17p137p1");
          }
      }
  }

   genRef17p137p3() {
      if (this.hasPrevNextStars(TuViStarHelper.KHOALOC, 2)) {
          this.addBaseComment("Ref17p137p3");
      }
  }

   genRef17p137p5_6() {

      if (this.hasSupportStars0(TuViStarHelper.KHOAQUYENLOC)) {
          if (this.hasAllStars([TuViStar.HOAKY, TuViStar.KINHDUONG])) {
              this.addSupportBaseComment(4, "Ref17p137p6");
          } else {
              this.addSupportBaseComment(9, "Ref17p137p5");
          }
      }
  }

   genHoaKhoaStar() {
      if (this.hasStar(TuViStar.HOAKHOA)) {
          this.addBaseComment("Ref17p134p1");

          if (this.hasManyGoodSupportStars() || this.hasSupportStars0(TuViStarHelper.TUPHURXUONGKHUCKHOIVIET)) {
              this.addSupportBaseComment(8, "Ref17p134p2");
              if (this.hasCombinedSatTinh) {
                  this.incPoints(9);
              }
          }
          this.genRef17p137p1(TuViStar.HOALOC);
          if (this.hasSupportStarWithTransform(TuViStar.HOALOC)) {
              this.addSupportBaseComment(8, "Ref17p137p2");
          }
          if (this.hasOppositePalaceStar(TuViStar.HOAQUYEN)) {
              this.addSupportBaseComment(7, "Ref17p137p4");
          }
          if (this.hasHostileStars() || this.hasCombinedSatTinh) {
              this.addSupportBaseComment(4, "Ref17p137p7");
          }
      }
  }

   genHoaKyStar() {
      if (this.hasStar(TuViStar.HOAKY)) {
          const status = TuViStar.HOAKY.diaStatus;
          this.addBaseComment("Ref17p134p3");
          if (this.hasSupportStars0(TuViStarHelper.NHATNGUYET)) {
              this.addSupportBaseComment(4, "Ref17p134p4");
              if (status===TuViStar.HAMDIA) {
                  if (this.hasStarWithForceStatus(TuViStar.THAIDUONG, false) &&
                  this.hasStarWithForceStatus(TuViStar.THAIAM, false)) {
                      this.addBaseComment("Ref17p134p6");
                      if (this.hasStar(TuViStar.THIENHINH)) {
                          this.addSupportBaseComment(3, "Ref17p134p7");
                      }
                  }
              }
          }
          if (status===TuViStar.DACDIA) {
              if (this.hasStarWithForceStatus(TuViStar.THAIDUONG, true) && this.hasStarWithForceStatus(TuViStar.THAIAM, true)) {
                  this.addSupportBaseComment(8, "Ref17p134p5");
              }
          }
          if (this.hasStar(TuViStar.CUMON) || this.hasStar(TuViStar.THAMLANG)) {
              this.addSupportBaseComment(4, "Ref17p134p8");
          }
          if (this.hasHostileStars()) {
              this.addSupportBaseComment(4, "Ref17p134p9");
              if (status===TuViStar.HAMDIA) {
                  this.incPoints(2);
              }
          }
          if (this.hasSupportStars0(TuViStarHelper.XUONGKHUCKHOIVIET)) {
              this.addSupportBaseComment(5, "Ref17p134p10");
          }
          if (this.hasSupportStars0(TuViStarHelper.TUEDA)) {
              this.addSupportBaseComment(3, "Ref17p134p11");
          }
          if (this.hasAllStars(TuViStarHelper.HONGDAO)) {
              this.addSupportBaseComment(5, "Ref17p135p1");
          }
          if (BrancheHelper.isRatPig(this.palace.branche)) {
              if (this.hasDirectSupportStar(TuViStar.HOAKHOA)) {
                  this.addSupportBaseComment(7, "Ref17p138p1");
              }
              if (this.palace.branche===Branche.RAT) {
                  if (this.hasManyGoodSupportStars() && this.hasSupportStars0(TuViStarHelper.KHOALUONG)) {
                      this.addSupportBaseComment(9, "Ref17p138p2");
                  }
              }
          }

      }
  }


   genDaiHaoTieuHaoStar(status: number) {
      this.addSupportBaseComment(5, "Ref17p138p3");
      if (status===TuViStar.DACDIA) {
          this.addSupportBaseComment(6, "Ref17p138p4");
          if (BrancheHelper.isTigerMonkey(this.getyBranche())) {
              this.addSupportBaseComment(7, "Ref17p138p5");
          }
      }
      if (this.hasCombinedSatTinh) {
          this.addSupportBaseComment(3, "Ref17p138p6");
      }
      if (this.hasSupportStars0(TuViStarHelper.HOALINH)) {
          this.addSupportBaseComment(5, "Ref17p138p7");
      }
      if (this.hasStar(TuViStar.TUYET)) {
          this.addSupportBaseComment(4, "Ref17p138p8");
          if (this.hasNoChinhTinh()) {
              this.addSupportBaseComment(4, "Ref17p138p9");
          }
      }
  }

   genDaiHaoStar() {
      if (this.hasStar(TuViStar.DAIHAO)) {
          const status = TuViStar.DAIHAO.diaStatus;
          this.genDaiHaoTieuHaoStar(status);
      }
  }

   genTieuHaoStar() {
      if (this.hasStar(TuViStar.TIEUHAO)) {
          const status = TuViStar.TIEUHAO.diaStatus;
          this.genDaiHaoTieuHaoStar(status);
      }
  }

   genTangMonBachHo(status: number,  otherStar:TuViStar) {
      this.addSupportBaseComment(5, "Ref17p139p1");
      if (status===TuViStar.DACDIA && otherStar.diaStatus===TuViStar.DACDIA) {
          this.addSupportBaseComment(8, "Ref17p139p2");
      }
      if (status===TuViStar.HAMDIA) {
          if (this.hasCombinedSatTinh) {
              this.addSupportBaseComment(2, "Ref17p139p3");
          }
      }
      if (this.hasDirectSupportStar(TuViStar.KINHDUONG) || this.hasDirectSupportStar(TuViStar.THIENHINH)) {
          this.addSupportBaseComment(5, "Ref17p139p4");
      }
      if (this.isMan()) {
          if (status===TuViStar.DACDIA && this.hasStarWithStatus(otherStar, TuViStar.DACDIA)) {
              this.addSupportBaseComment(5, "Ref17p139p8a");
          }
      } else {
          this.addSupportBaseComment(3, "Ref17p139p9");
      }
  }

   genTangMonStar() {
      if (this.hasStar(TuViStar.TANGMON)) {
          const status = TuViStar.TANGMON.diaStatus;
          this.genTangMonBachHo(status, TuViStar.BACHHO);
      }
  }


   genBachHoStar() {
      if (this.hasStar(TuViStar.BACHHO)) {
          const status = TuViStar.BACHHO.diaStatus;
          this.genTangMonBachHo(status, TuViStar.TANGMON);
          if (this.isBornInNight()) this.incPoints(8);
          if (this.hasStar(TuViStar.THAMLANG)) {
              this.addSupportBaseComment(3, "Ref17p139p5");
          }
          if (this.hasStar(TuViStar.TAUTHU)) {
              this.addSupportBaseComment(7, "Ref17p139p6");
          }
          if (this.hasStar(TuViStar.PHILIEM)) {
              this.addSupportBaseComment(8, "Ref17p139p7");
          }
          if (status===TuViStar.DACDIA) {
              this.addSupportBaseComment(5, "Ref17p139p8b");
          }
          if (this.hasManyGoodSupportStars()) {
              this.addSupportBaseComment(7, "Ref17p139p8c");
          }
      }
  }

   genKhocHuStar(status: number) {

      if (status===TuViStar.DACDIA) {
          this.addSupportBaseComment(7, "Ref17p140p1");
          if (BrancheHelper.isRatHorse(this.palace.branche)) {
              this.addBaseComment("Ref17p140p2a");
              if (this.hasStars(TuViStarHelper.SATPHA,1)) {
                  this.addSupportBaseComment(8, "Ref17p140p2b");
              }
          }
      }
      if (status===TuViStar.HAMDIA) {
          this.addSupportBaseComment(4, "Ref17p140p3");
          if (BrancheHelper.isDragonDog(this.palace.branche)) {
              this.addSupportBaseComment(3, "Ref17p140p4");
          }
          if (BrancheHelper.isTigerMonkey(this.palace.branche)) {
              if (this.hasSupportStars0([TuViStar.DALA])) {
                  this.addSupportBaseComment(6, "Ref17p140p6");
              }
          }
      }
      if (this.hasDirectSupportStar(TuViStar.THIENCO)) {
          this.addSupportBaseComment(4, "Ref17p140p5");
      }
      if (this.hasSupportStars0(TuViStarHelper.HINHMA)) {
          this.addSupportBaseComment(7, "Ref17p140p7");
      }
  }

   genThienKhocStar() {
      if (this.hasStar(TuViStar.THIENKHOC)) {
          const status = TuViStar.THIENKHOC.diaStatus;
          this.genKhocHuStar(status);
          if (this.hasSupportStars0(TuViStarHelper.KHACHKIEPPHUFCUNHAT)) {
              this.addSupportBaseComment(3, "Ref17p141p2");
          }
      }
  }

   genThienHuStar() {
      if (this.hasStar(TuViStar.THIENHU)) {
          const status = TuViStar.THIENKHOC.diaStatus;
          this.genKhocHuStar(status);
          this.addSupportBaseComment(5, "Ref17p140p8");
          if (status===TuViStar.DACDIA) {
              if (this.hasDirectSupportStar(TuViStar.LOCTON) || this.hasDirectSupportStar(TuViStar.HOALOC)) {
                  this.addSupportBaseComment(8, "Ref17p140p9");
              }
              this.addSupportBaseComment(5, "Ref17p140p10");
          }
          if (this.hasSupportStars0(TuViStarHelper.KINHTUEKHACH)) {
              this.addSupportBaseComment(4, "Ref17p141p3");
          }
      }
  }


   genThienHinhStar() {
      if (this.hasStar(TuViStar.THIENHINH)) {
          const status = TuViStar.THIENHINH.diaStatus;
          this.genRef17p110p2(status, TuViStar.THATSAT);
      }
  }

   genThienMaStar() {
      if (this.hasStar(TuViStar.THIENMA)) {
        this.genRef121p5_6(TuViStar.LOCTON);
      }
  }

   genRef17p67p6() {
      if (this.hasManyGoodStars) {
          if (this.hasPrevNextStar(TuViStar.TUVI) && this.hasPrevNextStar(TuViStar.THIENPHUR)) {
              this.addSupportBaseComment(8, "Ref17p67p6");
          }
      }
  }

   genRef17p67p7() {
      if (this.hasManyGoodStars) {
          if (this.hasSupportStars(TuViStarHelper.TUPHUR, 2)) {
              this.addSupportBaseComment(8, "Ref17p67p7");
          }
      }
  }

   genRef17p127p3_4() {
      if (this.hasPrevNextStar(TuViStar.KINHDUONG) && this.hasPrevNextStar(TuViStar.DALA)) {
          this.addSupportBaseComment(3, "Ref17p127p4");
          if (this.hasHostileStars()) {
              this.addSupportBaseComment(4, "Ref17p127p3");
          }
      }
  }

   genRef17p130p2_3() {
      if (this.hasSupportStars0(TuViStarHelper.KINHHOALINH)) {
          this.addSupportBaseComment(4, "Ref17p130p2");
      }
      if (this.hasPrevNextStar(TuViStar.HOATINH) && this.hasPrevNextStar(TuViStar.LINHTINH)) {
          this.addSupportBaseComment(4, "Ref17p130p3");
      }
  }

   genRef17p131p4_5() {
      if (this.hasSupportStars0(TuViStarHelper.KHONGKIEP)) {
          if (this.hasCombinedSatTinh) {
              this.addBaseComment("Ref17p131p4a");
              if (TuViStar.DIAKIEP.diaStatus===TuViStar.HAMDIA &&
                      TuViStar.DIAKHONG.diaStatus===TuViStar.HAMDIA) {
                  this.addSupportBaseComment(3, "Ref17p131p4b");
              }
          }
          if (this.hasSupportStars0(TuViStarHelper.HONGDAO)) {
              this.addSupportBaseComment(3, "Ref17p131p5");
          }
      }
  }

   genRef17p132p6() {
      if (BrancheHelper.isSnakePig(this.palace.branche)) {
          if (this.hasPrevNextStars(TuViStarHelper.KHONGKIEP,1)) {
              this.addSupportBaseComment(4, "Ref17p132p6");
          }
      }
  }

   genRef17p135p6() {
      if ( this.isGoodStarsFavorable()) {
          if ( this.hasSupportStarWithTransform(TuViStar.HOALOC) &&
          this.hasOppositePalaceStar(TuViStar.LOCTON) ||
          this.hasSupportStarWithTransform(TuViStar.LIEMTRINH) &&
          this. hasOppositePalaceStar(TuViStar.HOALOC)) {
              this.addSupportBaseComment(8, "Ref17p135p6");
          }
      }
  }

   genRef17p140p14() {
      if (BrancheHelper.isRabbitCock(this.palace.branche)) {
          if (this.hasHaoStar()) {
              if (this.hasAllStars(TuViStarHelper.CUCO)) {
                  this.addSupportBaseComment(8, "Ref17p140p14");
                  if ((!this.hasAllStars(TuViStarHelper.LOCTONHOALOC))) {
                      this.incPoints(9);
                  }
              }
          }
      }
  }

   genVoChinhDieu() {
      if (this.hasNoChinhTinh()) {
          if (this.hasTuanTrietKhong) {
              if (this.hasSupportStars0(TuViStarHelper.THIENDIAKHONG)) {
                  if (this.hasSupportStars0(TuViStarHelper.LOCTONHOALOC)) {
                      this.addBaseComment("Ref17p136p4");
                  } else {
                      this.incPoints(8 );
                  }
              }
          }
      }
  }

  override genNgheoHenCuc() {
      super.genNgheoHenCuc();
      if (this.hasStarWithForceStatusArr(TuViStarHelper.LIEMVU, false,1)) {
          if (this.hasCombinedSatTinh) {
              this.addSupportBaseComment(3, "Ref17p263p1");
          }
      }
      if (this.hasStarWithForceStatusArr(TuViStarHelper.NHATNGUYET, false,1) ||
      this.hasOppositeStar(TuViStarHelper.NHATNGUYET, false) ||
              this.hasPrevNextStarArr(TuViStarHelper.NHATNGUYET, false)) {
          this.addSupportBaseComment(3, "Ref17p263p2");
      }
      if (this.hasHostileStars()) {
          this.addSupportBaseComment(3, "Ref17p263p3");
      }
      if (this.hasAllStars(TuViStarHelper.LOCTONHOALOC) && this.hasAllStars(TuViStarHelper.KHONGKIEP)) {
          this.addSupportBaseComment(3, "Ref17p263p4");
      }
      if (this.hasStar(TuViStar.THIENMA) && this.hasTuanTrietKhong) {
          this.addSupportBaseComment(3, "Ref17p263p5");
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
   genRef17p40() {
      let supportForce = 0.0;
      if (this.palace.chinhTinhCount > 0) {
          supportForce = this.palace.getPrimaryStarElementSupportForce(this.getTuViElement());
      } else {
          const oppositePalace = this.palace.getOppositePalace();
          if (oppositePalace.chinhTinhCount > 0) {
              supportForce = oppositePalace.getPrimaryStarElementSupportForce(this.getTuViElement());
          }
      }
      if (supportForce != 0) {
          const points = this.convertToPoint(supportForce);
          this.incPoints(points);
      }

  }


   genRef17p39() {
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

   genRef17Complement() {

      if (this.palace.isMenh()) {
          if (this.hasGoodSupportStars(TuViStarHelper.TUPHUVUTUONG, 4)) {
              this.addSupportBaseComment(10, "Ref17p256p1a");

              if (this.hasGoodSupportStars(TuViStarHelper.XUONGKHUCKHOIVIETTAHUUKHOAQUYENLOCDUCCACHONGDAOXXX, 6)) {
                  this.addSupportBaseComment(10, "Ref17p256p1b");
              }
          }
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

  this.genRef17p39();
  this.genRef17p40();
  this.genRef17p66p5();
  this.genRef17p60p11_p13();
  this.genRef17p61p14();
  this.genRef17p61p16N17();

  this.genRef17p65p4();
  this.genRef17p60p4N5();
  this.genRef17p60p9();
  this.genRef17p60p10();
  this.genRef17p67p6();
  this.genRef17p67p7();
    if (this.hasNoChinhTinh()) {
      this.genVoChinhDieu();
    } else {
        // TuVi Ring
        this.genTuviStar();
        this.genLiemTrinhStar();
        this.genThienDongStar();
        this.genVuKhucStar();
        this.genThaiDuongStar();
        this.genThienCoStar();

        // ThienPhu Ring
        this.genThienPhurStar();
        this.genThaiAmStar();
        this.genThamLangStar();
        this.genCuMonStar();
        this.genRef20p151c7a();
        this.genThienTuongStar();
        this.genThienLuongStar();
        this.genThatSatStar();
        this.genPhaQuanStar();
    }
    this.genRef17p82p3();
    this.genRef17p87p6();
    this.genVanXuongStar();
    this.genVanKhucStar();
    this.genThienKhoiStar();
    this.genThienVietStar();
    this.genLocTonStar();
    this.genTaPhuStar();
    this.genHuuBatStar();
    this.genKinhDuongStar();
    this.genRef17p126p5();
    this.genRef17p127p3_4();
    this.genDalaStar();
    this.genHoaTinhStar();
    this.genLinhTinhStar();
    this.genRef17p130p2_3();
    this.genDiaKiepStar();
    this.genDiaKhongStar();
    this.genRef17p131p4_5();
    this.genRef17p132p6();
    this.genHoaLocStar();
    this.genHoaQuyenStar();
    this.genHoaKhoaStar();
    this.genRef17p137p3();
    this.genRef17p137p5_6();
    this.genHoaKyStar();
    this.genRef17p135p6();
    this.genDaiHaoStar();
    this.genTieuHaoStar();
    this.genVoChinhDieu();
    this.genTangMonStar();
    this.genBachHoStar();
    this.genThienKhocStar();
    this.genThienHuStar();
    this.genRef17p140p14();
    this.genRef17Complement();
    this.genRef13p86p3();

    // To be completed
    this.genThienHinhStar();
    this.genThienMaStar();
    this.genPhuCuc();
    this.genQuiCuc();
    this.genNgheoHenCuc();
    this.genRef17p61p18();
    this.genRef17p62p19();
}

commentMenhOnThan(than: TuViPalaceObservationBase) {
  this.genRef13p86ForThan(than);
  this.genRef17p61p15ForThan(than);
}

override initComment() {
    super.initComment();
    this.thanPalace=this.getThanPalace();
    this.thanPalaceObs = this.thanPalace.palaceObservation;
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
    if ( !isSameMenhThanPalace) {
      this.genMenh2ThanInfluence();
    }
}

}
