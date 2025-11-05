import { createStore } from "vuex";

import carsModule from "./cars";
import bookingModule from "./booking";
import customersModule from "./customers";

const store = createStore({
  modules: {
    cars: carsModule,
    bookings: bookingModule,
    customers: customersModule,
  },
});

export default store;
