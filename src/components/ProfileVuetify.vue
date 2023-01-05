<script setup lang="ts">
import EditProfilePopUp from "./EditProfilePopUp.vue";
</script>

<template>
  <v-container>
    <EditProfilePopUp
      :show="showEditProfilePopUp"
      @closeEditPopUp="showEditProfilePopUp = false"
    />
    <v-row>
      <v-col align-self="center">
        <v-img :src="userStore.logged_user.pfp_url" aspect-ratio="6" />
      </v-col>
    </v-row>
    <v-row>
      <v-col align-self="center">
        <v-card-title style="text-align: center; font-size: 33px"
          >{{ user.username }}
          <v-btn
            @click="showEditProfilePopUp = !showEditProfilePopUp"
            prepend-icon="mdi-pencil"
            color="grey"
            size="small"
          >
            Edit
          </v-btn>
        </v-card-title>
      </v-col>
    </v-row>
    <!-- <v-btn
      @click="followUser"
      elevation="2"
      class="mx-auto text-xs-center"
      style="display: flex; width: 150px; height: 40px; color: white"
      rounded
      :style="{ 'background-color': followClicked ? 'grey' : '#1f548b' }"
    >
      <template v-if="followClicked">
        <v-icon>mdi-account-check</v-icon>
        Followed
      </template>
      <template v-else>
        <v-icon>mdi-account-circle</v-icon>
        Follow
      </template>
    </v-btn> -->
    <v-container>
      <TweetVuetify
        v-for="tweet in publications"
        :key="tweet.id"
        :tweet="tweet"
        style="border-bottom: 1px solid grey"
        @remove="removeTweetComponent"
      />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";
import TweetVuetify from "./TweetVuetify.vue";
import { storeToRefs } from "pinia";
import { useUsersStore, useAuthStore, useAlertStore } from "@/stores";

const baseUrl = `${expressJS_url}`;
const userStore = useUsersStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();
interface publication {
  id: string;
  username: string;
  content: {
    text: string;
  };
  date: string;
  fav_count?: number;
  liked?: boolean;
  pfp_url?: string;
}

export default {
  name: "SignUp",
  components: {
    TweetVuetify,
  },
  data() {
    return {
      textAreaValue: "",
      user: storeToRefs(userStore).logged_user,
      showEditProfilePopUp: false,
      publications: new Array(),
      // followClicked: false,
    };
  },

  // computed: {
  //   sortedPublications() {
  //     return this.publications.sort((a, b) => {
  //       const dateA = new Date(a.date);
  //       const dateB = new Date(b.date);
  //       if (dateA < dateB) {
  //         return 1;
  //       } else if (dateA > dateB) {
  //         return -1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   },
  // },

  methods: {
    async removeTweetComponent(tweetID: string) {
      console.log("removing form element", tweetID);
      const index = this.publications.findIndex((f) => f.id === tweetID);
      this.publications.splice(index, 1);
      alertStore.successSnackbar("Tweet deleted");
    },
    addTweetFirst(tweet: publication) {
      this.publications.unshift({
        id: tweet.id,
        username: this.user.username,
        text: tweet.content.text,
        date: tweet.date,
        fav_count: tweet.fav_count,
        liked: tweet.liked,
        pfp_url: tweet.pfp_url,
      });
    },
  },
  async beforeMount() {
    await userStore.getById(this.$route.params.userID as string);
    const tweets = userStore.tweets;
    if (tweets !== null) {
      const copy: String[] = tweets;
      copy.forEach(async (id) => {
        await fetchWrapper
          .get(`${baseUrl}/publication/${id}`, null)
          .then((response) => {
            if (response.message) {
              alertStore.successSnackbar(response.message);
            }
            if (!response.pfp_url) response.pfp_url = "/E07/logo_without_letters.png";
            let aux: publication = {
              id: response._id,
              username: response.owner_username,
              content: {
                text: response.content.text,
              },
              date: response.date,
              fav_count: response.fav_count,
              liked: response.liked,
              pfp_url: response.pfp_url,
            };
            this.addTweetFirst(aux);
          })
          .catch((response) => {
            //console.log(response.err);
            alertStore.error(response.err);
          });
      });
    }
  },
};
</script>
