import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { ButtonText, Title2, BodyText } from '@/styles/Typography';
import { useRecipeComments } from '@/hooks/useRecipeComments';

export interface CommentFormProps {
  recipeId: string;
  isLoggedIn: boolean;
  onCommentAdded: (newComment: string) => void;
}

export const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const CommentTitle = styled(Title2)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  margin-bottom: 16px;
  color: ${theme.colors.black};
`;

export const CommentCount = styled.div`
  width: auto;
  color: ${theme.colors.primaryMain};
  margin: 0 4px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
`;

export const CommentInputField = styled(BodyText.withComponent('textarea'))<{ disabled: boolean }>`
  width: 100%;
  min-height: 80px;
  padding: 12px 16px;
  margin: 0;
  font-size: 16px;
  box-sizing: border-box;
  line-height: 1.6;
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  resize: none;
  color: ${({ disabled }) => (disabled ? theme.colors.gray[500] : theme.colors.black)};
  background-color: ${theme.colors.white};
  &:focus {
    outline: none;
    border-color: ${theme.colors.primaryMain};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled(ButtonText)<{ disabled: boolean }>`
  width: auto;
  min-height: 40px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.gray[100] : theme.colors.primaryMain};
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${({ disabled }) => (!disabled ? theme.colors.primaryDark : 'none')};
  }
`;

const CommentInput = ({ recipeId, isLoggedIn, onCommentAdded }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const { postCommentMutation, commentsQuery } = useRecipeComments(recipeId);

  const commentCount = commentsQuery.data ? commentsQuery.data.length : 0;

  const handleSubmit = async () => {
    if (!content.trim()) return;

    postCommentMutation.mutate(
      { recipeId, content },
      {
        onSuccess: () => {
          onCommentAdded(content); // 새로운 댓글을 상위 컴포넌트에 전달
          setContent(''); // 댓글 등록 후 입력란 비우기
        },
        onError: (error) => {
          console.error('Failed to add comment:', error);
        },
      },
    );
  };

  return (
    <Container>
      <CommentTitle>
        댓글 <CommentCount>{commentCount}</CommentCount>
      </CommentTitle>
      <InputWrapper>
        <CommentInputField
          disabled={!isLoggedIn}
          value={isLoggedIn ? content : '로그인 후 댓글을 작성할 수 있습니다.'}
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonWrapper>
          <SubmitButton disabled={!isLoggedIn} onClick={handleSubmit}>
            댓글 등록
          </SubmitButton>
        </ButtonWrapper>
      </InputWrapper>
    </Container>
  );
};

export default CommentInput;
