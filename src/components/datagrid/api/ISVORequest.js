import axios from "axios";
import React, { useEffect, useState } from "react";
import Brotlidcompress from "./Brotlicmp";
import { Buffer } from "buffer";
 
const baseURL = "http://localhost:9095/arms/ISVO/LLU";

function codesToString(arr) {
  return new TextDecoder("utf-8").decode(new Uint8Array(arr));
}

function base64ToHex(str) {
  for (var i = 0, bin = window.atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
      let tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = "0" + tmp;
      hex[hex.length] = tmp;
  }
  return hex.join(" ");
}



export default function ISVORequest(data) {
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
    var xmlDoc = parser.parseFromString(response.data , "application/xml");
    let xmlresult =
    xmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue;
    console.log(">>", xmlresult);
    const buffer = Buffer.from(xmlresult, 'base64');
    const bufString = buffer.toString('hex');
    console.log(">>>" , bufString);
    let brotliresult = Brotlidcompress(bufString);
    let udata = codesToString(brotliresult);
    let myobj = JSON.parse(udata);
    console.log(myobj);
    return myobj;
  });
  return result;
}

// let res = UserAccount();

// console.log(">>>>>>", res);
