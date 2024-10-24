import axios from "axios";
import { localStorageManager } from "../util/common";
import { STORAGE_KEY } from "../util/constant";
import { getApiToken } from "../service/authService";

const callAPI = (
  route,
  endPoint,
  body = {},
  recaptcha,
  externalUrl = false
) => {
  let url = `${'https://xtendedspace-web-api.azurewebsites.net'}${endPoint}`;

  if (window.location.href.includes("stage.xtendedspace.com") || window.location.href.includes("localhost") ||window.location.href.includes("main.d2kyc")) {
    url = `${'https://xtendedspace-apinew.azurewebsites.net'}${endPoint}`
  }

  const jwt = localStorageManager.getValue(STORAGE_KEY.JWT_TOKEN) || "";
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const responseType = route.responseType;

  return new Promise(async (resolve) => {
    let newToken;
    let axiosRequest = null;
    if (route.verb === "get") {
      axiosRequest = axios[route.verb](url, { headers, responseType });
    } else {
      axiosRequest = axios[route.verb](url, body, { headers });
    }
    await axiosRequest
      .then((response) => {
        resolve(response);
      })
      .catch(async (err) => {
        if (err?.response?.status === 401) {
          // console.log("auth error due to expire token");
          const newToken = await getApiToken();
          if (newToken.success) {
            // console.log("newToken", newToken.success);
            localStorageManager.setValue(
              STORAGE_KEY.JWT_TOKEN,
              newToken.success.token
            );
            const retryResponse = await axios({
              method: route.verb,
              url: url,
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
              responseType: responseType,
              data: body,
            });
            resolve(retryResponse);
          } else {
            // console.log("newToken.error", newToken.error);
          }
        }
        resolve(err.response);
      });


  });
};

const setAuthToken = async () => {
  const newToken = await getApiToken();
  if (newToken.success) {
    // console.log("newToken", newToken.success);
    localStorageManager.setValue(
      STORAGE_KEY.JWT_TOKEN,
      newToken.success.token
    );
    const retryResponse = await axios({
      method: route.verb,
      url: url,
      headers: {
        Authorization: `Bearer ${newToken}`,
        Recaptcha: `Recaptcha ${recaptcha}`,
      },
      responseType: responseType,
      data: body,
    });
    resolve(retryResponse);
  } else {
    // console.log("newToken.error", newToken.error);
  }
}

export { callAPI };