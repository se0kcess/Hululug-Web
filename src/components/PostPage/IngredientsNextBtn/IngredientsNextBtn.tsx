import styled from '@emotion/styled';
import theme from '@/styles/theme';

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PrevButton = styled.button`
  flex: 1;
  height: 48px;
  border: 1px solid ${theme.colors.primaryMain};
  border-radius: 12px;
  background-color: white;
  color: ${theme.colors.primaryMain};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const NextButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 12px;
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.primaryMain : theme.colors.gray[100]};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: background-color 0.3s;
`;

interface IngredientsNextBtnProps {
  isActive: boolean;
  onPrevClick?: () => void;
  onNextClick?: () => void;
}

const IngredientsNextBtn = ({ isActive, onPrevClick, onNextClick }: IngredientsNextBtnProps) => {
  return (
    <ButtonContainer>
      <PrevButton onClick={onPrevClick}>이전</PrevButton>
      <NextButton
        isActive={isActive}
        onClick={isActive ? onNextClick : undefined} // 비활성화 상태에서는 클릭 이벤트 없음
      >
        다음
      </NextButton>
    </ButtonContainer>
  );
};

export default IngredientsNextBtn;
