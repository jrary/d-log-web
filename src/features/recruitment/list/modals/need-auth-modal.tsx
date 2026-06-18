import * as Dialog from "@components/dialog.styled"
import { VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import { Link } from "react-router"

const TEXT = {
  title: "로그인 필요",
  description: "긱워킹을 위해 먼저\n그릿지에 로그인을 해주세요.",
  button: {
    text: "로그인하러가기",
  },
}

export const NeedAuthModal = create(function () {
  const { visible, remove } = useModal()

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <VStack spacing="1.88rem" align="center">
            <VStack spacing="0.62rem" align="center">
              <Dialog.Icon>🔑</Dialog.Icon>

              <Dialog.Title hidden>{TEXT.title}</Dialog.Title>
              <Dialog.Description>{TEXT.description}</Dialog.Description>
            </VStack>

            <Dialog.Close asChild>
              <Link to="/auth/sign-in">
                <Dialog.Button>{TEXT.button.text}</Dialog.Button>
              </Link>
            </Dialog.Close>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
