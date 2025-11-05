import { mount, flushPromises } from "@vue/test-utils";

import CarList from "../pages/cars/CarList.vue";
import BaseSpinner from "../components/ui/BaseSpinner.vue";
import CarListItem from "../components/cars/CarListItem.vue";
import * as DateUtils from "../utils/dateUtils";

const mockDispatch = vi.fn();
const mockStore = {
  getters: {
    "cars/cars": [
      { id: 1, brand: "Toyota", model: "Corolla", dailyPrice: 10000 },
      { id: 2, brand: "Ford", model: "Focus", dailyPrice: 9000 },
    ],
    "bookings/bookings": [
      { carId: 1, startDate: "2025-11-10", endDate: "2025-11-12" },
    ],
  },
  dispatch: mockDispatch,
};

vi.mock("vuex", () => ({
  useStore: () => mockStore,
}));

vi.spyOn(DateUtils, "compareDatesIgnoringTime").mockImplementation((d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return date1 - date2;
});

describe("CarList.vue", () => {
  let wrapper;

  const mountComponent = () =>
    mount(CarList, {
      global: {
        stubs: { BaseSpinner: true, CarListItem: true, DateRangePicker: true },
      },
    });

  beforeEach(() => {
    mockDispatch.mockReset();
  });

  it("shows BaseSpinner when isLoading", async () => {
    wrapper = mountComponent();
    wrapper.vm.isLoading = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(BaseSpinner).exists()).toBe(true);
  });

  it("renders CarListItem for each car when not loading", async () => {
    wrapper = mountComponent();
    wrapper.vm.isLoading = false;
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(CarListItem).length).toBe(2);
  });

  it("filters cars based on bookings and selected dates", async () => {
    wrapper = mountComponent();
    wrapper.vm.startDate = "2025-11-11";
    wrapper.vm.endDate = "2025-11-13";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.cars.find((c) => c.id === 1)).toBeUndefined();
    expect(wrapper.vm.cars.find((c) => c.id === 2)).toBeDefined();
  });

  it("sortCars sets startDate and endDate", async () => {
    wrapper = mountComponent();
    wrapper.vm.sortCars("2025-11-15", "2025-11-16");
    expect(wrapper.vm.startDate).toBe("2025-11-15");
    expect(wrapper.vm.endDate).toBe("2025-11-16");
    expect(wrapper.vm.isDateInvalid).toBe(false);
  });

  it("handleCarClick returns false if dates are missing", () => {
    wrapper = mountComponent();
    wrapper.vm.startDate = null;
    wrapper.vm.endDate = null;
    expect(wrapper.vm.handleCarClick()).toBe(false);
    expect(wrapper.vm.isDateInvalid).toBe(true);
  });

  it("handleCarClick returns true if dates are set", () => {
    wrapper = mountComponent();
    wrapper.vm.startDate = "2025-11-15";
    wrapper.vm.endDate = "2025-11-16";
    expect(wrapper.vm.handleCarClick()).toBe(true);
  });

  it("calls store.dispatch when loadData is executed", async () => {
    wrapper = mountComponent();
    await wrapper.vm.loadData();
    expect(mockDispatch).toHaveBeenCalledWith("cars/fetchCars");
    expect(mockDispatch).toHaveBeenCalledWith("bookings/fetchBookings");
    expect(wrapper.vm.isLoading).toBe(false);
  });
});
