import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BORDER,
  COLOR,
  TEXT,
} from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  paddingVertical: "0.38rem",
  paddingHorizontal: "0.62rem",
})<{ isSelected: boolean }>`
  cursor: pointer;
  border-radius: 6.25rem;
  border: 1px solid
    ${(props) => (props.isSelected ? COLOR.GREEN_300 : BORDER.LIGHT)};
  background-color: ${(props) =>
    props.isSelected ? BACKGROUND.SECONDARY : BACKGROUND.WHITE};
`

export const Milestone = styled(Text).attrs({
  typo: "body3",
})<{ isSelected: boolean }>`
  color: ${(props) =>
    props.isSelected ? TEXT.HIGH_EMPHASIS : COLOR.NEUTRAL_600};
`
