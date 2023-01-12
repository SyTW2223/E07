<script setup lang="ts">
import { useUsersStore } from "@/stores";
// eslint-disable-next-line no-redeclare
const userStore = useUsersStore();
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <v-row>
            <v-col cols="9"> Edit Profile </v-col>
            <v-col class="text-center">
              <v-btn
                @click="$emit('closeEditPopUp')"
                rounded
                icon="mdi-close"
                class="mx-auto"
                size="x-small"
                style="display: block; background-color: grey; color: black"
              ></v-btn>
            </v-col>
          </v-row>
          <div class="modal-body">
            <v-form ref="form" v-model="form">
              <v-container
                style="
                  width: 100%;
                  justify-content: center;
                  align-items: center;
                "
              >
                <v-text-field
                  prepend-icon="mdi-image"
                  label="Url Profile Photo"
                  type="text"
                  :rules="rules.link"
                  hide-details="auto"
                  v-model="userStore.user_profile_changes.pfp_url"
                  style="
                    width: 100%;
                    justify-content: center;
                    align-items: center;
                  "
                ></v-text-field>
              </v-container>
            </v-form>
          </div>

          <div class="modal-footer">
            <v-btn
              @click="updateUserData"
              rounded
              elevation="2"
              class="mx-auto"
              style="display: block; background-color: #0ebbb5; color: white"
              >Save</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { fetchWrapper } from "@/helpers";
import { expressJS_url } from "../config/env.frontend";
import { useAuthStore, useAlertStore } from "@/stores";
const authStore = useAuthStore();
const alertStore = useAlertStore();
const userStore = useUsersStore();
const baseUrl = `${expressJS_url}`;
export default {
  name: "SignUp",
  props: {
    show: Boolean,
  },
  emits: ["closeEditPopUp"],
  data() {
    return {
      form: false,
      rules: {
        link: [
          (link: string) =>
            /^(https?:\/\/.*\.(?:png|jpg))?$/.test(link) ||
            "Enter a valid image link png or jpg",
        ],
      },
    };
  },
  methods: {
    async updateUserData() {
      this.$emit("closeEditPopUp");
      await fetchWrapper
        .put(`${baseUrl}/user/${authStore.user_id}`, {
          // eslint-disable-next-line no-undef
          changes: userStore.user_profile_changes,
        })
        .then((response) => {
          userStore.logged_user.pfp_url =
            userStore.user_profile_changes.pfp_url;
          alertStore.successSnackbar(response.message);
        })
        .catch((response) => {
          alertStore.error(response.err);
          console.log(response.err);
        });
    },
  },
};
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
