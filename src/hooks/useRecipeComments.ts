import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import apiTest from '@/api/authAPITEST';
import axiosInstance from '@/api/authAPITEST';
import { Comment, CommentsResponse } from '@/types/comment';

const fetchComments = async (recipeId: string): Promise<Comment[]> => {
  console.log('recipeId-useRecipe', recipeId);
  try {
    const response = await axiosInstance.get<CommentsResponse>(`/recipes/${recipeId}/comments`);
    console.log('댓글 응답 데이터:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('댓글 불러오기 실패:', error);
    throw error;
  }
};

const postComment = async ({ recipeId, content }: { recipeId: string; content: string }) => {
  try {
    // 보낼 데이터 및 헤더 로그 확인
    console.log('요청 데이터:', { content });
    console.log('Axios 인스턴스 헤더:', axiosInstance.defaults.headers);

    const response = await axiosInstance.post(`/recipes/${recipeId}/comments`, { content });
    return response.data.data;
  } catch (error) {
    console.error('댓글 등록 실패. 요청 데이터:', { recipeId, content });
    console.error('오류 세부 정보:', error);
    throw error;
  }
};

const updateComment = async ({
  recipeId,
  commentId,
  content,
}: {
  recipeId: string;
  commentId: string;
  content: string;
}) => {
  const response = await axiosInstance.patch(`/recipes/${recipeId}/comments/${commentId}`, {
    content,
  });
  return response.data.data;
};

const deleteComment = async ({ recipeId, commentId }: { recipeId: string; commentId: string }) => {
  console.log('삭제링크' + `/recipes/${recipeId}/comments/${commentId}`);

  const response = await axiosInstance.delete(`/recipes/${recipeId}/comments/${commentId}`);
  console.log('삭제', response);

  return response.data;
};

export const useRecipeComments = (recipeId: string) => {
  const queryClient = useQueryClient();

  // 댓글 조회
  const commentsQuery = useQuery<Comment[]>({
    queryKey: ['recipeComments', recipeId],
    queryFn: () => fetchComments(recipeId),
    enabled: !!recipeId,
  });

  // 댓글 등록
  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipeComments', recipeId] });
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipeComments', recipeId] });
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipeComments', recipeId] });
    },
  });

  return {
    commentsQuery, // 조회
    postCommentMutation, // 등록
    updateCommentMutation, // 수정
    deleteCommentMutation, // 삭제
  };
};
