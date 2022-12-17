import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { expressJS_url, expressJS_port } from "../config/env.frontend";

const baseUrl = `${expressJS_url}:${expressJS_port}/user`;

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: {},
  }),
  actions: {
    async getAll() {
      this.users = { loading: true };
      fetchWrapper
        .get(baseUrl, {})
        .then((users) => (this.users = users))
        .catch((error) => (this.users = { error }));
    },
  },
});
