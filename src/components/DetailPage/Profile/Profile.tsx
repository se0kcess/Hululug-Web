import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText, CaptionText } from '@/styles/Typography';

interface ProfileProps {
  imgSrc: string;
  name: string;
  caption: string;
}

const Container = styled.div`
  width: 327px;
  height: 88px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%; // 둥근 프로필 이미지로 설정
  object-fit: cover;
`;

export const Name = styled(BodyText)`
  width: 100px;
  color: ${theme.colors.gray[700]};
  margin: 0px;
`;

export const Caption = styled(CaptionText)`
  color: ${theme.colors.gray[500]};
  width: 240px;
`;

const Profile = ({ imgSrc, name, caption }: ProfileProps) => {
  return (
    <Container>
      <ProfileImg src={imgSrc} alt={name} />
      <div>
        <Name>{name}</Name>
        <Caption>{caption}</Caption>
      </div>
    </Container>
  );
};

export default Profile;
