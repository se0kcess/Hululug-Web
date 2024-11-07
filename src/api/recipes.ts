import { axiosInstance } from '@/utils/axios';

export const getRecipes = async (params: {
  sort?: 'newest' | 'popular' | 'oldest';
  tag?: string;
  limit?: number;
  cursor?: string;
}) => {
  const response = await axiosInstance.get<RecipeResponse>('/recipes', { params });
  return response.data;
};
