import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { router } from "@/router";

const baseUrl = `http://localhost:3000`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    api_token: JSON.parse(localStorage.getItem("api_token") || "null"),
    // store the url of the page user tried to access before being redirected to login page
    returnUrl: "/",
  }),
  actions: {
    async login(email: string, password: string) {
      return await fetchWrapper
        .post(`${baseUrl}/login`, {
          email,
          password,
        })
        .then((data) => {
          this.api_token = data.token;
          // store user details and jwt in local storage to keep user logged in between page refreshes
          localStorage.setItem("api_token", JSON.stringify(this.api_token));

          // redirect to previous url or default to home page
          router.push(this.returnUrl || "/");
          return Promise.resolve(data.token);
        })
        .catch((error) => {
          //console.log(error);
          alert(error);
          return Promise.reject(error);
        });
    },
    logout() {
      this.api_token = null;
      localStorage.removeItem("api_token");
      router.push("/login");
    },
  },
});
