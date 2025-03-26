<template>
  <component
    :is="tag"
    :class="className"
  >
    <slot>{{ content }}</slot>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  tag?: string
  className?: string | Record<string, boolean> | (string | Record<string, boolean>)[]
  content?: string
}>()
</script>