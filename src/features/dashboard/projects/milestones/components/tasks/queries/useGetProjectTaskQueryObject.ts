import { client } from "@apis/client"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetProjectTaskQueryObject(
  clientProjectContract: number,
  milestoneId?: number,
) {
  return queryOptions({
    queryKey: dashboardTaskQueryKey.task(clientProjectContract, milestoneId),
    queryFn: () =>
      client.Task.getProjectMilestoneTasks(
        clientProjectContract,
        true,
        milestoneId,
        undefined,
      ),
    select: (data) => data.data.result?.projectMilestoneTaskList.contents,
  })
}
