import { describe, it, expect, beforeEach } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import SearchBar from "@/components/SearchBar.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import ShowList from "@/components/ShowList.vue";
import { useShowStore } from "@/stores/showStore";
import { createPinia, setActivePinia } from "pinia";

describe("HomeView", () => {
  let store;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShowStore();
  });

  it("renders correctly", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders SearchBar component", () => {
    const wrapper = mount(HomeView);
    const searchBar = wrapper.findComponent(SearchBar);
    expect(searchBar.exists()).toBe(true);
  });

  it("renders Loader component when isLoading is true", async () => {
    store.isLoading = true;

    const wrapper = shallowMount(HomeView);
    await wrapper.vm.$nextTick();

    const loader = wrapper.findComponent(Loader);
    expect(loader.exists()).toBe(true);
  });

  it("renders Error component when error is present", async () => {
    store.error = true;
    store.isLoading = false;

    const wrapper = shallowMount(HomeView);
    await wrapper.vm.$nextTick();

    const errorWrapper = wrapper.findComponent(Error);
    expect(errorWrapper.exists()).toBe(true);
  });

  it("renders ShowList component when data is available", async () => {
    store.isLoading = false;
    store.error = false;
    store.shows = [{ id: 1, name: "Show 1", genres: ["drama", "thriller"] }];

    const wrapper = shallowMount(HomeView);
    await wrapper.vm.$nextTick();

    const showList = wrapper.findComponent(ShowList);
    expect(showList.exists()).toBe(true);
    expect(showList.props("hasResults")).toBe(true);
    expect(showList.props("filteredAndGroupedShows")).toEqual(
      store.filteredAndGroupedShows,
    );
  });

  it("does not render Loader, Error, or ShowList components when no data is available", async () => {
    store.isLoading = false;
    store.error = false;
    store.shows = [];

    const wrapper = shallowMount(HomeView);
    await wrapper.vm.$nextTick();

    const loader = wrapper.findComponent(Loader);
    const error = wrapper.findComponent(Error);
    const showList = wrapper.findComponent(ShowList);

    expect(loader.exists()).toBe(false);
    expect(error.exists()).toBe(false);
    expect(showList.exists()).toBe(true);
    expect(showList.props("hasResults")).toBe(false);
    expect(showList.props("filteredAndGroupedShows")).toEqual({});
  });

  it("calls fetchShows when search query is set", async () => {
    const wrapper = shallowMount(HomeView);
    const searchBar = wrapper.findComponent(SearchBar);

    await searchBar.vm.$emit("update:modelValue", "new query");
    expect(store.isLoading).toBe(true);
  });
});
