import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SoundState = {
  isMuted: boolean;
  toggleMute: () => void;
  setMute: (muted: boolean) => void;
};

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      isMuted: false,
      toggleMute: (): void => set((state) => ({ isMuted: !state.isMuted })),
      setMute: (muted): void => set({ isMuted: muted }),
    }),
    {
      name: 'sound-settings',
    },
  ),
);
