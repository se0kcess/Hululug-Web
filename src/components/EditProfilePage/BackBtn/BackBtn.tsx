import ArrowLeft from '@/assets/icons/ArrowLeft'; // ArrowLeft.tsx 파일에서 불러오기

export interface BackBtnProps {
  onClick: () => void;
  width?: number;
  height?: number;
  fill?: string;
}

const BackBtn = ({ onClick, width = 24, height = 24, fill = '#1D2228' }: BackBtnProps) => {
  return (
    <button
      onClick={onClick}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <ArrowLeft width={width} height={height} fill={fill} />
    </button>
  );
};

export default BackBtn;
