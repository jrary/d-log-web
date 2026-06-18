import { HStack, VStack } from "@components/shared-components/stack"
import { Text } from "@components/shared-components/text"
import { COLOR } from "@components/shared-components/tokens/color"
import styled from "styled-components"

export const Container = styled(VStack).attrs({
  as: "dl",
  spacing: "1rem",
  padding: "1.25rem",
  borderRadius: "0.5rem",
  backgroundColor: "WHITE",
  minWidth: "12.5rem",
})``

export const TitleContainer = styled(HStack).attrs({
  spacing: "0.5rem",
  align: "center",
})``

export const Title = styled(Text).attrs({
  as: "dt",
  typo: "body3",
  color: COLOR.NEUTRAL_700,
})``

export const Value = styled(HStack).attrs({
  as: "dd",
  justify: "end",
  spacing: "0.25rem",
})``
