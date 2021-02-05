import {ServiceKeys as keys} from '../keys/service-keys';

const CryptoJS = require('crypto-js');

export class EncryptDecrypct {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  encrypt(text: string) {
    switch (this.type) {
      case keys.MD5:
        return CryptoJS.MD5(text).toString();
        break;
      case keys.AES:
        return CryptoJS.AES(text, keys.SK).toString();
        break;
      case keys.SHA_512:
        break;
      default:
        return 'This type of crypt is not available';
        break;
    }
  }
}
