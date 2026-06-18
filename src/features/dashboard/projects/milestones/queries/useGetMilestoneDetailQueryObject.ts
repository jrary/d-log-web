import { client } from "@apis/client"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetMilestoneDetailQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
) {
  return queryOptions({
    queryKey: milestonesQueryKey.detail(clientProjectContractId, milestoneId),
    queryFn: async () => {
      const { data } = await client.Milestone.getProjectMilestone(
        clientProjectContractId,
        milestoneId,
      )
      return data.result?.projectMilestone
    },
  })
}
