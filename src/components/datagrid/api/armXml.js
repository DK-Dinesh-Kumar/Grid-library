import React from "react";

let xmlpara = {};

let createxml = (xmlObj) => {
  let xmlOutput = "";

  Object.keys(xmlObj).forEach((k) => xmlObj[k] === "" && delete xmlObj[k]);

  for (var i in xmlObj) {
    xmlOutput = xmlOutput + `<${i}>${xmlObj[i]}</${i}>`;
  }

  console.log(`<iData>${xmlOutput}</iData>`);

  return (xmlOutput = `<iData>${xmlOutput}</iData>`);
};

export { xmlpara, createxml };
