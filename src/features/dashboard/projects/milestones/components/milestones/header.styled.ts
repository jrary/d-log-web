import { VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "header",
  spacing: "0.55rem",
  paddingBottom: "1.5rem",
  borderColor: "DARK",
  borderBottomWidth: "1px",
  marginBottom: "1.5rem",
})``

export const Title = styled(Text).attrs({
  typo: "sub1",
  weight: "bold",
})``

export const Description = styled(Text).attrs({
  as: "p",
  typo: "body3",
  color: COLOR.NEUTRAL_600,
})``
