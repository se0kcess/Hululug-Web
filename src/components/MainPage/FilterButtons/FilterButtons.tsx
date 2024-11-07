import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { SORT_OPTIONS, SortOption } from '@/types/sort';
import theme from '@/styles/theme';
import { ArrowDown } from '@/assets/icons/ArrowDown';
import tagMapping from '@/constants/ramenTagMapping';
import { SortModal } from '@/components/MainPage/SortModal/SortModal';
import { RamenFilterModal } from '@/components/common/RamenFilterModal/RamenFilterModal';
import { useFilterStore } from '@/store/filterStore';

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

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryMain};
    color: ${({ theme }) => theme.colors.primaryMain};
  }
`;

const StyledArrowDown = styled(ArrowDown)<{ isActive?: boolean }>`
  margin-left: 0.25rem;
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease-in-out;
  transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0)')};
  color: currentColor;
`;

interface FilterButtonsProps {
  onTagSelect: (tagId: string | undefined) => void;
  onSortChange: (sort: SortOption) => void;
}

export const FilterButtons = ({ onTagSelect }: FilterButtonsProps) => {
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const { tagId, sort } = useFilterStore();

  const handleSortModalClose = useCallback(() => {
    setIsSortModalOpen(false);
  }, []);

  const currentSortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label;

  return (
    <ButtonsContainer>
      <FilterButton isActive={!!tagId} onClick={() => setIsTagModalOpen(true)}>
        {tagId ? tagMapping[tagId] : '라면 종류'}
        <StyledArrowDown isActive={isTagModalOpen} />
      </FilterButton>

      <FilterButton isActive={sort !== 'newest'} onClick={() => setIsSortModalOpen(true)}>
        {currentSortLabel}
        <StyledArrowDown isActive={isSortModalOpen} />
      </FilterButton>

      <RamenFilterModal
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        selectedTagId={tagId}
        onSelect={onTagSelect}
      />

      <SortModal isOpen={isSortModalOpen} onClose={handleSortModalClose} />
    </ButtonsContainer>
  );
};
