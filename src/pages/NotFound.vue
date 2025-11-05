<script setup>
import BaseCard from "../components/ui/BaseCard.vue";
</script>

<template>
  <BaseCard class="m-2 p-3">
    <h2>Az oldal nem található!</h2>
    <p>
      Ez az oldal nem található - esetleg nézd meg az
      <router-link to="/">autóinkat</router-link>.
    </p>
  </BaseCard>
</template>
