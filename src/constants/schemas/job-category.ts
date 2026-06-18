import { z } from "zod"

export const jobCategorySchema = z.object({
  jobCategoryId: z.number(),
  roleIdList: z.array(z.string().or(z.number())).min(1, "직무를 선택해주세요."),
})

export type JobCategorySchema = z.infer<typeof jobCategorySchema>
