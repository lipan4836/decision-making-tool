<template>
  <main class="main">
    <h1>Decision Making Tool</h1>
    <ul class="list-wrap">
      <ListItem
        v-for="item in state.list"
        :key="item.id"
        :item="item"
        @update="(data) => updateOption(item.id, data)"
        @remove="removeOption"
      />
    </ul>
    <div class="btns-block">
      <ButtonElement
        class="btns-block_btn"
        @click="addOption"
      >
        Add Option
      </ButtonElement>
      <ButtonElement class="btns-block_btn">
        Past List
      </ButtonElement>
      <ButtonElement
        class="btns-block_btn"
        @click="clearList"
      >
        Clear List
      </ButtonElement>
      <ButtonElement
        class="btns-block_btn short"
        @click="downloadListJson"
      >
        Save List to File
      </ButtonElement>
      <ButtonElement
        class="btns-block_btn short"
        @click="uploadListFromJson"
      >
        Load List from File
      </ButtonElement>
      <ButtonElement
        class="btns-block_btn"
        @click="handleStart"
      >
        Start
      </ButtonElement>
    </div>

    <ModalDialog
      v-if="showErrorModal"
      @close="showErrorModal = false"
    >
      <template #title>
        Error
      </template>
      <p>{{ errorMessage }}</p>
    </ModalDialog>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import ListItem from '../components/ListItem.vue';
import ButtonElement from '../components/elements/ButtonElement.vue';
import ModalDialog from '../components/ModalDialog.vue';
import { useOptionsStore } from '../store/options';
import { useRouter } from 'vue-router';

const store = useOptionsStore();
const { state } = storeToRefs(store);
const { addOption, removeOption, updateOption, clearList, downloadListJson, uploadListFromJson } =
  store;

const router = useRouter()
const showErrorModal = ref(false)
const errorMessage = ref('')

const handleStart = () => {
  if (store.state.list.length < 2) {
    showErrorModal.value = true
    errorMessage.value = 'You must add at least 2 options'
    return
  }

  const hasEmptyFields = store.state.list.some((item) => !item.title.trim() || item.weight === null)

  if (hasEmptyFields) {
    showErrorModal.value = true
    errorMessage.value = 'All options must have a name and weight'
    return
  }

  router.push('/decision-making')
}

onMounted(() => {
  store.init();
});
</script>

<style lang="scss" scoped>
.list-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px 16px;

  @media (width <= 495px) {
    width: auto;
  }
}

.btns-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;

  &_btn {
    grid-column: span 2;
    width: 100%;
  }

  .short {
    grid-column: span 1;
    width: auto;
  }

  .short:first-of-type {
    grid-column: 1;
  }

  .short:last-of-type {
    grid-column: 2;
  }
}
</style>
