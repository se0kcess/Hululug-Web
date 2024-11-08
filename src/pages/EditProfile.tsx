import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import theme from '@/styles/theme';
import EditProfileHeader from '@/components/EditProfilePage/EditProfileHeader/EditProfileHeader';
import BackButton from '@/components/common/BackButton/BackButton';
import ProfileImg from '@/components/EditProfilePage/ProfileImg/ProfileImg';
import SampleImg from '@/assets/images/profile-img-2.png';
import Input from '@/components/EditProfilePage/Input/Input';
import CharacterCount from '@/components/EditProfilePage/CharacterCount/CharacterCount';
import { Caption } from '@/components/common/Profile/Profile';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
  padding-bottom: 80px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: relative;
`;

const BackBtn = styled.div`
  position: absolute;
  left: 18px;
  cursor: pointer;
  z-index: 10;
`;

const ProfileCon = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImgCon = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const FileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const InputCon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`;

const IdCon = styled(Caption)`
  margin-bottom: 8px;
`;

const NickNameCon = styled(Caption)`
  width: 100%;
  margin: 24px 0 8px;
`;

const IntroCon = styled(Caption)`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const ButtonCon = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: center;
  padding: 24px;
`;

const CompleteBtn = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  color: ${theme.colors.white};
  background-color: ${(props) =>
    props.disabled ? theme.colors.gray[100] : theme.colors.primaryMain};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.typography.button.size};
  line-height: ${theme.typography.button.lineHeight};
  font-weight: ${theme.typography.button.weight};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? theme.colors.gray[100] : theme.colors.primaryDark};
  }
`;

export default function EditProfile() {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('백종원');
  const [introduce, setIntroduce] = useState('');
  const [profileImage, setProfileImage] = useState(SampleImg);
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const isFormValid = isNicknameValid;

  useEffect(() => {
    setId('user@example.com');
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // 선택된 이미지 파일 URL을 상태로 설정
    }
  };

  const handleComplete = async () => {
    if (isFormValid) {
      // 서버에 프로필 정보 전송
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <BackBtn>
          <BackButton />
        </BackBtn>
        <EditProfileHeader />
      </HeaderContainer>
      <ProfileCon>
        <ProfileImgCon>
          <ProfileImg ImgSrc={profileImage} />
          <FileInput type="file" accept="image/*" onChange={handleImageChange} />
        </ProfileImgCon>
      </ProfileCon>
      <InputCon>
        <IdCon>카카오 계정 이메일</IdCon>
        <Input disabled={true} value={id} />
        <NickNameCon>
          닉네임
          <CharacterCount
            maxLength={10}
            minLength={2}
            placeholder="변경할 닉네임을 입력해주세요."
            propValue={nickname}
            onChange={(e) => setNickname(e.target.value)}
            optional={true}
            isError={(isError) => setIsNicknameValid(!isError)}
          />
        </NickNameCon>
        <IntroCon>
          한 줄 소개(선택)
          <CharacterCount
            maxLength={20}
            minLength={0}
            placeholder="간단한 자기소개를 작성해주세요."
            propValue={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
          />
        </IntroCon>
      </InputCon>
      <ButtonCon>
        <CompleteBtn onClick={handleComplete} disabled={!isFormValid}>
          수정 완료
        </CompleteBtn>
      </ButtonCon>
    </Container>
  );
}
