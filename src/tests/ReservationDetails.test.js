import { mount } from "@vue/test-utils";
import ReservationDetails from "../components/cars/ReservationDetails.vue";
import * as HelperUtils from "../utils/helperUtils";

describe("ReservationDetails.vue", () => {
  it("renders all reservation data rows correctly", () => {
    const formatMock = vi
      .spyOn(HelperUtils, "formatThousands")
      .mockImplementation((num) => num.toLocaleString());

    const props = {
      carName: "Tesla Model 3",
      startDate: "2025-11-05",
      endDate: "2025-11-10",
      days: 5,
      totalPrice: 85000,
    };

    const wrapper = mount(ReservationDetails, { props });

    expect(wrapper.findComponent({ name: "BaseCard" }).exists()).toBe(true);

    const rows = wrapper.findAllComponents({ name: "ReservationDataRow" });
    expect(rows).toHaveLength(4);

    expect(rows[0].props()).toEqual({
      label: "Autó neve",
      value: props.carName,
    });
    expect(rows[1].props()).toEqual({
      label: "Foglalás dátuma",
      value: `${props.startDate} - ${props.endDate}`,
    });
    expect(rows[2].props()).toEqual({
      label: "Foglalandó napok száma",
      value: props.days,
    });
    expect(rows[3].props()).toEqual({
      label: "Foglalás teljes összege",
      value: formatMock(props.totalPrice) + " Ft",
    });

    expect(formatMock).toHaveBeenCalledWith(props.totalPrice);

    formatMock.mockRestore();
  });
});
