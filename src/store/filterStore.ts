import { create } from 'zustand';
import { SortOption } from '@/types/sort';

interface RamenFilterState {
  tagId: string | undefined; // null 대신 undefined 사용
  setTagId: (id: string | undefined) => void;
}

interface SortState {
  sort: SortOption;
  setSort: (sort: SortOption) => void;
}

export const useRamenFilterStore = create<RamenFilterState>((set) => ({
  tagId: undefined,
  setTagId: (id) => set({ tagId: id }),
}));

export const useSortStore = create<SortState>((set) => ({
  sort: 'newest',
  setSort: (sort) => set({ sort }),
}));
