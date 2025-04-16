import { create } from 'zustand';
import type { Option } from '../types/types';

interface WheelState {
  isSpinning: boolean;
  duration: number;
  selectedOption: Option | null;
  selectedBgColor: string;
  selectedTextColor: string;
  startSpin: () => void;
  stopSpin: () => void;
  setDuration: (duration: number) => void;
  setWinner: (option: Option | null, color: string) => void;
}

export const useWheelStore = create<WheelState>((set) => ({
  isSpinning: false,
  duration: 5,
  selectedOption: null,
  selectedBgColor: '#383838',
  selectedTextColor: '#E8E8E8',
  startSpin: (): void => set({ isSpinning: true }),
  stopSpin: (): void => set({ isSpinning: false }),
  setDuration: (duration: number): void => set({ duration: Math.max(3, Math.min(30, duration)) }),
  setWinner: (selectedOption: Option | null, selectedBgColor: string): void =>
    set({
      selectedOption,
      selectedBgColor,
      selectedTextColor: 'white',
    }),
}));
