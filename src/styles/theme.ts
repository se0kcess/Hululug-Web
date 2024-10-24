const theme = {
  colors: {
    primaryMain: '#FF9500',
    primaryDark: '#FF8800',
    primaryLight: '#FFBF66',
    primaryPastel: '#FFF0E1',
    secondary: '#FFDD00',
    secondaryDark: '#FFD000',
    secondaryLight: '#FFE95C',
    secondaryPastel: '#FFFADC',
    black: '#1D2228',
    gray: {
      700: '#30373F',
      500: '#85919D',
      200: '#C9D2D9',
      50: '#DDE2E7',
      10: '#EFF1F3',
    },
    white: '#FFFFFF',
    red: '#FF645B',
    yellow: '#FEB336',
    green: '#00CD70',
    blue: '#2890FF',
  },
  typography: {
    fontFamily: 'Pretendard',
    display: {
      size: '32px',
      lineHeight: 1.4,
      weight: 700, // Bold
    },
    header: {
      size: '24px',
      lineHeight: 1.4,
      weight: 600, // Semi Bold
    },
    title1: {
      size: '20px',
      lineHeight: 1.4,
      weight: 600, // Semi Bold
    },
    title2: {
      size: '18px',
      lineHeight: 1.4,
      weight: 500, // Medium
    },
    body: {
      size: '16px',
      lineHeight: 1.6,
      weight: 400, // Regular/Medium
    },
    button: {
      size: '16px',
      lineHeight: 1.4,
      weight: 600, // SemiBold
    },
    caption: {
      size: '14px',
      lineHeight: 1.6,
      weight: 400, // Regular
    },
    chip: {
      size: '14px',
      lineHeight: 1.4,
      weight: 500, // Medium
    },
    weights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },
  shadows: {
    // Regular Shadows
    1: '4px 4px 4px rgba(239, 241, 243, 1)', // Shadow 1
    2: '8px 8px 8px rgba(239, 241, 243, 1)', // Shadow 2
    3: '16px 16px 16px rgba(239, 241, 243, 1)', // Shadow 3

    // Color Shadows
    orange: '2px 2px 2px rgba(255, 149, 0, 0.25)', // Color Shadow Orange
    yellow: '2px 2px 2px rgba(255, 208, 0, 0.25)', // Color Shadow Yellow
  },

  backdrop: {
    default: 'rgba(16, 34, 40, 0.4)', // #1D2228 with 40% opacity
  },
};

export default theme;
