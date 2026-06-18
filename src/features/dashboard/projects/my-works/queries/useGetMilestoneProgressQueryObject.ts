import { client } from "@apis/client"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetMilestoneProgressQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
) {
  return queryOptions({
    queryKey: milestonesQueryKey.progress(clientProjectContractId, milestoneId),
    queryFn: () => {
      return client.Milestone.getProjectMilestoneProgressPercent(
        clientProjectContractId,
        milestoneId,
      )
    },
    select: ({ data }) => data.result?.progressPercent,
  })
}
