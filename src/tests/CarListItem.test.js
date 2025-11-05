import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";

import CarListItem from "../components/cars/CarListItem.vue";
import BaseCard from "../components/ui/BaseCard.vue";
import * as DateUtils from "../utils/dateUtils";

vi.mock("../utils/dateUtils");

const pushMock = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("CarListItem.vue", () => {
  const car = {
    id: 1,
    brand: "Tesla",
    model: "Model 3",
    imageUrl: "https://example.com/tesla.jpg",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("emits 'car-click' if startDate or endDate is missing", async () => {
    const wrapper = mount(CarListItem, {
      props: { car, startDate: null, endDate: null },
      global: { stubs: { BaseCard } },
    });

    await wrapper.findComponent(BaseCard).trigger("click");

    expect(wrapper.emitted("car-click")).toBeTruthy();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("calls router.push when both startDate and endDate exist", async () => {
    DateUtils.getShortISOString
      .mockReturnValueOnce("2025-11-01")
      .mockReturnValueOnce("2025-11-05");

    const wrapper = mount(CarListItem, {
      props: {
        car,
        startDate: new Date("2025-11-01"),
        endDate: new Date("2025-11-05"),
      },
      global: { stubs: { BaseCard } },
    });

    await wrapper.findComponent(BaseCard).trigger("click");

    expect(pushMock).toHaveBeenCalledWith({
      name: "cars",
      params: { carId: car.id },
      query: { startDate: "2025-11-01", endDate: "2025-11-05" },
    });

    expect(DateUtils.getShortISOString).toHaveBeenCalledTimes(2);
  });

  it("renders car name and image correctly", () => {
    const wrapper = mount(CarListItem, {
      props: { car },
      global: { stubs: { BaseCard } },
    });

    expect(wrapper.text()).toContain("Tesla Model 3");
    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("https://example.com/tesla.jpg");
  });
});
