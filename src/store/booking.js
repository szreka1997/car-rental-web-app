import { BASE_DB_URL } from "../constans/url";
import * as HelperUtils from "../utils/helperUtils";

const bookingModule = {
  namespaced: true,
  state() {
    return {
      bookings: [],
    };
  },
  getters: {
    bookings(state) {
      return [...state.bookings];
    },
  },
  mutations: {
    setBookings(state, payload) {
      state.bookings = payload;
    },
  },
  actions: {
    async addBooking(context, payload) {
      const uuid = HelperUtils.generateUuidv4();
      const response = await fetch(`${BASE_DB_URL}bookings`, {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          id: uuid,
        }),
      });

      if (!response.ok) {
        throw new Error("Hiba történt az adatok mentése közben! ");
      }
    },
    async fetchBookings(context) {
      const response = await fetch(`${BASE_DB_URL}bookings`);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          "Hiba történt az adatok lekérdezése közben! " + responseData.message
        );
      }

      const data = [];
      Object.values(responseData).forEach((value) => {
        data.push(value);
      });

      context.commit("setBookings", data);
    },
  },
};

export default bookingModule;
