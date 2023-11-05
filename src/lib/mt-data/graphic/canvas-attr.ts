import { PaintAttr } from "./paint-attr";

export class CanvasAttr {
  canvas: any;
  context: any;
  rotateR: number;
  paintAttr: PaintAttr;
  paintStack: PaintAttr[];

  constructor(
    canvas: any,
    context: any,
    lineWidth = 1,
    strokeStyle = "#ffffff",
    txtColor = "#000000",
    textFont = "12px serif",
    textFontTitle = "12px bold",
    elementFillStyle = "#000000"
  ) {
    this.canvas = canvas;
    this.context = context;
    this.paintStack = [];
    this.pushPaintAttr({
      lineWidth,
      strokeStyle,
      txtColor,
      textFont,
      textFontTitle,
      elementFillStyle,
    });
    this.rotateR = 0;
  }

  textWidth(str: string): number {
    return this.context.measureText(str).width;
  }

  pushPaintAttr({
    lineWidth = this.paintAttr.lineWidth,
    strokeStyle = this.paintAttr.strokeStyle,
    txtColor = this.paintAttr.txtColor,
    textFont = this.paintAttr.textFont,
    textFontTitle = this.paintAttr.textFontTitle,
    elementFillStyle = this.paintAttr.elementFillStyle,
  }) {
    this.paintAttr = new PaintAttr(
      lineWidth,
      strokeStyle,
      txtColor,
      textFont,
      textFontTitle,
      elementFillStyle
    );
    this.paintStack.push(this.paintAttr);
  }

  popPaintAttr() {
    if (this.paintStack.length > 1) {
      this.paintStack.pop();
      this.paintAttr =  this.paintStack[this.paintStack.length-1]
    }
  }

  startRotate() {
    this.rotateR = 0;
  }

  endRotate() {
    this.context.rotate(-this.rotateR);
    this.rotateR = 0;
  }

  rotate(rotateR: number) {
    this.rotateR += rotateR;
    this.context.rotate(rotateR);
  }

  getMeasuredHeight() {
    return this.canvas.height;
  }

  getMeasuredWidth() {
    return this.canvas.width;
  }
}
