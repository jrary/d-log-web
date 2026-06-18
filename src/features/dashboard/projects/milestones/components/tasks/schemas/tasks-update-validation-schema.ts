import { z } from "zod"

export const taskUpdateValidationSchema = z.object({
  taskName: z.string(),
  projectWorkerIdList: z.array(z.number()).default([]),
  expectedStartDate: z.string().default(""),
  expectedEndDate: z.string().default(""),
})

export type TaskUpdateValidationSchema = z.infer<
  typeof taskUpdateValidationSchema
>
