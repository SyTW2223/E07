<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-text-field
          label="Email"
          type="email"
          :rules="rules.email"
          hide-details="auto"
          v-model="email"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          :rules="rules.password"
          hide-details="auto"
          v-model="password"
        ></v-text-field>

        <v-btn @click="logIn" block color="primary" elevation="2">Log In</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
export default {
  name: "LogIn",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      rules: {
        email: [
          (email: string) => !!email || "Required.",
          (email: string) =>
            /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email) ||
            "Enter a valid email",
        ],
        password: [
          (password: string) => !!password || "Required.",
          (password: string) =>
            /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password) ||
            "A-z numbers and length 8",
        ],
      },
    };
  },
  methods: {
    async logIn() {
      try {
        const url = "http://localhost:3000/login";
        await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        }).then((response) => {
          response.json().then((obj) => {
            alert(obj.message);
          });
          this.$router.push({ name: "home" });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
