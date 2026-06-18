import { myPageQueryKey } from "@features/my-page/queries/myPageQueryKey"

export const myInterestQueryKey = {
  all: () => [...myPageQueryKey.all(), "interest"] as const,
  count: () => [...myInterestQueryKey.all(), "count"] as const,
  projects: () => [...myInterestQueryKey.all(), "projects"] as const,
}
