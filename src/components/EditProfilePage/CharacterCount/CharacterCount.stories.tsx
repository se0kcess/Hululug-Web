import { Meta, StoryFn } from '@storybook/react';
import CharacterCount from './CharacterCount';

export default {
  title: 'Components/EditProfile/CharacterCount',
  component: CharacterCount,
  argTypes: {
    maxLength: {
      control: { type: 'number', min: 1, max: 100, step: 1 },
      defaultValue: 10,
      description: 'Maximum allowed characters',
    },
    minLength: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      defaultValue: 2,
      description: 'Minimum required characters',
    },
    optional: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, indicates that the field is optional',
    },
  },
} as Meta<typeof CharacterCount>;

const Template: StoryFn<typeof CharacterCount> = (args) => <CharacterCount {...args} />;

export const Default = Template.bind({});
Default.args = {
  maxLength: 10,
  minLength: 2,
  optional: true,
  propValue: '백종원',
};

export const OptionalField = Template.bind({});
OptionalField.args = {
  maxLength: 15,
  minLength: 3,
  optional: true,
};

export const ShortField = Template.bind({});
ShortField.args = {
  maxLength: 5,
  minLength: 1,
  optional: false,
};

export const IntroSelf = Template.bind({});
IntroSelf.args = {
  maxLength: 20,
  minLength: 0,
  optional: false,
};
