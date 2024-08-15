import { describe, it, vi, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button", () => {
  it("renders the button with the correct text", () => {
    const text = "Click me";
    const wrapper = mount(Button, {
      props: {
        text,
      },
    });

    const button = wrapper.find("button");
    expect(button.text()).toBe(text);
  });

  it("calls the click function when the button is clicked", async () => {
    const clickMock = vi.fn();
    const wrapper = mount(Button, {
      props: {
        text: "Click me",
        click: clickMock,
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(clickMock).toHaveBeenCalled();
  });

  it("does not render the button text if no text prop is provided", () => {
    const wrapper = mount(Button, {
      props: {
        click: vi.fn(),
      },
    });

    const button = wrapper.find("button");
    expect(button.text()).toBe("");
  });
});
