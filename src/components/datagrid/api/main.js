import { exportbaseRL } from "../api/arms_glob/axiosconfig";
import ArmConfig from "../api/arms_glob/ArmsConfig";

async function HostUrl() {
  let appxml = await ArmConfig("./Arms.config");
  console.log(appxml);
}

export default HostUrl;
