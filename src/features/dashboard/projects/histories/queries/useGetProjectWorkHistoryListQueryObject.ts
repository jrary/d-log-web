import { client } from "@apis/client"
import { historiesQueryKey } from "@features/dashboard/projects/histories/queries/historiesQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetProjectWorkHistoryListQueryObject(
  clientProjectContractId: number,
  roleId?: number[],
  projectWorkerId?: number,
  startDate?: string,
  endDate?: string,
  milestoneId?: number,
  taskId?: number,
  workHistoryFilter = "NONE",
  page?: number,
) {
  return queryOptions({
    queryKey: historiesQueryKey.historyList(clientProjectContractId, {
      roleId,
      projectWorkerId,
      startDate,
      endDate,
      milestoneId,
      taskId,
      workHistoryFilter,
      page,
    }),
    queryFn: () =>
      client.WorkHistory.getProjectMilestoneWorkHistoryList(
        clientProjectContractId,
        roleId,
        projectWorkerId,
        startDate,
        endDate,
        milestoneId,
        taskId,
        workHistoryFilter,
        page,
        10,
      ),
    select: (data) => data.data.result?.projectWorkHistoryList,
  })
}
