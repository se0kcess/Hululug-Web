import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { ShareButton } from './ShareButton';

const meta: Meta<typeof ShareButton> = {
  title: 'Components/DetailPage/ShareButton',
  component: ShareButton,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: theme.colors.white,
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: theme.colors.white },
        { name: 'dark', value: theme.colors.black },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShareButton>;

export const Default: Story = {
  args: {
    onShare() {}, // 테스트를 위해 alert 사용
  },
};
