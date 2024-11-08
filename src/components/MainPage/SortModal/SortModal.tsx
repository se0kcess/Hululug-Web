import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { BodyText } from '@/styles/Typography';
import theme from '@/styles/theme';
import { SORT_OPTIONS, SortOption } from '@/types/sort';
import { useFilterStore } from '@/store/filterStore';

interface SortModalProps {
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
  display: flex;
  flex-direction: column;
  touch-action: none;
  position: relative;
  transform: translateY(${(props) => props.translateY}%);
  transition: transform 0.3s ease-in-out;

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
  padding: 1.5rem 0 0.5rem;
  position: relative;
  border-bottom: 1px solid ${theme.colors.gray[100]};
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Option = styled.button<{ isSelected: boolean }>`
  padding: 1rem 1.25rem;
  background: none;
  border: none;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${theme.typography.body.size};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primaryMain : theme.colors.gray[700]};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:active {
    background-color: ${theme.colors.gray[50]};
  }
`;

const CheckIcon = styled.span`
  color: ${theme.colors.primaryMain};
`;

export const SortModal = ({ isOpen, onClose }: SortModalProps) => {
  const { sort, setSort } = useFilterStore();
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

  const handleOptionClick = useCallback(
    (newSort: SortOption) => {
      setSort(newSort);
      onClose();
    },
    [setSort, onClose],
  );

  return (
    <ModalOverlay isOpen={isOpen} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent
        ref={modalRef}
        translateY={translateY}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Header>
          <BodyText>정렬</BodyText>
        </Header>
        <OptionList>
          {SORT_OPTIONS.map((option) => (
            <Option
              key={option.value}
              isSelected={sort === option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
              {sort === option.value && <CheckIcon>✓</CheckIcon>}
            </Option>
          ))}
        </OptionList>
      </ModalContent>
    </ModalOverlay>
  );
};
