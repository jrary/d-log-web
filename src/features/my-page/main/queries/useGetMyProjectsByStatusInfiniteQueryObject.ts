import { client } from "@apis/client"
import { myPageMainQueryKey } from "@features/my-page/main/queries/myPageMainQueryKey"
import { infiniteQueryOptions } from "@tanstack/react-query"
import type { GetProjectCntByStatusWorkerStatusEnum } from "@apis/api"

export function useGetMyProjectsByStatusInfiniteQueryObject(
  state: GetProjectCntByStatusWorkerStatusEnum,
) {
  return infiniteQueryOptions({
    queryKey: myPageMainQueryKey.projects(state),
    queryFn: ({ pageParam }) => client.Project.getProjects(state, pageParam),
    select: (response) => {
      return response.pages.flatMap(
        ({ data }) => data.result?.projectList.contents ?? [],
      )
    },
    initialPageParam: 0,
    getNextPageParam: ({ data }) => {
      return data.result?.projectList.hasNextPage
        ? (data.result?.projectList.page ?? 0) + 1
        : null
    },
  })
}
