import { createRouter, createWebHistory } from "vue-router";
import HelloWorldView from "../views/HelloWorldView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HelloWorldView,
    },
    {
      path: "/log-in",
      name: "login",
      component: () => import("../views/LogInView.vue"),
    },
    {
      path: "/sign-up",
      name: "signup",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SignUpView.vue"),
    },
  ],
});

export default router;
