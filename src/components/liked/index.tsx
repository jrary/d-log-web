import { myInterestQueryKey } from "@features/my-page/interest/queries/myInterestQueryKey"
import { useUpdateLikeProjectMutation } from "@features/recruitment/list/queries/useUpdateLikeProjectMutation"
import { recruitmentQueryKey } from "@features/recruitment/queries/recruitmentQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import BookmarkOff from "~icons/local/ic_bookmark_off"
import BookmarkOn from "~icons/local/ic_bookmark_on"
import * as Styled from "./styled"

type LikedProps = {
  id: number
  liked: boolean
  count: number
}

export function Liked({ id, liked, count }: LikedProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: updateLike } = useUpdateLikeProjectMutation(id ?? -1)
  return (
    <Styled.Container>
      <Styled.Status
        onClick={async () => {
          try {
            const response = await updateLike()
            if (response.data.isSuccess) {
              queryClient.invalidateQueries({
                queryKey: myInterestQueryKey.all(),
              })
              queryClient.invalidateQueries({
                queryKey: [...recruitmentQueryKey.all()],
              })
              toast.success("업데이트에 성공하였습니다.")
            } else {
              toast.error(
                response.data.message || "알 수 없는 오류가 발생했습니다.",
              )
            }
          } catch {
            toast.error("알 수 없는 오류가 발생했습니다.")
          }
        }}>
        {liked ? <BookmarkOn /> : <BookmarkOff />}
      </Styled.Status>
      <Styled.Count>{count}</Styled.Count>
    </Styled.Container>
  )
}
