import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PostProjectMilestoneRequest } from "@apis/model"

export function useCreateMilestoneMutation(clientProjectContractId: number) {
  return useMutation({
    mutationFn: (data: PostProjectMilestoneRequest) => {
      return client.Milestone.createProjectMilestone(
        clientProjectContractId,
        data,
      )
    },
  })
}
