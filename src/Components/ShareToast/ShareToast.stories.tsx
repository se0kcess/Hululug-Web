import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { ShareToast } from './ShareToast';

const meta: Meta<typeof ShareToast> = {
  title: 'Components/ShareToast',
  component: ShareToast,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'white',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShareToast>;

export const Default: Story = {
  args: {
    type: 'default',
    message: '링크를 복사했습니다.',
  },
};

export const Icon: Story = {
  args: {
    type: 'icon',
    message: '링크를 복사했습니다.',
  },
};
