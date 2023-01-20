import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrotliDecompress } from "arms_v2.8_global";

// const baseURL = "http://localhost:9095/arms/IDBO/";

function codesToString(arr) {
  var string = new TextDecoder().decode(arr);
  return string;
}

export default function IDBOROApi(data, baseURL) {
  var config = {
    // mode: "no-cors",
    // "Access-Control-Allow-Origin": "*",
    method: "post",
    url: baseURL,
    headers: {
      JSON: "TRUE",
      "Content-Type": "application/xml",
    },
    data: data,
    // redirect: "follow",Content-Type: application/xml;
  };

  const result = axios(config).then((response) => {
    console.log(response.data);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(response.data, "application/xml");
    let xmlresult =
      xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue;
    let brotliresult = BrotliDecompress(xmlresult);
    let udata = codesToString(brotliresult);
    let myobj = JSON.parse(udata);
    console.log(myobj);
    return myobj;
  });
  return result;
}
