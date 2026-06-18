import { z } from "zod"

export const taskCreateValidationSchema = z.object({
  taskName: z.string(),
  projectWorkerIdList: z.array(z.number()).default([]),
  expectedStartDate: z.string().default(""),
  expectedEndDate: z.string().default(""),
})

export type TaskCreateValidationSchema = z.infer<
  typeof taskCreateValidationSchema
>
