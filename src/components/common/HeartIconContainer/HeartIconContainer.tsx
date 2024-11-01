import styled from '@emotion/styled';
import { CaptionText } from '@/styles/Typography';
import { HeartFill } from '@/assets/icons/HeartFill';
import { HeartOutline } from '@/assets/icons/HeartOutline';
import useLikeStore from '@/store/likeStore';
import theme from '@/styles/theme';

interface HeartIconContainerProps {
  initialLikes: number;
  recipeId: string;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  likeCountColor?: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;

interface IconWrapperProps {
  isActive: string;
  size: number;
  activeColor: string;
  inactiveColor: string;
}

const IconWrapper = styled.div<IconWrapperProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;
  transition: all 0.2s ease-in-out;
  color: ${({ isActive, activeColor, inactiveColor }) =>
    isActive === 'true' ? activeColor : inactiveColor};

  &:hover {
    color: ${({ activeColor }) => activeColor};
  }
`;

const StyledLikeCount = styled(CaptionText)<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  min-width: 1rem;
`;

export const HeartIconContainer = ({
  initialLikes,
  recipeId,
  size = 20,
  activeColor = theme.colors.gray[200],
  inactiveColor = theme.colors.gray[200],
  likeCountColor = theme.colors.gray[200],
}: HeartIconContainerProps) => {
  const { toggleLike, activeLikes, getLikeCount } = useLikeStore();

  const isActive = activeLikes.has(recipeId);
  const currentLikes = getLikeCount(recipeId, initialLikes);

  const handleLikeClick = () => {
    toggleLike(recipeId, initialLikes);
  };

  return (
    <Container onClick={handleLikeClick}>
      <IconWrapper
        isActive={isActive.toString()}
        size={size}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
      >
        {isActive ? <HeartFill /> : <HeartOutline />}
      </IconWrapper>
      <StyledLikeCount textColor={likeCountColor}>{currentLikes.toLocaleString()}</StyledLikeCount>
    </Container>
  );
};
