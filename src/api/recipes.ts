import { axiosInstance } from '@/utils/axios';

interface RecipeResponse {
  status: number;
  message: string;
  data: {
    recipes: Recipe[];
    next_cursor: string | null;
  };
}

interface Recipe {
  _id: string;
  recipe_id: string;
  title: string;
  thumbnail: string;
  tags: string[];
  writer: {
    nickname: string;
    profile_image: string;
  };
  likes: number;
  created_at: string;
}

export const getRecipes = async (params: {
  sort?: 'newest' | 'popular' | 'oldest';
  tag?: string;
  limit?: number;
  cursor?: string;
}) => {
  const response = await axiosInstance.get<RecipeResponse>('/recipes', { params });
  return response.data;
};
