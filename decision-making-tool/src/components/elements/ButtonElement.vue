<template>
  <button
    :class="className"
    @click="$emit('click', $event)"
  >
    <slot>{{ content }}</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  className?: string | Record<string, boolean> | (string | Record<string, boolean>)[]
  content?: string
}>()

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>