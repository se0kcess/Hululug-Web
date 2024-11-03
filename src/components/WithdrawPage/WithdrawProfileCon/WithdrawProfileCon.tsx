import { BodyText } from '@/styles/Typography';
import styled from '@emotion/styled';

import Profile from '@/components/common/Profile/Profile';

import SamepleImg from '@/assets/images/profile-img-4.png';
import theme from '@/styles/theme';
const ProfileCon = styled(BodyText)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
`;

const WithdrawProfileCon = () => {
  return (
    <ProfileCon>
      탈퇴 계정 정보
      <div
        style={{
          border: `1px solid ${theme.colors.gray[100]}`,
          borderRadius: '8px',
          padding: '12px',
        }}
      >
        <Profile imgSrc={SamepleImg} name="백종원" caption="exsample@naver.com" />
      </div>
    </ProfileCon>
  );
};

export default WithdrawProfileCon;
