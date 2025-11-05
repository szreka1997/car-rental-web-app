import { mount } from "@vue/test-utils";
import BaseSpinner from "../components/ui/BaseSpinner.vue";

describe("BaseSpinner.vue", () => {
  it("renders the spinner with correct classes and attributes", () => {
    const wrapper = mount(BaseSpinner);

    const div = wrapper.find("div");
    expect(div.classes()).toContain("spinner-border");
    expect(div.classes()).toContain("text-primary");
    expect(div.classes()).toContain("my-spinner");

    expect(div.attributes("role")).toBe("status");

    const span = wrapper.find("span");
    expect(span.text()).toBe("Loading...");
    expect(span.classes()).toContain("visually-hidden");
  });
});
