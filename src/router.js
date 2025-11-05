import { createRouter, createWebHistory } from "vue-router";

import CarList from "./pages/cars/CarList.vue";
import CarDetails from "./pages/cars/CarDetails.vue";
import NotFound from "./pages/NotFound.vue";
import CarReservation from "./pages/cars/CarReservation.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/cars" },
    { path: "/cars", component: CarList },
    {
      name: "cars",
      path: "/cars/:carId",
      component: CarDetails,
      props: true,
      children: [{ path: "reservation", component: CarReservation }],
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
