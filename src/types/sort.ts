export type SortOption = 'latest' | 'popular' | 'oldest';

export interface SortOptionType {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortOptionType[] = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'oldest', label: '오래된순' },
];
