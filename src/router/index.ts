import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import { useAuthStore } from "../stores/auth.store";

export const router = createRouter({
  history: createWebHashHistory("/E07/"),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/log-in",
      name: "log-in",
      component: () => import("../views/LogInView.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/ProfileView.vue"),
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
    alert("You need to be signed up");
    return "/log-in";
  }
});

export default router;
