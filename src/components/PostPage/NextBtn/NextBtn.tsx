import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { ButtonText } from '@/styles/Typography';

const Button = styled(ButtonText)<{ isActive: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.primaryMain : theme.colors.gray[100]};
  color: ${theme.colors.white};
  border-radius: 12px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
  transition: background-color 0.3s;
`;

const NextBtn = ({ isActive = true }: { isActive: boolean }) => {
  return <Button isActive={isActive}>다음</Button>;
};

export default NextBtn;
