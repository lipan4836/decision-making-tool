<template>
  <label :class="classes">
    <slot v-if="$slots.default" />
    <template v-else>{{ count }}</template>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { LabelOptions } from '../../types/elements';

const props = defineProps<LabelOptions>()

const classes = computed(() => props.classes?.join(' '))
</script>

<style scoped>

</style>