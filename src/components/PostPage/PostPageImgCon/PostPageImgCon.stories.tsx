import { Meta, StoryFn } from '@storybook/react';
import PostPageImgCon from './PostPageImgCon';

export default {
  title: 'Components/PostPage/PostPageImgCon',
  component: PostPageImgCon,
  argTypes: {
    onImageAdd: { action: 'image added' },
  },
} as Meta;

const Template: StoryFn<{ onImageAdd: () => void }> = (args) => {
  return <PostPageImgCon {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const WithImageAdded = Template.bind({});
WithImageAdded.args = {
  onImageAdd: () => console.log('Image has been added'),
};
