import { gridgeQueryKey } from "@queries/gridgeQueryKey"

export const userInfoQueryKey = {
  all: () => [...gridgeQueryKey.all(), "user-info"] as const,
  info: () => [...userInfoQueryKey.all(), "info"] as const,
  detail: () => [...userInfoQueryKey.all(), "detail"] as const,
  roleList: (jobCategoryId: number) =>
    [...userInfoQueryKey.all(), "role-list", { jobCategoryId }] as const,
}
