import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText } from '@/styles/Typography';
import ArrowRight from '@/assets/icons/ArrowRight';

interface MyPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: ${theme.backdrop.default};
  z-index: 50;
  touch-action: none;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
`;

const Sheet = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.white};
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 300ms ease-in-out;
`;

const Handle = styled.div`
  width: 3rem;
  height: 0.25rem;
  background-color: ${theme.colors.gray[200]};
  border-radius: 2px;
  margin: 0 auto 1rem;
`;

const MenuButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0;
  border: none;
  background-color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyPageModal = ({ isOpen, onClose, onLogout }: MyPageModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEditProfile = () => {
    navigate('/editprofile');
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
    onClose();
  };

  const handleWithdraw = () => {
    navigate('/withdraw');
    onClose();
  };

  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <Sheet isOpen={isOpen}>
        <Handle />
        <MenuList>
          <MenuButton onClick={handleEditProfile}>
            <BodyText>프로필 수정</BodyText>
            <ArrowRight width={20} height={20} color={theme.colors.gray[500]} />
          </MenuButton>

          <MenuButton onClick={handleLogout}>
            <BodyText>로그아웃</BodyText>
            <ArrowRight width={20} height={20} color={theme.colors.gray[500]} />
          </MenuButton>

          <MenuButton onClick={handleWithdraw}>
            <BodyText>회원 탈퇴</BodyText>
            <ArrowRight width={20} height={20} color={theme.colors.gray[500]} />
          </MenuButton>
        </MenuList>
      </Sheet>
    </Overlay>
  );
};

export default MyPageModal;
