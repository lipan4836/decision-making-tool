import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const isMuted = ref(false);

  const storedData = localStorage.getItem('isMuted');
  if (storedData !== null) {
    try {
      isMuted.value = storedData === 'true';
    } catch {
      console.warn('Failed to parse isMuted from localeStorage');
    }
  }

  watch(
    isMuted,
    (newValue) => {
      localStorage.setItem('isMuted', JSON.stringify(newValue));
    },
    { immediate: true },
  );

  const toggleMute = () => {
    isMuted.value = !isMuted.value;
  };

  return {
    isMuted,
    toggleMute,
  };
});
