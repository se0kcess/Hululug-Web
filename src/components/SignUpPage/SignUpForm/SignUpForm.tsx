import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { BodyText, CaptionText, Title1 } from '@/styles/Typography';
import { SignupFormData } from '@/types/signup';
import { ProfileImageUpload } from '@/components/SignUpPage/ProfileImageUpload/ProfileImageUpload';

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
  const [formData, setFormData] = useState<SignupFormData>({
    nickname: '',
    description: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState({
    nickname: false,
  });

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

    // 이미 touched 상태라면 실시간으로 유효성 검사
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 제출 시 최종 유효성 검사
    const nicknameError = validateNickname(formData.nickname);

    if (nicknameError) {
      setErrors({ nickname: nicknameError });
      setTouched({ nickname: true });
      return;
    }

    // TODO: 회원가입 처리 로직
    console.log('Form submitted:', formData);
  };

  const isSubmitDisabled = !!errors.nickname || !touched.nickname;

  return (
    <Form onSubmit={handleSubmit}>
      <Title>사용할 닉네임과 프로필을 설정해주세요</Title>

      <ProfileImageUpload
        onImageUpload={(file) => setFormData((prev) => ({ ...prev, profileImage: file }))}
      />

      <InputContainer>
        <BodyText>닉네임</BodyText>
        <Input
          value={formData.nickname}
          onChange={handleNicknameChange}
          onBlur={handleNicknameBlur}
          maxLength={10}
          placeholder="닉네임을 입력해주세요."
          hasError={!!errors.nickname && touched.nickname}
        />
        <CharCount hasError={!!errors.nickname && touched.nickname}>
          {touched.nickname && errors.nickname && <ErrorText>{errors.nickname}</ErrorText>}
          {formData.nickname.length} / 10자
        </CharCount>
      </InputContainer>

      <InputContainer>
        <BodyText>한 줄 소개(선택)</BodyText>
        <Input
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          maxLength={20}
          placeholder="간단한 자기소개를 작성해주세요."
        />
        <CharCount>{formData.description.length} / 20자</CharCount>
      </InputContainer>

      <SubmitButton type="submit" disabled={isSubmitDisabled}>
        확인
      </SubmitButton>
    </Form>
  );
};
