import { shallowMount } from "@vue/test-utils";
import Layout from "@/views/Layout.vue";
import { describe, it, expect } from "vitest";

describe("It  should render the Layout", () => {
  it("renders component correctly", () => {
    const wrapper = shallowMount(Layout)
    expect(wrapper.exists()).toBe(true);
  })
})