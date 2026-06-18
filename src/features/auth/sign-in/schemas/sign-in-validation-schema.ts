import { email, password } from "@constants/schemas/auth"
import { z } from "zod"

export const signInValidationSchema = z.object({
  email,
  password,
  autoLogin: z.boolean(),
})

export type SignInValidationSchema = z.infer<typeof signInValidationSchema>
