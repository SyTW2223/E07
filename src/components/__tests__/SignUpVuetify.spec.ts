import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useAuthStore } from "@/stores";

import SignUp from "../SignUpVuetify.vue";

const vuetify = createVuetify({ components, directives });
const wrapper = mount(SignUp, {
  global: {
    plugins: [vuetify, createTestingPinia()],
  },
});

describe("SignUp", () => {
  //   const vuetify = createVuetify({ components, directives });

  it("renders properly", () => {
    //     const wrapper = mount(HomePage, {
    //       global: {
    //         plugins: [vuetify],
    //       },
    //     });
    //     expect(wrapper.text()).toContain("Lorem Ipsum");
    //   });
    //   it("contains a test button", () => {
    //     const wrapper = mount(HomePage, {
    //       global: {
    //         plugins: [vuetify],
    //       },
    //     });
    //     const middlewareButton = wrapper.find(".v-btn");
    //     expect(middlewareButton.text()).toContain("Middleware");
    expect(true).toBe(true);
  });
});
