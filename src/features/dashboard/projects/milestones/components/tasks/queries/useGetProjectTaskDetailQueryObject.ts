import { client } from "@apis/client"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { queryOptions } from "@tanstack/react-query"

export function useGetProjectTaskDetailQueryObject(
  projectId: number,
  taskId: number,
) {
  return queryOptions({
    queryKey: dashboardTaskQueryKey.taskDetail(projectId, taskId),
    queryFn: () => client.Task.getProjectTask(projectId, taskId),
    select: (data) => data.data.result?.projectTask,
  })
}
