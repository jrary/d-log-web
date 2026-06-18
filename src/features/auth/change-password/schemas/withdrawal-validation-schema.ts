import { email, password } from "@constants/schemas/auth"
import { z } from "zod"

export const withdrawalValidationSchema = z.object({
  email,
  password,
})

export type WithdrawalValidationSchema = z.infer<
  typeof withdrawalValidationSchema
>
