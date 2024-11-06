<h1><img width="104" alt="image" src="https://github.com/user-attachments/assets/cf5bdd19-edaf-4af8-96b8-6a8842d06bb5"></h1>

나만의 특별한 라면 레시피 공유 앱 🍥

<p>
<strong>🗓️ 프로젝트 기간 : 2024.10.15 ~ 2024.11.06</strong>
</p>

### 📑 기획서

https://www.figma.com/design/8nDuzTlsqahg1VkcVcUmAq/3%EC%B0%A8_1%ED%8C%80_%ED%9B%84%EB%A3%A8%EB%A3%A9?node-id=847-4837&t=6AUoooiX26zQZLv3-1

### 📎 배포 링크

https://hululug.vercel.app/

## 📖 소개

🍜 후루룩은 자신만의 특별한 라면 레시피를 공유하고 발견할 수 있는, 라면을 사랑하는 모든 이들을 위한 커뮤니티 입니다 🍜

## 👫 팀원

| 김도연                                                                                                                 | 김민석                                                                                                                 | 유성민                                                                                                                 | 윤석준                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/b0a88dbc-3f5b-4c92-ab4f-eb685f083ecc" width="150" height="150" /> | <img src="https://github.com/user-attachments/assets/b2eef603-5658-42c6-88a6-03326fd66541" width="150" height="150" /> | <img src="https://github.com/user-attachments/assets/8f5b3136-0203-4a34-8588-4c84d6103146" width="150" height="150" /> | <img src="https://github.com/user-attachments/assets/b51c7ead-2419-4807-8d18-0f41af8439c1" width="150" height="150" /> |
| Design, Backend                                                                                                        | Frontend                                                                                                               | Frontend                                                                                                               | Backend                                                                                                                |

## ✨ 주요 기능

🍜 라면 레시피 공유 <br />
👥 소셜 로그인 <br />
🏆 라면 이상형 월드컵 등 다양한 이벤트 <br />
💬 레시피 댓글 및 좋아요 <br />
📱 라면 레시피 검색

## 🖼 스크린샷

### 로그인

![image](https://github.com/user-attachments/assets/4c5a96d8-7888-403a-a624-1e18ae5be885)

### 메인

![image](https://github.com/user-attachments/assets/9cb5a8a0-feb1-4290-bf4a-6a09465d2a36)

### 레시피 상세

![image](https://github.com/user-attachments/assets/3c3ed1b1-fd8b-44d2-bea2-2093fdac98f6)

### 레시피 작성

![image](https://github.com/user-attachments/assets/a08433e5-5652-4d39-8522-e58ab92b4672)

### 라면 이상형 월드컵 (이벤트)

![image](https://github.com/user-attachments/assets/1323ffdb-a072-4e60-aad3-6b4c40f7571c)

### 검색

![image](https://github.com/user-attachments/assets/438a9b3e-d29e-4d94-ac37-1ec6c06f7226)

### 마이페이지

![image](https://github.com/user-attachments/assets/8317efa1-cc54-4b5f-8fb1-e2564de6b69b)

## 🛠 기술 스택

- **프레임워크:** React
- **언어:** TypeScript
- **상태 관리:**
  - Zustand (클라이언트 상태)
  - React-Query (서버 상태)
- **스타일링:** Emotion CSS
- **API 통신:** Axios
- **컴포넌트 문서화:** Storybook
- **개발 도구:**
  - ESLint
  - Prettier
  - Vite

## 📁 프로젝트 구조

```
src
├── api                 # API 관련 설정 및 인터페이스
├── assets             # 이미지, 폰트 등 정적 파일
├── components         # 재사용 가능한 컴포넌트
├── constants          # 상수 정의
├── hooks              # 커스텀 훅
├── pages              # 페이지 컴포넌트
├── router             # 라우팅 설정
├── store              # Zustand 스토어
├── styles             # 글로벌 스타일 및 테마
├── types              # TypeScript 타입 정의
├── App.tsx            # 앱 메인 컴포넌트
└── main.tsx           # 앱 진입점
config
├── .env               # 환경 변수
├── .eslintrc         # ESLint 설정
├── .gitignore        # Git 제외 파일 설정
├── .prettierrc       # Prettier 설정
├── .yarnrc.yml       # Yarn 설정
├── eslint.config.js  # ESLint 추가 설정
├── index.html        # HTML 템플릿
├── package.json      # 프로젝트 의존성 및 스크립트
├── sw.js             # Service Worker
├── tsconfig.json     # TypeScript 설정
├── tsconfig.app.json # App TypeScript 설정
├── tsconfig.node.json # Node TypeScript 설정
└── vite.config.ts    # Vite 설정
```

## 🚀 시작하기

1. 저장소 클론

```bash
git clone https://github.com/se0kcess/hululug-web.git
```

2. 의존성 설치

```
yarn install
```

3. 개발 서버 실행

```
yarn dev
```

## 🤓 추후 계획

- 라면으로 알아보는 mbti 테스트
- 주간/월간 베스트 라면 레시피 대회
