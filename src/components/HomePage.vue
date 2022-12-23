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
          @click:append-inner="addTweet"
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
    async addTweet() {
      return await fetchWrapper
        .post(`${baseUrl}/publication`, {
          content: {
            text: this.textAreaValue,
          },
          date: new Date(),
          fav_count: 0,
        })
        .then((response) => {
          this.addTweetFirst(response);
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
        username: this.user.username,
        text: tweet.content.text,
        date: tweet.date,
        fav_count: tweet.fav_count,
        Url: "/E07/logo_without_letters.png",
      });
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
              alert(response.message);
            }
            //   {
            //     id: 1,
            //     username: "Sergio",
            //     text: "🎲Hoy he estado jugando con la lotería de Navidad.",
            //     date: "2022-01-02",
            //     numLikes: 50,
            //     Url: "/E07/logo_without_letters.png",
            //   },
            //console.log(response);
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
            alert(response.err);
          });
      });
    }
  },
};
</script>
