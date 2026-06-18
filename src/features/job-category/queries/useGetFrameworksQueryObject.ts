import { client } from "@apis/client"
import { jobCategoryQueryKey } from "@features/job-category/queries/jobCategoryQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetFrameworksQueryObject() {
  return queryOptions({
    queryKey: jobCategoryQueryKey.frameworks(),
    queryFn: client.JobCategory.getFrameworkList,
    select: ({ data }) => data.result?.frameworkList ?? [],
  })
}
