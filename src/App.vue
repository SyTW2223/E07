<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" color="white" flat density="compact">
      <v-avatar color="grey-darken-1" size="32"></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs centered color="grey-darken-2">
        <v-tab to="/"> Home </v-tab>
        <v-tab to="/log-in"> Log in </v-tab>
        <v-tab to="/sign-up"> Sign Up </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey-darken-1"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <!-- <v-col cols="12" sm="2">
            <v-sheet
              rounded="lg"
              min-height="268"
            > 
            </v-sheet> 
          </v-col> -->

          <v-col>
            <v-sheet rounded="lg">
              <RouterView />
            </v-sheet>
          </v-col>

          <!-- <v-col cols="12" sm="2">
            <v-sheet
              rounded="lg"
              min-height="268"
            >
            </v-sheet>
          </v-col> -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>

  <!-- <v-app>
    <v-app-bar class="px-3" color="white" flat density="compact">
      <v-avatar color="grey-darken-1" size="32"></v-avatar>

      <v-spacer></v-spacer>

      <v-spacer></v-spacer>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey-darken-1"
        size="32"
      ></v-avatar>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app> -->
</template>
