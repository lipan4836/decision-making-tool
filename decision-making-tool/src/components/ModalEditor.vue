<template>
  <ModalDialog
    class="modal"
    @close="$emit('close')"
  >
    <template #title>
      Paste Options List
    </template>

    <div class="paste-modal">
      <textarea
        ref="textareaRef"
        v-model="textInput"
        class="paste-modal__textarea"
        placeholder="Paste a list of new options in a CSV-like format:&#10;&#10;title,1                  → | title                  | 1 |&#10;title with whitespaces,2 → | title with whitespaces | 2 |&#10;title , with , commas,3  → | title , with , commas  | 3 |&#10;title with 'quotes',4    → | title with 'quotes'    | 4 |"
      />

      <ButtonElement
        class="paste-modal__buttons"
        @click="handleConfirm"
      >
        Confirm
      </ButtonElement>
      <ButtonElement
        class="paste-modal__buttons"
        @click="$emit('close')"
      >
        Cancel
      </ButtonElement>

      <p
        v-if="errorMessage"
        class="error-message"
      >
        {{ errorMessage }}
      </p>
    </div>
  </ModalDialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ListItem, OptionList } from '../types/types';
import ButtonElement from './elements/ButtonElement.vue';
import ModalDialog from './ModalDialog.vue';

const emit = defineEmits<{
  (e: 'confirm', list: OptionList): void;
  (e: 'close'): void;
}>();

const textInput = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const errorMessage = ref('');

const handleConfirm = () => {
  try {
    const result = fromTxtToJson(textInput.value);

    if (result.list.length === 0) {
      errorMessage.value = 'List must contain at least one valid option';
      return;
    }

    emit('confirm', result);
    emit('close');
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Invalid format';
    console.error(error);
  }
};

function fromTxtToJson(text: string): OptionList {
  const lines = text.split(/\r?\n/);
  const listItems: ListItem[] = [];
  let lastId = 0;

  lines.forEach((line, index) => {
    line = line.trim();
    if (!line) return;

    const lastCommaIndex = line.lastIndexOf(',');
    if (lastCommaIndex === -1) {
      throw new Error(`Invalid format in line ${index + 1}: Missing comma`);
    }

    const title = line.slice(0, lastCommaIndex).trim();
    const weight = parseFloat(line.slice(lastCommaIndex + 1).trim());

    if (isNaN(weight)) {
      throw new Error(`Invalid weight in line ${index + 1}`);
    }

    listItems.push({
      id: `#${index + 1}`,
      title,
      weight,
    });

    lastId = index + 1;
  });

  return {
    list: listItems,
    lastId,
  };
}

onMounted(() => {
  textareaRef.value?.focus();
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 10;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 50%);
  backdrop-filter: blur(5px);
}

.paste-modal {
  width: 94%;
  z-index: 11;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
  padding: 16px;
  border-radius: 10px;
  background: #333;

  &__textarea {
    resize: none;
    grid-column: span 2 / span 2;
    grid-row: span 4 / span 4;
    padding: 0.5rem;
    border-radius: 5px;
  }

  &__buttons {
    cursor: pointer;
    padding: 0.6em 1.2em;
    border: 1px solid #1a1a1a;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1em;
    font-weight: 500;
    background-color: #1a1a1a;
    transition: border-color 0.25s;
    text-align: center;

    &:hover {
      border-color: #646cff;
    }
  }

  &__buttons:nth-child(1) {
    grid-row-start: 5;
  }

  &__buttons:nth-child(2) {
    grid-row-start: 5;
  }

  .error-message {
    text-align: center;
    grid-column: span 2 / span 2;
    grid-row-start: 6;
  }
}

@media (prefers-color-scheme: light) {
  .paste-modal {
    background: white;

    &__buttons {
      background: #adadad;

      :hover {
        border-color: #747bff;
      }
    }
  }
}
</style>
