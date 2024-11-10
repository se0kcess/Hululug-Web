// hooks/useLike.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { likeApi } from '@/api/likes';
import useLikeStore from '@/store/likeStore';

export const LIKE_QUERY_KEY = {
  all: ['likes'] as const,
  detail: (recipeId: string) => ['likes', recipeId] as const,
};

export const useLike = (recipeId: string, initialLikes: number) => {
  const queryClient = useQueryClient();
  const { activeLikes, toggleLike } = useLikeStore();
  const isLiked = activeLikes.has(recipeId);

  // 현재 좋아요 수 조회
  const { data: likeCount } = useQuery({
    queryKey: LIKE_QUERY_KEY.detail(recipeId),
    initialData: initialLikes,
    staleTime: 1000 * 5, // 5초
  });

  // 좋아요 토글 뮤테이션
  const toggleLikeMutation = useMutation({
    mutationFn: () => likeApi.toggleLike(recipeId, isLiked ? 'remove' : 'add'),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: LIKE_QUERY_KEY.detail(recipeId),
      });

      const previousLikes = queryClient.getQueryData<number>(LIKE_QUERY_KEY.detail(recipeId));

      // UI 즉시 업데이트
      queryClient.setQueryData(
        LIKE_QUERY_KEY.detail(recipeId),
        (old: number = initialLikes) => old + (isLiked ? -1 : 1),
      );

      // 로컬 상태도 즉시 업데이트
      toggleLike(recipeId);

      return { previousLikes };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        LIKE_QUERY_KEY.detail(recipeId),
        context?.previousLikes ?? initialLikes,
      );
      // 로컬 상태도 롤백
      toggleLike(recipeId);
    },

    onSettled: (data) => {
      if (data) {
        queryClient.setQueryData(LIKE_QUERY_KEY.detail(recipeId), data.data.likes);
      }
    },
  });

  return {
    likeCount: likeCount ?? initialLikes,
    isLiked,
    toggleLike: () => toggleLikeMutation.mutate(),
    isLoading: toggleLikeMutation.isPending,
  };
};
