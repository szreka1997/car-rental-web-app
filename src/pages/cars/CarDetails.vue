<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import BaseCard from "../../components/ui/BaseCard.vue";
import CarDescription from "../../components/cars/CarDescription.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();
const props = defineProps(["carId"]);

const isFormVisible = computed(() => {
  return route.path.split("/").includes("reservation");
});

const selectedCar = computed(() => {
  return store.getters["cars/cars"].find((car) => car.id === props.carId);
});

function goToCarReservation() {
  router.push({
    path: route.path + "/reservation",
    query: route.query,
  });
}
</script>

<template>
  <div class="mx-3">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <BaseCard class="container my-card" v-if="!isFormVisible">
          <div class="row">
            <div class="col-md-6 px-0 py-0">
              <img
                class="img-fluid h-100 card-img-top"
                :src="selectedCar.imageUrl"
              />
            </div>

            <div class="col-md-6 p-3">
              <div class="card-body p-0 m-0">
                <CarDescription
                  :name="selectedCar.brand + ' ' + selectedCar.model"
                  :year="selectedCar.year"
                  :daily-price="selectedCar.dailyPrice"
                  :description="selectedCar.description"
                ></CarDescription>
                <div class="text-end m-2">
                  <button class="btn btn-primary" @click="goToCarReservation">
                    Foglalás
                  </button>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>

        <component :is="Component" v-else></component>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.card-img-top {
  object-fit: cover;
}

.my-card {
  margin: 1rem auto;
  max-width: 50rem;
}
</style>
