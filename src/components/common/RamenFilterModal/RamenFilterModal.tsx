import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { BodyText } from '@/styles/Typography';
import { RAMEN_LIST } from '@/constants/ramenList';
import { useRamenFilterStore } from '@/store/ramenFilterStore';
import theme from '@/styles/theme';
import { RamenTag } from '@/components/common/RamenTag/RamenTag';
import { RamenType } from '@/types/ramen';

interface RamenFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
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
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.5rem;
  overscroll-behavior: contain;
`;

const TagRow = styled.div<{ justify?: string }>`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

const TagWrapper = styled.div<{ isSelected: boolean; itemsInRow: number }>`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  > div {
    width: 100%;
    justify-content: center;
    background: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.primaryPastel : theme.colors.white};
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.primaryMain : theme.colors.gray[500]};
    border: 1px solid
      ${({ isSelected, theme }) => (isSelected ? theme.colors.primaryMain : theme.colors.gray[200])};
  }
`;

const createTagGroups = (ramenList: RamenType[]) => {
  const all = { id: 0, name: '전체' };
  const group1 = ramenList.slice(0, 3);
  const group2 = ramenList.slice(3, 6);
  const group3 = ramenList.slice(6, 9);
  const group4 = ramenList.slice(9, 13);
  const group5 = ramenList.slice(13, 16);
  const group6 = ramenList.slice(16, 20);
  const group7 = ramenList.slice(20, 23);
  const group8 = ramenList.slice(23);

  return [[all, ...group1], group2, group3, group4, group5, group6, group7, group8];
};

export const RamenFilterModal = ({ isOpen, onClose }: RamenFilterModalProps) => {
  const { setRamen, isSelected } = useRamenFilterStore();
  const [translateY, setTranslateY] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const currentTranslateY = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const tagGroups = useMemo(() => createTagGroups(RAMEN_LIST), []);

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

  const handleRamenClick = useCallback(
    (ramen: (typeof RAMEN_LIST)[0]) => {
      if (isSelected(ramen.id)) {
        setRamen(null);
      } else {
        setRamen(ramen);
        onClose();
      }
    },
    [setRamen, isSelected, onClose],
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

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
          {tagGroups.map((group, groupIndex) => (
            <TagRow key={groupIndex}>
              {group.map((ramen) => (
                <TagWrapper
                  key={ramen.id}
                  isSelected={isSelected(ramen.id)}
                  itemsInRow={group.length}
                  onClick={() => handleRamenClick(ramen)}
                >
                  <RamenTag ramen={ramen} />
                </TagWrapper>
              ))}
            </TagRow>
          ))}
        </TagContainer>
      </ModalContent>
    </ModalOverlay>
  );
};
