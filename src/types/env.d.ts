/// <reference types="vite/client" />

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

interface ImportMetaEnv {
  VITE_KAKAO_CLIENT_ID: string;
  VITE_KAKAO_REDIRECT_URI: string;
  VITE_BASE_URL: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}

declare global {
  interface Window {
    Kakao: any;
  }
}
