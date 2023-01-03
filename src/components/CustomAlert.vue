<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useAlertStore } from "@/stores";

const alertStore = useAlertStore();
const { customAlert } = storeToRefs(alertStore);
</script>

<template>
  <transition>
    <v-container v-if="customAlert.enabled">
      <v-alert v-bind:type="customAlert.type">
        <v-btn
          @click="customAlert.enabled = !customAlert.enabled"
          black
          size="x-small"
          append-icon="mdi-close"
          class="float-right"
        ></v-btn
        >{{ customAlert.msg }}</v-alert
      >
    </v-container>
  </transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
