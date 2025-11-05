import { mount } from "@vue/test-utils";

import CarReservation from "../pages/cars/CarReservation.vue";
import CarReservationForm from "../components/cars/CarReservationForm.vue";
import ReservationDetails from "../components/cars/ReservationDetails.vue";
import * as DateUtils from "../utils/dateUtils";

const mockStore = {
  getters: {
    "cars/cars": [
      { id: 1, brand: "Toyota", model: "Corolla", dailyPrice: "10000" },
      { id: 2, brand: "Ford", model: "Focus", dailyPrice: "9000" },
    ],
  },
};

vi.mock("vuex", () => ({
  useStore: () => mockStore,
}));

let mockRoute = {
  params: { carId: 1 },
  query: { startDate: "2025-11-10", endDate: "2025-11-12" },
};

vi.mock("vue-router", () => ({
  useRoute: () => mockRoute,
}));

vi.spyOn(DateUtils, "daysBetween").mockImplementation((start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  return Math.round((e - s) / (1000 * 60 * 60 * 24));
});

describe("CarReservation.vue", () => {
  let wrapper;
  const mountComponent = () =>
    mount(CarReservation, {
      global: {
        stubs: { ReservationDetails: true, CarReservationForm: true },
      },
    });

  it("computes selectedCar correctly from store", () => {
    wrapper = mountComponent();
    expect(wrapper.vm.selectedCar).toEqual(mockStore.getters["cars/cars"][0]);
  });

  it("computes totalPrice correctly", () => {
    wrapper = mountComponent();
    const daysBooked =
      DateUtils.daysBetween(
        mockRoute.query.startDate.replaceAll("-", ".") + ".",
        mockRoute.query.endDate.replaceAll("-", ".") + "."
      ) + 1;
    expect(wrapper.vm.totalPrice).toBe(daysBooked * 10000);
  });

  it("passes correct props to ReservationDetails", () => {
    wrapper = mountComponent();
    const details = wrapper.findComponent(ReservationDetails);
    expect(details.exists()).toBe(true);
    expect(details.props("carName")).toBe("Toyota Corolla");
    expect(details.props("startDate")).toBe("2025.11.10.");
    expect(details.props("endDate")).toBe("2025.11.12.");
  });

  it("passes correct props to CarReservationForm", () => {
    wrapper = mountComponent();
    const form = wrapper.findComponent(CarReservationForm);
    expect(form.exists()).toBe(true);
    expect(form.props("carId")).toBe(1);
    expect(form.props("bookingStartDate")).toBe("2025.11.10.");
    expect(form.props("bookingEndDate")).toBe("2025.11.12.");
  });
});
