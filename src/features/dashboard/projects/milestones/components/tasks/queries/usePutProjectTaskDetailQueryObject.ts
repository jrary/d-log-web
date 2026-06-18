import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PutProjectMilestoneTaskRequest } from "@apis/model"

export function usePutProjectTaskDetailQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
  taskId: number,
) {
  return useMutation({
    mutationFn: (data: PutProjectMilestoneTaskRequest) => {
      return client.Task.updateProjectTask(
        clientProjectContractId,
        milestoneId,
        taskId,
        data,
      )
    },
  })
}
