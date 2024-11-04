import { CaptionText } from '@/styles/Typography';
import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import profileImage from '@assets/images/profile-img-1.png';

interface ProfileImageUploadProps {
  onImageUpload: (file: File) => void;
  defaultImage?: string;
  size?: 'small' | 'regular';
  error?: string;
  isLoading?: boolean;
}

const ImageContainer = styled.div<{ size: 'small' | 'regular' }>`
  position: relative;
  width: ${(props) => (props.size === 'small' ? '80px' : '120px')};
  height: ${(props) => (props.size === 'small' ? '80px' : '120px')};
  margin: 1.25rem auto;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  ${(props) =>
    props.draggable === false &&
    `
    opacity: 0.7;
    filter: grayscale(50%);
  `}
`;

const UploadButton = styled.label<{ size: 'small' | 'regular'; isLoading?: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${(props) => (props.size === 'small' ? '24px' : '32px')};
  height: ${(props) => (props.size === 'small' ? '24px' : '32px')};
  background-color: ${(props) => props.theme.colors.primaryMain};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.isLoading ? 'not-allowed' : 'pointer')};

  &::after {
    content: '+';
    color: white;
    font-size: ${(props) => (props.size === 'small' ? '16px' : '20px')};
  }

  ${(props) =>
    props.isLoading &&
    `
    animation: rotate 1s linear infinite;
    &::after {
      content: '↻';
    }
  `}
`;

const ErrorText = styled(CaptionText)`
  color: ${(props) => props.theme.colors.red};
  text-align: center;
  margin-top: 0.5rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

export const ProfileImageUpload = ({
  onImageUpload,
  defaultImage = profileImage,
  size = 'regular',
  error,
  isLoading,
}: ProfileImageUploadProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <ImageContainer size={size}>
        <ProfileImage src={defaultImage} alt="프로필 이미지" draggable={!isLoading} />
        <UploadButton size={size} isLoading={isLoading}>
          <HiddenInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isLoading}
          />
        </UploadButton>
      </ImageContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
