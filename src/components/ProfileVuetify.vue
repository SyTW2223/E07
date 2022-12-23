<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h1>{{ user.username }}</h1>
      </v-col>
    </v-row>
    <v-row v-if="!user?.loading && !user?.error">
      <p>{{ user }}</p>
    </v-row>
    <v-row v-if="user?.loading">
      <v-col align="center">
        <v-progress-circular
          indeterminate
          color="primary"
          center
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="user?.error">
      <div class="text-center m-5">
        <div class="text-danger">Error loading user: {{ user.error }}</div>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { useUsersStore, useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
const userStore = useUsersStore();
const authStore = useAuthStore();
export default {
  name: "SignUp",
  data() {
    return {
      user: storeToRefs(userStore).user,
    };
  },
  methods: {},
  async mounted() {
    if (authStore.user_id) {
      await userStore.getById(authStore.user_id);
    }
  },
};
</script>
