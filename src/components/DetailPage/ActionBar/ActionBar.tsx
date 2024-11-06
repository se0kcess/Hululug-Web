import styled from '@emotion/styled';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';
import { BookmarkButton } from '@/components/common/BookmarkButton/BookmarkButton';
import { ShareButton } from '@/components/DetailPage/ShareButton/ShareButton';
import { CommentIconContainer } from '@/components/DetailPage/CommentIconContainer/CommentIconContainer';
import theme from '@/styles/theme';

interface ActionBarProps {
  likes: number;
  comments: number;
  recipeId: string;
  onLike: () => void;
  onComment: () => void;
  onBookmark: () => void;
  onShare: () => void;
  bookmarkInactiveColor?: string;
  bookmarkActiveColor?: string;
}

const Container = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 16px;
  box-shadow: ${theme.shadows[1]};
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

export const ActionBar = ({
  likes,
  comments,
  recipeId,
  onLike,
  onComment,
  onBookmark,
  onShare,
  bookmarkInactiveColor = theme.colors.gray[500],
  bookmarkActiveColor = theme.colors.primaryMain,
}: ActionBarProps) => {
  return (
    <Container>
      <ActionItem onClick={onLike}>
        <HeartIconContainer
          initialLikes={likes}
          recipeId={recipeId}
          activeColor={theme.colors.primaryMain}
          inactiveColor={theme.colors.gray[500]}
          likeCountColor={theme.colors.gray[500]}
        />
      </ActionItem>

      <ActionItem onClick={onComment}>
        <CommentIconContainer commentCount={comments} showFilledIcon={false} />
      </ActionItem>

      <ActionItem onClick={onBookmark}>
        <BookmarkButton
          recipeId={recipeId}
          size={24}
          onBookmarkChange={onBookmark}
          inactiveColor={bookmarkInactiveColor}
          activeColor={bookmarkActiveColor}
        />
      </ActionItem>

      <ActionItem onClick={onShare}>
        <ShareButton onShare={onShare} />
      </ActionItem>
    </Container>
  );
};
