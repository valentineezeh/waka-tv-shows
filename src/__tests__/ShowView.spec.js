import { describe, it, beforeEach, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { reactive } from '@vue/reactivity'
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import ShowView from "@/views/ShowView.vue";
import ShowDetails from "@/components/ShowDetails.vue";
import NotFound from "@/components/NotFound.vue";
import { useShowStore } from "@/stores/showStore";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";
import { shows } from '@/mock'

const selectedShow = shows[0];


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
  it("renders ShowDetails component", async() => {
    store.selectedShow = selectedShow;
    const showView = mount(ShowView, {
      global: {
        plugins: [router],
      },
    });

    await showView.vm.$nextTick();
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
    expect(ratingText).toContain("Rating: 0");
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
