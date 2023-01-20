const Rijndael = require('rijndael-js');
const key = 'Lorem ipsum dolor sit amet, cons';
 
// Plaintext will be zero-padded
const original = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do';
 
// IV is necessary for CBC mode
// IV should have same length with the block size
const iv = 'Ut enim ad minim veniam, quis no';
 
// Create Rijndael instance
// `new Rijndael(key, mode)`
const cipher = new Rijndael(key, 'cbc');
 
// `Rijndael.encrypt(plaintext, blockSize[, iv]) -> <Array>`
// Output will always be <Array> where every element is an integer <Number>
const ciphertext = Buffer.from(cipher.encrypt(original, 256, iv));
 
ciphertext.toString("base64");
// -> bmwLDaLiI1k0oUu5wx9dlWs+Uuw3IhIkMYvq0VsVlQY66wAAqS0djh8N+SZJNHsv8wBRfhytRX2p9LJ0GT3sig==
 
// `Rijndael.decrypt(ciphertext, blockSize[, iv]) -> <Array>`
const plaintext = Buffer.from(cipher.decrypt(ciphertext, 256, iv));
 
original === plaintext.toString();