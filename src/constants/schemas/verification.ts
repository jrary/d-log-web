import { isEmpty } from "es-toolkit/compat"
import { z } from "zod"

export const verificationCode = z
  .string()
  .trim()
  .regex(/^[0-9]{6}$/, "인증번호의 형식이 올바르지 않습니다.")
  .refine((v) => !isEmpty(v), "인증번호를 입력해주세요.")
