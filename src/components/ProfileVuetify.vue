<template>
  <v-container>
    <v-img src="/E07/logo.png" aspect-ratio="6" class="mx-auto" />
    <v-card-title style="text-align: center; font-size: 33px"
      >{{ user.username }}
    </v-card-title>
    <v-btn
      @click="followUser"
      elevation="2"
      class="mx-auto text-xs-center"
      style="display: flex; width: 150px; height: 40px; color: white"
      rounded
      :style="{ 'background-color': followClicked ? 'grey' : '#1f548b' }"
    >
      <template v-if="followClicked">
        <v-icon>mdi-account-check</v-icon>
        Followed
      </template>
      <template v-else>
        <v-icon>mdi-account-circle</v-icon>
        Follow
      </template>
    </v-btn>
    <v-container>
      <TweetVuetify
        v-for="tweet in sortedPublications"
        :key="tweet.id"
        :tweet="tweet"
        style="border-bottom: 1px solid grey"
        @remove="removeTweetComponent"
      />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";
import TweetVuetify from "./TweetVuetify.vue";
import { storeToRefs } from "pinia";
import { useUsersStore, useAuthStore, useAlertStore } from "@/stores";

const baseUrl = `${expressJS_url}`;
const userStore = useUsersStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();
interface publication {
  id: string;
  content: {
    text: string;
  };
  date: string;
  fav_count: number;
}

export default {
  name: "SignUp",
  components: {
    TweetVuetify,
  },
  data() {
    return {
      textAreaValue: "",
      user: storeToRefs(userStore).user,
      publications: new Array(),
      followClicked: false,
    };
  },

  // computed: {
  //   sortedPublications() {
  //     return this.publications.sort((a, b) => {
  //       const dateA = new Date(a.date);
  //       const dateB = new Date(b.date);
  //       if (dateA < dateB) {
  //         return 1;
  //       } else if (dateA > dateB) {
  //         return -1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   },
  // },

  methods: {
    async removeTweetComponent(tweetID: string) {
      console.log("removing form element", tweetID);
      const index = this.publications.findIndex((f) => f.id === tweetID);
      this.publications.splice(index, 1);
      alertStore.successSnackbar("Tweet deleted");
    },
    addTweetFirst(tweet: publication) {
      this.publications.unshift({
        id: tweet.id,
        username: this.user.username,
        text: tweet.content.text,
        date: tweet.date,
        fav_count: tweet.fav_count,
        Url: "/E07/logo_without_letters.png",
      });
    },

    async followUser() {
      this.followClicked = !this.followClicked;
    },
  },
  async beforeMount() {
    if (authStore.user_id) {
      await userStore.getById(authStore.user_id);
    }

    const tweets = userStore.tweets;
    if (tweets !== null) {
      const copy: String[] = tweets;
      copy.forEach(async (id) => {
        await fetchWrapper
          .get(`${baseUrl}/publication/${id}`, null)
          .then((response) => {
            if (response.message) {
              alertStore.successSnackbar(response.message);
            }
            let aux: publication = {
              id: response._id,
              content: {
                text: response.content.text,
              },
              date: response.date,
              fav_count: response.fav_count,
            };
            this.addTweetFirst(aux);
          })
          .catch((response) => {
            //console.log(response.err);
            alertStore.error(response.err);
          });
      });
    }
  },
};
</script>
