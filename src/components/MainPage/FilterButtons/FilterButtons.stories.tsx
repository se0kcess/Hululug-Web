import type { Meta, StoryObj } from '@storybook/react';
import { FilterButtons, RamenFilterButton, SortButton } from './FilterButtons';
import { ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import theme from '@/styles/theme';
import { useRamenFilterStore } from '@/store/filterStore';
import { useSortStore } from '@/store/sortStore';

const meta: Meta<typeof FilterButtons> = {
  title: 'Components/MainPage/FilterButtons',
  component: FilterButtons,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '라면 종류와 정렬 순서를 선택할 수 있는 필터 버튼 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => {
      // 스토리 변경 시 상태 초기화
      useEffect(() => {
        return () => {
          useRamenFilterStore.getState().setRamen(null);
          useSortStore.getState().setSort('latest');
        };
      }, []);

      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof FilterButtons>;

// 기본 상태
export const Default: Story = {};

// 라면 종류만
export const RamenFilterOnly: Story = {
  render: () => <RamenFilterButton />,
};

// 정렬만
export const SortOnly: Story = {
  render: () => <SortButton />,
};

// 라면 선택된 상태
export const WithSelectedRamen: Story = {
  render: () => {
    useEffect(() => {
      useRamenFilterStore.getState().setRamen({
        id: 12,
        name: '신라면',
      });
    }, []);

    return <FilterButtons />;
  },
};

// 정렬 변경된 상태
export const WithChangedSort: Story = {
  render: () => {
    useEffect(() => {
      useSortStore.getState().setSort('popular');
    }, []);

    return <FilterButtons />;
  },
};

// 모두 선택된 상태
export const AllSelected: Story = {
  render: () => {
    useEffect(() => {
      useRamenFilterStore.getState().setRamen({
        id: 12,
        name: '신라면',
      });
      useSortStore.getState().setSort('popular');
    }, []);

    return <FilterButtons />;
  },
};
