import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PostProjectMilestoneTaskRequest } from "@apis/model"

export function useCreateMilestoneTaskMutation(
  clientProjectContractId: number,
  milestoneId: number,
) {
  return useMutation({
    mutationFn: (data: PostProjectMilestoneTaskRequest) => {
      return client.Task.createProjectTask(
        clientProjectContractId,
        milestoneId,
        data,
      )
    },
  })
}
