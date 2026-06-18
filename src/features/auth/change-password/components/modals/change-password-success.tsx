import * as Dialog from "@components/dialog.styled"
import { VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import * as Styled from "./change-password-success.styled"

const TEXT = {
  title: "비밀번호 변경 완료",
  description: "G워커님!\n비밀번호 변경이 완료되었습니다.",
  button: {
    text: "로그인 하러가기",
  },
}

type ChangePasswordSuccessModalProps = {
  buttonText: string
  link: string
}

export const ChangePasswordSuccessModal = create(function ({
  buttonText = "로그인 하러가기",
  link = "auth/sign-in",
}: ChangePasswordSuccessModalProps) {
  const { visible, remove } = useModal()

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content maxWidth="26.25rem">
          <VStack spacing="1.88rem" align="center">
            <VStack spacing="0.62rem" align="center">
              <Styled.EmojiContainer>🙂</Styled.EmojiContainer>

              <Dialog.Title hidden>{TEXT.title}</Dialog.Title>
              <Styled.WelcomeMessage>{TEXT.description}</Styled.WelcomeMessage>
            </VStack>

            <Dialog.Close asChild>
              <Styled.HomeLink to={link}>{buttonText}</Styled.HomeLink>
            </Dialog.Close>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
