<template>
  <main class="main">
    <h1>Decision Making Tool</h1>
    <div class="btns-block">
      <ButtonElement
        class="btns-block_btn back"
        @click="handleNavigateToMain"
      >
        <Icon name="undo-2" />
      </ButtonElement>
      <ButtonElement
        class="btns-block_btn volume"
        @click="toggleMute"
      >
        <Icon :name="volumeIcon" />
      </ButtonElement>
      <div class="btns-block_label duration">
        <Icon
          name="timer"
          class="btns-block_label__svg"
        />
        <InputElement
          v-model.number="duration"
          type="number"
          name="duration"
          placeholder="Enter duration"
          class="btns-block_label__input"
          min="3"
          max="30"
          @change="validateDuration"
        />
      </div>
      <ButtonElement
        class="btns-block_btn start"
        @click="handleStartClick"
      >
        <Icon name="play" />
      </ButtonElement>
    </div>
    <WheelCanvas
      ref="wheelRef"
      :options="options"
      :duration="duration"
      :rotation-angle="0"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ButtonElement from '../components/elements/ButtonElement.vue';
import InputElement from '../components/elements/InputElement.vue';
import Icon from '../components/UI/Icon.vue';
import WheelCanvas from '../components/wheel/WheelCanvas.vue';
import { useOptionsStore } from '../store/options';
import { useRouter } from 'vue-router';
import { useSettingsStore } from '../store/settings';

const router = useRouter()
const store = useOptionsStore()
const settingsStore = useSettingsStore()
const duration = ref(7)

store.init()

const options = store.state.list
const volumeIcon = computed(() => settingsStore.isMuted ? 'volume-off' : 'volume-2')

const wheelRef = ref<InstanceType<typeof WheelCanvas> | null>(null)

console.log('options:', options)

const handleStartClick = () => {
  if (wheelRef.value) {
    wheelRef.value.startAnimation()
  }
  console.log('start click')
}

const handleNavigateToMain = () => {
  router.push('/')
}

const toggleMute = () => {
  settingsStore.toggleMute()
}

const validateDuration = () => {
  if (duration.value < 1) duration.value = 1;
  if (duration.value > 10) duration.value = 10;
};
</script>

<style scoped lang="scss">
.btns-block {
  display: grid;
  grid-template: 'btn-back btn-volume duration duration' 50px 'btn-start btn-start btn-start btn-start' 50px / 50px 50px 50px 50px;
  gap: 0.5em;
  width: 225px;
  margin-inline: auto;

  &_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    padding: 0;
  }

  &_label {
    display: flex;
    align-items: center;
    padding-left: 8px;
    border: 1px solid #1a1a1a;
    border-radius: 8px;
    background-color: #1a1a1a;

    &__svg {
      width: 48px;
      height: 48px;
    }

    &__input {
      flex-grow: 1;
      width: 50px;
      height: 48px;
      margin-left: 8px;
      padding: 0 8px;
      border: none;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    @media (prefers-color-scheme: light) {
      & {
        background: transparent;
      }
    }
  }
}

.back {
  grid-area: btn-back;
}

.volume {
  grid-area: btn-volume;
}

.duration {
  grid-area: duration;
}

.start {
  grid-area: btn-start;
  width: 100%;
}

.picked-elem {
  width: 70%;
  padding: 8px 32px;
  border-radius: 8px;
  text-align: center;
  background: #383838;
  transition: all 0.5s ease-in;

  @media (prefers-color-scheme: light) {
    & {
      background: transparent;
    }
  }
}
</style>
