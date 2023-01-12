<script setup lang="ts">
import { useUsersStore, useAuthStore, useAlertStore } from "@/stores";
const authStore = useAuthStore();
const alertStore = useAlertStore();
</script>

<template>
  <v-container>
    <v-img src="/E07/logo.png" style="width: 15%" class="mx-auto"></v-img>
  </v-container>

  <div>
    <v-form ref="form" v-model="form">
      <v-container
        style="width: 50%; justify-content: center; align-items: center"
      >
        <v-text-field
          label="Email"
          type="email"
          :rules="rules.email"
          hide-details="auto"
          v-model="email"
          data-email
          data-test="email-text-box"
          prepend-icon="mdi-email"
          style="width: 100%; justify-content: center; align-items: center"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          :rules="rules.password"
          hide-details="auto"
          v-model="password"
          data-password
          data-test="password-text-box"
          prepend-icon="mdi-lock"
          style="width: 100%; justify-content: center; align-items: center"
        ></v-text-field>
        <v-container
          style="
            justify-content: center;
            align-items: center;
            text-align: center;
          "
        >
          <v-btn
            @click="logIn"
            elevation="2"
            class="mx-auto"
            :disabled="!form"
            style="display: block; background-color: #0ebbb5; color: white"
            rounded
            >Log In</v-btn
          >

          <v-card-text> or if you don't have an account yet </v-card-text>

          <v-btn
            @click="goToSignUpPage"
            elevation="2"
            class="mx-auto"
            style="display: block; background-color: #1f548b; color: white"
            rounded
            >Sign Up</v-btn
          >
        </v-container>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
export default {
  name: "LogIn",
  data() {
    return {
      form: false,
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
      const authStore = useAuthStore();
      const email: string = this.email;
      const password: string = this.password;
      return await authStore
        .login(email, password)
        .then(() => {})
        .catch((error) => {
          console.log(error);
          alertStore.error(error);
        });
    },
    goToSignUpPage() {
      this.$router.push("/sign-up");
    },
  },
};
</script>
