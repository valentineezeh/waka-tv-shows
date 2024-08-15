import { describe, it, beforeEach, vi, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import Card from "@/components/Card.vue";
import Button from "@/components/Button.vue";
import { useShowStore } from "@/stores/showStore";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";
import { show } from "@/mock";

describe("Card", () => {
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
    const wrapper = mount(Card, {
      props: {
        show,
        imageUrl: show.imageUrl,
        title: show.name,
        rating: show.rating,
        alt: "test poster",
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("truncates title if it exceeds 20 characters", () => {
    const wrapper = mount(Card, {
      props: {
        show,
        imageUrl: show.imageUrl,
        title: "Test Show With a Very Long Name",
        rating: show.rating,
        alt: "test poster",
      },
      global: {
        plugins: [router],
      },
    });
    const truncatedTitle = wrapper.find(".title").text();
    expect(truncatedTitle).toBe("Test Show With a ...");
  });

  it('sets selectedShow and navigates to show page when "View Details" button is clicked', async () => {
    const setSelectedShowSpy = vi.spyOn(store, "setSelectedShow");
    const wrapper = mount(Card, {
      props: {
        show,
        imageUrl: show.imageUrl,
        title: show.name,
        rating: show.rating,
        alt: "Test Show Poster",
      },
      global: {
        plugins: [router],
      },
    });
    await wrapper.findComponent(Button).trigger("click");
    expect(setSelectedShowSpy).toHaveBeenCalledWith(show);
    await router.push("/show");
    expect(router.currentRoute.value.name).toBe("show");
  });
});
