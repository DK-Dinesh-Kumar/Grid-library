import axios from "axios";
import { constants } from "./axiosconfig";
import arms_brotli_decompress from "./arms_encryption";
import { MD5Hash } from "arms_v2.8_global";
import { CompressES } from "arms_v2.8_global";
import { GZipCompress } from "arms_v2.8_global";
import { RijndaelEncryptAES } from "arms_v2.8_global";

const moment = require("moment");

const codesToString = (arr) => {
  return new TextDecoder("utf-8").decode(new Uint8Array(arr));
};

const axiosClient = axios.create({
  transformResponse: [
    (data, headers) => {
      const myobj = arms_brotli_decompress(data);
      return myobj;
    },
  ],
});

//axiosClient.defaults.baseURL = constants.HOST_URL;
export function geturl(url) {
  axiosClient.defaults.baseURL = url;
}

axiosClient.defaults.headers = constants.headers;

// To share cookies to cross site domain, change to true.
// axiosClient.defaults.withCredentials = false;

// Get Session GUID which  come from
function getSessionGUID() {
  const SessionGUID = localStorage.getItem("SessionGUID");
  return SessionGUID;
}

//create api
export async function IUSO(URL, UserName, Password, otp, userHash) {
  var UN = UserName ? UserName : "";
  var PW = Password ? Password : "";
  var OTPs = otp ? otp : "";
  var userHash = userHash ? userHash : "";

  var data = `<UserData><UserHash></UserHash><UserName>${RijndaelEncryptAES(
    UN
  )}</UserName><Password>${RijndaelEncryptAES(
    PW
  )}</Password><OTP>${OTPs}</OTP><SecurityModel>0</SecurityModel><SecurityHash>0</SecurityHash></UserData>`;

  var logoutdata = `<UserLogout><UserHash>${userHash}</UserHash><UserToken>${getSessionGUID()}</UserToken></UserLogout>`;

  if (URL == "UA") {
    const result = await axiosClient.post(`IUSO/${URL}`, data);
    console.log("iam result", result.data);
    return result.data;
  }
  if (URL == "LO") {
    const result = await axiosClient.post(`IUSO/${URL}`, logoutdata);
    console.log("iam result", result.data);
    return result.data;
  }
}

// DB opreations
export async function IDBO(URL, SA, SP, AD) {
  var SAA = SA ? SA : "";
  var SPP = SP ? SP : "";
  var AUD = AD ? AD : "";
  var DBpayload = `<DBTransaction>
      <UserToken>${getSessionGUID()}</UserToken>
      <OTP></OTP>
      <DBOperation>DBO_SELECT_SYNC</DBOperation>
      <ServiceAction>${SAA}</ServiceAction>
      <ServiceParameters>${GZipCompress(SPP)}</ServiceParameters>
    </DBTransaction>`;

  var SavePayload = `<TransactionWrite><UserToken>${getSessionGUID()}</UserToken><OTP></OTP><DBOperation>DBO_INSERT_SYNC</DBOperation><ServiceAction>${SAA}</ServiceAction><ServiceParameters>${GZipCompress(
    SPP
  )}</ServiceParameters><AuditParameters>${GZipCompress(
    AUD
  )}</AuditParameters></TransactionWrite>`;

  if (URL == "LWOWDS") {
    const result = await axiosClient.post(`IDBO/${URL}`, SavePayload);
    console.log("i IDBO result", result.data);
    return result.data;
  }
  if (URL == "LWOW") {
    const result = await axiosClient.post(`IDBO/${URL}`, SavePayload);
    console.log("i IDBO result", result.data);
    return result.data;
  } else {
    const result = await axiosClient.post(`IDBO/${URL}`, DBpayload);
    console.log("i IDBO result", result.data);
    return result.data;
  }
}

export async function ISVO(URL, payload) {
  const result = await axiosClient.post(`ISVO/${URL}`, payload);

  return result.data;
}

export async function IMDO(URL, payload) {
  const result = await axiosClient.post(`IMDO/${URL}`, payload);

  return result.data;
}

export async function IEMO(URL, payload) {
  const result = await axiosClient.post(`IEMO/${URL}`, payload);

  return result.data;
}

export async function ISMO(URL, payload) {
  const result = await axiosClient.post(`ISMO/${URL}`, payload);

  return result.data;
}

