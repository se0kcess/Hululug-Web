import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '앱의 하단 네비게이션 바입니다.',
      },
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <MemoryRouter initialEntries={[parameters?.initialPath || '/']}>
        <ThemeProvider theme={theme}>
          <div style={{ height: '100vh', background: '#f5f5f5' }}>
            <Routes>
              <Route path="*" element={<Story />} />
            </Routes>
          </div>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

// 홈 화면
export const Home: Story = {
  parameters: {
    initialPath: '/',
  },
};

// 검색 화면
export const Search: Story = {
  parameters: {
    initialPath: '/search',
  },
};

// 글 작성 화면
export const Write: Story = {
  parameters: {
    initialPath: '/postrecipe',
  },
};

// 마이페이지
export const MyPage: Story = {
  parameters: {
    initialPath: '/mypage',
  },
};
