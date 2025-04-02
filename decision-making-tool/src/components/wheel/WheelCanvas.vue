<template>
  <div class="wheel-container">
    <p
      id="picked-field"
      class="picked-elem"
      :style="{
        color: selectedTextColor,
        background: selectedBgColor,
        fontWeight: isSpining ? '400' : '600',
      }"
    >
      {{ selectedOption?.title || 'Spin the wheel!' }}
    </p>
    <canvas
      ref="canvas"
      class="wheel-canvas"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { ListItem } from '../../types/types';
import { generateColorsForWheel } from '../../utils/colors';
import drawWheel from './wheelComponent';
import drawPicker from './pickerComponent';
import useWheelAnimation from '../../utils/useWheelAnomation';

const props = defineProps<{
  options: ListItem[];
  rotationAngle?: number;
  duration: number;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const colors = ref<string[]>(generateColorsForWheel(props.options.length));
const selectedOption = ref<ListItem | null>(null);
const selectedBgColor = ref('#383838');
const selectedTextColor = ref('#E8E8E8');

const getCanvasContext = () => {
  return canvas.value?.getContext('2d') || null;
};

const { isSpining, startSpin } = useWheelAnimation(
  getCanvasContext,
  props.options,
  colors.value,
  (option: ListItem, color: string) => {
    selectedOption.value = option;
    selectedBgColor.value = color;
    selectedTextColor.value = 'white';
  }
);

const updateCanvas = () => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  if (colors.value.length !== props.options.length) {
    colors.value = generateColorsForWheel(props.options.length);
  }

  const maxWidth = Math.min(window.innerWidth - 16, 550);
  canvas.value.width = maxWidth;
  canvas.value.height = maxWidth;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  drawWheel(ctx, props.options, colors.value, props.rotationAngle);
  drawPicker(ctx);
};

const startAnimation = () => {
  if (props.options.length < 2) return;
  console.log('Starting animation with duration:', props.duration * 1000);
  startSpin(props.duration * 1000);
};

onMounted(() => {
  updateCanvas();
  window.addEventListener('resize', updateCanvas);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCanvas);
});

defineExpose({
  startAnimation
});

watch(() => props.options, updateCanvas, { deep: true });
watch(() => props.rotationAngle, updateCanvas);
watch(() => props.options, (newOptions) => {
  if (newOptions.length !== colors.value.length) {
    colors.value = generateColorsForWheel(newOptions.length);
  }
}, { deep: true });
</script>

<style scoped lang="scss">
.wheel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}

.wheel-canvas {
  max-width: 100%;
  height: auto;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.picked-elem {
  width: 70%;
  padding: 8px 32px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.5s ease-in;
}

@media (prefers-color-scheme: light) {
  .picked-elem {
    background: transparent;
  }
}
</style>
