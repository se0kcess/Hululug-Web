import { create } from 'zustand';

interface User {
  _id: string;
  email: string;
  nickname: string;
  introduce: string;
  profile_image: string;
  is_deleted: boolean;
  bookmark: string[];
  my_recipes: string[];
  my_comments: string[];
  likes: string[];
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  updateUserField: (field: keyof User, value: any) => void;
  addBookmark: (recipeId: string) => void;
  removeBookmark: (recipeId: string) => void;
  addRecipe: (recipeId: string) => void;
  removeRecipe: (recipeId: string) => void;
  addComment: (commentId: string) => void;
  removeComment: (commentId: string) => void;
  addLike: (recipeId: string) => void;
  removeLike: (recipeId: string) => void;
}

export const useUserTestStore = create<UserStore>((set) => ({
  // 기본 예시 데이터 설정
  user: {
    _id: '67270b0542a7d479b161b3c8',
    email: 'hululug@naver.com',
    nickname: '백종원',
    introduce: '라면왕이 될거야',
    profile_image:
      'https://dr4twgka8dxga.cloudfront.net/profile/3ed5d0f311178bec20bb5263c42b81f3954ace60c6e718b10c84507d8d0ade04',
    is_deleted: false,
    bookmark: ['672743a575e46d70c1d79e46'],
    my_recipes: ['672743a575e46d70c1d79e46', '672b22ac7f67b3749ece8df4'],
    my_comments: [
      '67279def3e8a1df9c86b7283',
      '6726817e1a2c09b8d0f04912',
      '67269700501d947fa34d03d5',
    ],
    likes: ['672743a575e46d70c1d79e46'],
  },

  setUser: (user) => set({ user }),

  updateUserField: (field, value) =>
    set((state) => ({
      user: state.user ? { ...state.user, [field]: value } : null,
    })),

  addBookmark: (recipeId) =>
    set((state) => ({
      user: state.user ? { ...state.user, bookmark: [...state.user.bookmark, recipeId] } : null,
    })),

  removeBookmark: (recipeId) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, bookmark: state.user.bookmark.filter((id) => id !== recipeId) }
        : null,
    })),

  addRecipe: (recipeId) =>
    set((state) => ({
      user: state.user ? { ...state.user, my_recipes: [...state.user.my_recipes, recipeId] } : null,
    })),

  removeRecipe: (recipeId) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, my_recipes: state.user.my_recipes.filter((id) => id !== recipeId) }
        : null,
    })),

  addComment: (commentId) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, my_comments: [...state.user.my_comments, commentId] }
        : null,
    })),

  removeComment: (commentId) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, my_comments: state.user.my_comments.filter((id) => id !== commentId) }
        : null,
    })),

  addLike: (recipeId) =>
    set((state) => ({
      user: state.user ? { ...state.user, likes: [...state.user.likes, recipeId] } : null,
    })),

  removeLike: (recipeId) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, likes: state.user.likes.filter((id) => id !== recipeId) }
        : null,
    })),
}));
