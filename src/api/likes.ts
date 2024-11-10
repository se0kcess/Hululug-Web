import { recipeInstance } from '@/api/recipes';

interface LikeResponse {
  status: number;
  message: string;
  data: {
    likes: number;
  };
}

export const likeApi = {
  toggleLike: async (recipeId: string, action: 'add' | 'remove') => {
    const { data } = await recipeInstance.post<LikeResponse>(`/${recipeId}/like`, { action });
    return data;
  },
};
