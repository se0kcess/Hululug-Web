import { Meta, StoryFn } from '@storybook/react';
import SearchInput from './SearchInput';

export default {
  title: 'Components/SearchPage/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: StoryFn = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
