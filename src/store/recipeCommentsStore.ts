// store/useRecipeCommentsStore.ts
import { create } from 'zustand';
import { Comment } from '@/types/comment';

interface RecipeCommentsState {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  updateComment: (updatedComment: Comment) => void;
  deleteComment: (commentId: string) => void;
}

const useRecipeCommentsStore = create<RecipeCommentsState>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  updateComment: (updatedComment) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment,
      ),
    })),
  deleteComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment._id !== commentId),
    })),
}));

export default useRecipeCommentsStore;
