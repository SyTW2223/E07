import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { useAlertStore } from "@/stores";
export const router = createRouter({
  history: createWebHashHistory("/E07/"),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomePageView.vue"),
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
      path: "/profile/:userID",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/:userName",
      name: "user",
      component: () => import("../views/UserPageView.vue"),
    },
    {
      path: "/tweet/:tweetID",
      name: "tweet",
      component: () => import("../views/TweetPageView.vue"),
    },
    {
      path: "/search/tweets",
      name: "search-tweets",
      component: () => import("../views/SearchTweetsView.vue"),
    },
    {
      path: "/search/users",
      name: "search-users",
      component: () => import("../views/SearchUsersView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/log-in", "/sign-up"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  const alertStore = useAlertStore();
  if (authRequired && !auth.api_token) {
    auth.returnUrl = to.fullPath;
    alertStore.successSnackbar("You need to be logged in");
    return "/log-in";
  }
});

export default router;
