import { mount } from "@vue/test-utils";
import ReservationDataRow from "../components/cars/ReservationDataRow.vue";

describe("ReservationDataRow.vue", () => {
  it("renders label and value correctly", () => {
    const wrapper = mount(ReservationDataRow, {
      props: {
        label: "Név",
        value: "John Doe",
      },
    });

    expect(wrapper.find("h6").text()).toBe("Név");

    expect(wrapper.find("p").text()).toBe("John Doe");

    expect(wrapper.find(".row").classes()).toContain("mb-2");
  });

  it("renders different props correctly", () => {
    const wrapper = mount(ReservationDataRow, {
      props: {
        label: "Foglalás dátuma",
        value: "2025-11-05",
      },
    });

    expect(wrapper.find("h6").text()).toBe("Foglalás dátuma");
    expect(wrapper.find("p").text()).toBe("2025-11-05");
  });
});