//file upload download input output api
export async function IFIO(URL, LOBGUID, filepath, folderpath, payload) {
  if (URL == "GL") {
    const result = await axiosClient.get(
      `IFIO/${URL}?UT=${getSessionGUID()}&GUID=${LOBGUID}`,
      { responseType: "blob" }
    );
    return result.data;
  } else {
    let time = moment().format("DD/MMM/YYYY hh:mm:ss");
    var selectedEntry = 0;
    var FD = CompressES(
      `${getSessionGUID()}|${filepath}|${time}|${selectedEntry}|${folderpath}`
    );

    var idspconfig = {
      HOST_URL: "http://localhost:9095/arms/",
      headers: {
        "User-Agent": "arms",
        arms: `387255506A304666654E655969586263486836446253587032422F2F37387470432F5A6A7854414D6344513856504153554F76495536714B7034375271615A352F5878527131495136677938334B7553513234446452447A5953386B396C645A414D57534A3379347574417A647463424A6F6F526D794A5333652F6453375579305843554D656441787A4A66716A787262416835454F634C6B366D446B6B584B7562666E4C4378466C31694143567238546A34622B694E55594968315A4662674D6F7453434C673569335071453377797A654C5745773D3D`,
        RequestToken: `517771786354302F766341755964697562614E616E797274526C5766574B6B4A576F39584B77336A546B412B595148334731594A39787A4962586B347A343243`,
        UserContext: `64442F53715566486C3166334379432F78684B44752F56384A46574A524A3032327059364F4E6B6A7A42414861585458667967634D56627A6F46746531786F79644F3335694666446952765578636A65533558766651664C79446B725A44693157514F6632793452624D565441796166586F4A4142557645736361636D4C3272`,
        CoreVersion: `2.8.0.0`,
        ApplicationContext: `2F626637656A307355395762582F457334764F2B38692B4C4354644178324A735853456C526747547131414664464E6B707950744C32336D316D7666746A4C4E3073354D4C41636665684168566A4D364E5143693167645974394F5358555466553054574375593769646B487A6E724A673956394E6F7357304C386B526876764A686542585A6C4E596655487846476F6262372B642F4C364B496F6B4755666364304A6B6E4244355A3464417542665244733157334532794D463151744F714B4D303954716764642B5474616A627941594B664F6B49304A6F6A4D326F5A364575556445433662425A68353844655162633757572F4153546D515A557950574462474C6D486D74314D6D2F70742B79424E507548517747787536514C757657435348314B484F3533665856484368352B3846354D34487A44587630323565703539746349474B503047645975564850594567426C7A744B4F5459342B46464741646F423552614F33754A63414274324A423130785A48465971624F6B693230304437563268637A664B534D35727176584776733332513D3D`,

        "Content-Type": "application/octet-stream",

        FD: FD,
        Host: "192.168.16.151:9095",

        "Transfer-Encoding": "chunked",

        Connection: "Close",
      },
    };
    const result = await axiosClient.post(`IFIO/${URL}`, payload, idspconfig);
    return result.data;
  }
}

export async function IDSO(URL, payload, filepath, LOBGUID) {
  let time = moment().format("DD/MMM/YYYY hh:mm:ss");

  var LOBDetailss = CompressES(
    `${getSessionGUID()}|${LOBGUID}|` +
      filepath?.name +
      `|${MD5Hash(filepath?.name)}|${time}`
  );

  console.log(
    "lobdeatils",
    `${getSessionGUID()}|${LOBGUID}|` +
      filepath?.name +
      `|${MD5Hash(filepath?.name)}|${time}`
  );

  var idspconfig = {
    HOST_URL: "http://192.168.16.132:9095/arms/",
    headers: {
      "User-Agent": "arms",
      arms: `387255506A304666654E655969586263486836446253587032422F2F37387470432F5A6A7854414D6344513856504153554F76495536714B7034375271615A352F5878527131495136677938334B7553513234446452447A5953386B396C645A414D57534A3379347574417A647463424A6F6F526D794A5333652F6453375579305843554D656441787A4A66716A787262416835454F634C6B366D446B6B584B7562666E4C4378466C31694143567238546A34622B694E55594968315A4662674D6F7453434C673569335071453377797A654C5745773D3D`,
      RequestToken: `517771786354302F766341755964697562614E616E797274526C5766574B6B4A576F39584B77336A546B412B595148334731594A39787A4962586B347A343243`,
      UserContext: `64442F53715566486C3166334379432F78684B44752F56384A46574A524A3032327059364F4E6B6A7A42414861585458667967634D56627A6F46746531786F79644F3335694666446952765578636A65533558766651664C79446B725A44693157514F6632793452624D565441796166586F4A4142557645736361636D4C3272`,
      CoreVersion: `2.8.0.0`,
      ApplicationContext: `2F626637656A307355395762582F457334764F2B38692B4C4354644178324A735853456C526747547131414664464E6B707950744C32336D316D7666746A4C4E3073354D4C41636665684168566A4D364E5143693167645974394F5358555466553054574375593769646B487A6E724A673956394E6F7357304C386B526876764A686542585A6C4E596655487846476F6262372B642F4C364B496F6B4755666364304A6B6E4244355A3464417542665244733157334532794D463151744F714B4D303954716764642B5474616A627941594B664F6B49304A6F6A4D326F5A364575556445433662425A68353844655162633757572F4153546D515A557950574462474C6D486D74314D6D2F70742B79424E507548517747787536514C757657435348314B484F3533665856484368352B3846354D34487A44587630323565703539746349474B503047645975564850594567426C7A744B4F5459342B46464741646F423552614F33754A63414274324A423130785A48465971624F6B693230304437563268637A664B534D35727176584776733332513D3D`,

      "Content-Type": "application/octet-stream",

      LOBDetails: LOBDetailss,
      Host: "192.168.16.132:9095",

      "Transfer-Encoding": "chunked",

      Connection: "Close",
    },
  };
  const result = await axiosClient.post(`IDSO/${URL}`, payload, idspconfig);

  return result.data;
}
