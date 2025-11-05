<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isInvalid: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits(["dates-changed"]);

const dates = ref();
const isInvalid = ref(props.isInvalid);

watch(
  () => props.isInvalid,
  () => {
    isInvalid.value = props.isInvalid;
  }
);

function handleUpdate(event) {
  emit("dates-changed", event && event[0], event && event[1]);
  isInvalid.value = false;
}
</script>

<template>
  <div class="row text-center">
    <div class="col-md-6 align-content-center">
      <h5 class="text-secondary">Mikor szeretne autót?</h5>
    </div>
    <div class="col-md-6">
      <VueDatePicker
        range
        v-model="dates"
        :class="{ 'is-invalid': isInvalid }"
        :min-date="new Date()"
        :formats="{ input: 'yyyy.MM.dd' }"
        :teleport="true"
        @update:model-value="handleUpdate"
      />
      <div v-if="isInvalid" class="is-invalid">
        <p>Válassza ki a dátumot mikor szeretne autót foglalni!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-invalid p {
  color: red;
}

:deep(.is-invalid .dp__input) {
  border: 1px solid #dc3545 !important;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>
