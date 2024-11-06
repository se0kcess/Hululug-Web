import styled from '@emotion/styled';
import { Title2 } from '@/styles/Typography';
import theme from '@/styles/theme';
import BackIcon from '@/assets/icons/ArrowLeft';
import { useNavigate } from 'react-router-dom';

const PostHeader = styled(Title2)`
  width: 100%;
  height: 56px;
  color: ${theme.colors.gray[700]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0;
`;

const BackBtn = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  cursor: pointer; // 클릭 가능한 상태로 표시
`;

const PostPageHeader = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // 홈으로 이동
  };

  return (
    <PostHeader>
      <BackBtn onClick={handleBackClick}>
        <BackIcon />
      </BackBtn>
      레시피 작성
    </PostHeader>
  );
};

export default PostPageHeader;
