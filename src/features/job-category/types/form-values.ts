import type { JobCategorySchema } from "@constants/schemas/job-category"

export type FormValues = {
  jobCategoryList: JobCategorySchema[]
  frameworkIdList: number[]
  languageIdList: number[]
}
