// import axios from 'axios';
// import Cookies from 'js-cookie';

// // 쿠키에 토큰 저장 (만료 시간 설정)
// Cookies.set(
//   'token',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjcwYjA1NDJhN2Q0NzliMTYxYjNjOCJ9.eIAtZ2hk1qp3XbtmovKTVHiPtXaGNGZAHgjNcKmJwS8',
//   {
//     secure: false,
//     sameSite: 'None',
//     expires: 1,
//   },
// );

// // 공통 Axios 인스턴스 생성
// export const axiosInstance = axios.create({
//   baseURL: 'https://hululug-server-dev.up.railway.app',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // 쿠키 기반 인증 활성화
// });

// export default axiosInstance;
// src/api/axiosInstance.ts
import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 기반 인증 활성화
});

export default axiosInstance;
