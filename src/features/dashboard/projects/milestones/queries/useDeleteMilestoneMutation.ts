import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useDeleteMilestoneMutation() {
  return useMutation({
    mutationFn: ({
      clientProjectContractId,
      milestoneId,
    }: {
      clientProjectContractId: number
      milestoneId: number
    }) => {
      return client.Milestone.deleteProjectMilestone(
        clientProjectContractId,
        milestoneId,
      )
    },
  })
}
