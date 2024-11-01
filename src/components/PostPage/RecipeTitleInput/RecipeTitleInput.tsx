import theme from '@/styles/theme';
import { Title2 } from '@/styles/Typography';
import styled from '@emotion/styled';

const TitleCon = styled.div`
  width: 100%;
  margin: 24px;
`;

const RecipeTitle = styled(Title2)`
  color: ${theme.colors.black};
  margin: 0;
  margin-bottom: 12px;
`;

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

interface RecipeTitleInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RecipeTitleInput = ({
  placeholder = '제목을 입력하세요',
  value,
  onChange,
}: RecipeTitleInputProps) => {
  return (
    <TitleCon>
      <RecipeTitle>레시피 제목</RecipeTitle>
      <TitleInputStyle placeholder={placeholder} value={value} onChange={onChange} />
    </TitleCon>
  );
};

export default RecipeTitleInput;
