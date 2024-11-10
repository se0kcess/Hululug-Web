export interface RecipeWriter {
  nickname: string;
  introduce: string;
  profile_image: string;
}

export interface RecipeIngredient {
  name: string;
  unit: string;
  _id: string;
}

export interface RecipeData {
  _id: string; // 데이터 고유 ID
  recipe_id: string; // 실제 레시피 ID
  title: string;
  thumbnail: string;
  tags: string[];
  introduce: string;
  writer: {
    nickname: string;
    profile_image: string;
    introduce: string;
  };
  ingredients: {
    name: string;
    unit: string;
    _id: string;
  }[];
  cooking_steps: string[];
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface RecipeResponse {
  status: number;
  message: string;
  data: RecipeData;
}
