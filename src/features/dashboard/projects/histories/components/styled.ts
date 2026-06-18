import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { BACKGROUND } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "section",
  width: "100%",
  spacing: "1.87rem",
})``

export const FilterButton = styled(HStack).attrs({
  as: "section",
  padding: "0.25rem",
  align: "center",
  spacing: "0.25rem",
  borderRadius: "0.25rem",
})<{ isClicked: boolean }>`
  cursor: pointer;
  ${(props) => props.isClicked && `background-color: ${BACKGROUND.DARK}`}
`

export const ButtonText = styled(Text).attrs({
  typo: "caption",
})`
  display: flex;
  align-items: center;
`

export const MilestoneContainer = styled(HStack).attrs({
  as: "ul",
  spacing: "0.62rem",
  overflowX: "auto",
})`
  flex-wrap: wrap;
`
