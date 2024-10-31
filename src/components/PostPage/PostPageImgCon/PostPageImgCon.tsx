import React from 'react';
import styled from '@emotion/styled';
import Photo from '@/assets/icons/Photo';
import theme from '@/styles/theme';
import { BodyText } from '@/styles/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 450px;
  height: 245px;
  background-color: ${theme.colors.primaryPastel};
  border-radius: 16px;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  margin-bottom: 8px;
`;

const Text = styled(BodyText)`
  color: ${theme.colors.primaryMain};
`;

const PostPageImgCon = () => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 업로드 후 처리 로직 추가
      console.log('Uploaded file:', file);
    }
  };

  return (
    <Container onClick={() => document.getElementById('fileInput')?.click()}>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileUpload}
      />
      <IconWrapper>
        <Photo width={48} height={48} fill={theme.colors.primaryMain} />
      </IconWrapper>
      <Text>사진을 추가해주세요</Text>
    </Container>
  );
};

export default PostPageImgCon;
