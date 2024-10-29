import React from 'react';
import styled from '@emotion/styled';
import { RamenType } from '@/types/ramen';

interface RamenTagProps {
  ramen: RamenType;
  onRemove?: () => void;
}

const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.primaryPastel};
  color: ${({ theme }) => theme.colors.primaryMain};
  border-radius: 16px;
  font-size: 14px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primaryMain};
  font-size: 16px;
  line-height: 1;

  &:hover {
    opacity: 0.7;
  }
`;

export const RamenTag: React.FC<RamenTagProps> = ({ ramen, onRemove }) => {
  return (
    <TagContainer>
      {ramen.name}
      {onRemove && <RemoveButton onClick={onRemove}>×</RemoveButton>}
    </TagContainer>
  );
};
