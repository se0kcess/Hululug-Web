import { useState } from 'react';
import styled from '@emotion/styled';
import { useRamenFilterStore } from '@/store/filterStore';
import { useSortStore } from '@/store/filterStore';
import { SORT_OPTIONS, SortOption } from '@/types/sort';
import theme from '@/styles/theme';
import { ArrowDown } from '@/assets/icons/ArrowDown';
import tagMapping from '@/constants/ramenTagMapping';

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  border-radius: 24px;
  border: 1px solid
    ${({ isActive, theme }) => (isActive ? theme.colors.primaryMain : theme.colors.gray[200])};
  background: ${theme.colors.white};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.primaryMain : theme.colors.gray[500])};
  font-size: ${theme.typography.chip.size};
  font-weight: ${theme.typography.chip.weight};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
`;

const StyledArrowDown = styled(ArrowDown)<{ isActive?: boolean }>`
  margin-left: 0.25rem;
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease-in-out;
  transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0)')};
  color: currentColor;
`;

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 1rem 1rem 0 0;
  padding: 1.5rem;
  max-height: 80vh;
  overflow-y: auto;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled.button<{ isSelected: boolean }>`
  padding: 1rem;
  text-align: left;
  background: none;
  border: none;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primaryMain : theme.colors.black)};
  font-weight: ${({ isSelected }) => (isSelected ? '600' : '400')};
  cursor: pointer;
`;

interface FilterButtonsProps {
  onTagSelect: (tagId: string | undefined) => void;
  onSortChange: (sort: 'newest' | 'popular' | 'oldest') => void;
}

export const RamenFilterButton = ({
  onTagSelect,
}: {
  onTagSelect: (tagId: string | undefined) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tagId = useRamenFilterStore((state) => state.tagId);
  const setTagId = useRamenFilterStore((state) => state.setTagId);

  const handleSelect = (id: string | undefined) => {
    setTagId(id);
    onTagSelect(id);
    setIsModalOpen(false);
  };
  return (
    <>
      <FilterButton isActive={!!tagId} onClick={() => setIsModalOpen(true)}>
        {tagId ? tagMapping[tagId] : '라면 종류'}
        <StyledArrowDown isActive={isModalOpen} />
      </FilterButton>

      <Modal isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <OptionsList>
            <Option isSelected={!tagId} onClick={() => handleSelect(undefined)}>
              전체
            </Option>
            {Object.entries(tagMapping).map(([id, name]) => (
              <Option key={id} isSelected={tagId === id} onClick={() => handleSelect(id)}>
                {name}
              </Option>
            ))}
          </OptionsList>
        </ModalContent>
      </Modal>
    </>
  );
};

export const SortButton = ({ onSortChange }: { onSortChange: (sort: SortOption) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sort = useSortStore((state) => state.sort);
  const setSort = useSortStore((state) => state.setSort);

  const handleSelect = (newSort: SortOption) => {
    setSort(newSort);
    onSortChange(newSort);
    setIsModalOpen(false);
  };

  const currentSortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label;

  return (
    <>
      <FilterButton isActive={sort !== 'newest'} onClick={() => setIsModalOpen(true)}>
        {currentSortLabel}
        <StyledArrowDown isActive={isModalOpen} />
      </FilterButton>

      <Modal isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <OptionsList>
            {SORT_OPTIONS.map((option) => (
              <Option
                key={option.value}
                isSelected={sort === option.value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </Option>
            ))}
          </OptionsList>
        </ModalContent>
      </Modal>
    </>
  );
};

export const FilterButtons = ({ onTagSelect, onSortChange }: FilterButtonsProps) => {
  return (
    <ButtonsContainer>
      <RamenFilterButton onTagSelect={onTagSelect} />
      <SortButton onSortChange={onSortChange} />
    </ButtonsContainer>
  );
};
