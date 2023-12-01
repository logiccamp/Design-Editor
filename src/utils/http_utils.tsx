
import axios from "axios";
import _ from "lodash";
import ls from "localstorage-slim";
export const APP_API_URL = window.location.host.includes("localhost")
? 
"https://beentos.herokuapp.com/api"
: 
"https://beentos.herokuapp.com/api"

// export const EmailBaseUrl = 'https://retailapi.livevend.com';
export const validatePasswordRegex =
  // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

export const token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTAzMmUxYjdlNmU5ZTEyN2FjNzdiYyIsInJvbGUiOiJicmFuZCIsInN0YXR1cyI6ImFjdGl2ZSIsImFkbWluUm9sZXMiOlsic3VwZXItYWRtaW4iXSwiaWF0IjoxNjk4NzA5MTI1LCJleHAiOjMuNjAwMDAwMDAwMDAwMDAxNGUrMjR9.IbrjEJCoJV-_NgSWXvdjvS3aJMe7SOzICJa0V3qMtHc"

export const httpPostWithoutToken = async (url : string, data : any) => {
  return await axios
    .post(`${APP_API_URL}/${url}`, data)
    .then((resp) => {
      return resp.data;
    })
    .catch(function (error) {
      if (error.code === "ERR_NETWORK") {
        return { error: "An error occurred, please try again later" };
      }
      const msg =
        _.get(error, "response?.data?.message") ||
        error?.response?.data?.message;
      return {
        error: msg,
        status: error?.response?.status,
      };
    });
};

export const httpPostWithToken = async (url : string, data : any) => {
//   const token = sessionStorage.getItem("sj_token");
  // const token = ls.get("sj_token", { decrypt: true });
  return await axios
    .post(`${APP_API_URL}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      return resp.data;
    })
    .catch(function (error) {
      if (error.code === "ERR_NETWORK") {
        return { error: "An error occurred, please try again later" };
      }
      const msg =
        _.get(error, "response?.data?.message") ||
        error?.response?.data?.message;
      return { error: msg };
    });
};

export const httpPutWithToken = async (url : string, data : any) => {
  //   const token = sessionStorage.getItem("sj_token");
    // const token = ls.get("sj_token", { decrypt: true });
    return await axios
      .put(`${APP_API_URL}/${url}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        return resp.data;
      })
      .catch(function (error) {
        if (error.code === "ERR_NETWORK") {
          return { error: "An error occurred, please try again later" };
        }
        const msg =
          _.get(error, "response?.data?.message") ||
          error?.response?.data?.message;
        return { error: msg };
      });
  };
export const httpGetWithToken = async (url : string) => {
    //   const token = sessionStorage.getItem("sj_token");
      // const token = ls.get("sj_token", { decrypt: true });
      return await axios
        .get(`${APP_API_URL}/${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          return resp;
        })
        .catch(function (error) {
            console.log(error)
          if (error.code === "ERR_NETWORK") {
            return { error: "An error occurred, please try again later" };
          }
          else{
              if(error.response.data.statusCode == "401"){

              }else{

        const msg =
          _.get(error, "response?.data?.message") ||
          error?.response?.data?.message;
        return { error: msg };
    }

    }

        });
    };

export const isValidUrl = (str: string) => {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
};
