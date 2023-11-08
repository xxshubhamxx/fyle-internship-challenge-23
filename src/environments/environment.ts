import * as CryptoJS from "crypto-js";

const a = 'U2FsdGVkX18mTKieJBomC/x7XVsiavPlo/ek5oJ9OF6BJXL31R';
const b = 'zgbkBHKO5+/FOC5LsbAk0woGGb2vwe7aNP41ztcVwN+Kgn5ECx7';
const c = 'w/IXmFf92O1HnCu4jF3hUiXBHi1p0U8BG36c8njAvjcMU4HQQ==';

var decrypted = CryptoJS.AES.decrypt(a+b+c, "Secret Passphrase").toString(CryptoJS.enc.Utf8);

export const environment = {
  production: false,

  patToken: decrypted
};
