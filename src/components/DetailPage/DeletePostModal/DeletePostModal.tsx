import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { ButtonText, Title2 } from '@/styles/Typography';

interface DeletePostModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's above other elements */
`;

const ModalContainer = styled.div`
  width: 327px;
  height: 135px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${theme.colors.white};
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Message = styled(Title2)`
  color: ${theme.colors.black};
  margin: 0;
  margin-bottom: 24px;
  padding: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 40px;
  gap: 12px;
`;

const Button = styled(ButtonText)<{ primary?: boolean }>`
  width: 100px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: ${(props) => (props.primary ? 'none' : `1px solid ${theme.colors.primaryMain}`)};
  background-color: ${(props) => (props.primary ? theme.colors.primaryMain : 'transparent')};
  color: ${(props) => (props.primary ? theme.colors.white : theme.colors.primaryMain)};

  &:active {
    background-color: ${(props) =>
      props.primary ? theme.colors.primaryDark : theme.colors.primaryPastel};
  }
`;

const DeletePostModal = ({ onCancel, onDelete }: DeletePostModalProps) => {
  return (
    <Overlay>
      <ModalContainer>
        <Message>게시글을 삭제하시겠습니까?</Message>
        <ButtonGroup>
          <Button onClick={onCancel}>취소</Button>
          <Button primary onClick={onDelete}>
            삭제
          </Button>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default DeletePostModal;
