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
          data-email
          data-test="email-text-box"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          :rules="rules.password"
          hide-details="auto"
          v-model="password"
          data-password
          data-test="password-text-box"
        ></v-text-field>
        <v-container>
          <v-btn @click="logIn" block color="primary" elevation="2"
            >Log In</v-btn
          >
        </v-container>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/stores";

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
        const authStore = useAuthStore();
        const email: string = this.email;
        const password: string = this.password;
        return authStore
          .login(email, password)
          .then(() => {
            this.valid == true;
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
