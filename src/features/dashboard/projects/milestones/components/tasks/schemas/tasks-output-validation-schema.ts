import { z } from "zod"

export const taskOutputValidationSchema = z.object({
  outputName: z.string().default(""),
  outputUrl: z.string().default(""),
})

export type TaskOutputValidationSchema = z.infer<
  typeof taskOutputValidationSchema
>
