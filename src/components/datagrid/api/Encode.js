const derp = require("derive-password-bytes");
const crypto = require("crypto");

const encrypt = function (data) {
  const passPhrase = "p@@$w0rd0f$D$";
  const hashAlgorithm = "SHA1";
  const passwordIterations = 2;
  const keySize = 256;

  const saltValue = "@rM$&kEy";
  const key = derp(
    passPhrase,
    saltValue,
    passwordIterations,
    hashAlgorithm,
    32
  );

  const initVector = "@S!N#V$K%W^A&R*E";
  const initVectorBytes = Buffer.from(initVector, "binary");

  const cipher = crypto.createCipheriv("aes-256-cbc", key, initVectorBytes);
  const output = Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);

  return output.toString("base64");
};

const plaintext = "ADMIN";
var encrypted = encrypt(plaintext);

console.log(encrypted);
