<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useAlertStore } from "@/stores";

const alertStore = useAlertStore();
const { snackbarAlert } = storeToRefs(alertStore);
</script>

<template>
  <v-snackbar
    rounded="pill"
    v-model="snackbarAlert.enabled"
    v-bind:timeout="snackbarAlert.timeout"
  >
    {{ snackbarAlert.msg }}

    <template v-slot:actions>
      <v-btn
        color="cyan"
        variant="text"
        @click="snackbarAlert.enabled = !snackbarAlert.enabled"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
