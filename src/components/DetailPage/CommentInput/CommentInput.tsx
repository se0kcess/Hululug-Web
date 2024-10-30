import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { ButtonText, Title2, BodyText } from '@/styles/Typography';
import axios from 'axios';

export interface CommentFormProps {
  recipeId: number;
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

export const CommentCount = styled(Title2)`
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
  const [commentCount, setCommentCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}/comments/count`);
        setCommentCount(response.data.count);
      } catch (error) {
        console.error('Failed to fetch comment count:', error);
        setCommentCount(0); // 오류 시 기본값을 0으로 설정
      }
    };
    fetchCommentCount();
  }, [recipeId]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      const response = await axios.post('/recipes/comments', {
        recipeId,
        content,
      });

      if (response.data.status === 200) {
        onCommentAdded(content);
        setContent('');
        setCommentCount((prevCount) => (prevCount !== null ? prevCount + 1 : 1));
      } else {
        console.error('Failed to add comment:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <Container>
      <CommentTitle>
        댓글 <CommentCount>{commentCount !== null ? commentCount : '...'}</CommentCount>
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
