import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import RamenListModal from './RamenListModal';

export default {
  title: 'Components/PostPage/RamenListModal',
  component: RamenListModal,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <RamenListModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
