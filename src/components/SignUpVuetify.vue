<template>
  <v-form v-model="valid">
    <v-container>
      <v-text-field
        label="Email address"
        type="email"
        :rules="rules.email"
        hide-details="auto"
        v-model="email"
      ></v-text-field>
      <v-text-field
        label="Account name (custom field)"
        hide-details="auto"
        v-model="username"
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        :rules="rules.password"
        hide-details="auto"
        v-model="password"
        required
      ></v-text-field>
      <v-text-field
        label="Verify password"
        type="password"
        :rules="rules.password"
        v-model="verifypassword"
        hide-details="auto"
      ></v-text-field>
      <v-btn @click="signUp" block color="primary" elevation="2">Sign Up</v-btn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
export default {
  name: "SignUp",
  data() {
    return {
      valid: false,
      email: "",
      username: "",
      password: "",
      verifypassword: "",
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
      if (this.password !== this.verifypassword) {
        alert("Passwords do not match");
        return;
      }
      try {
        const url = "http://localhost:3000/user";
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

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  display: block;
  margin-bottom: 20px;
}

button {
  display: block;
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
}

a {
  color: #42b983;
}
</style>
