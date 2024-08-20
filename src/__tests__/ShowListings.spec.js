import { describe, it, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import ShowListings from "@/components/ShowListings.vue";
import Card from "@/components/Card.vue";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";
import { shows } from "@/mock";

describe("ShowListings", () => {
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

  it("renders a Card component for each show", () => {
    wrapper = mount(ShowListings, {
      props: {
        shows,
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.findAllComponents(Card).length).toBe(3);
  });

  it("sorts the shows by rating in descending order", async () => {
    wrapper = mount(ShowListings, {
      props: {
        shows,
      },
      global: {
        plugins: [router],
      },
    });

    await wrapper.vm.$nextTick();

    const cardComponents = wrapper.findAllComponents(Card);
    const renderedShows = cardComponents.map((card) => {
      return {
        id: card.props("show").id,
        name: card.props("title"),
        image: card.props("imageUrl"),
        rating: { average: card.props("rating") },
        ...card.props("show"),
      };
    });

    expect(renderedShows).toEqual(shows);
  });

  it("passes the correct props to the Card components", async () => {
    wrapper = mount(ShowListings, {
      props: {
        shows,
      },
      global: {
        plugins: [router],
      },
    });

    await wrapper.vm.$nextTick();

    const cardComponents = wrapper.findAllComponents(Card);

    cardComponents.forEach((card, index) => {
      const show = shows[index];
      expect(card.props("imageUrl")).toBe(show.image.medium);
      expect(card.props("title")).toBe(show.name);
      expect(card.props("rating")).toBe(show.rating.average);
      expect(card.props("alt")).toBe(show.name);
      expect(card.props("show")).toEqual(show);
    });
  });
});
