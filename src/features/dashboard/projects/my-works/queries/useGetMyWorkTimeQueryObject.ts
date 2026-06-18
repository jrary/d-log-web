import { client } from "@apis/client"
import { myWorksQueryKey } from "@features/dashboard/projects/my-works/queries/myWorksQueryKey"
import { queryOptions } from "@tanstack/react-query"
import { defaultTo } from "es-toolkit/compat"

export function useGetMyWorkTimeQueryObject(projectWorkerId: number) {
  return queryOptions({
    queryKey: myWorksQueryKey.workTime(projectWorkerId),
    queryFn: () => client.Project.getProjectWorkTimes(projectWorkerId),
    select: ({ data }) =>
      defaultTo(data.result?.projectWorkTimes, {
        totalWorkTime: 0,
        monthWorkTime: 0,
        weekWorkTime: 0,
        expectedPay: 0,
      }),
  })
}
