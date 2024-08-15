import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NotFound from "@/components/NotFound.vue";

describe("NotFound", () => {
  it("renders the not found container", () => {
    const wrapper = mount(NotFound);
    const notFoundContainer = wrapper.find(".not-found-container");
    expect(notFoundContainer.exists()).toBe(true);
  });

  it("renders the not found message", () => {
    const wrapper = mount(NotFound);
    const notFoundMessage = wrapper.find("h1");
    expect(notFoundMessage.exists()).toBe(true);
    expect(notFoundMessage.text()).toBe("That show doesn't exist here.");
    expect(notFoundMessage.element.style.color).toBe("white");
  });
});
