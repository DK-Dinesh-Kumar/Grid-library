//const crypto = require("crypto-browserify");

import crypto from "crypto-browserify";

// import crypto from "crypto";

//const CryptoJS = require("crypto-js");

// function bytetoHexString(byteArray) {

//   const res = CryptoJS.enc.Utf8.parse(byteArray);

//   return res.toString();

// }

// function HexStringtobyte(hex) {

//   const res = CryptoJS.enc.Hex.parse(hex);

//   return res.toString();

// }

var SALT = [
  0x26, 0xdc, 0xff, 0x00, 0xad, 0xed, 0x7a, 0xee, 0xc5, 0xfe, 0x07, 0xaf, 0x4d,

  0x08, 0x22, 0x3c,
];

var algorithm = "AES-256-CBC";

const buf = Buffer.from(SALT);

const saltbytearray = new Uint32Array(buf);

function Encrypt(originalString) {
  const isHex = false;

  const _CryptKeysize = 256 / 8;

  // const iv = CryptoJS.enc.Utf8.parse("@S!N#V$K%W^A&R*E")

  let s = "@S!N#V$K%W^A&R*E";

  var encoder = new TextEncoder("utf8");

  let initVectorBytes = encoder.encode(s);

  // let keyBytes = PasswordDeriveBytes(

  //   srtKey,

  //   saltbytearray,

  //   4,

  //   "sha1",

  //   _CryptKeysize

  // );

  // const cipher = new Rijndael(keyBytes, "cbc");

  // // `Rijndael.encrypt(plaintext, blockSize[, iv]) -> <Array>`

  // // Output will always be <Array> where every element is an integer <Number>

  // const ciphertext = Buffer.from(cipher.encrypt(original, 256, iv));

  // ciphertext.toString("base64");

  var keyByte = Uint8Array.from([
    13, 95, 216, 19, 168, 93, 20, 214, 4, 64, 97, 251, 38, 72, 200, 143, 98, 31,

    54, 202, 176, 73, 61, 145, 72, 250, 178, 14, 234, 157, 225, 61,
  ]);

  const cipher = crypto.createCipheriv(algorithm, keyByte, initVectorBytes);

  let encrypted = cipher.update(originalString, "utf8", "hex");

  encrypted += cipher.final("hex");

  return encrypted;
}

export default Encrypt;
