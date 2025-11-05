import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import CarDescription from "../components/cars/CarDescription.vue";
import * as HelperUtils from "../utils/helperUtils";

vi.mock("../utils/helperUtils");
HelperUtils.formatThousands.mockReturnValue("171 000");

describe("CarDescription.vue", () => {
  const props = {
    name: "Tesla Model 3",
    year: 2023,
    dailyPrice: 171000,
    description: "Electric sedan",
  };

  it("renders the car name correctly", () => {
    const wrapper = mount(CarDescription, { props });
    expect(wrapper.text()).toContain("Tesla Model 3");
  });

  it("renders the car year correctly", () => {
    const wrapper = mount(CarDescription, { props });
    expect(wrapper.text()).toContain("2023");
  });

  it("renders formatted daily price", () => {
    const wrapper = mount(CarDescription, { props });
    expect(wrapper.text()).toContain("171 000 Ft / nap");
  });

  it("renders the description text", () => {
    const wrapper = mount(CarDescription, { props });
    expect(wrapper.text()).toContain("Electric sedan");
  });
});
