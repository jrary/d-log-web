import * as Dialog from "@components/dialog.styled"
import { VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import * as Styled from "./sign-up-success.styled"

const TEXT = {
  title: "회원가입 완료",
  description:
    "G워커님! 회원가입이 완료되었습니다.\n그릿지에 오신 것을 환영합니다.",
  button: {
    signUp: "홈으로 이동",
  },
}

export const SignUpSuccessModal = create(function () {
  const { remove, visible } = useModal()

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content maxWidth="26.25rem">
          <VStack spacing="1.88rem" align="center">
            <VStack spacing="0.62rem" align="center">
              <Styled.EmojiContainer>🥳</Styled.EmojiContainer>

              <Dialog.Title hidden>{TEXT.title}</Dialog.Title>
              <Styled.WelcomeMessage>{TEXT.description}</Styled.WelcomeMessage>
            </VStack>

            <Dialog.Close asChild>
              <Styled.HomeLink to="/">{TEXT.button.signUp}</Styled.HomeLink>
            </Dialog.Close>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
