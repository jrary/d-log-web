import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PatchProjectMilestoneRequest } from "@apis/model"

export function useUpdateMilestoneMutation(
  clientProjectContractId: number,
  milestoneId: number,
) {
  return useMutation({
    mutationFn: (data: PatchProjectMilestoneRequest) => {
      return client.Milestone.updateProjectMilestone(
        clientProjectContractId,
        milestoneId,
        data,
      )
    },
  })
}
