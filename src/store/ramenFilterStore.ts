import { create } from 'zustand';
import { RamenType } from '@/types/ramen';

interface RamenFilterState {
  selectedRamen: RamenType | null;
  setRamen: (ramen: RamenType | null) => void;
  clearRamen: () => void;
  isSelected: (ramenId: number) => boolean;
}

export const useRamenFilterStore = create<RamenFilterState>((set, get) => ({
  selectedRamen: null,
  setRamen: (ramen) => {
    set({ selectedRamen: ramen });
  },
  clearRamen: () => {
    set({ selectedRamen: null });
  },
  isSelected: (ramenId) => {
    return get().selectedRamen?.id === ramenId;
  },
}));
