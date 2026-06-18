import { client } from "@apis/client"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { queryOptions } from "@tanstack/react-query"
import { last } from "es-toolkit"

export function useGetMilestonesQueryObject(clientProjectContractId: number) {
  return queryOptions({
    queryKey: milestonesQueryKey.list(clientProjectContractId),
    queryFn: async () => {
      const { data } = await client.Milestone.getProjectMilestones(
        clientProjectContractId,
      )
      return data.result?.projectMilestoneList
    },
  })
}

export function useGetLastMilestone(clientProjectContractId: number) {
  return queryOptions({
    ...useGetMilestonesQueryObject(clientProjectContractId),
    select: (data = []) => last(data),
  })
}

export function useGetMilestoneQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
) {
  return queryOptions({
    ...useGetMilestonesQueryObject(clientProjectContractId),
    select: (data = []) => data.find((item) => item.id === milestoneId),
  })
}
