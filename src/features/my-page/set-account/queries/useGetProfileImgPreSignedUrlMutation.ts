import { client } from "@apis/client"
import { useMutation } from "@tanstack/react-query"

export function useGetProfileImgPreSignedUrlMutation() {
  return useMutation({
    mutationFn: client.User.getPresignedUrlForProfileImg,
  })
}
