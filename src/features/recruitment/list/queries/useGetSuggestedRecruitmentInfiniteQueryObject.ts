import { client } from "@apis/client"
import { recruitmentQueryKey } from "@features/recruitment/queries/recruitmentQueryKey"
import { infiniteQueryOptions } from "@tanstack/react-query"

export function useGetSuggestedRecruitmentInfiniteQueryObject() {
  return infiniteQueryOptions({
    queryKey: recruitmentQueryKey.suggestedList(),
    queryFn: async ({ pageParam: page }) => {
      return client.Recruitment.getSuggestedRecruitment(page, 10)
    },
    select: ({ pages }) => {
      return pages.flatMap(({ data }) => {
        return data.result?.recruitmentList.contents ?? []
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { totalPages = 0, page = 0 } =
        lastPage.data.result?.recruitmentList ?? {}
      return page < totalPages ? page + 1 : undefined
    },
  })
}
