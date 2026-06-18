import { client } from "@apis/client"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { queryOptions } from "@tanstack/react-query"
import { first } from "es-toolkit/compat"

export function useGetMilestonesQueryObject(clientProjectContractId: number) {
  return queryOptions({
    queryKey: dashboardQueryKey.milestones(clientProjectContractId),
    queryFn: async () => {
      const { data } = await client.Milestone.getProjectMilestones(
        clientProjectContractId,
      )
      return data.result?.projectMilestoneList
    },
  })
}

export function useGetFirstMilestoneQueryObject(
  clientProjectContractId: number,
) {
  return queryOptions({
    ...useGetMilestonesQueryObject(clientProjectContractId),
    select: (data = []) => first(data) ?? null,
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
