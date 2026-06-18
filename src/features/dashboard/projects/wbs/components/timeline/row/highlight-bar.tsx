import { DATE_ITEM_WIDTH } from "./constant"
import { StyledHighlightBar } from "./index.styled"

type HighlightBarProps = {
  hoverIndex: number | null
  isVisible: boolean
  count?: number
}

export default function HighlightBar({
  hoverIndex,
  isVisible,
  count,
}: HighlightBarProps) {
  const left = DATE_ITEM_WIDTH * (hoverIndex ?? 0)
  return (
    <StyledHighlightBar left={left} isVisible={isVisible} count={count ?? 7} />
  )
}
