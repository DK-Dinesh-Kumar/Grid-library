import { Buffer } from "buffer";
const decompress = require("brotli/decompress");

function Brotlidcompress(str) {
  try {
    let result = decompress(Buffer.from(str.toString(), "hex"));
    return result;
  } catch (error) {
    return str;
  }
}

export default Brotlidcompress;
