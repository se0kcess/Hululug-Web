import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText } from '@/styles/Typography';
import ArrowRight from '@/assets/icons/ArrowRight';
import { useEffect, useRef, useState } from 'react';

interface MyPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.backdrop.default};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled.div<{ translateY: number }>`
  background: ${theme.colors.white};
  width: 100%;
  max-width: 430px;
  border-radius: 20px 20px 0 0;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: translateY(${(props) => props.translateY}%);
  transition: transform 0.3s ease-in-out;
  touch-action: none;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 2.25rem;
    height: 0.25rem;
    background-color: ${theme.colors.gray[200]};
    border-radius: 2px;
  }
`;

const MenuButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease-in-out;

  &:active {
    background-color: ${theme.colors.gray[50]};
  }
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MyPageModal = ({ isOpen, onClose, onLogout }: MyPageModalProps) => {
  const navigate = useNavigate();
  const [translateY, setTranslateY] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const currentTranslateY = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTranslateY(0);
      document.body.style.overflow = 'hidden';
    } else {
      setTranslateY(100);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragStartY.current = touch.clientY;
    currentTranslateY.current = translateY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const diff = touch.clientY - dragStartY.current;
    const newTranslateY = Math.max(0, (diff / window.innerHeight) * 100);
    setTranslateY(newTranslateY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (translateY > 25) {
      onClose();
    } else {
      setTranslateY(0);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
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

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent
        ref={modalRef}
        translateY={translateY}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
      </ModalContent>
    </ModalOverlay>
  );
};

export default MyPageModal;
