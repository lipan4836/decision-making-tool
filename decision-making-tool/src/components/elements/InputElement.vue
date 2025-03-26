<template>
  <input
  :id="id"
    :type="type"
    :class="className"
    :name="name"
    :value="modelValue"
    :placeholder="placeholder"
    :min="min"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @change="$emit('change', $event)"
  />
</template>

<script setup lang="ts">
defineProps<{
  type?: string
  className?: string | Record<string, boolean> | (string | Record<string, boolean>)[]
  id?: string
  name?: string
  modelValue?: string
  placeholder?: string
  min?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', event: Event): void
}>()
</script>
