import styled from '@emotion/styled';
import { CaptionText } from '@/styles/Typography';
import CommentFill from '@/assets/icons/CommentFill';
import CommentOutline from '@/assets/icons/CommentOutline';

interface CommentIconContainerProps {
  commentCount: number;
  showFilledIcon?: boolean; // true일 경우 CommentFill, false일 경우 CommentOutline
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const StyledCommentCount = styled(CaptionText)`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 1rem;
`;

export const CommentIconContainer = ({
  commentCount,
  showFilledIcon = false,
}: CommentIconContainerProps) => {
  return (
    <Container>
      <IconWrapper>
        {showFilledIcon ? (
          <CommentFill width={24} height={24} color="currentColor" />
        ) : (
          <CommentOutline width={24} height={24} color="currentColor" />
        )}
      </IconWrapper>
      <StyledCommentCount>{commentCount.toLocaleString()}</StyledCommentCount>
    </Container>
  );
};
