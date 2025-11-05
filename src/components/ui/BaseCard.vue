<script setup>
import { computed } from "vue";

const props = defineProps({
  isButton: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const cardDinamycClass = computed(() => {
  return { "animated-card": props.isButton };
});
</script>

<template>
  <div class="card my-card rounded-4" :class="cardDinamycClass">
    <slot></slot>
  </div>
</template>

<style scoped>
.my-card {
  overflow: hidden;
}

.animated-card {
  transition: all 0.2s ease;
}

.animated-card:hover {
  background-color: #ccc;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 15);
}
</style>
