import { useState } from 'react';
import styled from '@emotion/styled';
import { useRamenFilterStore } from '@/store/ramenFilterStore';
import { useSortStore } from '@/store/sortStore';
import { SORT_OPTIONS } from '@/types/sort';
import theme from '@/styles/theme';
import { ArrowDown } from '@/assets/icons/ArrowDown';
import { RamenFilterModal } from '@/components/common/RamenFilterModal/RamenFilterModal';
import { SortModal } from '@/components/MainPage/SortModal/SortModal';

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
`;

const FilterButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: 20px;
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

export const RamenFilterButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedRamen = useRamenFilterStore((state) => state.selectedRamen);

  return (
    <>
      <FilterButton isActive={!!selectedRamen} onClick={() => setIsModalOpen(true)}>
        {selectedRamen ? selectedRamen.name : '라면 종류'}
        <StyledArrowDown isActive={isModalOpen} />
      </FilterButton>

      <RamenFilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export const SortButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentSort = useSortStore((state) => state.currentSort);

  const currentSortLabel = SORT_OPTIONS.find((option) => option.value === currentSort)?.label;

  return (
    <>
      <FilterButton isActive={currentSort !== 'latest'} onClick={() => setIsModalOpen(true)}>
        {currentSortLabel}
        <StyledArrowDown isActive={isModalOpen} />
      </FilterButton>

      <SortModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export const FilterButtons = () => {
  return (
    <ButtonsContainer>
      <RamenFilterButton />
      <SortButton />
    </ButtonsContainer>
  );
};
