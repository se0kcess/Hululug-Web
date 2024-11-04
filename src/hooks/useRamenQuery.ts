import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { RamenAPIResponse, WinnerUpdateResponse } from '@/types/ramenAPI';
import { RamenId } from '@/constants/ramenWorldCupList';

export const useRamenQuery = () => {
  const queryClient = useQueryClient();

  // 라면 목록과 우승 횟수 조회
  const getRamenList = useQuery<RamenAPIResponse>({
    queryKey: ['ramenList'],
    queryFn: async () => {
      const response = await axios.get('/events/worldcup/ramen');
      return response.data;
    },
  });

  // 우승한 라면의 카운트 업데이트
  const updateWinnerCount = useMutation<WinnerUpdateResponse, Error, RamenId>({
    mutationFn: async (ramenId) => {
      const response = await axios.patch('/events/worldcup/ramen', {
        ramen_id: ramenId,
      });
      return response.data;
    },
    onSuccess: () => {
      // 우승 횟수가 업데이트되었으므로 목록 리프레시
      queryClient.invalidateQueries({ queryKey: ['ramenList'] });
    },
  });

  return {
    getRamenList,
    updateWinnerCount,
  };
};
