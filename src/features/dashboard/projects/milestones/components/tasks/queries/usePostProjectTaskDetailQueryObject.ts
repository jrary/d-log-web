import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PutProjectMilestoneTaskRequest } from "@apis/model"

export function usePostProjectTaskDetailQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
) {
  return useMutation({
    mutationFn: (data: PutProjectMilestoneTaskRequest) => {
      return client.Task.createProjectTask(
        clientProjectContractId,
        milestoneId,
        data,
      )
    },
  })
}
