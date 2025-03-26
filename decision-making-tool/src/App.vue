<script setup lang="ts">
import ButtonElement from './components/elements/ButtonElement.vue'
import LabelElement from './components/elements/LabelElement.vue'
import InputElement from './components/elements/InputElement.vue'
import TextElement from './components/elements/TextElement.vue'

const handleButtonClick = () => {
  console.log('button clicked!')
}

const handleInput = (event: Event) => {
  console.log('input value:', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <h1>Decision Making Tool</h1>
  <ButtonElement
    content="Click Me!"
    :classes="['btn']"
    :callback="handleButtonClick" 
  />
  <LabelElement
    count="#42"
    :classes="['label']"
  />
  <InputElement
    type="text"
    name="option"
    placeholder="Enter option title"
    :classes="['input']"
    :callback="handleInput"
  />
  <TextElement
    tag="p"
    content="Some text"
    :classes="['text']"
  />
</template>

<style scoped>

</style>
