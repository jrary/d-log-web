import { client } from "@apis/client"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetProjectMilestoneDetailQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
) {
  return queryOptions({
    queryKey: dashboardTaskQueryKey.milestoneDetail(
      clientProjectContractId,
      milestoneId,
    ),
    queryFn: () =>
      client.Milestone.getProjectMilestone(
        clientProjectContractId,
        milestoneId,
      ),
    select: (data) => data.data.result?.projectMilestone,
  })
}
