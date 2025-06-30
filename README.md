## 📋 사전 요구사항

```bash
npm install -g yarn
```

## 🚀 프로젝트 설정

1. 저장소 클론

```bash
git clone https://github.com/Kbank-Fe/wedding.git
cd wedding
```

2. 의존성 설치

```bash
yarn install
```

## 🛠️ 사용 가능한 명령어

```bash
yarn dev         # 개발 모드 실행
yarn build       # 프로덕션 빌드
```

## 📦 의존성 관리

새로운 패키지를 추가할 때:

```bash
yarn add <패키지명>
```

개발 의존성을 추가할 때:

```bash
yarn add -D <패키지명>
```

## 📂 디렉터리 구조

```bash
project-root/
├── index.html              # 애플리케이션 진입점
├── src/
│   ├── pages/              # 자동으로 라우팅되는 페이지 디렉터리
│   │   ├── index.tsx       # 루트 경로 ("/") 페이지
│   │   ├── about.tsx       # "/about" 페이지
│   │   └── dashboard/      # 중첩 라우트
│   │       ├── index.tsx   # "/dashboard" 페이지
│   │       ├── stats.tsx   # "/dashboard/stats" 페이지
│   │       └── settings.tsx # "/dashboard/settings" 페이지
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── hooks/              # 커스텀 React 훅
│   ├── utils/              # 유틸리티 함수
│   ├── services/           # API 로직
│   ├── styles/             # 글로벌 스타일 및 테마
│   ├── types/              # TypeScript 타입 정의
│   ├── assets/             # 정적 리소스
│   └── main.tsx            # 애플리케이션 진입 파일
├── vite.config.ts          # Vite 설정 파일
└── public/                 # 정적 파일 디렉터리
    ├── favicon.ico
    ├── robots.txt
    └── images/
```
