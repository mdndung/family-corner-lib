

export interface XcelDocInterface {


  createWorkSheet(name: string): void ;

  saveToFile(namePrefix: string): void;

  genEmptyRow(): void ;

  addBaseCell(colNb: number, value: string, fontIdx: number): void;

  addCellTitle1(colNb: number, value: string): void;

  addCellTitle2(colNb: number, value: string): void;

  addCellTitle3(colNb: number, value: string): void;

  addCell(colNb: number, value: string): void;

}
