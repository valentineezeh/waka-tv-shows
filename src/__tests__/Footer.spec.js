import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/Footer.vue";
import { describe, it, expect } from "vitest";

describe("It  should render the footer", () => {
  it("renders component correctly", () => {
    const wrapper = shallowMount(Footer)
    expect(wrapper.exists()).toBe(true);
  })
})