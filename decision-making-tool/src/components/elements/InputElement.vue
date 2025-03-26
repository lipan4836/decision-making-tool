<template>
  <input
    :id="id"
    :type="type"
    :class="classes"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    :min="min"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { InputOptions } from '../../types/elements';

const props = defineProps<InputOptions>()

const classes = computed(() => props.classes?.join(' '))

const handleInput = (event: Event) => {
  if (props.callback) props.callback(event)
}
</script>

<style scoped>

</style>