import React, { useState } from 'react';
import styled from '@emotion/styled';
import Photo from '@/assets/icons/Photo';
import theme from '@/styles/theme';
import { BodyText } from '@/styles/Typography';
import PhotoChange from '@/assets/icons/PhotoChange';

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

const PostPageImgCon = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
    }
  };

  return (
    <Container imageUrl={imageUrl} onClick={() => document.getElementById('fileInput')?.click()}>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileUpload}
      />
      {!imageUrl && (
        <>
          <IconWrapper>
            <Photo width={48} height={48} fill={theme.colors.primaryMain} />
          </IconWrapper>
          <Text>사진을 추가해주세요</Text>
        </>
      )}
      {imageUrl && (
        <PhotoChangeIconCon>
          <PhotoChange fill={theme.colors.white} />
        </PhotoChangeIconCon>
      )}
    </Container>
  );
};

export default PostPageImgCon;
