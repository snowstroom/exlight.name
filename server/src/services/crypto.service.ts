import { Injectable } from '@nestjs/common';
import { MD5, AES, enc } from 'crypto-js';

@Injectable()
export class CryptoService {
  public md5hash(data: string): string {
    return MD5(data).toString();
  }

  public aesDecript(data: string, key: string) {
    return AES.decrypt(data, key).toString(enc.Utf8);
  }

  public aesEncrypt(data: string, key: string) {
    return AES.encrypt(data, key).toString();
  }
}
