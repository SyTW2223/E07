<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <v-card style="width: 80%; margin: 0 auto; border-radius: 2px">
    <v-card-title>
      <v-avatar size="30px">
        <router-link :to="`/${comment.user.username}`">
          <img
            style="max-width: 80%; max-height: 80%"
            :src="comment.user.pfp_url"
            alt=""
          />
        </router-link>
      </v-avatar>
      <router-link
        style="margin-left: 5px"
        class="username-link"
        :to="`/${comment.username}`"
      >
        {{ comment.user.username }}
      </router-link>
    </v-card-title>
    <v-card-text>{{ comment.text }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";
import { useAlertStore, useUsersStore } from "@/stores";

const baseUrl = `${expressJS_url}`;
const alertStore = useAlertStore();
const usersStore = useUsersStore();

export default {
  props: ["comment"],
};
</script>
