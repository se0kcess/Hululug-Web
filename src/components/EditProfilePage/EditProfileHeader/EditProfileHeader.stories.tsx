import type { Meta, StoryObj } from '@storybook/react';
import EditProfileHeader from './EditProfileHeader';

const meta: Meta<typeof EditProfileHeader> = {
  title: 'Components/EditProfile/EditProfileHeader',
  component: EditProfileHeader,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;

type Story = StoryObj<typeof EditProfileHeader>;

export const Default: Story = {};
