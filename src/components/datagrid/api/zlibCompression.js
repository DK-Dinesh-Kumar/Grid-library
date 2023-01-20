const zlib = require("browserify-zlib");

export default function zlibCompress(data) {
  let zippedRawXML = zlib.gzipSync(data);

  let finalString = zippedRawXML.toString("hex");

  return finalString.substring(finalString.length - 8) + finalString;
}
