import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import { TooltipContent, TooltipWrapper } from "./index.styled"

type TooltipProps = {
  text: string
}
export default function Tooltip({ text }: TooltipProps) {
  return (
    <TooltipWrapper>
      <TooltipContent>
        <Text typo="body3" weight="regular" color={COLOR.NEUTRAL_100}>
          {text}
        </Text>
      </TooltipContent>
      <TriangleSvg />
    </TooltipWrapper>
  )
}

function TriangleSvg() {
  return (
    <svg viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 14L-6.11959e-07 8.34465e-07L18 4.76599e-08L9 14Z" />
    </svg>
  )
}
