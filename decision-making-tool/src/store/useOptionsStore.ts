import { create } from 'zustand';
import type { Option, OptionsList } from '../types/types';
import { persist } from 'zustand/middleware';
import { assert } from '../utils/typeProtection';

interface OptionsState {
  list: Option[];
  lastId: number;
  addOption: () => void;
  updateOption: (id: string, title: string, weight: number | null) => void;
  removeOption: (id: string) => void;
  clearList: () => void;
  downloadListJson: () => void;
  uploadListFromJson: () => void;
  setOptionsFromText: (data: { list: Option[]; lastId: number }) => void;
}

const INITIAL_STATE = {
  list: [{ id: '#1', title: '', weight: null }],
  lastId: 1,
};

function isStoredData(data: unknown): data is OptionsList {
  return (
    typeof data === 'object' &&
    data !== null &&
    'list' in data &&
    'lastId' in data &&
    Array.isArray(data.list) &&
    typeof data.lastId === 'number'
  );
}

function isOptionArray(items: unknown[]): items is Option[] {
  return items.every(
    (item): item is Option =>
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'title' in item &&
      'weight' in item,
  );
}

export const useOptionsStore = create<OptionsState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      addOption: (): void => {
        set((state) => ({
          list: [...state.list, { id: `#${state.lastId + 1}`, title: '', weight: null }],
          lastId: state.lastId + 1,
        }));
      },
      updateOption: (id, title, weight): void =>
        set((state) => ({
          list: state.list.map((opt) => (opt.id === id ? { ...opt, title, weight } : opt)),
        })),
      removeOption: (id): void =>
        set((state) => {
          const newList = state.list.filter((opt) => opt.id !== id);

          if (newList.length === 0) {
            return INITIAL_STATE;
          }

          return { list: newList };
        }),
      clearList: (): void => set(INITIAL_STATE),
      downloadListJson: (): void => {
        const state = get();
        const data = {
          list: state.list,
          lastId: state.lastId,
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'option-list.json';
        a.click();

        URL.revokeObjectURL(url);
      },
      uploadListFromJson: (): void => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (event): void => {
          const target = event.target;
          assert(target instanceof HTMLInputElement, `${target} is not HTMLInputElement`);
          const file = target.files?.[0];

          if (!file) {
            console.error('No file selected');
            return;
          }

          const reader = new FileReader();

          reader.onload = (e): void => {
            try {
              const result = e.target?.result;
              if (typeof result !== 'string') {
                throw new Error('Invalid file format');
              }

              const parsedData: unknown = JSON.parse(result);

              if (!isStoredData(parsedData)) {
                throw new Error('Invalid file structure');
              }

              if (!isOptionArray(parsedData.list)) {
                throw new Error('Invalid data format');
              }

              set({
                list: parsedData.list,
                lastId: parsedData.lastId,
              });
            } catch (error) {
              console.error('Error loading file:', error);
            }
          };

          reader.onerror = (): void => {
            console.error('Error reading file');
          };

          reader.readAsText(file);
        };

        input.click();
      },
      setOptionsFromText: ({ list, lastId }): void => {
        set({
          list: [...list],
          lastId,
        });
      },
    }),
    {
      name: 'option-list',
    },
  ),
);
