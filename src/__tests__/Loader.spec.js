import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Loader from "@/components/Loader.vue";

describe("Loader", () => {
  it("renders the loader container", () => {
    const wrapper = mount(Loader);
    const loaderContainer = wrapper.find(".loader-container");
    expect(loaderContainer.exists()).toBe(true);
  });

  it("renders the loader element", () => {
    const wrapper = mount(Loader);
    const loader = wrapper.find(".loader");
    expect(loader.exists()).toBe(true);
  });
});
