import { Meta, StoryFn } from '@storybook/react';
import PostPageHeader from './PostPageHeader';

export default {
  title: 'Components/PostPage/PostPageHeader', // 스토리북에서 컴포넌트 위치를 지정
  component: PostPageHeader,
} as Meta;

const Template: StoryFn = () => <PostPageHeader />;

export const Default = Template.bind({});
Default.args = {};
