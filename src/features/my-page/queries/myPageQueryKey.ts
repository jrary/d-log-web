import { gridgeQueryKey } from "@queries/gridgeQueryKey"

export const myPageQueryKey = {
  all: () => [...gridgeQueryKey.user(), "my-page"] as const,
}
