<template>
  <svg width="24" height="24" viewBox="0 0 24 24">
    <use :href="`${publicPath}iconsSprite.svg#${name}`" />
  </svg>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  name: string
}>();

const publicPath = ref(import.meta.env.BASE_URL);
</script>