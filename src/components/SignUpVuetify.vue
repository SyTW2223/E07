<template>
  <v-container>
    <v-img src="/E07/logo.png" style="width: 15%" class="mx-auto"></v-img>
  </v-container>

  <v-form ref="form" v-model="form">
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
        :rules="rules.passwd"
        hide-details="auto"
        v-model="password"
        required
        style="width: 100%; justify-content: center; align-items: center"
      ></v-text-field>

      <v-text-field
        prepend-icon="mdi-lock"
        label="Verify password"
        type="password"
        :rules="[rules.v_passwd(password, verify_password)]"
        v-model="verify_password"
        hide-details="auto"
        style="width: 100%; justify-content: center; align-items: center"
      ></v-text-field>
      <v-container>
        <v-btn
          @click="onSubmit"
          rounded
          :disabled="!form"
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
import { useUsersStore, useAlertStore } from "@/stores";
const alertStore = useAlertStore();
export default {
  name: "SignUp",
  data() {
    return {
      form: false,
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
        passwd: [
          (password: string) => !!password || "Required.",
          (password: string) =>
            /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password) ||
            "A-z numbers and length 8",
        ],
        v_passwd: (password: string, verify_password: string) =>
          verify_password == password || "Passwords are different",
      },
    };
  },

  methods: {
    async onSubmit() {
      if (this.password !== this.verify_password) {
        alertStore.error("Passwords do not match");
        return;
      }
      const userStore = useUsersStore();
      await userStore
        .register(this)
        .then((response) => {
          this.$router.push({ name: "log-in" });
        })
        .catch((response) => {
          alertStore.error(response.err);
        });
    },
  },
};
</script>