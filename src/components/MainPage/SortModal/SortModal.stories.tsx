import type { Meta, StoryObj } from '@storybook/react';
import { SortModal } from './SortModal';
import { useSortStore } from '@/store/sortStore';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import theme from '@/styles/theme';
import { SORT_OPTIONS } from '@/types/sort';

const meta: Meta<typeof SortModal> = {
  title: 'Components/SortModal',
  component: SortModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '레시피 목록의 정렬 순서를 선택할 수 있는 바텀 시트 모달입니다.',
      },
    },
    viewport: {
      viewports: {
        mobile1: {
          name: 'Mobile',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        mobile2: {
          name: 'Mobile (Large)',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
      },
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => {
      // 스토리 변경 시 정렬 상태 초기화
      useEffect(() => {
        return () => {
          useSortStore.getState().setSort('latest');
        };
      }, []);

      return (
        <ThemeProvider theme={theme}>
          <div style={{ height: '100vh', background: '#f5f5f5' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SortModal>;

// 모달 제어를 위한 컨테이너 컴포넌트
const ModalContainer = ({
  defaultOpen = false,
  initialSort = 'latest',
}: {
  defaultOpen?: boolean;
  initialSort?: 'latest' | 'popular' | 'oldest';
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const currentSort = useSortStore((state) => state.currentSort);
  const setSort = useSortStore((state) => state.setSort);

  useEffect(() => {
    setSort(initialSort);
  }, [initialSort, setSort]);

  const currentSortLabel = SORT_OPTIONS.find((option) => option.value === currentSort)?.label;

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span>정렬: {currentSortLabel}</span>
      </button>
      <SortModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

// 기본 상태 (최신순)
export const Default: Story = {
  render: () => <ModalContainer defaultOpen={true} />,
};

// 인기순 선택 상태
export const Popular: Story = {
  render: () => <ModalContainer defaultOpen={true} initialSort="popular" />,
};

// 오래된순 선택 상태
export const Oldest: Story = {
  render: () => <ModalContainer defaultOpen={true} initialSort="oldest" />,
};

// 닫힌 상태
export const Closed: Story = {
  render: () => <ModalContainer defaultOpen={false} />,
};
