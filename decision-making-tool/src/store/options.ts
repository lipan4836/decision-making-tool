import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { ListItem, OptionList } from '../types/types';

export const useOptionsStore = defineStore('options', () => {
  const state = ref<OptionList>({
    list: [],
    lastId: 0,
  });

  const init = () => {
    const saved = localStorage.getItem('option-list');
    if (saved) {
      try {
        const parsed: OptionList = JSON.parse(saved);
        if (parsed.list.length > 0) {
          state.value = parsed;
          return;
        }
      } catch (e) {
        console.error('Failed to parse saved options', e);
      }
    }

    state.value = {
      list: [{ id: '#1', title: '', weight: null }],
      lastId: 1,
    };
  };

  const addOption = () => {
    state.value.lastId += 1;
    const newId = `#${state.value.lastId}`;

    state.value.list = [...state.value.list, { id: newId, title: '', weight: null }];
  };

  const removeOption = (id: string) => {
    state.value.list = state.value.list.filter((item) => item.id !== id);
  };

  const updateOption = (id: string, data: Partial<ListItem>) => {
    const index = state.value.list.findIndex((item) => item.id === id);

    if (index !== -1) {
      state.value.list[index] = { ...state.value.list[index], ...data };
    }
  };

  const clearList = () => {
    state.value = {
      list: [{ id: '#1', title: '', weight: null }],
      lastId: 1,
    };
  };

  watch(
    state,
    (newVal) => {
      localStorage.setItem('option-list', JSON.stringify(newVal));
    },
    { deep: true },
  );

  return { state, init, addOption, removeOption, updateOption, clearList };
});
