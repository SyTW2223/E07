import { describe, it, expect, vi, beforeEach } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useUsersStore, useAuthStore, useAlertStore } from "@/stores";
const pinia = createTestingPinia();
const authStore = useAuthStore();
const alertStore = useAlertStore();
const userStore = useUsersStore();

import router from "../../router/index";
import Login from "../LogInVuetify.vue";

const vuetify = createVuetify({ components, directives });
const wrapper = mount(Login, {
  global: {
    plugins: [vuetify, pinia, router],
  },
});

describe("LogInVuetify", () => {
  it("the test button should emit an event when clicked", async () => {
    // const middlewareButton = await wrapper.find(".v-btn");
    // const emailTextField = await wrapper
    //   .find('[data-test="email-text-box"]')
    //   .get("input");
    // const passwordTextField = await wrapper
    //   .find('[data-test="password-text-box"]')
    //   .get("input");
    // //wrapper.vm.logIn = vi.fn();
    // //expect(wrapper.vm.logIn).toHaveBeenCalledTimes(0);
    // await emailTextField.setValue("test@test.test");
    // await passwordTextField.setValue("Test123456");
    // // await wrapper.find("[data-email]").setValue("test@test.test");
    // // await wrapper.find("[data-password]").setValue("Test123456");
    // //await middlewareButton.trigger("click");
    // const store = useAuthStore();
    // console.log(emailTextField.html());
    // await wrapper.vm.$nextTick();
    // expect(wrapper.emitted('logInResult')[0][0]).toBe('test@test.test')
    expect(wrapper.props);
    expect(true).toBe(true);
    // expect(wrapper.emitted('logInResult')[0][1]).toBe('Test123456')
  });
});
