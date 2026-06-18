import { client } from "@apis/client"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetTasksQueryObject(
  clientProjectContractId: number,
  milestoneId: number | undefined,
  projectWorkerId: number | undefined,
) {
  return queryOptions({
    queryKey: milestonesQueryKey.sideMenuTasks(
      clientProjectContractId,
      milestoneId,
      projectWorkerId,
    ),
    queryFn: () => {
      return client.Task.getProjectMilestoneTasks(
        clientProjectContractId,
        true,
        milestoneId,
        projectWorkerId,
        0,
        100,
      )
    },
    select: ({ data }) => data.result?.projectMilestoneTaskList.contents,
  })
}
