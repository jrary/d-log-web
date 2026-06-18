import { GetProjectCntByStatusWorkerStatusEnum } from "@apis/api/project-api"
import { client } from "@apis/client"
import { homeQueryKey } from "@features/home/queries/homeQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetUserInProgressProjectCntQueryObject() {
  return queryOptions({
    queryKey: homeQueryKey.userInProgressProjectCnt(),
    queryFn: async () => {
      return client.Project.getProjectCntByStatus(
        GetProjectCntByStatusWorkerStatusEnum.InProgress,
      ).then((res) => res.data.result?.projectCnt)
    },
  })
}
