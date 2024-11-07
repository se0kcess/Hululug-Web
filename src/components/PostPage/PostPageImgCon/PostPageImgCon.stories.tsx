import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PostPageImgCon from '@/components/PostPage/PostPageImgCon/PostPageImgCon';
import useRecipeStore from '@/store/recipeStore';

// 스토어의 상태를 초기화하는 Provider Wrapper
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const setThumbnail = useRecipeStore((state) => state.setThumbnail);

  React.useEffect(() => {
    setThumbnail(''); // 빈 문자열로 초기 상태 설정
  }, [setThumbnail]);

  return <>{children}</>;
};

export default {
  title: 'Components/PostPage/PostPageImgCon',
  component: PostPageImgCon,
  decorators: [
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],
} as Meta<typeof PostPageImgCon>;

const Template: StoryFn = (args) => <PostPageImgCon {...args} />;

// 스토리 생성
export const Default = Template.bind({});
Default.args = {};

export const WithImage = Template.bind({});
WithImage.decorators = [
  (Story) => {
    const setThumbnail = useRecipeStore((state) => state.setThumbnail);
    React.useEffect(() => {
      setThumbnail('https://via.placeholder.com/450x245'); // 테스트용 이미지 URL
    }, [setThumbnail]);
    return <Story />;
  },
];
