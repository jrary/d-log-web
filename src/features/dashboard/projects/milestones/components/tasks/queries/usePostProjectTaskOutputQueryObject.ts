import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PostProjectMilestoneTaskOutputRequest } from "@apis/model"

export function usePostProjectTaskOutputQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
  taskId: number,
) {
  return useMutation({
    mutationFn: (data: PostProjectMilestoneTaskOutputRequest) => {
      return client.Task.createProjectMilestoneTaskOutput(
        clientProjectContractId,
        milestoneId,
        taskId,
        data,
      )
    },
  })
}
