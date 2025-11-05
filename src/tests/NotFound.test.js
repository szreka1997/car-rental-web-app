import { mount } from "@vue/test-utils";
import NotFound from "../pages/NotFound.vue";
import BaseCard from "../components/ui/BaseCard.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("NotFound.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NotFound, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  });

  it("renders BaseCard component", () => {
    const baseCard = wrapper.findComponent(BaseCard);
    expect(baseCard.exists()).toBe(true);
  });

  it("renders the heading and message correctly", () => {
    expect(wrapper.text()).toContain("Az oldal nem található!");
    expect(wrapper.text()).toContain(
      "Ez az oldal nem található - esetleg nézd meg az"
    );
    expect(wrapper.text()).toContain("autóinkat");
  });

  it("contains a router-link pointing to /", () => {
    const link = wrapper.findComponent(RouterLinkStub);
    expect(link.exists()).toBe(true);
    expect(link.props("to")).toBe("/");
  });
});
