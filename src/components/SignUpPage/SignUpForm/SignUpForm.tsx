import { useState, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { BodyText, CaptionText, Title1 } from '@/styles/Typography';
import { SignupFormData } from '@/types/signup';
import { ProfileImageUpload } from '@/components/SignUpPage/ProfileImageUpload/ProfileImageUpload';
import { authApi } from '@/api/auth';
import axios from 'axios';
import defaultProfileImage from '@assets/images/profile-img-1.png';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.25rem;
  gap: 1.5rem;
`;

const Title = styled(Title1)`
  margin: 0 auto;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem;
  border: 1px solid
    ${(props) => (props.hasError ? props.theme.colors.red : props.theme.colors.gray[200])};
  border-radius: 8px;
  font-size: ${(props) => props.theme.typography.body.size};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError ? props.theme.colors.red : props.theme.colors.primaryMain};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray[100]};
    color: ${(props) => props.theme.colors.gray[700]};
  }
`;

const ErrorText = styled(CaptionText)`
  color: ${(props) => props.theme.colors.red};
`;

const CharCount = styled(CaptionText)<{ hasError?: boolean }>`
  display: flex;
  justify-content: space-between;
  text-align: right;
  color: ${(props) => (props.hasError ? props.theme.colors.red : props.theme.colors.gray[500])};
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.primaryMain};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${(props) => props.theme.typography.button.size};
  font-weight: ${(props) => props.theme.typography.button.weight};
  cursor: pointer;

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray[200]};
  }
`;

interface ValidationErrors {
  nickname?: string;
}

export const SignupForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const email = location.state?.email;

  const [formData, setFormData] = useState<SignupFormData>({
    email: email || '',
    nickname: '',
    introduce: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState({
    nickname: false,
  });

  const isSubmitDisabled = !!errors.nickname || !touched.nickname || !formData.nickname;

  const validateNickname = useCallback((value: string) => {
    if (!value) {
      return '닉네임을 입력해주세요.';
    }

    // 한글/영문 포함 여부 체크
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value);
    const hasEnglish = /[a-zA-Z]/.test(value);

    if (!hasKorean && !hasEnglish) {
      return '한글/영문 포함 2자 이상 10자 이하';
    }

    if (value.length < 2 || value.length > 10) {
      return '한글/영문 포함 2자 이상 10자 이하';
    }

    return '';
  }, []);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, nickname: value }));

    if (touched.nickname) {
      const error = validateNickname(value);
      setErrors((prev) => ({
        ...prev,
        nickname: error,
      }));
    }
  };

  const handleNicknameBlur = () => {
    setTouched((prev) => ({ ...prev, nickname: true }));
    const error = validateNickname(formData.nickname);
    setErrors((prev) => ({
      ...prev,
      nickname: error,
    }));
  };

  const getDefaultProfileImageFile = async () => {
    try {
      const response = await fetch(defaultProfileImage);
      const blob = await response.blob();
      return new File([blob], 'default-profile.png', {
        type: 'image/png',
        lastModified: Date.now(),
      });
    } catch (error) {
      console.error('기본 이미지 변환 중 오류:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nicknameError = validateNickname(formData.nickname);
    if (nicknameError) {
      setErrors({ nickname: nicknameError });
      setTouched({ nickname: true });
      return;
    }

    if (!code) {
      alert('인가코드가 필요합니다. 다시 로그인해주세요.');
      navigate('/login');
      return;
    }

    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('email', formData.email);
      submitData.append('nickname', formData.nickname);
      submitData.append('introduce', formData.introduce || '');

      if (formData.profile_image) {
        submitData.append('profile_image', formData.profile_image);
      } else {
        const defaultImageFile = await getDefaultProfileImageFile();
        if (defaultImageFile) {
          submitData.append('profile_image', defaultImageFile);
        }
      }
      for (const [key, value] of submitData.entries()) {
        if (value instanceof File) {
          console.log(key, ':', {
            name: value.name,
            type: value.type,
            size: value.size,
          });
        } else {
          console.log(key, ':', value);
        }
      }

      await authApi.signup(submitData);
      alert('회원가입이 완료되었습니다.');
      // 로그인 페이지로 리다이렉트
      const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
      const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
      window.location.href = kakaoURL;
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error Response:', error.response?.data);
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert('인증이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login');
          return;
        }
        const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
        alert(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!code) {
    return <div>인가코드가 없습니다. 다시 로그인해주세요.</div>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Title>사용할 닉네임과 프로필을 설정해주세요</Title>

      <ProfileImageUpload
        onImageUpload={(file) => setFormData((prev) => ({ ...prev, profile_image: file }))}
        isLoading={isLoading}
      />

      <InputContainer>
        <BodyText>이메일</BodyText>
        <Input value={formData.email} disabled />
      </InputContainer>

      <InputContainer>
        <BodyText>닉네임</BodyText>
        <Input
          value={formData.nickname}
          onChange={handleNicknameChange}
          onBlur={handleNicknameBlur}
          maxLength={10}
          placeholder="닉네임을 입력해주세요."
          hasError={!!errors.nickname && touched.nickname}
          disabled={isLoading}
        />
        <CharCount hasError={!!errors.nickname && touched.nickname}>
          {touched.nickname && errors.nickname && <ErrorText>{errors.nickname}</ErrorText>}
          {formData.nickname.length} / 10자
        </CharCount>
      </InputContainer>

      <InputContainer>
        <BodyText>한 줄 소개(선택)</BodyText>
        <Input
          value={formData.introduce}
          onChange={(e) => setFormData((prev) => ({ ...prev, introduce: e.target.value }))}
          maxLength={20}
          placeholder="간단한 자기소개를 작성해주세요."
          disabled={isLoading}
        />
        <CharCount>{formData.introduce.length} / 20자</CharCount>
      </InputContainer>

      <SubmitButton type="submit" disabled={isSubmitDisabled || isLoading}>
        {isLoading ? '처리중...' : '확인'}
      </SubmitButton>
    </Form>
  );
};
