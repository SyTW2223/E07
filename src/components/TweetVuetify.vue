<template>
  <v-card style="width: 80%; margin: 0 auto; border-radius: 2px">
    <v-card-title>
      <v-avatar size="40px">
        <v-img v-bind:src="tweet.Url"></v-img>
      </v-avatar>
      {{ tweet.username }}
      <span class="date">{{ tweet.date }}</span>
    </v-card-title>
    <v-card-text>{{ tweet.text }}</v-card-text>
    <v-card-actions>
      <v-btn
        @click="likeTweet(tweet.id)"
        :style="{ color: liked ? 'red' : 'grey' }"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span class="num">{{ numLikes }}</span>
      <v-btn @click="commentOnTweet(tweet.id)" color="blue">
        <v-icon>mdi-comment</v-icon>
      </v-btn>
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
export default {
  props: ["tweet"],
  data: () => ({
    liked: false,
    numLikes: 0,
  }),

  created() {
    this.numLikes = this.tweet.numLikes;
  },

  methods: {
    likeTweet(tweetId: any) {
      this.liked = !this.liked;
      this.numLikes += this.liked ? 1 : -1;

      // rellenar esto
    },
    commentOnTweet(tweetId: any) {
      // y esto
    },
  },
};
</script>
