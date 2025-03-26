<template>
  <label :class="className">
    <slot />
  </label>
</template>

<script setup lang="ts">
defineProps<{
  className?: string | Record<string, boolean> | (string | Record<string, boolean>)[]
}>()
</script>