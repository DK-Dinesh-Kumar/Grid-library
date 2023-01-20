import * as CryptoJS from "crypto-js";
const key = CryptoJS.enc.Utf8.parse("Mercedes");
const iv = CryptoJS.enc.Utf8.parse("@S!N#V$K%W^A&R*E");
const encryptedValues = (userName, password) => {
  const encryptedUserName = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(userName),
    key,
    {
      keySize: 256 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  const encryptedPassword = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(password),
    key,
    {
      keySize: 256 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return [encryptedUserName, encryptedPassword];
};
export { encryptedValues };
