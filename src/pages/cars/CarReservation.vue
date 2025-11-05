<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import CarReservationForm from "../../components/cars/CarReservationForm.vue";
import BaseCard from "../../components/ui/BaseCard.vue";
import * as DateUtils from "../../utils/dateUtils";
import * as HelperUtils from "../../utils/helperUtils";

const route = useRoute();
const store = useStore();
const carId = route.params.carId;

const selectedCar = computed(() => {
  return store.getters["cars/cars"].find((car) => car.id === carId);
});

const startDate = route.query.startDate.replaceAll("-", ".") + ".";
const endDate = route.query.endDate.replaceAll("-", ".") + ".";
const numberOfDaysBooked = DateUtils.daysBetween(startDate, endDate) + 1;
const totalPriceOfReservation = computed(() => {
  return numberOfDaysBooked * parseInt(selectedCar.value.dailyPrice);
});
</script>

<template>
  <div class="mx-2">
    <div class="my-container">
      <BaseCard class="mb-2">
        <section class="mx-5 mt-2 mb-4">
          <h2 class="text-xl font-semibold mb-4 text-center">
            Foglalási adatok
          </h2>
          <div class="row mb-2">
            <div class="col-sm-6 text-center text-sm-end align-content-center">
              <h6 class="m-0">Autó neve</h6>
            </div>
            <div
              class="col-sm-6 text-center text-sm-start align-content-center"
            >
              <p class="m-0">{{ selectedCar.brand }} {{ selectedCar.model }}</p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6 text-center text-sm-end">
              <h6 class="m-0">Foglalás dátuma</h6>
            </div>
            <div class="col-sm-6 text-center text-sm-start">
              <p class="m-0">{{ startDate }} - {{ endDate }}</p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6 text-center text-sm-end">
              <h6 class="m-0">Foglalandó napok száma</h6>
            </div>
            <div class="col-sm-6 text-center text-sm-start">
              <p class="m-0">{{ numberOfDaysBooked }}</p>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6 text-center text-sm-end">
              <h6 class="m-0">Foglalás teljes összege</h6>
            </div>
            <div class="col-sm-6 text-center text-sm-start">
              <p class="m-0">
                {{ HelperUtils.formatThousands(totalPriceOfReservation) }} Ft
              </p>
            </div>
          </div>
        </section>
      </BaseCard>
      <BaseCard>
        <section class="mx-5 mt-2 mb-4">
          <h2 class="text-xl font-semibold mb-4 text-center">Autó foglalása</h2>
          <CarReservationForm
            :car-id="carId"
            :booking-start-date="startDate"
            :booking-end-date="endDate"
            :number-of-days-booked="numberOfDaysBooked"
            :total-price-of-reservation="totalPriceOfReservation"
          ></CarReservationForm>
        </section>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped>
.my-container {
  margin: 1rem auto;
  max-width: 50rem;
}
</style>
