import axios from "axios";
import React, { useEffect, useState } from "react";
import Brotlidcompress from "./Brotlicmp";

const baseURL = "http://localhost:9095/arms/IDBO";

function codesToString(arr) {
  var string = new TextDecoder().decode(arr);
  return string;
}

export default function IDBOROApi(data, url = "") {
  var config = {
    // mode: "no-cors",
    // "Access-Control-Allow-Origin": "*", http://192.168.5.62:9095/arms/IDBO/LWOWDS
    method: "post",
    url: baseURL + url,
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
    let xmlresult = xmlDoc.getElementsByTagName("string")[0]
      ? xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue
      : "";
    let brotliresult = Brotlidcompress(xmlresult);
    let udata = codesToString(brotliresult);
    // console.log(udata);
    let myobj = JSON.parse(udata);
    // console.log(myobj);
    return myobj;
  });
  return result;
}

// let res = UserAccount();



// console.log(">>>>>>", res);
