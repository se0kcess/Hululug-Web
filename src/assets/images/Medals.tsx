import React from 'react';

interface MedalProps {
  rank: 1 | 2 | 3;
  size?: number;
}

export const Medal: React.FC<MedalProps> = ({ rank, size = 24 }) => {
  const getMedalColors = (rank: 1 | 2 | 3) => {
    switch (rank) {
      case 1:
        return {
          circle: '#FFB800',
          inner: '#FF9500',
          number: '#FFE8B0',
          ribbon: '#FF4949',
        };
      case 2:
        return {
          circle: '#E2E2E2',
          inner: '#C5C6CA',
          number: '#F5F5F5',
          ribbon: '#7CD992',
        };
      case 3:
        return {
          circle: '#FF9B43',
          inner: '#CE7214',
          number: '#FFB973',
          ribbon: '#4DACFF',
        };
    }
  };

  const colors = getMedalColors(rank);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Medal Circle */}
      <circle cx="12" cy="10" r="8" fill={colors.circle} />
      <circle cx="12" cy="10" r="6" fill={colors.inner} />

      {/* Number */}
      <text
        x="12"
        y="12"
        fontSize="8"
        fontWeight="bold"
        fill={colors.number}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {rank}
      </text>

      {/* Ribbons */}
      <path d="M8 16L6 22H10L8 16Z" fill={colors.ribbon} />
      <path d="M16 16L14 22H18L16 16Z" fill={colors.ribbon} />
    </svg>
  );
};
