import styled from '@emotion/styled';
import { BodyText } from '@/styles/Typography';
import theme from '@/styles/theme';
import { SORT_OPTIONS, SortOption } from '@/types/sort';
import { useSortStore } from '@/store/sortStore';

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
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  width: 100%;
  max-width: 430px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    margin-top: 0.5rem;
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
  padding: 0.5rem 0 0 0;
  border-bottom: 1px solid ${theme.colors.gray[100]};
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionItem = styled.button<{ isSelected: boolean }>`
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

  &:active {
    background-color: ${theme.colors.gray[50]};
  }
`;

const CheckIcon = styled.span`
  color: ${theme.colors.primaryMain};
`;

export const SortModal = ({ isOpen, onClose }: SortModalProps) => {
  const { currentSort, setSort } = useSortStore();

  const handleOptionClick = (sort: SortOption) => {
    setSort(sort);
    onClose();
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <ModalContent>
        <Header>
          <BodyText>정렬</BodyText>
        </Header>
        <OptionList>
          {SORT_OPTIONS.map((option) => (
            <OptionItem
              key={option.value}
              isSelected={currentSort === option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
              {currentSort === option.value && <CheckIcon>✓</CheckIcon>}
            </OptionItem>
          ))}
        </OptionList>
      </ModalContent>
    </ModalOverlay>
  );
};
