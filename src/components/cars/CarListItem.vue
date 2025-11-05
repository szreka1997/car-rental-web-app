<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

import BaseCard from "../ui/BaseCard.vue";
import * as DateUtils from "../../utils/dateUtils";

const props = defineProps(["car", "startDate", "endDate"]);
const emit = defineEmits(["car-click"]);

const router = useRouter();

const startDateString = computed(() =>
  DateUtils.getShortISOString(props.startDate)
);
const endDateString = computed(() =>
  DateUtils.getShortISOString(props.endDate)
);

function goToCarDetails() {
  if (!props.startDate || !props.endDate) {
    emit("car-click");
    return;
  }

  router.push({
    name: "cars",
    params: { carId: props.car.id },
    query: { startDate: startDateString.value, endDate: endDateString.value },
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
          <h4 class="card-title">
            {{ props.car.brand }} {{ props.car.model }}
          </h4>
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
