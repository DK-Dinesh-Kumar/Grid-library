var aesjs = require('aes-js');



var SALT = [

  0x26, 0xdc, 0xff, 0x00, 0xad, 0xed, 0x7a, 0xee, 0xc5, 0xfe, 0x07, 0xaf, 0x4d,



  0x08, 0x22, 0x3c,

];

const buf = Buffer.from(SALT);



const saltbytearray = new Uint32Array(buf);



function Encrypt(originalString) {

  const isHex = false;



  const _CryptKeysize = 256 / 8;

  let s = "@S!N#V$K%W^A&R*E";



  var encoder = new TextEncoder("utf8");


  let initVectorBytes = encoder.encode(s);

  var keyByte = Uint8Array.from([

    13, 95, 216, 19, 168, 93, 20, 214, 4, 64, 97, 251, 38, 72, 200, 143, 98, 31,



    54, 202, 176, 73, 61, 145, 72, 250, 178, 14, 234, 157, 225, 61,

  ]);

  var textBytes = aesjs.utils.utf8.toBytes(originalString);

  var aesCbc = new aesjs.ModeOfOperation.cbc(keyByte, initVectorBytes);
  var encryptedBytes = aesCbc.encrypt(aesjs.padding.pkcs7.pad(textBytes));

  // To print or store the binary data, you may convert it to hex
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

  return encryptedHex;
}

export default Encrypt;
