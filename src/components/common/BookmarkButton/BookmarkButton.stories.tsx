import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { BookmarkButton } from './BookmarkButton';
import { useEffect } from 'react';
import useBookmarkStore from '@/store/bookmarkStore';
import theme from '@/styles/theme';

const meta: Meta<typeof BookmarkButton> = {
  title: 'Components/common/BookmarkButton',
  component: BookmarkButton,
  args: {
    recipeId: '1',
    size: 24,
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#1D2228' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookmarkButton>;

const BookmarkButtonStory = (args: any) => {
  const clearBookmarks = useBookmarkStore((state) => state.clearBookmarks);

  useEffect(() => {
    clearBookmarks();
  }, [clearBookmarks]);

  return <BookmarkButton {...args} />;
};

export const Default: Story = {
  render: (args) => <BookmarkButtonStory {...args} />,
};

export const LargeSize: Story = {
  render: (args) => <BookmarkButtonStory {...args} />,
  args: {
    size: 32,
  },
};

export const MultipleButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <BookmarkButton recipeId={'1'} />
      <BookmarkButton recipeId={'2'} />
      <BookmarkButton recipeId={'3'} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const bookmarkedRecipes = useBookmarkStore((state) => state.bookmarkedRecipes);

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <BookmarkButton
            recipeId={'1'}
            onBookmarkChange={(id, isBookmarked) =>
              console.log(`Recipe ${id} is ${isBookmarked ? 'bookmarked' : 'unbookmarked'}`)
            }
          />
          <span>레시피 1</span>
        </div>
        <div>북마크된 레시피 ID: {bookmarkedRecipes.join(', ') || '없음'}</div>
      </div>
    );
  },
};
