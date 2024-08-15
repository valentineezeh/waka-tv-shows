import { describe, it, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import ShowView from "@/views/ShowView.vue";
import ShowDetails from "@/components/ShowDetails.vue";
import NotFound from "@/components/NotFound.vue";
import { useShowStore } from "@/stores/showStore";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";

const selectedShow = {
  id: 1,
  name: "Show 1",
  image: "image.jpg",
  rating: { average: 4 },
  language: "english",
  summary: "show summary",
  genres: ["genre1", "genre2"],
  premiered: "02/08/2024",
};

describe("ShowView", () => {
  let store;
  let router;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShowStore();
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "home", component: HomeView },
        { path: "/show", name: "show", component: ShowView },
      ],
    });
  });
  it("renders ShowDetails component", () => {
    store.selectedShow = selectedShow;
    const showView = mount(ShowView, {
      global: {
        plugins: [router],
      },
    });
    const showDetails = showView.findComponent(ShowDetails);
    expect(showDetails.exists()).toBe(true);
  });
  it("renders correctly", async () => {
    store.selectedShow = selectedShow;
    const showView = mount(ShowView, {
      global: {
        plugins: [router],
      },
    });
    const ratingText = showView.findComponent(ShowDetails).text();
    expect(ratingText).toContain("Rating: 4");
  });
  it("does not render ShowDetails component when selectedShow is null", async () => {
    store.selectedShow = null;

    const showView = mount(ShowView, {
      global: {
        plugins: [router],
      },
    });
    await showView.vm.$nextTick();

    const notFound = showView.findComponent(NotFound);
    expect(notFound.exists()).toBe(true);
  });
});
