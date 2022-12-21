<template>
  <v-container>
    <v-img src="/E07/logo.png" style="width: 15%" class="mx-auto"></v-img>
  </v-container>

  <v-form v-model="valid">
    <v-container
      style="width: 50%; justify-content: center; align-items: center"
    >
      <v-text-field
        prepend-icon="mdi-email"
        label="Email address"
        type="email"
        :rules="rules.email"
        hide-details="auto"
        v-model="email"
        style="width: 100%; justify-content: center; align-items: center"
      ></v-text-field>

      <v-text-field
        prepend-icon="mdi-account"
        label="Account name (custom field)"
        hide-details="auto"
        v-model="username"
        style="width: 100%; justify-content: center; align-items: center"
      ></v-text-field>

      <v-text-field
        prepend-icon="mdi-lock"
        label="Password"
        type="password"
        :rules="rules.password"
        hide-details="auto"
        v-model="password"
        required
        style="width: 100%; justify-content: center; align-items: center"
      ></v-text-field>

      <v-text-field
        prepend-icon="mdi-lock"
        label="Verify password"
        type="password"
        :rules="rules.password"
        v-model="verify_password"
        hide-details="auto"
        style="width: 100%; justify-content: center; align-items: center"
      ></v-text-field>
      <v-container>
        <v-btn
          @click="signUp"
          rounded
          elevation="2"
          class="mx-auto"
          style="display: block; background-color: #0ebbb5; color: white"
          >Sign Up</v-btn
        >
      </v-container>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { expressJS_url } from "../config/env.frontend";
export default {
  name: "SignUp",
  data() {
    return {
      valid: false,
      email: "",
      username: "",
      password: "",
      verify_password: "",
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
    async signUp() {
      if (this.password !== this.verify_password) {
        alert("Passwords do not match");
        return;
      }
      try {
        const url = `${expressJS_url}/user`;
        await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            email: this.email,
            username: this.username,
            password: this.password,
          }),
        }).then((response) => {
          response.json().then((obj) => {
            alert(obj.message);
            this.$router.push({ name: "login" });
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
