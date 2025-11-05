import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CarReservationForm from "../components/cars/CarReservationForm.vue";

const mockDispatch = vi.fn();
vi.mock("vuex", () => ({
  useStore: () => ({ dispatch: mockDispatch }),
}));

const mockReplace = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

vi.stubGlobal("alert", vi.fn());

function mountComponent(props = {}) {
  return mount(CarReservationForm, {
    props: {
      carId: 1,
      bookingStartDate: "2025-11-05",
      bookingEndDate: "2025-11-06",
      numberOfDaysBooked: 2,
      totalPriceOfReservation: 20000,
      ...props,
    },
  });
}

describe("CarReservationForm.vue", () => {
  beforeEach(() => {
    mockDispatch.mockReset();
    mockReplace.mockReset();
    alert.mockReset();
  });

  it("renders the form correctly", () => {
    const wrapper = mountComponent();
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.text()).toContain("Autó foglalása");
  });

  it("does not submit when form is invalid", async () => {
    const wrapper = mountComponent();
    const fakeEvent = {
      target: { checkValidity: () => false, preventDefault: vi.fn() },
    };
    await wrapper.vm.handleSubmit(fakeEvent);
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it("submits form and navigates on success", async () => {
    vi.useFakeTimers();
    mockDispatch.mockResolvedValueOnce(123).mockResolvedValueOnce(true);

    const wrapper = mountComponent();
    const fakeEvent = {
      target: { checkValidity: () => true, preventDefault: vi.fn() },
    };

    wrapper.vm.name = "John Doe";
    wrapper.vm.email = "john@example.com";
    wrapper.vm.address = "Test street 1";
    wrapper.vm.phone = "+36123456789";

    await wrapper.vm.handleSubmit(fakeEvent);

    expect(wrapper.vm.successMessage).toBe("✅ Sikeres foglalás!");
    expect(wrapper.vm.isLoading).toBe(true);

    vi.runAllTimers();

    expect(wrapper.vm.isLoading).toBe(false);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, "customers/addCustomers", {
      fullName: "John Doe",
      email: "john@example.com",
      address: "Test street 1",
      phone: "+36123456789",
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, "bookings/addBooking", {
      carId: 1,
      customerId: 123,
      startDate: "2025-11-05",
      endDate: "2025-11-06",
      days: 2,
      totalPrice: 20000,
    });
    expect(mockReplace).toHaveBeenCalledWith("/");
    vi.useRealTimers();
  });

  it("shows alert and disables loading on error", async () => {
    mockDispatch.mockRejectedValueOnce(new Error("Something went wrong"));
    const wrapper = mountComponent();
    const fakeEvent = {
      target: { checkValidity: () => true, preventDefault: vi.fn() },
    };

    await wrapper.vm.handleSubmit(fakeEvent);

    expect(alert).toHaveBeenCalledWith("Something went wrong");
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it("updates v-models when typing in inputs", async () => {
    const wrapper = mount(CarReservationForm, {
      props: {
        carId: 1,
        bookingStartDate: "2025-11-05",
        bookingEndDate: "2025-11-06",
        numberOfDaysBooked: 2,
        totalPriceOfReservation: 20000,
      },
    });

    const nameInput = wrapper.find("#name");
    const emailInput = wrapper.find("#email");
    const addressInput = wrapper.find("#address");
    const phoneInput = wrapper.find("#phone");

    await nameInput.setValue("John Doe");
    await emailInput.setValue("john@example.com");
    await addressInput.setValue("Test street 1");
    await phoneInput.setValue("+36123456789");

    expect(wrapper.vm.name).toBe("John Doe");
    expect(wrapper.vm.email).toBe("john@example.com");
    expect(wrapper.vm.address).toBe("Test street 1");
    expect(wrapper.vm.phone).toBe("+36123456789");
  });
});
