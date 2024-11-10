import { RecipeResponse } from '@/types/ramenRecipe';
import { axiosInstance } from '@/utils/axios';
import axios from 'axios';

export const getRecipes = async (params: {
  sort?: 'newest' | 'popular' | 'oldest';
  tag?: string;
  limit?: number;
  cursor?: string;
}) => {
  const response = await axiosInstance.get<RecipeResponse>('/recipes', { params });
  return response.data;
};

export const recipeInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/recipes`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
