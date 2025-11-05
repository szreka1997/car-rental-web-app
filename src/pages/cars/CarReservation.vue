<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import CarReservationForm from "../../components/cars/CarReservationForm.vue";
import ReservationDetails from "../../components/cars/ReservationDetails.vue";
import * as DateUtils from "../../utils/dateUtils";

const route = useRoute();
const store = useStore();

const carId = route.params.carId;
const startDate = route.query.startDate.replaceAll("-", ".") + ".";
const endDate = route.query.endDate.replaceAll("-", ".") + ".";
const daysBooked = DateUtils.daysBetween(startDate, endDate) + 1;

const selectedCar = computed(() => {
  return store.getters["cars/cars"].find((car) => car.id === carId);
});
const totalPrice = computed(() => {
  return daysBooked * parseInt(selectedCar.value.dailyPrice);
});
</script>

<template>
  <div class="mx-2">
    <div class="my-container">
      <ReservationDetails
        :car-name="selectedCar.brand + ' ' + selectedCar.model"
        :start-date="startDate"
        :end-date="endDate"
        :days="daysBooked"
        :total-price="totalPrice"
      ></ReservationDetails>
      <CarReservationForm
        :car-id="carId"
        :booking-start-date="startDate"
        :booking-end-date="endDate"
        :number-of-days-booked="daysBooked"
        :total-price-of-reservation="totalPrice"
      ></CarReservationForm>
    </div>
  </div>
</template>

<style scoped>
.my-container {
  margin: 1rem auto;
  max-width: 50rem;
}
</style>
