<script setup>
import * as HelperUtils from "../../utils/helperUtils";

const props = defineProps(["name", "year", "dailyPrice", "description"]);
</script>

<template>
  <h4 class="card-title text-primary">
    {{ props.name }}
  </h4>

  <div class="row">
    <div class="col">
      <h6 class="card-text">{{ props.year }}</h6>
    </div>
    <div class="col">
      <h6 class="card-text text-end">
        {{ HelperUtils.formatThousands(props.dailyPrice) }} Ft / nap
      </h6>
    </div>
  </div>
  <div class="row">
    <p class="card-text text-secondary tect">
      {{ props.description }}
    </p>
  </div>
</template>
