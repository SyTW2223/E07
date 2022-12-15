
<template>
  <div class="greetings">
    <h1 class="green"></h1>
    <h3>HOMEPAGE</h3>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
    <v-container>
      <v-btn @click="addPublication" block color="primary" elevation="2"
        >Test Middleware</v-btn
      >
    </v-container>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

<script lang="ts">
import { fetchWrapper } from "@/helpers";

const baseUrl = `http://localhost:3000`;
export default {
  name: "HomePage",
  methods: {
    async addPublication() {
      try {
        return await fetchWrapper
          .post(`${baseUrl}/publication`, {
            content: {
              text: "Publicacion de prueba",
            },
            date: new Date(),
            fav_count: 0,
          })
          .then((message) => {
            alert(message);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
