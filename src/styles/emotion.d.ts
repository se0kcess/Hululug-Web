import '@emotion/react';
import { Theme } from '';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primaryMain: string;
      primaryDark: string;
      primaryLight: string;
      primaryPastel: string;
      secondary: string;
      secondaryDark: string;
      secondaryLight: string;
      secondaryPastel: string;
      black: string;
      gray: {
        700: string;
        500: string;
        200: string;
        50: string;
        10: string;
      };
      white: string;
      red: string;
      yellow: string;
      green: string;
      blue: string;
    };
    typography: {
      fontFamily: string;
      display: {
        size: string;
        lineHeight: number;
        weight: number;
      };
      header: {
        size: string;
        lineHeight: number;
        weight: number;
      };
      title1: {
        size: string;
        lineHeight: number;
        weight: number;
      };
      title2: {
        size: string;
        lineHeight: number;
        weight: number;
      };
      body: {
        size: string;
        lineHeight: number;
        weight: number;
      };
      button: {
        size: string;
        lineHeight: number;
        weight: number;
      };
      caption: {
        size: string;
        lineHeight: number;
        weight: number;
      };
      chip: {
        size: string;
        lineHeight: number;
        weight: number;
      };
      weights: {
        regular: number;
        medium: number;
        semiBold: number;
        bold: number;
      };
    };
    shadows: {
      1: string;
      2: string;
      3: string;
      orange: string;
      yellow: string;
    };
    backdrop: {
      default: string;
    };
  }
}
