
export class Gua {

    static numberReduction ( guaNb:number) {
		let i = guaNb;

		while ( i<=0 ) {
			i = i + 10;
		}
		while (i >= 10) {
			i = i % 10 + i / 10;
		}
		return i;
	}
}
