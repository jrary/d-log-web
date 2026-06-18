import { client } from "@apis/client"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetMilestoneTasksQueryObject(
  clientProjectContractId: number,
  milestoneId?: number,
  projectWorkerId?: number,
) {
  return queryOptions({
    queryKey: milestonesQueryKey.tasks(
      clientProjectContractId,
      milestoneId,
      projectWorkerId,
    ),
    queryFn: () => {
      return client.Task.getProjectMilestoneTasks(
        clientProjectContractId,
        false,
        milestoneId,
        undefined,
        0,
        4,
      )
    },
    select: ({ data }) => data.result?.projectMilestoneTaskList,
  })
}
