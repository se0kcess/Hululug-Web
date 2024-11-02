import { create } from 'zustand';

interface BookmarkState {
  bookmarkedRecipes: string[];
  toggleBookmark: (recipeId: string) => void;
  clearBookmarks: () => void;
}

const useBookmarkStore = create<BookmarkState>()((set) => ({
  bookmarkedRecipes: [],
  toggleBookmark: (recipeId) =>
    set((state) => ({
      bookmarkedRecipes: state.bookmarkedRecipes.includes(recipeId)
        ? state.bookmarkedRecipes.filter((id) => id !== recipeId)
        : [...state.bookmarkedRecipes, recipeId],
    })),
  clearBookmarks: () => set({ bookmarkedRecipes: [] }),
}));

export default useBookmarkStore;
