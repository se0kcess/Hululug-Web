export type RamenRecipeType = {
  id: string;
  name: string;
};
export interface RamenRecipe {
  _id: string;
  recipe_id: string;
  title: string;
  thumbnail: string;
  tags: string[];
  likes: number;
  created_at: string;
  writer: {
    nickname: string;
    profile_image: string;
  };
}
