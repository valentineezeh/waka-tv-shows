import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import App from "@/App.vue";
import { describe, it, expect } from "vitest";

describe("It  should render the app", () => {
  it("renders component correctly", () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          RouterView: true,
        },
      },
    })
    expect(wrapper.exists()).toBe(true);
  })
})

