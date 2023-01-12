<script setup lang="ts">
import SnackbarAlert from "./SnackbarAlert.vue";
</script>

<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            @input="delayedGetTweetsBySearchTerm(search)"
          >
            ></v-text-field
          >
        </v-card-title>
      </v-card>
    </v-container>
    <v-container>
      <v-card title="All published tweets" variant="tonal"></v-card>
      <!-- <v-card-text>
        <v-text-field
          density="compact"
          variant="solo"
          label="Write here to add a publication..."
          :append-inner-icon="
            textAreaValue.length > 0 ? 'mdi-pencil' : 'undefined'
          "
          single-line
          hide-details
          v-model="textAreaValue"
          @click:append-inner="postTweet"
        ></v-text-field>
      </v-card-text> -->
    </v-container>
    <transition name="fade">
      <v-container>
        <TweetVuetify
          v-for="tweet in tweets"
          :key="tweet.id"
          :tweet="tweet"
          style="border-bottom: 1px solid grey"
          @remove="removeTweetComponent"
        />
      </v-container>
    </transition>
  </div>
</template>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";
import TweetVuetify from "./TweetVuetify.vue";
import { storeToRefs } from "pinia";
import { useUsersStore, useAuthStore, useAlertStore } from "@/stores";
import { debounce } from "lodash";

const baseUrl = `${expressJS_url}`;
const userStore = useUsersStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();
interface publication {
  id: string;
  username: string;
  content: {
    text: string;
  };
  date: string;
  fav_count?: number;
  comments_count?: number;
  liked?: boolean;
  pfp_url?: string;
}

export default {
  name: "SignUp",
  components: {
    TweetVuetify,
  },
  data() {
    return {
      search: "",
      textAreaValue: "",
      errorAlertText: "undefined",
      errorAlertEnabled: false,
      user: storeToRefs(userStore).logged_user,
      tweets: new Array(),
      searchDelay: 1000,
      delayedSearchFunc: new Function(),
    };
  },
  methods: {
    async removeTweetComponent(tweetID: string) {
      console.log("removing form element", tweetID);
      const index = this.tweets.findIndex((f) => f.id === tweetID);
      this.tweets.splice(index, 1);
      alertStore.successSnackbar("Tweet deleted");
    },
    addTweetFirst(tweet: publication) {
      this.tweets.push({
        id: tweet.id,
        username: tweet.username,
        text: tweet.content.text,
        date: tweet.date,
        fav_count: tweet.fav_count,
        comments_count: tweet.comments_count,
        liked: tweet.liked,
        pfp_url: tweet.pfp_url,
      });
    },
    async delayedGetTweetsBySearchTerm(term: string) {
      await this.delayedSearchFunc(term);
    },
    async getTweetBySearchTerm(term: string) {
      await fetchWrapper
        .get(`${baseUrl}/publications?searchTerm=${term}`, null)
        .then((tweets) => {
          if (tweets.length == 0) {
            this.tweets = [];
            return;
          }
          this.tweets = [];
          tweets.forEach((tweet: any) => {
            if (!tweet.pfp_url) tweet.pfp_url = "/E07/logo_without_letters.png";
            let aux: publication = {
              id: tweet._id,
              username: tweet.owner_username,
              content: {
                text: tweet.content.text,
              },
              date: tweet.date,
              fav_count: tweet.fav_count,
              comments_count: tweet.comments_count,
              liked: tweet.liked,
              pfp_url: tweet.pfp_url,
            };
            this.addTweetFirst(aux);
          });
        })
        .catch((response) => {
          //console.log(response.err);
          alertStore.error(response.err);
        });
    },
  },
  async beforeMount() {
    await userStore.getById(authStore.user_id);
    this.delayedSearchFunc = debounce(
      this.getTweetBySearchTerm,
      this.searchDelay
    );
    await fetchWrapper
      .get(`${baseUrl}/publications/`, null)
      .then((publications) => {
        publications.forEach((entry: any) => {
          if (!entry.pfp_url) entry.pfp_url = "/E07/logo_without_letters.png";
          let aux: publication = {
            id: entry._id,
            username: entry.owner_username,
            content: {
              text: entry.content.text,
            },
            date: entry.date,
            fav_count: entry.fav_count,
            comments_count: entry.comments_count,
            liked: entry.liked,
            pfp_url: entry.pfp_url,
          };
          this.addTweetFirst(aux);
        });
      })
      .catch((response) => {
        //console.log(response.err);
        alertStore.error(response.err);
      });
  },
};
</script>
