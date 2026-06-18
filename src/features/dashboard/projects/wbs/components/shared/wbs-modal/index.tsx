import * as Dialog from "@components/dialog.styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { create, useModal } from "@ebay/nice-modal-react"
import * as Styled from "./index.styled"

type WbsModalProps = {
  title: string
  description?: string
  primaryButtonText: string
  onPrimaryButtonClick?: () => void
  secondaryButtonText?: string
  onSecondaryButtonClick?: () => void
}

export const WbsModal = create(function ({
  title,
  description,
  primaryButtonText,
  onPrimaryButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
}: WbsModalProps) {
  const { visible, remove } = useModal()

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content maxWidth="26.25rem" minWidth="26rem">
          <VStack spacing="1.88rem" align="center">
            <VStack spacing="0.62rem" align="center">
              <Styled.EmojiContainer>🚨</Styled.EmojiContainer>

              <Styled.WelcomeMessage>{title}</Styled.WelcomeMessage>
              <Dialog.Title>{description}</Dialog.Title>
            </VStack>

            <HStack spacing="0.62rem">
              {secondaryButtonText && (
                <Dialog.Close asChild>
                  <Styled.SecondaryBtn
                    onClick={() => onSecondaryButtonClick?.()}>
                    {secondaryButtonText}
                  </Styled.SecondaryBtn>
                </Dialog.Close>
              )}
              <Dialog.Close asChild>
                <Styled.PrimaryBtn onClick={() => onPrimaryButtonClick?.()}>
                  {primaryButtonText}
                </Styled.PrimaryBtn>
              </Dialog.Close>
            </HStack>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
