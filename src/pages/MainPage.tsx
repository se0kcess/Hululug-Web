import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { getRecipes } from '@/api/recipes';
import { useFilterStore } from '@/store/filterStore';
import Footer from '@/components/common/Footer/Footer';
import BannerSlider from '@/components/MainPage/Banner/BannerSlider';
import { FilterButtons } from '@/components/MainPage/FilterButtons/FilterButtons';
import { Title1 } from '@/styles/Typography';
import { SortOption } from '@/types/sort';
import { RamenList } from '@/components/common/RamenList/RamenList';
import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner';
import { HotRecipeCard } from '@/components/MainPage/HotRecipeCard/HotRecipeCard';
import { Header } from '@/components/MainPage/Header/Header';
import { useInView } from 'react-intersection-observer';
import { RamenRecipe } from '@/types/ramenRecipe';

interface RecipeData {
  recipes: RamenRecipe[];
  next_cursor: string | null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding-bottom: 5rem;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
`;

const SectionTitle = styled(Title1)`
  padding: 1rem 0;
`;

const RecipeRow = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0.5rem 0;
`;

const RecipeCard = styled.div`
  flex: 0 0 auto;
  width: calc(70% - 1.2rem);
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.red};
`;

const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primaryMain};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const EndMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export default function MainPage() {
  const navigate = useNavigate();
  const { tagId, sort, setTagId, setSort } = useFilterStore();
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  // 인기 레시피 조회
  const {
    data: hotRecipesData,
    isLoading: isLoadingHot,
    error: hotError,
  } = useQuery({
    queryKey: ['hotRecipes'],
    queryFn: async () => {
      const response = await getRecipes({
        sort: 'popular',
        limit: 3,
      });
      return response.data.recipes;
    },
  });

  // 전체 레시피 무한 스크롤 조회
  const {
    data,
    isLoading: isLoadingAll,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: allError,
  } = useInfiniteQuery<
    RecipeData,
    Error,
    InfiniteData<RecipeData>,
    (string | undefined)[],
    string | undefined
  >({
    queryKey: ['recipes', tagId, sort],
    queryFn: async ({ pageParam }) => {
      const response = await getRecipes({
        sort: sort || 'newest',
        limit: 4,
        ...(tagId && { tag: tagId }),
        cursor: pageParam, // string | undefined 타입
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.next_cursor || undefined,
    initialPageParam: undefined,
  });

  // Intersection Observer로 무한 스크롤 감지
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // 전체 레시피 목록 평탄화
  const allRecipes = data?.pages.flatMap((page) => page.recipes) ?? [];
  const hotRecipes = hotRecipesData ?? [];

  const handleRecipeClick = useCallback(
    (recipeId: string) => {
      navigate(`/details/${recipeId}`);
    },
    [navigate],
  );

  const handleTagSelect = useCallback(
    (newTagId: string | undefined) => {
      setTagId(newTagId);
    },
    [setTagId],
  );

  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      setSort(newSort);
    },
    [setSort],
  );

  if (hotError || allError) {
    return (
      <ErrorContainer>
        <p>{(hotError || (allError as Error))?.message || '오류가 발생했습니다.'}</p>
        <RetryButton onClick={() => window.location.reload()}>다시 시도하기</RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <BannerSlider />

        {/* 인기 레시피 섹션 */}
        <SectionTitle>인기있는 레시피</SectionTitle>
        <RecipeRow>
          {isLoadingHot ? (
            <LoadingContainer>
              <LoadingSpinner />
            </LoadingContainer>
          ) : (
            hotRecipes.map((recipe) => (
              <RecipeCard key={recipe.recipe_id}>
                <HotRecipeCard {...recipe} onClick={() => handleRecipeClick(recipe.recipe_id)} />
              </RecipeCard>
            ))
          )}
        </RecipeRow>

        {/* 전체 레시피 섹션 */}
        <SectionTitle>모든 레시피</SectionTitle>
        <FilterButtons onTagSelect={handleTagSelect} onSortChange={handleSortChange} />

        {isLoadingAll && allRecipes.length === 0 ? (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        ) : (
          <>
            <RamenList recipes={allRecipes} onRecipeClick={handleRecipeClick} />

            <div ref={ref} style={{ height: '20px' }} />

            {isFetchingNextPage && (
              <LoadingContainer>
                <LoadingSpinner />
              </LoadingContainer>
            )}

            {!hasNextPage && allRecipes.length > 0 && (
              <EndMessage>더 이상 불러올 레시피가 없습니다.</EndMessage>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
