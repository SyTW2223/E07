import { createRouter, createWebHistory } from "vue-router";
import HelloWorldView from "../views/HelloWorldView.vue";
import { useAuthStore } from "../stores/auth.store";

export const router = createRouter({
  history: createWebHistory("http://localhost:5173/"),
  linkActiveClass: "active",
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
      component: () => import("../views/SignUpView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/log-in", "/sign-up"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.api_token) {
    auth.returnUrl = to.fullPath;
    return "/log-in";
  }
});

export default router;
