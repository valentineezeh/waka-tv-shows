import { describe, it, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import { RouterLink } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ShowView from "@/views/ShowView.vue";
import Navbar from "@/components/Navbar.vue";

describe("Navbar", () => {
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

  it("renders a RouterLink component", () => {
    wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    });
    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.exists()).toBe(true);
  });

  it("renders the correct link text", () => {
    wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    });

    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.text()).toBe("Waka Shows");
  });

  it("renders the correct link path", () => {
    wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    });

    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.props("to")).toBe("/");
  });

  it('applies the "active" class to the RouterLink', () => {
    wrapper = mount(Navbar, {
      global: {
        plugins: [router],
      },
    });

    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.classes()).toContain("active");
  });
});
