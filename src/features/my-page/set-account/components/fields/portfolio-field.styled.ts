import { Button } from "@components/button.styled"
import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { typography } from "@components/shared-components/tokens/typography"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  spacing: "1.25rem",
  width: "100%",
})``

export const Limit = styled(Text).attrs({
  type: "body1",
  weight: "medium",
  color: "HIGH_EMPHASIS",
})`
  display: block;
  margin-bottom: 0.25rem;
`

export const Append = styled(Button).attrs({
  variant: "primary-ghost",
  fullWidth: true,
})`
  ${typography.body2}
  font-weight: 700;
  margin-bottom: -0.5rem;
`

export const LinkField = styled(VStack).attrs({
  spacing: "1rem",
})``

export const FileField = styled(VStack).attrs({
  spacing: "1rem",
})``

export const List = styled(VStack).attrs({
  spacing: "0.63rem",
})``

export const Item = styled(HStack).attrs({
  spacing: "0.63rem",
})``

export const Description = styled(Text).attrs({
  type: "body1",
  color: "SECONDARY",
})``

export const Note = styled(Text).attrs({
  type: "body3",
  color: "TERTIARY",
})``
