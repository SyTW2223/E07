<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
  <v-card style="width: 100%; margin: 0 auto; border-radius: 2px">
    <v-card-title>
      <v-avatar size="40px">
        <router-link :to="`/${tweet.username}`">
          <!-- <v-img v-bind:src="tweet.Url"></v-img>  BUGGED, IMG DOESN'T LOAD-->
          <img
            style="max-width: 100%; max-height: 100%"
            :src="tweet.pfp_url"
            alt=""
          />
        </router-link>
      </v-avatar>
      <router-link style="margin-left:5px" class="username-link" :to="`/${tweet.username}`">
        {{ tweet.username }}
      </router-link>
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

      <v-btn
        v-if="tweet.username == usersStore.logged_user.username"
        @click="deleteTweet(tweet.id)"
        class="delete-button"
      >
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

.username-link {
  color: black;
}

.username-link:hover {
  background-color: transparent;
  text-decoration: underline;
}

.num {
  font-size: 90%;
}
</style>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";
import { useAlertStore, useUsersStore } from "@/stores";

const baseUrl = `${expressJS_url}`;
const alertStore = useAlertStore();
const usersStore = useUsersStore();
export default {
  props: ["tweet"],
  emits: ["remove"],
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
      await fetchWrapper
        .put(`${baseUrl}/publication/${tweetId}`, { liked: this.liked })
        .then(() => {
          if (this.liked) {
            alertStore.successSnackbar("Tweet liked");
            this.fav_count += 1;
          } else {
            alertStore.successSnackbar("Like removed from tweet");
            this.fav_count += -1;
          }
          console.log(this.fav_count);
        })
        .catch((response) => {
          alertStore.error(response.err);
          console.log(response.err);
        });
    },

    commentOnTweet(tweetId: any) {
      alertStore.successSnackbar("HOLA");
    },

    async deleteTweet(tweetId: any) {
      await fetchWrapper
        .delete(`${baseUrl}/publication/${tweetId}`, null)
        .then(() => {
          this.$emit("remove", tweetId);
        })
        .catch((response) => {
          alertStore.error(response.err);
          console.log(response.err);
        });
    },
  },
};
</script>
