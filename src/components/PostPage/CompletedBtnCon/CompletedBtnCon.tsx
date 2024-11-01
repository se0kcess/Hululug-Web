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

const CompletedButton = styled.button<{ isActive: boolean }>`
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

const CompletedBtnCon = ({ isActive }: { isActive: boolean }) => {
  return (
    <ButtonContainer>
      <PrevButton>이전</PrevButton>
      <CompletedButton isActive={isActive}>작성완료</CompletedButton>
    </ButtonContainer>
  );
};

export default CompletedBtnCon;
