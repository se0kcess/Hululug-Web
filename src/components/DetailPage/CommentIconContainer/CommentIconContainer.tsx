import styled from '@emotion/styled';
import { CaptionText } from '@/styles/Typography';
import CommentFill from '@/assets/icons/CommentFill';
import CommentOutline from '@/assets/icons/CommentOutline';
import theme from '@/styles/theme';

interface CommentIconContainerProps {
  commentCount: number;
  showFilledIcon?: boolean; // true일 경우 CommentFill, false일 경우 CommentOutline
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const StyledCommentCount = styled(CaptionText)`
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export const CommentIconContainer = ({
  commentCount,
  showFilledIcon = false,
}: CommentIconContainerProps) => {
  return (
    <Container>
      <IconWrapper>
        {showFilledIcon ? (
          <CommentFill width={24} height={24} color={theme.colors.gray[500]} />
        ) : (
          <CommentOutline width={24} height={24} color={theme.colors.gray[500]} />
        )}
      </IconWrapper>
      <StyledCommentCount>{commentCount.toLocaleString()}</StyledCommentCount>
    </Container>
  );
};
