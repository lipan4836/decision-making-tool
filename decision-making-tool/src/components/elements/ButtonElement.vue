<template>
  <button
    :class="classes"
    @click="handleClick"
  >
    {{ content }}
  </button>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import type {ButtonOptions} from '../../types/elements'

const props = defineProps<ButtonOptions>()

const handleClick = () => {
  if (props.callback) props.callback()
}

const classes = computed(() => props.classes?.join(' '))
</script>

<style scoped>

</style>