import { client } from "@apis/client"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetTaskProgressQueryObject(
  clientProjectContractId: number,
  taskId: number,
) {
  return queryOptions({
    queryKey: milestonesQueryKey.progress(clientProjectContractId, taskId),
    queryFn: () => {
      return client.Task.getProjectTaskProgressPercent(
        clientProjectContractId,
        taskId,
      )
    },
    select: ({ data }) => data.result?.progressPercent,
  })
}
