import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText, ButtonText, CaptionText } from '@/styles/Typography';
import { Comment } from '@/types/comment';
import { useRecipeComments } from '@/hooks/useRecipeComments';

interface CommentsProps {
  recipeId: string;
  onCommentsUpdate?: (updatedComments: Comment[]) => void;
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: ${theme.colors.white};
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
`;

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 12px;
  background-color: ${theme.colors.gray[50]};
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Name = styled(BodyText)`
  color: ${theme.colors.gray[700]};
  margin: 0;
`;

const Content = styled(BodyText)`
  color: ${theme.colors.gray[700]};
  margin: 0;
`;

const DateActionCon = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentDate = styled(CaptionText)`
  color: ${theme.colors.gray[500]};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const ActionButton = styled(CaptionText)`
  color: ${theme.colors.gray[500]};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const EditInput = styled.input`
  font-size: 1rem;
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 4px;

  &:focus {
    outline: none;
    border: 1px solid ${theme.colors.primaryMain};
  }
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
`;

const ConfirmButton = styled(ButtonText)`
  width: 44px;
  text-align: center;
  color: ${theme.colors.white};
  background-color: ${theme.colors.primaryMain};
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const Comments = ({ recipeId, onCommentsUpdate }: CommentsProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const { commentsQuery, updateCommentMutation, deleteCommentMutation } =
    useRecipeComments(recipeId);

  const commentList = commentsQuery.data || [];

  useEffect(() => {
    if (editingCommentId !== null) {
      editInputRef.current?.focus();
    }
  }, [editingCommentId]);

  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditedContent(comment.content);
  };

  const handleConfirmClick = async (id: string) => {
    if (editedContent.trim() === '') return;

    updateCommentMutation.mutate(
      { recipeId, commentId: id, content: editedContent },
      {
        onSuccess: (updatedComments) => {
          onCommentsUpdate?.(updatedComments);
        },
      },
    );
    setEditingCommentId(null);
  };

  const handleDeleteClick = async (id: string) => {
    deleteCommentMutation.mutate(
      { recipeId, commentId: id },
      {
        onSuccess: (updatedComments) => {
          onCommentsUpdate?.(updatedComments);
        },
      },
    );
  };

  return (
    <Container>
      {commentList.map((comment) => (
        <CommentItem key={comment._id}>
          <Avatar
            src={comment.writer.profile_image}
            alt={`${comment.writer.nickname} 프로필 이미지`}
          />
          <ContentWrapper>
            <Name>{comment.writer.nickname}</Name>
            {editingCommentId === comment._id ? (
              <>
                <EditInput
                  ref={editInputRef}
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <ConfirmButtonWrapper>
                  <ConfirmButton onClick={() => handleConfirmClick(comment._id)}>
                    확인
                  </ConfirmButton>
                </ConfirmButtonWrapper>
              </>
            ) : (
              <Content>{comment.content}</Content>
            )}
            <DateActionCon>
              <CommentDate>{new Date(comment.created_at).toLocaleDateString()}</CommentDate>
              <Actions>
                {editingCommentId !== comment._id && (
                  <ActionButton onClick={() => handleEditClick(comment)}>수정</ActionButton>
                )}
                <ActionButton onClick={() => handleDeleteClick(comment._id)}>삭제</ActionButton>
              </Actions>
            </DateActionCon>
          </ContentWrapper>
        </CommentItem>
      ))}
    </Container>
  );
};

export default Comments;
