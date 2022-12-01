<template>
  <div id="app">
    <form @submit.prevent="logIn">
      <label>
        Email address
        <input type="email" v-model="email" />
      </label>
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <v-btn type="submit" block color="primary" elevation="2">Log In</v-btn>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
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
