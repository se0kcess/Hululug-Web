import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import PostPageImgCon from './PostPageImgCon';

export default {
  title: 'Components/PostPageImgCon', // 스토리북에서 컴포넌트 위치를 지정
  component: PostPageImgCon,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <PostPageImgCon {...args} />;

export const Default = Template.bind({});
Default.args = {};
