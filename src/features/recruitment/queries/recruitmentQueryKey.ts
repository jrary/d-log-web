import { gridgeQueryKey } from "@queries/gridgeQueryKey"

export const recruitmentQueryKey = {
  all: () => [...gridgeQueryKey.user(), "recruitment"] as const,
  relatedList: () => [...recruitmentQueryKey.all(), "related"] as const,
  suggestedList: () => [...recruitmentQueryKey.all(), "suggested"] as const,
  detail: (recruitmentId: number) =>
    [...recruitmentQueryKey.all(), "detail", { recruitmentId }] as const,
}
