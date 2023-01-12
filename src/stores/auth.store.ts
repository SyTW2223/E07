import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { router } from "@/router";
import { expressJS_url, expressJS_port } from "../config/env.frontend";
import { useAlertStore } from "./alert.store";

const baseUrl = `${expressJS_url}`;
function setCookie(
  cName: string,
  cValue: string,
  expFromEpoch: number
): string {
  //console.log(expFromEpoch);
  const date: Date = new Date(expFromEpoch * 1000);
  const expires: string = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  return cValue;
}

function getCookie(cName: string): string {
  const name: string = cName + "=";
  const cDecoded: string = document.cookie;
  const cArr: string[] = cDecoded.split("; ");
  let res: string = "";
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    api_token: getCookie("api_token"), //JSON.parse(localStorage.getItem("api_token") || "null"),
    // store the url of the page user tried to access before being redirected to login page
    user_id: getCookie("user_id"),
    returnUrl: "/",
  }),
  actions: {
    async login(email: string, password: string) {
      const alertStore = useAlertStore();
      const request = await fetchWrapper
        .post(`${baseUrl}/login`, {
          email,
          password,
        })
        .then((response) => {
          //console.log(jwt.decode(this.api_token));
          const base64body: string = response.token
            .split(".")[1]
            .replace("-", "+")
            .replace("_", "/");
          const body: any = JSON.parse(window.atob(base64body));
          //console.log(body);
          this.api_token = setCookie("api_token", response.token, body.exp);
          this.user_id = setCookie("user_id", body.id, body.exp);
          // store user details and jwt in local storage to keep user logged in between page refreshes
          //localStorage.setItem("api_token", JSON.stringify(api_token));
          // redirect to previous url or default to home page
          if (response.message) {
            alertStore.successSnackbar(response.message);
          }
          alertStore.successSnackbar("You have logged in");
          //console.log(getCookie("api_token"));
          router.push(this.returnUrl || "/");
        })
        .catch((response) => {
          //console.log(response.err);
          alertStore.error(response.err);
        });
      // update pinia state
    },
    logout() {
      const alertStore = useAlertStore();
      alertStore.error("Session timed out, log-in again");
      this.api_token = "";
      document.cookie =
        "api_token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie =
        "user_id" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      router.push("/log-in");
    },
  },
});
