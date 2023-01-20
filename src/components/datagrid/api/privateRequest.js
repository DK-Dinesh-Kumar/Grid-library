import axios from "axios";
import Brotlidcompress from "./Brotlicmp";
const codesToString = (arr) => {
    return new TextDecoder("utf-8").decode(new Uint8Array(arr));
}
const OBJtoXML = (obj) => {
    var xml = '';
    Object.entries(obj).forEach(([key, value]) => {
        xml += "<" + key + ">";
        if (Array.isArray(value)) {
            for (var array of value) {
                xml += OBJtoXML(new Object(array));
            }
        } else if (typeof value == "object") {
            xml += OBJtoXML(new Object(value));
        } else {
            xml += value;
        }
        xml += "</" + key + ">";
    }
    )
    return xml;
}

export const privateRequest = axios.create({
    baseURL: "http://localhost:9095/arms",
    headers: {
        "Content-Type": "application/xml",
        JSON: "TRUE",
    },
    // transformRequest: [
    //     (data, headers) => {
    //         let xml = OBJtoXML(data);
    //         return xml;
    //     }
    // ],
    transformResponse: [
        (data, headers) => {
        //  console.log('data', data)
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "application/xml");
            let xmlresult =
              xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            let brotliresult = Brotlidcompress(xmlresult);
            let udata = codesToString(brotliresult);
            let myobj = JSON.parse(udata);
            return myobj;
        }
    ]
}
);



