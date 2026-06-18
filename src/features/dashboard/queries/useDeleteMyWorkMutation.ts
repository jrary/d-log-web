import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useDeleteMyWorkMutation(clientProjectContractId: number) {
  return useMutation({
    mutationFn: (workHistoryId: number) =>
      client.WorkHistory.deleteProjectWorkHistory(
        clientProjectContractId,
        workHistoryId,
      ),
  })
}
