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
├── index.html               # React 애플리케이션 진입점 HTML
├── src/
│   ├── app/                 # React App Router 기반의 페이지 디렉터리
│   │   ├── layout.tsx       # 공통 레이아웃 컴포넌트
│   │   ├── page.tsx         # 루트 경로 페이지 컴포넌트
│   │   └── ...              # 하위 경로별 페이지 및 컴포넌트
│   ├── components/          # 전역 재사용 UI 컴포넌트
│   ├── hooks/               # 전역 커스텀 훅
│   ├── utils/               # 유틸 함수 및 공통 로직
│   ├── services/            # API 호출 등 비즈니스 로직
│   ├── styles/              # 글로벌 스타일 및 Emotion 테마
│   ├── types/               # 타입 정의 파일
│   ├── assets/              # src 내 정적 파일 (이미지 등)
│   └── main.tsx             # React 앱 진입점 (루트 컴포넌트 마운트)
├── vite.config.ts           # Vite 설정
├── package.json             # 프로젝트 의존성 및 스크립트
└── public/                  # 별도 정적 파일 (favicon 등)
    ├── favicon.ico
    ├── robots.txt
    └── images/
```
