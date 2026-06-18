import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useGetPortfolioPreSignedUrlMutation() {
  return useMutation({
    mutationFn: client.User.getPresignedUrlForPortfolio,
  })
}
