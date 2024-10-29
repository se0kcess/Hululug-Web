import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText, ButtonText, CaptionText } from '@/styles/Typography';
import axios from 'axios';

interface Comment {
  id: number;
  avatar: string;
  name: string;
  content: string;
  date: string;
  edited?: boolean;
  isOwnComment?: boolean; // 로그인 사용자의 댓글인지 여부
}

interface CommentsProps {
  comments: Comment[];
  recipeId: number;
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

const Comments = ({ comments, recipeId, onCommentsUpdate }: CommentsProps) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const [commentList, setCommentList] = useState<Comment[]>(comments);

  useEffect(() => {
    if (editingCommentId !== null) {
      editInputRef.current?.focus();
    }
  }, [editingCommentId]);

  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleConfirmClick = async (id: number) => {
    if (editedContent.trim() === '') {
      return;
    }

    if (editedContent !== commentList.find((comment) => comment.id === id)?.content) {
      try {
        await axios.put('/recipes/comments', {
          commentId: id,
          content: editedContent,
        });
        const newDate = new Date().toISOString().split('T')[0];
        const updatedComments = commentList.map((comment) =>
          comment.id === id
            ? { ...comment, content: editedContent, date: newDate, edited: true }
            : comment,
        );
        setCommentList(updatedComments);
        onCommentsUpdate?.(updatedComments);
      } catch (error) {
        console.error('Failed to update comment', error);
      }
    }
    setEditingCommentId(null);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await axios.delete(`/recipes/${recipeId}/comments`);
      const updatedComments = commentList.filter((comment) => comment.id !== id);
      setCommentList(updatedComments);
      onCommentsUpdate?.(updatedComments);
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  return (
    <Container>
      {commentList.map((comment) => (
        <CommentItem key={comment.id}>
          <Avatar src={comment.avatar} alt={`${comment.name} 프로필 이미지`} />
          <ContentWrapper>
            <Name>{comment.name}</Name>
            {editingCommentId === comment.id ? (
              <>
                <EditInput
                  ref={editInputRef}
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <ConfirmButtonWrapper>
                  <ConfirmButton onClick={() => handleConfirmClick(comment.id)}>확인</ConfirmButton>
                </ConfirmButtonWrapper>
              </>
            ) : (
              <Content>{comment.content}</Content>
            )}
            <DateActionCon>
              <CommentDate>
                {comment.date} {comment.edited && '· 수정됨'}
              </CommentDate>
              {comment.isOwnComment && (
                <Actions>
                  {editingCommentId !== comment.id && (
                    <ActionButton onClick={() => handleEditClick(comment)}>수정</ActionButton>
                  )}
                  <ActionButton onClick={() => handleDeleteClick(comment.id)}>삭제</ActionButton>
                </Actions>
              )}
            </DateActionCon>
          </ContentWrapper>
        </CommentItem>
      ))}
    </Container>
  );
};

export default Comments;
