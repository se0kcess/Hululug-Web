import { Meta, StoryFn } from '@storybook/react';
import RamenTypeSelect from './RamenTypeSelect';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { RAMEN_LIST } from '@/constants/ramenList';
import useRecipeStore from '@/store/recipeStore';

// 스토리의 기본 내보내기 설정
export default {
  title: 'Components/RamenTypeSelect',
  component: RamenTypeSelect,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => {
  const { setSelectedRamen } = useRecipeStore();

  // 초기값을 설정해주는 작업을 수행합니다.
  setSelectedRamen([RAMEN_LIST[0]]); // 예시로 첫 번째 라면을 선택된 상태로 설정

  return <RamenTypeSelect />;
};

export const Default = Template.bind({});
Default.args = {};

// 다양한 스토리를 추가하여 컴포넌트의 상태를 테스트합니다.

export const WithOneSelected = Template.bind({});
WithOneSelected.args = {};
WithOneSelected.decorators = [
  (Story) => {
    const { setSelectedRamen } = useRecipeStore();
    setSelectedRamen([RAMEN_LIST[0]]); // 예시로 하나의 라면 선택
    return <Story />;
  },
];

export const WithTwoSelected = Template.bind({});
WithTwoSelected.args = {};
WithTwoSelected.decorators = [
  (Story) => {
    const { setSelectedRamen } = useRecipeStore();
    setSelectedRamen([RAMEN_LIST[0], RAMEN_LIST[1]]); // 예시로 두 개의 라면 선택
    return <Story />;
  },
];

export const EmptySelection = Template.bind({});
EmptySelection.args = {};
EmptySelection.decorators = [
  (Story) => {
    const { setSelectedRamen } = useRecipeStore();
    setSelectedRamen([]); // 선택된 라면이 없는 상태
    return <Story />;
  },
];
