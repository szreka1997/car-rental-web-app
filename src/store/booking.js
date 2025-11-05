import Booking from "../models/booking";
import * as HelperUtils from "../utils/helperUtils";

const bookingModule = {
  namespaced: true,
  state() {
    return {
      bookings: [
        new Booking({
          id: "booking1",
          carId: "car1",
          customerId: "customer1",
          startDate: "2025-11-30",
          endDate: "2025-12-10",
          days: 11,
          totalPrice: 385000,
        }),
      ],
    };
  },
  getters: {
    bookings(state) {
      return [...state.bookings];
    },
  },
  mutations: {
    addBooking(state, payload) {
      state.bookings.push(payload);
    },
  },
  actions: {
    addBooking(context, payload) {
      const uuid = HelperUtils.generateUuidv4();
      const newBooking = new Booking({
        ...payload,
        id: uuid,
      });
      context.commit("addBooking", newBooking);
    },
  },
};

export default bookingModule;
