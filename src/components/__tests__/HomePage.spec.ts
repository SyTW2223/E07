import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mount } from "@vue/test-utils";

import HomePage from "../HomePage.vue";

const vuetify = createVuetify({ components, directives });
const wrapper = mount(HomePage, {
  global: {
    plugins: [vuetify],
  },
});

describe("HomePage", () => {
  // it("renders properly", () => {
  //   expect(wrapper.text()).toContain("Lorem Ipsum");
  // });

  it("contains a test button", () => {
    const middlewareButton = wrapper.find(".v-btn");
    expect(middlewareButton.text()).toContain("Middleware");
  });
});
