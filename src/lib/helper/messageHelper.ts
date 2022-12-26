import { TranslateService } from '@ngx-translate/core';
import { ObjectHelper } from './objectHelper';


export class MessageHelper {

  static tr: TranslateService= null;

  constructor(translateService: TranslateService) {
    MessageHelper.tr = translateService;
  }

  static init(translateService: TranslateService) {
    MessageHelper.tr = translateService;
  }

  static getLabMessage(key: string) {
    return MessageHelper.getMessage('Label.'+key);
  }

  static getMessage(key: string) {
    let msg = '';
    if ( ! ObjectHelper.isNaN(key) ) {
      MessageHelper.tr.get(key).subscribe((res: string) => {
        //if (!(key===res)) {
          msg = res;
        //}
      });
    }
    return msg;
  }

  static setLangue(langue:string) {
    MessageHelper.tr.use(langue);
  }

}
