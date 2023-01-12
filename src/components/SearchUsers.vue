<script setup lang="ts">
import SnackbarAlert from "./SnackbarAlert.vue";
</script>

<template>
  <div>
    <v-container>
      <v-card title="All users" variant="tonal"></v-card>
      <!-- <v-card-text>
        <v-text-field
          density="compact"
          variant="solo"
          label="Write here to add a publication..."
          :append-inner-icon="
            textAreaValue.length > 0 ? 'mdi-pencil' : 'undefined'
          "
          single-line
          hide-details
          v-model="textAreaValue"
          @click:append-inner="postTweet"
        ></v-text-field>
      </v-card-text> -->
    </v-container>
    <transition name="fade">
      <v-container>
        <UserCards
          v-for="user in users"
          :key="user.name"
          :user="user"
          style="border-bottom: 1px solid grey"
        />
      </v-container>
    </transition>
  </div>
</template>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";
import { storeToRefs } from "pinia";
import { useUsersStore, useAuthStore, useAlertStore } from "@/stores";
import UserCards from "./UserCardsVuetify.vue";

const baseUrl = `${expressJS_url}`;
const userStore = useUsersStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();

export default {
  name: "SignUp",
  components: {
    UserCards,
  },
  data() {
    return {
      textAreaValue: "",
      errorAlertText: "undefined",
      errorAlertEnabled: false,
      user: storeToRefs(userStore).logged_user,
      users: new Array(),
    };
  },
  methods: {
    addUserFirst(user: any) {
      this.users.push({
        username: user.username,
        pfp_url: user.pfp_url,
      });
    },
  },
  async beforeMount() {
    await fetchWrapper
      .get(`${baseUrl}/users/`, null)
      .then((users) => {
        users.forEach((user: any) => {
          if (!user.pfp_url) user.pfp_url = "/E07/logo_without_letters.png";
          let aux = {
            username: user.username,
            pfp_url: user.pfp_url,
          };
          this.addUserFirst(aux);
        });
      })
      .catch((response) => {
        //console.log(response.err);
        alertStore.error(response.err);
      });
  },
};
</script>
