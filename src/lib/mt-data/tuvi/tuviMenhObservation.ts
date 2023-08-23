
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

   genRef17p65p4() {
      if (this.hasSupportStars(TuViStarHelper.TUPHURKHOAQUYENHINHANHONGKHOI, 8)) {
          if (this.thanPalaceObs.hasSupportStars(TuViStarHelper.TUPHURKHOAQUYENHINHANHONGKHOI, 8)) {
              this.addSupportBaseComment(10, "Ref17p65p4");
          }
      }
  }

   genRef17p65Other() {
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
      }
  }


   genRef17p69p4( status: number) {
      if (status===TuViStar.HAMDIA && (
              this.hasStar(TuViStar.HOATINH) || this.hasStar(TuViStar.PHAQUAN) && this.hasStar(TuViStar.COTHAN))) {
          this.addSupportBaseComment(2, "Ref17p69p4");
      }
  }

   genRef17p72() {

      if (this.hasStar(TuViStar.NGUYETDUC)) {

          if (this.palace.branche===Branche.RAT) {

              if (! this.isMan()) {
                  //NOT FOUND				if ( this.hasSupportStars0(TuViStar.HOKHOCRIEUTANG,2)) {
                  if ( this.hasSupportStars(TuViStarHelper.HOKHOCRIEUTANG, 1)) {
                  }
              }

          }
      }
  }



  isRatToHorse (branche: Branche) {
		const  ord = branche.ordinal();
		return ord>=Branche.RAT.ordinal() && ord<=Branche.HORSE.ordinal() ;
	}


   genRef17p110p1(status: number) {
      if (status >= TuViStar.DACDIA) {
          if (this.hasStar(TuViStar.THIENHINH)) {
              this.addSupportBaseComment(8, "Ref17p110p1");
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
          this.genRef17p66p4();
          this.genRef17p66p5();
          this.genRef17p69p4(status);
          this.genRef17p112();
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
          if (null!=oppositePalace&&oppositePalace.chinhTinhCount > 0) {
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
    if (this.hasNoChinhTinh()) {
    } else {
        // TuVi Ring
        this.genTuviStar();

        // ThienPhu Ring
        this.genRef20p151c7a();
        this.genPhaQuanStar();
    }
    this.genRef17Complement();
    this.genRef13p86p3();

    // To be completed
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

  override isAttrPresent(attrKey: string,params: string[]): boolean {
    switch (attrKey) {
      default:
          return super.isAttrPresent(attrKey,params)
      }
      return false;
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
    if ( !isSameMenhThanPalace) {
      this.genMenh2ThanInfluence();
    }
    this.filterObservation("TuVi.Base", false);
}

}
