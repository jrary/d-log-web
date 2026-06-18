import { client } from "@apis/client"
import { jobCategoryQueryKey } from "@features/job-category/queries/jobCategoryQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetJobCategoriesQueryObject() {
  return queryOptions({
    queryKey: jobCategoryQueryKey.jobCategories(),
    queryFn: client.JobCategory.getJobCategoryList,
    select: ({ data }) => data.result?.jobCategoryList ?? [],
  })
}
