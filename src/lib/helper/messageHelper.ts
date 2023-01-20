import { TranslateService } from '@ngx-translate/core';
import { ObjectHelper } from './objectHelper';


export class MessageHelper {

  static tr: TranslateService= null;
  static USE_SYMBOL_MODE = false ;

  constructor(translateService: TranslateService) {
    MessageHelper.tr = translateService;
  }

  static init(translateService: TranslateService) {
    MessageHelper.tr = translateService;
  }

  static isSymbolMode() {
    return MessageHelper.USE_SYMBOL_MODE;
  }

  static setSymbolMode(mode: boolean) {
    MessageHelper.USE_SYMBOL_MODE = mode;
  }

  static getSymbolMessage(key: string) {
    let res= '';
    if (  typeof key === 'string' )  {
      let keyLab = key ;
      if ( MessageHelper.isSymbolMode() ) {
        keyLab += '.Symbol';
        res = MessageHelper.getMessage(keyLab);
        if ( res===keyLab ) {
          res = MessageHelper.getMessage(key);
        }
      } else {
        res = MessageHelper.getMessage(key);
      }
    }
    return res;
  }

  static getLabMessage(key: string) {
    return MessageHelper.getMessage('Label.'+key);
  }

  static getMessage(key: string) {
    let msg = '';
    if ( ! ObjectHelper.isNaN(key) ) {
      MessageHelper.tr.get(key).subscribe((res: string) => {
        if (!(key===res)) {
          msg = res;
        } else {
          msg=key
        }
      });
    }
    return msg;
  }

  static setLangue(langue:string) {
    MessageHelper.tr.use(langue);
  }

}
