import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import router from "../../router/index";
import Comment from "../CommentVuetify.vue";

const vuetify = createVuetify({ components, directives });
const wrapper = mount(Comment, {
  global: {
    plugins: [vuetify, createTestingPinia(), router],
  },
  propsData: {
    comment: {
      user: {
        username: "pepe",
        pfp_url: "url.png",
      },
      text: "text",
    },
  },
});

describe("CommentVuetify", () => {
  it("debería existir el componente de comentario", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("debería tener el valor 'pepe' en el campo username", () => {
    expect(wrapper.vm.comment.user.username).toBe("pepe");
  });

  it("debería tener el valor 'url.png' en el campo fpf_url", () => {
    expect(wrapper.vm.comment.user.pfp_url).toBe("url.png");
  });

  it("debería tener el valor 'text' en el campo text", () => {
    expect(wrapper.vm.comment.text).toBe("text");
  });
});
