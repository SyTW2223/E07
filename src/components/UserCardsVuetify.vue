<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
  <v-card
    style="width: 100%; margin: 0 auto; border-radius: 2px"
    :to="`/${user.username}`"
  >
    <v-card-title>
      <v-avatar size="40px">
        <router-link :to="`/${user.username}`">
          <!-- <v-img v-bind:src="tweet.Url"></v-img>  BUGGED, IMG DOESN'T LOAD-->
          <img
            style="max-width: 100%; max-height: 100%"
            :src="user.pfp_url"
            alt=""
          />
        </router-link>
      </v-avatar>
      <router-link
        style="margin-left: 5px"
        class="username-link"
        :to="`/${user.username}`"
      >
        {{ user.username }}
      </router-link>
    </v-card-title>
    <!-- <v-card-text>{{ tweet.text }}</v-card-text>
    <v-card-actions>
      <v-btn
        @click.prevent="likeTweet(tweet.id)"
        :style="{ color: liked ? 'red' : 'grey' }"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span class="num">{{ fav_count }}</span>
      <v-btn @click.prevent="commentOnTweet(tweet.id)" color="blue">
        <v-icon>mdi-comment</v-icon>
      </v-btn>
      <span class="num">{{ comments_count }}</span>
      <v-btn
        v-if="tweet.username == usersStore.logged_user.username"
        @click.prevent="deleteTweet(tweet.id)"
        class="delete-button"
      >
        <v-icon style="margin-left: auto">mdi-delete</v-icon>
      </v-btn>
    </v-card-actions> -->
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
export default {
  props: ["user"],
  emits: ["remove"],
  data: () => ({}),

  methods: {},
};
</script>
