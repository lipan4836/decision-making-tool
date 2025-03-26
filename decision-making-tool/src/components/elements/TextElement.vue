<template>
  <component
    :is="tag"
    :class="classes"
  >
    {{ content }}
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TextElOptions } from '../../types/elements';

const props = defineProps<TextElOptions>()

const classes = computed(() => props.classes?.join(' '))
</script>
