import axios from 'axios';
import Cookies from 'js-cookie';

// 쿠키에 실제 토큰 값 설정
Cookies.set(
  'authToken',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjcwYjA1NDJhN2Q0NzliMTYxYjNjOCIsImlhdCI6MTczMDYxMjEwNH0.OslkmoLO_L4brkcVHdC5NXEbPKUmaMBQ1riXXjDDw-o',
  { expires: 1 },
);

// Axios 인스턴스 생성
const apiTest = axios.create({
  baseURL: 'https://hululug-server-dev.up.railway.app',
  withCredentials: true, // 쿠키 기반 인증 활성화
});

// Axios 요청 시 Authorization 헤더에 토큰 추가
apiTest.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('authToken') || ''}`;

export default apiTest;
