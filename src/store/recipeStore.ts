import { create } from 'zustand';

export type RamenType = {
  id: number;
  name: string;
};

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeState {
  activeTab: string; // 현재 활성화된 탭
  thumbnail: string; // 업로드된 이미지 (Base64 또는 URL)
  title: string; // 레시피 제목
  intro: string; // 레시피 소개
  ramenSelected: boolean; // 라면 종류가 선택되었는지 여부
  selectedRamen: RamenType[]; // 선택된 라면 종류 배열
  ingredientsFilled: boolean; // 재료가 모두 채워졌는지 여부
  steps: string[]; // 요리 단계
  ingredients: Ingredient[]; // 재료 리스트

  setActiveTab: (tab: string) => void; // 탭 변경
  setThumbnail: (thumbnail: string) => void; // 썸네일 이미지 설정
  setTitle: (title: string) => void; // 제목 설정
  setIntro: (intro: string) => void; // 소개 설정
  setRamenSelected: (ramenSelected: boolean) => void; // 라면 선택 여부 설정
  setSelectedRamen: (ramen: RamenType[]) => void; // 선택된 라면 설정
  setIngredientsFilled: (ingredientsFilled: boolean) => void; // 재료가 모두 채워졌는지 여부 설정
  setStep: (index: number, value: string) => void; // 특정 요리 단계 업데이트
  addStep: () => void; // 요리 단계 추가
  addIngredient: () => void; // 재료 추가
  updateIngredient: (index: number, ingredient: Partial<Ingredient>) => void; // 특정 재료 업데이트
}

const useRecipeStore = create<RecipeState>((set) => ({
  activeTab: '레시피 소개',
  thumbnail: '', // 초기 썸네일 값
  title: '',
  intro: '',
  ramenSelected: false,
  selectedRamen: [], // 초기 라면 선택 값
  ingredientsFilled: false,
  steps: [''],
  ingredients: [{ name: '', quantity: '' }], // 초기 재료 값

  setActiveTab: (tab) => set({ activeTab: tab }),
  setThumbnail: (thumbnail) => set({ thumbnail }), // 썸네일 설정 액션
  setTitle: (title) => set({ title }),
  setIntro: (intro) => set({ intro }),
  setRamenSelected: (ramenSelected) => set({ ramenSelected }),
  setSelectedRamen: (ramen) => set({ selectedRamen: ramen }), // 라면 선택 설정
  setIngredientsFilled: (ingredientsFilled) => set({ ingredientsFilled }),
  setStep: (index, value) =>
    set((state) => {
      const updatedSteps = [...state.steps];
      updatedSteps[index] = value;
      return { steps: updatedSteps };
    }),
  addStep: () => set((state) => ({ steps: [...state.steps, ''] })), // 요리 단계 추가

  addIngredient: () =>
    set((state) => ({ ingredients: [...state.ingredients, { name: '', quantity: '' }] })), // 재료 추가
  updateIngredient: (index, ingredient) =>
    set((state) => {
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], ...ingredient };
      return { ingredients: updatedIngredients };
    }),
}));

export default useRecipeStore;
