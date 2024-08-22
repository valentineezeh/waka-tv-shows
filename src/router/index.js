import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";

const HomeView = () => import("@/views/HomeView.vue");
const ShowView = () => import("@/views/ShowView.vue");

// for SSR rendering
const isServer =
  typeof window === "undefined"
    ? createMemoryHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL);

const router = createRouter({
  history: isServer,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/show",
      name: "show",
      component: ShowView,
    },
  ],
});

export default router;
