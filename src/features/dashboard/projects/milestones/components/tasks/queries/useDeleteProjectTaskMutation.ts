import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useDeleteProjectTaskMutation() {
  return useMutation({
    mutationFn: ({
      clientProjectContractId,
      milestoneId,
      taskId,
    }: {
      clientProjectContractId: number
      milestoneId: number
      taskId: number
    }) => {
      return client.Task.deleteProjectMilestoneTask(
        clientProjectContractId,
        milestoneId,
        taskId,
      )
    },
  })
}
