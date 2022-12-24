<template>
  <v-card style="width: 100%; margin: 0 auto; border-radius: 2px">
    <v-card-title>
      <v-avatar size="40px">
        <v-img v-bind:src="tweet.Url"></v-img>
      </v-avatar>
      {{ tweet.username }}
      <span class="date">{{ tweet.date.slice(0, 10) }}</span>
    </v-card-title>
    <v-card-text>{{ tweet.text }}</v-card-text>
    <v-card-actions>
      <v-btn
        @click="likeTweet(tweet.id)"
        :style="{ color: liked ? 'red' : 'grey' }"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span class="num">{{ fav_count }}</span>
      <v-btn @click="commentOnTweet(tweet.id)" color="blue">
        <v-icon>mdi-comment</v-icon>
      </v-btn>
      <!-- <span class="num">{{ tweet.id }}</span> -->
    </v-card-actions>
  </v-card>
</template>

<style>
.date {
  font-size: 60%;
  float: right;
}

.num {
  font-size: 90%;
}
</style>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";

const baseUrl = `${expressJS_url}`;

export default {
  props: ["tweet"],
  data: () => ({
    liked: false,
    fav_count: 0,
  }),

  created() {
    this.fav_count = this.tweet.fav_count;
  },

  methods: {
    async likeTweet(tweetId: string) {
      this.liked = !this.liked;
      try {
        await fetchWrapper
          .put(`${baseUrl}/publication/${tweetId}`, {liked: this.liked})
      } catch (err) {
        console.log(err)
      }
      //dentro de un .then() no consegui que funcionara :/
      this.fav_count += this.liked ? 1 : -1;
    },
    commentOnTweet(tweetId: any) {
      // y esto
    },
  },
};
</script>
