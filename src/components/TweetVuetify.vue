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

      <v-btn @click="deleteTweet(tweet.id)" class="delete-button">
        <v-icon style="margin-left: auto">mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style>
.date {
  font-size: 60%;
  float: right;
}

.delete-button:hover {
  color: red;
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
  emits: ["error", "remove"],
  data: () => ({
    liked: false,
    fav_count: 0,
  }),

  created() {
    this.fav_count = this.tweet.fav_count;
    this.liked = this.tweet.liked;
  },

  methods: {
    async likeTweet(tweetId: string) {
      this.liked = !this.liked;
      try {
        await fetchWrapper
          .put(`${baseUrl}/publication/${tweetId}`, { liked: this.liked })
          .then(() => {
            //hacer que se borre de la pantalla
          });
      } catch (err) {
        console.log(err);
      }
      //dentro de un .then() no consegui que funcionara :/
      this.fav_count += this.liked ? 1 : -1;
      console.log(this.fav_count);
    },

    commentOnTweet(tweetId: any) {
      // y esto
    },

    async deleteTweet(tweetId: any) {
      await fetchWrapper
        .delete(`${baseUrl}/publication/${tweetId}`, null)
        .then(() => {
          this.$emit("remove", tweetId);
        })
        .catch((response) => {
          this.$emit("error", response.err);
          console.log(response.err);
        });
    },
  },
};
</script>
