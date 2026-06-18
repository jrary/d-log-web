import * as Dialog from "@components/dialog.styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { useDeleteProjectTaskOutputMutation } from "@features/dashboard/projects/milestones/components/tasks/queries/useDeleteProjectTaskOutputMutation"
import { useQueryClient } from "@tanstack/react-query"
import { get, toNumber } from "es-toolkit/compat"
import toast from "react-hot-toast"
import { useParams } from "react-router"
import * as Styled from "./delete-check.styled"

const TEXT = {
  description: `산출물 링크를 삭제하시겠어요?`,
}

type DeleteOutputProps = {
  outputId: number
}
export const DeleteOutputCheckModal = create(function ({
  outputId,
}: DeleteOutputProps) {
  const { visible, remove } = useModal()

  const queryClient = useQueryClient()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)
  const taskId = toNumber(useParams().taskId)

  const { mutateAsync: deleteOutput } = useDeleteProjectTaskOutputMutation(
    clientProjectContractId,
    milestoneId,
    taskId,
    outputId,
  )

  const handleDelete = async () => {
    try {
      const response = await deleteOutput()

      if (response.data.isSuccess) {
        toast.success("산출물을 삭제하였습니다.")

        await queryClient.invalidateQueries({
          queryKey: dashboardTaskQueryKey.taskDetail(
            clientProjectContractId,
            taskId,
          ),
        })
      }
    } catch (error) {
      toast.error(get(error, "message", "알 수 없는 오류가 발생했습니다."))
    }
  }

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content maxWidth="26.25rem">
          <VStack spacing="1.88rem" align="center">
            <VStack spacing="0.62rem" align="center">
              <Styled.EmojiContainer>🚨</Styled.EmojiContainer>
              <Styled.WelcomeMessage>{TEXT.description}</Styled.WelcomeMessage>
            </VStack>

            <HStack spacing="0.62rem">
              <Dialog.Close asChild>
                <Styled.CancelBtn>취소</Styled.CancelBtn>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Styled.DeleteBtn onClick={handleDelete}>삭제</Styled.DeleteBtn>
              </Dialog.Close>
            </HStack>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
