export interface Recipe {
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

export interface RecipeParams {
  sort?: 'newest' | 'popular' | 'oldest';
  tag?: string;
  limit?: number;
  cursor?: string;
}

export interface RecipeResponse {
  status: number;
  message: string;
  data: {
    recipes: Recipe[];
    next_cursor: string | null;
  };
}
