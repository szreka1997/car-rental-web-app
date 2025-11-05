<script setup>
import BaseCard from "../ui/BaseCard.vue";
import ReservationDataRow from "../cars/ReservationDataRow.vue";
import * as HelperUtils from "../../utils/helperUtils";

const props = defineProps([
  "carName",
  "startDate",
  "endDate",
  "days",
  "totalPrice",
]);
</script>

<template>
  <BaseCard class="mb-2">
    <section class="mx-5 mt-2 mb-4">
      <h2 class="text-xl font-semibold mb-4 text-center">Foglalási adatok</h2>
      <ReservationDataRow label="Autó neve" :value="props.carName" />
      <ReservationDataRow
        label="Foglalás dátuma"
        :value="props.startDate + ' - ' + props.endDate"
      />
      <ReservationDataRow label="Foglalandó napok száma" :value="props.days" />
      <ReservationDataRow
        label="Foglalás teljes összege"
        :value="HelperUtils.formatThousands(props.totalPrice) + ' Ft'"
      />
    </section>
  </BaseCard>
</template>
