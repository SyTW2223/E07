<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <v-app>
    <v-app-bar color="white" density="compact">
      <v-tabs>
        <v-tab to="/" class="home-tabs">
          <v-img
            src="/E07/logo_without_letters.png"
            height="50px"
            width="50px"
          />
        </v-tab>
        <v-tab to="/log-in"> Log in </v-tab>
        <v-tab to="/sign-up"> Sign Up </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-container>
      <RouterView />
    </v-container>
  </v-app>
</template>
