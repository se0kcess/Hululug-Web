import { create } from 'zustand';
import { RecipeData } from '@/types/detail';

interface RecipeState {
  recipe: RecipeData | null;
  setRecipe: (recipe: RecipeData) => void;
}

const useRecipeDetailStore = create<RecipeState>((set) => ({
  recipe: null,
  setRecipe: (recipe) => set({ recipe }),
}));

export default useRecipeDetailStore;
