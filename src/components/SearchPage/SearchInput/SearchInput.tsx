import React, { useState } from 'react';
import styled from '@emotion/styled';
import Search from '@/assets/icons/Search';
import Clear from '@/assets/icons/Clear';
import theme from '@/styles/theme';
import SearchDefault from '@/assets/images/SearchDefault';
import EmptySearchIcon from '@/assets/images/EmptySearch';
import { BodyText, Title2 } from '@/styles/Typography';
import { RamenType } from '@/types/ramen'; // RamenType 임포트
import RamenList from '@/components/common/RamenList/RamenList';

// RamenRecipe 타입 정의
interface RamenRecipe {
  id: string;
  title: string;
  author: string;
  authorImage: string;
  likes: number;
  date: string;
  image: string;
  ramenType: RamenType;
  bookmarkId: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RamenRecipe[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value === '') {
      setResults([]);
    } else if (value === '라') {
      setResults([
        {
          id: '1',
          title: '라면1',
          author: '작성자1',
          authorImage: '/path/to/image1.jpg',
          likes: 100,
          date: '2024-11-04',
          image: '/path/to/ramen1.jpg',
          ramenType: { id: 1, name: 'Spicy' }, // 예제 RamenType 사용
          bookmarkId: 'bookmark1',
        },
        {
          id: '2',
          title: '라면2',
          author: '작성자2',
          authorImage: '/path/to/image2.jpg',
          likes: 200,
          date: '2024-11-04',
          image: '/path/to/ramen2.jpg',
          ramenType: { id: 2, name: 'Mild' }, // 예제 RamenType 사용
          bookmarkId: 'bookmark2',
        },
      ]);
    } else if (value === '토마토') {
      setResults([]);
    }
  };

  const handleClearClick = () => {
    setQuery('');
    setResults([]);
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
      {query && results.length === 0 && (
        <SearchResults>
          <EmptySearchIcon />
          <TitleCon>
            <SearchTitle>검색 결과가 없습니다</SearchTitle>
            <SearchSubTitle>다른 이름으로 검색해보세요</SearchSubTitle>
          </TitleCon>
        </SearchResults>
      )}
      {results.length > 0 && (
        <RamenList
          recipes={results}
          onRecipeClick={(id) => {
            console.log(`Recipe clicked: ${id}`);
          }}
        />
      )}
    </Container>
  );
};

export default SearchInput;
