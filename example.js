
/* ============================================================
 * EX-01 — BAD
 * 규칙 위반:
 * - 모호한 네이밍
 * - 입력 검증 없음
 * - 에러 삼킴
 * - 민감 정보 로깅
 * ============================================================ */
export function doStuff(u: any) {
  try {
    console.log("register: ", u.password); // ❌ sensitive data logging
    if (u) {
      if (u.email) {
        // pretend to save user
      }
    }
  } catch (e) {
    // ❌ error swallowed
  }
}


/* ============================================================
 * EX-02 — GOOD
 * 규칙 준수:
 * - 명확한 네이밍
 * - 입력 검증 (fail fast)
 * - 의미 있는 에러 타입
 * - 부수효과 분리
 * ============================================================ */
export interface RegisterUserRequest {
  email: string;
  passwordHash: string;
}

export class ValidationError extends Error {}
export class UserAlreadyExistsError extends Error {}

export function validateRegisterUserRequest(
  req: RegisterUserRequest
): void {
  if (!req.email) throw new ValidationError("email is required");
  if (!req.passwordHash) throw new ValidationError("passwordHash is required");
}

export async function registerUser(
  req: RegisterUserRequest,
  userExists: (email: string) => Promise<boolean>,
  saveUser: (req: RegisterUserRequest) => Promise<void>
): Promise<void> {
  validateRegisterUserRequest(req);

  if (await userExists(req.email)) {
    throw new UserAlreadyExistsError(`user already exists: ${req.email}`);
  }

  await saveUser(req);
}


/* ============================================================
 * EX-03 — BAD
 * 규칙 위반:
 * - 무한 재시도
 * - 종료 조건 없음
 * - 타임아웃 없음
 * ============================================================ */
export async function callApiUntilSuccess(call: () => Promise<void>) {
  while (true) {
    try {
      await call();
      break;
    } catch (e) {
      // ❌ retry forever
    }
  }
}


/* ============================================================
 * EX-04 — GOOD
 * 규칙 준수:
 * - 재시도 횟수 제한
 * - 백오프 전략
 * - 명확한 실패 조건
 * ============================================================ */
export async function retryWithBackoff(
  operation: () => Promise<void>,
  maxAttempts: number,
  baseDelayMs: number
): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await operation();
      return;
    } catch (err) {
      if (attempt === maxAttempts) {
        throw err;
      }
      const delay = baseDelayMs * attempt;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}


/* ============================================================
 * EX-05 — BAD
 * 규칙 위반:
 * - 매직 넘버
 * - 전역 상태 변경
 * - 함수가 여러 책임 수행
 * ============================================================ */
let total = 0;

export function calc(a: number) {
  total += a * 1.37 + 42; // ❌ magic numbers
  return total;
}


/* ============================================================
 * EX-06 — GOOD
 * 규칙 준수:
 * - 순수 함수
 * - 상수 분리
 * - 단일 책임
 * ============================================================ */
const TAX_RATE = 0.1;
const SHIPPING_FEE = 3000;

export function calculateOrderTotal(
  subtotal: number
): number {
  return subtotal + subtotal * TAX_RATE + SHIPPING_FEE;
}


/* ============================================================
 * EX-07 — BAD
 * 규칙 위반:
 * - 컬렉션 네이밍 오류
 * - 의미 없는 변수명
 * ============================================================ */
export function process(users: any[]) {
  for (const u of users) {
    const x = u.id;
    console.log(x);
  }
}


/* ============================================================
 * EX-08 — GOOD
 * 규칙 준수:
 * - 컬렉션 복수형
 * - 의미 있는 네이밍
 * ============================================================ */
interface User {
  id: string;
}

export function logUserIds(users: User[]): void {
  for (const user of users) {
    console.log(user.id);
  }
}


/* ============================================================
 * EX-09 — BAD (Test Code)
 * 규칙 위반:
 * - 비결정적 테스트
 * - 의미 없는 assertion
 * ============================================================ */
test("order test", () => {
  const result = Date.now() % 2 === 0;
  expect(result).toBeTruthy(); // ❌ nondeterministic
});


/* ============================================================
 * EX-10 — GOOD (Test Code)
 * 규칙 준수:
 * - 결정적 테스트
 * - 시나리오 기반 네이밍
 * ============================================================ */
test("calculateOrderTotal adds tax and shipping", () => {
  const result = calculateOrderTotal(10000);
  expect(result).toBe(10000 + 10000 * TAX_RATE + SHIPPING_FEE);
});


/* ============================================================
 * EX-11 — BAD
 * 규칙 위반:
 * - 공유 가변 상태
 * - 동시성 제어 없음
 * ============================================================ */
let counter = 0;

export async function incrementConcurrently() {
  counter++;
  await Promise.resolve();
  counter++;
  return counter;
}


/* ============================================================
 * EX-12 — GOOD
 * 규칙 준수:
 * - 부수효과 명확
 * - 상태 외부화
 * ============================================================ */
export function createCounter() {
  let value = 0;

  return {
    increment(): number {
      value += 1;
      return value;
    }
  };
}
