import { z } from "zod"

export const privacy = z.boolean().refine((value) => value === true, {
  message: "개인정보보호정책에 동의해야 합니다.",
})

export const marketing = z.boolean()
