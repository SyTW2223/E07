<script setup lang="ts">
import { RouterLink } from "vue-router";
import TweetVuetify from "./TweetVuetify.vue";
import CommentVuetify from "./CommentVuetify.vue";
</script>

<template>
  <v-container>
    <TweetVuetify v-if="tweet_loaded" v-bind:tweet="tweet" />
  </v-container>

  <v-container>
    <v-card-text>
      <v-text-field
        density="compact"
        variant="solo"
        label="Write here to add a comment..."
        :append-inner-icon="
          commentAreaValue.length > 0 ? 'mdi-pencil' : 'undefined'
        "
        single-line
        hide-details
        v-model="commentAreaValue"
        @click:append-inner="postComment"
      ></v-text-field>
    </v-card-text>
  </v-container>

  <v-container v-if="tweet_loaded">
    <CommentVuetify
      v-for="comment in comments"
      :key="comment.user.username"
      :comment="comment"
      style="border-bottom: 1px solid grey"
    />
  </v-container>
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
import { useUsersStore, useAuthStore, useAlertStore } from "@/stores";

const baseUrl = `${expressJS_url}`;
const userStore = useUsersStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();

interface publication {
  id: string;
  username: string;
  text: string;
  date: string;
  fav_count?: number;
  liked?: boolean;
  pfp_url?: string;
  comments_count?: number;
  comments?: [
    {
      user: {
        username: string;
        pfp_url?: string;
      };
      text: string;
    }
  ];
}

interface comment {
  user: {
    username: string;
    pfp_url?: string;
  };
  text: string;
}

export default {
  emits: ["remove"],
  data: () => ({
    commentAreaValue: "",
    liked: false,
    fav_count: 0,
    tweet: {} as publication,
    tweet_loaded: false,
    comments: [] as comment[],
  }),

  created() {},

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
    async postComment() {
      return await fetchWrapper
        .put(`${baseUrl}/publication/comment/${this.tweet.id}`, {
          user: {
            username: userStore.logged_user.username as string,
          },
          text: this.commentAreaValue,
        })
        .then(() => {
          let aux: comment = {
            user: {
              username: userStore.logged_user.username as string,
              pfp_url: userStore.logged_user.pfp_url as string,
            },
            text: this.commentAreaValue,
          };
          this.addCommentFirst(aux);
          this.commentAreaValue = "";
          alertStore.successSnackbar("Comment added");
        })
        .catch((response) => {
          alertStore.error(response.err);
        });
    },
    addCommentFirst(comment: comment) {
      this.comments.unshift({
        user: {
          username: comment.user.username,
          pfp_url: comment.user.pfp_url,
        },
        text: comment.text,
      });
    },
  },
  async beforeCreate() {
    const tweetID: string = this.$route.params.tweetID as string;
    await fetchWrapper
      .get(`${baseUrl}/publication/${tweetID}`, null)
      .then((entry) => {
        if (!entry.pfp_url) entry.pfp_url = "/E07/logo_without_letters.png";
        const aux: publication = {
          id: entry._id,
          username: entry.owner_username,
          text: entry.content.text,
          date: entry.date,
          fav_count: entry.fav_count,
          liked: entry.liked,
          comments_count: entry.comments_count,
          pfp_url: entry.pfp_url,
          comments: entry.comments,
        };
        this.tweet = aux;
        this.comments = aux.comments as comment[];
        this.tweet_loaded = true;
      })
      .catch((response) => {
        //console.log(response.err);
        alertStore.error(response.err);
      });
  },
};
</script>
