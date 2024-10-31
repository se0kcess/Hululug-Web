import theme from '@/styles/theme';
import { Title2 } from '@/styles/Typography';
import styled from '@emotion/styled';

const IntroCon = styled.div`
  width: 100%;
`;

const IntroTitle = styled(Title2)`
  color: ${theme.colors.black};
  margin: 0;
  margin-bottom: 12px;
`;

const IntroInputStyle = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 12px 16px;
  color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  line-height: 1.5;
  vertical-align: top;

  &::placeholder {
    color: ${theme.colors.gray[200]};
  }
`;

const RecipeIntroInput = () => {
  return (
    <IntroCon>
      <IntroTitle>레시피 소개</IntroTitle>
      <IntroInputStyle placeholder="간단한 레시피 소개를 입력해주세요." />
    </IntroCon>
  );
};

export default RecipeIntroInput;
