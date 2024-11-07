import { create } from 'zustand';
import { RamenType } from '@/types/ramen';

interface RamenFilterState {
  selectedRamen: RamenType | null;
  setRamen: (ramen: RamenType | null) => void;
  clearRamen: () => void;
  isSelected: (ramenId: string) => boolean; // ramenId 타입을 string으로 변경
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
    return get().selectedRamen?.id === ramenId; // string 타입으로 비교
  },
}));
