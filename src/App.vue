<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore, useAlertStore, useUsersStore } from "@/stores";
import CustomAlertVue from "./components/CustomAlert.vue";
import SnackbarAlert from "./components/SnackbarAlert.vue";
</script>

<template>
  <v-app>
    <v-app-bar color="white" density="compact">
      <v-tabs>
        <v-tab to="/" class="home-tabs" :hide-slider="true">
          <v-img
            src="/E07/logo_without_letters.png"
            height="50px"
            width="50px"
          />
        </v-tab>
        <v-tab v-if="!isLogged()" to="/log-in"> Log in </v-tab>
        <v-tab v-if="!isLogged()" to="/sign-up"> Sign Up </v-tab>
        <v-tab v-if="isLogged()" :to="`/profile/${useAuthStore().user_id}`"
          >Profile</v-tab
        >
        <v-tab v-if="isLogged()" :to="`/search/tweets`">Tweets</v-tab>
        <v-tab v-if="isLogged()" :to="`/search/users`">Users</v-tab>
        <v-tab v-if="isLogged()" @click="useAuthStore().logout()">
          Log Out
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-container>
      <CustomAlertVue v-show="useAlertStore().customAlert.enabled" />
      <RouterView />
    </v-container>
    <SnackbarAlert />
  </v-app>
</template>

<script lang="ts">
export default {
  props: [],
  data: () => ({}),

  created() {},

  methods: {
    isLogged() {
      return useAuthStore().api_token !== null || undefined ? true : false;
    },
  },
};
</script>
