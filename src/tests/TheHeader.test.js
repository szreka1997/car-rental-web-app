import { mount, RouterLinkStub } from "@vue/test-utils";
import TheHeader from "../components/layout/TheHeader.vue";

describe("TheHeader.vue", () => {
  it("renders the header and router-link correctly", () => {
    const wrapper = mount(TheHeader, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const header = wrapper.find("header");
    expect(header.exists()).toBe(true);

    const routerLink = wrapper.findComponent(RouterLinkStub);
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.props("to")).toBe("/");

    expect(routerLink.text()).toBe("Autó Kölcsönző");
  });
});
