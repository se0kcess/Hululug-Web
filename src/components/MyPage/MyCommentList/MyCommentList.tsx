import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { BodyText } from '@/styles/Typography';
import { RenderPostDate } from '@/components/common/RenderPostDate/RenderPostDate';

interface Comment {
  id: string;
  recipeId: string;
  content: string;
  createdAt: string;
  recipeName: string;
}

interface MyCommentListProps {
  comments: Comment[];
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RecipeTitle = styled(BodyText)`
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: 0;
  margin-bottom: 0;
`;

const CommentContent = styled(BodyText)`
  color: ${({ theme }) => theme.colors.gray[500]};
  display: flex;
  align-items: center;
  margin-bottom: 0;

  &::before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 4L10 8L6 12' stroke='%2385919D' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const MyCommentList = ({ comments }: MyCommentListProps) => {
  const navigate = useNavigate();

  const handleClick = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <List>
      {comments.map((comment) => (
        <ListItem key={comment.id} onClick={() => handleClick(comment.recipeId)}>
          <CommentHeader>
            <RecipeTitle>{comment.recipeName}</RecipeTitle>
            <RenderPostDate date={comment.createdAt} />
          </CommentHeader>
          <CommentContent>{comment.content}</CommentContent>
        </ListItem>
      ))}
    </List>
  );
};

export default MyCommentList;
