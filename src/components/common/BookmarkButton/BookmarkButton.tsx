import styled from '@emotion/styled';
import BookmarkFill from '@assets/icons/BookmarkFill';
import BookmarkOutline from '@assets/icons/BookmarkOutline';
import useBookmarkStore from '@/store/bookmarkStore';
import theme from '@/styles/theme';

interface BookmarkButtonProps {
  recipeId: string;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  onBookmarkChange?: (recipeId: string, isBookmarked: boolean) => void;
}

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0.25rem;

  &:active {
    transform: scale(0.95);
  }
`;

export const BookmarkButton = ({
  recipeId,
  size = 24,
  activeColor = theme.colors.primaryMain,
  inactiveColor = theme.colors.gray[200],
  onBookmarkChange,
}: BookmarkButtonProps) => {
  const bookmarkedRecipes = useBookmarkStore((state) => state.bookmarkedRecipes);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = bookmarkedRecipes.includes(recipeId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleBookmark(recipeId);
    onBookmarkChange?.(recipeId, !isBookmarked);
  };

  return (
    <StyledButton onClick={handleClick} aria-label={isBookmarked ? '북마크 제거' : '북마크 추가'}>
      {isBookmarked ? (
        <BookmarkFill width={size} height={size} color={activeColor} />
      ) : (
        <BookmarkOutline width={size} height={size} color={inactiveColor} />
      )}
    </StyledButton>
  );
};
