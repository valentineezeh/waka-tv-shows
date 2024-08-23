import { describe, it, beforeEach, vi, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import SearchResultCard from "@/components/SearchResultCard.vue";
import { useShowStore } from "@/stores/showStore";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";
import { shows } from "@/mock";

describe("SearchResultCard", () => {
  let store;
  let router;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShowStore();
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", component: HomeView },
        { path: "/show/:id", component: ShowView },
      ],
    });
  });

  it("render correctly", () => {
    const wrapper = mount(SearchResultCard, {
      props: {
        searchedShows: shows,
      },
      global: {
        plugins: [store, router],
      },
    });

    expect(wrapper.exists).toBeTruthy();
  });

  it("navigates to the show view when the button is clicked", async () => {
    const wrapper = mount(SearchResultCard, {
      props: {
        searchedShows: shows,
      },
      global: {
        plugins: [store, router],
      },
    });

    const handleCLickSpy = vi.spyOn(wrapper.vm, "handleCLick");

    const listItem = wrapper.findAll("li").at(0);
    await listItem.trigger("click");
    expect(handleCLickSpy).toHaveBeenCalled();
    expect(handleCLickSpy).toHaveBeenCalledWith(shows[0]);
  });
});
