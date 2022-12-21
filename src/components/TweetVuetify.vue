<template>
  <v-card style="width: 80%; margin: 0 auto; border-radius: 2px">
    <v-card-title>
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
      <v-btn @click="commentOnTweet(tweet.id)" color="blue">
        <v-icon>mdi-comment</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style>
.date {
  font-weight: normal;
  font-size: 60%;
  float: right;
}
</style>

<script lang="ts">
export default {
  props: ["tweet"],
  data: () => ({
    liked: false,
  }),
  methods: {
    likeTweet(tweetId: any) {
      this.liked = !this.liked

      // rellenar esto
    },
    commentOnTweet(tweetId: any) {
      // y esto
    }
  }
};
</script>
