import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PatchProjectMilestoneTaskOutputRequest } from "@apis/model"

export function usePatchProjectTaskOutputQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
  taskId: number,
  outputId: number,
) {
  return useMutation({
    mutationFn: (data: PatchProjectMilestoneTaskOutputRequest) => {
      return client.Task.updateProjectMilestoneTaskOutput(
        clientProjectContractId,
        milestoneId,
        taskId,
        outputId,
        data,
      )
    },
  })
}
