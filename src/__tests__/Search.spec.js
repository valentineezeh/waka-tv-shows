import { describe, it, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { filteredAndGroupedShows } from "@/mock";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";
import SearchBar from "@/components/SearchBar.vue";

describe("SearchBar", () => {
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

  it("renders input element", () => {
    wrapper = mount(SearchBar, {
      props: {
        filteredAndGroupedShows,
        hasResults: true,
        modelValue: "",
      },
      global: {
        plugins: [router],
      },
    });
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
  });

  it("updates search query when input value changes", async () => {
    wrapper = mount(SearchBar, {
      props: {
        filteredAndGroupedShows,
        hasResults: true,
        modelValue: "",
      },
      global: {
        plugins: [router],
      },
    });

    await wrapper.setProps({ modelValue: "Breaking Bad" });
    const input = wrapper.find("input");
    expect(input.element.value).toBe("Breaking Bad");
  });
});
