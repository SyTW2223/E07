import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { router } from "@/router";

const baseUrl = `http://localhost:3000`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user") || "null"),
    // store the url of the page user tried to access before being redirected to login page
    returnUrl: "/",
  }),
  actions: {
    async login(email: string, password: string) {
      const user = await fetchWrapper.post(`${baseUrl}/login`, {
        email,
        password,
      });

      // update pinia state
      this.user = user;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      // redirect to previous url or default to home page
      router.push(this.returnUrl || "/");
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
