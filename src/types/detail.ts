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
  _id: string;
  title: string;
  thumbnail: string;
  tags: string[];
  introduce: string;
  writer: RecipeWriter;
  ingredients: RecipeIngredient[];
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
