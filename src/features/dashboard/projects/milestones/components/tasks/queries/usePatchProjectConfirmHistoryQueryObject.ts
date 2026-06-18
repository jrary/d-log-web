import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PatchProjectMilestoneTaskStatusRequest } from "@apis/model"

export function usePatchProjectConfirmHistoryQueryObject(
  clientProjectContractId: number,
  milestoneId: number,
  taskId: number,
) {
  return useMutation({
    mutationFn: (data: PatchProjectMilestoneTaskStatusRequest) => {
      return client.Task.updateProjectTaskStatus(
        clientProjectContractId,
        milestoneId,
        taskId,
        data,
      )
    },
  })
}
