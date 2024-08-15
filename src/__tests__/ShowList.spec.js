import { describe, it, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ShowList from "@/components/ShowList.vue";
import ShowListings from "@/components/ShowListings.vue";
import NotFound from "@/components/NotFound.vue";
import { filteredAndGroupedShows } from "@/mock";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";

describe("ShowList", () => {
  let wrapper;
  let router;

  beforeEach(() => {
    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "home", component: HomeView },
        { path: "/show", name: "show", component: ShowView },
      ],
    });
  });

  it("renders ShowListings components for each genre", () => {
    wrapper = mount(ShowList, {
      props: {
        filteredAndGroupedShows,
        hasResults: true,
      },
      global: {
        plugins: [router],
        stubs: {
          ShowListings,
          NotFound,
        },
      },
    });

    const showListingsComponents = wrapper.findAllComponents(ShowListings);

    expect(showListingsComponents).toHaveLength(
      Object.keys(filteredAndGroupedShows).length,
    );
  });

  it("passes the correct shows prop to ShowListings components", () => {
    wrapper = mount(ShowList, {
      props: {
        filteredAndGroupedShows,
        hasResults: true,
      },
      global: {
        plugins: [router],
        stubs: {
          ShowListings,
          NotFound,
        },
      },
    });

    const showListingsComponents = wrapper.findAllComponents(ShowListings);

    showListingsComponents.forEach((showListings, index) => {
      const genre = Object.keys(filteredAndGroupedShows)[index];
      const shows = filteredAndGroupedShows[genre];
      expect(showListings.props("shows")).toEqual(shows);
    });
  });

  it("renders NotFound component when hasResults is false", async () => {
    wrapper = mount(ShowList, {
      props: {
        filteredAndGroupedShows,
        hasResults: true,
      },
      global: {
        plugins: [router],
        stubs: {
          ShowListings,
          NotFound,
        },
      },
    });
    await wrapper.setProps({ hasResults: false });
    expect(wrapper.findComponent(NotFound).exists()).toBe(true);
    expect(wrapper.findAllComponents(ShowListings)).toHaveLength(0);
  });
});
