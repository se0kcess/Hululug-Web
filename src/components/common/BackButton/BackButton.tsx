import ArrowLeft from '@/assets/icons/ArrowLeft';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  width?: number;
  height?: number;
  fill?: string;
}

const BackButton = ({ width = 24, height = 24, fill = '#1D2228' }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button type="button" onClick={handleClick} aria-label="메인으로 이동">
      <ArrowLeft width={width} height={height} fill={fill} />
    </button>
  );
};

export default BackButton;
