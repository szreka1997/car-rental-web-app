<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import BaseSpinner from "../ui/BaseSpinner.vue";
import BaseCard from "../ui/BaseCard.vue";

const props = defineProps([
  "carId",
  "bookingStartDate",
  "bookingEndDate",
  "numberOfDaysBooked",
  "totalPriceOfReservation",
]);

const router = useRouter();
const store = useStore();

const name = ref("");
const email = ref("");
const address = ref("");
const phone = ref("");
const wasValidated = ref(false);
const isLoading = ref(false);
const successMessage = ref("");

async function handleSubmit(e) {
  const form = e.target;
  wasValidated.value = true;

  if (!form.checkValidity()) return;

  try {
    isLoading.value = true;
    const customerId = await store.dispatch("customers/addCustomers", {
      fullName: name.value,
      email: email.value,
      address: address.value,
      phone: phone.value,
    });
    await store.dispatch("bookings/addBooking", {
      carId: props.carId,
      customerId,
      startDate: props.bookingStartDate,
      endDate: props.bookingEndDate,
      days: props.numberOfDaysBooked,
      totalPrice: props.totalPriceOfReservation,
    });

    successMessage.value = "✅ Sikeres foglalás!";
    setTimeout(() => {
      isLoading.value = false;
      router.replace("/");
    }, 1500);
  } catch (error) {
    alert(error.message);
    isLoading.value = false;
  }
}
</script>

<template>
  <BaseCard>
    <section class="mx-5 mt-2 mb-4">
      <h2 class="text-xl font-semibold mb-4 text-center">Autó foglalása</h2>
      <div class="position-relative">
        <div
          class="position-absolute top-50 start-50 translate-middle w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-50"
          style="z-index: 10"
          v-if="isLoading"
        >
          <BaseSpinner></BaseSpinner>
        </div>
        <form
          novalidate
          @submit.prevent="handleSubmit"
          :class="{ 'was-validated': wasValidated }"
        >
          <!-- Name -->
          <div class="form-floating my-1">
            <input
              type="text"
              id="name"
              required
              placeholder="Nagy Péter"
              class="form-control"
              v-model="name"
            />
            <label class="form-label" for="name">Teljes név</label>
            <div class="invalid-feedback">Érvénytelen név!</div>
          </div>

          <!-- E-mail -->
          <div class="form-floating my-1">
            <input
              type="email"
              id="email"
              required
              placeholder="pelda@email.com"
              class="form-control"
              v-model="email"
            />
            <label class="form-label" for="email">E-mail</label>
            <div class="invalid-feedback">Érvénytelen e-mail!</div>
          </div>

          <!-- Adress -->
          <div class="form-floating my-1">
            <input
              type="text"
              id="address"
              required
              placeholder="1051 Budapest, Példa út 12."
              class="form-control"
              v-model="address"
            />
            <label class="form-label" for="adress">Cím</label>
            <div class="invalid-feedback">Érvénytelen cím!</div>
          </div>

          <!-- Phone -->
          <div class="form-floating my-1">
            <input
              type="tel"
              id="phone"
              required
              placeholder="+36 30 123 4567"
              class="form-control"
              v-model="phone"
            />
            <label class="form-label" for="phone">Telefonszám</label>
            <div class="invalid-feedback">Érvénytelen telefonszám!</div>
          </div>

          <p v-if="successMessage" class="text-success text-center mt-2">
            {{ successMessage }}
          </p>

          <!-- Submit -->
          <button type="submit" class="btn btn-primary mt-1">
            Foglalás elküldése
          </button>
        </form>
      </div>
    </section>
  </BaseCard>
</template>
