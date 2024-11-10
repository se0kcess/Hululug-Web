import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { RecipeData, RecipeResponse } from '@/types/detail';

const fetchRecipeDetail = async (recipeId: string): Promise<RecipeData> => {
  const response = await axiosInstance.get<RecipeResponse>(`/recipes/${recipeId}`);
  return response.data.data;
};

export const useRecipeDetail = (recipeId: string) => {
  return useQuery<RecipeData>({
    queryKey: ['recipeDetail', recipeId],
    queryFn: () => fetchRecipeDetail(recipeId),
    enabled: !!recipeId,
    // staleTime 추가
    staleTime: 1000 * 60 * 5, // 5분
  });
};
