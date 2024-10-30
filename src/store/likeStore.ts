import { create } from 'zustand';

interface LikeState {
  likes: { [key: string]: number };
  activeLikes: Set<string>;
  toggleLike: (recipeId: string, initialLikes: number) => void;
  getLikeCount: (recipeId: string, initialLikes: number) => number;
}

const useLikeStore = create<LikeState>((set, get) => ({
  likes: {},
  activeLikes: new Set(),

  toggleLike: (recipeId: string, initialLikes: number) => {
    set((state) => {
      const newActiveLikes = new Set(state.activeLikes);
      const newLikes = { ...state.likes };

      const currentLikes = state.likes[recipeId] ?? initialLikes;

      if (newActiveLikes.has(recipeId)) {
        newActiveLikes.delete(recipeId);
        newLikes[recipeId] = currentLikes - 1;
      } else {
        newActiveLikes.add(recipeId);
        newLikes[recipeId] = currentLikes + 1;
      }

      return {
        activeLikes: newActiveLikes,
        likes: newLikes,
      };
    });
  },

  getLikeCount: (recipeId: string, initialLikes: number) => {
    return get().likes[recipeId] ?? initialLikes;
  },
}));

export default useLikeStore;
