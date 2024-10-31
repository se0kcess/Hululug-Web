import theme from '@/styles/theme';
import styled from '@emotion/styled';

const TitleInputStyle = styled.input`
  width: 100%;
  height: 44px;
  padding: 8px 16px;
  color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: ${theme.colors.gray[200]};
  }
`;

const RecipeTitleInput = ({ placeholder = '제목을 입력하세요' }) => {
  return <TitleInputStyle placeholder={placeholder} />;
};

export default RecipeTitleInput;
