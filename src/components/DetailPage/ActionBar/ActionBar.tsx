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
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
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
}: ActionBarProps) => {
  return (
    <Container>
      <ActionItem onClick={onLike}>
        <HeartIconContainer initialLikes={likes} recipeId={recipeId} />
      </ActionItem>

      <ActionItem onClick={onComment}>
        <CommentIconContainer commentCount={comments} showFilledIcon={false} />
      </ActionItem>

      <ActionItem onClick={onBookmark}>
        <BookmarkButton recipeId={parseInt(recipeId)} size={24} onBookmarkChange={onBookmark} />
      </ActionItem>

      <ActionItem onClick={onShare}>
        <ShareButton onShare={onShare} />
      </ActionItem>
    </Container>
  );
};
