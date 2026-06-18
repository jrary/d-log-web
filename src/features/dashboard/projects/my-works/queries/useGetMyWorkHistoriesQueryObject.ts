import { client } from "@apis/client"
import { myWorksQueryKey } from "@features/dashboard/projects/my-works/queries/myWorksQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetMyWorkHistoriesQueryObject(
  clientProjectContractId: number,
  projectWorkerId: number,
  milestoneId?: number,
  page?: number,
) {
  return queryOptions({
    queryKey: myWorksQueryKey.workHistories(
      clientProjectContractId,
      projectWorkerId,
      milestoneId,
      page,
    ),
    queryFn: () =>
      client.WorkHistory.getProjectMilestoneWorkHistoryList(
        clientProjectContractId,
        [],
        projectWorkerId,
        undefined,
        undefined,
        milestoneId,
        undefined,
        "PROJECT_WORKER",
        page,
        10,
      ),
    select: ({ data }) => data.result?.projectWorkHistoryList,
  })
}
