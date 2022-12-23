import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAuthStore } from "@/stores";
import { expressJS_url } from "@/config/env.frontend";

const baseUrl = `${expressJS_url}/user`;

export const useUsersStore = defineStore({
  id: "user",
  state: () => ({
    user: { loading: false, error: null },
  }),
  actions: {
    async register(user: any) {
      const url = `${expressJS_url}/user`;

      return await fetchWrapper
        .post(url, {
          email: user.email,
          username: user.username,
          password: user.password,
        })
        .then((response) => {
          if (response.message) {
            alert(response.message);
          }
          return Promise.resolve(response);
        })
        .catch((response) => {
          //console.log(response.err);
          alert(response.err);
          return Promise.reject(response);
        });
    },
    async getById(id: string) {
      this.user = { loading: true, error: null };
      await fetchWrapper
        .get(`${baseUrl}/${id}`, null)
        .then((response) => {
          if (response.message) {
            alert(response.message);
          }
          response["loading"] = false;
          response["error"] = null;
          this.user = response;
        })
        .catch((response) => {
          //console.log(response.err);
          alert(response.err);
          this.user = { loading: false, error: response.err };
        });
      // await setTimeout(
      //   async () =>
      //     await fetchWrapper
      //       .get(`${baseUrl}/${id}`, null)
      //       .then((response) => {
      //         if (response.message) {
      //           alert(response.message);
      //         }
      //         response["loading"] = false;
      //         response["error"] = null;
      //         this.user = response;
      //       })
      //       .catch((response) => {
      //         //console.log(response.err);
      //         alert(response.err);
      //         this.user = { loading: false, error: response.err };
      //       }),
      //   2000
      // );
    },
    // async update(id, params) {
    //   await fetchWrapper.put(`${baseUrl}/${id}`, params);

    //   // update stored user if the logged in user updated their own record
    //   const authStore = useAuthStore();
    //   if (id === authStore.user.id) {
    //     // update local storage
    //     const user = { ...authStore.user, ...params };
    //     localStorage.setItem("user", JSON.stringify(user));

    //     // update auth user in pinia state
    //     authStore.user = user;
    //   }
    // },
    // async delete(id) {
    //   // add isDeleting prop to user being deleted
    //   this.users.find((x) => x.id === id).isDeleting = true;

    //   await fetchWrapper.delete(`${baseUrl}/${id}`);

    //   // remove user from list after deleted
    //   this.users = this.users.filter((x) => x.id !== id);

    //   // auto logout if the logged in user deleted their own record
    //   const authStore = useAuthStore();
    //   if (id === authStore.user.id) {
    //     authStore.logout();
    //   }
    // },
  },
});
