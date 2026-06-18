import { client } from "@apis/client"
import { myWorksQueryKey } from "@features/dashboard/projects/my-works/queries/myWorksQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetWorkHistoryDetailQueryObject(
  clientProjectContractId: number,
  projectWorkerId: number,
  taskId: number,
) {
  return queryOptions({
    queryKey: myWorksQueryKey.workHistoryDetails(
      clientProjectContractId,
      projectWorkerId,
      taskId,
    ),
    queryFn: () => {
      return client.WorkHistory.getProjectWorkHistoryDetailList(
        clientProjectContractId,
        projectWorkerId,
        taskId,
        0,
        100,
      )
    },
    select: ({ data }) => data.result?.projectWorkHistoryDetailList.contents,
  })
}
