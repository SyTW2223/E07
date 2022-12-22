<template>
  <div class="greetings">
    <v-container>
        <transition name="fade">
          <v-container>
            <TweetVuetify 
              v-for="tweet in tweets"
              :key="tweet.id"
              :tweet="tweet"
              style="border-bottom: 1px solid grey"
            />
          </v-container>
        </transition>
      </v-container>

  <v-container
   class="justify-center textarea-button-wrapper"
  >
    <v-row>
      <v-col cols="0">
        <v-btn
          rounded
          style="background-color: #0ebbb5; color: white; margin-top: 10px;"
          @click="addTweet"
        >
      <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="11">
      <v-textarea
        v-model="textAreaValue"
        type="text"
        rows="1"
        placeholder="Write here to add a publication..."
        bg-color="white"
        auto-grow
      >
      </v-textarea>
    </v-col>
  </v-row>

</v-container>


    <v-container>
      <v-btn @click="addPublication" block color="primary" elevation="2"
        >Test Middleware</v-btn
      >
    </v-container>
  </div>
</template>

<style>
  /* Add styles for the wrapper div */
  .textarea-button-wrapper {
    position: fixed;  /* position the elements fixed at the bottom of the page */
    bottom: 0;  /* align the elements to the bottom of the page */
    z-index: 1;  /* set a higher z-index to bring the elements in front of the tweets scroll */
  }
</style>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { text } from "stream/consumers";
import { expressJS_url } from "../config/env.frontend";
import TweetVuetify from './TweetVuetify.vue'

const baseUrl = `${expressJS_url}`;
export default {
  name: "HomePage",
  components: {
    TweetVuetify,
  },
  data: () => ({
    textAreaValue: "",
    tweets: [
      { id: 1, username: 'Sergio', text: '🎲Hoy he estado jugando con la lotería de Navidad.', date: '2022-01-02', numLikes: 50,  Url: "/E07/logo_without_letters.png"},
      { id: 2, username: 'Mario', text: 'CYA es muy facil', date: '2022-01-02', numLikes: 178, Url: "/E07/Solid_black.png" }
    ],
  }),
  methods: {
    async addPublication() {
      return await fetchWrapper
        .post(`${baseUrl}/publication`, {
          content: {
            text: "Publicacion de prueba",
          },
          date: new Date(),
          fav_count: 0,
        })
        .then((response) => {
          alert(response.message);
        })
        .catch((response) => {
          console.log(response.err);
          alert(response.err);
        });
    },

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
          this.tweets.unshift({  // <-- use unshift() instead of push()
            id: response.publication.id,
            username: response.username,
            text: response.publication.content.text,
            date: response.publication.date,
            numLikes: 0,
            Url: "/E07/logo_without_letters.png"
          });  
          this.textAreaValue = ""
        })
        .catch((response) => {
          console.log(response.err);
          alert(response.err);
        });
    }
  },
};
</script>
