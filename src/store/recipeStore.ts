// useRecipeStore.ts
import { create } from 'zustand';

export type RamenType = {
  id: string; // 변경된 부분: number에서 string으로 변경
  name: string;
};

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeState {
  activeTab: string;
  thumbnail: string;
  title: string;
  intro: string;
  ramenSelected: boolean;
  selectedRamen: RamenType[];
  ingredientsFilled: boolean;
  steps: string[];
  ingredients: Ingredient[];

  setActiveTab: (tab: string) => void;
  setThumbnail: (thumbnail: string) => void;
  setTitle: (title: string) => void;
  setIntro: (intro: string) => void;
  setRamenSelected: (ramenSelected: boolean) => void;
  setSelectedRamen: (ramen: RamenType[]) => void;
  setIngredientsFilled: (ingredientsFilled: boolean) => void;
  setStep: (index: number, value: string) => void;
  addStep: () => void;
  addIngredient: () => void;
  updateIngredient: (index: number, ingredient: Partial<Ingredient>) => void;
}

const useRecipeStore = create<RecipeState>((set) => ({
  activeTab: '레시피 소개',
  thumbnail: '',
  title: '',
  intro: '',
  ramenSelected: false,
  selectedRamen: [],
  ingredientsFilled: false,
  steps: [''],
  ingredients: [{ name: '', quantity: '' }],

  setActiveTab: (tab) => set({ activeTab: tab }),
  setThumbnail: (thumbnail) => set({ thumbnail }),
  setTitle: (title) => set({ title }),
  setIntro: (intro) => set({ intro }),
  setRamenSelected: (ramenSelected) => set({ ramenSelected }),
  setSelectedRamen: (ramen) => set({ selectedRamen: ramen }),
  setIngredientsFilled: (ingredientsFilled) => set({ ingredientsFilled }),
  setStep: (index, value) =>
    set((state) => {
      const updatedSteps = [...state.steps];
      updatedSteps[index] = value;
      return { steps: updatedSteps };
    }),
  addStep: () => set((state) => ({ steps: [...state.steps, ''] })),
  addIngredient: () =>
    set((state) => ({ ingredients: [...state.ingredients, { name: '', quantity: '' }] })),
  updateIngredient: (index, ingredient) =>
    set((state) => {
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], ...ingredient };
      return { ingredients: updatedIngredients };
    }),
}));

export default useRecipeStore;
