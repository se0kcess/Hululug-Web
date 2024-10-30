import { Meta, StoryFn } from '@storybook/react';
import CommentInput, {
  CommentFormProps,
  CommentTitle,
  CommnetCount,
  CommentInputField,
  SubmitButton,
  ButtonWrapper,
} from './CommentInput';

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
  argTypes: {
    recipeId: { control: 'number' },
    isLoggedIn: { control: 'boolean' },
    onCommentAdded: { action: 'comment added' },
  },
} as Meta<typeof CommentInput>;

const Template: StoryFn<CommentFormProps> = (args) => <CommentInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  recipeId: 1,
  isLoggedIn: true,
};

export const CommentTitleStory: StoryFn = () => (
  <>
    <CommentTitle>
      댓글 <CommnetCount>10</CommnetCount>
    </CommentTitle>

    <CommentTitle>
      댓글 <CommnetCount>0</CommnetCount>
    </CommentTitle>
  </>
);

export const CommentInputFieldStory: StoryFn = () => (
  <>
    <CommentInputField disabled={false} placeholder="레시피 작성자에게 댓글을 남겨주세요." />
    <CommentInputField disabled={false} value="너무 맛있어요" />
  </>
);

export const DisabledCommentInputFieldStory: StoryFn = () => (
  <CommentInputField disabled={true} value="로그인 후 댓글을 작성할 수 있습니다." />
);

export const SubmitButtonStory: StoryFn = () => (
  <ButtonWrapper>
    <SubmitButton disabled={false}>댓글 등록</SubmitButton>
  </ButtonWrapper>
);

export const DisabledSubmitButtonStory: StoryFn = () => (
  <ButtonWrapper>
    <SubmitButton disabled={true}>댓글 등록</SubmitButton>
  </ButtonWrapper>
);
