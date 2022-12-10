import { describe, it, expect, vi, beforeEach } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import LogInVuetify from "../LogInVuetify.vue";

const vuetify = createVuetify({ components, directives });
const wrapper = mount(LogInVuetify, {
  global: {
    plugins: [vuetify, createTestingPinia()],
  },
});

describe("LogInVuetify", () => {
  it("the test button should emit an event when clicked", async () => {
    const middlewareButton = await wrapper.find(".v-btn");
    const emailTextField = await wrapper.find('[data-test="email-text-box"]').get('input');
    const passwordTextField = await wrapper.find('[data-test="password-text-box"]').get('input');
    wrapper.vm.logIn = vi.fn();
    expect(wrapper.vm.logIn).toHaveBeenCalledTimes(0);
    await emailTextField.setValue("test@test.test");
    await passwordTextField.setValue("Test123456");
    // await wrapper.find("[data-email]").setValue("test@test.test");
    // await wrapper.find("[data-password]").setValue("Test123456");
    const result = await wrapper.vm.logIn();
    console.log(result)
    //await middlewareButton.trigger("click");
    await wrapper.vm.$nextTick();
    console.log(JSON.stringify(wrapper.emitted().myEvent));
    expect(wrapper.find("[data-email]").text()).toBe("true");
  });
});
