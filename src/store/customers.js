import Customer from "../models/customer";
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
    addCustomer(state, payload) {
      state.customers.push(payload);
    },
  },
  actions: {
    addCustomers(context, payload) {
      const uuid = HelperUtils.generateUuidv4();
      const newCustomer = new Customer({
        ...payload,
        id: uuid,
      });
      context.commit("addCustomer", newCustomer);

      return uuid;
    },
  },
};

export default customersModule;
