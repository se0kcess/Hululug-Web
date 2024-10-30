import styled from '@emotion/styled';
import Plus from '@/assets/icons/Plus';
import theme from '@/styles/theme';

interface ProfileImgConProps {
  ImgSrc: string;
}

export const ProfileImgCon = styled.div<ProfileImgConProps>`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url(${(props) => props.ImgSrc});
  background-size: cover;
  background-position: center;
`;

export const ProfilePlusBtn = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  background-color: ${theme.colors.primaryMain};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImg = ({ ImgSrc }: ProfileImgConProps) => {
  return (
    <ProfileImgCon ImgSrc={ImgSrc}>
      <ProfilePlusBtn>
        <Plus width={24} height={24} fill={theme.colors.white} />
      </ProfilePlusBtn>
    </ProfileImgCon>
  );
};

export default ProfileImg;
