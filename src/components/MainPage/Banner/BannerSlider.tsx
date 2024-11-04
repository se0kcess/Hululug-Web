import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import socialBanner from '@assets/images/instagram-banner.png';
import rankBanner from '@assets/images/ranking-banner.png';
import worldcupBanner from '@assets/images/worldcup-banner.png';
import theme from '@/styles/theme';

const banners = [worldcupBanner, rankBanner, socialBanner];

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 1rem;
  box-shadow: ${theme.shadows[1]};
`;

const SlideTrack = styled.div<{ transform: string }>`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => props.transform};
  will-change: transform;
`;

const Slide = styled.img`
  min-width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 1;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${(props) => (props.active ? theme.colors.white : `${theme.colors.white}`)};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${(props) => (props.active ? theme.colors.white : `${theme.colors.white}`)};
  }
`;

const BannerSlider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const extendedBanners = [banners[banners.length - 1], ...banners, banners[0]];

  const startAutoSlide = useCallback(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 2500);
    return timer;
  }, []);

  useEffect(() => {
    const timer = startAutoSlide();
    return () => clearInterval(timer);
  }, [startAutoSlide]);

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentSlide === extendedBanners.length - 1) {
        setIsTransitioning(false);
        setCurrentSlide(1);
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      }

      if (currentSlide === 0) {
        setIsTransitioning(false);
        setCurrentSlide(banners.length);
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      }
    };

    if (!isDragging) {
      const timeoutId = setTimeout(handleTransitionEnd, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [currentSlide, extendedBanners.length, isDragging]);

  const getRealIndex = () => {
    if (currentSlide === 0) return banners.length - 1;
    if (currentSlide === extendedBanners.length - 1) return 0;
    return currentSlide - 1;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    setTouchEnd(e.touches[0].clientX);
    const diff = touchStart - e.touches[0].clientX;
    const containerWidth = e.currentTarget.clientWidth;
    const percentMove = (diff / containerWidth) * 100;
    setDragOffset(percentMove);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0 && currentSlide < extendedBanners.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      } else if (diff < 0 && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      }
    }

    setDragOffset(0);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index + 1);
  };

  const handleSlideClick = () => {
    const realIndex = getRealIndex();
    if (realIndex === 0) {
      navigate('/ramenworldcup');
    } else if (realIndex === 1) {
      navigate('/ramenworldcup/rank');
    }
  };

  // 변환 스타일 계산
  const transformStyle = `translateX(${-currentSlide * 100 - dragOffset}%)`;

  return (
    <Container
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <SlideTrack
        transform={transformStyle}
        style={{
          transition: isDragging || !isTransitioning ? 'none' : 'transform 0.3s ease-in-out',
        }}
      >
        {extendedBanners.map((banner, index) => (
          <Slide
            key={index}
            src={banner}
            alt={`배너 ${getRealIndex() + 1}`}
            draggable={false}
            onClick={handleSlideClick}
          />
        ))}
      </SlideTrack>
      <Dots>
        {banners.map((_, index) => (
          <Dot
            key={index}
            active={getRealIndex() === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </Dots>
    </Container>
  );
};

export default BannerSlider;
