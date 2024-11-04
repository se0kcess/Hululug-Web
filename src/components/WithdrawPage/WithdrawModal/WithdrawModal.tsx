import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { Title2 } from '@/styles/Typography';

const ModalContainer = styled.div`
  width: 100%;
  height: 153px;
  max-width: 400px;
  padding: 32px 24px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  box-sizing: border-box;
`;

const Message = styled(Title2)`
  color: ${theme.colors.black};
  margin: 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 80%;
`;

const CancelButton = styled.button`
  flex: 1;
  height: 48px;
  border: 1px solid ${theme.colors.primaryMain};
  border-radius: 12px;
  background-color: white;
  color: ${theme.colors.primaryMain};
  font-size: 14px;
  font-weight: bold;
  line-height: 1.4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const RegisterButton = styled.button`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 12px;
  background-color: ${theme.colors.primaryMain};
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: bold;
  line-height: 1.4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

interface RegistrationModalProps {
  onCancel: () => void;
  onWithdraw: () => void;
}

const WithdrawModal = ({ onCancel, onWithdraw }: RegistrationModalProps) => {
  return (
    <ModalContainer>
      <Message>정말 탈퇴하시겟습니까?</Message>
      <ButtonContainer>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <RegisterButton onClick={onWithdraw}>탈퇴</RegisterButton>
      </ButtonContainer>
    </ModalContainer>
  );
};

export default WithdrawModal;
