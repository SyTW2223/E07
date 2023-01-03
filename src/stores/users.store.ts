import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAuthStore, useAlertStore } from "@/stores";
import { expressJS_url } from "@/config/env.frontend";

const baseUrl = `${expressJS_url}/user`;
interface User {
  username?: string;
  url?: string;
  loading: boolean;
  error: string | null;
}

export const useUsersStore = defineStore({
  id: "user",
  state: () => ({
    user: {} as User,
    tweets: null,
  }),
  actions: {
    async register(user: any) {
      const alertStore = useAlertStore();
      const url = `${expressJS_url}/user`;

      return await fetchWrapper
        .post(url, {
          email: user.email,
          username: user.username,
          password: user.password,
        })
        .then((response) => {
          if (response.message) {
            alertStore.successSnackbar(response.message);
          }
          return Promise.resolve(response);
        })
        .catch((response) => {
          //console.log(response.err);
          alertStore.error(response.err);
          return Promise.reject(response);
        });
    },
    async getById(id: string) {
      const alertStore = useAlertStore();
      this.user = { loading: true, error: null };
      await fetchWrapper
        .get(`${baseUrl}/${id}`, null)
        .then((response) => {
          if (response.message) {
            alertStore.successSnackbar(response.message);
          }
          response["loading"] = false;
          response["error"] = null;
          this.user = response;
          this.tweets = response.publications;
        })
        .catch((response) => {
          //console.log(response.err);
          alertStore.error(response.err);
          this.user = { loading: false, error: response.err };
        });
    },
  },
});
