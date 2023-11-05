import { EnumBaseClass } from '../enumBaseClass';


export class MountainType  extends EnumBaseClass {

    static TRUNK = new MountainType('TRUNK'); 
    static BRANCHE = new MountainType('BRANCHE'); 
    static TRIGRAM = new MountainType('TRIGRAM'); 

constructor(name: string) {
    super(name)
    }
}
