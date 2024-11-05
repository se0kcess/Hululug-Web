// 레시피 소개페이지.
// 메인 사진과 레시피 제목, 레시피 소개를 입력.
import useRecipeStore from '@/store/recipeStore';
import PostPageImgCon from '@/components/PostPage/PostPageImgCon/PostPageImgCon';
import RecipeTitleInput from '@/components/PostPage/RecipeTitleInput/RecipeTitleInput';
import RecipeIntroInput from '@/components/PostPage/RecipeIntroInput/RecipeIntroInput';
import NextBtn from '@/components/PostPage/NextBtn/NextBtn';
import styled from '@emotion/styled';

const BtnCon = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 24px;
`;

interface RecipeIntroductionProps {
  onNext: () => void;
}

const RecipeIntroduction = ({ onNext }: RecipeIntroductionProps) => {
  const { thumbnail, title, intro, setTitle, setIntro } = useRecipeStore();

  const isNextEnabled = !!thumbnail && title.trim() !== '' && intro.trim() !== '';

  return (
    <>
      <PostPageImgCon />
      <RecipeTitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <RecipeIntroInput value={intro} onChange={(e) => setIntro(e.target.value)} />
      <BtnCon>
        <NextBtn isActive={isNextEnabled} onClick={isNextEnabled ? onNext : undefined} />
      </BtnCon>
    </>
  );
};

export default RecipeIntroduction;
