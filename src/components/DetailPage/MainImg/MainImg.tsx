import styled from '@emotion/styled';

interface MainImgProps {
  imgSrc: string;
  width?: string;
  height?: string;
}

const ImgContainer = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '282px'};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
  object-fit: cover;
`;

const MainImg = ({ imgSrc, width, height }: MainImgProps) => {
  return (
    <ImgContainer width={width} height={height}>
      <Img src={imgSrc} alt="Sample Ramyun" />
    </ImgContainer>
  );
};

export default MainImg;
