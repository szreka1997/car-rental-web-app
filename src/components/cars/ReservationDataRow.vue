<script setup>
const props = defineProps(["label", "value"]);
</script>

<template>
  <div class="row mb-2">
    <div class="col-sm-6 text-center text-sm-end align-content-center">
      <h6 class="m-0">{{ props.label }}</h6>
    </div>
    <div class="col-sm-6 text-center text-sm-start align-content-center">
      <p class="m-0">{{ props.value }}</p>
    </div>
  </div>
</template>
