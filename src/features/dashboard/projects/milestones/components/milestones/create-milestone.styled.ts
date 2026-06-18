import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  align: "center",
  justify: "center",
  spacing: "1.5rem",
  paddingVertical: "5.66rem",
  backgroundColor: "WHITE",
  borderWidth: "2px",
  borderColor: COLOR.YELLOW_200,
  borderRadius: "0.5rem",
})``

export const Image = styled.img`
  width: 9rem;
`

export const Title = styled(Text).attrs({
  color: COLOR.YELLOW_400,
  typo: "sub1",
  weight: "bold",
})``
