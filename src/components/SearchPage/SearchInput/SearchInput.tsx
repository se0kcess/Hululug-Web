import React from 'react';
import styled from '@emotion/styled';
import Search from '@/assets/icons/Search';
import Clear from '@/assets/icons/Clear';
import theme from '@/styles/theme';
import SearchDefault from '@/assets/images/SearchDefault';
import EmptySearchIcon from '@/assets/images/EmptySearch';
import { BodyText, Title2 } from '@/styles/Typography';

// import RamenList from '@/components/common/RamenList/RamenList';
import SearchRamenList from '@/components/SearchPage/SearchRamenList';
import useSearchStore from '@/store/searchStore';
import { useSearchRecipes } from '@/hooks/useSearchRecipes';
// import { RamenRecipe } from '@/types/ramenRecipe';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow-y: auto;
  box-sizing: border-box;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  background-color: ${theme.colors.gray[50]};
  border-radius: 8px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  height: 26px;
  padding: 0;
  border: none;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.typography.body.size};
  line-height: ${theme.typography.body.lineHeight};
  font-weight: ${theme.typography.body.weight};
  background-color: transparent;
  outline: none;

  &:focus {
    color: ${theme.colors.gray[700]};
  }
`;

const ClearBtn = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;

  &:disabled {
    visibility: hidden;
  }
`;

const SearchResults = styled.div`
  flex: 1;
  display: flex;
  margin-top: 200px;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
`;

const TitleCon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchTitle = styled(Title2)`
  color: ${theme.colors.gray[700]};
  margin: 0;
  margin-top: 16px;
`;

const SearchSubTitle = styled(BodyText)`
  color: ${theme.colors.gray[500]};
  margin: 0;
  margin-top: 8px;
`;

const SearchInput = () => {
  const { query, setQuery } = useSearchStore();
  const { data: recipes = [], isLoading } = useSearchRecipes();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClearClick = () => {
    setQuery('');
  };

  return (
    <Container>
      <SearchContainer>
        <Search color={theme.colors.gray[500]} />
        <Input
          type="text"
          placeholder="레시피 이름으로 검색"
          value={query}
          onChange={handleInputChange}
        />
        <ClearBtn onClick={handleClearClick} disabled={!query}>
          <Clear fill={theme.colors.gray[500]} />
        </ClearBtn>
      </SearchContainer>
      {!query && (
        <SearchResults>
          <SearchDefault />
          <SearchTitle>레시피를 검색해보세요</SearchTitle>
        </SearchResults>
      )}
      {query && !isLoading && recipes.length === 0 && (
        <SearchResults>
          <EmptySearchIcon />
          <TitleCon>
            <SearchTitle>검색 결과가 없습니다</SearchTitle>
            <SearchSubTitle>다른 이름으로 검색해보세요</SearchSubTitle>
          </TitleCon>
        </SearchResults>
      )}
      {recipes.length > 0 && (
        <SearchRamenList
          recipes={recipes}
          onRecipeClick={(id) => {
            console.log(`Recipe clicked: ${id}`);
          }}
        />
      )}
    </Container>
  );
};

export default SearchInput;
