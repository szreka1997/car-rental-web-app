<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import BaseSpinner from "../../components/ui/BaseSpinner.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import CarListItem from "../../components/cars/CarListItem.vue";
import DateRangePicker from "../../components/ui/DateRangePicker.vue";
import * as DateUtils from "../../utils/dateUtils";

const store = useStore();

const isLoading = ref(false);
loadData();

const bookings = computed(() => store.getters["bookings/bookings"]);
const customers = computed(() => store.getters["customers/customers"]);

const startDate = ref(null);
const endDate = ref(null);
const isInvalidDate = ref(false);

const cars = computed(() => {
  console.log("BOOKINGS:", bookings.value);
  console.log("CUSTOMERS:", customers.value);
  const allCars = store.getters["cars/cars"];
  if (!startDate.value || !endDate.value || !bookings.value) return allCars;

  for (const booking of bookings.value) {
    const carId = booking.carId;
    const bookedCar = allCars.find((car) => car.id === carId);
    const bookedCarIndex = allCars.findIndex((car) => car.id === carId);

    if (bookedCar) {
      if (
        DateUtils.compareDatesIgnoringTime(booking.startDate, endDate.value) <=
          0 &&
        DateUtils.compareDatesIgnoringTime(booking.endDate, startDate.value) >=
          0
      ) {
        allCars.splice(bookedCarIndex, 1);
      }
    }
  }
  return allCars;
});

function sortCars(date1, date2) {
  startDate.value = date1;
  endDate.value = date2;
  isInvalidDate.value = false;
}

function handleCarClick() {
  if (!startDate.value || !endDate.value) {
    console.log("eddig jo");
    isInvalidDate.value = true;
    return false;
  }
  return true;
}

async function loadData() {
  try {
    isLoading.value = true;

    await Promise.all([
      store.dispatch("cars/fetchCars"),
      store.dispatch("bookings/fetchBookings"),
    ]);
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="container-fluid p2">
    <BaseCard class="mx-2 mt-2 p-2">
      <div class="text-center">
        <h2>Találd meg az autódat</h2>
      </div>
      <DateRangePicker
        @dates-changed="sortCars"
        :is-invalid="isInvalidDate"
      ></DateRangePicker>
    </BaseCard>
    <div>
      <div class="text-center m-5" v-if="isLoading">
        <BaseSpinner></BaseSpinner>
      </div>

      <div class="row m-0" v-else>
        <CarListItem
          class="col-md-6"
          v-for="car in cars"
          :key="car.id"
          :car="car"
          :start-date="startDate"
          :end-date="endDate"
          @car-click="handleCarClick"
        ></CarListItem>
      </div>
    </div>
  </div>
</template>
