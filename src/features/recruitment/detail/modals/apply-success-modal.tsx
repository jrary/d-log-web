import * as Dialog from "@components/dialog.styled"
import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { create, useModal } from "@ebay/nice-modal-react"
import * as Styled from "./apply-success-modal.styled"

const TEXT = {
  title: "확인 완료",
  description:
    "축하합니다!\n프로젝트 지원이 완료되었습니다!\n문자로 결과 안내 드리겠습니다.",
  button: {
    text: "확인완료",
  },
}

type ApplySuccessModalProps = {
  name: string
  phone: string
}

export const ApplySuccessModal = create(function ({
  name,
  phone,
}: ApplySuccessModalProps) {
  const { visible, remove } = useModal()

  function formatPhoneNumber(phone: string): string {
    if (phone.length === 11) {
      return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
    }
    return phone
  }

  return (
    <Dialog.Root open={visible} onOpenChange={(open) => !open && remove()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <VStack spacing="1.88rem" align="center">
            <VStack spacing="0.62rem" align="center">
              <Dialog.Icon>🥳</Dialog.Icon>

              <Dialog.Title hidden>{TEXT.title}</Dialog.Title>
              <Dialog.Description>{TEXT.description}</Dialog.Description>
            </VStack>

            <Styled.Information>
              <Text as="dt" weight="medium">
                {name}
              </Text>
              <Text as="dd" weight="medium" color="SECONDARY">
                {formatPhoneNumber(phone)}
              </Text>
            </Styled.Information>

            <Dialog.Close asChild>
              <Dialog.Button>{TEXT.button.text}</Dialog.Button>
            </Dialog.Close>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
