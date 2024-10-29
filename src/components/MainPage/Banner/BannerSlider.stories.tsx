import type { Meta, StoryObj } from '@storybook/react';
import BannerSlider from './BannerSlider';
import styled from '@emotion/styled';

const meta: Meta<typeof BannerSlider> = {
  title: 'Components/BannerSlider',
  component: BannerSlider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '자동 순환되는 메인 배너 슬라이더 컴포넌트입니다. 3초마다 자동으로 슬라이드되며, 하단의 인디케이터로 수동 제어가 가능합니다.',
      },
    },
    // Controls을 비활성화합니다 (이미지가 고정되어 있으므로)
    controls: {
      disable: true,
    },
  },
  // 각 스토리의 배경과 패딩을 조정할 수 있는 decorator
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BannerSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  name: '기본',
};

// 좁은 화면에서의 표시
const NarrowContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

export const NarrowScreen: Story = {
  name: '좁은 화면',
  decorators: [
    (Story) => (
      <NarrowContainer>
        <Story />
      </NarrowContainer>
    ),
  ],
};

// 모바일 화면에서의 표시
export const Mobile: Story = {
  name: '모바일',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// 태블릿 화면에서의 표시
export const Tablet: Story = {
  name: '태블릿',
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
