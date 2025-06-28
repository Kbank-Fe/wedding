## ☑️ 코드 컨벤션

### 1. 컴포넌트 선언 방식

- 컴포넌트는 **화살표 함수**로 선언합니다.
- `this` 바인딩 문제 방지를 위해 화살표 함수 사용을 권장합니다.

```tsx
const Component = () => {
  return <div>...</div>;
};

export default Component;
```

### 2. Props 타입 선언

- 타입 선언에는 `interface` 대신 **`type`** 을 사용합니다.
  - `interface`의 선언 병합(Declaration Merging)을 사용하지 않기 때문입니다.
- `union type(|)`이 필요할 때도 `type`을 사용하여 일관성을 유지합니다.
- `styled-components`에서는 인라인 타입 선언을 사용합니다.

```tsx
type GetWritingResponse = {
  id: number;
  title: string;
  content: string;
};

const LeftSidebarSection = styled.section<{ isLeftSidebarOpen: boolean }>`
  display: ${({ isLeftSidebarOpen }) => !isLeftSidebarOpen && 'none'};
`;
```

### 3. 이벤트 핸들러 작성

- 이벤트 핸들러는 동작을 잘 나타내는 이름으로 작성합니다. (예: `removeTag`)
- 이벤트 핸들러 타입은 `React.` 네임스페이스 없이, 타입만 import 해서 사용합니다.

```tsx
import { MouseEventHandler } from 'react';

const removeTag: MouseEventHandler<HTMLButtonElement> = (event) => {
  // handler logic
};
```

### 4. 기본 Hooks 사용 시 타입 명시

- 상태값이 빈 값일 수 있는 경우 `null`을 포함하여 명확히 타입을 지정합니다.

```tsx
const [data, setUser] = useState<User | null>(null);
const [writingId, setWritingId] = useState<number | null>(null);
const [nickname, setNickname] = useState<string | null>(null);
```

### 5. Ref 사용 규칙

- `RefObject` 타입은 **초기값을 `null`로 지정**합니다.

```tsx
const inputRef = useRef<HTMLInputElement>(null);
```

- `MutableRefObject` 타입은 **초기값을 지정하지 않습니다.**

```tsx
const count = useRef<number>();
```

### 6. 타입 네이밍 컨벤션

- 컴포넌트 내 Props 타입은 단순히 `Props`로 명명합니다.

```tsx
type Props = {
  // ...
};
```

- 다른 파일에서 해당 타입을 가져올 때 `as` 키워드로 명명 변경 가능

```tsx
import { Props as WritingViewerProps } from 'components/WritingViewer/WritingViewer';
```

- 제네릭 타입 변수는 의미가 명확하게 대문자 단어로 작성합니다.

```tsx
// BAD
const customFetch = <T, U>(url: T, options: U) => { ... };

// GOOD
const customFetch = <URL, OPTIONS>(url: URL, options: OPTIONS) => { ... };
```

- 타입 이름에 `Type` 접미사를 붙이지 않습니다.

```tsx
// BAD
type ApiType = { ... };

// GOOD
type Api = { ... };
```

### 7. import/export 규칙

- 컴포넌트는 `default export`로 내보냅니다.

```tsx
const Component = () => {
  /* ... */
};

export default Component;
```

- 컴포넌트를 제외한 함수, 변수, 타입 등은 `named export`를 사용합니다.

```tsx
export const useCustomHook = () => {
  /* ... */
};
```

- 타입 전용 import/export는 `import type`, `export type` 키워드를 사용해 명시합니다.

## ☑️ Git/GitHub 컨벤션

### 1. 브랜치 명명 규칙

```php
<prefix>/<이슈번호>-<브랜치명>
```

- 단어는 **소문자**, 단어 사이 구분은 **하이픈(-)** 사용
- 브랜치명 앞에 역할 접두어 사용

| 브랜치명            | 용도                                         | 예시                             |
| ------------------- | -------------------------------------------- | -------------------------------- |
| `main`              | 배포 가능한 안정 버전 코드만 포함            | -                                |
| `develop`           | 다음 배포 버전 개발 (필요시 사용)            | -                                |
| `feature/기능명`    | 새로운 기능 개발용 브랜치                    | `feature/14-payment-integration` |
| `bugfix/이슈명`     | 버그 수정용 브랜치                           | `bugfix/15-fix-login-error`      |
| `hotfix/긴급수정명` | 운영 중 긴급 수정용 브랜치                   | `hotfix/16-fix-crash-on-load`    |
| `chore/작업명`      | 문서, 빌드 스크립트 등 코드 외 작업용 브랜치 | `chore/17-update-dependencies`   |

### 2. 커밋 메시지 규칙

```php
<prefix>: <한줄 요약 메시지>
```

- **prefix** 목록

| prefix   | 의미                                       |
| -------- | ------------------------------------------ |
| feat     | 새로운 기능 추가                           |
| fix      | 버그 수정                                  |
| docs     | 문서 관련 수정                             |
| style    | 코드 포맷팅, 세미콜론 누락 등 스타일 변경  |
| refactor | 코드 리팩토링                              |
| test     | 테스트 코드 추가/수정                      |
| chore    | 빌드 업무, 패키지 매니저 설정 등 기타 변경 |
