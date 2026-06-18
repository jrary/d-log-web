import * as Dialog from "@components/dialog.styled"
import { VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import * as Styled from "./withdrawal-success.styled"

const TEXT = {
  title: "탈퇴 처리가 완료되었습니다.",
  description: "서비스를 이용해 주셔서 감사합니다.",
  button: {
    text: "확인",
    link: "",
  },
}

export const WithdrawalSuccessModal = create(function () {
  const { visible, remove } = useModal()

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content maxWidth="26.25rem">
          <VStack spacing="1.88rem" align="center">
            <VStack spacing="0.62rem" align="center">
              <Styled.EmojiContainer>🙏</Styled.EmojiContainer>
              <VStack spacing="0.75rem" align="center">
                <Styled.WelcomeMessage>{TEXT.title}</Styled.WelcomeMessage>
                <Dialog.Title>{TEXT.description}</Dialog.Title>
              </VStack>
            </VStack>

            <Dialog.Close asChild>
              <Styled.HomeLink to={TEXT.button.link}>
                {TEXT.button.text}
              </Styled.HomeLink>
            </Dialog.Close>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
