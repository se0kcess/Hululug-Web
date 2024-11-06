// Header.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import theme from '@/styles/theme';

const meta = {
  title: 'Components/MainPage/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '앱의 상단에 위치하는 헤더 컴포넌트입니다. 로그인 상태에 따라 다른 UI를 제공합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  name: '기본 값',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => <Header />,
};

export const WithScroll: Story = {
  name: '스크롤',
  render: () => (
    <div>
      <Header />
      <div style={{ height: '200vh', padding: '20px' }}>
        <p>아래로 스크롤하여 헤더 고정 확인</p>
      </div>
    </div>
  ),
};
