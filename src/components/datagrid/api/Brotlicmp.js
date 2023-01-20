import { Buffer } from "buffer";
const decompress = require("brotli/decompress");

function Brotlidcompress(str) {
  let result = decompress(Buffer.from(str.toString(), "hex"));

  return result;
}

export default Brotlidcompress;
