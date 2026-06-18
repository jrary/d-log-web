import { client } from "@apis/client"
import { myPageMainQueryKey } from "@features/my-page/main/queries/myPageMainQueryKey"
import { queryOptions } from "@tanstack/react-query"
import type { GetProjectCntByStatusWorkerStatusEnum } from "@apis/api"

export function useGetMyProjectsCountByStatusQueryObject(
  state: GetProjectCntByStatusWorkerStatusEnum,
) {
  return queryOptions({
    queryKey: myPageMainQueryKey.projectCountByStatus(state),
    queryFn: () => client.Project.getProjectCntByStatus(state),
    select: (data) => data.data.result?.projectCnt,
  })
}
