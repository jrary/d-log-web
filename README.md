# 그릿지 작업자 (Worker) 프로젝트

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?cacheSeconds=2592000)

## ⚠️ 중요 공지: old 폴더는 deprecated 되었습니다

> **old 폴더에 있는 모든 코드는 더 이상 사용하지 않습니다. 해당 코드를 사용 중인 경우 반드시 신규 구조로 마이그레이션해야 합니다.**

### 🏠 [[운영] 그릿지 작업자 페이지](https://worker.gridge.co.kr)

### 🏠 [[개발] 그릿지 작업자 페이지](https://worker-dev.gridge.co.kr)

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [3rd Party Library 현황](#3rd-party-library-현황)
- [개발 환경 설정](#개발-환경-설정)
- [개발 가이드](#개발-가이드)
- [배포 프로세스](#배포-프로세스)
- [프로젝트 구조](#프로젝트-구조)
- [네이밍 컨벤션](#네이밍-컨벤션)
- [문제 해결 및 지원](#문제-해결-및-지원)

## 프로젝트 개요

그릿지 작업자(Worker) 프로젝트는 그릿지 플랫폼의 작업자를 위한 웹 애플리케이션입니다. 이 프로젝트는 React와 TypeScript를 기반으로 구축되었으며, Vite를 사용하여 빌드 및 개발 서버를 관리합니다.

## 기술 스택

### 코어 기술

- TypeScript 5.6.3
- React 18.3.1
- Vite 6.0.5 + SWC

### 상태 및 데이터 관리

- Tanstack Query (@tanstack/react-query) 5.62.7
- React Context

### UI 컴포넌트

- styled-components 5.3.11
- @radix-ui 컴포넌트 (react-dialog, react-popover)
- @ebay/nice-modal-react 1.2.13
- react-router 7.1.0
- @naverpay/react-pdf 0.3.4
- react-day-picker 9.5.0
- react-hot-toast 2.4.1

### 폼 처리

- formik 2.4.6
- zod 3.24.1
- zod-formik-adapter 1.3.0

### 유틸리티

- date-fns 2.30.0
- axios 1.7.7
- es-toolkit 1.29.0
- qs 6.13.1
- reset.css 2.0.2

### API 통합

- @openapitools/openapi-generator-cli 2.15.3

### 에러 모니터링 및 지원

- @sentry/react 8.39.0
- @suspensive/react 2.18.10
- @channel.io/channel-web-sdk-loader 1.1.7

### 개발 도구

- ESLint 9.17.0
- Prettier 3.4.2
- TypeScript ESLint
- unplugin-icons 0.22.0
- vite-tsconfig-paths 5.1.4

## 3rd Party Library 현황

| 라이브러리                          | 버전    | 용도                      |
| ----------------------------------- | ------- | ------------------------- |
| React                               | 18.3.1  | UI 라이브러리             |
| TypeScript                          | 5.6.3   | 정적 타입 지원            |
| Vite                                | 6.0.5   | 빌드 도구                 |
| @tanstack/react-query               | 5.62.7  | 데이터 페칭 및 캐싱       |
| @ebay/nice-modal-react              | 1.2.13  | 모달 관리                 |
| formik                              | 2.4.6   | 폼 상태 관리              |
| zod                                 | 3.24.1  | 유효성 검사               |
| react-router                        | 7.1.0   | 라우팅                    |
| styled-components                   | 5.3.11  | CSS-in-JS 스타일링        |
| axios                               | 1.7.7   | HTTP 클라이언트           |
| date-fns                            | 2.30.0  | 날짜 관리                 |
| react-hot-toast                     | 2.4.1   | 토스트 알림               |
| react-day-picker                    | 9.5.0   | 날짜 선택 컴포넌트        |
| @suspensive/react                   | 2.18.10 | Suspense 기반 비동기 처리 |
| @sentry/react                       | 8.39.0  | 에러 모니터링             |
| @channel.io/channel-web-sdk-loader  | 1.1.7   | 채널톡 연동               |
| unplugin-icons                      | 0.22.0  | 아이콘 관리               |
| @openapitools/openapi-generator-cli | 2.15.3  | API 코드 생성             |
| @radix-ui/react-dialog              | 1.1.4   | 다이얼로그 컴포넌트       |
| @radix-ui/react-popover             | 1.1.4   | 팝오버 컴포넌트           |
| @naverpay/react-pdf                 | 0.3.4   | PDF 렌더링                |
| es-toolkit                          | 1.29.0  | 유틸리티 라이브러리       |
| qs                                  | 6.13.1  | URL 쿼리스트링 파싱       |
| zod-formik-adapter                  | 1.3.0   | Formik과 Zod 통합         |

## 개발 환경 설정

### 필수 요구사항

- Node.js: v20.10.0 이상
- pnpm: v9.15.2 이상
- Java: API 코드 생성을 위해 필요 (OpenJDK 11 이상 권장)

### 패키지 관리자 설치

이 프로젝트는 패키지 관리자로 `pnpm`을 사용합니다. 설치되어 있지 않은 경우 아래 명령어로 설치해주세요.

```shell
npm install -g pnpm
```

### 의존성 패키지 설치

```shell
pnpm install
```

### 환경 변수 설정

`.env.template` 파일을 참고하여 `.env.local` 파일을 생성해주세요.

## 개발 가이드

### 로컬 개발 서버 실행

```shell
pnpm dev
```

### API 모델 자동 생성

이 프로젝트는 `@openapitools/openapi-generator-cli` 패키지를 사용하여 API 모델을 자동 구성합니다. API 명세서가 업데이트될 때마다 아래 명령어를 실행해 모델을 업데이트해야 합니다.

```shell
# 개발 환경 API 기준으로 생성
pnpm generate-api-dev

# 프로덕션 환경 API 기준으로 생성
pnpm generate-api-prod
```

### 코드 린팅 및 포맷팅

```shell
# 코드 린팅
pnpm lint

# 코드 포맷팅
pnpm format
```

## 배포 프로세스

### 개발 환경 빌드

```shell
pnpm build
```

### 빌드 미리보기

```shell
pnpm preview
```

## 프로젝트 구조

```
src/
├── apis/         # API 요청 및 관련 모델
├── assets/       # 이미지, 아이콘 등 정적 자원
├── components/   # 재사용 가능한 UI 컴포넌트
├── constants/    # 상수 값 정의
├── features/     # 기능 단위로 구성된 컴포넌트
├── hooks/        # 커스텀 훅
├── layouts/      # 페이지 레이아웃 컴포넌트
├── lib/          # 외부 라이브러리 통합 및 설정
├── queries/      # React Query 관련 쿼리 정의
├── redirects/    # 리다이렉트 관련 로직
├── styles/       # 전역 스타일 및 테마 설정
└── utils/        # 유틸리티 함수
```

## 네이밍 컨벤션

### 파일 및 폴더 네이밍

- **컴포넌트 파일**: PascalCase (예: `Button.tsx`, `UserProfile.tsx`)
- **폴더명**: camelCase (예: `components`, `userAuth`)
- **훅**: use 접두사 사용 (예: `useAuth.ts`, `useMediaQuery.ts`)
- **유틸리티 파일**: camelCase (예: `formatDate.ts`, `stringUtils.ts`)

### 에셋 파일 네이밍

- **아이콘**: `ic_파일명.svg` (스네이크 케이스)
- **배경 이미지**: `bg_파일명.svg` (스네이크 케이스)
- **이미지**: `img_파일명.svg` (스네이크 케이스)

### URL 및 라우팅

- **URL 경로**: kebab-case (예: `project-worker`)

### 함수 네이밍

- **조건 확인 함수**: `is~~~` 접두사 사용 (예: `isValidEmail`)
- **API 및 이벤트 핸들러**: `handle~~~` 접두사 사용 (예: `handleSubmit`, `handleApiResponse`)
- **클릭 이벤트 핸들러**: `click~~~` 접두사 사용 (예: `clickLoginButton`, `clickToggleMenu`)

### 스타일드 컴포넌트

각 도메인별로 사용되는 스타일드 컴포넌트는 `[도메인명]StyledComponent.ts` 파일에 모음

### z-index 범위

- **헤더**: 9~20
- **모달**: 100
- **기타 요소**: ~8

## 문제 해결 및 지원

문제가 발생하거나 지원이 필요한 경우 아래 링크를 통해 피드백을 제출해주세요.

[그릿지 피드백 & 협업 요청하기](https://forms.gle/133QNZ1q9TFsL1yv8)

---

## 저작권

© **(주)소프트스퀘어드**

License: Only use for softsquared project
