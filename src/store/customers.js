import { BASE_DB_URL } from "../constans/url";
import * as HelperUtils from "../utils/helperUtils";

const customersModule = {
  namespaced: true,
  state() {
    return {
      customers: [],
    };
  },
  getters: {
    customers(state) {
      return [...state.customers];
    },
  },
  mutations: {
    setCustomers(state, payload) {
      state.customers = payload;
    },
  },
  actions: {
    async addCustomers(context, payload) {
      const uuid = HelperUtils.generateUuidv4();
      const response = await fetch(`${BASE_DB_URL}customers`, {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          id: uuid,
        }),
      });

      if (!response.ok) {
        throw new Error("Hiba történt az adatok mentése közben! ");
      }

      return uuid;
    },
    async fetchCustomers(context) {
      const response = await fetch(`${BASE_DB_URL}customers`);
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

      context.commit("setCustomers", data);
    },
  },
};

export default customersModule;
