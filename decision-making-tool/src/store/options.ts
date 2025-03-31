import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { ListItem, OptionList } from '../types/types';
import { assert, checkNullElement } from '../utils/typesProtection';

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

  const downloadListJson = () => {
    const blob: Blob = new Blob([JSON.stringify(state.value, null, 2)], {
      type: 'application/json',
    });

    const url: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = 'option-list.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  const uploadListFromJson = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.addEventListener('change', (event: Event) => {
      const target = event.target;
      assert(target instanceof HTMLInputElement, `${target} is not HTMLInputElement`);
      const file = target.files?.[0];

      if (!file) {
        console.error('There is no file to upload');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        const contentTarget = e.target;
        checkNullElement(contentTarget);

        try {
          if (typeof contentTarget.result !== 'string') {
            throw new Error('File content is not a string');
          }

          const parsedData: unknown = JSON.parse(contentTarget.result);

          if (
            !parsedData ||
            typeof parsedData !== 'object' ||
            !('list' in parsedData) ||
            !('lastId' in parsedData)
          ) {
            throw new Error('Invalid file structure');
          }

          const { list, lastId } = parsedData as OptionList;

          if (
            !Array.isArray(list) ||
            typeof lastId !== 'number' ||
            !list.every((item) => 'id' in item && 'title' in item && 'weight' in item)
          ) {
            throw new Error('Invalid data format');
          }

          state.value = {
            list: [...list],
            lastId,
          };
        } catch (error) {
          console.error('Error parsing file:', error);
        }
      };

      reader.onerror = (): void => {
        console.error('Error reading file');
      };

      reader.readAsText(file);
    });

    input.click();
  };

  watch(
    state,
    (newVal) => {
      localStorage.setItem('option-list', JSON.stringify(newVal));
    },
    { deep: true },
  );

  return {
    state,
    init,
    addOption,
    removeOption,
    updateOption,
    clearList,
    downloadListJson,
    uploadListFromJson,
  };
});
