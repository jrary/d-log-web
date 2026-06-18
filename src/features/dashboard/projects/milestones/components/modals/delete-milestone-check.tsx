import * as Dialog from "@components/dialog.styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import { milestonesQueryKey } from "@features/dashboard/projects/milestones/queries/milestonesQueryKey"
import { useDeleteMilestoneMutation } from "@features/dashboard/projects/milestones/queries/useDeleteMilestoneMutation"
import { dashboardQueryKey } from "@features/dashboard/queries/dashboardQueryKey"
import { useQueryClient } from "@tanstack/react-query"
import { get, toNumber } from "es-toolkit/compat"
import toast from "react-hot-toast"
import { useParams } from "react-router"
import * as Styled from "./delete-check.styled"

const TEXT = {
  title: "마일스톤을 삭제하면 다시 복구할 수 없어요!",
  description: (milestoneObject: string) =>
    `정말 마일스톤 '${milestoneObject}' 을(를)\n삭제하시겠어요?`,
}

type DeleteMilestoneModalProps = {
  milestoneId: number
  milestoneObject: string
}

export const DeleteMilestoneCheckModal = create(function ({
  milestoneId,
  milestoneObject,
}: DeleteMilestoneModalProps) {
  const { visible, remove } = useModal()

  const queryClient = useQueryClient()
  const clientProjectContractId = toNumber(useParams().clientProjectContractId)

  const { mutateAsync: deleteMilestone } = useDeleteMilestoneMutation()

  const handleDelete = async () => {
    try {
      const response = await deleteMilestone({
        clientProjectContractId,
        milestoneId,
      })

      if (response.data.isSuccess) {
        toast.success("마일스톤을 삭제하였습니다.")
        await queryClient.invalidateQueries({
          queryKey: milestonesQueryKey.list(clientProjectContractId),
        })
        await queryClient.invalidateQueries({
          queryKey: dashboardQueryKey.milestones(clientProjectContractId),
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

              <Styled.WelcomeMessage>
                {TEXT.description(milestoneObject)}
              </Styled.WelcomeMessage>
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
