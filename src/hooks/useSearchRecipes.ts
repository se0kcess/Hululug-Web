import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useSearchStore from '@/store/searchStore';
import { RamenRecipe } from '@/types/ramenRecipe';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const fetchRecipes = async (query: string): Promise<RamenRecipe[]> => {
  const { data } = await axios.get(`${BASE_URL}/recipes/search`, {
    params: { keyword: query },
  });
  return data.data.recipes;
};

export const useSearchRecipes = () => {
  const query = useSearchStore((state) => state.query);

  return useQuery<RamenRecipe[]>({
    queryKey: ['recipes', query],
    queryFn: () => fetchRecipes(query),
    enabled: !!query, // query가 있을 때만 fetch
    placeholderData: [], // 기본값으로 빈 배열 설정
  });
};
