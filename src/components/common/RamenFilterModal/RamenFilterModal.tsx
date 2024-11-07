import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { BodyText } from '@/styles/Typography';
import theme from '@/styles/theme';
import tagMapping from '@/constants/ramenTagMapping';

interface RamenFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTagId?: string;
  onSelect: (tagId: string | undefined) => void;
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
  max-height: 80vh;
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
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 2.25rem;
    height: 0.25rem;
    background-color: ${theme.colors.gray[200]};
    border-radius: 2px;
  }
`;

const Header = styled.div`
  text-align: center;
  position: relative;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  padding-bottom: 0.5rem;
`;

const TagContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 0 0.5rem;
  overflow-y: auto;
`;

const TagItem = styled.button<{ isSelected: boolean }>`
  padding: 0.75rem;
  border-radius: 2rem;
  border: 1px solid
    ${({ isSelected, theme }) => (isSelected ? theme.colors.primaryMain : theme.colors.gray[200])};
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primaryPastel : theme.colors.white};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primaryMain : theme.colors.gray[500]};
  font-size: ${theme.typography.body.size};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    border-color: ${theme.colors.primaryMain};
    color: ${theme.colors.primaryMain};
  }
`;

export const RamenFilterModal = ({
  isOpen,
  onClose,
  selectedTagId,
  onSelect,
}: RamenFilterModalProps) => {
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

  const handleTagClick = useCallback(
    (tagId: string | undefined) => {
      onSelect(tagId);
      onClose();
    },
    [onSelect, onClose],
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent
        ref={modalRef}
        translateY={translateY}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Header>
          <BodyText>라면 종류</BodyText>
        </Header>
        <TagContainer>
          <TagItem isSelected={!selectedTagId} onClick={() => handleTagClick(undefined)}>
            전체
          </TagItem>
          {Object.entries(tagMapping).map(([id, name]) => (
            <TagItem key={id} isSelected={selectedTagId === id} onClick={() => handleTagClick(id)}>
              {name}
            </TagItem>
          ))}
        </TagContainer>
      </ModalContent>
    </ModalOverlay>
  );
};
