import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { router } from "@/router";
import { expressJS_url, expressJS_port } from "../config/env.frontend";

const baseUrl = `${expressJS_url}:${expressJS_port}`;

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
      const api_token = await fetchWrapper.post(`${baseUrl}/login`, {
        email,
        password,
      });

      // update pinia state
      this.api_token = api_token;
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("api_token", JSON.stringify(api_token));

      // redirect to previous url or default to home page
      router.push(this.returnUrl || "/");
    },
    logout() {
      this.api_token = null;
      localStorage.removeItem("api_token");
      router.push("/login");
    },
  },
});
