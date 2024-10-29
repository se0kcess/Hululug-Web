import { Calendar } from '@/assets/icons/Calender';
import styled from '@emotion/styled';

interface RenderPostDateProps {
  date: string | Date;
  className?: string;
}

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 0.9rem;
`;

const StyledCalendar = styled(Calendar)`
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export const RenderPostDate = ({ date, className }: RenderPostDateProps) => {
  const formatDate = (date: string | Date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear().toString().slice(2);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  return (
    <DateContainer className={className}>
      <StyledCalendar width={16} height={16} color="currentColor" />
      {formatDate(date)}
    </DateContainer>
  );
};
