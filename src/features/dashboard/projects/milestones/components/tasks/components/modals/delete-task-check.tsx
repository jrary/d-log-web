import * as Dialog from "@components/dialog.styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import { dashboardTaskQueryKey } from "@features/dashboard/projects/milestones/components/tasks/queries/dashboardTaskQueryKey"
import { useDeleteProjectTaskMutation } from "@features/dashboard/projects/milestones/components/tasks/queries/useDeleteProjectTaskMutation"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import { get, toNumber } from "es-toolkit/compat"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"
import * as Styled from "./delete-check.styled"

const TEXT = {
  title: "태스크를 삭제하면 다시 복구할 수 없어요!",
  description: `정말 태스크를 삭제하시겠어요?`,
}

export const DeleteTaskCheckModal = create(function () {
  const { visible, remove } = useModal()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)
  const milestoneId = toNumber(useParams().milestoneId)
  const taskId = toNumber(useParams().taskId)

  const { mutateAsync: deleteMilestone } = useDeleteProjectTaskMutation()

  const handleDelete = async () => {
    try {
      const response = await deleteMilestone({
        clientProjectContractId,
        milestoneId,
        taskId,
      })

      if (response.data.isSuccess) {
        toast.success("태스크를 삭제하였습니다.")
        queryClient.invalidateQueries({
          queryKey: [...dashboardTaskQueryKey.all(), "task"],
        })

        queryClient.invalidateQueries({
          queryKey: milestonesQueryKey.tasks(
            clientProjectContractId,
            milestoneId,
            undefined,
          ),
        })

        navigate(-1)
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
              <Dialog.Title>{TEXT.title}</Dialog.Title>
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
