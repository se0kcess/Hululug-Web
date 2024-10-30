import { create } from 'zustand';
import { SortOption } from '@/types/sort';

interface SortState {
  currentSort: SortOption;
  setSort: (sort: SortOption) => void;
}

export const useSortStore = create<SortState>((set) => ({
  currentSort: 'latest',
  setSort: (sort) => set({ currentSort: sort }),
}));
