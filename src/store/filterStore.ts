import { create } from 'zustand';
import { SortOption } from '@/types/sort';

interface FilterState {
  tagId: string | undefined;
  sort: SortOption;
  setTagId: (id: string | undefined) => void;
  setSort: (sort: SortOption) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  tagId: undefined,
  sort: 'newest',
  setTagId: (tagId) => set({ tagId }),
  setSort: (sort) => set({ sort }),
}));
