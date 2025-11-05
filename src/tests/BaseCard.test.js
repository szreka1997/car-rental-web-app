import { mount } from "@vue/test-utils";
import BaseCard from "../components/ui/BaseCard.vue";

describe("BaseCard.vue", () => {
  it("renders default classes and slot content", () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: "<p>Test Slot</p>",
      },
    });

    expect(wrapper.classes()).toContain("card");
    expect(wrapper.classes()).toContain("rounded-4");
    expect(wrapper.classes()).toContain("overflow-hidden");
    expect(wrapper.classes()).not.toContain("animated-card");
    expect(wrapper.html()).toContain("Test Slot");
  });

  it("applies animated-card class when isButton is true", () => {
    const wrapper = mount(BaseCard, {
      props: { isButton: true },
    });

    expect(wrapper.classes()).toContain("animated-card");
  });

  it("does not apply animated-card class when isButton is false", () => {
    const wrapper = mount(BaseCard, {
      props: { isButton: false },
    });

    expect(wrapper.classes()).not.toContain("animated-card");
  });
});
