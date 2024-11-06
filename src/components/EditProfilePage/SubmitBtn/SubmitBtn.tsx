import theme from '@/styles/theme';
import { ButtonText } from '@/styles/Typography';
import styled from '@emotion/styled';

interface ButtonProps {
  backgroundColor?: string;
  onClick: () => void;
}

const Button = styled(ButtonText)<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border-radius: 12px;
  color: ${theme.colors.white};
  background-color: ${(props) => props.backgroundColor || theme.colors.primaryMain};
`;

const SubmitBtn = ({ backgroundColor, onClick }: ButtonProps) => {
  return (
    <Button onClick={onClick} backgroundColor={backgroundColor}>
      수정완료
    </Button>
  );
};

export default SubmitBtn;
