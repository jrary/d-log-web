import { password } from "@constants/schemas/auth"
import { z } from "zod"

export const changePasswordValidationSchema = z.object({
  sessionCode: z.string().uuid("인증 코드가 올바르지 않습니다."),
  password,
})

export type ChangePasswordValidationSchema = z.infer<
  typeof changePasswordValidationSchema
>
