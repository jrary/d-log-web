import { client } from "@apis/client"
import { myInterestQueryKey } from "@features/my-page/interest/queries/myInterestQueryKey"
import { infiniteQueryOptions } from "@tanstack/react-query"

export function useGetMyInterestProjectsInfiniteQueryObject() {
  return infiniteQueryOptions({
    queryKey: myInterestQueryKey.projects(),
    queryFn: ({ pageParam }) => {
      return client.Recruitment.getLikedRecruitment(pageParam)
    },
    select: (response) => {
      return response.pages.flatMap(
        ({ data }) => data.result?.recruitmentList.contents ?? [],
      )
    },
    initialPageParam: 0,
    getNextPageParam: ({ data }) => {
      return data.result?.recruitmentList.hasNextPage
        ? (data.result?.recruitmentList.page ?? 0) + 1
        : null
    },
  })
}
