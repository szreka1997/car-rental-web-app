<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import BaseCard from "../ui/BaseCard.vue";
import * as DateUtils from "../../utils/dateUtils";

const props = defineProps(["car", "startDate", "endDate"]);
const emit = defineEmits(["car-click"]);
const router = useRouter();

const name = computed(() => {
  return props.car.brand + " " + props.car.model;
});

function goToCarDetails() {
  if (!props.startDate || !props.endDate) {
    emit("car-click");
    return;
  }

  const startDateString = DateUtils.getShortISOString(props.startDate);
  const endDateString = DateUtils.getShortISOString(props.endDate);

  router.push({
    name: "cars",
    params: { carId: props.car.id },
    query: { startDate: startDateString, endDate: endDateString },
  });
}
</script>

<template>
  <div class="px-1 py-1">
    <BaseCard @click="goToCarDetails" is-button>
      <div>
        <div class="ratio ratio-16x9">
          <img class="card-img-top" :src="props.car.imageUrl" />
        </div>
        <div class="card-body text-center">
          <h4 class="card-title">{{ name }}</h4>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.card-img-top {
  object-fit: cover;
}

.my-button {
  height: 50px;
}
</style>
