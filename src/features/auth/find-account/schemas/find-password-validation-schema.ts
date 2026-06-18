import { email } from "@constants/schemas/auth"
import { z } from "zod"

export const findPasswordValidationSchema = z.object({
  email,
})

export type FindPasswordValidationSchema = z.infer<
  typeof findPasswordValidationSchema
>
