import { client } from "@apis/client"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetProjectConfirmHistoryQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
  taskId: number,
) {
  return queryOptions({
    queryKey: dashboardTaskQueryKey.confirmHistory(
      clientProjectContractId,
      milestoneId,
      taskId,
    ),
    queryFn: () =>
      client.Task.getProjectTaskHistory(
        clientProjectContractId,
        milestoneId,
        taskId,
      ),
    select: (data) => data.data.result?.projectMilestoneTaskHistoryList,
  })
}
