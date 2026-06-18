import { name, phone, regionCode } from "@constants/schemas/auth"
import { z } from "zod"

export const findEmailValidationSchema = z.object({
  name,
  regionCode,
  phoneNumber: phone,
})

export type FindEmailValidationSchema = z.infer<
  typeof findEmailValidationSchema
>
