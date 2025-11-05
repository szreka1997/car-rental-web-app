import { BASE_DB_URL } from "../constans/url";

const carsModule = {
  namespaced: true,
  state() {
    return {
      cars: [],
    };
  },
  getters: {
    cars(state) {
      return [...state.cars];
    },
  },
  mutations: {
    setCars(state, payload) {
      state.cars = payload;
    },
  },
  actions: {
    async fetchCars(context) {
      const response = await fetch(`${BASE_DB_URL}cars`);
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

      context.commit("setCars", data);
    },
  },
};

export default carsModule;
