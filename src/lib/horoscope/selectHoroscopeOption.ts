export class SelectHoroscopeOption {

    static OPTIONS = ['All', 'Bazi', 'Halac', 'TuVi', 'Zodiac'];

    selectOption: number;

    constructor() {
      this.selectOption = 0;
    }

    setOption(optionIdx: number) {
      this.selectOption=optionIdx;
    }

    isBaziSelected(): boolean { return this.selectOption<=1 };

    isHalacSelected(): boolean { return this.selectOption===0 || this.selectOption===2 };

    isTuViSelected(): boolean { return this.selectOption===0 || this.selectOption===3 };

    isZodiacSelected(): boolean { return this.selectOption===0 || this.selectOption===4 };

}
