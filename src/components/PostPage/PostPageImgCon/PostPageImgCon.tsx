import React from 'react';
import styled from '@emotion/styled';
import Photo from '@/assets/icons/Photo';
import theme from '@/styles/theme';
import { BodyText, Title2 } from '@/styles/Typography';
import PhotoChange from '@/assets/icons/PhotoChange';
import useRecipeStore from '@/store/recipeStore'; // Zustand 스토어 import

const Container = styled.div<{ imageUrl: string | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 450px;
  height: 245px;
  background-color: ${theme.colors.primaryPastel};
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  margin-bottom: 8px;
`;

const Text = styled(BodyText)`
  color: ${theme.colors.primaryMain};
`;

const PhotoChangeIconCon = styled.div`
  width: 36px;
  height: 36px;
  position: absolute;
  right: 12px;
  bottom: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.primaryMain};
`;

const MainImgTitle = styled(Title2)`
  width: 100%;
  margin: 24px 0 12px 0;
`;

const PostPageImgCon = () => {
  const { thumbnail, setThumbnail } = useRecipeStore(); // thumbnail 상태와 설정 함수 가져오기

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setThumbnail(newImageUrl); // Zustand 스토어에 이미지 URL 저장
    }
  };

  return (
    <>
      <MainImgTitle>메인 사진</MainImgTitle>
      <Container imageUrl={thumbnail} onClick={() => document.getElementById('fileInput')?.click()}>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileUpload}
        />
        {!thumbnail && (
          <>
            <IconWrapper>
              <Photo width={48} height={48} fill={theme.colors.primaryMain} />
            </IconWrapper>
            <Text>사진을 추가해주세요</Text>
          </>
        )}
        {thumbnail && (
          <PhotoChangeIconCon>
            <PhotoChange fill={theme.colors.white} />
          </PhotoChangeIconCon>
        )}
      </Container>
    </>
  );
};

export default PostPageImgCon;
