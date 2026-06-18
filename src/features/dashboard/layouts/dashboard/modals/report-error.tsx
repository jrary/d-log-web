import * as Dialog from "@components/dialog.styled"
import { VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import * as Styled from "./report-error.styled.ts"

const TEXT = {
  description: "아직 생성된 보고서가 없어요",
  title: "보고서에 필요한 데이터가 생성되지 않았어요.",
  button: {
    text: "확인",
  },
}

export const ReportErrorModal = create(function () {
  const { visible, remove } = useModal()

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content maxWidth="26.25rem">
          <VStack spacing="1.86rem" align="center">
            <VStack spacing="0.63rem" align="center">
              <Styled.EmojiContainer>🙅‍♂</Styled.EmojiContainer>
              <VStack spacing="0.75rem" align="center">
                <Styled.WelcomeMessage>
                  {TEXT.description}
                </Styled.WelcomeMessage>
                <Dialog.Title>{TEXT.title}</Dialog.Title>
              </VStack>
            </VStack>
            <Dialog.Close asChild>
              <Styled.HomeLink to="#">확인</Styled.HomeLink>
            </Dialog.Close>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
