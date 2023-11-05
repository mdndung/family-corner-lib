export class PaintAttr {

  lineWidth: number;
  strokeStyle: string;
  elementFillStyle = '#000000';
  txtColor = '#000000';
  textFont = '12px serif';
  textFontTitle = '12px bold';
  textHeight = 12


  constructor(lineWidth= 1, strokeStyle= '#ffffff',
    txtColor= '#000000', textFont= '12px serif', textFontTitle= '12px bold',elementFillStyle = '#000000') {
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
    this.txtColor = txtColor
    this.textFont = textFont
    this.textFontTitle = textFontTitle
    this.elementFillStyle = elementFillStyle
  }



}
