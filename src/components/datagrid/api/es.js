import crypto from "crypto-browserify";
import { Buffer } from "buffer";

var SALT = [
  0x26, 0xdc, 0xff, 0x00, 0xad, 0xed, 0x7a, 0xee, 0xc5, 0xfe, 0x07, 0xaf, 0x4d,
  0x08, 0x22, 0x3c,
];

var algorithm = "AES-256-CBC";

const buf = Buffer.from(SALT);
function CompressES(originalString) {
  let s = "@Rm$V2@$D$&@1b2c";
  var encoder = new TextEncoder("utf8");
  let initVectorBytes = encoder.encode(s);

  var keyByte = Uint8Array.from([
    144, 250, 186, 121, 20, 157, 8, 113, 10, 69, 128, 145, 33, 225, 224, 225,
    171, 14, 34, 76, 243, 41, 20, 125, 200, 42, 173, 123, 26, 252, 141, 101,
  ]);

  const cipher = crypto.createCipheriv(algorithm, keyByte, initVectorBytes);

  let encrypted = cipher.update(originalString, "utf8", "base64");

  encrypted += cipher.final("base64");
  let hextobyte = encoder.encode(encrypted);
  function buf2hex(buffer) {
    var u = new Uint8Array(buffer),
      a = new Array(u.length),
      i = u.length;
    while (i--)
      // map to hex
      a[i] = (u[i] < 16 ? "0" : "") + u[i].toString(16);
    u = null; // free memory
    return a.join("").toUpperCase();
  }
  let hexTostring = buf2hex(hextobyte);
  return hexTostring;
}

export default CompressES;
