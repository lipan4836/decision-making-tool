import { onMounted, ref } from 'vue';
import type { ListItem } from '../types/types';
import { fadeOutAudio, playAudio } from './audio';
import drawPicker from '../components/wheel/pickerComponent';
import drawWheel from '../components/wheel/wheelComponent';
import { useSettingsStore } from '../store/settings';

export default function useWheelAnimation(
  getContext: () => CanvasRenderingContext2D | null,
  options: ListItem[],
  colors: string[],
  updateSelectedOption: (option: ListItem, color: string) => void,
) {
  const settingsStore = useSettingsStore();
  const isSpining = ref(false);
  let animationId: number | null = null;
  let spinSound: HTMLAudioElement | null = null;
  let pickSound: HTMLAudioElement | null = null;

  const startSpin = (duration: number) => {
    console.log('startSpin was called with duration:', duration);

    if (isSpining.value) return;
    isSpining.value = true;

    const ctx = getContext();
    if (!ctx) {
      console.error('Canvas context is not available');
      return;
    }

    const startTime = performance.now();
    const minRotations = 5;
    const maxRotations = 20;
    const randomRotations = minRotations + Math.random() * (maxRotations - minRotations);
    const totalRotation = 360 * randomRotations + Math.random() * 360;

    spinSound = playAudio('/sounds/start.mp3', 0.6);
    pickSound = playAudio('/sounds/picked.mp3', 0.7);
    if (!settingsStore.isMuted && spinSound) spinSound.play();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const rotationAngle = easedProgress * totalRotation;

      // Обновляем canvas с новым углом поворота
      const ctx = getContext();
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        drawWheel(ctx, options, colors, rotationAngle);
        drawPicker(ctx);
      }

      const currentAngle = (360 - (rotationAngle % 360) + 270) % 360;
      const { option, color } = getSelectedOption(options, currentAngle, colors);
      updateSelectedOption(option, color);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
        if (elapsedTime >= duration - 1000 && spinSound) {
          fadeOutAudio(spinSound, 2000);
        }
      } else {
        finishSpin(option, color);
        if (!settingsStore.isMuted && pickSound) pickSound.play();
      }
    };

    animationId = requestAnimationFrame(animate);
  };

  const finishSpin = (selectedOption: ListItem, selectedColor: string) => {
    isSpining.value = false;
    updateSelectedOption(selectedOption, selectedColor);

    if (spinSound) {
      spinSound.pause();
      spinSound.currentTime = 0;
    }
  };

  const getSelectedOption = (options: ListItem[], finalAngle: number, colors: string[]) => {
    const totalWeight = options.reduce((sum, item) => sum + (item.weight || 1), 0);
    let accumulatedAngle = 0;

    for (let i = 0; i < options.length; i += 1) {
      const option = options[i];
      const weight = option.weight !== null ? option.weight : 1;
      const sliceAngle = (weight / totalWeight) * 360;

      if (finalAngle >= accumulatedAngle && finalAngle < accumulatedAngle + sliceAngle) {
        return { option, color: colors[i] };
      }

      accumulatedAngle += sliceAngle;
    }

    return { option: options[0], color: colors[0] };
  };

  onMounted(() => {
    if (animationId) cancelAnimationFrame(animationId);
    if (spinSound) spinSound.pause();
    if (pickSound) pickSound.pause();
  });

  return {
    isSpining,
    startSpin,
    stopSpin: () => {
      if (animationId) cancelAnimationFrame(animationId);
      isSpining.value = false;
    },
  };
}
