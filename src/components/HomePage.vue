<template>
  <div class="greetings">
    <v-container>
      <TweetVuetify 
        v-for="tweet in tweets"
        :key="tweet.id"
        :tweet="tweet"
        style="border-bottom: 1px solid grey"
      />
    </v-container>
    <v-container>
      <v-btn @click="addPublication" block color="primary" elevation="2"
        >Test Middleware</v-btn
      >
    </v-container>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";
import TweetVuetify from './TweetVuetify.vue'

const baseUrl = `${expressJS_url}`;
export default {
  name: "HomePage",
  components: {
    TweetVuetify,
  },
  data: () => ({
    tweets: [
      { id: 1, username: 'Sergio', text: '🎲Hoy he estado jugando con la lotería de Navidad.', date: '2022-01-02', numLikes: 50,  Url: "/E07/logo_without_letters.png"},
      { id: 2, username: 'Mario', text: 'CYA es muy facil', date: '2022-01-02', numLikes: 178, Url: "/E07/Solid_black.png" }
    ]
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
  },
};
</script>
