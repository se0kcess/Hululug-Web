import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RamenTypeSelect from '@/components/PostPage/RamenTypeSelect/RamenTypeSelect';
import useRecipeStore from '@/store/recipeStore';

// Zustand 상태를 초기화하는 Provider
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const { setSelectedRamen, setRamenSelected } = useRecipeStore();

  React.useEffect(() => {
    setSelectedRamen([]); // 선택된 라면 초기화
    setRamenSelected(false); // 초기 상태 false 설정
  }, [setSelectedRamen, setRamenSelected]);

  return <>{children}</>;
};

export default {
  title: 'Components/PostPage/RamenTypeSelect',
  component: RamenTypeSelect,
  decorators: [(storyFn) => <StoreProvider>{storyFn()}</StoreProvider>],
} as Meta;

const Template: StoryFn = () => <RamenTypeSelect />;

export const Default = Template.bind({});
Default.storyName = 'Default View';

export const WithSelectedRamen = Template.bind({});
WithSelectedRamen.storyName = 'With Selected Ramen';
WithSelectedRamen.decorators = [
  (storyFn) => {
    const { setSelectedRamen, setRamenSelected } = useRecipeStore();
    React.useEffect(() => {
      setSelectedRamen([
        { id: 1, name: 'Shoyu Ramen' },
        { id: 2, name: 'Miso Ramen' },
      ]); // 예시 라면 설정
      setRamenSelected(true);
    }, [setSelectedRamen, setRamenSelected]);
    return storyFn();
  },
];
