<template>
  <div class="greetings">
    <v-container>
      <v-card-text>
        <v-text-field
          density="compact"
          variant="solo"
          label="Write here to add a publication..."
          append-inner-icon="mdi-pencil"
          single-line
          hide-details
          v-model="textAreaValue"
          @click:append-inner="postTweet"
        ></v-text-field>
      </v-card-text>
    </v-container>

    <v-container>
      <transition name="fade">
        <v-container>
          <TweetVuetify
            v-for="tweet in publications"
            :key="tweet.id"
            :tweet="tweet"
            style="border-bottom: 1px solid grey"
            @remove="removeTweetComponent"
          />
        </v-container>
      </transition>
    </v-container>
  </div>
</template>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";
import TweetVuetify from "./TweetVuetify.vue";
import { storeToRefs } from "pinia";
import { useUsersStore, useAuthStore } from "@/stores";

const baseUrl = `${expressJS_url}`;
const userStore = useUsersStore();
const authStore = useAuthStore();

interface publication {
  id: string;
  username: string;
  content: {
    text: string;
  };
  date: string;
  fav_count: number;
  liked: boolean;
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
    };
  },
  //[
  //   {
  //     id: 1,
  //     username: "Sergio",
  //     text: "🎲Hoy he estado jugando con la lotería de Navidad.",
  //     date: "2022-01-02",
  //     numLikes: 50,
  //     Url: "/E07/logo_without_letters.png",
  //   },
  // ],
  methods: {
    async removeTweetComponent(tweetID: string) {
      console.log("removing form element", tweetID);
      const index = this.publications.findIndex((f) => f.id === tweetID);
      this.publications.splice(index, 1);
    },
    async postTweet() {
      return await fetchWrapper
        .post(`${baseUrl}/publication`, {
          content: {
            text: this.textAreaValue,
          },
          date: new Date(),
        })
        .then((entry) => {
          let aux: publication = {
            id: entry._id,
            username: entry.owner_username,
            content: {
              text: entry.content.text,
            },
            date: entry.date,
            fav_count: entry.fav_count,
            liked: entry.liked,
          };
          this.addTweetFirst(aux);
          this.textAreaValue = "";
        })
        .catch((response) => {
          console.log(response.err);
          alert(response.err);
        });
    },
    addTweetFirst(tweet: publication) {
      this.publications.unshift({
        id: tweet.id,
        username: tweet.username,
        text: tweet.content.text,
        date: tweet.date,
        fav_count: tweet.fav_count,
        liked: tweet.liked,
        Url: "/E07/logo_without_letters.png",
      });
    },
  },
  async beforeMount() {
    await fetchWrapper
      .get(`${baseUrl}/publication/`, null)
      .then((publications) => {
        publications.forEach((entry: any) => {
          let aux: publication = {
            id: entry._id,
            username: entry.owner_username,
            content: {
              text: entry.content.text,
            },
            date: entry.date,
            fav_count: entry.fav_count,
            liked: entry.liked,
          };
          this.addTweetFirst(aux);
        });
      })
      .catch((response) => {
        //console.log(response.err);
        alert(response.err);
      });
  },
};
</script>
