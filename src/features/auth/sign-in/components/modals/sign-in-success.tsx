import * as Dialog from "@components/dialog.styled"
import { VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import * as Styled from "./sign-in-success.styled"

const TEXT = {
  title: "로그인 성공",
  description:
    "G워커님! 로그인이 완료되었습니다.\n그릿지에 오신 것을 환영합니다.",
  button: {
    text: "홈으로 이동",
  },
}

export const SignInSuccessModal = create(function () {
  const { visible, remove } = useModal()

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <VStack spacing="1.88rem" align="center">
            <VStack spacing="0.62rem" align="center">
              <Dialog.Icon>🥳</Dialog.Icon>

              <Dialog.Title hidden>{TEXT.title}</Dialog.Title>
              <Styled.WelcomeMessage>{TEXT.description}</Styled.WelcomeMessage>
            </VStack>

            <Dialog.Close asChild>
              <Styled.HomeLink to="/">{TEXT.button.text}</Styled.HomeLink>
            </Dialog.Close>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
