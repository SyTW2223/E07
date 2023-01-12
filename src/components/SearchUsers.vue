<script setup lang="ts">
import SnackbarAlert from "./SnackbarAlert.vue";
</script>

<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            @input="delayedGetUserBySearchTerm(search)"
          >
            ></v-text-field
          >
        </v-card-title>
      </v-card>
    </v-container>
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
      <v-container v-if="users.length > 0">
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
import { debounce } from "lodash";

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
      search: "",
      textAreaValue: "",
      errorAlertText: "undefined",
      errorAlertEnabled: false,
      user: storeToRefs(userStore).logged_user,
      users: new Array(),
      searchDelay: 1000,
      delayedSearchFunc: new Function(),
    };
  },
  methods: {
    addUserFirst(user: any) {
      this.users.push({
        username: user.username,
        pfp_url: user.pfp_url,
      });
    },
    async delayedGetUserBySearchTerm(term: string) {
      await this.delayedSearchFunc(term);
    },
    async getUserBySearchTerm(term: string) {
      await fetchWrapper
        .get(`${baseUrl}/users?searchTerm=${term}`, null)
        .then((users) => {
          if (users.length == 0) {
            this.users = [];
            return;
          }
          this.users = [];
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
  },
  async beforeMount() {
    this.delayedSearchFunc = debounce(this.getUserBySearchTerm, this.searchDelay);
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
