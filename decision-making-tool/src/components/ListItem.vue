<template>
  <li class="item">
    <LabelElement class="item-label">
      {{ item.id }}
    </LabelElement>
    <InputElement
      type="text"
      name="title"
      placeholder="Enter option title"
      class="item-title"
      :value="item.title"
      @input="(e: Event) => handleInput(e, 'title')"
    />
    <InputElement
      type="number"
      name="weight"
      placeholder="Enter weight"
      class="item-weight"
      :value="item.weight"
      @input="(e: Event) => handleInput(e, 'weight')"
    />
    <ButtonElement
      class="item-btn"
      @click="$emit('remove', item.id)"
    >
      DELETE
    </ButtonElement>
  </li>
</template>

<script setup lang="ts">
import type { ListItem } from '../types/types';
import { defineProps, defineEmits } from 'vue';
import { assert } from '../utils/typesProtection';
import ButtonElement from './elements/ButtonElement.vue';
import InputElement from './elements/InputElement.vue';
import LabelElement from './elements/LabelElement.vue';

defineProps<{
  item: ListItem
}>()

const emit = defineEmits<{
  (e: 'update', data: Partial<ListItem>): void
  (e: 'remove', id: string): void
}>();

const handleInput = (event: Event, field: keyof ListItem) => {
  const target = event.target
  assert(target instanceof HTMLInputElement, `${target} is not HTMLInputElement`)

  const value = field === 'weight'
    ? Number(target.value)
    : target.value

  emit('update', {[field]: value})
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;

  &-label {
    padding: 5px 10px;
    border: 1px solid rgb(255 255 255 / 87%);
    border-radius: 5px;

    @media (prefers-color-scheme: light) {
      & {
        border: 1px solid #242424;
      }
    }

    @media (width <= 550px) {
      order: 2;
    }
  }

  &-title {
    flex-grow: 1;
    height: 36px;
    padding: 0 10px;
    border-radius: 5px;
    line-height: 1.5;

    @media (width <= 550px) {
      order: 1;
      width: calc(70% - 8px);
    }
  }

  &-weight {
    max-width: 5rem;
    height: 36px;
    padding: 0 10px;
    border-radius: 5px;
    line-height: 1.5;

    @media (width <= 550px) {
      order: 1;
      width: calc(30% - 8px);
    }
  }

  &-btn {
    height: 36px;
    padding: 5px 16px;
    border-radius: 5px;

    @media (width <= 550px) {
      order: 2;
      width: calc(50% - 8px);
    }
  }

  @media (width <= 550px) {
    gap: 8px;
  }
}
</style>
