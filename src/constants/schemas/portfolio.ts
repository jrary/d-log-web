import { z } from "zod"

export const portfolioSchema = z.object({
  fileName: z.string(),
  fileUrl: z.string(),
})

export type PortfolioSchema = z.infer<typeof portfolioSchema>
