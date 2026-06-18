import { client } from "@apis/client"
import { myWorksQueryKey } from "@features/dashboard/projects/my-works/queries/myWorksQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetWorkProgressRangeQueryObject(
  clientProjectContractId: number,
  workDescriptionId: number,
  workStartAt: string,
  workHistoryId?: number,
) {
  return queryOptions({
    queryKey: myWorksQueryKey.workHistoryProgress(
      clientProjectContractId,
      workDescriptionId,
      workStartAt,
      workHistoryId,
    ),
    queryFn: () => {
      return client.WorkHistory.getProjectWorkHistoryProgress(
        clientProjectContractId,
        workDescriptionId,
        workStartAt,
        workHistoryId,
      )
    },
    select: ({ data }) => data.result?.projectWorkHistoryProgress,
  })
}
