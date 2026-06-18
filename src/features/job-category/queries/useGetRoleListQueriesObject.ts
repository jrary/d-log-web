import { client } from "@apis/client"
import { jobCategoryQueryKey } from "@features/job-category/queries/jobCategoryQueryKey"
import { queryOptions } from "@tanstack/react-query"
import { merge } from "es-toolkit"
import { defaultTo, map, partialRight } from "es-toolkit/compat"

export function useGetRoleListQueriesObject(jobCategoryIds: number[]) {
  return jobCategoryIds.map((jobCategoryId) => {
    return queryOptions({
      queryKey: jobCategoryQueryKey.roleList(jobCategoryId),
      queryFn: () => client.JobCategory.getRoleList(jobCategoryId),
      select: ({ data }) =>
        map(
          defaultTo(data.result?.roleList, []),
          partialRight(merge, { jobCategoryId }),
        ),
    })
  })
}
