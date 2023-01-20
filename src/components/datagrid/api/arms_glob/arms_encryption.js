import Brotlidcompress from "./Brotlicmp";

function codesToString(arr) {
  var string = new TextDecoder().decode(arr);
  return string;
}

export default function arms_brotli_decompress(data) {
  try {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "application/xml");
    let xmlresult = xmlDoc.getElementsByTagName("string")[0]
      ? xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue
      : "";
    let brotliresult = Brotlidcompress(xmlresult);
    let udata = codesToString(brotliresult);
    let myobj = JSON.parse(udata);
    return myobj;
  } catch (error) {
    let data1 = xmlDoc.getElementsByTagName("long")[0]
      ? xmlDoc.getElementsByTagName("long")[0].childNodes[0].nodeValue
      : "";
    return data1;
  }
}
