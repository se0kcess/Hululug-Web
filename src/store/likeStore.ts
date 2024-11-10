import { create } from 'zustand';

interface LikeState {
  activeLikes: Set<string>;
  toggleLike: (recipeId: string) => void;
}

const useLikeStore = create<LikeState>((set) => ({
  activeLikes: new Set(),

  toggleLike: (recipeId: string) => {
    set((state) => {
      const newActiveLikes = new Set(state.activeLikes);

      if (newActiveLikes.has(recipeId)) {
        newActiveLikes.delete(recipeId);
      } else {
        newActiveLikes.add(recipeId);
      }

      return {
        activeLikes: newActiveLikes,
      };
    });
  },
}));

export default useLikeStore;
