import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Error from "@/components/Error.vue";

describe("Error", () => {
  it("renders the error message correctly", () => {
    const message = "Something went wrong";
    const wrapper = mount(Error, {
      props: {
        message,
      },
    });

    const errorContainer = wrapper.find(".error-container");
    expect(errorContainer.exists()).toBe(true);

    const errorMessage = wrapper.find(".error");
    expect(errorMessage.text()).toContain("Error!");
    expect(errorMessage.text()).toContain(message);
  });
});
