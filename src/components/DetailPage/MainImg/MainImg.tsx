import styled from '@emotion/styled';

interface MainImgProps {
  imgSrc: string;
  width?: string;
  height?: string;
}

const ImgContainer = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || '100%'};
  overflow: hidden;
  height: ${(props) => props.height || '282px'};
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;
const MainImg = ({ imgSrc, width, height }: MainImgProps) => {
  return (
    <ImgContainer width={width} height={height}>
      <Img src={imgSrc} alt="Sample Ramyun" />
    </ImgContainer>
  );
};

export default MainImg;
