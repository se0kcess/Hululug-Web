import styled from '@emotion/styled';
import theme from './theme';

// Display Text
export const DisplayText = styled.h1`
  font-size: ${theme.typography.display.size};
  line-height: ${theme.typography.display.lineHeight};
  font-weight: ${theme.typography.display.weight};
`;

// Header Text
export const HeaderText = styled.h2`
  font-size: ${theme.typography.header.size};
  line-height: ${theme.typography.header.lineHeight};
  font-weight: ${theme.typography.header.weight};
`;

// Title1 Text
export const Title1 = styled.h3`
  font-size: ${theme.typography.title1.size};
  line-height: ${theme.typography.title1.lineHeight};
  font-weight: ${theme.typography.title1.weight};
`;

// Title2 Text
export const Title2 = styled.h4`
  font-size: ${theme.typography.title2.size};
  line-height: ${theme.typography.title2.lineHeight};
  font-weight: ${theme.typography.title2.weight};
`;

// Body Text
export const BodyText = styled.p`
  font-size: ${theme.typography.body.size};
  line-height: ${theme.typography.body.lineHeight};
  font-weight: ${theme.typography.body.weight};
`;

// Button Text
export const ButtonText = styled.span`
  font-size: ${theme.typography.button.size};
  line-height: ${theme.typography.button.lineHeight};
  font-weight: ${theme.typography.button.weight};
`;

// Caption Text
export const CaptionText = styled.span`
  font-size: ${theme.typography.caption.size};
  line-height: ${theme.typography.caption.lineHeight};
  font-weight: ${theme.typography.caption.weight};
`;

// Chip Text
export const ChipText = styled.span`
  font-size: ${theme.typography.chip.size};
  line-height: ${theme.typography.chip.lineHeight};
  font-weight: ${theme.typography.chip.weight};
`;
