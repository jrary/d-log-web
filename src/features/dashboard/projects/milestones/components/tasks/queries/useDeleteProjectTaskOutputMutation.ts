import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useDeleteProjectTaskOutputMutation(
  clientProjectContractId: number,
  milestoneId: number,
  taskId: number,
  outputId: number,
) {
  return useMutation({
    mutationFn: () => {
      return client.Task.deleteProjectMilestoneTaskOutput(
        clientProjectContractId,
        milestoneId,
        taskId,
        outputId,
      )
    },
  })
}
