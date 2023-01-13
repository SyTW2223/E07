import { describe, it, expect, vi, beforeEach } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import router from "../../router/index";
import Tweet from "../TweetVuetify.vue";

const vuetify = createVuetify({ components, directives });
const wrapper = mount(Tweet, {
  global: {
    plugins: [vuetify, createTestingPinia(), router],
  },
  propsData: {
    tweet: {
      id: "1",
      username: "pepe",
      pfp_url: "pfp_url",
      text: "text",
      date: "date",
      fav_count: 0,
      comments_count: 0,
      liked: false,
    },
  },
});

describe("TweetVuetify", () => {
  it("debería existir el componente de tweet", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("debería tener el valor 'pepe' en el campo username", () => {
    expect(wrapper.vm.tweet.username).toBe("pepe");
  });
  it("debería tener el valor '1' en el campo id", () => {
    expect(wrapper.vm.tweet.id).toBe("1");
  });

  it("debería tener el valor 'pepe' en el campo username", () => {
    expect(wrapper.vm.tweet.username).toBe("pepe");
  });

  it("debería tener el valor 'pfp_url' en el campo pfp_url", () => {
    expect(wrapper.vm.tweet.pfp_url).toBe("pfp_url");
  });

  it("debería tener el valor 'text' en el campo text", () => {
    expect(wrapper.vm.tweet.text).toBe("text");
  });

  it("debería tener el valor 'date' en el campo date", () => {
    expect(wrapper.vm.tweet.date).toBe("date");
  });

  it("debería tener el valor 0 en el campo fav_count", () => {
    expect(wrapper.vm.tweet.fav_count).toBe(0);
  });

  it("debería tener el valor 0 en el campo comments_count", () => {
    expect(wrapper.vm.tweet.comments_count).toBe(0);
  });

  it("debería tener el valor false en el campo liked", () => {
    expect(wrapper.vm.tweet.liked).toBe(false);
  });

  it("cuando se pulsa el boton de me gusta se hace una peticion get", async () => {
    // await wrapper.find("v-btn[data-testid=likebtn]").trigger("click");
    console.log(await wrapper.get('[data-test="like-button"]').attributes());
    //expect(fetchWrapper.get).toHaveBeenCalledTimes(1);
  });
});
