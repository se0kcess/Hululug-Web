import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RecipeData, RecipeResponse } from '@/types/detail';

// 레시피 데이터를 가져오는 함수
const fetchRecipeDetail = async (recipeId: string): Promise<RecipeData> => {
  const response = await axios.get<RecipeResponse>(
    `https://hululug-server-dev.up.railway.app/recipes/${recipeId}`,
  );
  return response.data.data;
};

// React Query 훅
export const useRecipeDetail = (recipeId: string) => {
  return useQuery<RecipeData>({
    queryKey: ['recipeDetail', recipeId],
    queryFn: () => fetchRecipeDetail(recipeId),
    enabled: !!recipeId,
  });
};
