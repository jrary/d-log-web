import { Text } from "@components/shared-components/text"
import { FloatingButtonWrapper } from "./index.styled"

type FloatingButtonProps = {
  onClick?: () => void
  children?: React.ReactNode
}

export default function FloatingButton({
  onClick,
  children,
}: FloatingButtonProps) {
  return (
    <FloatingButtonWrapper onClick={onClick}>
      <Text typo="body3" weight="medium">
        {children}
      </Text>
    </FloatingButtonWrapper>
  )
}
