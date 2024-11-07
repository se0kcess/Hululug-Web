import type { Meta, StoryObj } from '@storybook/react';
import { FilterButtons } from './FilterButtons';
import { ThemeProvider } from '@emotion/react';
import { useFilterStore } from '@/store/filterStore';
import { useEffect } from 'react';
import theme from '@/styles/theme';

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
      useEffect(() => {
        return () => {
          const store = useFilterStore.getState();
          store.setTagId(undefined);
          store.setSort('newest');
        };
      }, []);

      return (
        <ThemeProvider theme={theme}>
          <div style={{ padding: '1rem', background: '#f5f5f5' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof FilterButtons>;

export const Default: Story = {
  args: {
    onTagSelect: (tagId) => console.log('Selected tag:', tagId),
    onSortChange: (sort) => console.log('Changed sort:', sort),
  },
};

export const WithSelectedTag: Story = {
  render: () => {
    useEffect(() => {
      useFilterStore.getState().setTagId('6721a9eb7e7f8b4e11d49d46'); // 신라면
    }, []);

    return (
      <FilterButtons
        onTagSelect={(tagId) => console.log('Selected tag:', tagId)}
        onSortChange={(sort) => console.log('Changed sort:', sort)}
      />
    );
  },
};

export const WithSelectedSort: Story = {
  render: () => {
    useEffect(() => {
      useFilterStore.getState().setSort('popular');
    }, []);

    return (
      <FilterButtons
        onTagSelect={(tagId) => console.log('Selected tag:', tagId)}
        onSortChange={(sort) => console.log('Changed sort:', sort)}
      />
    );
  },
};

export const AllSelected: Story = {
  render: () => {
    useEffect(() => {
      const store = useFilterStore.getState();
      store.setTagId('6721a9eb7e7f8b4e11d49d46');
      store.setSort('popular');
    }, []);

    return (
      <FilterButtons
        onTagSelect={(tagId) => console.log('Selected tag:', tagId)}
        onSortChange={(sort) => console.log('Changed sort:', sort)}
      />
    );
  },
};

export const Interactive: Story = {
  render: () => {
    return (
      <FilterButtons
        onTagSelect={(tagId) => alert(`Selected tag: ${tagId}`)}
        onSortChange={(sort) => alert(`Changed sort: ${sort}`)}
      />
    );
  },
};

// 모바일 뷰포트 설정 추가
const viewports = {
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
};

// 각 스토리에 모바일 뷰포트 추가
export const MobileView: Story = {
  ...Default,
  parameters: {
    viewport: {
      viewports,
      defaultViewport: 'mobile1',
    },
  },
};
