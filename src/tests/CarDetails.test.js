import { reactive, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import CarDetails from "../pages/cars/CarDetails.vue";
import BaseCard from "../components/ui/BaseCard.vue";
import CarDescription from "../components/cars/CarDescription.vue";
import { beforeEach } from "vitest";

const mockRouterPush = vi.fn();
const mockRoute = { path: "/cars/1", query: {} };
const mockStore = {
  getters: {
    "cars/cars": [
      {
        id: 1,
        brand: "Toyota",
        model: "Corolla",
        year: 2020,
        dailyPrice: 15000,
        description: "Reliable car",
        imageUrl: "image.jpg",
      },
    ],
  },
};

vi.mock("vue-router", () => ({
  useRouter: () => ({ push: mockRouterPush }),
  useRoute: () => mockRoute,
}));

vi.mock("vuex", () => ({
  useStore: () => mockStore,
}));

describe("CarDetails.vue with useRoute & useStore mocks", () => {
  beforeEach(() => {
    mockRoute.path = "/cars/1";
  });
  const mountComponent = () =>
    mount(CarDetails, {
      props: { carId: 1 },
      global: {
        stubs: {
          BaseCard,
          CarDescription,
          RouterView: {
            template: "<div><slot :Component='{}'></slot></div>",
          },
          Transition: { template: "<div><slot /></div>" },
        },
      },
    });

  it("computes selectedCar from store getters", () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.selectedCar.brand).toBe("Toyota");
    expect(wrapper.vm.selectedCar.model).toBe("Corolla");
  });

  it("goToCarReservation calls router.push with correct path and query", async () => {
    const wrapper = mountComponent();
    await wrapper.vm.goToCarReservation();
    expect(mockRouterPush).toHaveBeenCalledWith({
      path: "/cars/1/reservation",
      query: {},
    });
  });

  it("renders CarDescription with correct props", () => {
    const wrapper = mountComponent();
    const carDesc = wrapper.findComponent(CarDescription);
    expect(carDesc.exists()).toBe(true);
    expect(carDesc.props("name")).toBe("Toyota Corolla");
    expect(carDesc.props("year")).toBe(2020);
    expect(carDesc.props("dailyPrice")).toBe(15000);
    expect(carDesc.props("description")).toBe("Reliable car");
  });

  it("shows BaseCard when isFormVisible is false", () => {
    mockRoute.path = "/cars/1";
    const wrapper = mountComponent();
    expect(wrapper.findComponent(BaseCard).exists()).toBe(true);
  });

  it("does not show BaseCard when isFormVisible is true", () => {
    mockRoute.path = "/cars/1/reservation";
    const wrapper = mountComponent();
    expect(wrapper.findComponent(BaseCard).exists()).toBe(false);
  });
});
