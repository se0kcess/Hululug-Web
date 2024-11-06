import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/axios';
import { RamenAPIResponse, RamenId } from '@/constants/ramenWorldCupList';

export const useRamenQuery = () => {
  const queryClient = useQueryClient();

  const getRamenList = useQuery<RamenAPIResponse>({
    queryKey: ['ramenList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/events/worldcup/ramen');
      return data;
    },
  });

  const updateWinnerCount = useMutation({
    mutationFn: async (ramenId: RamenId) => {
      const { data } = await axiosInstance.patch('/events/worldcup/ramen', {
        ramen_id: ramenId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ramenList'] });
    },
  });

  return {
    getRamenList,
    updateWinnerCount,
  };
};
