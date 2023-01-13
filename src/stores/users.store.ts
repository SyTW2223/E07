import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAuthStore, useAlertStore } from "@/stores";
import { expressJS_url } from "@/config/env.frontend";

const baseUrl = `${expressJS_url}`;
interface User {
  username?: string;
  pfp_url?: string;
  followed?: boolean;
  loading: boolean;
  error: string | null;
}

interface publication {
  id: string;
  username: string;
  content: {
    text: string;
  };
  date: string;
  fav_count?: number;
  liked?: boolean;
  pfp_url?: string;
  comments?: [
    {
      id: string;
      text: string;
    }
  ];
}

interface UserProfileChanges {
  username?: string;
  pfp_url?: string;
}

export const useUsersStore = defineStore({
  id: "user",
  state: () => ({
    logged_user: {} as User,
    tweets: null,
    searched_user: {} as User,
    searched_tweet: {} as publication,
    user_profile_changes: {} as UserProfileChanges,
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
      this.logged_user = { loading: true, error: null };
      await fetchWrapper
        .get(`${baseUrl}/user/${id}`, null)
        .then((response) => {
          if (response.message) {
            alertStore.successSnackbar(response.message);
          }
          response["loading"] = false;
          response["error"] = null;
          this.logged_user = response;
          this.tweets = response.publications;
        })
        .catch((response) => {
          //console.log(response.err);
          alertStore.error(response.err);
          this.logged_user = { loading: false, error: response.err };
        });
    },
    async getByUserName(userName: string) {
      const alertStore = useAlertStore();
      this.searched_user = { loading: true, error: null };
      await fetchWrapper
        .get(`${baseUrl}/user?username=${userName}`, null)
        .then(async (response) => {
          if (response.message) {
            alertStore.successSnackbar(response.message);
          }
          response["loading"] = false;
          response["error"] = null;
          this.searched_user = response;
          await this.userFollows(userName);
          this.searched_user.username = userName;
          this.tweets = response.publications;
        })
        .catch((response) => {
          //console.log(response.err);
          alertStore.error(response.err);
          this.searched_user = { loading: false, error: response.err };
        });
    },
    async getTweetById(tweetID: string) {
      const alertStore = useAlertStore();
      await fetchWrapper
        .get(`${baseUrl}/publication/${tweetID}`, null)
        .then((entry) => {
          if (!entry.pfp_url) entry.pfp_url = "/E07/logo_without_letters.png";
          const aux: publication = {
            id: entry._id,
            username: entry.owner_username,
            content: {
              text: entry.content.text,
            },
            date: entry.date,
            fav_count: entry.fav_count,
            liked: entry.liked,
            pfp_url: entry.pfp_url,
            comments: entry.comments,
          };
          this.searched_tweet = aux;
          console.log(aux);
        })
        .catch((response) => {
          //console.log(response.err);
          alertStore.error(response.err);
        });
    },
    async userFollows(userName: string) {
      const alertStore = useAlertStore();
      await fetchWrapper
        .get(`${baseUrl}/user/follows/${userName}`, null)
        .then((response) => {
          if (response.message) {
            alertStore.successSnackbar(response.message);
          }
          this.searched_user.followed = response;
        })
        .catch((response) => {
          //console.log(response.err);
          alertStore.error(response.err);
          this.searched_user = { loading: false, error: response.err };
        });
    },
  },
});
