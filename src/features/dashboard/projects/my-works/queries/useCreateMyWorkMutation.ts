import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"
import type { PostProjectWorkHistoryRequest } from "@apis/model"

export function useCreateMyWorkMutation(clientProjectContractId: number) {
  return useMutation({
    mutationFn: (data: PostProjectWorkHistoryRequest) =>
      client.WorkHistory.createProjectWorkHistory(
        clientProjectContractId,
        data,
      ),
  })
}
