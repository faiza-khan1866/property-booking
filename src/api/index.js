import axios from "axios";
//mock API
let API_URL = "https://www.carpediemdxb.com/APIs/public/v1/api";
// let API_URL = "https://prismcloudhosting.com/CARPEDIEM_APIs/public/v1/api";

export default function callApi(endpoint, method = "GET", body) {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}
