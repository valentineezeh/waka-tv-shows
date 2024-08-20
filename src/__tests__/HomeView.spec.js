import { describe, it, expect, beforeEach } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import SearchBar from "@/components/SearchBar.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import ShowList from "@/components/ShowList.vue";
import { useShowStore } from "@/stores/showStore";
import { createPinia, setActivePinia } from "pinia";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { shows } from '@/mock'

describe("HomeView", () => {
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

  it("renders correctly", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("renders SearchBar component", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });
    const searchBar = wrapper.findComponent(SearchBar);
    expect(searchBar.exists()).toBe(true);
  });

  it("renders Loader component when isLoading is true", async () => {
    store.isLoading = true;

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });
    await wrapper.vm.$nextTick();

    const loader = wrapper.findComponent(Loader);
    expect(loader.exists()).toBe(true);
  });

  it("renders Error component when error is present", async () => {
    store.error = 'Error has occurred';
    store.isLoading = false;

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });
    await wrapper.vm.$nextTick();

    const errorWrapper = wrapper.findComponent(Error);
    expect(errorWrapper.exists()).toBe(true);
  });

  it("renders ShowList component when data is available", async () => {
    store.isLoading = false;
    store.error = null;
    store.shows = shows;

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });
    await wrapper.vm.$nextTick();

    const showList = wrapper.findComponent(ShowList);
    expect(showList.exists()).toBe(true);
    expect(showList.props("hasResults")).toBe(true);
    expect(showList.props("sortedAndGroupedShows")).toEqual(
      store.sortedAndGroupedShows,
    );
  });

  it("calls fetchShows when search query is set", async () => {
    const wrapper = shallowMount(HomeView);
    const searchBar = wrapper.findComponent(SearchBar);

    await searchBar.vm.$emit("update:modelValue", "new query");
    expect(store.isLoading).toBe(true);
  });
});
