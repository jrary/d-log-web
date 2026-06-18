import { isEmpty } from "es-toolkit/compat"
import { z } from "zod"

export const name = z
  .string()
  .trim()
  .regex(/^[가-힣]{2,10}$/, "2자 ~ 10자 사이의 한글만 입력해주세요.")
  .refine((v) => !isEmpty(v), "본명을 입력해주세요.")

export const nickname = z
  .string()
  .trim()
  .min(2, "닉네임은 최소 2자 이상이여야 합니다.")
  .max(10, "닉네임은 최대 10자까지 입력할 수 있습니다.")
  .refine((v) => !isEmpty(v), "닉네임을 입력해주세요.")

export const email = z
  .string()
  .trim()
  .email("이메일의 형식이 올바르지 않습니다.")
  .refine((v) => !isEmpty(v), "이메일을 입력해주세요.")

export const password = z
  .string()
  .trim()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .regex(
    /^[A-Za-z0-9!@#$%^&*()-_=+]+$/g,
    "비밀번호는 영문, 숫자, 특수문자만 사용할 수 있습니다.",
  )
  .refine((v) => !isEmpty(v), "비밀번호를 입력해주세요.")

export const inputPassword = z
  .string()
  .trim()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .regex(
    /^[A-Za-z0-9!@#$%^&*()-_=+]+$/g,
    "비밀번호는 영문, 숫자, 특수문자만 사용할 수 있습니다.",
  )
  .refine((value) => {
    const hasLetter = /[A-Za-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const hasChar = /[!@#$%^&*()\-_=+]/.test(value)

    return hasLetter && hasNumber && hasChar
  }, "비밀번호에는 영문, 숫자, 특수문자가 각각 1개 이상 포함되어야 합니다.")
  .refine((v) => v.length > 8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .refine((v) => !isEmpty(v), "비밀번호를 입력해주세요.")

export const phone = z
  .string()
  .trim()
  .min(2, "휴대폰번호 형식을 확인해주세요.")
  .max(12, "휴대폰번호 형식을 확인해주세요.")
  .regex(/^[0-9]+$/, "휴대폰번호 형식을 확인해주세요.")

export const regionCode = z
  .string()
  .regex(/^[A-Z]{2}$/, "지역코드가 올바르지 않습니다.")
  .refine((v) => !isEmpty(v), "지역코드를 입력해주세요.")
