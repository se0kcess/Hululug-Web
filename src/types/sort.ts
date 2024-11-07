export const SORT_OPTIONS = [
  { label: '최신순', value: 'newest' },
  { label: '인기순', value: 'popular' },
  { label: '오래된순', value: 'oldest' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];
