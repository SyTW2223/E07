<template>
  <v-card style="width: 80%; margin: 0 auto; border-radius: 2px;">
    <v-card-title>{{ tweet.username }} <span class="date">{{ tweet.date }}</span></v-card-title>
    <v-card-text>{{ tweet.text }}</v-card-text>
  </v-card>
</template>

<style>
.date {
  font-weight: normal;
  font-size: 60%;
  text-align: right;
}
</style>

<script lang="ts">
export default {
  props: ["tweet"],
  data: () => ({}),
};
</script>
