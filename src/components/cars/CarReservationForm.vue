<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import router from "../../router";

const props = defineProps([
  "carId",
  "bookingStartDate",
  "bookingEndDate",
  "numberOfDaysBooked",
  "totalPriceOfReservation",
]);

const store = useStore();

const name = ref("");
const email = ref("");
const address = ref("");
const phone = ref("");
const wasValidated = ref(false);

async function handleSubmit(e) {
  const form = e.target;
  wasValidated.value = true;

  const valid = form.checkValidity();

  if (!valid) return;

  const customer = {
    fullName: name.value,
    email: email.value,
    address: address.value,
    phone: phone.value,
  };
  const customerId = await store.dispatch("customers/addCustomers", customer);

  const booking = {
    carId: props.carId,
    customerId,
    startDate: props.bookingStartDate,
    endDate: props.bookingEndDate,
    days: props.numberOfDaysBooked,
    totalPrice: props.totalPriceOfReservation,
  };
  store.dispatch("bookings/addBooking", booking);

  router.replace("/");
  alert("Sikeres foglalás!");
}
</script>

<template>
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
      <div class="invalid-feedback">Érvénytelen Telefonszám!</div>
    </div>

    <!-- Submit -->
    <button type="submit" class="btn btn-primary mt-1">
      Foglalás elküldése
    </button>
  </form>
</template>
