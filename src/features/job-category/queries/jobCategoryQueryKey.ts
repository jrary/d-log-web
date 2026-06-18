import { gridgeQueryKey } from "@queries/gridgeQueryKey"

export const jobCategoryQueryKey = {
  all: () => [...gridgeQueryKey.all(), "job-category"] as const,
  jobCategories: () =>
    [...jobCategoryQueryKey.all(), "job-categories"] as const,
  roleList: (jobCategoryId: number) =>
    [...jobCategoryQueryKey.all(), "role-list", { jobCategoryId }] as const,
  languages: () => [...jobCategoryQueryKey.all(), "languages"] as const,
  frameworks: () => [...jobCategoryQueryKey.all(), "frameworks"] as const,
}
